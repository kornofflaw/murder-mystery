// art.js — drawing helpers for room illustrations. Every scene is an SVG
// string drawn in code on a 1600 x 900 canvas; the back wall meets the floor
// at y = 640. Things the player can click are wrapped with hot() (an item) or
// person() (a suspect); main.js wires the clicks.

export const W = 1600, H = 900, FLOOR = 640;

// Deterministic random numbers so a scene looks the same every time.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// A clickable item. hit = [x, y, w, h] adds an invisible target so small
// things are easy to click.
export function hot(id, name, content, hit) {
  const pad = hit ? `<rect x="${hit[0]}" y="${hit[1]}" width="${hit[2]}" height="${hit[3]}" fill="transparent"/>` : '';
  return `<g class="hot" data-item="${id}" data-name="${esc(name)}">${pad}${content}</g>`;
}

export function person(id, name, content) {
  return `<g class="hot hot-person" data-person="${id}" data-name="${esc(name)}">${content}</g>`;
}

export const DEFS = `
<defs>
  <linearGradient id="g-night" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0b1422"/><stop offset="1" stop-color="#1c2a3a"/>
  </linearGradient>
  <pattern id="p-rain" width="60" height="90" patternUnits="userSpaceOnUse">
    <path d="M10 0 l-8 24 M40 30 l-8 24 M25 60 l-8 24 M55 70 l-6 18" stroke="#9fb6cc" stroke-width="1.6" opacity=".45"/>
  </pattern>
  <radialGradient id="g-glow">
    <stop offset="0" stop-color="#ffd58a" stop-opacity=".55"/>
    <stop offset=".5" stop-color="#ffb24a" stop-opacity=".16"/>
    <stop offset="1" stop-color="#ff9a2a" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="g-fire">
    <stop offset="0" stop-color="#ff9a3a" stop-opacity=".55"/>
    <stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="g-vignette" cx=".5" cy=".45" r=".75">
    <stop offset=".55" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".7"/>
  </radialGradient>
  <linearGradient id="g-wood" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#5b3a22"/><stop offset="1" stop-color="#3b2415"/>
  </linearGradient>
  <linearGradient id="g-wood-dark" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3a2416"/><stop offset="1" stop-color="#22150c"/>
  </linearGradient>
  <linearGradient id="g-brass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e6c877"/><stop offset="1" stop-color="#8a6a2a"/>
  </linearGradient>
  <linearGradient id="g-glass" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#cfe3ea" stop-opacity=".35"/>
    <stop offset=".5" stop-color="#ffffff" stop-opacity=".75"/>
    <stop offset="1" stop-color="#cfe3ea" stop-opacity=".3"/>
  </linearGradient>
  <linearGradient id="g-baize" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1f6a3e"/><stop offset="1" stop-color="#124528"/>
  </linearGradient>
  <linearGradient id="g-floor-shade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".35" stop-color="#000" stop-opacity="0"/>
  </linearGradient>
</defs>`;

export function svg(body, { dark = 0 } = {}) {
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="scene-svg" role="img">
${DEFS}
${body}
${dark ? `<rect width="${W}" height="${H}" fill="#000" opacity="${dark}" pointer-events="none"/>` : ''}
<rect width="${W}" height="${H}" fill="url(#g-vignette)" pointer-events="none"/>
</svg>`;
}

// ---------- structure ----------

// Back wall with a striped wallpaper, cornice, optional wood panelling below.
export function wall(base, stripe, { panel = '#3b2616', panelTop = 470 } = {}) {
  let s = `<rect width="${W}" height="${FLOOR}" fill="${base}"/>`;
  if (stripe) for (let x = 0; x < W; x += 64) s += `<rect x="${x}" y="0" width="22" height="${FLOOR}" fill="${stripe}"/>`;
  s += `<rect width="${W}" height="30" fill="#1a110a"/><rect y="30" width="${W}" height="8" fill="#5a4630"/>`;
  if (panel) {
    s += `<rect y="${panelTop}" width="${W}" height="${FLOOR - panelTop}" fill="${panel}"/>`;
    s += `<rect y="${panelTop}" width="${W}" height="8" fill="#2a1a0e"/>`;
    for (let x = 20; x < W; x += 200) {
      s += `<rect x="${x}" y="${panelTop + 24}" width="160" height="${FLOOR - panelTop - 44}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="3"/>`;
    }
  }
  s += `<rect y="${FLOOR - 12}" width="${W}" height="12" fill="#1a110a"/>`;
  return s;
}

