const get = (id) => document.getElementById(id);
let pressed = false;
let requestOn = false;
let pressCount = 0;
function renderModel() {
  get('direct-led').classList.toggle('on', pressed);
  get('memory-led').classList.toggle('on', requestOn);
  get('direct-state').textContent = `입력 ${pressed ? 'LOW(0)' : 'HIGH(1)'} · LED ${pressed ? '켜짐' : '꺼짐'}`;
  get('memory-state').textContent = `requestOn = ${requestOn} · LED ${requestOn ? '켜짐' : '꺼짐'}`;
  get('model-status3').textContent = `버튼 ${pressed ? '누름 유지 중' : '놓음'} · 새 누름 ${pressCount}회`;
  get('press3').disabled = pressed;
  get('release3').disabled = !pressed;
}
function logEvent(message) {
  const item = document.createElement('li'); item.textContent = message;
  get('event-log3').append(item);
  if (get('event-log3').children.length > 8) get('event-log3').firstElementChild.remove();
}
get('press3').addEventListener('click', () => {
  if (pressed) return;
  pressed = true; requestOn = !requestOn; pressCount++;
  renderModel(); logEvent(`새 누름 ${pressCount}회: HIGH → LOW / 요청 ${requestOn ? '켜짐' : '꺼짐'}`);
});
get('release3').addEventListener('click', () => {
  if (!pressed) return;
  pressed = false; renderModel(); logEvent(`놓음: LOW → HIGH / 요청 ${requestOn ? '켜짐' : '꺼짐'} 유지`);
});
get('model-reset3').addEventListener('click', () => {
  pressed = false; requestOn = false; pressCount = 0;
  get('event-log3').replaceChildren(); logEvent('시작: 입력 HIGH / 요청 없음'); renderModel();
});
renderModel();
document.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-answer]').forEach((b) => {b.classList.remove('correct', 'wrong'); b.setAttribute('aria-pressed', 'false');});
  const correct = button.dataset.answer === 'repeat';
  button.classList.add(correct ? 'correct' : 'wrong'); button.setAttribute('aria-pressed', 'true');
  get('quiz3-feedback').textContent = correct ? '맞아요! LOW인 동안 loop가 계속 돌아요. 안정된 HIGH → LOW 변화에서만 한 번 반전시켜야 합니다.' : '밝기보다 반복 실행을 생각해 보세요. 버튼을 길게 누르는 동안 loop는 몇 번 실행될까요?';
}));
let toastTimer;
function toast(text) {get('toast').textContent = text; get('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => get('toast').classList.remove('show'), 3500);}
async function copy(text) {try {await navigator.clipboard.writeText(text); toast('복사했어요. 붙여 넣어 사용하세요.');} catch {toast('본문을 선택해서 직접 복사해 주세요.');}}
get('copy-code3').addEventListener('click', () => copy(get('code3').textContent));
function updatePrompt() {
  get('prompt3').textContent = `나는 ESP32를 배우는 중학생이야. WROOM-32 계열 보드, GPIO 18 INPUT_PULLUP 버튼과 GPIO 23 LED를 사용해.
‘${get('mission3').value}’ 상태를 버튼에서 손을 떼어도 유지하고 싶어.
내 상태 규칙: ${get('meaning3').value.trim() || '한 번 누르면 요청 켜짐, 놓아도 유지, 다시 누르면 요청 꺼짐.'}
내 질문: ${get('question3').value.trim() || '입력값과 기억된 요청 상태는 어떻게 다를까?'}
아래 코드의 raw, stableButton, previousStable, requestOn이 각각 무엇인지 구분해 줘.
먼저 내가 예측할 질문을 하나 하고, 답한 뒤 코드의 해당 부분과 연결해 설명해 줘. 길게 누르기·놓기·다시 누르기로 설명을 검증할 방법을 알려줘.
변경을 제안한다면 GPIO 번호, INPUT_PULLUP, HIGH→LOW 감지, 버튼 튐 처리를 유지하고 바뀐 부분과 이유를 설명해 줘.`;
}
get('copy-prompt3').addEventListener('click', () => copy(get('prompt3').textContent));
const storageKey = 'esp32-lab-lesson3-v1';
const records = [...document.querySelectorAll('[data-record]')];
try {
  const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
  records.forEach((f) => {if (typeof data[f.id] === 'string') f.value = data[f.id];});
  if ([...get('mission3').options].some((o) => o.value === data.mission)) get('mission3').value = data.mission;
} catch {get('save-status3').textContent = '자동 저장을 사용할 수 없어요. 기록을 내려받아 주세요.';}
function save() {
  try {const data = {mission: get('mission3').value}; records.forEach((f) => data[f.id] = f.value); localStorage.setItem(storageKey, JSON.stringify(data)); get('save-status3').textContent = '3차시 기록 저장 완료 · 제출되지 않아요';}
  catch {get('save-status3').textContent = '저장할 수 없어요. 기록을 내려받아 주세요.';}
}
records.forEach((f) => f.addEventListener('input', () => {save(); if (['meaning3','question3'].includes(f.id)) updatePrompt();}));
get('mission3').addEventListener('change', () => {save(); updatePrompt();}); updatePrompt();
get('download3').addEventListener('click', () => {
  const text = `ESP32 LAB · 3차시 탐구 기록\n선택한 상황: ${get('mission3').value}\n\n` + records.map((f) => `[${f.dataset.label}]\n${f.value}`).join('\n\n');
  const url = URL.createObjectURL(new Blob(['\ufeff', text], {type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = 'ESP32_3차시_탐구기록.txt'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('3차시 탐구 기록을 내려받습니다.');
});
let resetArmed = false, resetTimer;
get('reset3').addEventListener('click', () => {
  if (!resetArmed) {resetArmed = true; get('reset3').textContent = '정말 지우기 · 다시 누르세요'; toast('필요한 기록을 내려받았나요? 다시 누르면 3차시 기록만 지웁니다.'); resetTimer = setTimeout(() => {resetArmed = false; get('reset3').textContent = '3차시 기록 지우기';}, 6000); return;}
  clearTimeout(resetTimer); resetArmed = false; records.forEach((f) => f.value = ''); get('mission3').selectedIndex = 0; updatePrompt();
  try {localStorage.removeItem(storageKey);} catch {}
  get('reset3').textContent = '3차시 기록 지우기'; get('save-status3').textContent = '3차시 기록을 지웠어요'; toast('1·2차시 기록은 유지됩니다.');
});
get('print3').addEventListener('click', () => window.print());
let printDetails = [];
window.addEventListener('beforeprint', () => {printDetails = [...document.querySelectorAll('details:not([open])')]; printDetails.forEach((d) => d.open = true);});
window.addEventListener('afterprint', () => printDetails.forEach((d) => d.open = false));
const sections = [...document.querySelectorAll('main>section')];
function activeSection() {let current = sections[0]; for (const s of sections) if(s.getBoundingClientRect().top <= 150) current = s; document.querySelectorAll('nav a').forEach((a) => {const active = a.hash === '#' + current.id; a.classList.toggle('active', active); if(active) a.setAttribute('aria-current','step'); else a.removeAttribute('aria-current');});}
window.addEventListener('scroll', activeSection, {passive:true}); activeSection();
