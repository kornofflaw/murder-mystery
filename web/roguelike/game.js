const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d', { alpha:false });
ctx.imageSmoothingEnabled = false;

const ui = {
  turns: document.querySelector('#turns'),
  resolve: document.querySelector('#resolve'),
  clues: document.querySelector('#clues'),
  clueTotal: document.querySelector('#clue-total'),
  notebook: document.querySelector('#notebook'),
  objective: document.querySelector('#objective'),
  prompt: document.querySelector('#prompt'),
  log: document.querySelector('#log'),
  dialog: document.querySelector('#dialog'),
  dialogKicker: document.querySelector('#dialog-kicker'),
  dialogTitle: document.querySelector('#dialog-title'),
  dialogText: document.querySelector('#dialog-text'),
};

const TILE_W = 48;
const TILE_H = 24;
const WALL_H = 34;
const MAP_W = 18;
const MAP_H = 16;
const ORIGIN_X = canvas.width / 2;
const ORIGIN_Y = 118;

const colors = {
  floor:'#6f6655', floor2:'#756c59', wallN:'#2b332e', wallE:'#232b26',
  trim:'#a0875c', dark:'#0a0d0b', fog:'#060806', rug:'#693a36',
  glass:'#39535a', wood:'#49392b', clue:'#d3b36f', npc:'#c2bea8',
  player:'#d7dfd2', blood:'#7e3437', green:'#40533f'
};

// Safe player-facing evidence only. No solution metadata lives in this fork.
const clues = [
  {id:'body',x:8,y:3,title:'The body',text:'Lord Blackwood has no visible wound. He was violently sick before death, and his pupils are strangely wide.'},
  {id:'blotter',x:9,y:3,title:'Scrawl on the blotter',text:'A failing hand has written: “everything yellow — sick — T”. The pen lies on the floor.'},
  {id:'glass',x:10,y:3,title:'Brandy glass',text:'Green, gritty sediment clings to the glass. It smells bitter, like crushed leaves.'},
  {id:'prints',x:7,y:7,title:'Wet footprints',text:'A man’s muddy boot prints run from the boot-room passage toward the study.'},
  {id:'boots',x:3,y:11,title:'Soaked riding boots',text:'The boots are wet, packed with dark potting soil, and carry a torn toothed leaf.'},
  {id:'foxglove',x:2,y:14,title:'Stripped foxglove',text:'Freshly stripped stems shine with sap in the greenhouse beds.'},
  {id:'mortar',x:4,y:14,title:'Mortar and muslin',text:'Green pulp remains in a stone mortar beside stained muslin.'},
  {id:'decanter',x:13,y:10,title:'Pantry decanter',text:'The brandy in the decanter is perfectly clear. No green sediment is visible.'},
  {id:'billiard',x:14,y:5,title:'Cold billiard room',text:'The room is cold and barely lit. Most balls remain racked.'},
];

const npcs = [
  {id:'margaret',name:'Lady Margaret',x:11,y:11,line:'“The storm has trapped us all, Inspector. Ask what you must.”'},
  {id:'hale',name:'Dr. Hale',x:12,y:11,line:'“I want a proper post-mortem before anyone calls this natural.”'},
  {id:'clara',name:'Clara Finch',x:5,y:5,line:'“I was working in the library. I heard more than I wished to.”'},
  {id:'thomas',name:'Thomas Reed',x:14,y:11,line:'“Thirty years I served this house. Tonight it feels like a stranger.”'},
  {id:'victor',name:'Victor Blackwood',x:15,y:5,line:'“Surely you are not turning a family tragedy into theatre.”'},
];

const map = Array.from({length:MAP_H},()=>Array(MAP_W).fill(1));
const blocked = new Set();

function blockRect(x0,y0,x1,y1){
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++) blocked.add(`${x},${y}`);
}