export function stoneWall(base = '#5b5750') {
  let s = `<rect width="${W}" height="${FLOOR}" fill="${base}"/>`;
  const r = rng(7);
  for (let y = 0; y < FLOOR; y += 56) {
    const off = (y / 56) % 2 ? 0 : 60;
    for (let x = -off; x < W; x += 120) {
      const shade = 0.08 + r() * 0.12;
      s += `<rect x="${x + 3}" y="${y + 3}" width="114" height="50" rx="4" fill="#000" opacity="${shade.toFixed(2)}"/>`;
    }
  }
  return s + `<rect y="${FLOOR - 12}" width="${W}" height="12" fill="#2a2622"/>`;
}

// Wooden floor boards receding to a vanishing point.
export function woodFloor(color = '#4a2f1c') {
  let s = `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="${color}"/>`;
  for (let i = -14; i <= 14; i++) {
    s += `<line x1="${800 + i * 70}" y1="${FLOOR}" x2="${800 + i * 190}" y2="${H}" stroke="#000" stroke-opacity=".28" stroke-width="2"/>`;
  }
  return s + `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="url(#g-floor-shade)"/>`;
}

export function flagFloor(color = '#6b665c') {
  let s = `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="${color}"/>`;
  for (let i = -10; i <= 10; i++) {
    s += `<line x1="${800 + i * 110}" y1="${FLOOR}" x2="${800 + i * 300}" y2="${H}" stroke="#000" stroke-opacity=".3" stroke-width="3"/>`;
  }
  for (const y of [668, 706, 756, 822]) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#000" stroke-opacity=".3" stroke-width="3"/>`;
  return s + `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="url(#g-floor-shade)"/>`;
}

// Rug in perspective: back edge (y1) narrower than front edge (y2).
export function rug(cx, y1, y2, wBack, wFront, color, border = '#c9a45c') {
  const p = (inset) => `${cx - wBack / 2 + inset},${y1 + inset * .4} ${cx + wBack / 2 - inset},${y1 + inset * .4} ${cx + wFront / 2 - inset * 1.4},${y2 - inset * .6} ${cx - wFront / 2 + inset * 1.4},${y2 - inset * .6}`;
  return `<polygon points="${p(0)}" fill="${border}" opacity=".8"/><polygon points="${p(10)}" fill="${color}"/><polygon points="${p(26)}" fill="none" stroke="${border}" stroke-width="3" opacity=".6"/>`;
}

export function windowNight(x, y, w, h, { curtain = '#5a1a1a', frame = '#2a1a0e' } = {}) {
  let s = `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" fill="${frame}"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g-night)"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#p-rain)"/>`;
  // trees beyond, blown in the storm
  s += `<path d="M${x} ${y + h} Q${x + w * .2} ${y + h * .55} ${x + w * .35} ${y + h * .7} T${x + w * .7} ${y + h * .6} T${x + w} ${y + h * .75} V${y + h} Z" fill="#05090f" opacity=".9"/>`;
  s += `<rect x="${x + w / 2 - 5}" y="${y}" width="10" height="${h}" fill="${frame}"/>`;
  s += `<rect x="${x}" y="${y + h * .45}" width="${w}" height="10" fill="${frame}"/>`;
  s += `<rect x="${x - 26}" y="${y + h + 10}" width="${w + 52}" height="14" fill="#4a3322"/>`;
  if (curtain) {
    s += `<path d="M${x - 60} ${y - 40} H${x + 40} Q${x + 10} ${y + h * .4} ${x + 30} ${y + h + 40} H${x - 60} Z" fill="${curtain}"/>`;
    s += `<path d="M${x + w + 60} ${y - 40} H${x + w - 40} Q${x + w - 10} ${y + h * .4} ${x + w - 30} ${y + h + 40} H${x + w + 60} Z" fill="${curtain}"/>`;
    for (const d of [-40, -15]) s += `<path d="M${x + d} ${y - 40} Q${x + d - 10} ${y + h * .5} ${x + d + 8} ${y + h + 40}" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none"/>`;
    for (const d of [40, 15]) s += `<path d="M${x + w + d} ${y - 40} Q${x + w + d + 10} ${y + h * .5} ${x + w + d - 8} ${y + h + 40}" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none"/>`;
    s += `<rect x="${x - 80}" y="${y - 52}" width="${w + 160}" height="16" rx="8" fill="url(#g-brass)"/>`;
  }
  return s;
}

