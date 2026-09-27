# Blackwood Manor: Nightfall

Experimental branch: `isometric-roguelike`

## Direction

A browser-playable, top-down 3D-isometric detective roguelike using pixel-art rendering.

The original murder-mystery game remains untouched on `main`. This branch reuses Blackwood Manor's player-safe setting, rooms, suspects, and evidence while keeping culprit/solution data out of ordinary player-facing code.

## First playable slice

- Canvas-based isometric manor
- Pixel-art rendering with no external engine dependency
- Keyboard movement
- Turn counter and investigation pressure
- Fog/exploration reveal
- Physical evidence pickup
- Suspect encounters
- Detective notebook
- Responsive browser shell
- Restartable runs

## Intended roguelike systems

1. Seeded run generation with varied clue placement while preserving logical solvability.
2. Turn economy / dawn clock.
3. Resolve or composure resource affected by false leads, hazards, and pressure.
4. Branching suspect dialogue unlocked by evidence.
5. Locked/conditional rooms and traversal shortcuts.
6. Procedural secondary evidence and red herrings that never contradict canonical facts.
7. Theory-board / accusation phase as the run boss.
8. Multiple case layouts built from the existing case library.
9. Pixel-art sprites, furniture, weather, lighting, and tile sets.
10. Touch/controller support after keyboard gameplay is stable.

## Local entry point

`web/roguelike/index.html`
