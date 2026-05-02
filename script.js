function showPage(id){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

function startApp(){
 showPage('progressPage');
 startProgress();
}

function startProgress(){
 let progress=0;
 let interval=setInterval(()=>{
  progress+=2;
  document.getElementById('progressBar').style.width=progress+'%';
  document.getElementById('percent').innerText=progress+'%';
  if(progress>=120){
   clearInterval(interval);
   setTimeout(()=>{showPage('puzzlePage');initPuzzle();},500);
  }
 },50);
}

// puzzle
const size=3;
let selected=null;

function initPuzzle(){
 const board=document.getElementById('puzzleBoard');
 board.innerHTML='';
 let arr=[...Array(size*size).keys()];
 arr.sort(()=>Math.random()-0.5);

 arr.forEach(val=>{
  let div=document.createElement('div');
  div.className='piece';
  div.dataset.value=val;
  setPos(div,val);

  div.onclick=()=>tap(div);
  div.ontouchstart=()=>tap(div);

  board.appendChild(div);
 });
}

function tap(piece){
 if(!selected){
  selected=piece;
  piece.style.outline='3px solid red';
 }else{
  let temp=piece.dataset.value;
  piece.dataset.value=selected.dataset.value;
  selected.dataset.value=temp;
  selected.style.outline='none';
  selected=null;
  update();
  if(check()) win();
 }
}

function setPos(p,val){
 let x=val%size;
 let y=Math.floor(val/size);
 p.style.backgroundPosition=`${-(x*100)}px ${-(y*100)}px`;
}

function update(){
 document.querySelectorAll('.piece').forEach(p=>setPos(p,p.dataset.value));
}

function check(){
 let pieces=document.querySelectorAll('.piece');
 for(let i=0;i<pieces.length;i++){
  if(pieces[i].dataset.value!=i)return false;
 }
 return true;
}

function win(){
 confetti({particleCount:200,spread:100});
 setTimeout(()=>showPage('questionPage'),1500);
}

function yesClicked(){ showPage('resultPage'); }

function moveNo(){
 let btn=document.getElementById('noBtn');
 btn.style.position='absolute';
 btn.style.left=Math.random()*window.innerWidth+'px';
 btn.style.top=Math.random()*window.innerHeight+'px';
}
