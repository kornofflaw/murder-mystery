# PLAN.md — Murder Mystery

## Status
- **v0.1 (Sept 2026): first playable case, "Death at Blackwood Manor".**
  11 rooms, 5 suspects, 30 clues (evidence + testimony), 32 questions,
  notebook with evidence / testimony / timeline / people, 3 accusations,
  verdict screen with rank, autosave in the browser.

- **v0.2: illustrated rooms.** Each room is a drawn scene; click the objects in
  the picture to examine them, click people to question them. Hover shows a
  label, "Highlight things to examine" pulses anything not yet looked at.

## Next ideas (Andrew picks the priority)
- Richer art: painted/AI-generated room images or suspect portraits (currently
  simple flat SVG drawings and monogram circles). Would need image files and
  a credits list.
- Sound: rain, clock, music (generated or licensed; keep sources listed).
- A floor-plan map instead of the room list.
- More cases, and a case picker on the start screen.
- Randomised cases (culprit/motive shuffled from a template) for replay.
- "Present evidence" mechanic: pick a clue from the notebook to show a suspect.
- Hints for stuck players.

## Hosting
- GitHub: kornofflaw/murder-mystery. Vercel project `murder-mystery`,
  root directory `web`, no build command. Push to `main` deploys.

## Changelog
- 2026-09-25: Illustrated rooms (art.js + scenes.js). Items and people are
  clicked in the picture; the old item buttons are gone. Reading card sits
  under the picture; clue pop-up moved to the top.
- 2026-09-25: Project created. Engine + first case, play-tested headless
  (all clues and questions reachable, no console errors).
