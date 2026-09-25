// train-scenes.js — illustrations for "Murder on the Alpine Express".
// Every item in train.js has a matching hot(id, ...) here, and every suspect
// in a room a person(id, ...).

import { svg, hot, person, windowNight, glow, figure, W, H, FLOOR } from '../art.js';

// A sleeping compartment: walnut panelling, a snowy window, carpet.
function compartment({ wood = '#4a2e1a', carpet = '#3a1a22', window = [560, 110, 480, 290] } = {}) {
  let s = `<rect width="${W}" height="${FLOOR}" fill="${wood}"/>`;
  for (let x = 0; x < W; x += 160) s += `<rect x="${x + 12}" y="40" width="136" height="${FLOOR - 70}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="4"/>`;
  s += `<rect width="${W}" height="40" fill="#2a1a0e"/><rect y="36" width="${W}" height="6" fill="url(#g-brass)"/>`;
  s += `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="${carpet}"/>`;
  for (let x = -40; x < W; x += 80) s += `<circle cx="${x}" cy="${FLOOR + 90}" r="18" fill="#000" opacity=".12"/><circle cx="${x + 40}" cy="${FLOOR + 190}" r="18" fill="#000" opacity=".12"/>`;
  s += `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="url(#g-floor-shade)"/>`;
  if (window) s += windowNight(...window, { curtain: '#6a4a2a', frame: '#2a1a0e', weather: 'snow', view: 'mountains' });
  // ceiling lamp
  s += `<ellipse cx="800" cy="44" rx="60" ry="14" fill="#e8d8a8"/>` + glow(800, 120, 300, .6);
  return s;
}

// A lower berth along the back wall, left..right, top of mattress at y.
function berth(x1, x2, y = 470, cover = '#6a2a2a') {
  return `<rect x="${x1}" y="${y + 50}" width="${x2 - x1}" height="${FLOOR - y - 50}" fill="#2a1a0e"/>` +
    `<rect x="${x1 - 10}" y="${y}" width="${x2 - x1 + 20}" height="60" rx="10" fill="#e8e0d0"/>` +
    `<rect x="${x1 + 180}" y="${y - 6}" width="${x2 - x1 - 180}" height="70" rx="12" fill="${cover}"/>`;
}

function sideDoor(x, w = 190, h = 440, color = '#3e2616') {
  const y = FLOOR - h;
  return `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 10}" fill="#1f130a"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>` +
    `<rect x="${x + 20}" y="${y + 30}" width="${w - 40}" height="${h * .4}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="4"/>` +
    `<rect x="${x + 20}" y="${y + h * .52}" width="${w - 40}" height="${h * .4}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="4"/>`;
}

