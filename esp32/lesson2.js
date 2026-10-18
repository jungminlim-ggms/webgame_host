const byId = (id) => document.getElementById(id);
// Breadboard coordinates match the printed connection table in lesson2.html.
const svgNS = 'http://www.w3.org/2000/svg';
const holeLayer = byId('lesson2-holes');
function svgNode(tag, attributes, text) {
  const node = document.createElementNS(svgNS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  holeLayer.append(node);
}
for (let column = 1; column <= 24; column++) {
  const x = 320 + (column - 1) * 24;
  svgNode('text', {x, y: 96, 'text-anchor': 'middle', 'font-size': 11, fill: '#62745a'}, column);
  if ([5, 9, 12, 16, 18].includes(column)) {
    svgNode('rect', {x: x - 6, y: 103, width: 12, height: 110, rx: 6, fill: column === 16 ? '#e4daef' : '#dce9c7'});
  }
  for (let row = 0; row < 10; row++) {
    const y = 110 + row * 24 + (row >= 5 ? 32 : 0);
    svgNode('circle', {cx: x, cy: y, r: 3, fill: '#aab5a4'});
    if (column === 1) svgNode('text', {x: 295, y: y + 4, 'font-size': 12, fill: '#62745a'}, 'abcdefghij'[row]);
  }
}
const basicCode = `const int LED_PIN = 23;
const int BUTTON_PIN = 18;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.begin(115200);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  Serial.println(buttonState); // 놓음: 1, 누름: 0

  if (buttonState == LOW) { // 누르면
    digitalWrite(LED_PIN, HIGH);
  } else {                 // 놓으면
    digitalWrite(LED_PIN, LOW);
  }
  delay(20); // 관찰용 출력 속도 제한
}`;
byId('code2').textContent = basicCode;
let pointerHeld = false;
const heldKeys = new Set();
function renderModel() {
  const pressed = pointerHeld || heldKeys.size > 0 || byId('model-switch').checked;
  byId('button-led').classList.toggle('on', pressed);
  byId('model-state').textContent = pressed
    ? '버튼 누름 · 입력 LOW(0) · LED 켜짐'
    : '버튼 놓음 · 입력 HIGH(1) · LED 꺼짐';
}
const hold = byId('hold-button');
hold.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;
  pointerHeld = true;
  hold.setPointerCapture(event.pointerId);
  renderModel();
});
for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  hold.addEventListener(name, () => { pointerHeld = false; renderModel(); });
}
hold.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault(); heldKeys.add(event.key); renderModel();
  }
});
hold.addEventListener('keyup', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault(); heldKeys.delete(event.key); renderModel();
  }
});
function releaseModel() {
  pointerHeld = false; heldKeys.clear(); byId('model-switch').checked = false; renderModel();
}
hold.addEventListener('blur', () => { heldKeys.clear(); renderModel(); });
window.addEventListener('blur', releaseModel);
document.addEventListener('visibilitychange', () => { if (document.hidden) releaseModel(); });
byId('model-switch').addEventListener('change', renderModel);
document.querySelectorAll('[data-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-answer]').forEach((item) => {item.classList.remove('correct', 'wrong'); item.setAttribute('aria-pressed', 'false');});
    const correct = button.dataset.answer === 'LOW';
    button.classList.add(correct ? 'correct' : 'wrong');
    button.setAttribute('aria-pressed', 'true');
    byId('quiz-feedback').textContent = correct
      ? '맞아요. 누르면 GND와 연결되어 LOW가 됩니다. if 조건이 참이 되어 LED를 켜요.'
      : '이번에는 INPUT_PULLUP을 사용해요. 놓았을 때 HIGH이고, 누르면 GND에 연결됩니다. 다시 생각해 보세요.';
  });
});
function promptText() {
  return `나는 ESP32를 배우는 중학생이야. ESP32-WROOM-32와 Arduino IDE를 사용해.
LED는 GPIO 23 → 330 Ω → LED +, LED − → GND로 연결했어.
버튼은 GPIO 18과 GND 사이이고 INPUT_PULLUP이므로 눌림은 LOW야.
목적은 ‘${byId('mission2').value}’ 신호야.
내 설계: ${byId('design2').value.trim() || '누르는 동안 켜지고 놓으면 꺼지는 기본 동작부터 확인하고 싶어.'}
아래에 붙인 현재 코드에서 입력·조건·출력 부분을 찾아 설명해 줘.
핀과 회로를 유지하면서 내 설계에 필요한 수정 힌트를 먼저 줘. 내가 요청하면 변경한 부분과 전체 코드를 알려줘.
놓음·누름·다시 누름의 예상 결과와 검증할 항목을 알려줘. delay가 반응 속도에 미치는 영향도 설명해 줘.`;
}
function updatePrompt() { byId('prompt2').textContent = promptText(); }
let toastTimer;
function toast(message) {byId('toast').textContent = message; byId('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => byId('toast').classList.remove('show'), 3500);}
async function copy(text) {try {await navigator.clipboard.writeText(text); toast('복사했어요. 붙여 넣어 사용하세요.');} catch {toast('복사할 수 없어요. 본문을 선택해 직접 복사해 주세요.');}}
byId('copy-code2').addEventListener('click', () => copy(basicCode));
byId('copy-prompt2').addEventListener('click', () => copy(promptText()));
const storageKey = 'esp32-lab-lesson2-v1';
const records = [...document.querySelectorAll('[data-record]')];
try {
  const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
  records.forEach((field) => { if (typeof data[field.id] === 'string') field.value = data[field.id]; });
  if ([...byId('mission2').options].some((o) => o.value === data.mission)) byId('mission2').value = data.mission;
} catch {byId('save-status2').textContent = '자동 저장을 사용할 수 없어요. 기록을 내려받아 주세요.';}
function save() {
  try {
    const data = {mission: byId('mission2').value}; records.forEach((f) => data[f.id] = f.value);
    localStorage.setItem(storageKey, JSON.stringify(data));
    byId('save-status2').textContent = '2차시 기록 저장 완료 · 제출되지 않아요';
  } catch {byId('save-status2').textContent = '저장할 수 없어요. 기록을 내려받아 주세요.';}
}
records.forEach((f) => f.addEventListener('input', () => {save(); if (f.id === 'design2') updatePrompt();}));
byId('mission2').addEventListener('change', () => {save(); updatePrompt();});
updatePrompt();
const recordLabels = ['입력값 예측', '신호 설계와 이유', '놓음: 예상 → 관찰', '누름: 예상 → 관찰', '다시 누름: 예상 → 관찰', '입력–조건–출력 설명', 'AI 검증·짝 피드백·수정', '새로운 활용'];
byId('download2').addEventListener('click', () => {
  const content = `ESP32 LAB · 2차시 탐구 기록\n선택한 상황: ${byId('mission2').value}\n\n` + records.map((f, i) => `[${recordLabels[i]}]\n${f.value}`).join('\n\n');
  const url = URL.createObjectURL(new Blob(['\ufeff', content], {type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = 'ESP32_2차시_탐구기록.txt'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('2차시 탐구 기록을 내려받습니다.');
});
let resetArmed = false, resetTimer;
byId('reset2').addEventListener('click', () => {
  if (!resetArmed) {resetArmed = true; byId('reset2').textContent = '정말 지우기 · 다시 누르세요'; toast('내려받았나요? 다시 누르면 2차시 기록만 지워집니다.'); resetTimer = setTimeout(() => {resetArmed = false; byId('reset2').textContent = '2차시 기록 지우기';}, 6000); return;}
  clearTimeout(resetTimer); resetArmed = false; records.forEach((f) => f.value = ''); byId('mission2').selectedIndex = 0; updatePrompt();
  try {localStorage.removeItem(storageKey);} catch {}
  byId('reset2').textContent = '2차시 기록 지우기'; byId('save-status2').textContent = '2차시 기록을 지웠어요'; toast('1차시 기록은 유지됩니다.');
});
byId('print').addEventListener('click', () => window.print());
let printDetails = [];
window.addEventListener('beforeprint', () => {printDetails = [...document.querySelectorAll('details:not([open])')]; printDetails.forEach((d) => d.open = true);});
window.addEventListener('afterprint', () => printDetails.forEach((d) => d.open = false));
const sections = [...document.querySelectorAll('main>section')];
function activeSection() {let current = sections[0]; for (const s of sections) if (s.getBoundingClientRect().top <= 150) current = s; document.querySelectorAll('nav a').forEach((a) => {const active = a.hash === '#' + current.id; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');});}
window.addEventListener('scroll', activeSection, {passive:true}); activeSection();