// Furniture / architectural blockers leave navigable routes through the manor.
[
  [8,2,10,2],[10,4,10,4], // study desk/fireplace
  [4,4,4,6],[6,4,6,4],   // library shelves/table
  [14,4,16,4],[16,6,16,6], // billiard furniture
  [10,10,10,12],[12,12,12,12], // drawing room piano/sofa
  [13,9,15,9], // pantry counters
  [2,10,2,12], // boot rack
  [1,13,1,15],[5,13,5,15], // greenhouse beds
].forEach(r=>blockRect(...r));

const roomZones = [
  {name:'Study',x0:7,y0:1,x1:11,y1:4,tint:'#635949'},
  {name:'Library',x0:3,y0:3,x1:6,y1:7,tint:'#575144'},
  {name:'Billiard Room',x0:13,y0:3,x1:17,y1:7,tint:'#4c5547'},
  {name:'Great Hall',x0:6,y0:5,x1:12,y1:9,tint:'#68604f'},
  {name:'Drawing Room',x0:9,y0:10,x1:12,y1:14,tint:'#665348'},
  {name:'Pantry',x0:13,y0:9,x1:16,y1:13,tint:'#55564e'},
  {name:'Boot Room',x0:2,y0:9,x1:5,y1:12,tint:'#504c43'},
  {name:'Greenhouse',x0:1,y0:13,x1:5,y1:15,tint:'#3f5747'},
];

let state;

function reset(){
  state = {
    x:8,y:8,turns:0,resolve:8,
    found:new Set(),seen:new Set(),talked:new Set(),
    log:['The lane is flooded. Dawn is hours away. You begin in the Great Hall.'],
  };
  revealAround();
  syncUI();
  render();
  canvas.focus();
}

function iso(x,y,z=0){
  return {
    x: ORIGIN_X + (x-y)*TILE_W/2,
    y: ORIGIN_Y + (x+y)*TILE_H/2 - z
  };
}

function tilePath(x,y){
  const p=iso(x,y);
  ctx.beginPath();
  ctx.moveTo(p.x,p.y);
  ctx.lineTo(p.x+TILE_W/2,p.y+TILE_H/2);
  ctx.lineTo(p.x,p.y+TILE_H);
  ctx.lineTo(p.x-TILE_W/2,p.y+TILE_H/2);
  ctx.closePath();
}

function roomAt(x,y){
  return roomZones.find(r=>x>=r.x0&&x<=r.x1&&y>=r.y0&&y<=r.y1);
}

function seen(x,y){ return state.seen.has(`${x},${y}`); }

function revealAround(){
  for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){
    if(Math.abs(dx)+Math.abs(dy)<=4){
      const x=state.x+dx,y=state.y+dy;
      if(x>=0&&x<MAP_W&&y>=0&&y<MAP_H) state.seen.add(`${x},${y}`);
    }
  }
}

function drawTile(x,y){
  const p=iso(x,y);
  const r=roomAt(x,y);
  tilePath(x,y);
  ctx.fillStyle = r?.tint || ((x+y)%2 ? colors.floor : colors.floor2);
  ctx.fill();
  ctx.strokeStyle='#161a17';
  ctx.stroke();

  if(!seen(x,y)){
    tilePath(x,y);
    ctx.fillStyle='rgba(4,6,5,.91)';
    ctx.fill();
  }

  // perimeter wall faces create the 3D isometric silhouette
  if(seen(x,y) && (x===0 || y===0 || x===MAP_W-1 || y===MAP_H-1)){
    const top=iso(x,y,WALL_H);
    if(x===0 || y===MAP_H-1){
      ctx.beginPath();ctx.moveTo(p.x-TILE_W/2,p.y+TILE_H/2);ctx.lineTo(p.x,p.y+TILE_H);ctx.lineTo(top.x,top.y+TILE_H);ctx.lineTo(top.x-TILE_W/2,top.y+TILE_H/2);ctx.closePath();
      ctx.fillStyle=colors.wallN;ctx.fill();
    }
    if(y===0 || x===MAP_W-1){
      ctx.beginPath();ctx.moveTo(p.x+TILE_W/2,p.y+TILE_H/2);ctx.lineTo(p.x,p.y+TILE_H);ctx.lineTo(top.x,top.y+TILE_H);ctx.lineTo(top.x+TILE_W/2,top.y+TILE_H/2);ctx.closePath();
      ctx.fillStyle=colors.wallE;ctx.fill();
    }
  }
}

