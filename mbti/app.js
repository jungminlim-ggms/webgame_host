'use strict';

// 모든 자료는 이 파일 안에 있습니다. 외부 요청·저장소·분석 도구를 사용하지 않습니다.
// 각 영역 5문항. 선택지의 위/아래 위치는 고르게 바꿔 두었습니다.
const QUESTIONS = [
  {id:1,axis:'EI',emoji:'🛝',place:'쉬는 시간',text:'쉬는 시간에 나는 어떻게 놀고 싶나요?',a:{type:'E',text:'여러 친구와 함께 놀이하고 싶어요.',icon:'👋'},b:{type:'I',text:'혼자 또는 친한 친구 한 명과 조용히 놀고 싶어요.',icon:'🍀'}},
  {id:2,axis:'SN',emoji:'🎨',place:'그림 그리는 시간',text:'그리고 싶은 그림을 마음대로 고를 수 있어요.',a:{type:'S',text:'내가 본 동물이나 꽃을 그리고 싶어요.',icon:'🌷'},b:{type:'N',text:'내가 상상한 동물이나 세상을 그리고 싶어요.',icon:'🌈'}},
  {id:3,axis:'TF',emoji:'✏️',place:'친구와 함께',text:'친구가 아끼는 연필을 잃어버려 속상해해요. 먼저 어떤 말을 할까요?',a:{type:'F',text:'“많이 속상하지? 내가 옆에 있어 줄게.”',icon:'💛'},b:{type:'T',text:'“마지막에 어디서 썼어? 같이 찾아보자.”',icon:'🔍'}},
  {id:4,axis:'JP',emoji:'🧸',place:'놀이터에 가기 전',text:'친구와 놀기로 했어요. 나는 어떤 쪽이 편한가요?',a:{type:'P',text:'만나서 하고 싶은 놀이를 골라요.',icon:'🎈'},b:{type:'J',text:'무슨 놀이를 할지 미리 정해요.',icon:'📝'}},
  {id:5,axis:'EI',emoji:'👋',place:'새 모둠에서',text:'처음 함께하는 친구들과 모둠이 되었어요.',a:{type:'I',text:'친구들 이야기를 조금 듣고 내 이야기를 해요.',icon:'👂'},b:{type:'E',text:'먼저 인사하고 내 이야기를 꺼내요.',icon:'💬'}},
  {id:6,axis:'SN',emoji:'🧱',place:'블록 놀이',text:'마음대로 블록을 만들 수 있어요. 무엇을 만들까요?',a:{type:'N',text:'날아다니는 집처럼 새로운 것을 만들어요.',icon:'🚀'},b:{type:'S',text:'우리 집이나 자동차처럼 본 것을 만들어요.',icon:'🏠'}},
  {id:7,axis:'TF',emoji:'🖍️',place:'만들기 시간',text:'친구가 작품의 어느 곳을 더 꾸밀지 물어봐요.',a:{type:'T',text:'더 튼튼하게 만들 방법을 함께 찾아요.',icon:'🛠️'},b:{type:'F',text:'친구가 좋아하는 부분부터 물어봐요.',icon:'💬'}},
  {id:8,axis:'JP',emoji:'🎒',place:'나들이 계획',text:'가족과 공원에 가요. 어떤 방법이 더 좋은가요?',a:{type:'J',text:'어디부터 둘러볼지 정하고 가요.',icon:'🗺️'},b:{type:'P',text:'걷다가 마음에 드는 곳에 들러요.',icon:'🌼'}},
  {id:9,axis:'EI',emoji:'🏡',place:'쉬는 날',text:'자유롭게 쉬는 날이에요. 어떤 시간이 더 좋은가요?',a:{type:'E',text:'친구나 가족과 이야기를 나누며 놀아요.',icon:'🧑‍🤝‍🧑'},b:{type:'I',text:'혼자 그림을 그리거나 책을 보며 쉬어요.',icon:'📖'}},
  {id:10,axis:'SN',emoji:'☁️',place:'하늘을 보며',text:'하늘에 구름이 떠 있어요. 무엇이 먼저 눈에 들어오나요?',a:{type:'S',text:'구름의 색과 크기, 움직이는 모습이 보여요.',icon:'👀'},b:{type:'N',text:'구름을 보며 동물이나 이야기가 떠올라요.',icon:'💭'}},
  {id:11,axis:'TF',emoji:'🎲',place:'새 놀이 정하기',text:'친구들과 새 놀이의 규칙을 만들어요. 무엇을 먼저 생각할까요?',a:{type:'F',text:'친구들이 모두 즐겁게 할 수 있을지 생각해요.',icon:'🤝'},b:{type:'T',text:'규칙이 누구에게나 똑같이 적용될지 생각해요.',icon:'⚖️'}},
  {id:12,axis:'JP',emoji:'📚',place:'자유 활동 시간',text:'그림, 책 읽기, 블록 놀이를 모두 할 수 있어요.',a:{type:'P',text:'그때 하고 싶은 활동부터 해요.',icon:'🎯'},b:{type:'J',text:'어떤 순서로 할지 먼저 정해요.',icon:'📋'}},
  {id:13,axis:'EI',emoji:'🐣',place:'재미있는 발견',text:'재미있는 것을 발견했어요. 나는 보통 어떻게 하나요?',a:{type:'I',text:'혼자 조금 더 살펴본 뒤 알려 줘요.',icon:'🔎'},b:{type:'E',text:'“이것 봐!” 하고 바로 이야기를 나눠요.',icon:'💡'}},
  {id:14,axis:'SN',emoji:'📕',place:'이야기를 들은 뒤',text:'이야기책을 함께 읽었어요. 무엇을 더 말하고 싶나요?',a:{type:'N',text:'그다음에 어떤 일이 생길지 상상해서 말해요.',icon:'✨'},b:{type:'S',text:'책에서 어떤 일이 있었는지 자세히 말해요.',icon:'📖'}},
  {id:15,axis:'TF',emoji:'🪁',place:'함께 만드는 시간',text:'친구와 만든 종이비행기가 잘 날지 않아요.',a:{type:'T',text:'어디를 바꾸면 잘 날지 먼저 살펴봐요.',icon:'🔧'},b:{type:'F',text:'친구는 어떻게 느끼는지 먼저 물어봐요.',icon:'💛'}},
  {id:16,axis:'JP',emoji:'🧺',place:'놀이 준비',text:'오늘 할 놀이를 몇 가지 고를 수 있어요.',a:{type:'J',text:'할 놀이를 정해 두면 마음이 편해요.',icon:'✅'},b:{type:'P',text:'다른 놀이로 바꿀 수 있으면 마음이 편해요.',icon:'🦋'}},
  {id:17,axis:'EI',emoji:'🎉',place:'여럿이 놀고 난 뒤',text:'친구들과 신나게 놀았어요. 잠깐 쉴 시간이 생기면?',a:{type:'E',text:'친구와 이야기하며 쉬고 싶어요.',icon:'😊'},b:{type:'I',text:'조용한 곳에서 잠깐 혼자 쉬고 싶어요.',icon:'🌿'}},
  {id:18,axis:'SN',emoji:'🐾',place:'동물 친구 관찰',text:'동물 사진을 보며 무엇을 이야기하고 싶나요?',a:{type:'S',text:'털 색이나 발 모양처럼 보이는 것을 말해요.',icon:'🐈'},b:{type:'N',text:'이 동물이 말한다면 무슨 말을 할지 상상해요.',icon:'💬'}},
  {id:19,axis:'TF',emoji:'🏷️',place:'모둠 이름 정하기',text:'모둠 이름 후보가 여러 개예요. 무엇을 먼저 생각할까요?',a:{type:'F',text:'친구들이 어떤 이름을 좋아하는지 생각해요.',icon:'💗'},b:{type:'T',text:'우리 활동에 잘 맞는 이름인지 생각해요.',icon:'🧩'}},
  {id:20,axis:'JP',emoji:'🎵',place:'작은 발표 준비',text:'친구와 짧은 발표를 준비해요. 나는 어떤 쪽이 편한가요?',a:{type:'P',text:'여러 방법을 해 보면서 순서를 정해요.',icon:'🎭'},b:{type:'J',text:'순서를 먼저 정하고 연습해요.',icon:'📋'}}
];

