// island-scenes.js — illustrations for "The Guests of Gull Rock".
// Every item in island.js has a matching hot(id, ...) here, and every suspect
// in a room a person(id, ...).

import {
  svg, hot, person, wall, woodFloor, flagFloor, rug, windowNight, door, fireplace,
  bookshelf, painting, glow, tableLamp, figure, rng, W, H, FLOOR,
} from '../art.js';

const seaWindow = (x, y, w, h, curtain = '#c8d0d8') => windowNight(x, y, w, h, { curtain, frame: '#e8e4dc', weather: 'rain', view: 'sea' });

const drawing = () => svg(`
  ${wall('#e8e4dc', '#e0dcd2', { panel: '#d8d2c6', panelTop: 470 })}
  ${woodFloor('#6a5238')}
  ${rug(760, 680, 870, 760, 1040, '#8a3a2a', '#e8d8b0')}
  ${seaWindow(90, 110, 300, 320)}
  ${seaWindow(1210, 110, 300, 320)}
  ${fireplace(560, { lit: true, w: 340 })}
  ${painting(620, 120, 220, 150)}
  <!-- mantel shelf -->
  <rect x="530" y="360" width="400" height="18" fill="#f2eee4"/>
  ${hot('glass', 'Glass on the mantelpiece', `<path d="M846 322 L852 360 H880 L886 322 Z" fill="url(#g-glass)" stroke="#e6f0f0" stroke-opacity=".7" stroke-width="2"/><rect x="853" y="350" width="26" height="8" fill="#e8e0d0"/>`, [826, 300, 80, 70])}
  ${[600, 680].map((x) => `<rect x="${x}" y="330" width="20" height="30" fill="url(#g-brass)"/>`).join('')}
  ${hot('gramophone', 'Gramophone', `
    <rect x="1040" y="430" width="200" height="30" fill="#4a2e1a"/><rect x="1060" y="460" width="160" height="180" fill="#5a3a22"/>
    <ellipse cx="1140" cy="432" rx="80" ry="14" fill="#111"/><ellipse cx="1140" cy="432" rx="20" ry="4" fill="#b01a1a"/>
    <path d="M1180 420 L1210 300 Q1260 220 1340 230 Q1330 330 1230 350 Z" fill="url(#g-brass)"/>
    <line x1="1190" y1="424" x2="1160" y2="432" stroke="#888" stroke-width="4"/>
  `, [1030, 220, 320, 420])}
  ${hot('card', 'Typed card', `<polygon points="1080,392 1136,388 1138,420 1082,424" fill="#f8f4ec" stroke="#b8b0a0"/><path d="M1088 400 h40 M1088 408 h36" stroke="#333" stroke-width="1.5"/>`, [1066, 372, 90, 64])}
  ${hot('trolley', 'Drinks trolley', `
    <rect x="200" y="560" width="220" height="10" fill="url(#g-brass)"/><rect x="200" y="640" width="220" height="10" fill="url(#g-brass)"/>
    <rect x="206" y="560" width="6" height="110" fill="url(#g-brass)"/><rect x="408" y="560" width="6" height="110" fill="url(#g-brass)"/>
    <circle cx="220" cy="676" r="10" fill="#222"/><circle cx="400" cy="676" r="10" fill="#222"/>
    <path d="M260 560 Q240 520 256 500 Q264 490 264 470 H284 Q284 490 292 500 Q308 520 288 560 Z" fill="url(#g-glass)" stroke="#e6f0f0" stroke-opacity=".6"/>
    <path d="M248 530 Q274 540 300 530 Q304 552 288 560 H260 Q244 552 248 530 Z" fill="#b8651a" opacity=".85"/>
    ${[330, 370].map((x) => `<path d="M${x} 536 L${x + 4} 560 H${x + 26} L${x + 30} 536 Z" fill="url(#g-glass)"/>`).join('')}
  `, [190, 460, 240, 230])}
  ${hot('body', 'Gerald Fane', `
    <path d="M600 760 Q720 730 880 752 L890 800 Q740 820 610 808 Z" fill="#23232b"/>
    <path d="M880 760 L1000 740 M884 790 L1004 800" stroke="#23232b" stroke-width="22" stroke-linecap="round"/>
    <ellipse cx="572" cy="780" rx="34" ry="28" fill="#e8b0a0"/>
    <path d="M544 772 Q572 748 600 770" stroke="#3a2a1a" stroke-width="9" fill="none"/>
    <path d="M620 800 Q600 840 560 846" stroke="#23232b" stroke-width="20" stroke-linecap="round" fill="none"/>
    <path d="M556 792 q8 6 16 0" stroke="#5a6a9a" stroke-width="4" fill="none"/>
  `, [530, 720, 490, 140])}
  <!-- armchair with Dr. Ashby -->
  <path d="M1300 520 Q1300 470 1350 470 H1480 Q1530 470 1530 520 V700 H1300 Z" fill="#6a4a3a"/>
  ${person('ashby', 'Dr. Edwin Ashby', figure(1415, 720, .82, { coat: '#2a2a33', trousers: '#1a1a22', hair: '#9a9a9a', tie: '#3a1a1a' }))}
  <rect x="1290" y="600" width="250" height="60" rx="16" fill="#7a5a48"/>
`);