function drawObject(x,y,type,color,label){
  if(!seen(x,y)) return;
  const p=iso(x,y,4);
  ctx.fillStyle='rgba(0,0,0,.34)';
  ctx.beginPath();ctx.ellipse(p.x,p.y+18,10,4,0,0,Math.PI*2);ctx.fill();

  if(type==='clue'){
    ctx.fillStyle=color;
    ctx.fillRect(Math.round(p.x-4),Math.round(p.y+4),8,8);
    ctx.fillStyle='#f4deb0';
    ctx.fillRect(Math.round(p.x-2),Math.round(p.y+2),4,3);
  }else{
    ctx.fillStyle=color;
    ctx.fillRect(Math.round(p.x-5),Math.round(p.y-7),10,15);
    ctx.fillStyle='#d0b99c';
    ctx.fillRect(Math.round(p.x-4),Math.round(p.y-13),8,7);
  }

  if(Math.abs(x-state.x)+Math.abs(y-state.y)<=1){
    ctx.font='10px monospace';ctx.textAlign='center';
    ctx.fillStyle='#eee2c9';ctx.fillText(label,p.x,p.y-20);
  }
}

function drawPlayer(){
  const p=iso(state.x,state.y,7);
  ctx.fillStyle='rgba(0,0,0,.45)';
  ctx.beginPath();ctx.ellipse(p.x,p.y+20,11,4,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#d8dfd4';ctx.fillRect(Math.round(p.x-6),Math.round(p.y-9),12,18);
  ctx.fillStyle='#2d3741';ctx.fillRect(Math.round(p.x-5),Math.round(p.y+5),4,8);ctx.fillRect(Math.round(p.x+1),Math.round(p.y+5),4,8);
  ctx.fillStyle='#c6ae8d';ctx.fillRect(Math.round(p.x-5),Math.round(p.y-16),10,8);
  ctx.fillStyle='#31322d';ctx.fillRect(Math.round(p.x-7),Math.round(p.y-18),14,4);
}

function render(){
  ctx.fillStyle='#080b09';ctx.fillRect(0,0,canvas.width,canvas.height);

  // subtle rain behind the map
  ctx.strokeStyle='#1b2624';ctx.lineWidth=1;
  for(let i=0;i<55;i++){
    const x=(i*83+state.turns*5)%canvas.width;
    const y=(i*47+state.turns*9)%canvas.height;
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-4,y+9);ctx.stroke();
  }

  for(let sum=0;sum<MAP_W+MAP_H-1;sum++){
    for(let x=0;x<MAP_W;x++){
      const y=sum-x;if(y<0||y>=MAP_H)continue;
      drawTile(x,y);
      const key=`${x},${y}`;
      if(blocked.has(key)&&seen(x,y)){
        const p=iso(x,y,3);
        ctx.fillStyle=colors.wood;ctx.fillRect(p.x-8,p.y+2,16,11);
      }
      const clue=clues.find(c=>c.x===x&&c.y===y&&!state.found.has(c.id));
      if(clue) drawObject(x,y,'clue',colors.clue,'evidence');
      const npc=npcs.find(n=>n.x===x&&n.y===y);
      if(npc) drawObject(x,y,'npc',colors.npc,npc.name);
      if(state.x===x&&state.y===y) drawPlayer();
    }
  }

  const room=roomAt(state.x,state.y);
  ctx.textAlign='left';
  ctx.fillStyle='rgba(7,9,8,.86)';ctx.fillRect(14,14,220,42);
  ctx.fillStyle='#d9caab';ctx.font='bold 14px monospace';ctx.fillText(room?.name||'Servants’ Passage',25,32);
  ctx.fillStyle='#8f8878';ctx.font='11px monospace';ctx.fillText('Storm-bound · October 1926',25,47);

  updatePrompt();
}

