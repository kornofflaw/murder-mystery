// moor-scenes.js — illustrations for "The Hound of Greymoor".
// Every item in moor.js has a matching hot(id, ...) here, and every suspect
// in a room a person(id, ...).

import {
  svg, hot, person, wall, stoneWall, woodFloor, flagFloor, windowNight, door, fireplace,
  bookshelf, painting, glow, tableLamp, figure, nightSky, fog, rng, W, H, FLOOR,
} from '../art.js';

// Rolling moor hills under the moon.
function moor(horizon = 520) {
  return nightSky(horizon, { moon: [1300, 130] }) +
    `<path d="M0 ${horizon - 60} Q250 ${horizon - 150} 520 ${horizon - 70} T1050 ${horizon - 110} T1600 ${horizon - 50} V${H} H0 Z" fill="#1c2418"/>` +
    `<path d="M0 ${horizon} Q400 ${horizon - 60} 800 ${horizon - 10} T1600 ${horizon - 20} V${H} H0 Z" fill="#222c1e"/>` +
    `<path d="M1030 ${horizon - 140} l30 -40 l50 10 l30 30 Z" fill="#141a12"/>`; // a distant tor
}

function lantern(x, y) {
  return glow(x, y, 180, .9) + `<rect x="${x - 12}" y="${y - 20}" width="24" height="34" rx="4" fill="#ffd870"/><rect x="${x - 14}" y="${y - 24}" width="28" height="6" fill="#222"/><path d="M${x - 8} ${y - 24} q8 -16 16 0" stroke="#222" stroke-width="3" fill="none"/>`;
}