const dining = () => svg(`
  ${wall('#c8d4c8', '#c0ccc0', { panel: '#e8e4dc', panelTop: 460 })}
  ${woodFloor('#5a4230')}
  ${seaWindow(660, 100, 280, 290, '#6a8a8a')}
  <!-- sideboard with gulls and register -->
  <rect x="80" y="450" width="420" height="24" fill="#6a4a2a"/><rect x="100" y="474" width="380" height="166" fill="#5a3a22"/>
  ${hot('gulls', 'China gulls', [0, 1, 2, 3, 4].map((i) => `<g transform="translate(${130 + i * 60} 450)"><ellipse cx="0" cy="-16" rx="18" ry="12" fill="#f2f2ee"/><circle cx="14" cy="-30" r="8" fill="#f2f2ee"/><path d="M20 -30 l10 3 l-10 2 Z" fill="#e8b030"/><path d="M-10 -20 l-16 -10 l10 16 Z" fill="#9aa4ac"/></g>`).join('') + `<g transform="translate(560 700) rotate(20)"><ellipse rx="16" ry="9" fill="#f2f2ee"/><path d="M-20 4 l40 -6" stroke="#9aa4ac" stroke-width="3"/></g>`, [100, 400, 500, 320])}
  ${hot('register', 'Hotel register', `<rect x="1180" y="460" width="220" height="16" fill="#6a4a2a"/><rect x="1196" y="476" width="14" height="164" fill="#4a2e1a"/><rect x="1370" y="476" width="14" height="164" fill="#4a2e1a"/><polygon points="1210,458 1290,448 1370,458 1290,466" fill="#f2ead8"/><polygon points="1210,458 1290,466 1370,458 1370,464 1290,472 1210,464" fill="#1a3a5a"/><path d="M1228 454 h44 M1306 454 h44" stroke="#333" stroke-width="1.5"/>`, [1170, 420, 240, 70])}
  ${person('ruth', 'Miss Ruth Carey', figure(1060, 690, .8, { dress: '#1e2a4a', hair: '#2a1a12', bob: true, armL: 'up', skin: '#ecd4c0' }))}
  ${hot('table', 'Dinner table', `
    <polygon points="360,600 1240,600 1330,660 270,660" fill="#f2eee4"/>
    <path d="M270 660 H1330 L1320 720 H280 Z" fill="#e8e4dc"/>
    <rect x="320" y="720" width="22" height="150" fill="#3a2414"/><rect x="1258" y="720" width="22" height="150" fill="#3a2414"/>
    ${[460, 640, 820, 1000, 1160].map((x) => `<ellipse cx="${x}" cy="628" rx="36" ry="10" fill="#fff" stroke="#c8c0b0"/>`).join('')}
    ${[560, 900].map((x) => `<rect x="${x - 4}" y="560" width="8" height="60" fill="url(#g-brass)"/><path d="M${x} 560 q-5 -12 0 -20 q5 8 0 20" fill="#ffb24a"/>` + glow(x, 560, 120, .6)).join('')}
  `)}
`);

