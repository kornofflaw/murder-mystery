// scenes.js — illustrations for "Death at Blackwood Manor", one per room.
// Every item in case.js has a matching hot(id, ...) here, and every suspect
// in a room has a person(id, ...). Keep them in step when editing either file.

import {
  svg, hot, person, wall, stoneWall, woodFloor, flagFloor, rug, windowNight, door,
  fireplace, bookshelf, painting, glow, tableLamp, figure, rng, FLOOR,
} from './art.js';

const study = () => svg(`
  ${wall('#23392c', '#1f3327')}
  ${woodFloor('#3e2716')}
  ${rug(830, 690, 880, 900, 1300, '#5a1a1a')}
  ${hot('fire', 'Fireplace', fireplace(110, { lit: true, w: 300 }))}
  ${painting(150, 130, 220, 170, 'portrait')}
  ${bookshelf(440, 90, 170, 550, 3)}
  ${hot('window', 'The window', windowNight(1140, 110, 260, 330, { curtain: '#4a1414' }))}

  <!-- chair behind desk -->
  <path d="M730 560 V430 Q800 400 870 430 V560 Z" fill="#3a1610"/>
  <path d="M742 555 V440 Q800 414 858 440 V555" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="4"/>

  <!-- the body, slumped over the desk -->
  ${hot('body', 'Lord Blackwood', `
    <path d="M735 575 Q740 490 800 478 Q860 470 880 520 L900 575 Z" fill="#23232b"/>
    <path d="M868 520 Q920 540 972 574" stroke="#23232b" stroke-width="26" stroke-linecap="round" fill="none"/>
    <circle cx="982" cy="578" r="12" fill="#d8c0a8"/>
    <path d="M745 540 Q720 590 735 640" stroke="#23232b" stroke-width="24" stroke-linecap="round" fill="none"/>
    <circle cx="736" cy="648" r="11" fill="#d8c0a8"/>
    <ellipse cx="806" cy="566" rx="36" ry="22" fill="#d8c0a8"/>
    <path d="M772 560 Q806 530 840 560 Q806 548 772 560 Z" fill="#b8b2a8"/>
  `, [720, 470, 280, 190])}

  <!-- desk -->
  <polygon points="580,575 1090,575 1120,612 550,612" fill="#5a3820"/>
  <rect x="550" y="612" width="570" height="128" fill="url(#g-wood-dark)"/>
  <rect x="570" y="630" width="170" height="92" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="4"/>
  <rect x="930" y="630" width="170" height="92" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="4"/>
  ${hot('desk', 'Desk drawer', `
    <rect x="770" y="626" width="130" height="46" fill="#4a2e1a" stroke="#1a0e06" stroke-width="3"/>
    <circle cx="835" cy="649" r="6" fill="url(#g-brass)"/>
    <polygon points="880,622 915,612 922,630 886,638" fill="#efe6d0"/>
  `, [760, 606, 170, 76])}
  ${tableLamp(620, 578, '#2f5a3a')}
  ${hot('tray', 'Letter tray', `
    <polygon points="660,560 740,560 748,575 652,575" fill="#6a4a2a"/>
    <polygon points="668,548 732,552 738,566 662,564" fill="#f2ead8"/>
    <polygon points="670,542 728,546 734,560 664,557" fill="#e8dcc0"/>
  `, [640, 520, 120, 70])}
  ${hot('blotter', 'The blotter', `
    <polygon points="880,578 1030,578 1040,600 872,600" fill="#2e5a3a"/>
    <path d="M900 590 q10 -6 18 0 t18 0 M945 588 q8 -8 16 2 t14 -2 M985 592 l12 -8 l6 6" stroke="#10160f" stroke-width="2.4" fill="none"/>
  `, [860, 560, 190, 50])}
  ${hot('glass', 'Brandy glass', `
    <path d="M1054 544 Q1044 568 1066 574 Q1088 568 1078 544 Z" fill="url(#g-glass)" stroke="#e6f0f0" stroke-opacity=".6"/>
    <path d="M1050 566 Q1066 576 1082 566 Q1078 574 1066 575 Q1054 574 1050 566 Z" fill="#5a7a2a"/>
    <rect x="1064" y="574" width="4" height="10" fill="#dfe8e8"/>
    <ellipse cx="1066" cy="585" rx="12" ry="3" fill="#dfe8e8"/>
  `, [1030, 520, 70, 75])}
  <!-- dropped pen -->
  <rect x="1010" y="780" width="46" height="6" rx="3" fill="#111" transform="rotate(-18 1030 783)"/>
`);