function canMove(x,y){
  return x>=0&&x<MAP_W&&y>=0&&y<MAP_H&&!blocked.has(`${x},${y}`);
}

function move(dx,dy){
  const nx=state.x+dx,ny=state.y+dy;
  if(!canMove(nx,ny)){
    addLog('Your route is blocked.');
    render();return;
  }
  state.x=nx;state.y=ny;state.turns++;
  if(state.turns>0&&state.turns%12===0){
    state.resolve=Math.max(0,state.resolve-1);
    addLog('The storm wears on. Your resolve slips.');
  }
  revealAround();syncUI();render();
}

function nearby(){
  const all=[
    ...clues.filter(c=>!state.found.has(c.id)).map(c=>({...c,kind:'clue'})),
    ...npcs.map(n=>({...n,kind:'npc'}))
  ];
  return all.find(o=>Math.abs(o.x-state.x)+Math.abs(o.y-state.y)<=1);
}

function interact(){
  const o=nearby();
  if(!o){addLog('Nothing nearby demands your attention.');return;}
  state.turns++;
  if(o.kind==='clue'){
    state.found.add(o.id);
    openDialog('EVIDENCE RECORDED',o.title,o.text);
    addLog(`Evidence: ${o.title}`);
  }else{
    state.talked.add(o.id);
    openDialog('INTERVIEW',o.name,o.line);
    addLog(`Spoke with ${o.name}.`);
  }
  syncUI();render();
  if(state.found.size>=5){
    ui.objective.textContent='You have enough contradictions to reject the easy explanation. Keep searching: motive, method, and opportunity must still fit one person.';
  }
  if(state.found.size===clues.length){
    openDialog('CASE STATUS','The house is yielding its secrets','You have recovered every major physical clue in this prototype run. The next build will turn these discoveries into branching interrogations, procedural pressure, and a formal accusation sequence.');
  }
}

function openDialog(kicker,title,text){
  ui.dialogKicker.textContent=kicker;ui.dialogTitle.textContent=title;ui.dialogText.textContent=text;
  if(!ui.dialog.open) ui.dialog.showModal();
}

function updatePrompt(){
  const o=nearby();
  ui.prompt.textContent=o ? `E / Enter — ${o.kind==='clue'?'investigate':'question'} ${o.title||o.name}` : 'WASD / arrows to move · E or Enter to investigate';
}

function addLog(text){
  state.log.unshift(text);state.log=state.log.slice(0,7);syncLog();
}

function syncLog(){
  ui.log.replaceChildren(...state.log.map((line,i)=>{
    const d=document.createElement('div');d.className='log-line';
    d.innerHTML=i===0?`<strong>${escapeHtml(line)}</strong>`:escapeHtml(line);return d;
  }));
}

function syncUI(){
  ui.turns.textContent=state.turns;ui.resolve.textContent=state.resolve;
  ui.clues.textContent=state.found.size;ui.clueTotal.textContent=clues.length;
  const found=clues.filter(c=>state.found.has(c.id));
  ui.notebook.replaceChildren();
  if(!found.length){
    const li=document.createElement('li');li.className='muted';li.textContent='No evidence recorded yet.';ui.notebook.append(li);
  }else{
    for(const c of found){
      const li=document.createElement('li');li.textContent=c.title;ui.notebook.append(li);
    }
  }
  syncLog();
}

function escapeHtml(s){return s.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}

window.addEventListener('keydown',e=>{
  if(ui.dialog.open) return;
  const tag=document.activeElement?.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT') return;
  const key=e.key.toLowerCase();
  const dirs={arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1],arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0]};
  if(dirs[key]){e.preventDefault();move(...dirs[key]);}
  else if(key==='e'||key==='enter'){e.preventDefault();interact();}
  else if(key==='r'){e.preventDefault();reset();}
  else if(key==='n'){e.preventDefault();ui.notebook.scrollIntoView({behavior:'smooth',block:'center'});}
});

canvas.addEventListener('click',()=>canvas.focus());
ui.dialog.addEventListener('close',()=>canvas.focus());

reset();