function pawPrint(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="#141008" opacity=".85"><ellipse cx="0" cy="0" rx="22" ry="17"/><ellipse cx="-22" cy="-24" rx="8" ry="10"/><ellipse cx="-7" cy="-32" rx="8" ry="10"/><ellipse cx="9" cy="-32" rx="8" ry="10"/><ellipse cx="23" cy="-24" rx="8" ry="10"/></g>`;
}

const gate = () => {
  let prints = '';
  const pts = [[1040, 610, -30], [980, 650, -40], [930, 700, -60], [960, 760, -110], [1040, 790, -150], [1120, 760, 160], [1150, 700, 120], [1100, 640, 60]];
  for (const [x, y, r] of pts) prints += pawPrint(x, y, .9, r);
  for (let i = 0; i < 6; i++) prints += `<ellipse cx="${1180 + i * 38}" cy="${650 - i * 18}" rx="12" ry="22" fill="#141008" opacity=".7" transform="rotate(-50 ${1180 + i * 38} ${650 - i * 18})"/>`;
  return svg(`
    ${moor(520)}
    <!-- stone wall with the wicket gate -->
    <path d="M0 470 H540 V600 H0 Z M860 470 H1600 V600 H860 Z" fill="#4a4a44"/>
    ${Array.from({ length: 30 }, (_, i) => `<rect x="${(i * 53) % 1600}" y="${480 + (i % 3) * 38}" width="48" height="30" rx="6" fill="#000" opacity=".15"/>`).join('')}
    <rect x="580" y="530" width="240" height="14" fill="#5a4a3a"/><rect x="580" y="580" width="240" height="14" fill="#5a4a3a"/>
    <path d="M590 530 L810 594" stroke="#5a4a3a" stroke-width="12"/>
    ${hot('gatepost', 'The gatepost', `<rect x="530" y="420" width="60" height="190" fill="#6a6a62"/><rect x="524" y="412" width="72" height="16" fill="#7a7a72"/><ellipse cx="548" cy="410" rx="12" ry="5" fill="#b8b4ac"/><ellipse cx="574" cy="410" rx="12" ry="5" fill="#a8a49c"/>`)}
    <rect x="810" y="420" width="60" height="190" fill="#6a6a62"/><rect x="804" y="412" width="72" height="16" fill="#7a7a72"/>
    <!-- muddy ground and path -->
    <path d="M0 600 H1600 V900 H0 Z" fill="#2a2418"/>
    <path d="M600 600 H800 L1100 900 H300 Z" fill="#3a3020"/>
    ${hot('prints', 'Paw prints', prints, [900, 560, 420, 260])}
    ${hot('body', 'Sir Roderick', `
      <path d="M380 760 Q480 720 640 740 L660 790 Q520 810 390 800 Z" fill="#1e1e24"/>
      <ellipse cx="350" cy="775" rx="34" ry="26" fill="#d8c0a8"/>
      <path d="M322 770 Q350 742 380 764" stroke="#c8c8c8" stroke-width="8" fill="none"/>
      <path d="M420 760 Q380 720 340 720" stroke="#1e1e24" stroke-width="20" stroke-linecap="round" fill="none"/><circle cx="336" cy="718" r="10" fill="#d8c0a8"/>
      <path d="M640 780 L760 800 M650 760 L760 770" stroke="#15151a" stroke-width="20" stroke-linecap="round"/>
    `, [300, 700, 480, 130])}
    ${hot('coat', 'His coat pocket', `<path d="M520 752 h46 v32 h-46 Z" fill="#2a2a32" stroke="#4a4a52" stroke-width="3"/><path d="M528 748 l30 -6 l4 14 l-30 6 Z" fill="#e8dcc0"/>`, [505, 725, 80, 70])}
    ${person('thorne', 'Dr. Amos Thorne', figure(210, 800, .95, { coat: '#2a2a24', trousers: '#1a1a18', hair: '#c8c8c8', armR: 'up',
      extra: `<rect x="-36" y="-410" width="72" height="12" fill="#111"/><rect x="-22" y="-450" width="44" height="42" fill="#111"/>` }))}
    ${lantern(290, 610)}
    ${fog(480, 300, .8)}
  `);
};

const alley = () => {
  const vx = 800;
  let prints = '';
  for (let i = 0; i < 9; i++) {
    const t = i / 9, x = vx + (i % 2 ? 22 : -22) * (1 - t * .8), y = 880 - t * 400;
    prints += `<ellipse cx="${x}" cy="${y}" rx="${12 * (1 - t * .7)}" ry="${7 * (1 - t * .7)}" fill="#1a140c" opacity=".7"/>`;
  }
  return svg(`
    ${nightSky(430, { moon: [800, 110] })}
    <!-- the far gate -->
    <rect x="780" y="400" width="40" height="36" fill="#5a4a3a" opacity=".7"/>
    <!-- yew walls converging -->
    <polygon points="0,60 760,390 760,440 0,900" fill="#0e1a10"/>
    <polygon points="1600,60 840,390 840,440 1600,900" fill="#0e1a10"/>
    ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${i * 48}" cy="${80 + i * 20}" rx="40" ry="22" fill="#16261a"/>`).join('')}
    ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${1600 - i * 48}" cy="${80 + i * 20}" rx="40" ry="22" fill="#16261a"/>`).join('')}
    <polygon points="360,900 1240,900 830,440 770,440" fill="#6a6456"/>
    ${hot('path', 'The gravel path', prints, [640, 480, 320, 420])}
    ${hot('stick', 'Walking stick', `<line x1="980" y1="780" x2="1180" y2="840" stroke="#3a2414" stroke-width="10" stroke-linecap="round"/><circle cx="980" cy="780" r="10" fill="#d8d8e0"/>`, [960, 750, 240, 110])}
    ${hot('summerhouse', 'Summerhouse', `
      <polygon points="120,420 300,340 480,420" fill="#3a3a44"/>
      <rect x="150" y="420" width="300" height="220" fill="#d8d0c0"/>
      <rect x="230" y="480" width="140" height="160" fill="#141410"/>
      ${[170, 420].map((x) => `<rect x="${x}" y="420" width="14" height="220" fill="#b8b0a0"/>`).join('')}
    `)}
    ${fog(560, 340, .9)}
  `);
};

const library = () => svg(`
  ${wall('#3a2a1c', null, { panel: '#2e1e12', panelTop: 440 })}
  ${woodFloor('#3a2616')}
  ${bookshelf(0, 60, 300, 580, 41)}
  ${hot('portrait', 'Portrait of Sir Hugo', painting(360, 100, 200, 250, 'portrait'))}
  ${fireplace(620, { lit: true, w: 300 })}
  ${windowNight(1230, 110, 240, 300, { curtain: '#3a1a1a', view: 'trees', weather: 'rain' })}
  ${person('hugo', 'Hugo Greymoor', figure(980, 720, .98, { coat: '#4a3a2a', trousers: '#2a2218', hair: '#6a3a1a', tie: '#2a4a2a' }))}
  ${person('beryl', 'Mrs. Beryl Carrow', figure(1340, 690, .78, { dress: '#2a2a3a', hair: '#1a1210', bun: true, seated: true, skin: '#ecd4c0' }))}
  ${hot('manuscript', 'Old manuscript', `
    <rect x="490" y="560" width="16" height="140" fill="#3a2414"/><polygon points="440,560 560,560 540,520 460,520" fill="#4a2e1a"/>
    <polygon points="452,548 548,548 534,522 466,522" fill="#e8d8b0"/><path d="M470 530 h60 M472 538 h56" stroke="#6a4a2a" stroke-width="2"/>
  `, [430, 500, 140, 90])}
  ${hot('desk', 'Writing desk', `
    <polygon points="120,700 440,700 470,740 90,740" fill="#5a3820"/><rect x="90" y="740" width="380" height="110" fill="url(#g-wood-dark)"/>
    <polygon points="200,690 300,688 306,704 194,706" fill="#f2ead8"/><rect x="340" y="672" width="18" height="24" fill="#222"/>
  `)}
  ${tableLamp(420, 698, '#2e5a3a')}
`);

const hugoRoom = () => svg(`
  ${wall('#5a5a4a', '#545444', { panel: null })}
  ${woodFloor('#3e2818')}
  ${windowNight(620, 110, 240, 300, { curtain: '#4a3a2a', weather: 'rain' })}
  <rect x="1080" y="320" width="440" height="30" rx="10" fill="#2a1a0e"/><rect x="1100" y="350" width="400" height="200" fill="#2a1a0e"/>
  <path d="M1060 520 H1540 L1580 700 H1020 Z" fill="#e8e0d0"/><path d="M1070 560 Q1300 520 1560 580 L1580 700 H1020 Z" fill="#6a5a3a"/>
  ${tableLamp(960, 540)}
  <rect x="900" y="540" width="120" height="100" fill="#2a1a0e"/>
  ${hot('chest', 'Travelling chest', `
    <rect x="80" y="520" width="340" height="140" fill="#5a3a1a"/><rect x="80" y="500" width="340" height="30" rx="8" fill="#6a4a2a"/>
    ${[110, 380].map((x) => `<rect x="${x}" y="500" width="14" height="160" fill="#2a1a0a"/>`).join('')}
    <polygon points="200,500 300,496 306,512 194,516" fill="#f2ead8"/><polygon points="220,490 320,488 322,504 216,506" fill="#e8dcc0"/>
    <text x="250" y="600" font-family="Georgia" font-size="24" fill="#c9a45c" text-anchor="middle">H.G.</text>
  `)}
  ${hot('coat', 'Coat pocket', `
    <circle cx="560" cy="140" r="8" fill="url(#g-brass)"/>
    <path d="M560 146 Q500 170 480 240 L470 520 H650 L640 240 Q620 170 560 146 Z" fill="#3a3024"/>
    <rect x="580" y="380" width="50" height="40" fill="#2a2218"/>
    <path d="M590 382 q10 -30 30 -10 q-6 20 -30 10 Z" fill="#6a4a2a"/><circle cx="600" cy="376" r="8" fill="#9aff9a" opacity=".35"/>
  `, [460, 130, 200, 400])}
  ${hot('boots', 'Boots', `
    <path d="M720 780 V660 H770 V770 Q810 770 830 792 H720 Z" fill="#1a120c"/>
    <path d="M820 790 V670 H870 V780 Q910 780 930 802 H820 Z" fill="#1a120c"/>
    <path d="M720 760 Q770 740 830 792 H720 Z M820 770 Q870 750 930 802 H820 Z" fill="#141008"/>
    <path d="M730 700 q10 6 30 -2 M830 710 q10 6 30 -2" stroke="#8a6a4a" stroke-width="3" fill="none"/>
    <ellipse cx="820" cy="806" rx="140" ry="12" fill="#000" opacity=".4"/>
  `, [700, 640, 260, 180])}
  ${hot('basket', 'Wastepaper basket', `
    <path d="M1180 700 L1200 840 H1320 L1340 700 Z" fill="#6a5a3a"/>
    ${[1200, 1230, 1260, 1290, 1320].map((x) => `<line x1="${x}" y1="700" x2="${x + (x - 1260) * .1}" y2="840" stroke="#4a3a22" stroke-width="3"/>`).join('')}
    <polygon points="1190,700 1320,690 1330,712 1196,720" fill="#e8e4d8"/>
    ${[[1210, 700], [1250, 698], [1285, 702]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="8" fill="#1a1a1a"/>`).join('')}
    <path d="M1360 830 l40 -20 l6 6 l-34 26 Z" fill="#b8b8c0"/>
  `)}
`);

