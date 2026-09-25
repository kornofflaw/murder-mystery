# PLAN.md — Murder Mystery

## Status
- **v0.1 (Sept 2026): first playable case, "Death at Blackwood Manor".**
  11 rooms, 5 suspects, 30 clues (evidence + testimony), 32 questions,
  notebook with evidence / testimony / timeline / people, 3 accusations,
  verdict screen with rank, autosave in the browser.

## Next ideas (Andrew picks the priority)
- Art: room illustrations and suspect portraits (currently monogram circles).
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
- 2026-09-25: Project created. Engine + first case, play-tested headless
  (all clues and questions reachable, no console errors).