const hall = () => {
  // Muddy boot prints from the boot-room door (right) to the study door (left).
  const r = rng(11);
  let prints = '';
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const x = 1370 - t * 1110 + (i % 2 ? 18 : -18);
    const y = 690 + Math.sin(t * Math.PI) * 90;
    const sc = 0.8 + Math.sin(t * Math.PI) * .45;
    prints += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${sc.toFixed(2)}) rotate(${(r() * 10 - 5).toFixed(1)})"><ellipse rx="22" ry="9" fill="#3a2a18" opacity=".75"/><ellipse cx="-28" rx="10" ry="7" fill="#3a2a18" opacity=".75"/></g>`;
  }
  return svg(`
    ${wall('#6a5a44', null, { panel: '#3e2a1a', panelTop: 380 })}
    ${flagFloor('#6f6a60')}
    <!-- staircase on the left -->
    <polygon points="0,120 520,560 520,640 0,640" fill="#3a2414"/>
    ${Array.from({ length: 11 }, (_, i) => `<rect x="${i * 46}" y="${140 + i * 40}" width="60" height="10" fill="#5a3a22"/>`).join('')}
    <path d="M0 60 L540 480" stroke="#2a1a0e" stroke-width="14"/>
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${20 + i * 44}" y1="${76 + i * 34}" x2="${20 + i * 44}" y2="${150 + i * 40}" stroke="#2a1a0e" stroke-width="6"/>`).join('')}
    ${door(170, 150, 330)}
    <text x="245" y="296" text-anchor="middle" font-family="Georgia" font-size="16" fill="#c9a45c" opacity=".8">STUDY</text>
    ${door(1330, 150, 330)}
    <text x="1405" y="296" text-anchor="middle" font-family="Georgia" font-size="16" fill="#c9a45c" opacity=".8">BOOT ROOM</text>
    ${door(900, 170, 360, { open: .55, beyond: '#caa068' })}
    ${painting(600, 110, 160, 200, 'portrait')}
    ${painting(1110, 120, 160, 190, 'portrait')}
    <!-- antlers -->
    <g transform="translate(690 70)" stroke="#d8cbb0" stroke-width="7" fill="none" stroke-linecap="round">
      <path d="M0 40 Q-40 0 -70 -20 M-40 10 L-50 -30 M-60 -10 L-90 -10"/><path d="M0 40 Q40 0 70 -20 M40 10 L50 -30 M60 -10 L90 -10"/>
      <ellipse cx="0" cy="44" rx="16" ry="10" fill="#5a3a22" stroke="none"/>
    </g>
    ${hot('clock', 'Grandfather clock', `
      <rect x="770" y="250" width="90" height="390" fill="url(#g-wood)"/>
      <rect x="760" y="230" width="110" height="130" rx="10" fill="#4a2e1a"/>
      <circle cx="815" cy="295" r="40" fill="#efe6d0"/>
      <line x1="815" y1="295" x2="815" y2="265" stroke="#111" stroke-width="4"/><line x1="815" y1="295" x2="838" y2="300" stroke="#111" stroke-width="4"/>
      <rect x="790" y="390" width="50" height="180" fill="#1a0e06"/>
      <line x1="815" y1="395" x2="815" y2="520" stroke="url(#g-brass)" stroke-width="4"/><circle cx="815" cy="525" r="16" fill="url(#g-brass)"/>
    `)}
    ${glow(1180, 440, 220)}
    ${hot('phone', 'Telephone', `
      <rect x="1120" y="500" width="130" height="14" fill="#4a2e1a"/>
      <rect x="1134" y="514" width="10" height="126" fill="#3a2414"/><rect x="1226" y="514" width="10" height="126" fill="#3a2414"/>
      <rect x="1165" y="470" width="44" height="30" rx="4" fill="#111"/>
      <path d="M1160 468 Q1187 440 1214 468" stroke="#111" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M1209 490 Q1250 520 1240 560 Q1230 600 1260 640" stroke="#111" stroke-width="3" fill="none"/>
    `, [1110, 430, 160, 90])}
    ${hot('floor', 'The flagstones', prints, [200, 650, 1250, 170])}
  `);
};

const drawing = () => svg(`
  ${wall('#6a3440', '#5e2c37')}
  ${woodFloor('#4a2c1c')}
  ${rug(820, 680, 860, 800, 1100, '#2a3a5a')}
  ${windowNight(660, 100, 240, 300, { curtain: '#3a2a4a' })}
  ${painting(990, 150, 150, 120)}
  ${fireplace(1210, { lit: true, w: 280 })}
  ${glow(420, 420, 300, .8)}
  ${hot('piano', 'The piano', `
    <path d="M90 560 L520 560 Q560 560 560 520 L540 470 Q470 440 380 470 Q300 500 200 470 L90 470 Z" fill="#0e0c0c"/>
    <path d="M110 470 L440 330 L460 340 L200 470 Z" fill="#1a1616"/>
    <rect x="90" y="560" width="440" height="30" fill="#141010"/>
    <rect x="100" y="590" width="16" height="50" fill="#0e0c0c"/><rect x="500" y="590" width="16" height="50" fill="#0e0c0c"/>
    <rect x="100" y="540" width="200" height="16" fill="#f2eee4"/>
    ${Array.from({ length: 14 }, (_, i) => `<rect x="${108 + i * 14}" y="540" width="7" height="10" fill="#111"/>`).join('')}
    <polygon points="140,540 250,540 262,488 152,488" fill="#efe6d0"/>
    <path d="M160 500 h90 M160 510 h90 M160 520 h90 M160 530 h90" stroke="#555" stroke-width="1"/>
  `)}
  <!-- settee with Lady Margaret -->
  <path d="M600 470 Q610 420 690 420 H880 Q960 420 970 470 V600 H600 Z" fill="#6a4a2a"/>
  <rect x="590" y="540" width="390" height="70" rx="20" fill="#8a6a42"/>
  ${person('margaret', 'Lady Margaret Blackwood', figure(760, 640, .74, { dress: '#2a3a5a', hair: '#8a8a8a', bun: true, seated: true, skin: '#e8c8b0' }))}
  <rect x="600" y="600" width="12" height="40" fill="#3a2414"/><rect x="958" y="600" width="12" height="40" fill="#3a2414"/>
  ${person('hale', 'Dr. Julian Hale', figure(1110, 700, .92, { coat: '#3a3a30', trousers: '#2a2a24', hair: '#9a9a90', armR: 'up', tie: '#2a3a5a' }))}
  ${hot('coffee', 'Coffee tray', `
    <polygon points="700,720 960,720 990,760 670,760" fill="#3a2414"/>
    <rect x="690" y="760" width="12" height="80" fill="#2a1a0e"/><rect x="958" y="760" width="12" height="80" fill="#2a1a0e"/>
    <ellipse cx="830" cy="725" rx="100" ry="16" fill="url(#g-brass)"/>
    <path d="M800 725 V680 Q815 668 830 680 V725 Z" fill="#e8e0d0"/><path d="M830 690 q14 0 14 14" stroke="#e8e0d0" stroke-width="4" fill="none"/>
    <ellipse cx="770" cy="722" rx="16" ry="6" fill="#f2eee4"/><rect x="760" y="708" width="20" height="14" fill="#f2eee4"/>
    <ellipse cx="880" cy="722" rx="16" ry="6" fill="#f2eee4"/><rect x="870" y="708" width="20" height="14" fill="#f2eee4"/>
  `, [660, 660, 340, 110])}