const crane = () => svg(`
  ${compartment({ window: [560, 110, 480, 280] })}
  <!-- window pushed down: snow on the sill -->
  <rect x="534" y="404" width="532" height="14" fill="#f2f6fa"/>
  <!-- luggage rack with a folder -->
  <rect x="60" y="96" width="440" height="10" fill="url(#g-brass)"/>
  ${[80, 180, 280, 380, 480].map((x) => `<line x1="${x}" y1="106" x2="${x}" y2="130" stroke="#8a6a2a" stroke-width="3"/>`).join('')}
  <rect x="60" y="130" width="440" height="6" fill="url(#g-brass)"/>
  <rect x="110" y="60" width="150" height="36" fill="#3a2a1a"/>
  ${hot('list', 'Folder of papers', `<rect x="300" y="50" width="120" height="46" fill="#c8b88a"/><rect x="306" y="42" width="120" height="10" fill="#e8dcc0"/>`, [290, 36, 150, 70])}
  ${hot('window', 'Open window', `<rect x="560" y="110" width="480" height="280" fill="transparent"/>`)}
  ${berth(60, 1180, 470, '#6a2a2a')}
  ${hot('body', 'Silas Crane', `
    <ellipse cx="220" cy="470" rx="70" ry="26" fill="#f2eee4"/>
    <ellipse cx="235" cy="452" rx="34" ry="30" fill="#d8c0a8"/>
    <path d="M205 432 Q235 410 265 432" stroke="#8a8a8a" stroke-width="10" fill="none"/>
    <path d="M260 470 Q500 420 1000 452 L1010 520 L270 520 Z" fill="#7a2a2a"/>
    <path d="M500 470 q40 -10 80 6 q-20 30 -70 22 Z" fill="#4a0e0e"/>
    <path d="M330 500 Q330 560 320 600" stroke="#7a2a2a" stroke-width="22" stroke-linecap="round" fill="none"/>
    <circle cx="320" cy="608" r="11" fill="#d8c0a8"/>
  `, [150, 410, 870, 120])}
  ${hot('underberth', 'Under the berth', `
    <rect x="900" y="530" width="280" height="110" fill="#120a05"/>
    <circle cx="1100" cy="620" r="6" fill="#ffd870"/><circle cx="1100" cy="620" r="14" fill="#ffd870" opacity=".25"/>
  `)}
  ${hot('conndoor', 'Connecting door', sideDoor(1250) + `<rect x="1268" y="400" width="18" height="40" rx="4" fill="url(#g-brass)"/><path d="M1270 412 q6 10 14 4" stroke="#4a0e0e" stroke-width="5" fill="none"/>`)}
  ${hot('case', 'Attaché case', `
    <polygon points="140,720 380,720 400,800 120,800" fill="#3a2414"/>
    <polygon points="140,720 380,720 370,660 150,660" fill="#4a2e1a"/>
    <polygon points="170,700 290,696 300,730 164,734" fill="#f2ead8"/>
    <path d="M180 708 h90 M182 716 h80" stroke="#555" stroke-width="2"/>
    <rect x="250" y="796" width="30" height="8" fill="url(#g-brass)"/>
  `)}
  ${hot('watch', 'Pocket watch', `
    <circle cx="760" cy="780" r="26" fill="url(#g-brass)"/><circle cx="760" cy="780" r="20" fill="#f2eee4"/>
    <line x1="760" y1="780" x2="760" y2="766" stroke="#111" stroke-width="3"/><line x1="760" y1="780" x2="770" y2="781" stroke="#111" stroke-width="3"/>
    <path d="M746 768 l10 8 l-4 10 l12 -2 M768 770 l-6 14" stroke="#fff" stroke-width="2" opacity=".9"/>
    <path d="M760 754 q30 -30 70 -10" stroke="url(#g-brass)" stroke-width="3" fill="none"/>
  `, [720, 730, 120, 90])}
`);

const brandtRoom = () => svg(`
  ${compartment({ window: [660, 110, 440, 280], carpet: '#2a2a3a' })}
  ${hot('bolt', 'Connecting-door bolt', sideDoor(140) + `<rect x="300" y="330" width="30" height="12" fill="url(#g-brass)"/><rect x="316" y="324" width="10" height="24" fill="url(#g-brass)"/><ellipse cx="322" cy="356" rx="4" ry="7" fill="#b89a3a"/>`, [140, 200, 190, 280])}
  ${hot('trunk', 'Steamer trunk', `
    <rect x="100" y="470" width="270" height="170" fill="#5a3a1a"/>
    <rect x="100" y="470" width="270" height="30" fill="#4a2e14"/>
    ${[130, 230, 330].map((x) => `<rect x="${x}" y="470" width="14" height="170" fill="#2a1a0a"/>`).join('')}
    <rect x="220" y="510" width="30" height="24" fill="url(#g-brass)"/>
    <rect x="380" y="640" width="250" height="8" fill="#b8a888" opacity=".6"/>
    <path d="M380 660 l200 20 M390 672 l180 20" stroke="#1a0e06" stroke-width="3" opacity=".6"/>
  `, [90, 460, 540, 230])}
  ${berth(560, 1140, 480, '#2a3a5a')}
  <rect x="740" y="470" width="360" height="16" fill="#e8e0d0"/>
  ${hot('shelf', 'Dressing shelf', `
    <rect x="1170" y="420" width="140" height="10" fill="#6a4a2a"/>
    <rect x="1190" y="404" width="50" height="16" rx="4" fill="#5a2a1a"/><circle cx="1215" cy="410" r="5" fill="#ffd870"/>
    <rect x="1260" y="396" width="36" height="24" rx="4" fill="#3a2a1a"/>
  `, [1160, 370, 160, 70])}
  ${hot('basin', 'Washbasin', `
    <ellipse cx="1440" cy="300" rx="60" ry="80" fill="#c8ccd0"/><ellipse cx="1440" cy="300" rx="50" ry="70" fill="#9aa8b4"/>
    <rect x="1360" y="440" width="170" height="20" fill="#e8e4dc"/>
    <ellipse cx="1445" cy="452" rx="60" ry="10" fill="#c8c4b8"/><circle cx="1445" cy="452" r="5" fill="#d8a8a8"/>
    <path d="M1470 420 V400 Q1470 390 1480 390" stroke="url(#g-brass)" stroke-width="6" fill="none"/>
    <rect x="1370" y="460" width="150" height="180" fill="#3a2414"/>
    <path d="M1520 470 h24 v120 h-30 Z" fill="#f2eee4"/>
  `, [1350, 210, 200, 420])}
`);