const AXES = [
  {pair:'EI',title:'어디에서 힘이 나나요?',hint:'말을 잘하거나 못하는 차이가 아니에요.',left:{letter:'E',name:'외향',english:'Extraversion',short:'함께 나누기',desc:'사람들과 이야기하거나 함께 활동할 때 힘이 나는 편이에요.',example:'“같이 이야기하면서 놀자!”'},right:{letter:'I',name:'내향',english:'Introversion',short:'내 안에서 쉬기',desc:'조용히 생각하거나 혼자 쉬는 시간이 편한 편이에요.',example:'“잠깐 생각하고 이야기할게.”'}},
  {pair:'SN',title:'무엇에 눈길이 가나요?',hint:'S도 상상하고, N도 자세히 관찰해요.',left:{letter:'S',name:'감각',english:'Sensing',short:'보고 겪은 것',desc:'직접 보고 듣거나 해 본 것에 먼저 관심이 가는 편이에요.',example:'“잎이 둥글고 가장자리가 뾰족해.”'},right:{letter:'N',name:'직관',english:'Intuition',short:'상상과 가능성',desc:'새로운 생각이나 앞으로 생길 일에 관심이 가는 편이에요.',example:'“이 잎이 배라면 어디로 갈까?”'}},
  {pair:'TF',title:'정할 때 무엇을 먼저 생각하나요?',hint:'T와 F 모두 이유를 생각하고 친구를 배려할 수 있어요.',left:{letter:'T',name:'사고',english:'Thinking',short:'이유와 기준',desc:'왜 그런지 이유를 살피고 같은 기준으로 정하려는 편이에요.',example:'“모두에게 같은 규칙이면 좋겠어.”'},right:{letter:'F',name:'감정',english:'Feeling',short:'마음과 소중한 것',desc:'사람의 마음과 소중하게 여기는 것을 생각하는 편이에요.',example:'“우리에게 어떤 것이 중요할까?”'}},
  {pair:'JP',title:'어떤 순서로 해 보고 싶나요?',hint:'J는 착하고 P는 게으르다는 뜻이 아니에요.',left:{letter:'J',name:'판단',english:'Judging',short:'먼저 정하기',desc:'할 일이나 순서를 미리 정해 두면 편한 편이에요.',example:'“그림을 그리고, 제목을 쓰자.”'},right:{letter:'P',name:'인식',english:'Perceiving',short:'열어 두고 바꾸기',desc:'여러 방법을 해 보고 상황에 맞게 바꾸는 것이 편한 편이에요.',example:'“해 보면서 더 좋은 방법을 찾자.”'}}
];