const servants = () => svg(`
  ${stoneWall('#6a645a')}
  ${flagFloor('#5a554c')}
  ${hot('window', 'The window', windowNight(620, 120, 300, 260, { curtain: null, frame: '#3a3024', weather: 'rain' }) + `<rect x="740" y="400" width="30" height="24" fill="#f2eee4"/><path d="M755 400 q-4 -10 0 -18 q4 8 0 18" fill="#ffb24a"/>` + glow(755, 390, 90, .8), [590, 90, 360, 350])}
  <!-- range -->
  ${glow(300, 520, 260, .8)}
  <rect x="140" y="380" width="340" height="260" fill="#1a1a1a"/><rect x="170" y="470" width="120" height="80" fill="#ff8a3a"/><rect x="320" y="470" width="130" height="80" fill="#2a2a2a"/>
  <rect x="120" y="360" width="380" height="24" fill="#3a3a3a"/><rect x="200" y="320" width="60" height="40" rx="8" fill="#6a6a6a"/>
  ${hot('sidedoor', 'Side door', door(1250, 170, 380, { color: '#4a3a2a' }) + `<rect x="1230" y="600" width="210" height="40" fill="#5a4a2a"/>` + [1270, 1320, 1370].map((x) => `<ellipse cx="${x}" cy="620" rx="14" ry="8" fill="#1a140c"/>`).join(''))}
  <!-- long table -->
  <polygon points="420,640 1180,640 1260,700 340,700" fill="#b8a888"/><rect x="340" y="700" width="920" height="24" fill="#8a7858"/>
  <rect x="370" y="724" width="24" height="160" fill="#6a5a3a"/><rect x="1206" y="724" width="24" height="160" fill="#6a5a3a"/>
  ${hot('basket', 'Food basket', `<path d="M860 640 Q860 600 920 600 H990 Q1050 600 1050 640 Z" fill="#8a6a3a"/><path d="M880 600 q75 -60 150 0" stroke="#6a4a2a" stroke-width="8" fill="none"/><ellipse cx="930" cy="604" rx="30" ry="12" fill="#c8a060"/>`, [850, 540, 210, 110])}
  ${person('pike', 'Pike', figure(560, 780, .96, { coat: '#15151a', trousers: '#15151a', hair: '#1a1a1a', tails: true, tie: '#111',
    extra: `<path d="M-28 -350 Q0 -300 28 -350 Q24 -318 0 -310 Q-24 -318 -28 -350 Z" fill="#1a1a1a"/>` }))}
`);