const countess = () => svg(`
  ${compartment({ window: [620, 110, 420, 280], carpet: '#4a1a2a' })}
  <!-- hatboxes -->
  ${[[1120, 520, '#c8a8b8'], [1180, 440, '#a8c8c0'], [1140, 360, '#e8d8b0']].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="140" height="80" rx="10" fill="${c}"/><ellipse cx="${x + 70}" cy="${y}" rx="70" ry="12" fill="${c}" stroke="#000" stroke-opacity=".15"/>`).join('')}
  ${berth(360, 1080, 480, '#8a6a4a')}
  <path d="M400 470 q200 -40 420 0 l0 60 h-420 Z" fill="#6a5a4a"/>
  ${person('countess', 'Countess Irina Voss', figure(700, 640, .8, { dress: '#1a1a1a', hair: '#e0d8c8', bun: true, seated: true, skin: '#ecd0bc', armR: 'up',
    extra: `<path d="M-60 -300 Q0 -330 60 -300 L70 -240 Q0 -220 -70 -240 Z" fill="#c8b8a0"/><line x1="70" y1="-180" x2="150" y2="-220" stroke="#111" stroke-width="5"/><circle cx="152" cy="-222" r="4" fill="#ff8a3a"/>` }))}
  ${hot('kimono', 'Scarlet kimono', `
    <circle cx="200" cy="120" r="8" fill="url(#g-brass)"/>
    <path d="M200 124 L120 170 L90 320 L140 330 L150 250 L150 520 L250 520 L250 250 L260 330 L310 320 L280 170 Z" fill="#b01a2a"/>
    <path d="M170 300 q30 -30 60 0 q-30 20 -60 0 M180 400 q20 -20 40 0" stroke="#e8c050" stroke-width="5" fill="none"/>
  `)}
  ${hot('bottle', 'Medicine bottle', `
    <rect x="1060" y="420" width="120" height="10" fill="#6a4a2a"/>
    <rect x="1090" y="380" width="24" height="40" rx="4" fill="#6a4a2a" opacity=".85"/><rect x="1094" y="370" width="16" height="10" fill="#222"/>
    <rect x="1092" y="394" width="20" height="12" fill="#f2eee4"/>
  `, [1060, 350, 120, 80])}
  ${sideDoor(1360, 200, 460, '#3e2616')}
  ${hot('sponge', 'Sponge bag', `
    <rect x="1380" y="400" width="30" height="14" rx="6" fill="url(#g-brass)"/>
    <path d="M1392 414 q-30 20 -24 80 q20 30 50 0 q6 -60 -26 -80 Z" fill="#6a8a9a"/>
    <path d="M1390 440 h30" stroke="#4a6a7a" stroke-width="3"/>
    <rect x="1402" y="420" width="4" height="30" fill="#c8ccd0" transform="rotate(12 1404 430)"/>
  `, [1350, 390, 90, 130])}