`);

const library = () => svg(`
  ${wall('#3a2a1c', null, { panel: null })}
  ${woodFloor('#3a2414')}
  ${bookshelf(0, 60, 380, 580, 21)}
  ${bookshelf(400, 60, 380, 580, 22)}
  ${bookshelf(800, 60, 380, 580, 23)}
  ${hot('door', 'The library door', door(1290, 170, 380, { open: .5, beyond: '#b89060' }) +
    `<rect x="1380" y="400" width="30" height="180" fill="#4a2e1a" opacity=".7"/>`)}
  ${tableLamp(1000, 600, '#2e5a3a')}
  ${person('clara', 'Miss Clara Finch', figure(700, 690, .8, { dress: '#5a4a6a', hair: '#6a3a1a', bob: true, armR: 'up' }))}
  <!-- long reading table -->
  <polygon points="240,600 1180,600 1260,660 160,660" fill="#5a3820"/>
  <rect x="160" y="660" width="1100" height="30" fill="#3a2414"/>
  <rect x="190" y="690" width="24" height="170" fill="#2a1a0e"/><rect x="1206" y="690" width="24" height="170" fill="#2a1a0e"/>
  ${hot('papers', 'Typed letters', `
    <polygon points="360,610 470,608 480,640 350,642" fill="#f2ead8"/>
    <polygon points="372,602 478,600 486,630 364,634" fill="#e8dcc0"/>
    <polygon points="520,606 640,604 650,636 512,638" fill="#f2ead8"/>
    <path d="M380 615 h80 M380 622 h70 M530 614 h90 M530 621 h80" stroke="#555" stroke-width="1.5"/>
    <rect x="850" y="590" width="120" height="40" rx="6" fill="#222"/><rect x="862" y="570" width="96" height="24" fill="#333"/>
  `, [340, 596, 640, 50])}
  ${hot('ink', 'Ink bottle', `
    <rect x="1060" y="600" width="26" height="30" rx="4" fill="#1a1a2a"/><rect x="1066" y="592" width="14" height="8" fill="#111"/>
    <rect x="1100" y="604" width="26" height="28" rx="4" fill="#cfe3ea" opacity=".6"/><rect x="1106" y="596" width="14" height="8" fill="#111"/>
  `, [1040, 570, 100, 70])}
