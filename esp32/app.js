const $ = (id) => document.getElementById(id);
const ns = 'http://www.w3.org/2000/svg';
for (let n=1;n<=18;n++) {
  const x=308+(n-1)*27;
  const label=document.createElementNS(ns,'text');
  label.setAttribute('x',x); label.setAttribute('y',51); label.setAttribute('text-anchor','middle'); label.setAttribute('font-size','10'); label.setAttribute('fill','#6c7b6b');label.textContent=n;$('holes').append(label);
  for(let r=0;r<10;r++){
    const y=70+r*20+(r>=5?32:0);
    if(n===5||n===9||n===12){if(r===0){const line=document.createElementNS(ns,'rect');line.setAttribute('x',x-6);line.setAttribute('y',64);line.setAttribute('width',12);line.setAttribute('height',92);line.setAttribute('rx',6);line.setAttribute('fill','#d7e5be');$('holes').append(line);}}
    const c=document.createElementNS(ns,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',3);c.setAttribute('fill','#acb5a6');$('holes').append(c);
    if(n===1){const t=document.createElementNS(ns,'text');t.setAttribute('x',287);t.setAttribute('y',y+4);t.setAttribute('font-size','11');t.setAttribute('fill','#6c7b6b');t.textContent='abcdefghij'[r];$('holes').append(t);}
  }
}
let running=false,timer=null,lit=false,toastTimer;
function codeText(){return `const int LED_PIN = 23; // 연결한 GPIO 번호\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT); // 출력으로 설정\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH); // LED 켜기\n  delay(${$('on-time').value}); // 켜진 채 기다리기 (ms)\n  digitalWrite(LED_PIN, LOW);  // LED 끄기\n  delay(${$('off-time').value}); // 꺼진 채 기다리기 (ms)\n}`;}
function updateCode(){ $('code-output').textContent=codeText();$('on-label').textContent=$('on-time').value+' ms';$('off-label').textContent=$('off-time').value+' ms';$('period').textContent=((Number($('on-time').value)+Number($('off-time').value))/1000).toFixed(1)+'초';if(running){clearTimeout(timer);lit=false;tick();}}
function tick(){if(!running)return;lit=!lit;$('sim-led').classList.toggle('on',lit);$('led-state').textContent=lit?'HIGH · 켜짐':'LOW · 꺼짐';timer=setTimeout(tick,Number($(lit?'on-time':'off-time').value));}
function stop(){running=false;clearTimeout(timer);lit=false;$('sim-led').classList.remove('on');$('led-state').textContent='실험 멈춤';$('simulate').textContent='모형 실행 ▷';$('simulate').setAttribute('aria-pressed','false');}
$('simulate').setAttribute('aria-pressed','false');
$('simulate').addEventListener('click',()=>{if(running){stop();return;}running=true;$('simulate').textContent='모형 멈추기 Ⅱ';$('simulate').setAttribute('aria-pressed','true');tick();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)stop();});
['on-time','off-time'].forEach(id=>$(id).addEventListener('input',updateCode));updateCode();
function promptText(){return `나는 ESP32를 처음 사용하는 중학생이야.\nESP32-WROOM-32 계열 보드와 Arduino IDE를 사용해. GPIO 23 → 330 Ω 저항 → LED의 +, LED의 − → GND로 연결했어.\n\nLED로 ‘${$('mission').value}’ 상태를 알리고 싶어. 기본 코드는 HIGH 1000 ms, LOW 1000 ms를 반복해. 핀과 회로는 그대로 두고 delay 시간 값 한 가지만 바꾸는 제안을 해줘.\n\n변경 전후의 시간 값과 예상 동작을 설명하고, 전체 코드와 확인할 항목 3개를 알려줘. 내가 이해했는지 확인할 질문도 하나 해줘.`;}
function updatePrompt(){$('prompt-output').textContent=promptText();}updatePrompt();$('mission').addEventListener('change',updatePrompt);
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3500);}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('복사했어요. 붙여 넣어 사용하세요.');}catch{toast('복사할 수 없어요. 본문을 선택해서 직접 복사해 주세요.');}}
$('copy-code').addEventListener('click',()=>copy(codeText()));$('copy-prompt').addEventListener('click',()=>copy(promptText()));
document.querySelectorAll('.quiz').forEach(quiz=>{quiz.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{quiz.querySelectorAll('button').forEach(b=>{b.classList.remove('correct','wrong');b.setAttribute('aria-pressed','false');});const correct=button.dataset.answer===quiz.dataset.correct;button.classList.add(correct?'correct':'wrong');button.setAttribute('aria-pressed','true');quiz.querySelector('.feedback').textContent=correct?'맞아요! 같은 묶음은 전기적으로 연결되어 LED 양쪽에 필요한 전압 차가 생기지 않아요. 서로 다른 번호 묶음으로 옮겨 주세요.':'다시 생각해 볼까요? 같은 번호의 a–e는 안쪽 금속으로 연결되어 있어요. LED 양쪽의 연결을 비교해 보세요.';}));});
const storageKey='esp32-lab-lesson1-v1';const fields=[...document.querySelectorAll('[data-save]')];
try{const data=JSON.parse(localStorage.getItem(storageKey)||'{}');fields.forEach(field=>{if(typeof data[field.id]==='string')field.value=data[field.id];});if([...$('mission').options].some(o=>o.value===data.mission)){$('mission').value=data.mission;updatePrompt();}}catch{$('save-status').textContent='자동 저장을 사용할 수 없어요. 기록을 내려받아 주세요.';}
function save(){try{const data={mission:$('mission').value};fields.forEach(f=>data[f.id]=f.value);localStorage.setItem(storageKey,JSON.stringify(data));$('save-status').textContent='이 브라우저에 저장했어요 · 제출되지 않아요';}catch{$('save-status').textContent='저장 공간을 사용할 수 없어요. 기록을 내려받아 주세요.';}}
fields.forEach(f=>f.addEventListener('input',save));$('mission').addEventListener('change',save);
$('download').addEventListener('click',()=>{const text=`ESP32 LAB · 1차시 탐구 기록\n\n선택한 신호: ${$('mission').value}\n\n[실험 전 예상]\n${$('prediction').value}\n\n[바꾼 값과 관찰]\n${$('observation').value}\n\n[AI 검증 · 짝 피드백 · 수정]\n${$('feedback-note').value}\n\n[새로운 활용과 다음 질문]\n${$('transfer').value}\n`;const url=URL.createObjectURL(new Blob(['\ufeff',text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='ESP32_1차시_탐구기록.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('탐구 기록 파일을 내려받습니다.');});
let resetArmed=false,resetTimer;
$('reset').addEventListener('click',()=>{if(!resetArmed){resetArmed=true;$('reset').textContent='정말 지우기 · 다시 누르세요';toast('필요한 기록을 내려받았나요? 한 번 더 누르면 지워집니다.');resetTimer=setTimeout(()=>{resetArmed=false;$('reset').textContent='내 기록 지우기';},6000);return;}clearTimeout(resetTimer);resetArmed=false;fields.forEach(f=>f.value='');$('mission').selectedIndex=0;updatePrompt();try{localStorage.removeItem(storageKey);}catch{}$('reset').textContent='내 기록 지우기';$('save-status').textContent='기록을 지웠어요 · 새 기록은 자동 저장돼요';toast('탐구 기록을 지웠어요.');});
$('print').addEventListener('click',()=>window.print());
let openedForPrint=[];window.addEventListener('beforeprint',()=>{openedForPrint=[...document.querySelectorAll('details:not([open])')];openedForPrint.forEach(d=>d.open=true);});window.addEventListener('afterprint',()=>openedForPrint.forEach(d=>d.open=false));
const sections=[...document.querySelectorAll('main>section')];const links=[...document.querySelectorAll('nav a')];
function activeSection(){let current=sections[0];for(const s of sections){if(s.getBoundingClientRect().top<=150)current=s;}links.forEach(a=>{const active=a.hash==='#'+current.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});}window.addEventListener('scroll',activeSection,{passive:true});activeSection();