`);

const dale = () => svg(`
  ${compartment({ wood: '#5a4a3a', window: [600, 110, 400, 280], carpet: '#2a3a2a' })}
  ${hot('wall', 'The partition', `<rect x="0" y="42" width="160" height="598" fill="#4a3a2a"/><rect x="20" y="80" width="120" height="480" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="4"/><path d="M60 300 q10 -10 20 0 M60 320 q10 -10 20 0" stroke="#000" stroke-opacity=".25" stroke-width="3"/>`)}
  <!-- two bench seats facing each other -->
  <rect x="200" y="360" width="340" height="280" rx="16" fill="#2e4a3a"/><rect x="200" y="500" width="360" height="70" rx="14" fill="#3a5a46"/>
  <rect x="1060" y="360" width="340" height="280" rx="16" fill="#2e4a3a"/><rect x="1040" y="500" width="360" height="70" rx="14" fill="#3a5a46"/>
  ${hot('handbag', 'Handbag', `<path d="M300 500 Q300 450 350 450 H430 Q480 450 480 500 Z" fill="#3a2a1a"/><path d="M340 450 q50 -40 100 0" stroke="#3a2a1a" stroke-width="8" fill="none"/><circle cx="390" cy="480" r="6" fill="url(#g-brass)"/>`, [290, 410, 200, 100])}
  ${person('dale', 'Miss Helen Dale', figure(1230, 640, .8, { dress: '#3a3a4a', hair: '#8a5a2a', bob: true, seated: true, armL: 'up', armR: 'up' }))}
  ${hot('book', 'Her book', `<polygon points="1180,500 1280,500 1290,530 1170,530" fill="#6a1a1a"/><polygon points="1186,498 1230,494 1230,524 1180,528" fill="#f2ead8"/><polygon points="1230,494 1278,498 1282,528 1230,524" fill="#e8dcc0"/>`, [1160, 470, 140, 70])}