`);

const billiard = () => svg(`
  ${wall('#2a3a2a', '#263526')}
  ${woodFloor('#3a2616')}
  ${hot('hearth', 'The hearth', fireplace(80, { lit: false, w: 300 }))}
  ${painting(560, 140, 200, 140)}
  <!-- cue rack -->
  <rect x="1100" y="150" width="200" height="300" fill="#3a2414"/>
  ${Array.from({ length: 7 }, (_, i) => `<line x1="${1120 + i * 26}" y1="160" x2="${1120 + i * 26}" y2="440" stroke="#c9a070" stroke-width="7"/>`).join('')}
  <!-- hanging lamp and its pool of light -->
  <line x1="800" y1="0" x2="800" y2="330" stroke="#111" stroke-width="4"/>
  <path d="M620 380 L680 330 H920 L980 380 Z" fill="#1f4a2a"/>
  ${glow(800, 560, 420)}
  ${hot('table', 'Billiard table', `
    <polygon points="520,560 1080,560 1180,700 420,700" fill="#3a2010"/>
    <polygon points="545,572 1055,572 1145,690 455,690" fill="url(#g-baize)"/>
    <rect x="420" y="700" width="760" height="40" fill="#2a160a"/>
    <rect x="440" y="740" width="40" height="120" fill="#2a160a"/><rect x="1120" y="740" width="40" height="120" fill="#2a160a"/>
    ${[[900, 610], [915, 618], [915, 603], [930, 626], [930, 611], [930, 596]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="9" fill="${['#b01a1a', '#b01a1a', '#e8c030', '#b01a1a', '#111', '#e8c030'][i]}"/>`).join('')}
    <circle cx="660" cy="650" r="9" fill="#f2eee4"/>
  `)}
  ${person('victor', 'Victor Blackwood', figure(1330, 780, .98, { coat: '#3a2a4a', trousers: '#1a1a22', hair: '#1a120a', armR: 'up', tie: '#8a1a1a',
    extra: `<line x1="-70" y1="-150" x2="-40" y2="-420" stroke="#c9a070" stroke-width="7"/><rect x="60" y="-205" width="26" height="30" fill="#e8b860" opacity=".8"/>` }))}
`, { dark: .12 });

