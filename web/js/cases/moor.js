// moor.js — "The Hound of Greymoor". Inspired by Arthur Conan Doyle's
// The Hound of the Baskervilles; the story, people and solution are original.

import { SCENES } from './moor-scenes.js';

export const CASE = {
  id: 'greymoor-1899',
  scenes: SCENES,
  title: 'The Hound of Greymoor',
  inspiredBy: 'The Hound of the Baskervilles',
  setting: 'A lonely hall on the Devon moors, November 1899',
  tagline: 'A family curse, a moonlit moor, and a dead man’s face frozen in terror.',
  cover: 'linear-gradient(135deg, #1e2c40, #3a4a2a)',
  coverIcon: '🐾',
  detective: 'Detective',
  placesLabel: 'Greymoor',
  gather: 'You gather everyone in the library at Greymoor Hall',
  deadline: 'before the county police arrive',

  intro: [
    'For two hundred years the Greymoors have told the story of the hound: a great black beast with burning eyes that hunts the men of the family across the moor.',
    'Last night, a little before midnight, the butler found Sir Roderick Greymoor dead by the moor gate at the end of the Yew Alley. There was not a mark on him. His face was twisted in terror. And in the soft ground beside him were the footprints of an enormous hound.',
    'You are a consulting detective, telegraphed from London by the family doctor. The servants will not go out after dark. The village says the curse has come back.',
    'Curses do not leave footprints. Find out who does.',
  ],

  startClues: ['c_found'],

  clues: {
    c_found:    { kind: 'evidence',  time: '23:50', title: 'Sir Roderick is found', text: 'Pike, the butler, found Sir Roderick dead by the moor gate at ten to midnight.' },
    c_body:     { kind: 'evidence',  title: 'A face full of terror', text: 'No wound, no bruise, no blood. His face is twisted in terror, his hands grazed from falling. His walking stick lies yards back up the path.' },
    c_prints:   { kind: 'evidence',  title: 'Giant paw prints', text: 'In the mud by the gate, the prints of a huge dog, far bigger than any sheepdog. They come from the moor, circle the body and go back the same way. Beside them, the boot prints of a man.' },
    c_ash:      { kind: 'evidence',  title: 'Cigar ash at the gate', text: 'On the gatepost, two neat heaps of cigar ash. Sir Roderick stood waiting here for a long while, twenty minutes or more.' },
    c_letter:   { kind: 'evidence',  title: 'The pasted note', text: 'In Sir Roderick’s coat pocket: “Please be at the moor gate at eleven tonight. I must speak with you alone. — B.C.” The words are not written but cut from a newspaper and pasted down.' },
    c_tiptoe:   { kind: 'evidence',  title: 'Running footprints', text: 'Along the Yew Alley, Sir Roderick’s footprints change: from the gate back toward the house only the toes dig in. He was running for his life.' },
    c_legend:   { kind: 'evidence',  title: 'The Greymoor legend', text: 'An old manuscript: “…and the hound, great and black with eyes of fire, shall hunt the heirs of Greymoor to the end of their line.” The ink on the margin says “Hugo read this twice. — R.G.”' },
    c_entail:   { kind: 'evidence',  title: 'The Greymoor entail', text: 'A lawyer’s paper: the estate passes to Sir Roderick’s son, or, failing a son, to his nephew Hugo Greymoor. A new marriage and a son would cut Hugo out entirely.' },
    c_times:    { kind: 'evidence',  title: 'A cut-up newspaper', text: 'In Hugo’s wastepaper basket: yesterday’s Times, with small rectangles cut out of the leading article. A pair of nail scissors lies beside it. The missing words are “moor”, “gate”, “eleven”, “alone”…' },
    c_hugoboots:{ kind: 'evidence',  title: 'Hugo’s muddy boots', text: 'Hugo’s boots, still wet, caked in black moor peat, with coarse brindled dog hairs stuck to the laces.' },
    c_glove:    { kind: 'evidence',  title: 'A glowing glove', text: 'A leather glove in Hugo’s coat pocket. When you shade it with your hand, the fingertips give off a faint, greenish glow.' },
    c_debts:    { kind: 'evidence',  title: 'Letters from Montreal', text: 'Letters from moneylenders in Montreal, demanding $20,000 from Hugo Greymoor “upon your coming into your inheritance”.' },
    c_candle:   { kind: 'evidence',  title: 'A candle at the window', text: 'On the servants’ hall windowsill, a candle burned down to a stub, placed to be seen from the moor.' },
    c_sidedoor: { kind: 'evidence',  title: 'The side door', text: 'The side door off the servants’ passage is unbolted, and there are peaty boot marks on the mat, pointing inward.' },
    c_kennel:   { kind: 'evidence',  title: 'The mastiff’s kennel', text: 'Venn’s mastiff, Brutus, huge and brindled, sleeps in his kennel. His muzzle and chest are smeared with something that glows faintly green in the dark.' },
    c_paint:    { kind: 'evidence',  title: 'Missing luminous paint', text: 'On Venn’s shed shelf, a clean ring in the dust where a tin stood. The label on the neighbouring tin: “Luminous paint — for moth traps”.' },
    c_camp:     { kind: 'evidence',  title: 'The convict’s camp', text: 'On the tor, a hollow among the rocks with a dead fire, bread crusts and a blanket. Someone is living up here.' },
    c_clothes:  { kind: 'evidence',  title: 'Old clothes from the hall', text: 'A bundle of old clothes in the camp, one shirt with “Greymoor Hall” stitched in the collar.' },

    t_leave:    { kind: 'testimony', time: '22:55', title: 'Sir Roderick goes out', text: 'Pike saw Sir Roderick put on his coat and go out down the Yew Alley at five to eleven, lighting a cigar.' },
    t_glow:     { kind: 'testimony', time: '23:30', title: 'A glowing shape on the moor', text: 'Pike saw, from the servants’ hall window, a pale glowing shape bounding across the moor toward the gate, and a lantern moving beside it.' },
    t_convict:  { kind: 'testimony', title: 'The convict is Mrs. Pike’s brother', text: 'Pike admits the candle was a signal to his wife’s brother, an escaped convict hiding on the tor. They take him food. He was not near the gate.' },
    t_hugoback: { kind: 'testimony', time: '00:15', title: 'Hugo comes in by the side door', text: 'Pike saw Hugo come in by the side door at a quarter past twelve, soaked and muddy, though he had said goodnight at half past ten.' },
    t_hugo:     { kind: 'testimony', title: 'Hugo’s story', text: 'Hugo says he went to bed with a headache at half past ten and slept until the uproar.' },
    t_engaged:  { kind: 'testimony', title: 'An engagement', text: 'Beryl Carrow: Sir Roderick asked her to marry him on Sunday, and she accepted. They meant to announce it at Christmas.' },
    t_listening:{ kind: 'testimony', title: 'Listening at the door', text: 'Pike: on Sunday, while Sir Roderick and Mrs. Carrow were in the library, he found Mr. Hugo standing very still outside the door.' },
    t_notbc:    { kind: 'testimony', time: '23:00', title: 'Beryl’s evening', text: 'Beryl Carrow says she did not send the note, and spent the evening at the vicarage playing whist until half past eleven.' },
    t_heart:    { kind: 'testimony', title: 'A weak heart', text: 'Dr. Thorne: Sir Roderick’s heart was very weak. A great fright could kill him. Hugo asked the doctor exactly that question last week.' },
    t_fright:   { kind: 'testimony', title: 'Died of fright', text: 'Dr. Thorne: no poison and no blow. His heart failed under a sudden, terrible fright.' },
    t_dogloose: { kind: 'testimony', time: '00:10', title: 'Brutus loose', text: 'Venn came home from the inn at ten past twelve to find Brutus off his chain, wet and panting, with something glowing on his coat.' },
    t_paintask: { kind: 'testimony', title: 'Hugo asked about the paint', text: 'Venn: on Tuesday Hugo visited, admired Brutus, and asked a great many questions about the luminous paint.' },
    t_inn:      { kind: 'testimony', title: 'Chess at the inn', text: 'Dr. Thorne and Venn played chess at the Coach and Horses until Pike’s boy came running at midnight.' },
  },

  rooms: [
    {
      id: 'gate', name: 'The Moor Gate',
      desc: 'A wicket gate in a low stone wall, and beyond it nothing but moor under the moon. Sir Roderick lies face down on the path. Dr. Thorne stands over him with a lantern.',
      items: [
        { id: 'body', name: 'Sir Roderick', clue: 'c_body', text: 'Not a wound on him. His face is twisted into a terrible expression of fear. His palms are grazed where he fell. His walking stick lies yards back up the path, dropped as he ran.' },
        { id: 'prints', name: 'Paw prints', clue: 'c_prints', text: 'In the soft mud: the prints of an enormous hound. They come in from the moor, circle the body, and go back the way they came. Alongside them runs a line of a man’s boot prints.' },
        { id: 'gatepost', name: 'The gatepost', clue: 'c_ash', text: 'On the flat top of the gatepost, two neat heaps of cigar ash. He smoked two cigars here; he was waiting for someone for twenty minutes at least.' },
        { id: 'coat', name: 'His coat pocket', clue: 'c_letter', text: 'A folded note: “Please be at the moor gate at eleven tonight. I must speak with you alone. — B.C.” Each word has been cut from a newspaper and pasted down.' },
      ],
    },
    {
      id: 'alley', name: 'The Yew Alley',
      desc: 'A long walk between black walls of clipped yew, from the hall to the moor gate. The gravel is soft with rain.',
      items: [
        { id: 'path', name: 'The gravel path', clue: 'c_tiptoe', text: 'Going down toward the gate, Sir Roderick’s prints are ordinary. Coming back, only the toes dig in, far apart. He was running flat out, back toward the house.' },
        { id: 'stick', name: 'Walking stick', text: 'His silver-topped stick, dropped in the gravel. Nothing on it but rain.' },
        { id: 'summerhouse', name: 'Summerhouse', text: 'A little summerhouse halfway along. Empty, and dry inside. Nobody has sat here tonight.' },
      ],
    },
    {
      id: 'library', name: 'The Library',
      desc: 'Oak, leather, and portraits of Greymoors going back to the Civil War. Hugo Greymoor stands by the fire. Mrs. Beryl Carrow sits pale and silent by the window.',
      items: [
        { id: 'manuscript', name: 'Old manuscript', clue: 'c_legend', text: 'The Greymoor legend, written out in 1742: “…and the hound, great and black with eyes of fire, shall hunt the heirs of Greymoor to the end of their line.” In the margin, in Sir Roderick’s hand: “Hugo read this twice. — R.G.”' },
        { id: 'desk', name: 'Writing desk', clue: 'c_entail', text: 'A lawyer’s summary of the Greymoor entail. The estate passes to Sir Roderick’s son; failing a son, to his nephew Hugo. A new marriage and a son would cut Hugo out entirely.' },
        { id: 'portrait', name: 'Portrait of Sir Hugo', text: 'Wicked Sir Hugo Greymoor, 1742, who started the legend. A long face, cold eyes. The nephew is named after him, and has the same eyes.' },
      ],
    },
    {
      id: 'hugo', name: 'Hugo’s Room',
      desc: 'The best guest room, taken over by the nephew from Canada. A travelling chest, a heap of clothes, and a smell of wet wool.',
      items: [
        { id: 'basket', name: 'Wastepaper basket', clue: 'c_times', text: 'Yesterday’s Times, with small neat rectangles cut out of the leading article. Beside it, nail scissors and a pot of paste. You check the gaps: “moor”, “gate”, “eleven”, “alone”…' },
        { id: 'boots', name: 'Boots', clue: 'c_hugoboots', text: 'Soaking wet and caked in black moor peat, not garden mud. Coarse brindled dog hairs are caught in the laces.' },
        { id: 'coat', name: 'Coat pocket', clue: 'c_glove', text: 'A leather glove. You cup your hand around it and the fingertips glow a faint, ghostly green.' },
        { id: 'chest', name: 'Travelling chest', clue: 'c_debts', text: 'Letters from moneylenders in Montreal, each more threatening than the last, demanding $20,000 “upon your coming into your inheritance”.' },
      ],
    },
    {
      id: 'servants', name: 'Servants’ Hall',
      desc: 'A long stone kitchen-hall with a scrubbed table and a window that looks out over the moor. Pike, the butler, sits hunched by the range.',
      items: [
        { id: 'window', name: 'The window', clue: 'c_candle', text: 'A candle burned right down on the sill, placed exactly where it could be seen from the moor. A signal.' },
        { id: 'sidedoor', name: 'Side door', clue: 'c_sidedoor', text: 'The side door off the servants’ passage is unbolted. On the mat, peaty boot marks, pointing inward.' },
        { id: 'basket', name: 'Food basket', text: 'A basket with half a loaf, cold mutton and a bottle of tea, packed and ready to go out.' },
      ],
    },
    {
      id: 'cottage', name: 'Venn’s Cottage',
      desc: 'A naturalist’s cottage on the edge of the moor: butterfly cases on every wall, a shed, and a kennel. Jasper Venn stands in the doorway with a net in his hand.',
      items: [
        { id: 'kennel', name: 'The kennel', clue: 'c_kennel', text: 'Brutus, a huge brindled mastiff, snores in the straw. When you shade your eyes, his muzzle and chest glow a faint green. His chain has been unclipped and clipped back on.' },
        { id: 'shed', name: 'Shed shelf', clue: 'c_paint', text: 'Jars, nets, killing bottles. And a clean ring in the dust where a tin used to stand. The tin beside it is labelled “Luminous paint — for moth traps”.' },
        { id: 'cases', name: 'Butterfly cases', text: 'Hundreds of moths and butterflies pinned in rows, each labelled in a tiny hand. Venn is very proud of the Dartmoor Emerald.' },
      ],
    },
    {
      id: 'tor', name: 'Black Tor',
      desc: 'A heap of granite on the high moor, a mile from the hall. The wind never stops. From here you can see the lights of Greymoor and the gate.',
      items: [
        { id: 'camp', name: 'Hollow in the rocks', clue: 'c_camp', text: 'A hollow among the boulders: a dead fire, bread crusts, a blanket. Someone is living up here, and has been for weeks.' },
        { id: 'bundle', name: 'Bundle of clothes', clue: 'c_clothes', text: 'Old clothes, one shirt with “Greymoor Hall” stitched into the collar. Someone at the hall is feeding and clothing whoever lives here.' },
        { id: 'view', name: 'The view', text: 'From up here the moor gate is a mile off, far below. Nobody could run from here to there and back in the time.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'hugo', color: '#5a3a2a', name: 'Hugo Greymoor', role: 'The nephew and heir', room: 'library',
      bio: 'Thirty-five, broad and sunburnt, lately of Montreal. Heir to Greymoor.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'In bed. I had a filthy headache and said goodnight at half past ten. I slept until Pike started shouting.', gives: 't_hugo' },
        { id: 'uncle', q: 'Were you close to your uncle?', a: 'I met him for the first time a month ago. Decent old stick. Believed every word of that hound nonsense.' },
        { id: 'legend', q: 'Do you believe in the hound?', a: '(He laughs.) I’ve seen wolves in the Yukon, Detective. I don’t scare easily.' },
        { id: 'paper', q: 'Your Times has been cut up with scissors.', requires: ['c_times'], a: 'Scrapbook. I cut out things that interest me. Is that a hanging matter in England?' },
        { id: 'boots', q: 'Your boots are soaked in moor peat, with dog hairs on them.', requires: ['c_hugoboots'], a: 'I walked on the moor in the afternoon. Venn’s beast jumped all over me.' },
        { id: 'debts', q: 'You owe $20,000 in Montreal.', requires: ['c_debts'], a: 'A trifle. Every gentleman owes something.' },
        { id: 'engaged', q: 'Your uncle was going to marry Mrs. Carrow.', requires: ['t_engaged'], a: 'Was he? Good for him. (His jaw tightens.)' },
        { id: 'glove', q: 'Your glove glows in the dark.', requires: ['c_glove'], a: '(He says nothing for a long moment.) I think I shall wait for my lawyer.' },
      ],
    },
    {
      id: 'beryl', color: '#6a4a6a', name: 'Mrs. Beryl Carrow', role: 'A young widow', room: 'library',
      bio: 'Thirty, dark-haired, very still. Lives in the village. Came up to the hall as soon as she heard.',
      topics: [
        { id: 'roderick', q: 'How well did you know Sir Roderick?', a: 'Very well. He was kind to me when my husband died. Kinder than anyone.' },
        { id: 'engaged', q: 'Were you more than friends?', a: 'He asked me to marry him on Sunday, here, in this room. I said yes. We were going to announce it at Christmas.', gives: 't_engaged' },
        { id: 'note', q: 'A note signed “B.C.” asked him to the moor gate at eleven.', requires: ['c_letter'], a: 'I never sent any note! Why would I write to him in scraps of newspaper? I spent the evening at the vicarage playing whist with the vicar and his wife until half past eleven. Ask them.', gives: 't_notbc' },
        { id: 'hugo', q: 'What do you make of Hugo?', a: 'He’s charming to me. Too charming. And he watches Roderick as if he were measuring him for a coffin.' },
      ],
    },
    {
      id: 'thorne', color: '#3a4a3a', name: 'Dr. Amos Thorne', role: 'The family doctor', room: 'gate',
      bio: 'Sixty, stooped, kindly. Sir Roderick’s doctor and oldest friend. He sent for you.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'At the Coach and Horses, playing chess with Jasper Venn, until Pike’s boy came running in at midnight.', gives: 't_inn' },
        { id: 'cause', q: 'What killed him?', requires: ['c_body'], a: 'His heart. There’s no wound, no sign of poison; he ate what we all ate at dinner. Something frightened him so badly that his heart simply stopped.', gives: 't_fright' },
        { id: 'heart', q: 'Was his heart weak?', a: 'Very. I told him a great shock could kill him. And I’ll tell you something else: Hugo asked me that very question last week. How bad was his uncle’s heart? Could a shock kill him? I thought it was concern.', gives: 't_heart' },
        { id: 'prints', q: 'What do you make of the paw prints?', requires: ['c_prints'], a: 'A dog. A very large dog, a mastiff perhaps. Not a demon. Demons don’t sink into the mud.' },
      ],
    },
    {
      id: 'pike', color: '#4a4a4a', name: 'Pike', role: 'The butler', room: 'servants',
      bio: 'Fifties, black-bearded, thirty years at Greymoor. He found the body.',
      topics: [
        { id: 'night', q: 'Tell me about last night.', a: 'At five to eleven Sir Roderick put on his coat and went down the Yew Alley, lighting a cigar. He didn’t say where. At ten to twelve, when he hadn’t come back, I took a lantern and found him by the gate.', gives: 't_leave' },
        { id: 'window', q: 'Did you see anything from the window?', a: 'At half past eleven… a shape on the moor, sir, pale and glowing, bounding toward the gate. And a lantern moving along beside it. I thought it was the hound. God help me, I didn’t go out.', gives: 't_glow' },
        { id: 'candle', q: 'Why was a candle burning on the sill?', requires: ['c_candle'], a: '(He sags.) My wife’s brother, sir. He broke out of Princetown gaol and he’s hiding on Black Tor. We signal him and take him food. He’s a fool, not a murderer, and he was a mile away.', gives: 't_convict' },
        { id: 'sidedoor', q: 'Someone came in by the side door last night.', requires: ['c_sidedoor'], a: 'Mr. Hugo, sir. A quarter past twelve, when we were all at sixes and sevens. Soaked through and muddy to the knees. I thought he’d gone out looking for his uncle.', gives: 't_hugoback' },
        { id: 'sunday', q: 'Did Mr. Hugo know about Sir Roderick and Mrs. Carrow?', requires: ['t_engaged'], a: 'I believe he did, sir. On Sunday, while they were in the library, I came along the passage and found Mr. Hugo standing very still outside the door. Listening.', gives: 't_listening' },
      ],
    },
    {
      id: 'venn', color: '#4a5a3a', name: 'Jasper Venn', role: 'Naturalist and neighbour', room: 'cottage',
      bio: 'Forty, thin, restless, with a butterfly net always to hand. Owner of the biggest dog on the moor.',
      topics: [
        { id: 'alibi', q: 'Where were you last night?', a: 'Chess with Dr. Thorne at the Coach and Horses. I lost, as usual.' },
        { id: 'dog', q: 'Tell me about your dog.', a: 'Brutus? The softest mastiff in England. When I came home at ten past twelve he was off his chain, soaking wet and panting, and — this is the odd thing — glowing, faintly, round the jaws.', gives: 't_dogloose' },
        { id: 'paint', q: 'A tin of luminous paint is missing from your shed.', requires: ['c_paint'], a: 'Missing? I use it on my moth traps. Now I think of it — young Greymoor came by on Tuesday. Made a great fuss of Brutus, and asked me all about that paint. How long it glowed. Whether it washed off.', gives: 't_paintask' },
        { id: 'legend', q: 'Do you know the Greymoor legend?', a: 'Everyone does. Nonsense, of course. But a very useful nonsense, if you wanted to frighten a Greymoor.' },
      ],
    },
  ],

  accusation: {
    methods: [
      { id: 'curse', label: 'The spectral hound of the Greymoor legend' },
      { id: 'stick', label: 'Struck down with a walking stick' },
      { id: 'dog', label: 'Frightened to death by a real dog daubed with glowing paint' },
      { id: 'poison', label: 'Poisoned at dinner' },
    ],
    motives: [
      { id: 'inherit', label: 'To inherit before a marriage and a son could cut him out' },
      { id: 'jealousy', label: 'Jealousy: he loved the same woman' },
      { id: 'convict', label: 'To protect an escaped convict' },
      { id: 'revenge', label: 'Revenge for an old family wrong' },
    ],
  },

  solution: { culprit: 'hugo', method: 'dog', motive: 'inherit' },

  keyClues: ['c_letter', 'c_times', 't_notbc', 'c_ash', 'c_prints', 'c_kennel', 'c_paint', 't_paintask', 'c_glove', 'c_hugoboots', 't_hugoback', 't_heart', 't_fright', 'c_entail', 't_engaged', 't_listening'],

  explanation: [
    'Hugo Greymoor came from Canada with debts he could not pay and one hope: the Greymoor estate. Then, listening at the library door, he heard his uncle ask Beryl Carrow to marry him. A wife, and a son, would leave Hugo with nothing.',
    'He knew his uncle’s heart was weak, because he asked the doctor. He knew his uncle believed in the hound. On Tuesday he visited Jasper Venn, made friends with the enormous mastiff, and learned all about the luminous paint in the shed.',
    'He cut words from the Times to make a note from “B.C.”, and Sir Roderick went to the gate at eleven to meet the woman he loved. While Venn was at the inn, Hugo took Brutus, daubed him with the paint, and at half past eleven sent the glowing beast bounding out of the dark. Sir Roderick ran, and his heart gave out.',
    'Hugo took the dog home, clipped the chain back on, and slipped in by the side door at a quarter past twelve. The curse did the rest.',
  ],
};
