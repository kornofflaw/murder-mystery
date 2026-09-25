// main.js — the game engine: rooms, examining, interviews, notebook,
// accusation. All story content comes from case.js.

import { CASE } from './case.js';
import { load, save, remove } from './storage.js';

const SAVE_KEY = 'mm-save-' + CASE.id;
const MAX_ACCUSATIONS = 3;

const $ = (id) => document.getElementById(id);

function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) n.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null) n.append(kid);
  return n;
}

// ---------- state ----------

function freshState() {
  return {
    room: CASE.rooms[0].id,
    visited: [CASE.rooms[0].id],
    examined: [],          // 'roomId/itemId'
    clues: [...CASE.startClues],
    asked: {},             // suspectId -> [topicIds in order asked]
    accusations: [],       // { culprit, method, motive, correct }
    solved: false,
    introSeen: false,
  };
}

let state = Object.assign(freshState(), load(SAVE_KEY, {}));
const persist = () => save(SAVE_KEY, state);

const roomById = (id) => CASE.rooms.find((r) => r.id === id);
const suspectById = (id) => CASE.suspects.find((s) => s.id === id);
const hasClue = (id) => state.clues.includes(id);
const askedOf = (sid) => state.asked[sid] || [];

function addClue(id) {
  if (!id || hasClue(id)) return false;
  state.clues.push(id);
  toast((CASE.clues[id].kind === 'testimony' ? 'Testimony noted: ' : 'Evidence noted: ') + CASE.clues[id].title);
  return true;
}

function topicOpen(t) {
  return (t.requires || []).every(hasClue);
}

function newQuestions(s) {
  const asked = askedOf(s.id);
  return s.topics.filter((t) => topicOpen(t) && !asked.includes(t.id)).length;
}

// ---------- rooms ----------

function renderRooms() {
  const list = $('room-list');
  list.replaceChildren();
  for (const r of CASE.rooms) {
    const left = r.items.filter((i) => !state.examined.includes(r.id + '/' + i.id)).length;
    const people = CASE.suspects.filter((s) => s.room === r.id);
    const talk = people.some((s) => newQuestions(s) > 0);
    const li = el('li', {},
      el('button', {
        class: 'room-btn' + (r.id === state.room ? ' current' : '') + (state.visited.includes(r.id) ? '' : ' unvisited'),
        onclick: () => goTo(r.id),
      },
        el('span', { class: 'room-label' }, r.name),
        el('span', { class: 'room-meta' },
          talk ? el('span', { class: 'dot dot-talk', title: 'New questions to ask' }) : null,
          left ? el('span', { class: 'dot', title: left + ' things not yet examined' }) : null,
        ),
      ),
    );
    list.append(li);
  }
}

function goTo(id) {
  state.room = id;
  if (!state.visited.includes(id)) state.visited.push(id);
  persist();
  $('reading').hidden = true;
  render();
  $('room').scrollTop = 0;
}

function renderRoom() {
  const r = roomById(state.room);
  $('room-name').textContent = r.name;
  $('room-desc').textContent = r.desc;

  const people = CASE.suspects.filter((s) => s.room === r.id);
  $('people-wrap').hidden = people.length === 0;
  $('people').replaceChildren(...people.map((s) => {
    const n = newQuestions(s);
    return el('button', { class: 'person', onclick: () => openInterview(s.id) },
      portrait(s),
      el('span', { class: 'person-text' },
        el('strong', {}, s.name),
        el('span', { class: 'role' }, s.role),
      ),
      n ? el('span', { class: 'badge badge-talk' }, n + ' new') : null,
    );
  }));

  $('items').replaceChildren(...r.items.map((it) => {
    const done = state.examined.includes(r.id + '/' + it.id);
    return el('button', { class: 'item' + (done ? ' done' : ''), onclick: () => examine(r, it) },
      it.name, done ? el('span', { class: 'tick' }, ' ✓') : null);
  }));
}