// 동물은 기억하기 위한 창작 별명입니다. 능력·인기·도덕성을 연결하지 않습니다.
const TYPES = {
  ENFP:{animal:'호기심 참새',emoji:'🐦',short:'새로운 생각을 함께 나눠요.',desc:'친구와 생각을 나누며 새로운 놀이를 떠올리는 모습이 있을 수 있어요. 서로 좋아하는 것을 듣고 놀이를 바꾸어 보는 것도 즐길 수 있어요.',tip:'떠오른 생각 하나를 친구에게 들려주고 친구의 생각도 들어 봐요.'},
  ENFJ:{animal:'다정한 강아지',emoji:'🐶',short:'마음을 모아 함께 준비해요.',desc:'함께하고 싶은 일을 이야기하고, 친구들의 마음을 살피며 순서를 정하는 모습이 있을 수 있어요.',tip:'친구의 바람과 나의 바람을 하나씩 이야기해 봐요.'},
  ENTP:{animal:'궁금한 개구리',emoji:'🐸',short:'다른 방법을 찾아 이야기해요.',desc:'“다르게 해 보면 어떨까?”를 친구와 나누는 모습이 있을 수 있어요. 여러 방법의 이유를 살피며 새로 시도하는 것을 즐길 수 있어요.',tip:'새 방법을 제안한 뒤 친구가 생각할 시간도 기다려 줘요.'},
  ENTJ:{animal:'작전 짜는 호랑이',emoji:'🐯',short:'생각을 나누고 순서를 정해요.',desc:'친구와 목표를 이야기하고, 어떻게 하면 좋을지 이유를 따져 순서를 만드는 모습이 있을 수 있어요.',tip:'내가 정한 순서를 친구와 함께 바꾸어 봐도 좋아요.'},
  ESFP:{animal:'함께 노는 펭귄',emoji:'🐧',short:'지금의 즐거움을 함께 찾아요.',desc:'함께 직접 해 보는 활동을 즐기고, 친구들의 마음에 따라 다른 놀이도 해 보는 모습이 있을 수 있어요.',tip:'오늘 재미있었던 장면과 그때의 마음을 나누어 봐요.'},
  ESFJ:{animal:'마음 나누는 오리',emoji:'🦆',short:'친구와 필요한 일을 챙겨요.',desc:'친구와 이야기하며 지금 필요한 것을 살피고, 함께할 일을 미리 준비하는 모습이 있을 수 있어요.',tip:'도움을 주기 전에 “무엇이 필요해?”라고 물어봐요.'},
  ESTP:{animal:'시도하는 원숭이',emoji:'🐒',short:'직접 해 보며 방법을 찾아요.',desc:'친구와 직접 해 보면서 어떤 방법이 잘 되는지 살피는 모습이 있을 수 있어요. 상황에 맞게 방법을 바꾸는 것도 편할 수 있어요.',tip:'해 본 방법 중 무엇이 달랐는지 친구와 비교해 봐요.'},
  ESTJ:{animal:'차근차근 꿀벌',emoji:'🐝',short:'함께 할 일을 또박또박 정해요.',desc:'친구와 실제로 해야 할 일을 이야기하고, 같은 기준과 순서로 준비하는 모습이 있을 수 있어요.',tip:'순서를 정할 때 친구가 원하는 방법도 하나 넣어 봐요.'},
  INFP:{animal:'꿈꾸는 토끼',emoji:'🐰',short:'내 마음속 이야기를 키워요.',desc:'조용히 상상하고 나에게 소중한 마음을 살피는 모습이 있을 수 있어요. 생각이 바뀌면 새로운 이야기를 만들어 볼 수도 있어요.',tip:'나에게 소중한 것을 그림이나 말로 표현해 봐요.'},
  INFJ:{animal:'생각하는 사슴',emoji:'🦌',short:'소중한 생각을 천천히 준비해요.',desc:'조용히 앞으로의 모습을 상상하고, 소중한 마음을 담아 계획하는 모습이 있을 수 있어요.',tip:'함께 해 보고 싶은 일을 친구에게 작은 말로 꺼내 봐요.'},
  INTP:{animal:'탐구하는 부엉이',emoji:'🦉',short:'왜 그런지 여러 생각을 해요.',desc:'혼자 곰곰이 이유를 생각하고 다른 가능성을 찾아보는 모습이 있을 수 있어요. 궁금한 것을 새로운 방법으로 살펴볼 수도 있어요.',tip:'궁금한 점 하나를 적고 친구의 설명도 들어 봐요.'},
  INTJ:{animal:'계획하는 여우',emoji:'🦊',short:'생각을 이어 방법을 준비해요.',desc:'혼자 생각을 모으고 앞으로 할 일의 이유와 순서를 준비하는 모습이 있을 수 있어요.',tip:'계획 중 바꾸어도 괜찮은 부분을 하나 찾아봐요.'},
  ISFP:{animal:'느끼는 햄스터',emoji:'🐹',short:'작은 발견과 마음을 즐겨요.',desc:'조용히 주변을 살피고, 내가 좋아하는 느낌을 따라 해 보는 모습이 있을 수 있어요. 마음에 드는 활동을 천천히 즐길 수도 있어요.',tip:'오늘 눈에 들어온 색이나 모양과 그 느낌을 나눠 봐요.'},
  ISFJ:{animal:'살피는 아기 양',emoji:'🐑',short:'주변을 살피며 함께 준비해요.',desc:'조용히 실제 경험을 떠올리고, 친구와 나에게 필요한 것을 미리 준비하는 모습이 있을 수 있어요.',tip:'친구를 도울 때 내 마음과 쉬는 시간도 함께 살펴요.'},
  ISTP:{animal:'뚝딱 고양이',emoji:'🐱',short:'차분히 해 보며 이유를 찾아요.',desc:'조용히 직접 살펴보고 무엇이 잘 되는지 시험하는 모습이 있을 수 있어요. 해 보면서 방법을 바꾸는 것도 편할 수 있어요.',tip:'직접 알아낸 방법을 친구에게 한 단계씩 알려 줘요.'},
  ISTJ:{animal:'준비하는 다람쥐',emoji:'🐿️',short:'경험을 떠올리며 순서를 세워요.',desc:'조용히 직접 해 본 일을 떠올리고, 이유와 기준에 맞게 순서를 준비하는 모습이 있을 수 있어요.',tip:'익숙한 방법과 새로운 방법을 하나씩 비교해 봐요.'}
};