export function door(x, w = 160, h = 360, { open = 0, color = '#4a2e1a', beyond = '#e2b872' } = {}) {
  const y = FLOOR - h;
  let s = `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 14}" fill="#241509"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${open ? beyond : color}"/>`;
  if (open) {
    const leaf = w * (1 - open);
    s += `<polygon points="${x},${y} ${x + leaf},${y + 16} ${x + leaf},${FLOOR - 4} ${x},${FLOOR}" fill="${color}"/>`;
    s += `<circle cx="${x + leaf - 14}" cy="${y + h * .55}" r="6" fill="url(#g-brass)"/>`;
  } else {
    s += `<rect x="${x + 18}" y="${y + 20}" width="${w - 36}" height="${h * .38}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="4"/>`;
    s += `<rect x="${x + 18}" y="${y + h * .5}" width="${w - 36}" height="${h * .42}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="4"/>`;
    s += `<circle cx="${x + w - 22}" cy="${y + h * .47}" r="7" fill="url(#g-brass)"/>`;
  }
  return s;
}

export function fireplace(x, { lit = true, w = 300 } = {}) {
  const top = 380;
  let s = '';
  if (lit) s += `<ellipse cx="${x + w / 2}" cy="${FLOOR}" rx="${w * 1.4}" ry="220" fill="url(#g-fire)"/>`;
  s += `<rect x="${x}" y="${top}" width="${w}" height="${FLOOR - top}" fill="#6e6356"/>`;
  s += `<rect x="${x - 20}" y="${top - 16}" width="${w + 40}" height="22" fill="#4a4036"/>`;
  s += `<path d="M${x + 50} ${FLOOR} V${top + 90} Q${x + w / 2} ${top + 40} ${x + w - 50} ${top + 90} V${FLOOR} Z" fill="#120b07"/>`;
  s += `<rect x="${x + 70}" y="${FLOOR - 16}" width="${w - 140}" height="10" fill="#2a2522"/>`;
  if (lit) {
    const cx = x + w / 2;
    s += `<ellipse cx="${cx}" cy="${FLOOR - 20}" rx="${w * .28}" ry="16" fill="#8a2a0a"/>`;
    s += `<path d="M${cx - 60} ${FLOOR - 20} Q${cx - 50} ${FLOOR - 90} ${cx - 20} ${FLOOR - 60} Q${cx - 10} ${FLOOR - 130} ${cx + 15} ${FLOOR - 70} Q${cx + 40} ${FLOOR - 110} ${cx + 60} ${FLOOR - 20} Z" fill="#ff8a2a" opacity=".9"/>`;
    s += `<path d="M${cx - 35} ${FLOOR - 20} Q${cx - 20} ${FLOOR - 70} ${cx} ${FLOOR - 45} Q${cx + 20} ${FLOOR - 80} ${cx + 35} ${FLOOR - 20} Z" fill="#ffd36a"/>`;
  } else {
    const cx = x + w / 2;
    s += `<ellipse cx="${cx}" cy="${FLOOR - 20}" rx="${w * .26}" ry="18" fill="#6a6660"/>`;
    s += `<ellipse cx="${cx - 20}" cy="${FLOOR - 28}" rx="${w * .12}" ry="10" fill="#8a8680"/>`;
    s += `<rect x="${cx - 50}" y="${FLOOR - 36}" width="70" height="12" rx="6" fill="#2a2522" transform="rotate(-8 ${cx} ${FLOOR - 30})"/>`;
  }
  return s;
}

export function bookshelf(x, y, w, h, seed = 1) {
  const r = rng(seed);
  const cols = ['#6a1e1e', '#1e3a5a', '#2e4a2a', '#5a4a1e', '#3a2a4a', '#7a5a3a', '#2a2a2a', '#8a6a4a'];
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a1a0e"/>`;
  const shelfH = 92;
  for (let sy = y + 14; sy + shelfH <= y + h; sy += shelfH) {
    let bx = x + 12;
    while (bx < x + w - 26) {
      const bw = 12 + r() * 18, bh = shelfH - 22 - r() * 22;
      const c = cols[(r() * cols.length) | 0];
      if (r() < .08) { bx += bw; continue; }
      s += `<rect x="${bx.toFixed(1)}" y="${(sy + shelfH - 12 - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${c}"/>`;
      s += `<rect x="${bx.toFixed(1)}" y="${(sy + shelfH - 12 - bh + 10).toFixed(1)}" width="${bw.toFixed(1)}" height="3" fill="#c9a45c" opacity=".5"/>`;
      bx += bw + 1;
    }
    s += `<rect x="${x}" y="${sy + shelfH - 12}" width="${w}" height="12" fill="#4a2e1a"/>`;
  }
  return s;
}