`);

const corridor = () => {
  const top = 250, bot = 520; // the far end wall spans these heights
  let s = '';
  s += `<polygon points="0,0 1600,0 980,${top} 620,${top}" fill="#2a1a0e"/>`; // ceiling
  s += `<polygon points="0,900 1600,900 980,${bot} 620,${bot}" fill="#5a1a1a"/>`; // carpet
  s += `<polygon points="80,900 1520,900 950,${bot} 650,${bot}" fill="#6a2424"/>`;
  s += `<polygon points="0,0 620,${top} 620,${bot} 0,900" fill="#5a3a22"/>`; // left wall
  s += `<polygon points="1600,0 980,${top} 980,${bot} 1600,900" fill="#4a2e1a"/>`; // right wall
  s += `<rect x="620" y="${top}" width="360" height="${bot - top}" fill="#3a2414"/>`;
  s += `<rect x="740" y="${top + 40}" width="120" height="${bot - top - 40}" fill="#2a1a0e"/><rect x="760" y="${top + 60}" width="80" height="60" fill="#c8d4e0" opacity=".6"/>`;
  // lamps along the ceiling
  for (const t of [.15, .45, .7, .88]) s += `<ellipse cx="${800}" cy="${t * top}" rx="${40 * (1 - t) + 10}" ry="${10 * (1 - t) + 3}" fill="#e8d8a8"/>`;
  s += glow(800, 180, 360, .7);
  // windows on the left wall
  const win = (t1, t2) => {
    const x1 = t1 * 620, x2 = t2 * 620;
    const yt1 = 120 + (top + 20 - 120) * t1, yt2 = 120 + (top + 20 - 120) * t2;
    const yb1 = 560 + (bot - 40 - 560) * t1, yb2 = 560 + (bot - 40 - 560) * t2;
    return `<polygon points="${x1},${yt1} ${x2},${yt2} ${x2},${yb2} ${x1},${yb1}" fill="url(#g-night)" stroke="#2a1a0e" stroke-width="8"/>` +
      `<polygon points="${x1},${(yt1 + yb1) / 2 + 30} ${x2},${(yt2 + yb2) / 2 + 20} ${x2},${yb2} ${x1},${yb1}" fill="#e8eef4"/>` +
      `<polygon points="${x1},${yt1} ${x2},${yt2} ${x2},${yb2} ${x1},${yb1}" fill="url(#p-snow)"/>`;
  };
  // doors on the right wall
  const doorR = (t1, t2, color = '#3a2414') => {
    const x1 = 1600 - t1 * 620, x2 = 1600 - t2 * 620;
    const yt1 = 90 + (top + 10 - 90) * t1, yt2 = 90 + (top + 10 - 90) * t2;
    const yb1 = 900 - (900 - bot) * t1, yb2 = 900 - (900 - bot) * t2;
    return `<polygon points="${x1},${yt1} ${x2},${yt2} ${x2},${yb2} ${x1},${yb1}" fill="${color}" stroke="#1a0e06" stroke-width="6"/>`;
  };
  return svg(`
    ${s}
    ${hot('windows', 'Corridor windows', win(.05, .3) + win(.42, .6))}
    ${win(.7, .82)}
    ${doorR(.52, .66)}${doorR(.74, .84)}
    <text x="1180" y="290" font-family="Georgia" font-size="22" fill="#c9a45c" opacity=".7">6</text>
    ${hot('door7', 'Door of no. 7', doorR(.06, .38, '#4a2e1a') + `<path d="M1450 470 q-40 30 -30 70 M1426 540 l-12 16" stroke="url(#g-brass)" stroke-width="5" fill="none"/><text x="1450" y="220" font-family="Georgia" font-size="34" fill="#c9a45c">7</text>`)}
    ${hot('map', 'Route map', `<rect x="650" y="${top + 16}" width="80" height="54" fill="#e8dcc0" stroke="url(#g-brass)" stroke-width="4"/><path d="M658 ${top + 50} q20 -20 40 -6 t26 -10" stroke="#8a1a1a" stroke-width="2" fill="none"/>`, [640, top + 6, 100, 74])}
  `);
};

const dining = () => {
  const table = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="16" fill="#f2eee4"/><path d="M${x} ${y + 16} h${w} l-10 60 h-${w - 20} Z" fill="#e8e4dc"/><rect x="${x + w / 2 - 8}" y="${y + 76}" width="16" height="${FLOOR - y - 76 + 60}" fill="#2a1a0e"/>`;
  return svg(`
    <rect width="${W}" height="${FLOOR}" fill="#5a3a22"/>
    <rect width="${W}" height="40" fill="#2a1a0e"/>
    ${[60, 460, 860, 1260].map((x) => windowNight(x, 110, 280, 230, { curtain: null, frame: '#2a1a0e', weather: 'snow', view: 'mountains' })).join('')}
    <rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#3a1a22"/><rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="url(#g-floor-shade)"/>
    ${[200, 600, 1000, 1400].map((x) => `<rect x="${x - 3}" y="40" width="6" height="40" fill="url(#g-brass)"/><ellipse cx="${x}" cy="84" rx="30" ry="10" fill="#e8d8a8"/>` + glow(x, 200, 220, .5)).join('')}
    ${table(100, 470, 380)}
    ${hot('menu', 'Dinner menu', `<rect x="250" y="436" width="50" height="36" fill="#f2ead8" stroke="#c9a45c" stroke-width="2"/><path d="M258 448 h34 M258 456 h30" stroke="#8a1a1a" stroke-width="2"/>`, [230, 420, 90, 60])}
    ${person('brandt', 'Samuel Brandt', figure(1260, 640, .78, { coat: '#2a2a33', hair: '#4a3a2a', tie: '#2a2a33', extra: `<circle cx="-12" cy="-364" r="9" fill="none" stroke="#111" stroke-width="3"/><circle cx="12" cy="-364" r="9" fill="none" stroke="#111" stroke-width="3"/>` }))}
    ${person('colonel', 'Colonel Arthur Pryce', figure(820, 640, .82, { coat: '#4a4a2a', hair: '#c8c8c8', tie: '#6a1a1a', extra: `<path d="M-16 -346 q16 8 32 0" stroke="#e8e8e8" stroke-width="7" fill="none"/>` }))}
    ${table(700, 520, 680)}
    <path d="M880 500 v20 M880 500 q-10 -30 0 -40 q10 10 0 40" stroke="#e8e4dc" stroke-width="3" fill="#e8e4dc"/>
    <path d="M1180 490 q-20 30 0 30 q20 0 0 -30" fill="#e8e4dc"/>
    ${hot('score', 'Bridge score sheet', `
      <polygon points="990,520 1080,516 1086,532 986,536" fill="#fff"/>
      <path d="M998 524 h70" stroke="#1a3a8a" stroke-width="2"/>
      ${[[940, 524], [950, 528], [1110, 522], [1120, 526]].map(([x, y]) => `<rect x="${x}" y="${y - 6}" width="18" height="12" fill="#f2eee4" stroke="#b01a1a" stroke-width="1"/>`).join('')}
    `, [970, 500, 130, 50])}
  `);
};