const library = () => svg(`
  ${wall('#4a3e30', null, { panel: null })}
  ${woodFloor('#4a3220')}
  ${bookshelf(0, 60, 420, 580, 61)}
  ${bookshelf(1180, 60, 420, 580, 62)}
  ${seaWindow(600, 100, 400, 330, '#3a4a5a')}
  ${person('reeve', 'Major Desmond Reeve', figure(800, 700, .92, { coat: '#4a4a3a', trousers: '#2a2a22', hair: '#d0d0d0', tie: '#5a1a1a',
    extra: `<path d="M-16 -346 q16 8 32 0" stroke="#e8e8e8" stroke-width="7" fill="none"/>` }))}
  ${hot('charts', 'Sea charts', `<polygon points="160,690 470,690 500,760 130,760" fill="#e8dcb8"/><path d="M200 720 q60 -30 120 0 t120 -6" stroke="#3a6a8a" stroke-width="3" fill="none"/><ellipse cx="380" cy="728" rx="16" ry="8" fill="#8a6a3a"/><rect x="130" y="760" width="370" height="16" fill="#5a3a22"/><rect x="150" y="776" width="16" height="110" fill="#3a2414"/><rect x="464" y="776" width="16" height="110" fill="#3a2414"/>`)}
  ${hot('book', 'The Glass Tower', `
    <rect x="1120" y="560" width="16" height="200" fill="#3a2414"/><polygon points="1060,560 1200,560 1180,520 1080,520" fill="#4a2e1a"/>
    <polygon points="1086,550 1128,546 1128,520 1092,524" fill="#f2ead8"/><polygon points="1128,546 1174,550 1168,524 1128,520" fill="#e8dcc0"/>
    <rect x="1090" y="486" width="32" height="44" fill="#2a5a7a" transform="rotate(-8 1106 508)"/><path d="M1096 496 h18" stroke="#e8d8a0" stroke-width="3" transform="rotate(-8 1106 508)"/>
  `, [1050, 470, 160, 120])}
  ${tableLamp(1360, 640)}
`);

