# CLAUDE.md — Murder Mystery

Claude Code reads this file automatically. Read PLAN.md next: it holds status,
ideas, and the changelog.

## What this is
A murder mystery game played in the browser. The player searches rooms, finds
clues, questions suspects (new questions unlock as evidence is found), and makes
an accusation: who, how, and why.

It is a **static web app** in `web/` (plain HTML/CSS/JS modules, no build step).
Deployed on Vercel; a push to `main` deploys (project root directory = `web`).

## Owner and how to work with them
- Andrew has limited programming experience. Claude is the architect and does
  all the implementing, commits and pushes to **kornofflaw/murder-mystery**.
- Cadence: Andrew play-tests, says what worked, names the next priority.
  Keep back-and-forth to a minimum.
- Explanations stay short: what changed, and exactly what to click to test it.
- **Update PLAN.md at the end of every work session.**
- Target is a desktop/laptop browser. No platform assumptions.

## Rules
1. **Engine and content stay separate.** `js/main.js` is the engine and knows
   nothing about any particular story. A case is a data file in `js/cases/`
   (shape documented at the top of `blackwood.js`) plus its scenes file, and
   is listed in `js/cases.js`. Saves are per case (`mm-save-<case id>`).
   Cases "inspired by" a famous novel keep the setting and mood but use an
   original story, cast and solution (and a different culprit from the book).
2. **Every case must be fairly solvable.** Every part of the solution (culprit,
   method, motive) must be provable from clues the player can actually reach.
   After editing a case, run the headless play-through check (below): every
   clue and every question must be reachable.
3. Wrap all `localStorage` access in the helpers in `storage.js` (it can throw).
   Progress saves per case under `mm-save-<case id>`.
4. **Every room item is clickable in its picture.** Each item in case.js has a
   matching `hot(id, ...)` in scenes.js, and each suspect in a room a
   `person(id, ...)`. Art is drawn in code as SVG (no image files yet); the
   canvas is 1600x900 with the floor line at y=640. The headless check must
   confirm every item and person has a visible, clickable area.
5. **No build step.** Plain ES modules served as static files. No runtime CDN
   loads; if a library is ever needed, vendor it into `web/vendor/`.

## Layout
```
PLAN.md            status, ideas, changelog (keep current)
web/               the app; deploy this folder as-is
  index.html       page shell: top bar, room list, room view, overlays
  style.css
  js/main.js       engine: rooms, examine, interviews, notebook, accusation, saving
  js/cases.js      list of playable cases (order = case picker order)
  js/cases/        one data file + one scenes file per case:
    blackwood.js   "Death at Blackwood Manor" (country house, 1926)
    train.js       "Murder on the Alpine Express" (sleeper train; after Orient Express)
    moor.js        "The Hound of Greymoor" (Devon moor; after Hound of the Baskervilles)
    island.js      "The Guests of Gull Rock" (island hotel; after And Then There Were None)
    *-scenes.js    that case's room illustrations (SVG drawn in code, one per room)
  js/art.js        shared drawing helpers: walls, floors, windows, sky, fog, furniture, figures
  js/storage.js    safe localStorage helpers
```

## Testing
- Run locally: `cd web && python3 -m http.server 8000`, open http://localhost:8000.
- `?debug` exposes `window.game` (CASE, CASES, state, loadCase, goTo, addClue,
  newGame). `?case=<id>` opens a case directly.
- Headless: Playwright + Chromium is available in Claude Code cloud sessions.
  Play through every case: visit every room, examine every item, ask every open question
  (repeat until nothing new unlocks), confirm all clues/topics are reached,
  submit a wrong then the right accusation, reload and confirm progress kept,
  and check there are no console errors.