const vestibule = () => svg(`
  <rect width="${W}" height="${FLOOR}" fill="#4a3a2a"/>
  <rect width="${W}" height="40" fill="#2a1a0e"/>
  <rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#3a3530"/>
  ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 80}" y1="${FLOOR}" x2="${i * 80 - 40}" y2="${H}" stroke="#000" stroke-opacity=".25" stroke-width="3"/>`).join('')}
  <!-- stove -->
  ${glow(260, 520, 260, .9)}
  <rect x="200" y="400" width="130" height="240" rx="16" fill="#1a1a1a"/><rect x="226" y="520" width="78" height="50" rx="6" fill="#ff8a3a"/>
  <rect x="250" y="80" width="30" height="320" fill="#1a1a1a"/>
  ${hot('keys', 'Key board', `
    <rect x="420" y="160" width="200" height="140" fill="#6a4a2a" stroke="#2a1a0e" stroke-width="6"/>
    ${[450, 490, 530, 570].map((x) => `<circle cx="${x}" cy="190" r="4" fill="url(#g-brass)"/><path d="M${x} 194 v36" stroke="url(#g-brass)" stroke-width="5"/>`).join('')}
    <circle cx="530" cy="236" r="10" fill="#9a1a1a"/>
  `)}
  ${hot('log', 'Attendant’s log', `
    <rect x="400" y="480" width="260" height="16" fill="#6a4a2a"/><rect x="420" y="496" width="16" height="144" fill="#4a2e1a"/><rect x="624" y="496" width="16" height="144" fill="#4a2e1a"/>
    <polygon points="440,478 530,468 620,478 530,486" fill="#f2ead8"/><path d="M530 468 V486" stroke="#555" stroke-width="2"/>
    <path d="M460 476 h50 M462 480 h46 M548 474 h50 M548 478 h40" stroke="#333" stroke-width="1.5"/>
  `, [410, 440, 240, 60])}
  ${person('marchetti', 'Luigi Marchetti', figure(820, 700, .92, { coat: '#6a4a1a', trousers: '#2a2a33', hair: '#1a1a1a', tie: '#2a2a33',
    extra: `<rect x="-32" y="-412" width="64" height="18" rx="4" fill="#6a4a1a"/><rect x="-40" y="-398" width="80" height="6" fill="#4a3010"/>` }))}
  <!-- the outer door, open to the snow -->
  ${hot('snow', 'The snow outside', `
    <rect x="1080" y="120" width="380" height="520" fill="#1a1410"/>
    <rect x="1100" y="140" width="340" height="500" fill="url(#g-moonsky)"/>
    <path d="M1100 420 L1160 300 L1210 400 L1260 280 L1320 420 L1380 320 L1440 430 V640 H1100 Z" fill="#0e1a14"/>
    <path d="M1100 520 Q1270 480 1440 520 V640 H1100 Z" fill="#eef2f6"/>
    <rect x="1100" y="140" width="340" height="500" fill="url(#p-snow)" opacity=".5"/>
    <polygon points="1100,640 1440,640 1560,900 980,900" fill="#e8eef4" opacity=".9"/>
  `)}
`);

export const SCENES = { crane, brandt: brandtRoom, countess, dale, corridor, dining, vestibule };