const kitchen = () => {
  let tiles = '';
  for (let y = 60; y < 420; y += 40) for (let x = 0; x < W; x += 40) tiles += `<rect x="${x + 1}" y="${y + 1}" width="38" height="38" fill="${(x + y) % 80 ? '#e8e4d8' : '#d8e0e4'}"/>`;
  return svg(`
    <rect width="${W}" height="${FLOOR}" fill="#b8b2a0"/>${tiles}
    <rect width="${W}" height="40" fill="#3a3024"/>
    ${flagFloor('#8a7a66')}
    ${glow(300, 520, 260, .8)}
    <rect x="120" y="380" width="360" height="260" fill="#1a1a1a"/><rect x="150" y="470" width="120" height="80" fill="#ff8a3a"/><rect x="300" y="470" width="150" height="80" fill="#2a2a2a"/>
    <rect x="100" y="360" width="400" height="24" fill="#3a3a3a"/>
    ${[150, 230, 310, 390].map((x, i) => `<circle cx="${x}" cy="${120 + (i % 2) * 20}" r="${26 + i * 4}" fill="#b8703a"/><rect x="${x - 3}" y="80" width="6" height="${20 + (i % 2) * 20}" fill="#555"/>`).join('')}
    ${hot('boots', 'Boots by the range', `<path d="M500 640 V560 H540 V630 Q580 630 600 648 H500 Z" fill="#3a2a1a"/><path d="M580 650 V570 H620 V640 Q660 640 680 658 H580 Z" fill="#3a2a1a"/><rect x="498" y="642" width="104" height="8" fill="#1a120a"/><rect x="578" y="652" width="104" height="8" fill="#1a120a"/>`, [490, 540, 200, 130])}
    <!-- dresser -->
    <rect x="1100" y="120" width="380" height="300" fill="#6a8a9a"/>
    ${[180, 260, 340].map((y) => `<rect x="1100" y="${y}" width="380" height="10" fill="#4a6a7a"/>`).join('')}
    ${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${1140 + i * 60}" cy="${165}" rx="24" ry="16" fill="#e8e8f0" stroke="#3a5aaa" stroke-width="3"/>`).join('')}
    <rect x="1090" y="420" width="400" height="20" fill="#5a7a8a"/><rect x="1100" y="440" width="380" height="200" fill="#6a8a9a"/>
    ${hot('letter', 'Letter on the dresser', `<polygon points="1200,420 1300,414 1306,432 1196,436" fill="#f8f4ec"/><rect x="1300" y="380" width="40" height="36" fill="#e8dcc0" transform="rotate(8 1320 398)"/><path d="M1210 424 h70" stroke="#333" stroke-width="1.5"/>`, [1180, 370, 180, 80])}
    <polygon points="560,660 1060,660 1100,700 520,700" fill="#d8c8a8"/><rect x="520" y="700" width="580" height="20" fill="#b8a888"/>
    <rect x="540" y="720" width="20" height="150" fill="#8a7a5a"/><rect x="1060" y="720" width="20" height="150" fill="#8a7a5a"/>
    ${person('pryor', 'Mrs. Olive Pryor', figure(820, 700, .86, { dress: '#4a5a6a', hair: '#8a8a8a', bun: true, armR: 'up',
      extra: `<path d="M-40 -280 H40 L60 -20 H-60 Z" fill="#f2eee4"/>` }))}
    <path d="M880 650 q0 -30 30 -30 h30 q30 0 30 30 Z" fill="#e8e0d0"/><path d="M970 640 q20 -4 20 -20" stroke="#e8e0d0" stroke-width="5" fill="none"/>
  `);
};

const shed = () => {
  let planks = '';
  for (let x = 0; x < W; x += 90) planks += `<rect x="${x}" y="0" width="88" height="${FLOOR}" fill="${(x / 90) % 2 ? '#5a4a36' : '#54442f'}"/>`;
  const r = rng(3);
  let rainLines = '';
  for (let i = 0; i < 40; i++) rainLines += `<line x1="${(r() * W).toFixed(0)}" y1="0" x2="${(r() * W).toFixed(0)}" y2="20" stroke="#9fb6cc" stroke-opacity=".2" stroke-width="2"/>`;
  return svg(`
    ${planks}
    <rect width="${W}" height="30" fill="#2a2a2a"/>${rainLines}
    <rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#4a3e2e"/>
    <rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="url(#g-floor-shade)"/>
    ${windowNight(1200, 120, 220, 180, { curtain: null, frame: '#3a3024', weather: 'rain', view: 'trees' })}
    ${glow(760, 200, 300, .6)}
    <line x1="760" y1="30" x2="760" y2="140" stroke="#111" stroke-width="3"/><path d="M730 160 L750 140 H770 L790 160 Z" fill="#e8d8a8"/>
    <!-- shelves -->
    ${[240, 380].map((y) => `<rect x="300" y="${y}" width="700" height="14" fill="#6a5238"/>`).join('')}
    ${[340, 420, 500].map((x, i) => `<path d="M${x} 380 L${x - 10} 330 H${x + 50} L${x + 40} 380 Z" fill="#a8603a"/>`).join('')}
    ${[640, 720].map((x) => `<rect x="${x}" y="190" width="40" height="50" fill="#6a7a5a"/>`).join('')}
    ${hot('tin', 'Tin on the shelf', `<rect x="820" y="320" width="80" height="60" rx="4" fill="#c8b020"/><rect x="820" y="336" width="80" height="26" fill="#f2eee4"/><path d="M836 346 h48 M836 354 h40" stroke="#b01a1a" stroke-width="3"/><ellipse cx="860" cy="320" rx="40" ry="8" fill="#a89018"/><path d="M880 318 l30 -26" stroke="#c8c8d0" stroke-width="4"/>`, [800, 280, 130, 110])}
    ${hot('tools', 'Garden tools', `
      <line x1="120" y1="140" x2="160" y2="620" stroke="#6a4a2a" stroke-width="10"/><path d="M140 600 h50 l-10 60 h-30 Z" fill="#8a8a8a"/>
      <line x1="220" y1="120" x2="230" y2="620" stroke="#6a4a2a" stroke-width="10"/><path d="M180 130 q50 -40 100 10" stroke="#9a9a9a" stroke-width="8" fill="none"/>
    `)}
    ${hot('floor', 'Sawdust on the floor', `
      <ellipse cx="800" cy="740" rx="240" ry="60" fill="#c8a870"/>
      <ellipse cx="760" cy="740" rx="18" ry="34" fill="#8a6a40" transform="rotate(-15 760 740)"/>
      <circle cx="782" cy="790" r="9" fill="#8a6a40"/>
    `)}
    <rect x="1100" y="560" width="220" height="80" fill="#3a3024"/><ellipse cx="1210" cy="560" rx="110" ry="20" fill="#4a4034"/>
  `);
};

const ruthRoom = () => svg(`
  ${wall('#dcd4c4', '#d4ccbc', { panel: null })}
  ${woodFloor('#6a5238')}
  ${seaWindow(640, 100, 280, 300, '#b8c8d0')}
  <!-- bed -->
  <rect x="60" y="340" width="400" height="30" rx="10" fill="#e8e4dc"/><rect x="80" y="370" width="360" height="180" fill="#d8d0c0"/>
  <path d="M40 520 H480 L520 700 H0 Z" fill="#f2eee4"/><path d="M40 560 H480 L520 700 H0 Z" fill="#4a6a8a"/>
  <ellipse cx="260" cy="512" rx="120" ry="26" fill="#fff"/>
  <!-- bedside table and picture frame -->
  <rect x="500" y="520" width="110" height="120" fill="#8a6a4a"/>
  ${hot('frame', 'Picture frame', `<rect x="520" y="440" width="70" height="80" fill="url(#g-brass)"/><rect x="528" y="448" width="54" height="64" fill="#9ac0d8"/><path d="M528 492 h54 v20 h-54 Z" fill="#d8c898"/><path d="M536 490 v-16 h40 v16" stroke="#6a4a2a" stroke-width="3" fill="none"/>`, [510, 430, 90, 100])}
  <!-- desk with typewriter -->
  <rect x="1020" y="480" width="420" height="20" fill="#8a6a4a"/><rect x="1040" y="500" width="16" height="140" fill="#6a4a30"/><rect x="1404" y="500" width="16" height="140" fill="#6a4a30"/>
  ${hot('typewriter', 'Typewriter', `
    <path d="M1120 480 L1140 420 H1320 L1340 480 Z" fill="#1a1a1a"/>
    <rect x="1150" y="400" width="160" height="24" rx="10" fill="#2a2a2a"/>
    <rect x="1190" y="350" width="80" height="54" fill="#f8f4ec"/><path d="M1200 364 h56 M1200 374 h50" stroke="#333" stroke-width="1.5"/>
    ${Array.from({ length: 10 }, (_, i) => `<circle cx="${1160 + i * 16}" cy="462" r="5" fill="#e8e4dc"/>`).join('')}
  `, [1110, 340, 250, 150])}
  ${tableLamp(1400, 480, '#e8d8b8')}
  <!-- luggage rack with open suitcase -->
  <rect x="780" y="620" width="280" height="12" fill="#6a4a2a"/><rect x="790" y="632" width="10" height="100" fill="#4a2e1a"/><rect x="1040" y="632" width="10" height="100" fill="#4a2e1a"/>
  ${hot('photo', 'Open suitcase', `
    <polygon points="790,620 1050,620 1040,540 800,540" fill="#1a3a5a"/>
    <path d="M800 540 L1040 540 L1030 470 L810 470 Z" fill="#224466"/>
    <path d="M806 616 Q880 580 950 610 Q1000 590 1044 616" fill="#e8e0d0"/>
    <rect x="890" y="570" width="60" height="44" fill="#f2eee4" transform="rotate(-6 920 592)"/><rect x="896" y="576" width="48" height="32" fill="#8a8272" transform="rotate(-6 920 592)"/>
  `)}
  ${hot('shoes', 'Shoes', `<path d="M300 800 q40 -30 90 -10 l0 14 h-100 Z" fill="#1a2a4a"/><rect x="380" y="790" width="6" height="20" fill="#1a2a4a"/><path d="M420 816 q40 -30 90 -10 l0 14 h-100 Z" fill="#1a2a4a"/><rect x="500" y="806" width="6" height="20" fill="#1a2a4a"/><circle cx="470" cy="820" r="3" fill="#c8a870"/>`, [290, 760, 240, 80])}