const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state = {answers:Array(20).fill(null),index:0,started:false,completed:false,page:'home',result:null,filter:'all',reduced:window.matchMedia('(prefers-reduced-motion: reduce)').matches};
let celebrationTimeout;

function calculate(answers) {
  const scores = Object.fromEntries('EISNTFJP'.split('').map(l=>[l,0]));
  const neutral = {EI:0,SN:0,TF:0,JP:0};
  QUESTIONS.forEach((q,i)=>{
    if(answers[i]==='neutral') neutral[q.axis]++;
    else if(answers[i]==='a'||answers[i]==='b') scores[q[answers[i]].type]++;
  });
  const axes=AXES.map(axis=>{
    const a=scores[axis.left.letter],b=scores[axis.right.letter];
    return {pair:axis.pair,a,b,neutral:neutral[axis.pair],letter:a===b?'X':a>b?axis.left.letter:axis.right.letter};
  });
  return {scores,axes,code:axes.map(a=>a.letter).join('')};
}

function navigate(page) {
  if(location.hash==='#'+page) route();
  else location.hash=page;
}

function route() {
  let page=location.hash.slice(1)||'home';
  if(!['home','quiz','result','letters','friends','guide'].includes(page))page='home';
  if(page==='quiz'&&!state.started)page='home';
  if(page==='result'&&!state.completed)page=state.started?'quiz':'home';
  if(location.hash!=='#'+page)history.replaceState(null,'','#'+page);
  state.page=page;
  document.querySelectorAll('.page').forEach(el=>el.hidden=el.id!==page);
  document.querySelectorAll('nav>a').forEach(a=>{if(a.hash==='#'+page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.querySelectorAll('.result-link').forEach(a=>a.hidden=!state.completed);
  $('continue').hidden=!state.started;
  $('start').textContent=state.started?'새로 탐험하기 ↗':'내 친구 찾으러 출발! ↗';
  if(page==='quiz')renderQuestion();
  if(page==='result')renderResult();
  if(page==='letters')renderLetters();
  if(page==='friends')renderFriends();
  const titles={home:'home-title',quiz:'question-title',result:'result-title',letters:'letters-title',friends:'friends-title',guide:'guide-title'};
  $(titles[page]).focus({preventScroll:true});
  window.scrollTo(0,0);
  document.title=({home:'내 마음과 닮은 동물 친구',quiz:'이야기 '+(state.index+1)+' / 20',result:'오늘 발견한 나의 모습',letters:'알파벳 놀이터',friends:'동물 친구 도감',guide:'보호자 · 선생님 안내'}[page])+' · 마음숲 탐험대';
  if(page!=='result')clearCelebration();
}

function begin() {
  state.answers.fill(null);state.index=0;state.started=true;state.completed=false;state.result=null;
  navigate('quiz');
}

function requestRestart() {
  if(state.started&&state.answers.some(a=>a!==null))$('restart-dialog').showModal();
  else begin();
}

function renderQuestion() {
  const q=QUESTIONS[state.index];
  const answered=state.answers.filter(a=>a!==null).length;
  $('question-count').textContent=`이야기 ${state.index+1} / 20`;
  $('question-emoji').textContent=q.emoji;
  $('question-place').textContent=q.place;
  $('question-title').textContent=q.text;
  $('progress-fill').style.width=answered/20*100+'%';
  $('quiz-progress').setAttribute('aria-valuenow',answered);
  $('progress-label').textContent=answered+'개 골랐어요';
  const options=[{value:'a',...q.a},{value:'b',...q.b},{value:'neutral',text:'둘 다 비슷해요 · 잘 모르겠어요',icon:'🌿'}];
  $('choices').innerHTML='<legend class="sr-only">나와 더 가까운 답 고르기</legend>'+options.map(o=>`<label class="choice ${o.value==='neutral'?'neutral ':''}${state.answers[state.index]===o.value?'selected':''}"><span class="choice-symbol" aria-hidden="true">${o.icon}</span><span class="choice-text">${escapeHtml(o.text)}</span><input type="radio" name="answer" value="${o.value}" ${state.answers[state.index]===o.value?'checked':''}></label>`).join('');
  $('previous').disabled=state.index===0;
  $('next-question').disabled=state.answers[state.index]===null;
  $('next-question').textContent=state.index===19?'내 친구 만나기 ✨':'다음 이야기 →';
  $('encouragement').textContent=state.index<5?'서두르지 않아도 돼요. 내 마음을 생각해 봐요.':state.index<10?'잘 알아가고 있어요. 어떤 답도 괜찮아요.':state.index<15?'반을 넘었어요! 잠깐 쉬었다 해도 좋아요.':'조금만 더 가면 동물 친구를 만나요.';
}

$('choices').addEventListener('change',e=>{
  if(e.target.name!=='answer')return;
  state.answers[state.index]=e.target.value;
  // 누적 가산하지 않고 현재 응답에서 다시 계산하므로 답을 바꾸어도 중복되지 않습니다.
  if(state.completed)state.result=calculate(state.answers);
  document.querySelectorAll('.choice').forEach(label=>label.classList.toggle('selected',label.querySelector('input').checked));
  const answered=state.answers.filter(a=>a!==null).length;
  $('progress-fill').style.width=answered/20*100+'%';$('quiz-progress').setAttribute('aria-valuenow',answered);$('progress-label').textContent=answered+'개 골랐어요';
  $('next-question').disabled=false;
  $('live-message').textContent='골랐어요. 다음 이야기 버튼을 눌러 주세요.';
});

$('next-question').addEventListener('click',()=>{
  if(state.answers[state.index]===null)return;
  if(state.index<19){state.index++;renderQuestion();$('question-title').focus();window.scrollTo(0,0);document.title=`이야기 ${state.index+1} / 20 · 마음숲 탐험대`;}
  else {
    const missing=state.answers.findIndex(a=>a===null);
    if(missing>=0){state.index=missing;renderQuestion();$('question-title').focus();return;}
    state.completed=true;state.result=calculate(state.answers);navigate('result');celebrate();
  }
});
$('previous').addEventListener('click',()=>{if(state.index>0){state.index--;renderQuestion();$('question-title').focus();window.scrollTo(0,0);document.title=`이야기 ${state.index+1} / 20 · 마음숲 탐험대`;}});

function resultNotice(axis) {
  if(axis.letter==='X')return '둘 다 살펴봐요';
  if(axis.neutral>=3)return '천천히 알아가는 중';
  if(Math.abs(axis.a-axis.b)===1)return '조금 더 골랐어요';
  return '오늘 더 골랐어요';
}

function renderResult() {
  if(!state.result)return;
  const result=state.result;
  const type=TYPES[result.code];
  const matchCount=Object.keys(TYPES).filter(code=>[...code].every((l,i)=>result.code[i]==='X'||result.code[i]===l)).length;
  $('result-content').innerHTML=`<div class="result-layout"><article class="result-passport"><div class="passport-label">MY LITTLE FOREST FRIEND</div><span class="result-animal" aria-hidden="true">${type?type.emoji:'🌳'}</span><div class="result-type">${result.code}</div><h2>${type?type.animal:'여러 모습이 자라는 나'}</h2><p>${type?type.short:'아직 한쪽을 고르지 않은 글자가 있어요.<br>여러 친구의 이야기를 함께 살펴봐요.'}</p><p class="passport-foot">${type?'동물은 기억하기 쉬운 별명이에요.':'X는 동점 표시예요. 새로운 MBTI 성향은 아니에요.'}<br>이 결과가 나의 전부는 아니에요.</p></article><div class="result-explain"><h2>나는 이렇게 골랐어요</h2>${result.axes.map((a,i)=>{
    const axis=AXES[i];const selected=a.letter===axis.left.letter?axis.left:axis.right;
    return `<div class="answer-axis"><div class="axis-top"><strong>${a.letter==='X'?`${axis.left.letter} / ${axis.right.letter} 둘 다`:a.letter+' · '+selected.short}</strong><span>${resultNotice(a)}</span></div><div class="axis-dots" aria-hidden="true">${Array.from({length:a.a},()=>'<span>'+axis.left.letter+'</span>').join('')}${Array.from({length:a.b},()=>'<span class="other">'+axis.right.letter+'</span>').join('')}${Array.from({length:a.neutral},()=>'<span class="unsure">?</span>').join('')}</div><p class="axis-counts">${axis.left.letter} ${a.a}개 · ${axis.right.letter} ${a.b}개 · 둘 다/모름 ${a.neutral}개</p></div>`;
  }).join('')}<p class="small-note" style="margin-top:14px">이 숫자는 답을 고른 횟수예요. 성격의 비율이나 점수가 아니에요.</p></div></div><div class="gentle-note"> <span aria-hidden="true">${type?'🍀':'🌼'}</span><p>${type?escapeHtml(type.desc):`오늘 답과 함께 살펴볼 수 있는 유형이 ${matchCount}가지 있어요. ‘동물 친구들’에서 여러 모습을 알아봐요. 지금 하나로 정하지 않아도 괜찮아요.`}</p></div>`;
}

function renderLetters() {
  $('my-code-banner').hidden=!state.completed;
  if(state.completed)$('my-code-banner').innerHTML=`오늘 내 글자 <strong>${state.result.code}</strong> · 초록 바탕의 설명을 먼저 읽어 봐요.${state.result.code.includes('X')?'<br>X 자리에서는 두 설명을 함께 읽어요.':''}`;
  $('letter-pairs').innerHTML=AXES.map((axis,i)=>{
    const letter=state.result?.axes[i].letter;
    return `<article class="letter-pair"><div class="pair-header"><span class="pair-number">${i+1}</span><h2>${axis.title}</h2></div><div class="pair-content">${[axis.left,axis.right].map(item=>`<div class="letter-item ${letter===item.letter||letter==='X'?'chosen':''}"><div class="letter-title"><span class="letter-big">${item.letter}</span><div class="letter-name"><strong>${item.name} · ${item.short}</strong><small lang="en">${item.english}</small></div></div><p>${item.desc}</p><p class="example">${item.example}</p></div>`).join('')}</div><p class="pair-reminder">${axis.hint}</p></article>`;
  }).join('');
}

function renderFriends() {
  const types=Object.entries(TYPES).filter(([code])=>state.filter==='all'||code[0]===state.filter);
  $('friend-count').textContent=types.length+'명의 친구';
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===state.filter);b.setAttribute('aria-pressed',String(b.dataset.filter===state.filter));});
  $('friend-grid').innerHTML=types.map(([code,t])=>`<button class="friend-card" data-type="${code}" aria-label="${code} ${t.animal} 소개 보기"><span class="animal" aria-hidden="true">${t.emoji}</span><span class="card-arrow" aria-hidden="true">↗</span><span class="code">${code}</span><strong>${t.animal}</strong><span class="short">${t.short}</span></button>`).join('');
}