const cottage = () => svg(`
  ${nightSky(560, { moon: [300, 120] })}
  <path d="M0 520 Q400 460 900 500 T1600 480 V900 H0 Z" fill="#1e2818"/>
  <rect y="620" width="${W}" height="${H - 620}" fill="#262a1c"/>
  <!-- cottage -->
  <polygon points="500,300 800,160 1100,300" fill="#3a3a30"/>
  <rect x="520" y="300" width="560" height="340" fill="#8a8272"/>
  ${hot('cases', 'Butterfly cases', `<rect x="600" y="360" width="180" height="140" fill="#e8c878"/>` + glow(690, 430, 200, .7) + [0, 1, 2].map((i) => `<rect x="${614 + i * 56}" y="378" width="44" height="100" fill="#6a4a2a"/>` + [0, 1, 2].map((j) => `<path d="M${636 + i * 56} ${396 + j * 30} l-12 -6 l0 12 Z M${636 + i * 56} ${396 + j * 30} l12 -6 l0 12 Z" fill="${['#e87a3a', '#3a8ae8', '#e8e03a'][j]}"/>`).join('')).join('') + `<rect x="600" y="360" width="180" height="140" fill="none" stroke="#3a3024" stroke-width="10"/><line x1="690" y1="360" x2="690" y2="500" stroke="#3a3024" stroke-width="6"/>`)}
  <rect x="880" y="400" width="130" height="240" fill="#e8c878"/>${glow(945, 520, 220, .8)}
  ${person('venn', 'Jasper Venn', figure(945, 660, .72, { coat: '#4a4a3a', trousers: '#2a2a24', hair: '#8a6a3a', tie: '#6a3a1a',
    extra: `<line x1="70" y1="-160" x2="140" y2="-420" stroke="#8a6a3a" stroke-width="6"/><ellipse cx="150" cy="-450" rx="40" ry="34" fill="none" stroke="#e8e0d0" stroke-width="4"/>` }))}
  <!-- shed -->
  ${hot('shed', 'Shed shelf', `
    <polygon points="1180,380 1330,330 1480,380" fill="#3a3024"/>
    <rect x="1190" y="380" width="280" height="260" fill="#4a3a2a"/>
    <rect x="1240" y="420" width="180" height="200" fill="#1a140e"/>
    <rect x="1250" y="500" width="160" height="10" fill="#6a5a3a"/>
    <rect x="1270" y="470" width="30" height="30" fill="#6a8a9a"/><ellipse cx="1330" cy="498" rx="16" ry="5" fill="#8a7a5a"/><rect x="1360" y="468" width="34" height="32" fill="#9aba5a"/>
  `)}
  <!-- kennel with Brutus -->
  ${hot('kennel', 'The kennel', `
    <polygon points="140,560 290,480 440,560" fill="#4a3a2a"/>
    <rect x="160" y="560" width="260" height="170" fill="#5a4a32"/>
    <path d="M220 730 V640 Q290 590 360 640 V730 Z" fill="#141008"/>
    <path d="M250 740 Q260 690 320 690 Q380 690 420 720 Q460 700 470 730 Q450 760 400 760 H260 Z" fill="#6a5238"/>
    <ellipse cx="440" cy="722" rx="36" ry="26" fill="#6a5238"/><ellipse cx="462" cy="734" rx="16" ry="12" fill="#3a2a1a"/>
    <ellipse cx="455" cy="730" rx="34" ry="24" fill="#9aff9a" opacity=".3"/>
    <path d="M300 700 q20 10 40 0 M280 715 q20 10 40 0" stroke="#4a3a24" stroke-width="4" fill="none"/>
    <path d="M430 710 Q480 650 520 700" stroke="#8a8a8a" stroke-width="4" fill="none"/>
  `, [140, 470, 400, 300])}
  ${fog(600, 300, .6)}
`);