const pantry = () => {
  let tiles = '';
  for (let y = 40; y < 460; y += 40) for (let x = 0; x < 1600; x += 40) tiles += `<rect x="${x + 1}" y="${y + 1}" width="38" height="38" fill="#e8e4d8"/>`;
  return svg(`
    <rect width="1600" height="640" fill="#b8b2a0"/>${tiles}
    <rect width="1600" height="30" fill="#2a2a24"/>
    ${flagFloor('#7a7266')}
    <!-- shelves of glass and silver -->
    ${[120, 250].map((y) => `<rect x="60" y="${y}" width="620" height="12" fill="#5a3a22"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${90 + i * 64} 118 q-10 -30 10 -46 q20 16 10 46 Z" fill="url(#g-glass)"/>`).join('')}
    ${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${110 + i * 100}" cy="230" rx="38" ry="18" fill="#c8ccd0"/><ellipse cx="${110 + i * 100}" cy="226" rx="30" ry="10" fill="#e8ecf0"/>`).join('')}
    <!-- counter -->
    <rect x="0" y="480" width="1600" height="30" fill="#6a4a2a"/>
    <rect x="0" y="510" width="1600" height="130" fill="#4a3220"/>
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${20 + i * 200}" y="526" width="170" height="100" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="4"/>`).join('')}
    <!-- sink -->
    <rect x="1180" y="440" width="300" height="50" fill="#f2eee4"/><rect x="1195" y="448" width="270" height="30" fill="#c8c4b8"/>
    <path d="M1320 440 V380 Q1320 360 1345 360 H1360" stroke="url(#g-brass)" stroke-width="10" fill="none"/>
    ${glow(700, 380, 320, .8)}
    <line x1="700" y1="0" x2="700" y2="250" stroke="#111" stroke-width="3"/><path d="M660 270 L680 250 H720 L740 270 Z" fill="#e8e0c8"/>
    ${hot('decanter', 'Brandy decanter', `
      <path d="M570 480 Q540 440 560 410 Q575 395 575 370 H605 Q605 395 620 410 Q640 440 610 480 Z" fill="url(#g-glass)" stroke="#e6f0f0" stroke-opacity=".6" stroke-width="2"/>
      <path d="M552 440 Q590 452 628 440 Q634 466 610 480 H570 Q546 466 552 440 Z" fill="#b8651a" opacity=".85"/>
      <circle cx="590" cy="360" r="14" fill="url(#g-glass)" stroke="#e6f0f0" stroke-opacity=".6"/>
    `, [530, 340, 120, 145])}
    ${hot('ledger', 'Cellar book', `
      <polygon points="780,480 900,466 1010,480 900,490" fill="#f2ead8"/>
      <path d="M900 466 V490" stroke="#555" stroke-width="2"/>
      <path d="M800 476 h70 M805 480 h60 M920 472 h70 M925 477 h60" stroke="#6a1a1a" stroke-width="1.6"/>
      <path d="M940 470 l30 8 M945 478 l30 -8" stroke="#6a1a1a" stroke-width="2"/>
      <polygon points="780,480 900,490 1010,480 1012,488 900,498 778,488" fill="#5a1a1a"/>
    `, [770, 440, 250, 70])}
    ${person('thomas', 'Thomas Reed', figure(1250, 800, 1, { coat: '#15151a', trousers: '#15151a', hair: '#c8c8c8', tails: true, armL: 'up', tie: '#111',
      extra: `<path d="M-78 -205 q-8 20 6 30 h14 q14 -10 6 -30 Z" fill="url(#g-glass)"/><path d="M-76 -192 h26 q0 14 -13 16 q-13 -2 -13 -16 Z" fill="#b8651a" opacity=".85"/>` }))}
  `);
};

const bootroom = () => svg(`
  ${stoneWall('#5a564e')}
  ${flagFloor('#57534a')}
  <!-- coat hooks -->
  <rect x="80" y="170" width="760" height="18" fill="#3a2414"/>
  ${[140, 300, 460, 620, 760].map((x, i) => `<circle cx="${x}" cy="200" r="6" fill="url(#g-brass)"/><path d="M${x - 50} 205 Q${x} 180 ${x + 50} 205 L${x + 60} 440 L${x - 60} 440 Z" fill="${['#3a3a2a', '#2a3a4a', '#4a3a2a', '#2a2a2a', '#3a4a3a'][i]}"/>`).join('')}
  <!-- bench -->
  <rect x="120" y="520" width="700" height="24" fill="#5a3a22"/>
  <rect x="140" y="544" width="20" height="96" fill="#3a2414"/><rect x="780" y="544" width="20" height="96" fill="#3a2414"/>
  <!-- umbrella stand -->
  <rect x="930" y="470" width="80" height="170" rx="6" fill="#3a3a3a"/>
  <path d="M950 470 L930 280 M975 470 L990 260 M995 470 L1030 300" stroke="#111" stroke-width="8"/>
  <path d="M905 300 Q930 260 955 300 Z M965 280 Q990 240 1015 280 Z" fill="#1a1a1a"/>
  ${hot('gdoor', 'Garden door', `
    ${door(1200, 220, 420, { open: .35, color: '#3a3024', beyond: 'url(#g-night)' })}
    <rect x="1200" y="220" width="220" height="420" fill="url(#p-rain)" opacity=".8"/>
    <rect x="1330" y="240" width="60" height="50" rx="10" fill="#e8c878" opacity=".55"/>
    <ellipse cx="1260" cy="700" rx="160" ry="30" fill="#3a4a5a" opacity=".45"/>
  `)}
  ${hot('boots', 'Riding boots', `
    <path d="M430 700 V560 H480 V690 Q520 690 540 712 H430 Z" fill="#1a120c"/>
    <path d="M530 710 V575 H580 V700 Q620 700 640 722 H530 Z" fill="#1a120c"/>
    <path d="M430 690 Q480 670 540 712 H430 Z M530 700 Q580 680 640 722 H530 Z" fill="#4a3018"/>
    <path d="M436 640 q20 -8 40 4 M536 650 q20 -8 40 4" stroke="#4a3018" stroke-width="7" fill="none"/>
    <path d="M500 712 q20 -24 40 -10 q-14 16 -40 10 Z" fill="#5a7a3a"/>
    <ellipse cx="530" cy="728" rx="130" ry="14" fill="#2a2a30" opacity=".5"/>
  `, [410, 540, 250, 200])}
`);

const greenhouse = () => {
  let panes = '';
  for (let x = 0; x <= 1600; x += 160) panes += `<line x1="${x}" y1="0" x2="${x}" y2="640" stroke="#1a2a1e" stroke-width="10"/>`;
  for (const y of [0, 180, 380]) panes += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#1a2a1e" stroke-width="10"/>`;
  const r = rng(5);
  let orchids = '';
  for (let i = 0; i < 7; i++) {
    const x = 120 + i * 62;
    orchids += `<rect x="${x - 16}" y="468" width="32" height="30" fill="#8a4a2a"/><path d="M${x} 470 Q${x + (r() * 30 - 15)} 420 ${x + 6} 380" stroke="#3a6a2a" stroke-width="4" fill="none"/>`;
    for (let k = 0; k < 3; k++) orchids += `<circle cx="${x + 6 + (k - 1) * 14}" cy="${384 + k * 12}" r="9" fill="${['#e8a0d0', '#f2eee4', '#d070b0'][i % 3]}"/>`;
  }
  const spike = (x, stripped) => {
    let s = `<path d="M${x} 640 V${stripped ? 470 : 400}" stroke="#3a6a2a" stroke-width="7"/>`;
    if (stripped) s += `<path d="M${x - 4} 470 l8 -6" stroke="#9ac06a" stroke-width="5"/><circle cx="${x}" cy="470" r="4" fill="#cfe88a"/>`;
    else for (let k = 0; k < 7; k++) s += `<path d="M${x} ${410 + k * 22} q14 6 12 22 q-12 -4 -12 -22 Z" fill="#a050b8"/><path d="M${x} ${410 + k * 22} q-14 6 -12 22 q12 -4 12 -22 Z" fill="#b060c8"/>`;
    s += `<path d="M${x} 620 q-50 -10 -60 -40 q40 0 60 30 Z M${x} 620 q50 -10 60 -40 q-40 0 -60 30 Z" fill="#4a7a3a"/>`;
    return s;
  };
  return svg(`
    <rect width="1600" height="640" fill="url(#g-night)"/>
    <rect width="1600" height="640" fill="url(#p-rain)"/>
    <path d="M0 640 V470 Q300 380 600 460 T1200 430 T1600 470 V640 Z" fill="#05090f"/>
    ${panes}
    <rect y="${FLOOR}" width="1600" height="260" fill="#6a3a24"/>
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${FLOOR + 10 + i * 32}" x2="1600" y2="${FLOOR + 10 + i * 32}" stroke="#000" stroke-opacity=".25" stroke-width="3"/>`).join('')}
    <rect y="${FLOOR}" width="1600" height="260" fill="url(#g-floor-shade)"/>
    ${glow(800, 420, 400, .7)}
    <line x1="800" y1="0" x2="800" y2="180" stroke="#111" stroke-width="3"/><circle cx="800" cy="190" r="16" fill="#ffe0a0"/>
    <!-- orchid bench -->
    <rect x="80" y="498" width="480" height="20" fill="#5a4a3a"/>
    <rect x="100" y="518" width="16" height="122" fill="#3a2a1a"/><rect x="524" y="518" width="16" height="122" fill="#3a2a1a"/>
    ${hot('orchids', 'Orchids', orchids, [80, 360, 480, 140])}
    ${hot('foxglove', 'Foxglove plants', [1120, 1200, 1270, 1340, 1420, 1490].map((x, i) => spike(x, i === 1 || i === 2 || i === 4)).join(''), [1060, 380, 500, 260])}
    ${hot('bench', 'Potting bench', `
      <polygon points="600,660 1040,660 1080,700 560,700" fill="#6a5238"/>
      <rect x="560" y="700" width="520" height="24" fill="#4a3a28"/>
      <rect x="580" y="724" width="20" height="150" fill="#3a2a1a"/><rect x="1040" y="724" width="20" height="150" fill="#3a2a1a"/>
      <path d="M740 640 Q740 690 790 690 Q840 690 840 640 Z" fill="#8a8a82"/>
      <ellipse cx="790" cy="640" rx="50" ry="12" fill="#6a6a62"/><ellipse cx="790" cy="642" rx="40" ry="8" fill="#4a7a2a"/>
      <rect x="800" y="590" width="12" height="70" rx="6" fill="#9a9a92" transform="rotate(25 806 640)"/>
      <path d="M880 668 q30 -20 70 -6 q20 14 -10 20 q-30 4 -60 -14 Z" fill="#dfe0c8"/>
      <path d="M900 666 q20 -8 34 2" stroke="#6a8a3a" stroke-width="6" fill="none"/>
      <rect x="640" y="646" width="50" height="16" fill="#8a4a2a"/>
    `)}
  `);
};

const guest = () => svg(`
  ${wall('#8a7e66', '#82765e', { panel: null })}
  ${woodFloor('#4a3220')}
  ${rug(700, 680, 860, 700, 1000, '#5a4a3a')}
  ${windowNight(640, 120, 220, 280, { curtain: '#5a4a2a' })}
  <!-- bed -->
  <rect x="60" y="320" width="440" height="30" rx="10" fill="#3a2414"/>
  <rect x="80" y="350" width="400" height="200" fill="#3a2414"/>
  <path d="M40 520 H520 L560 700 H0 Z" fill="#e8e0d0"/>
  <path d="M40 560 H520 L560 700 H0 Z" fill="#6a5a8a"/>
  <ellipse cx="190" cy="510" rx="80" ry="26" fill="#f2eee4"/><ellipse cx="350" cy="510" rx="80" ry="26" fill="#f2eee4"/>
  <!-- chair with coat -->
  <rect x="1000" y="470" width="120" height="16" fill="#4a2e1a"/><rect x="1000" y="360" width="16" height="120" fill="#4a2e1a"/>
  <rect x="1004" y="486" width="12" height="154" fill="#3a2414"/><rect x="1104" y="486" width="12" height="154" fill="#3a2414"/>
  <path d="M990 360 Q1030 340 1040 380 L1060 560 H980 Z" fill="#2a2a24"/>
  ${tableLamp(1420, 440)}
  <!-- washstand -->
  <rect x="1250" y="460" width="300" height="20" fill="#e8e0d0"/>
  <rect x="1260" y="480" width="280" height="160" fill="#5a3a22"/>
  <ellipse cx="1330" cy="455" rx="60" ry="14" fill="#f2eee4"/><path d="M1300 454 V420 Q1312 400 1330 400 Q1348 400 1350 420 V454" fill="#f2eee4"/>
  ${hot('bag', 'Medical bag', `
    <path d="M1400 460 V410 Q1400 395 1415 395 H1510 Q1525 395 1525 410 V460 Z" fill="#141210"/>
    <path d="M1430 395 Q1462 360 1494 395" stroke="#141210" stroke-width="10" fill="none"/>
    <rect x="1400" y="410" width="125" height="8" fill="url(#g-brass)"/>
    <circle cx="1462" cy="414" r="7" fill="url(#g-brass)"/>
    <rect x="1446" y="430" width="10" height="26" rx="3" fill="#cfe3ea" opacity=".85"/><rect x="1446" y="424" width="10" height="8" fill="#8a1a1a"/>
  `, [1390, 350, 150, 115])}
`);

const margaretRoom = () => svg(`
  ${wall('#9fb4c4', '#95aabb', { panel: '#e8e4dc', panelTop: 500 })}
  ${woodFloor('#6a4a30')}
  ${rug(800, 690, 860, 700, 1000, '#c8b4a0', '#8a6a4a')}
  ${windowNight(620, 110, 240, 300, { curtain: '#e8dcc8', frame: '#e8e4dc' })}
  <!-- dressing table with mirror and roses -->
  <ellipse cx="1150" cy="330" rx="110" ry="140" fill="#c8a860"/><ellipse cx="1150" cy="330" rx="96" ry="126" fill="#b8ccd8"/>
  <path d="M1080 250 Q1150 220 1210 290" stroke="#fff" stroke-width="8" opacity=".4" fill="none"/>
  <rect x="990" y="470" width="320" height="24" fill="#e8e4dc"/><rect x="1000" y="494" width="300" height="146" fill="#d8d0c0"/>
  <rect x="1250" y="420" width="30" height="50" rx="6" fill="#cfe3ea" opacity=".7"/>
  ${[[1255, 400], [1270, 390], [1285, 402], [1265, 412]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="#a8243a"/>`).join('')}
  ${hot('cabinet', 'Medicine cabinet', `
    <rect x="200" y="160" width="160" height="200" fill="#e8e4dc" stroke="#a89a80" stroke-width="6"/>
    <rect x="215" y="175" width="130" height="170" fill="#b8ccd8"/>
    <circle cx="340" cy="262" r="6" fill="url(#g-brass)"/>
    <path d="M280 220 v20 M270 230 h20" stroke="#8a1a1a" stroke-width="6"/>
  `)}
  <!-- writing desk -->
  <rect x="150" y="480" width="300" height="20" fill="#8a6a4a"/><rect x="170" y="500" width="14" height="140" fill="#6a4a30"/><rect x="416" y="500" width="14" height="140" fill="#6a4a30"/>
  ${hot('case', 'Writing case', `
    <polygon points="210,480 390,480 400,462 220,440" fill="#6a2a3a"/>
    <polygon points="220,440 400,462 400,470 220,450" fill="#8a3a4a"/>
    <polygon points="250,470 320,468 324,478 248,480" fill="#f2ead8"/>
    <circle cx="380" cy="472" r="5" fill="url(#g-brass)"/>
  `, [190, 420, 230, 80])}
  ${tableLamp(1060, 470, '#f0e0c8')}
`);

const victorRoom = () => svg(`
  ${wall('#4a4038', '#443a32', { panel: null })}
  ${woodFloor('#3e2818')}
  ${windowNight(700, 110, 220, 280, { curtain: '#2a3a4a' })}
  <!-- unmade bed -->
  <rect x="1150" y="340" width="420" height="30" rx="10" fill="#2a1a0e"/>
  <rect x="1170" y="370" width="380" height="180" fill="#2a1a0e"/>
  <path d="M1120 520 H1590 L1600 690 H1100 Z" fill="#d8d0c0"/>
  <path d="M1140 540 Q1300 500 1400 560 T1600 560 L1600 690 H1100 Z" fill="#4a3a5a"/>
  ${tableLamp(1070, 520)}
  <rect x="1020" y="520" width="100" height="120" fill="#2a1a0e"/>
  <rect x="1060" y="505" width="20" height="16" fill="#8a6a2a"/>
  ${hot('coat', 'Wet overcoat', `
    <rect x="300" y="470" width="150" height="16" fill="#4a2e1a"/><rect x="300" y="330" width="16" height="150" fill="#4a2e1a"/>
    <rect x="304" y="486" width="12" height="154" fill="#3a2414"/><rect x="434" y="486" width="12" height="154" fill="#3a2414"/>
    <path d="M290 330 Q340 305 360 350 L400 600 H270 Z" fill="#2e3440"/>
    <path d="M300 400 Q330 420 360 400" stroke="#1a1e26" stroke-width="5" fill="none"/>
    <rect x="330" y="470" width="40" height="30" fill="#1a1e26"/>
    <rect x="340" y="452" width="12" height="24" rx="3" fill="#8a6a2a"/>
    ${[290, 320, 350, 380].map((x, i) => `<ellipse cx="${x}" cy="${612 + i * 3}" rx="3" ry="6" fill="#9fb6cc" opacity=".8"/>`).join('')}
    <ellipse cx="340" cy="648" rx="90" ry="12" fill="#3a4a5a" opacity=".5"/>
  `, [260, 300, 200, 360])}
  ${hot('papers', 'Racing papers', `
    <polygon points="520,760 680,740 700,800 530,820" fill="#e8dcc0"/>
    <polygon points="640,780 800,770 790,840 640,850" fill="#f2ead8"/>
    <polygon points="480,820 610,810 620,860 470,870" fill="#e0d4b8"/>
    <path d="M540 770 h110 M545 785 h100 M660 790 h110 M665 805 h100 M490 830 h100" stroke="#555" stroke-width="2"/>
    <path d="M560 772 l40 14 M680 792 l60 16" stroke="#8a1a1a" stroke-width="3"/>
  `)}
  ${hot('suitcase', 'Suitcase', `
    <polygon points="900,690 1120,690 1140,780 880,780" fill="#6a4a2a"/>
    <polygon points="900,690 1120,690 1110,600 910,600" fill="#5a3a1e"/>
    <path d="M905 690 Q960 660 1010 690 Q1060 670 1115 690" fill="#e8e0d0"/>
    <path d="M930 690 q20 -30 60 -10 L1000 690 Z" fill="#3a3a5a"/>
    <rect x="990" y="780" width="40" height="10" fill="url(#g-brass)"/>
  `)}
`);

export const SCENES = {
  study, hall, drawing, library, billiard, pantry, bootroom, greenhouse, guest,
  margaret: margaretRoom, victor: victorRoom,
};
