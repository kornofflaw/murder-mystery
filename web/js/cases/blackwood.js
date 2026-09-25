// case.js — the content of one mystery. The game engine (main.js) knows
// nothing about this story; a new case is a new file with the same shape.
//
// Shape:
//   clues[id]    { title, text, kind: 'evidence'|'testimony', time? 'HH:MM' }
//   rooms[]      { id, name, desc, items[] { id, name, text, clue? } }
//   suspects[]   { id, name, role, room, bio, topics[] }
//   topic        { id, q, a, requires?: [clueIds], gives?: clueId }
//   accusation   { methods[], motives[] }, solution { culprit, method, motive }
//   scenes       { roomId: () => SVG string } — the room illustrations (scenes.js)

import { SCENES } from './blackwood-scenes.js';

export const CASE = {
  scenes: SCENES,
  id: 'blackwood-1926',
  title: 'Death at Blackwood Manor',
  tagline: 'A storm, a locked-in household, and a man dead at his desk.',
  setting: 'A country house on Dartmoor, October 1926',
  cover: 'linear-gradient(135deg, #23392c, #5a1a1a)',
  coverIcon: '🕯',
  detective: 'Inspector',
  placesLabel: 'The house',
  gather: 'You gather the household in the drawing room',
  deadline: 'before dawn',

  intro: [
    'The storm has flooded the lane and brought down the telephone line. You were only sheltering at Blackwood Manor for the night — a stranded inspector from Scotland Yard, grateful for a fire and a bed.',
    'At five past eleven the butler’s cry rang through the house. Lord Edmund Blackwood, sixty-four, lies dead at his desk in the study.',
    'The family doctor, a dinner guest, murmurs about a weak heart. You are not so sure. Nobody can leave, and nobody can arrive, until the water goes down at dawn.',
    'Search the rooms. Question the household. When you are certain, name the killer, how it was done, and why.',
  ],

  // Facts the player starts with.
  startClues: ['c_found'],

  clues: {
    c_found:        { kind: 'evidence',  time: '23:05', title: 'The body is found', text: 'Thomas the butler found Lord Blackwood dead at his desk at 11:05 pm when he went to collect the brandy glass.' },
    c_body:         { kind: 'evidence',  title: 'No wounds', text: 'No wounds or marks of violence. He was violently sick before he died, and his pupils are strangely wide.' },
    c_note:         { kind: 'evidence',  title: 'Scrawl on the blotter', text: 'In a shaking hand on the blotter: “everything yellow — sick — T”. The pen lies on the floor.' },
    c_glass:        { kind: 'evidence',  title: 'The brandy glass', text: 'His brandy glass is almost empty. At the bottom is a film of green, gritty sediment that smells bitter.' },
    c_will:         { kind: 'evidence',  title: 'Draft of a new will', text: 'A draft will, unsigned, for the solicitor Mr. Harwood to witness tomorrow at nine. Victor Blackwood is cut out entirely. £2,000 goes to Miss Clara Finch; the rest to Lady Margaret.' },
    c_letter:       { kind: 'evidence',  title: 'Letter from a bookmaker', text: 'From J. Sallow, Turf Accountant, to Lord Blackwood: his nephew Victor owes £4,000 in gambling debts, due Friday. “My associates are less patient than I am.”' },
    c_window:       { kind: 'evidence',  title: 'Study window latched', text: 'The study window is latched from the inside, and the sill is dry. Nobody came in from outside that way.' },
    c_hallwater:    { kind: 'evidence',  title: 'Wet footprints in the hall', text: 'Damp, muddy prints of a man’s boots run from the boot-room door straight to the study door.' },
    c_billiard:     { kind: 'evidence',  title: 'A cold billiard room', text: 'The billiard-room hearth holds only yesterday’s cold ash. The balls were still racked when you arrived, and only one lamp has been lit — recently.' },
    c_decanter:     { kind: 'evidence',  title: 'The brandy decanter', text: 'The decanter is back in the pantry, a third gone. There is no sediment in it.' },
    c_ledger:       { kind: 'evidence',  title: 'Altered cellar ledger', text: 'In the butler’s cellar book, bottle counts have been scratched out and rewritten. Somebody has been selling his lordship’s wine.' },
    c_boots:        { kind: 'evidence',  title: 'Muddy riding boots', text: 'A pair of riding boots, soaking wet, caked in dark potting soil. A torn foxglove leaf is stuck in the tread. Inked inside the cuff: “V.B.”' },
    c_foxglove:     { kind: 'evidence',  title: 'Stripped foxglove', text: 'In the greenhouse, several foxglove stems have been stripped of their leaves tonight. The cut ends are still wet with sap.' },
    c_mortar:       { kind: 'evidence',  title: 'Mortar and muslin', text: 'A potting-bench mortar holds green pulp. Beside it, a square of muslin stained green, as if something was squeezed through it.' },
    c_vial:         { kind: 'evidence',  title: 'The doctor’s digitalis', text: 'Dr. Hale’s bag holds a vial of digitalis, the heart medicine made from foxglove. Its wax seal is unbroken and it is full.' },
    c_loveletter:   { kind: 'evidence',  title: 'A love letter', text: 'Hidden in Lady Margaret’s writing case: “My darling M. — we must be patient a little longer. Yours always, J.H.”' },
    c_bottle:       { kind: 'evidence',  title: 'Bottle in Victor’s coat', text: 'In the pocket of Victor’s wet overcoat: a small medicine bottle, rinsed out, but it still smells bitter and there are green specks in the neck.' },

    t_willannounce: { kind: 'testimony', time: '21:30', title: 'The will was announced at dinner', text: 'Lady Margaret: at dinner Edmund told the whole table that Harwood was coming at nine to change his will, and that Victor would get nothing.' },
    t_argument:     { kind: 'testimony', time: '21:45', title: 'An argument in the study', text: 'Clara heard Lord Blackwood and Victor argue in the study: “Not one more penny. Harwood comes at nine and you’re out.”' },
    t_brandy:       { kind: 'testimony', time: '22:00', title: 'The brandy is served', text: 'Thomas poured Lord Blackwood a brandy in the study from the decanter, then took the decanter back to the pantry.' },
    t_clara:        { kind: 'testimony', time: '22:15', title: 'Clara brings letters', text: 'Clara took letters to the study for signing. Lord Blackwood was irritable but well. She left at 10:20.' },
    t_piano:        { kind: 'testimony', time: '22:30', title: 'Coffee in the drawing room', text: 'Thomas brought coffee to the drawing room: Lady Margaret at the piano, Dr. Hale turning pages. He heard the piano from the hall all evening.' },
    t_sawvictor:    { kind: 'testimony', time: '22:35', title: 'Victor leaves the study', text: 'Clara saw Victor come out of the study, hair wet with rain. He said, “Not a word, Clara, there’s a good girl.”' },
    t_lamps:        { kind: 'testimony', time: '22:40', title: 'Billiard room empty', text: 'Thomas went through the billiard room on his round. It was dark, cold and empty.' },
    t_victoralibi:  { kind: 'testimony', title: 'Victor’s alibi', text: 'Victor says he was alone in the billiard room from ten until the alarm, and saw nobody.' },
    t_digitalis:    { kind: 'testimony', title: 'Yellow vision means digitalis', text: 'Dr. Hale: seeing everything yellow is a classic sign of digitalis poisoning, which comes from the foxglove plant.' },
    t_crude:        { kind: 'testimony', title: 'A crude home-made poison', text: 'Dr. Hale: the green sediment is crushed plant matter, strained badly. Not a pharmacist’s preparation.' },
    t_decanterok:   { kind: 'testimony', title: 'The decanter is safe', text: 'Thomas drank a large brandy from the same decanter after the body was found, and is perfectly well.' },
    t_bootsclean:   { kind: 'testimony', time: '18:00', title: 'Boots cleaned this afternoon', text: 'Thomas cleaned Victor’s riding boots this afternoon. They were spotless at six o’clock.' },
    t_affair:       { kind: 'testimony', title: 'Margaret and the doctor', text: 'Lady Margaret admits she and Dr. Hale are in love. She says Edmund did not know.' },
  },

  rooms: [
    {
      id: 'study', name: 'The Study',
      desc: 'Rain hammers the tall window. The fire has burned low. Lord Blackwood lies slumped across his desk, one arm outflung, the lamp still lit beside him.',
      items: [
        { id: 'body', name: 'Lord Blackwood', clue: 'c_body', text: 'You kneel beside him. His skin is cold and clammy. There are no wounds, no bruises. He was sick on the carpet before he died, and his pupils are strangely wide.' },
        { id: 'blotter', name: 'The blotter', clue: 'c_note', text: 'Words are scrawled across the blotter in a failing hand: “everything yellow — sick — T”. The pen has rolled onto the floor. Was he trying to write a name?' },
        { id: 'glass', name: 'Brandy glass', clue: 'c_glass', text: 'A crystal brandy glass, nearly empty. When you tilt it to the lamp, a film of green, gritty sediment clings to the bottom. It smells bitter, like crushed leaves.' },
        { id: 'desk', name: 'Desk drawer', clue: 'c_will', text: 'Under the blotter, a draft will ready for the solicitor, Mr. Harwood, to witness at nine tomorrow. Victor Blackwood is cut out entirely. £2,000 goes to Miss Clara Finch, and everything else to Lady Margaret.' },
        { id: 'tray', name: 'Letter tray', clue: 'c_letter', text: 'A letter on cheap paper from “J. Sallow, Turf Accountant”: your nephew Victor owes me £4,000, due Friday. “My associates are less patient than I am.” Lord Blackwood has underlined the sum twice.' },
        { id: 'window', name: 'The window', clue: 'c_window', text: 'The window is latched from the inside and the sill is bone dry. Nobody came in from the garden this way.' },
        { id: 'fire', name: 'Fireplace', text: 'Just coals and ash. Nothing has been burned here tonight but logs.' },
      ],
    },
    {
      id: 'hall', name: 'The Great Hall',
      desc: 'A stone-flagged hall hung with antlers and dark portraits. Doors lead off in every direction. The grandfather clock ticks loudly in the silence.',
      items: [
        { id: 'floor', name: 'The flagstones', clue: 'c_hallwater', text: 'Damp, muddy boot prints, a man’s size, run from the boot-room door straight down the hall and stop at the study door. The maid has not mopped yet.' },
        { id: 'phone', name: 'Telephone', text: 'You lift the receiver. Silence. The storm has taken the line down.' },
        { id: 'clock', name: 'Grandfather clock', text: 'It keeps good time. You check it against your own watch: correct to the minute.' },
      ],
    },
    {
      id: 'drawing', name: 'The Drawing Room',
      desc: 'Warm and lamplit. A grand piano stands open by the window. Lady Margaret sits very straight on a settee; Dr. Hale stands by the fire.',
      items: [
        { id: 'piano', name: 'The piano', text: 'A Chopin nocturne is open on the stand, the pages soft and well turned. The lid is still warm from the lamp.' },
        { id: 'coffee', name: 'Coffee tray', text: 'Two cups, both drunk, and a pot gone cold. Served some while ago.' },
      ],
    },
    {
      id: 'library', name: 'The Library',
      desc: 'Shelves to the ceiling and a long reading table covered with typed correspondence. The door stands ajar onto the hall. Clara Finch sits at the table, twisting a handkerchief.',
      items: [
        { id: 'papers', name: 'Typed letters', text: 'Estate business, neatly typed, many awaiting signature. A secretary’s evening’s work.' },
        { id: 'ink', name: 'Ink bottle', text: 'Empty. A new bottle sits beside it, freshly opened.' },
        { id: 'door', name: 'The library door', text: 'From the doorway you can see straight down the hall to the study door.' },
      ],
    },
    {
      id: 'billiard', name: 'The Billiard Room',
      desc: 'Green baize under a single lamp. The rest of the room is in shadow. Victor Blackwood leans on a cue, a whisky in his other hand.',
      items: [
        { id: 'hearth', name: 'The hearth', clue: 'c_billiard', text: 'Cold ash from yesterday. No fire has been lit here tonight. Of the four lamps, only one has been lit, and its glass is barely warm.' },
        { id: 'table', name: 'Billiard table', text: 'A single ball has been knocked about. The rest sit neatly in the rack.' },
      ],
    },
    {
      id: 'pantry', name: 'Butler’s Pantry',
      desc: 'Silver, glassware and a smell of polish. Thomas Reed, the butler, stands by the sink with a glass of brandy he is trying not to be seen holding.',
      items: [
        { id: 'decanter', name: 'Brandy decanter', clue: 'c_decanter', text: 'The study decanter, back in its place. About a third has gone. You hold it to the light: the brandy is perfectly clear, no sediment at all.' },
        { id: 'ledger', name: 'Cellar book', clue: 'c_ledger', text: 'The cellar book. Bottle counts have been scratched out and rewritten, again and again, going back years. Somebody has been quietly selling his lordship’s wine.' },
      ],
    },
    {
      id: 'bootroom', name: 'The Boot Room',
      desc: 'A narrow stone room by the garden door, full of coats, sticks and umbrellas. The garden door is unbolted. Rain blows in under it.',
      items: [
        { id: 'boots', name: 'Riding boots', clue: 'c_boots', text: 'A pair of riding boots, soaking wet and caked in dark potting soil — not garden mud. A torn leaf is stuck in the tread: long, soft, with toothed edges. Foxglove. Inked inside the cuff: “V.B.”' },
        { id: 'gdoor', name: 'Garden door', text: 'Unbolted. A path of wet flagstones leads through the rain to the lit shape of the greenhouse.' },
      ],
    },
    {
      id: 'greenhouse', name: 'The Greenhouse',
      desc: 'Glass walls streaming with rain. Lord Blackwood’s orchids fill the benches, and at the far end tall spikes of purple foxglove.',
      items: [
        { id: 'foxglove', name: 'Foxglove plants', clue: 'c_foxglove', text: 'Several foxglove stems have been stripped of their leaves. The cut ends are still wet with sap — this was done tonight.' },
        { id: 'bench', name: 'Potting bench', clue: 'c_mortar', text: 'A stone mortar holds a mash of green pulp. Beside it lies a square of muslin, stained green and twisted, as if something had been squeezed through it.' },
        { id: 'orchids', name: 'Orchids', text: 'Labelled in Lord Blackwood’s own hand. His great hobby.' },
      ],
    },
    {
      id: 'guest', name: 'Guest Room',
      desc: 'The room Dr. Hale was given for the night. A coat over the chair, a black medical bag on the washstand.',
      items: [
        { id: 'bag', name: 'Medical bag', clue: 'c_vial', text: 'Stethoscope, bandages, and a small vial labelled DIGITALIS — the heart medicine made from foxglove. The wax seal is unbroken and the vial is full.' },
      ],
    },
    {
      id: 'margaret', name: 'Lady Margaret’s Room',
      desc: 'Pale blue and very tidy. A dressing table, a writing case, a vase of late roses.',
      items: [
        { id: 'case', name: 'Writing case', clue: 'c_loveletter', text: 'Tucked in the lining: a letter. “My darling M. — we must be patient a little longer. Yours always, J.H.”' },
        { id: 'cabinet', name: 'Medicine cabinet', text: 'Sleeping powders and smelling salts. Nothing else.' },
      ],
    },
    {
      id: 'victor', name: 'Victor’s Room',
      desc: 'Untidy. Racing papers on the floor, a half-packed suitcase, and a wet overcoat thrown over a chair.',
      items: [
        { id: 'coat', name: 'Wet overcoat', clue: 'c_bottle', text: 'Soaked through at the shoulders. In the pocket is a small medicine bottle, rinsed out. It still smells bitter, and there are green specks caught in the neck.' },
        { id: 'papers', name: 'Racing papers', text: 'Form guides, heavily marked. A losing streak, by the look of the crossings-out.' },
        { id: 'suitcase', name: 'Suitcase', text: 'Half packed, in a hurry. A man planning to leave early.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'margaret', color: '#4a5a7a', name: 'Lady Margaret Blackwood', role: 'The widow', room: 'drawing',
      bio: 'Fifty-eight, composed, and dry-eyed. Thirty years married to Edmund.',
      topics: [
        { id: 'alibi', q: 'Where were you between ten and eleven?', a: 'At the piano, here. Julian — Dr. Hale — turned the pages for me. Thomas brought coffee at half past ten. Ask him.' },
        { id: 'victim', q: 'Tell me about your husband.', a: 'Edmund was a hard man, Inspector, and a proud one. His heart was failing and he knew it. He was tired of being taken advantage of.' },
        { id: 'victor', q: 'What about his nephew, Victor?', a: 'Charming when he wants something, and he always wants something. At dinner Edmund told the whole table that Mr. Harwood was coming at nine tomorrow to change his will — and that Victor would get nothing. He liked an audience.', gives: 't_willannounce' },
        { id: 'foxglove', q: 'Who knows about the foxglove in the greenhouse?', requires: ['c_foxglove'], a: 'Everyone. Edmund used to joke at dinner that he grew enough poison to kill the whole county. Victor thought it hilarious.' },
        { id: 'letter', q: 'I found a letter from Dr. Hale in your writing case.', requires: ['c_loveletter'], a: '… Yes. Julian and I have been close for some time. Edmund did not know. But I would not kill a man to be free of him, Inspector. I would simply have waited.', gives: 't_affair' },
      ],
    },
    {
      id: 'hale', color: '#4f5a4a', name: 'Dr. Julian Hale', role: 'The family doctor', room: 'drawing',
      bio: 'Fifties, grey at the temples, careful with his words. Stranded here after dinner like you.',
      topics: [
        { id: 'alibi', q: 'Where were you between ten and eleven?', a: 'Here, with Lady Blackwood, from ten until Thomas raised the alarm. She played; I turned pages.' },
        { id: 'cause', q: 'What killed him?', a: 'My first thought was his heart — it was weak. But the sickness, the wide pupils… I would want a proper post-mortem before I signed anything.' },
        { id: 'yellow', q: 'He wrote “everything yellow” on his blotter.', requires: ['c_note'], a: 'Yellow vision? Good God. That is a classic sign of digitalis poisoning. Digitalis comes from foxglove.', gives: 't_digitalis' },
        { id: 'sediment', q: 'There is green sediment in his brandy glass.', requires: ['c_glass'], a: 'Let me see… crushed plant matter, strained badly through something. That is not a pharmacist’s preparation. Someone made it by hand, and not long ago.', gives: 't_crude' },
        { id: 'vial', q: 'You carry digitalis in your bag.', requires: ['c_vial'], a: 'Of course I do; I have heart patients. Look at it — the seal is unbroken and the vial is full. Nobody has touched it.' },
        { id: 'letter', q: 'Your letter to Lady Blackwood.', requires: ['c_loveletter'], a: 'I love her. That is not a crime. And yes, I was with her all evening — which I realise is exactly what a guilty man would say. Ask the butler.' },
      ],
    },
    {
      id: 'clara', color: '#7a5a4a', name: 'Miss Clara Finch', role: 'The secretary', room: 'library',
      bio: 'Twenty-six, neat and nervous. Lord Blackwood’s secretary for four years.',
      topics: [
        { id: 'alibi', q: 'Where were you between ten and eleven?', a: 'At a quarter past ten I took his lordship some letters to sign. He was irritable, but perfectly well. I left at twenty past and worked here until the alarm.', gives: 't_clara' },
        { id: 'victim', q: 'What was he like to work for?', a: 'Demanding. Fair. He noticed everything — except, I think, how much people minded him.' },
        { id: 'heard', q: 'Did you hear anything unusual tonight?', a: 'After dinner, about a quarter to ten, his lordship and Mr. Victor argued in the study. I heard him shout, “Not one more penny. Harwood comes at nine and you’re out.” Then the door slammed.', gives: 't_argument' },
        { id: 'hall', q: 'Did you see anyone in the hall this evening?', a: 'No. No one. I was working.' },
        { id: 'will', q: 'The new will leaves you £2,000.', requires: ['c_will'], a: '(She goes white.) I didn’t know. Truly. He never said a word. That is very like him, and very unlike him, both at once.' },
        { id: 'boots', q: 'Someone came in from the rain in Victor’s boots and walked to the study. You could see that door from here.', requires: ['c_boots'], a: '(A long silence.) … Yes. At about twenty-five to eleven I went into the hall for more ink. Victor was coming out of the study. His hair was wet. He said, “Not a word, Clara, there’s a good girl.” I thought he’d been begging for money again. He has been kind to me. I didn’t want to get him into trouble.', gives: 't_sawvictor' },
      ],
    },
    {
      id: 'thomas', color: '#5a5048', name: 'Thomas Reed', role: 'The butler', room: 'pantry',
      bio: 'Sixty, thirty years in service at Blackwood. Hands not quite steady tonight.',
      topics: [
        { id: 'brandy', q: 'Tell me about the brandy.', a: 'At ten o’clock, as every night, I took the decanter and one glass to the study and poured his lordship a measure. Then I brought the decanter back here.', gives: 't_brandy' },
        { id: 'alibi', q: 'Where were you between ten and eleven?', a: 'At half past ten I took coffee to the drawing room — her ladyship at the piano, the doctor beside her. I heard that piano the whole evening from the hall. Then my round, and at five past eleven I went to fetch his lordship’s glass and… found him.', gives: 't_piano' },
        { id: 'victor', q: 'Victor says he was in the billiard room all evening.', requires: ['t_victoralibi'], a: 'Then Mr. Victor is mistaken, sir. I went through the billiard room at twenty to eleven on my round. It was dark and cold, and nobody was in it.', gives: 't_lamps' },
        { id: 'decanter', q: 'Could the decanter have been poisoned?', requires: ['c_decanter'], a: 'No, sir. After we found him I — I confess I poured myself a large one from that very decanter. For the nerves. As you see, I am quite well.', gives: 't_decanterok' },
        { id: 'boots', q: 'Whose riding boots are these in the boot room?', requires: ['c_boots'], a: 'Mr. Victor’s, sir. I cleaned them myself this afternoon. They were spotless at six o’clock.', gives: 't_bootsclean' },
        { id: 'ledger', q: 'Your cellar book has been altered.', requires: ['c_ledger'], a: '(He stiffens.) A few bottles, sir, over the years. Sold on. It is shameful, and I would have lost my place over it. But I would not have lost my neck.' },
      ],
    },
    {
      id: 'victor', color: '#7a3a3a', name: 'Victor Blackwood', role: 'The nephew', room: 'billiard',
      bio: 'Thirty-one, handsome, easy-mannered, and very relaxed for a man whose uncle has just died.',
      topics: [
        { id: 'alibi', q: 'Where were you between ten and eleven?', a: 'Right here, old man. Knocking the balls about on my own. Didn’t see a soul.', gives: 't_victoralibi' },
        { id: 'victim', q: 'Tell me about your uncle.', a: 'Stuffy old goat, but he was family. Dreadful business. His heart, I suppose?' },
        { id: 'argument', q: 'You argued with him in the study at a quarter to ten.', requires: ['t_argument'], a: 'Families argue. He was in one of his moods about money. It blew over.' },
        { id: 'debts', q: 'This letter from Mr. Sallow, the bookmaker.', requires: ['c_letter'], a: '(The smile slips.) Sallow is a vulture. Four thousand is nothing. I’d have paid it. Eventually.' },
        { id: 'will', q: 'He was cutting you out of his will tomorrow.', requires: ['c_will'], a: 'Was he? First I’ve heard of it. (He studies his cue.) Really. First I’ve heard.' },
        { id: 'lamps', q: 'Thomas says this room was dark and empty at twenty to eleven.', requires: ['t_lamps'], a: 'Thomas is old and half blind. I… stepped out for some air. Is that a crime?' },
        { id: 'boots', q: 'Your boots are soaked, full of potting soil, with a foxglove leaf in the tread.', requires: ['c_boots'], a: 'Anyone could have worn those boots. They were sitting in the boot room for anybody.' },
        { id: 'bottle', q: 'This bottle was in your coat pocket.', requires: ['c_bottle'], a: 'Cough mixture. I rinsed it out. Is there a law against being tidy?' },
        { id: 'seen', q: 'Clara saw you leave the study at twenty-five to eleven with wet hair.', requires: ['t_sawvictor'], a: 'Clara is a silly girl who reads too many novels. (He sets down the cue.) I think I’d like to wait for a solicitor now.' },
      ],
    },
  ],

  accusation: {
    methods: [
      { id: 'heart', label: 'Natural causes — his heart gave out' },
      { id: 'vial', label: 'Digitalis stolen from Dr. Hale’s bag' },
      { id: 'decanter', label: 'Poison put in the brandy decanter' },
      { id: 'foxglove', label: 'Foxglove from the greenhouse, put in his glass' },
    ],
    motives: [
      { id: 'money', label: 'About to be cut out of the will, with gambling debts due' },
      { id: 'love', label: 'To be free to marry a lover' },
      { id: 'bequest', label: 'To collect a bequest in the new will' },
      { id: 'theft', label: 'To hide stealing from the wine cellar' },
    ],
  },

  solution: { culprit: 'victor', method: 'foxglove', motive: 'money' },

  // Evidence that makes the case. Shown on the verdict screen.
  keyClues: ['c_note', 'c_glass', 't_digitalis', 'c_foxglove', 'c_mortar', 'c_boots', 't_bootsclean', 'c_bottle', 't_argument', 'c_will', 'c_letter', 't_lamps', 't_sawvictor'],

  explanation: [
    'Victor Blackwood owed a bookmaker £4,000 by Friday. At dinner his uncle announced that the solicitor was coming at nine to cut him out of the will. At a quarter to ten Victor tried once more for money and was thrown out of the study.',
    'Around ten he slipped out through the boot room in his riding boots — cleaned spotless that afternoon — to the greenhouse, stripped foxglove leaves, crushed them in the mortar and squeezed the juice through muslin into a small bottle.',
    'He came back in, leaving wet prints down the hall to the study, and at about half past ten went in, apparently to apologise. While his uncle’s back was turned he tipped the foxglove juice into the brandy glass. The decanter was never touched, and the doctor’s vial was still sealed.',
    'Clara saw him leave at 10:35. Thomas found the billiard room dark at 10:40. Digitalis made Lord Blackwood see everything yellow and wrecked his heart. He died before eleven, trying to write it down.',
  ],
};