const tor = () => {
  const r = rng(17);
  // a tor: columns of stacked, weathered granite slabs, right of centre
  let rocks = '';
  for (let i = 0; i < 6; i++) {
    const cx = 760 + i * 125 + r() * 20;
    let y = 650;
    const n = 2 + ((r() * 3) | 0) + (i === 2 || i === 3 ? 2 : 0);
    for (let k = 0; k < n; k++) {
      const w = 150 + r() * 50 - k * 12, h = 52 + r() * 22;
      rocks += `<rect x="${(cx - w / 2 + (r() * 16 - 8)).toFixed(0)}" y="${(y - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="22" fill="${['#55554f', '#4a4a46', '#5e5e57'][(i + k) % 3]}" stroke="#2e2e2a" stroke-width="3"/>`;
      y -= h - 4;
    }
  }
  return svg(`
    ${nightSky(600, { moon: [1400, 110] })}
    <path d="M0 600 Q300 560 800 590 T1600 580 V900 H0 Z" fill="#141a10"/>
    <!-- far lights of the hall -->
    <rect x="415" y="578" width="70" height="14" fill="#0e120c"/>
    ${[[428, 584], [446, 585], [464, 583]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#ffd870"/>`).join('')}
    ${rocks}
    <rect y="640" width="${W}" height="${H - 640}" fill="#2a2a20"/>
    ${hot('view', 'The view', `<rect x="340" y="540" width="220" height="90" fill="transparent"/><circle cx="446" cy="584" r="36" fill="#ffd870" opacity=".12"/>`)}
    ${hot('camp', 'Hollow in the rocks', `
      <ellipse cx="800" cy="760" rx="260" ry="70" fill="#1a1a14"/>
      <ellipse cx="760" cy="760" rx="60" ry="18" fill="#3a3530"/>
      ${[[-30, -4], [0, -8], [30, -2]].map(([dx, dy]) => `<rect x="${740 + dx}" y="${748 + dy}" width="50" height="10" rx="5" fill="#2a1a10" transform="rotate(${dx} ${760 + dx} ${752 + dy})"/>`).join('')}
      <path d="M860 740 q60 -20 120 0 q10 30 -40 36 q-60 4 -80 -36 Z" fill="#5a4a3a"/>
      <ellipse cx="690" cy="780" rx="18" ry="8" fill="#c8a060"/>
    `)}
    ${hot('bundle', 'Bundle of clothes', `<path d="M1040 800 q40 -50 110 -30 q40 20 10 50 q-60 20 -120 -20 Z" fill="#8a8272"/><path d="M1060 790 l60 -10" stroke="#e8e0d0" stroke-width="5"/>`, [1030, 750, 160, 80])}
    ${fog(560, 340, .7)}
  `);
};

export const SCENES = { gate, alley, library, hugo: hugoRoom, servants, cottage, tor };
