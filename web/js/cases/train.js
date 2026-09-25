// train.js — "Murder on the Alpine Express". Inspired by Agatha Christie's
// Murder on the Orient Express; the story, people and solution are original.

import { SCENES } from './train-scenes.js';

export const CASE = {
  id: 'alpine-express-1932',
  scenes: SCENES,
  title: 'Murder on the Alpine Express',
  inspiredBy: 'Murder on the Orient Express',
  setting: 'A sleeping car snowbound in the Arlberg Pass, February 1932',
  tagline: 'A snowdrift, a locked compartment, and a financier with too many enemies.',
  cover: 'linear-gradient(135deg, #1c2a3a, #5a3a1a)',
  coverIcon: '🚂',
  detective: 'Detective',
  placesLabel: 'The train',
  gather: 'You gather the passengers in the dining car',
  deadline: 'before the snowplough reaches the train',

  intro: [
    'The Alpine Express left Vienna for Calais last night. Somewhere in the Arlberg Pass it ran into a snowdrift and stopped dead. It has not moved since.',
    'At seven this morning the attendant, Marchetti, could get no answer from compartment 7. He forced the door. It was locked and chained on the inside. Mr. Silas Crane, the American financier, lay dead in his berth, stabbed once. The window stood open to the snow.',
    'You are a private detective travelling home from a case in Vienna. The railway company has asked you to find the killer before the snowplough arrives and the passengers scatter across Europe.',
    'Almost everyone in this carriage had a reason to hate Silas Crane. Only one of them killed him.',
  ],

  startClues: ['c_found'],

  clues: {
    c_found:      { kind: 'evidence',  time: '07:00', title: 'Compartment 7 forced', text: 'Marchetti forced Crane’s door at seven this morning. It was locked and chained on the inside.' },
    c_body:       { kind: 'evidence',  title: 'One stab wound', text: 'Crane was stabbed once, under the ribs, while lying in his berth. The blood has long dried. He has been dead for many hours.' },
    c_watch:      { kind: 'evidence',  title: 'The smashed watch', text: 'Crane’s pocket watch lies on the floor, glass smashed, hands at 1:15. But the works are not broken: the winding crown has been pulled out, which stops the hands. Someone set it to 1:15 on purpose.' },
    c_window:     { kind: 'evidence',  title: 'The open window', text: 'The window was pushed right down. Snow has drifted onto the sill, but only a light dusting has blown in. Outside, the snow along the track is smooth and unmarked.' },
    c_conndoor:   { kind: 'evidence',  title: 'Connecting door (Crane’s side)', text: 'A connecting door joins Crane’s compartment to the next one, no. 8. On Crane’s side there is no bolt at all: it can only be locked from no. 8. There is a smear of dried blood on the handle.' },
    c_cufflink:   { kind: 'evidence',  title: 'A gold cufflink', text: 'Under Crane’s berth, near the connecting door: a gold cufflink engraved “S.B.”' },
    c_letter:     { kind: 'evidence',  title: 'Crane’s letter to Scotland Yard', text: 'A draft letter in Crane’s attaché case: “My secretary, Samuel Brandt, has stolen some £30,000 from my accounts. I shall hand him to the police at Calais. — S. Crane.”' },
    c_victims:    { kind: 'evidence',  title: 'List of bank creditors', text: 'Also in the attaché case, a list of people ruined when Crane’s bank collapsed in 1929. Among the names: Count Viktor Voss, and Mr. Edward Dale of Leeds.' },
    c_trunk:      { kind: 'evidence',  title: 'Brandt’s trunk', text: 'Brandt’s heavy trunk stands against the connecting door. But there is a clean, dust-free rectangle on the floor beside it and fresh scrape marks: it was moved away and pushed back tonight.' },
    c_bolt:       { kind: 'evidence',  title: 'The bolt in no. 8', text: 'On Brandt’s side, the connecting-door bolt is drawn back. It has been freshly oiled; there is still a drip of oil on the frame.' },
    c_basin:      { kind: 'evidence',  title: 'Brandt’s washbasin', text: 'Brandt’s towel is damp and there is a faint pink stain in the plughole of his basin.' },
    c_dagger:     { kind: 'evidence',  title: 'Dagger in the sponge bag', text: 'Stuffed into the Countess’s sponge bag, which hangs on the outside of her door handle: a thin dagger, wiped, but with blood in the grooves of the hilt.' },
    c_draught:    { kind: 'evidence',  title: 'Sleeping draught', text: 'On the Countess’s shelf, a bottle of chloral sleeping draught from the attendant’s medicine box, a dose gone.' },
    c_kimono:     { kind: 'evidence',  title: 'A scarlet kimono', text: 'A scarlet silk kimono embroidered with dragons hangs in the Countess’s compartment.' },
    c_wall:       { kind: 'evidence',  title: 'A thin partition', text: 'The wall between Miss Dale’s compartment (no. 6) and Crane’s (no. 7) is thin panelling. You can hear every word through it.' },
    c_fatherletter:{ kind: 'evidence', title: 'A letter from her father', text: 'In Miss Dale’s handbag, an old letter from her father: “The bank has failed. Everything is gone. Forgive me, Nell.” It is dated 1929.' },
    c_score:      { kind: 'evidence',  time: '01:00', title: 'The bridge score sheet', text: 'A bridge score sheet in the dining car. At the top, in Brandt’s handwriting: “Began 1.00 a.m.” Nobody writes the time on a score sheet.' },
    c_snowout:    { kind: 'evidence',  title: 'Unbroken snow', text: 'All along the train, on both sides, the snow is smooth to the treeline. Nobody has left or boarded the train since it stopped.' },
    c_log:        { kind: 'evidence',  title: 'The attendant’s log', text: 'Marchetti’s log: “23.00 draught to no. 3 (Countess). 23.30 train stopped, drift. 24.00 snow ceased. 00.35 bump heard, no. 7 — train settling? 07.00 no. 7 forced.”' },

    t_argument:   { kind: 'testimony', time: '22:30', title: 'Quarrel at dinner', text: 'The Colonel heard Crane tell Brandt at dinner: “You’ll be in handcuffs at Calais, Samuel.”' },
    t_draught:    { kind: 'testimony', time: '23:00', title: 'The Countess takes a draught', text: 'Marchetti brought the Countess a sleeping draught at eleven. She says she slept like the dead until morning.' },
    t_snowstop:   { kind: 'testimony', time: '00:00', title: 'The snow stops', text: 'Marchetti: the snow stopped falling at midnight exactly. Any footprints made after that would still be there.' },
    t_cry:        { kind: 'testimony', time: '00:35', title: 'A cry through the wall', text: 'Miss Dale heard a short cry and a thud from Crane’s compartment, then the click of the connecting door, then water running in no. 8.' },
    t_cards:      { kind: 'testimony', time: '01:00', title: 'Brandt arrives for cards', text: 'The Colonel: Brandt came to the dining car at one o’clock sharp, asked the time twice, and wrote it on the score sheet. They played until half past two.' },
    t_brandt:     { kind: 'testimony', title: 'Brandt’s story', text: 'Brandt says he slept until one, then went to the dining car. His trunk has stood against the connecting door the whole journey; he never uses it.' },
    t_cufflinks:  { kind: 'testimony', time: '21:30', title: 'Both cufflinks at dinner', text: 'Marchetti laid out Brandt’s evening clothes at half past nine, both gold cufflinks with them. Brandt wore them to dinner.' },
    t_oil:        { kind: 'testimony', title: 'Brandt borrowed oil', text: 'Marchetti: Mr. Brandt borrowed the oil can yesterday afternoon. “A squeaky hinge,” he said.' },
    t_kimono:     { kind: 'testimony', title: 'The Countess’s grudge', text: 'The Countess admits Crane ruined her husband, who died soon after. She says she would have spat on Crane, not stabbed him.' },
  },

  rooms: [
    {
      id: 'crane', name: 'Compartment 7 (Crane)',
      desc: 'A first-class sleeper panelled in walnut. The window is open and the cold is savage. Silas Crane lies in the lower berth under a stained blanket.',
      items: [
        { id: 'body', name: 'Silas Crane', clue: 'c_body', text: 'He was stabbed once, under the ribs, as he lay in bed. The blood on the blanket is dry and brown. He is stiff and cold; he died many hours ago, not in the early morning.' },
        { id: 'watch', name: 'Pocket watch', clue: 'c_watch', text: 'His gold watch lies on the floor, the glass smashed, the hands at a quarter past one. You turn it over. The works are fine; the winding crown has simply been pulled out, which stops the hands. Someone set this time deliberately.' },
        { id: 'window', name: 'Open window', clue: 'c_window', text: 'Pushed right down. Only a dusting of snow has blown in; the heavy snow had already stopped when this was opened. Below, the snow along the track is smooth. Nobody climbed out.' },
        { id: 'conndoor', name: 'Connecting door', clue: 'c_conndoor', text: 'A door into the next compartment, no. 8. On this side there is no bolt; it can only be locked from no. 8. A smear of dried blood darkens the handle.' },
        { id: 'underberth', name: 'Under the berth', clue: 'c_cufflink', text: 'You crouch with a match. Near the connecting door, a gold cufflink glints. Engraved on it: S.B.' },
        { id: 'case', name: 'Attaché case', clue: 'c_letter', text: 'Papers. On top, a draft letter in Crane’s hand to Scotland Yard: his secretary Samuel Brandt has stolen some £30,000, and Crane means to hand him to the police at Calais.' },
        { id: 'list', name: 'Folder of papers', clue: 'c_victims', text: 'A list headed “Creditors — Crane Mercantile Bank, 1929”. Hundreds of names of people who lost everything. Two are underlined: Count Viktor Voss, Vienna; Mr. Edward Dale, Leeds.' },
      ],
    },
    {
      id: 'brandt', name: 'Compartment 8 (Brandt)',
      desc: 'The secretary’s compartment, next door to Crane’s. Neat as a pin. A big steamer trunk stands against the connecting door.',
      items: [
        { id: 'trunk', name: 'Steamer trunk', clue: 'c_trunk', text: 'It is heavy, but it has been moved: beside it is a clean rectangle in the dust where it stood, and fresh scrape marks on the floor. It was pulled away and pushed back tonight.' },
        { id: 'bolt', name: 'Connecting-door bolt', clue: 'c_bolt', text: 'You reach behind the trunk. The bolt is drawn back, unlocked. It has been freshly oiled; a drip of oil is still on the frame.' },
        { id: 'basin', name: 'Washbasin', clue: 'c_basin', text: 'The towel beside the basin is damp. Deep in the plughole there is a faint pink stain.' },
        { id: 'shelf', name: 'Dressing shelf', text: 'Hairbrushes, collar studs, a single gold cufflink engraved S.B. lying alone in a little leather tray. Its partner is missing.' },
      ],
    },
    {
      id: 'countess', name: 'Compartment 3 (Countess)',
      desc: 'Scent, silk and a dozen hatboxes. Countess Irina Voss sits wrapped in furs, smoking through a long holder. Her sponge bag hangs on the door handle.',
      items: [
        { id: 'sponge', name: 'Sponge bag', clue: 'c_dagger', text: 'It hangs on the outside of the door handle, where anyone passing could reach it. Inside, stuffed down among the soaps, is a thin dagger. Wiped, but there is blood in the grooves of the hilt.' },
        { id: 'bottle', name: 'Medicine bottle', clue: 'c_draught', text: 'Chloral sleeping draught, from the attendant’s medicine box. A dose is gone.' },
        { id: 'kimono', name: 'Scarlet kimono', clue: 'c_kimono', text: 'Scarlet silk, embroidered with golden dragons. Very striking. Very easy to remember.' },
      ],
    },
    {
      id: 'dale', name: 'Compartment 6 (Miss Dale)',
      desc: 'A second-class compartment, plain and tidy. Miss Helen Dale, a governess, sits very upright with a book she is not reading.',
      items: [
        { id: 'wall', name: 'The partition', clue: 'c_wall', text: 'You knock on the panelling. It is thin; on the other side is Crane’s compartment. From here you could hear every word, every movement.' },
        { id: 'handbag', name: 'Handbag', clue: 'c_fatherletter', text: 'Folded small and soft with handling, an old letter: “The bank has failed. Everything is gone. Forgive me, Nell. — Father.” Dated November 1929.' },
        { id: 'book', name: 'Her book', text: 'A French grammar. She is on the same page she was on an hour ago.' },
      ],
    },
    {
      id: 'corridor', name: 'The Corridor',
      desc: 'A long, narrow corridor, lamps turned low, snow pressed against the windows. Compartment doors run along one side.',
      items: [
        { id: 'door7', name: 'Door of no. 7', text: 'The door chain hangs broken where Marchetti forced it. It was fastened from inside; no one left this way.' },
        { id: 'windows', name: 'Corridor windows', text: 'Snow is heaped against the glass to half its height. Beyond, black pines and a grey sky.' },
        { id: 'map', name: 'Route map', text: 'Vienna — Innsbruck — Arlberg — Zürich — Paris — Calais. A little brass train on a pin marks the pass where you are stuck.' },
      ],
    },
    {
      id: 'dining', name: 'The Dining Car',
      desc: 'White cloths, brass lamps, cold coffee. Colonel Arthur Pryce is working through a pot of tea. Samuel Brandt sits across from him, pale and very polite.',
      items: [
        { id: 'score', name: 'Bridge score sheet', clue: 'c_score', text: 'Last night’s bridge scores. At the top, in a neat clerk’s hand: “Began 1.00 a.m.” Who writes the time on a score sheet, unless they want it remembered?' },
        { id: 'menu', name: 'Dinner menu', text: 'Consommé, trout, veal, a savoury. Crane’s table was laid for two.' },
      ],
    },
    {
      id: 'vestibule', name: 'Attendant’s Vestibule',
      desc: 'The little lobby at the end of the sleeping car, with the attendant’s seat, the stove, and a door onto the snow. Marchetti, the attendant, stands stamping his feet.',
      items: [
        { id: 'snow', name: 'The snow outside', clue: 'c_snowout', text: 'You open the door and lean out. On both sides of the train, the snow lies smooth all the way to the pines. Not a footprint. No one has come or gone since it stopped.' },
        { id: 'log', name: 'Attendant’s log', clue: 'c_log', text: '“23.00 draught to no. 3 (Countess). 23.30 train stopped, drift. 24.00 snow ceased. 00.35 bump heard, no. 7 — train settling? 07.00 no. 7 forced.”' },
        { id: 'keys', name: 'Key board', text: 'The master key hangs on its hook with a seal of wax over it. The seal is unbroken.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'brandt', color: '#3a4a5a', name: 'Samuel Brandt', role: 'Crane’s secretary', room: 'dining',
      bio: 'Forties, spectacles, soft-spoken. Eight years at Crane’s side.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'Asleep in no. 8 until about one. I couldn’t settle, so I went to the dining car and played bridge with the Colonel until half past two.', gives: 't_brandt' },
        { id: 'door', q: 'Your compartment connects with Mr. Crane’s.', a: 'It does, but I never use that door. My trunk has stood against it since Vienna. Mr. Crane liked his privacy.' },
        { id: 'victim', q: 'What was Mr. Crane like?', a: 'A great man. A hard one. Half the people on this train had reason to hate him, you know. Look at the Countess.' },
        { id: 'argument', q: 'He threatened you with handcuffs at dinner.', requires: ['t_argument'], a: 'A misunderstanding over accounts. He was always threatening someone.' },
        { id: 'letter', q: 'He was going to hand you to the police at Calais.', requires: ['c_letter'], a: '(He takes off his spectacles and polishes them.) A draft. He wrote a great many things he never sent.' },
        { id: 'trunk', q: 'Your trunk was moved tonight, and the bolt behind it oiled.', requires: ['c_trunk', 'c_bolt'], a: 'The porters must have shifted it. I really couldn’t say.' },
        { id: 'cufflink', q: 'Your cufflink was under Crane’s berth.', requires: ['c_cufflink'], a: 'I lost that days ago. I must have dropped it when I took him his papers.' },
        { id: 'score', q: 'You wrote “Began 1.00 a.m.” on the score sheet.', requires: ['c_score'], a: 'I am a secretary. I write the time on everything.' },
        { id: 'watch', q: 'Crane’s watch was set to 1:15 by hand. At 1:15 you were at cards.', requires: ['c_watch', 't_cards'], a: '(A long silence.) I think I should like to speak to the consul at Calais.' },
      ],
    },
    {
      id: 'colonel', color: '#5a4a2a', name: 'Colonel Arthur Pryce', role: 'Retired officer', room: 'dining',
      bio: 'Sixty, clipped moustache, Indian Army. Travelling home on leave.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'Dining car most of the evening. Couldn’t sleep in that sardine tin. Played bridge with Brandt from one till half past two, then turned in.' },
        { id: 'dinner', q: 'Did you notice anything at dinner?', a: 'Crane and his secretary had words. Crane said — I heard it plainly — “You’ll be in handcuffs at Calais, Samuel.” Brandt went white as a sheet.', gives: 't_argument' },
        { id: 'cards', q: 'Tell me about the card game.', a: 'Brandt turned up at one o’clock sharp. Odd fellow — asked me the time twice, then wrote it at the top of the score sheet. We played till half past two.', gives: 't_cards' },
        { id: 'crane', q: 'Did you know Mr. Crane?', a: 'Only by reputation. A shark. Lost a few shillings in his bank myself, but nothing to kill a man over.' },
        { id: 'kimono', q: 'Did you see anyone in the corridor?', a: 'No. I was in here. Though I heard Brandt tell Marchetti this morning that he’d seen a woman in a red kimono in the night. News to me.' },
      ],
    },
    {
      id: 'countess', color: '#7a2a3a', name: 'Countess Irina Voss', role: 'Viennese aristocrat', room: 'countess',
      bio: 'Fifties, magnificent, tired. Widow of Count Viktor Voss.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'Asleep. I asked the attendant for a draught at eleven and I slept like the dead until he started shouting this morning.', gives: 't_draught' },
        { id: 'dagger', q: 'There was a bloodstained dagger in your sponge bag.', requires: ['c_dagger'], a: 'In my — ? That bag hangs outside my door every night on this train. Anybody could have put it there. Do you imagine I would keep the knife?' },
        { id: 'grudge', q: 'Crane’s bank ruined your husband.', requires: ['c_victims'], a: 'It did. Viktor shot himself in the spring of 1930. I would have spat on Silas Crane, Detective. I would not have soiled my hands with him.', gives: 't_kimono' },
        { id: 'kimono', q: 'Someone says they saw a woman in a scarlet kimono last night.', requires: ['c_kimono'], a: 'Then someone was either dreaming or lying. I did not leave this compartment. Ask the attendant how much chloral he gave me.' },
      ],
    },
    {
      id: 'dale', color: '#4a5a4a', name: 'Miss Helen Dale', role: 'A governess', room: 'dale',
      bio: 'Late twenties, grey eyes, calm on the surface. Travelling to a new post in England.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'Here. In bed. I heard nothing.' },
        { id: 'crane', q: 'Did you know Mr. Crane?', a: 'No. I saw him at dinner. That’s all.' },
        { id: 'father', q: 'Your father’s name is on Crane’s list of ruined creditors.', requires: ['c_victims'], a: '(Her composure cracks.) … Yes. He lost everything when the bank failed, and he never recovered. I didn’t say so because I knew how it would look.' },
        { id: 'wall', q: 'That wall is thin. You must have heard something.', requires: ['c_wall', 'c_victims'], a: 'I did. I lay awake. At about twenty-five to one I heard a short cry from his compartment, and a thud. Then a click — the connecting door on the far side, I think. Then water running, next door but one. Then nothing.', gives: 't_cry' },
        { id: 'kimono', q: 'Did you see a woman in a red kimono?', a: 'No. I didn’t open my door all night.' },
      ],
    },
    {
      id: 'marchetti', color: '#2a3a4a', name: 'Luigi Marchetti', role: 'Sleeping-car attendant', room: 'vestibule',
      bio: 'Forty, ten years with the company. He found the body and is very shaken.',
      topics: [
        { id: 'night', q: 'Tell me about last night.', a: 'At eleven I brought the Countess a sleeping draught. At half past eleven the train stopped — the drift. At midnight exactly the snow stopped falling. At seven I could not wake Mr. Crane, and I forced the door. It was chained from inside.', gives: 't_snowstop' },
        { id: 'bump', q: 'Your log says you heard a bump from no. 7 at 12:35.', requires: ['c_log'], a: 'Yes, a bump. I thought the carriage was settling in the snow. It does that. Dio mio, if I had only knocked.' },
        { id: 'key', q: 'You have a master key.', a: 'It hangs on the board with a wax seal over it. The seal is unbroken — look for yourself. And the door was chained besides.' },
        { id: 'cufflinks', q: 'Did Mr. Brandt have both his cufflinks last night?', requires: ['c_cufflink'], a: 'Both, signore. I laid out his evening clothes at half past nine, cufflinks and all. He wore them to dinner. I saw them on his cuffs when he paid the wine.', gives: 't_cufflinks' },
        { id: 'oil', q: 'Someone oiled the bolt in no. 8.', requires: ['c_bolt'], a: 'Oil? Mr. Brandt borrowed my oil can yesterday afternoon. “A squeaky hinge,” he said.', gives: 't_oil' },
        { id: 'kimono', q: 'Did you see a woman in a red kimono in the night?', a: 'No, signore. Mr. Brandt said this morning that he saw one. I did not.' },
      ],
    },
  ],

  accusation: {
    methods: [
      { id: 'window', label: 'Climbed in through the window from the snow' },
      { id: 'masterkey', label: 'Let in with the attendant’s master key' },
      { id: 'conndoor', label: 'Came through the connecting door from no. 8' },
      { id: 'kimono', label: 'A woman in a scarlet kimono slipped in from the corridor' },
    ],
    motives: [
      { id: 'embezzle', label: 'To stop Crane handing the killer to the police for theft' },
      { id: 'revenge', label: 'Revenge for a family ruined by Crane’s bank' },
      { id: 'robbery', label: 'To rob him' },
      { id: 'grudge', label: 'An old grudge from the war' },
    ],
  },

  solution: { culprit: 'brandt', method: 'conndoor', motive: 'embezzle' },

  keyClues: ['c_watch', 'c_body', 't_cry', 'c_log', 'c_conndoor', 'c_trunk', 'c_bolt', 't_oil', 'c_cufflink', 't_cufflinks', 'c_letter', 't_argument', 't_cards', 'c_score'],

  explanation: [
    'Samuel Brandt had been robbing his employer for years. At dinner Crane told him he would be in handcuffs at Calais, and Brandt knew he meant it: the letter to Scotland Yard was already drafted.',
    'Brandt had prepared. He borrowed the attendant’s oil can to silence the bolt, and at about 12:35 he pushed his trunk aside and went through the connecting door. Crane was in bed. One blow. Miss Dale heard the cry, the door, and Brandt washing his hands. His cufflink came off in the struggle and rolled under the berth.',
    'Then he built himself an alibi. He pushed the window down to suggest an escape through the snow, not knowing the snow had stopped at midnight and would show no tracks. He set Crane’s watch to 1:15, pulled out the crown and smashed the glass. At one o’clock sharp he was in the dining car, asking the Colonel the time and writing it on the score sheet.',
    'The dagger in the Countess’s sponge bag and the “woman in a red kimono” were his inventions, to point you at the passenger with the best-known grudge.',
  ],
};