export function painting(x, y, w, h, kind = 'land') {
  let s = `<rect x="${x - 12}" y="${y - 12}" width="${w + 24}" height="${h + 24}" fill="url(#g-brass)"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1f2a22"/>`;
  if (kind === 'land') {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h * .55}" fill="#3a4a4a"/>`;
    s += `<path d="M${x} ${y + h * .6} Q${x + w * .3} ${y + h * .35} ${x + w * .6} ${y + h * .55} T${x + w} ${y + h * .5} V${y + h} H${x} Z" fill="#2a3a22"/>`;
  } else {
    s += `<ellipse cx="${x + w / 2}" cy="${y + h * .38}" rx="${w * .16}" ry="${h * .15}" fill="#b89478"/>`;
    s += `<path d="M${x + w * .18} ${y + h} Q${x + w / 2} ${y + h * .45} ${x + w * .82} ${y + h} Z" fill="#141414"/>`;
  }
  return s;
}

export function glow(cx, cy, r, opacity = 1) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * .8}" fill="url(#g-glow)" opacity="${opacity}" pointer-events="none"/>`;
}

export function tableLamp(x, y, shade = '#d9b56a') {
  return glow(x, y - 40, 260) +
    `<rect x="${x - 4}" y="${y - 60}" width="8" height="60" fill="url(#g-brass)"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="26" ry="7" fill="url(#g-brass)"/>` +
    `<path d="M${x - 44} ${y - 50} L${x - 26} ${y - 110} H${x + 26} L${x + 44} ${y - 50} Z" fill="${shade}"/>`;
}

// ---------- people ----------

// Standing figure, origin at the feet, ~380 units tall at scale 1.
export function figure(x, y, s, o = {}) {
  const coat = o.coat || '#2a2a33', trousers = o.trousers || '#1a1a20', skin = o.skin || '#e0b896';
  const hair = o.hair || '#3a2a1a', shirt = o.shirt || '#f2eee4';
  let b = '';
  b += `<ellipse cx="0" cy="0" rx="70" ry="12" fill="#000" opacity=".35"/>`;
  if (o.dress) {
    b += `<path d="M-46 -305 L46 -305 L${o.seated ? 70 : 84} 0 L${o.seated ? -70 : -84} 0 Z" fill="${o.dress}"/>`;
    b += `<path d="M-46 -305 L46 -305 L42 -215 L-42 -215 Z" fill="#000" opacity=".12"/>`;
  } else {
    b += `<rect x="-30" y="-172" width="26" height="170" fill="${trousers}"/><rect x="4" y="-172" width="26" height="170" fill="${trousers}"/>`;
    b += `<ellipse cx="-19" cy="-4" rx="22" ry="8" fill="#111"/><ellipse cx="19" cy="-4" rx="22" ry="8" fill="#111"/>`;
    b += `<path d="M-54 -312 L54 -312 L50 ${o.tails ? -110 : -150} L${o.tails ? 20 : 0} ${o.tails ? -150 : -150} L-50 -150 Z" fill="${coat}"/>`;
    b += `<path d="M-18 -312 L0 -262 L18 -312 Z" fill="${shirt}"/><path d="M-5 -300 L0 -262 L5 -300 Z" fill="${o.tie || '#5a1a1a'}"/>`;
  }
  // arms
  const armL = o.armL || 'down', armR = o.armR || 'down';
  const arm = (side, pose) => {
    const sx = side * 62;
    if (pose === 'up') return `<path d="M${sx} -300 L${sx + side * 30} -210 L${sx + side * 6} -180" stroke="${o.dress || coat}" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${sx + side * 6}" cy="-176" r="11" fill="${skin}"/>`;
    return `<path d="M${sx} -300 L${sx + side * 6} -160" stroke="${o.dress || coat}" stroke-width="24" stroke-linecap="round"/><circle cx="${sx + side * 6}" cy="-150" r="11" fill="${skin}"/>`;
  };
  b += arm(-1, armL) + arm(1, armR);
  b += `<rect x="-10" y="-332" width="20" height="24" fill="${skin}"/>`;
  b += `<ellipse cx="0" cy="-362" rx="29" ry="35" fill="${skin}"/>`;
  b += `<ellipse cx="0" cy="-352" rx="29" ry="25" fill="#000" opacity=".06"/>`;
  if (o.bun) b += `<path d="M-31 -360 Q-34 -402 0 -402 Q34 -402 31 -360 Q24 -384 0 -386 Q-24 -384 -31 -360 Z" fill="${hair}"/><circle cx="0" cy="-404" r="15" fill="${hair}"/>`;
  else if (o.bob) b += `<path d="M-33 -330 Q-38 -404 0 -402 Q38 -404 33 -330 L24 -334 Q26 -380 0 -384 Q-26 -380 -24 -334 Z" fill="${hair}"/>`;
  else b += `<path d="M-30 -362 Q-32 -400 0 -400 Q32 -400 30 -362 Q24 -382 0 -384 Q-18 -384 -30 -362 Z" fill="${hair}"/>`;
  if (o.extra) b += o.extra;
  return `<g transform="translate(${x} ${y}) scale(${s})">${b}</g>`;
}