function examine(r, it) {
  const key = r.id + '/' + it.id;
  if (!state.examined.includes(key)) state.examined.push(key);
  const gotNew = addClue(it.clue);
  persist();
  const box = $('reading');
  box.replaceChildren(
    el('h4', {}, it.name),
    el('p', {}, it.text),
    it.clue ? el('p', { class: 'reading-note' }, gotNew ? '✎ Added to your notebook.' : '✎ Already in your notebook.') : null,
  );
  box.hidden = false;
  box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash');
  render();
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function portrait(s) {
  const initials = s.name.replace(/^(Lady|Lord|Dr\.|Miss|Mr\.|Mrs\.)\s+/, '').split(/\s+/).map((w) => w[0]).join('').slice(0, 2);
  return el('span', { class: 'portrait portrait-' + s.id }, initials);
}

// ---------- interviews ----------

let interviewing = null;

function openInterview(sid) {
  interviewing = sid;
  const s = suspectById(sid);
  $('iv-portrait').replaceWith(Object.assign(portrait(s), { id: 'iv-portrait' }));
  $('iv-portrait').classList.add('portrait-big');
  $('iv-name').textContent = s.name;
  $('iv-role').textContent = s.role;
  $('iv-bio').textContent = s.bio;
  renderInterview();
  show('interview');
}

function renderInterview() {
  const s = suspectById(interviewing);
  const asked = askedOf(s.id);
  const log = $('iv-log');
  log.replaceChildren(...asked.map((tid) => {
    const t = s.topics.find((x) => x.id === tid);
    return el('div', { class: 'qa' },
      el('p', { class: 'q' }, t.q),
      el('p', { class: 'a' }, t.a),
    );
  }));
  if (!asked.length) log.append(el('p', { class: 'muted' }, 'They wait for your first question.'));

  const open = s.topics.filter((t) => topicOpen(t) && !asked.includes(t.id));
  $('iv-topics').replaceChildren(
    ...open.map((t) => el('button', { class: 'topic' + (t.requires ? ' topic-evidence' : ''), onclick: () => ask(s, t) },
      t.requires ? el('span', { class: 'topic-tag' }, 'Evidence') : null, t.q)),
  );
  if (!open.length) {
    $('iv-topics').append(el('p', { class: 'muted' }, 'Nothing more to ask for now. Find more evidence and come back.'));
  }
}

function ask(s, t) {
  state.asked[s.id] = [...askedOf(s.id), t.id];
  addClue(t.gives);
  persist();
  renderInterview();
  render();
  const log = $('iv-log');
  log.lastElementChild?.classList.add('flash');
  log.scrollTop = log.scrollHeight;
}

// ---------- notebook ----------

let nbTab = 'evidence';

function renderNotebook() {
  document.querySelectorAll('#nb-tabs .tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === nbTab));
  const body = $('nb-body');
  body.replaceChildren();
  const found = state.clues.map((id) => ({ id, ...CASE.clues[id] }));

  if (nbTab === 'evidence' || nbTab === 'testimony') {
    const list = found.filter((c) => c.kind === nbTab);
    if (!list.length) body.append(el('p', { class: 'muted' }, nbTab === 'evidence' ? 'Nothing yet. Examine things in each room.' : 'Nothing yet. Question the household.'));
    for (const c of list) {
      body.append(el('div', { class: 'clue' },
        el('h4', {}, c.title, c.time ? el('span', { class: 'time' }, fmtTime(c.time)) : null),
        el('p', {}, c.text)));
    }
    const total = Object.values(CASE.clues).filter((c) => c.kind === nbTab).length;
    body.append(el('p', { class: 'muted small' }, `${list.length} of ${total} found.`));
  } else if (nbTab === 'timeline') {
    const timed = found.filter((c) => c.time).sort((a, b) => a.time.localeCompare(b.time));
    if (!timed.length) body.append(el('p', { class: 'muted' }, 'No times yet.'));
    body.append(el('ol', { class: 'timeline' }, ...timed.map((c) =>
      el('li', {}, el('span', { class: 'time' }, fmtTime(c.time)), el('div', {}, el('strong', {}, c.title), el('p', {}, c.text))))));
  } else {
    for (const s of CASE.suspects) {
      const said = askedOf(s.id).length;
      body.append(el('div', { class: 'clue person-card' },
        portrait(s),
        el('div', {},
          el('h4', {}, s.name, el('span', { class: 'role' }, ' — ' + s.role)),
          el('p', {}, s.bio),
          el('p', { class: 'muted small' }, `Found in: ${roomById(s.room).name}. Questions asked: ${said}.`))));
    }
  }
  $('clue-count').textContent = state.clues.length;
}

function fmtTime(t) {
  const [h, m] = t.split(':').map(Number);
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

// ---------- accusation ----------

function renderAccuse() {
  const group = (id, name, options) => $(id).replaceChildren(...options.map((o) =>
    el('label', { class: 'choice' },
      el('input', { type: 'radio', name, value: o.id, required: true }),
      el('span', {}, o.label))));
  group('acc-culprit', 'culprit', CASE.suspects.map((s) => ({ id: s.id, label: `${s.name} (${s.role.replace(/^The /, '').toLowerCase()})` })));
  group('acc-method', 'method', CASE.accusation.methods);
  group('acc-motive', 'motive', CASE.accusation.motives);
}

function submitAccusation(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const pick = { culprit: f.get('culprit'), method: f.get('method'), motive: f.get('motive') };
  const sol = CASE.solution;
  const right = ['culprit', 'method', 'motive'].filter((k) => pick[k] === sol[k]).length;
  const correct = right === 3;
  state.accusations.push({ ...pick, correct });
  if (correct) state.solved = true;
  persist();
  hide('accuse');
  e.target.reset();

  if (correct) return showVerdict(true);
  const left = MAX_ACCUSATIONS - state.accusations.length;
  if (left <= 0) return showVerdict(false);

  const name = suspectById(pick.culprit).name;
  const lines = [
    `You gather the household in the drawing room and name ${name}.`,
    right === 2 ? 'Close. Two parts of your case hold up, but one does not, and the room can feel it.'
      : right === 1 ? 'One part of your case holds. The rest falls apart under questioning.'
      : 'Nothing you say survives the first question. The household exchange glances.',
    `You have ${left} ${left === 1 ? 'chance' : 'chances'} left before dawn. Look again at the evidence.`,
  ];
  story(el('div', {}, el('h2', {}, 'Not quite, Inspector'), ...lines.map((l) => el('p', {}, l))),
    [['Keep investigating', () => hide('story')]]);
}

function showVerdict(won) {
  const found = state.clues.length;
  const total = Object.keys(CASE.clues).length;
  const key = CASE.keyClues.filter(hasClue).length;
  const tries = state.accusations.length;
  const rank = !won ? 'The killer walks free'
    : tries === 1 && key >= CASE.keyClues.length - 2 ? 'Master Detective'
    : tries === 1 ? 'Sharp Instinct'
    : 'Got There in the End';
  const sus = suspectById(CASE.solution.culprit);

  story(el('div', {},
    el('p', { class: 'eyebrow' }, won ? 'Case closed' : 'Case unsolved'),
    el('h2', {}, won ? `${sus.name} did it.` : `It was ${sus.name}.`),
    el('p', { class: 'rank' }, rank),
    ...CASE.explanation.map((p) => el('p', {}, p)),
    el('div', { class: 'stats' },
      el('div', {}, el('strong', {}, `${found}/${total}`), el('span', {}, 'clues found')),
      el('div', {}, el('strong', {}, `${key}/${CASE.keyClues.length}`), el('span', {}, 'key clues')),
      el('div', {}, el('strong', {}, String(tries)), el('span', {}, tries === 1 ? 'accusation' : 'accusations')),
    ),
  ), [
    ['Play again', newGame],
    ['Look around the house', () => hide('story')],
  ]);
}

// ---------- story / overlays ----------

function story(content, buttons) {
  $('story-body').replaceChildren(content);
  $('story-buttons').replaceChildren(...buttons.map(([label, fn], i) =>
    el('button', { class: 'btn' + (i === 0 ? ' btn-primary btn-big' : ''), onclick: fn }, label)));
  show('story');
}

function showIntro() {
  story(el('div', {},
    el('p', { class: 'eyebrow' }, 'A murder mystery'),
    el('h1', { class: 'story-title' }, CASE.title),
    el('p', { class: 'tagline' }, CASE.tagline),
    ...CASE.intro.map((p) => el('p', {}, p)),
  ), [['Begin the investigation', () => { state.introSeen = true; persist(); hide('story'); }]]);
}

function showHelp() {
  story(el('div', {},
    el('h2', {}, 'How to play'),
    el('ul', { class: 'help' },
      el('li', {}, 'Pick a room on the left to go there.'),
      el('li', {}, 'Click things under “Look closer” to examine them. Clues go into your notebook.'),
      el('li', {}, 'Click a person to question them. New questions appear as you find evidence (a red dot on a room means someone there has something new to be asked).'),
      el('li', {}, 'The Notebook sorts everything into evidence, testimony, and a timeline.'),
      el('li', {}, `When you are sure, make an accusation: who, how, and why. You get ${MAX_ACCUSATIONS} tries.`),
      el('li', {}, 'Your progress saves automatically in this browser.'),
    ),
  ), [['Back to the case', () => hide('story')]]);
}

function newGame() {
  remove(SAVE_KEY);
  state = freshState();
  persist();
  hideAll();
  render();
  showIntro();
}

function show(id) { $(id).hidden = false; }
function hide(id) { $(id).hidden = true; }
function hideAll() { document.querySelectorAll('.overlay').forEach((o) => { o.hidden = true; }); }

let toastTimer = 0;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

// ---------- wiring ----------

function render() {
  renderRooms();
  renderRoom();
  renderNotebook();
}

$('case-title').textContent = CASE.title;
document.title = CASE.title;

$('btn-notebook').onclick = () => { renderNotebook(); show('notebook'); };
$('btn-accuse').onclick = () => show('accuse');
$('btn-help').onclick = showHelp;
$('btn-new').onclick = () => { if (confirm('Start the case again from the beginning? Your progress will be lost.')) newGame(); };
$('nb-tabs').onclick = (e) => { if (e.target.dataset.tab) { nbTab = e.target.dataset.tab; renderNotebook(); } };
$('accuse-form').onsubmit = submitAccusation;

document.querySelectorAll('.overlay').forEach((o) => {
  o.addEventListener('click', (e) => {
    if (e.target === o && o.id !== 'story') hide(o.id);
    if (e.target.matches('[data-close]')) hide(o.id);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') ['interview', 'notebook', 'accuse'].forEach(hide);
});

renderAccuse();
render();
if (!state.introSeen) showIntro();

if (new URLSearchParams(location.search).has('debug')) {
  window.game = { CASE, get state() { return state; }, goTo, newGame, addClue, render };
}