$('friend-grid').addEventListener('click',e=>{
  const card=e.target.closest('[data-type]');if(!card)return;
  const code=card.dataset.type,t=TYPES[code];
  $('friend-detail').innerHTML=`<span class="dialog-emoji" aria-hidden="true">${t.emoji}</span><div class="dialog-code">${code}</div><h2 id="friend-dialog-title">${t.animal}</h2><div class="dialog-letters">${[...code].map((l,i)=>{const item=AXES[i].left.letter===l?AXES[i].left:AXES[i].right;return `<span>${l} · ${item.short}</span>`;}).join('')}</div><p class="dialog-desc">${t.desc}</p><div class="dialog-tip"><strong>누구나 해 볼 수 있는 작은 놀이</strong><br>${t.tip}</div><p class="small-note">같은 글자를 가진 친구도 서로 다를 수 있어요.<br>이 설명과 다르더라도 괜찮아요.</p>`;
  $('friend-dialog').showModal();
});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter;renderFriends();}));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));

function clearCelebration(){clearTimeout(celebrationTimeout);$('celebration').replaceChildren();}
function celebrate(){
  clearCelebration();if(state.reduced||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const colors=['#efab57','#72a970','#e99c9a','#a5c7e8'];
  for(let i=0;i<30;i++){const bit=document.createElement('span');bit.className='confetti';bit.style.setProperty('--x',(5+Math.random()*90)+'%');bit.style.setProperty('--c',colors[i%4]);bit.style.setProperty('--delay',(Math.random()*.25)+'s');$('celebration').append(bit);}
  celebrationTimeout=setTimeout(clearCelebration,2300);
}
function setMotion(){document.body.classList.toggle('reduced-motion',state.reduced);$('motion-toggle').setAttribute('aria-pressed',String(state.reduced));$('motion-toggle').textContent=state.reduced?'움직임 줄임 ✓':'움직임 줄이기';if(state.reduced)clearCelebration();}
$('motion-toggle').addEventListener('click',()=>{state.reduced=!state.reduced;setMotion();});
$('start').addEventListener('click',requestRestart);
$('continue').addEventListener('click',()=>navigate(state.completed?'result':'quiz'));
$('restart').addEventListener('click',requestRestart);
$('cancel-restart').addEventListener('click',()=>$('restart-dialog').close());
$('confirm-restart').addEventListener('click',()=>{$('restart-dialog').close();begin();});
$('review').addEventListener('click',()=>{state.index=0;navigate('quiz');});
$('print').addEventListener('click',()=>window.print());
window.addEventListener('hashchange',route);
window.addEventListener('beforeunload',e=>{if(state.started&&!state.completed&&state.answers.some(a=>a!==null)){e.preventDefault();e.returnValue='';}});
setMotion();route();