`);

const jetty = () => {
  const r = rng(8);
  let waves = '';
  for (let i = 0; i < 40; i++) {
    const x = r() * W, y = 420 + r() * 480;
    waves += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q20 -12 40 0 t40 0" stroke="#dfe8ee" stroke-opacity="${(.2 + r() * .4).toFixed(2)}" stroke-width="3" fill="none"/>`;
  }
  return svg(`
    <rect width="${W}" height="440" fill="#2a3440"/>
    <path d="M0 120 Q300 60 600 110 T1200 80 T1600 110 V0 H0 Z" fill="#1a222c"/>
    <rect width="${W}" height="440" fill="url(#p-rain)"/>
    <!-- mainland lights far off -->
    <path d="M0 410 Q400 380 800 400 T1600 395 V440 H0 Z" fill="#141a20"/>
    ${[900, 930, 960, 1100].map((x) => `<circle cx="${x}" cy="398" r="3" fill="#ffd870"/>`).join('')}
    <rect y="420" width="${W}" height="${H - 420}" fill="url(#g-sea)"/>
    ${waves}
    <!-- jetty in perspective -->
    <polygon points="620,440 980,440 1400,900 200,900" fill="#5a4a36"/>
    ${Array.from({ length: 14 }, (_, i) => { const t = i / 13, y = 440 + t * t * 460; const hw = 180 + (600 - 180) * (y - 440) / 460; return `<line x1="${800 - hw}" y1="${y.toFixed(0)}" x2="${800 + hw}" y2="${y.toFixed(0)}" stroke="#2a2016" stroke-width="3"/>`; }).join('')}
    ${[[330, 780], [1270, 780], [520, 560], [1080, 560]].map(([x, y]) => `<rect x="${x - 14}" y="${y - 100}" width="28" height="140" fill="#3a2e20"/>`).join('')}
    ${hot('post', 'Jetty post', `<rect x="1250" y="560" width="44" height="240" fill="#3a2e20"/><polygon points="1236,600 1310,596 1312,650 1238,654" fill="#f8f4ec"/><path d="M1246 616 h52 M1246 626 h46" stroke="#333" stroke-width="2"/><circle cx="1274" cy="604" r="3" fill="#555"/>`, [1220, 540, 110, 270])}
    ${hot('sea', 'The sea', `<rect x="0" y="440" width="300" height="300" fill="transparent"/><path d="M40 560 q60 -40 120 0 t120 0" stroke="#fff" stroke-opacity=".6" stroke-width="5" fill="none"/>`)}
    ${glow(600, 620, 200, .9)}
    <rect x="585" y="600" width="30" height="40" rx="4" fill="#ffd870"/><rect x="582" y="594" width="36" height="8" fill="#222"/>
    ${person('lomax', 'Philip Lomax', figure(760, 820, 1.05, { coat: '#b89a3a', trousers: '#2a2a22', hair: '#3a2a1a', tie: '#2a2a22', armR: 'up',
      extra: `<rect x="-40" y="-410" width="80" height="14" rx="6" fill="#8a7020"/><path d="M-30 -410 Q0 -440 30 -410" fill="#8a7020"/><rect x="56" y="-188" width="14" height="3" fill="#f2eee4"/>` }))}
  `);
};

export const SCENES = { drawing, dining, library, kitchen, shed, ruth: ruthRoom, jetty };
