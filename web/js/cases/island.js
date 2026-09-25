// island.js — "The Guests of Gull Rock". Inspired by Agatha Christie's
// And Then There Were None; the story, people and solution are original.

import { SCENES } from './island-scenes.js';

export const CASE = {
  id: 'gull-rock-1938',
  scenes: SCENES,
  title: 'The Guests of Gull Rock',
  inspiredBy: 'And Then There Were None',
  setting: 'An island hotel off the Devon coast, August 1938',
  tagline: 'An absent host, a gramophone that accuses, and a storm that cuts the island off.',
  cover: 'linear-gradient(135deg, #1a2a36, #6a5a3a)',
  coverIcon: '🌊',
  detective: 'Detective',
  placesLabel: 'Gull Rock',
  gather: 'You gather the guests in the drawing room, under the gramophone',
  deadline: 'before the boat comes on Monday',

  intro: [
    'Five strangers received letters inviting them to a summer weekend at the hotel on Gull Rock, a mile off the Devon coast, as guests of a Mr. A. N. Other. Nobody has ever met him. He has not arrived.',
    'After dinner, on the host’s written instructions, the housekeeper put a record on the gramophone. A cold voice accused each guest, one by one, of a crime they had got away with. In the silence that followed, the publisher Gerald Fane drank his whisky, choked, and died on the hearthrug.',
    'You are a detective, invited under your own name like the others, and accused of nothing. The storm has blown up. The boatman has gone to the mainland and will not come back until Monday.',
    'Somebody on this island wrote those invitations. Somebody on this island poisoned that glass.',
  ],

  startClues: ['c_found'],

  clues: {
    c_found:      { kind: 'evidence',  time: '21:12', title: 'Gerald Fane dies', text: 'Gerald Fane collapsed in the drawing room moments after drinking his whisky, and died within a minute or two.' },
    c_body:       { kind: 'evidence',  title: 'Bitter almonds', text: 'Fane’s lips are blue. There is a smell of bitter almonds on his breath. Cyanide.' },
    c_glass:      { kind: 'evidence',  title: 'Fane’s glass', text: 'Fane’s tumbler, on the mantelpiece where he set it down. A few undissolved white grains at the bottom smell of almonds.' },
    c_decanter:   { kind: 'evidence',  title: 'The whisky decanter', text: 'The decanter on the drinks trolley. The whisky smells only of whisky. Several guests drank from it.' },
    c_record:     { kind: 'evidence',  title: 'The gramophone record', text: 'A private recording. The label: “Harmony Recording Rooms, Wardour Street, London.” On it, a man’s voice accuses each guest in turn. Fane’s accusation: “Gerald Fane, you stole the work of a dead young man and called it your own.”' },
    c_card:       { kind: 'evidence',  title: 'The host’s typed card', text: 'Propped by the gramophone: “Mrs. Pryor — please play the record at ten past nine. — A. N. Other.” It is typed, and every letter “e” drops a little below the line.' },
    c_book:       { kind: 'evidence',  title: 'The Glass Tower', text: 'In the library, a bestselling novel, The Glass Tower, “by Gerald Fane”, published by Fane & Co. in 1935. It made his name and his fortune.' },
    c_guestbook:  { kind: 'evidence',  title: 'The guest list', text: 'The hotel register, in Mrs. Pryor’s hand: Dr. Edwin Ashby, Major Desmond Reeve, Mr. Philip Lomax, Mr. Gerald Fane, Miss Ruth Carey. And you.' },
    c_typewriter: { kind: 'evidence',  title: 'A portable typewriter', text: 'In Miss Carey’s room, a portable typewriter. You type a line: every “e” drops a little below the line, exactly as on the host’s card.' },
    c_photo:      { kind: 'evidence',  title: 'A photograph', text: 'In Miss Carey’s suitcase, a photograph of a young man at a desk, laughing. On the back: “To Ruthie — The Glass Tower is finished at last! Your loving brother, Tom.”' },
    c_cutting:    { kind: 'evidence',  title: 'A newspaper cutting', text: 'Folded behind a little picture frame on the bedside table: “Young writer Thomas Calder drowned at Brighton, 1934. His sister Ruth said he had been in low spirits since a publisher rejected his first novel.”' },
    c_tin:        { kind: 'evidence',  title: 'Wasp poison', text: 'In the garden shed, a tin labelled “Potassium Cyanide — for wasps’ nests — POISON”. The seal has been broken and there are fresh spoon marks in the crystals.' },
    c_footprint:  { kind: 'evidence',  title: 'A footprint in the sawdust', text: 'Spilled sawdust on the shed floor holds a clear print: the small, narrow sole and sharp heel of a woman’s shoe.' },
    c_pryorboots: { kind: 'evidence',  title: 'Mrs. Pryor’s boots', text: 'By the kitchen range, Mrs. Pryor’s broad, flat-heeled working boots. The only shoes she has on the island.' },
    c_letter:     { kind: 'evidence',  title: 'Instructions from the host', text: 'A typed letter to Mrs. Pryor from A. N. Other: the guests, the menus, the record at 9.10. The “e”s drop below the line. It was posted in London.' },
    c_jettynote:  { kind: 'evidence',  title: 'Note on the jetty', text: 'Nailed to the jetty post: “No boat until Monday. — A. N. Other.” Typed. The “e”s drop below the line.' },

    t_record:     { kind: 'testimony', time: '21:10', title: 'The record plays', text: 'Mrs. Pryor put the record on at ten past nine, as the typed card instructed. The voice began, and everyone turned to the gramophone.' },
    t_positions:  { kind: 'testimony', time: '21:10', title: 'By the mantelpiece', text: 'Major Reeve: when the voice began, everyone stared at the gramophone. Fane had put his glass on the mantelpiece. Miss Carey was standing right beside it.' },
    t_drink:      { kind: 'testimony', time: '21:12', title: 'Fane drinks', text: 'When the record ended, Fane picked up his glass from the mantelpiece, said “Utter rot,” and drank it straight down.' },
    t_fast:       { kind: 'testimony', title: 'Cyanide acts fast', text: 'Dr. Ashby: cyanide kills within a minute or two. It went into the glass after Fane put it down, not before.' },
    t_decanterok: { kind: 'testimony', title: 'The decanter was safe', text: 'Lomax poured everyone’s whisky from the same decanter, including his own and the Major’s. They are both alive.' },
    t_wasps:      { kind: 'testimony', time: '16:00', title: 'A question about wasps', text: 'Mrs. Pryor: the wasp tin was sealed when she checked the shed yesterday. At tea today, Miss Carey asked her whether there were wasps on the island, and what she used on them.' },
    t_ruth:       { kind: 'testimony', title: 'Miss Carey’s story', text: 'Ruth Carey says she was at the window, looking at the storm, when the record played, nowhere near Fane.' },
    t_accusation: { kind: 'testimony', title: 'Ruth’s own accusation', text: 'The record accused Ruth Carey of letting a child drown in her care. She says it is a wicked lie.' },
    t_fanebook:   { kind: 'testimony', title: 'How The Glass Tower was written', text: 'Major Reeve: Fane always boasted he wrote The Glass Tower in six weeks, “the only book I ever wrote”. He never wrote another.' },
    t_ashbybag:   { kind: 'testimony', title: 'The doctor’s bag', text: 'Dr. Ashby carries morphia and digitalis, but no cyanide. He invites you to search his bag.' },
  },

  rooms: [
    {
      id: 'drawing', name: 'The Drawing Room',
      desc: 'A white room with great windows onto the sea. The gramophone stands in the corner, its lid still open. Gerald Fane lies on the hearthrug. Dr. Ashby sits nearby, grey in the face.',
      items: [
        { id: 'body', name: 'Gerald Fane', clue: 'c_body', text: 'His lips are blue and his face flushed pink. Bending close, you catch the smell of bitter almonds. Cyanide, and a lot of it.' },
        { id: 'glass', name: 'Glass on the mantelpiece', clue: 'c_glass', text: 'Fane’s tumbler, where he set it down on the mantelpiece and later picked it up again to drink. A few undissolved white grains lie at the bottom. Almonds again.' },
        { id: 'trolley', name: 'Drinks trolley', clue: 'c_decanter', text: 'The whisky decanter smells of nothing but good whisky. Several glasses were poured from it tonight.' },
        { id: 'gramophone', name: 'Gramophone', clue: 'c_record', text: 'The record is a private recording: “Harmony Recording Rooms, Wardour Street, London.” You play the first few seconds. A cold man’s voice: “Gerald Fane, you stole the work of a dead young man and called it your own…”' },
        { id: 'card', name: 'Typed card', clue: 'c_card', text: '“Mrs. Pryor — please play the record at ten past nine. — A. N. Other.” Typed. Every letter “e” drops a little below the line, as if the key is bent.' },
      ],
    },
    {
      id: 'dining', name: 'The Dining Room',
      desc: 'The long table has not been cleared. Five china gulls stand in a row on the sideboard. Miss Ruth Carey sits alone at the end of the table.',
      items: [
        { id: 'register', name: 'Hotel register', clue: 'c_guestbook', text: 'The register, in Mrs. Pryor’s hand: Dr. Edwin Ashby. Major Desmond Reeve. Mr. Philip Lomax. Mr. Gerald Fane. Miss Ruth Carey. And your own name.' },
        { id: 'gulls', name: 'China gulls', text: 'Five little china gulls in a row. There were six this morning, Mrs. Pryor says. One lies broken on the floor.' },
        { id: 'table', name: 'Dinner table', text: 'Lobster, lamb, a summer pudding. Fane ate well. Whatever killed him was not in his dinner.' },
      ],
    },
    {
      id: 'library', name: 'The Library',
      desc: 'A small library of new novels and old sea charts. Major Desmond Reeve stands at the window with his hands behind his back.',
      items: [
        { id: 'book', name: 'The Glass Tower', clue: 'c_book', text: 'A handsome copy of The Glass Tower, “by Gerald Fane”, Fane & Co., 1935. The bestseller of its year. Fane’s only novel.' },
        { id: 'charts', name: 'Sea charts', text: 'Gull Rock, a mile of rough water from the mainland. In a storm like this, no small boat could cross.' },
      ],
    },
    {
      id: 'kitchen', name: 'The Kitchen',
      desc: 'Copper pans and a scrubbed table. Mrs. Olive Pryor, the housekeeper, is making tea because she cannot think what else to do.',
      items: [
        { id: 'letter', name: 'Letter on the dresser', clue: 'c_letter', text: 'Typed instructions from A. N. Other: who is coming, what to serve, and “at 9.10 exactly, play the record on the gramophone”. Every “e” drops below the line. Postmarked London.' },
        { id: 'boots', name: 'Boots by the range', clue: 'c_pryorboots', text: 'Mrs. Pryor’s working boots: broad, flat-heeled, much mended. She tells you they are the only shoes she has on the island.' },
      ],
    },
    {
      id: 'shed', name: 'The Garden Shed',
      desc: 'A lean-to shed behind the hotel, full of tools and flowerpots. Rain drums on the tin roof.',
      items: [
        { id: 'tin', name: 'Tin on the shelf', clue: 'c_tin', text: 'A tin labelled “Potassium Cyanide — for wasps’ nests — POISON”. The seal has been broken, and there are fresh spoon marks in the white crystals.' },
        { id: 'floor', name: 'Sawdust on the floor', clue: 'c_footprint', text: 'Spilled sawdust by the shelf holds a clear print: a small, narrow sole with a sharp heel. A woman’s shoe.' },
        { id: 'tools', name: 'Garden tools', text: 'Spades, shears, a rusty scythe. Nothing disturbed.' },
      ],
    },
    {
      id: 'ruth', name: 'Miss Carey’s Room',
      desc: 'A small sea-facing bedroom, very neat. A suitcase on the rack, a typewriter case on the desk.',
      items: [
        { id: 'typewriter', name: 'Typewriter', clue: 'c_typewriter', text: 'A portable typewriter. You wind in a sheet and type “the the the”. Every “e” drops a little below the line. Exactly like the host’s card.' },
        { id: 'photo', name: 'Open suitcase', clue: 'c_photo', text: 'Under her folded clothes, a photograph: a young man at a desk covered in paper, laughing. On the back: “To Ruthie — The Glass Tower is finished at last! Your loving brother, Tom.”' },
        { id: 'frame', name: 'Picture frame', clue: 'c_cutting', text: 'A little framed watercolour of Brighton pier on the bedside table. Folded small behind it: a newspaper cutting. “Young writer Thomas Calder drowned at Brighton, 1934. His sister Ruth said he had been in low spirits since a publisher rejected his first novel.”' },
        { id: 'shoes', name: 'Shoes', text: 'A pair of neat navy court shoes with narrow heels. There is sawdust caught in the welt of the right one.' },
      ],
    },
    {
      id: 'jetty', name: 'The Jetty',
      desc: 'Wet planks and a storm lantern, and beyond them a mile of white water. Philip Lomax stands in an oilskin, smoking and watching the mainland lights.',
      items: [
        { id: 'post', name: 'Jetty post', clue: 'c_jettynote', text: 'A typed note nailed to the post: “No boat until Monday. — A. N. Other.” The “e”s drop below the line.' },
        { id: 'sea', name: 'The sea', text: 'Grey and white and furious. Nobody is leaving Gull Rock tonight, and nobody is coming.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'ruth', color: '#4a3a5a', name: 'Miss Ruth Carey', role: 'A typist', room: 'dining',
      bio: 'Late twenties, quiet, watchful. Says she works in a London typing pool.',
      topics: [
        { id: 'alibi', q: 'Where were you when the record played?', a: 'At the window, looking at the storm. I was nowhere near Mr. Fane.', gives: 't_ruth' },
        { id: 'accused', q: 'The record accused you too.', a: 'Of letting a child drown. It’s a wicked lie. Whoever this Mr. Other is, he’s mad.', gives: 't_accusation' },
        { id: 'fane', q: 'Did you know Gerald Fane?', a: 'Only by name. Everybody knew his name.' },
        { id: 'typewriter', q: 'Your typewriter drops its “e”s, just like the host’s card.', requires: ['c_typewriter', 'c_card'], a: 'Half the portables in London do that. The key bends.' },
        { id: 'photo', q: 'Who is Tom?', requires: ['c_photo'], a: '(She takes the photograph from you, very gently.) My brother. He’s dead.' },
        { id: 'brother', q: 'Your brother wrote The Glass Tower, and Fane stole it.', requires: ['c_photo', 'c_cutting', 'c_book'], a: '(For a long time she says nothing.) Tom sent it to Fane & Co. They sent it back with a printed slip. A year later Tom was dead, and a year after that there it was in every shop window, with Fane’s name on it. (She looks up.) I did say it was a wicked lie, the thing about the child. I made that up. The rest of it was true.' },
        { id: 'mantel', q: 'The Major says you were right beside Fane’s glass.', requires: ['t_positions'], a: 'The Major is mistaken.' },
      ],
    },
    {
      id: 'ashby', color: '#3a4a4a', name: 'Dr. Edwin Ashby', role: 'A Harley Street doctor', room: 'drawing',
      bio: 'Fifties, tall, unsteady hands. The record accused him of operating drunk.',
      topics: [
        { id: 'death', q: 'What killed him?', requires: ['c_body'], a: 'Cyanide. The almonds, the colour of him. And it acts fast, in a minute or two. It was put in that glass after he set it down. If it had been in there when he poured, he’d have died before the record started.', gives: 't_fast' },
        { id: 'bag', q: 'Do you carry poisons?', a: 'Morphia, digitalis, the usual. No cyanide; no doctor carries cyanide. Search the bag if you like.', gives: 't_ashbybag' },
        { id: 'record', q: 'The record accused you of operating while drunk.', a: '(He looks at his hands.) A long time ago. A woman died. I have not touched a drop since. Nor did I touch Fane’s glass.' },
        { id: 'moment', q: 'Tell me what happened when the record played.', a: 'Mrs. Pryor put it on at ten past nine. The voice started. We all turned to it; we couldn’t help it. When it stopped, Fane picked up his glass, said “Utter rot,” and drank it straight down.', gives: 't_drink' },
      ],
    },
    {
      id: 'reeve', color: '#5a4a3a', name: 'Major Desmond Reeve', role: 'A retired soldier', room: 'library',
      bio: 'Sixty, upright, observant. The record accused him of sending a man to his death in the war.',
      topics: [
        { id: 'positions', q: 'Where was everyone when the record played?', a: 'I’m a soldier; I notice where people stand. Fane had put his glass on the mantelpiece. Ashby was in the armchair, Lomax at the trolley, Mrs. Pryor by the gramophone. Miss Carey was by the mantelpiece, right next to Fane’s glass. Every eye in the room was on that gramophone. Mine too, mostly.', gives: 't_positions' },
        { id: 'fane', q: 'Did you know Fane?', a: 'Slightly. He turned down my memoirs. Most people did. He always boasted he wrote The Glass Tower in six weeks — “the only book I ever wrote.” Never wrote another word, as far as I know.', gives: 't_fanebook' },
        { id: 'record', q: 'What did the record say about you?', a: 'That I sent a man on a raid because he was in love with my wife. (A pause.) It’s true. And I’d still not have poisoned Fane for it; he had nothing to do with it.' },
        { id: 'host', q: 'Who do you think A. N. Other is?', a: 'Somebody who knows a great deal about all of us, and who is on this island now. Nobody else could have got here.' },
      ],
    },
    {
      id: 'pryor', color: '#6a5a4a', name: 'Mrs. Olive Pryor', role: 'The housekeeper', room: 'kitchen',
      bio: 'Fifties, sensible, frightened. Runs the hotel with her husband, who is on the mainland.',
      topics: [
        { id: 'record', q: 'Why did you play the record?', a: 'Mr. Other’s letter said to, and there was a typed card by the gramophone as well. At ten past nine exactly. I never heard what was on it till I played it.', gives: 't_record' },
        { id: 'host', q: 'Have you ever met Mr. Other?', a: 'Never. Everything came by post from London, with a cheque. A very good cheque.' },
        { id: 'tin', q: 'The cyanide in the shed has been opened.', requires: ['c_tin'], a: 'Opened? It was sealed when I looked in yesterday! And — oh. At tea this afternoon Miss Carey asked me whether we had wasps on the island, and what I used on them. I told her. God forgive me, I told her where it was.', gives: 't_wasps' },
        { id: 'boots', q: 'What shoes do you wear?', requires: ['c_footprint'], a: 'These old boots, sir. They’re all I have out here. I haven’t worn a heel since my wedding.' },
      ],
    },
    {
      id: 'lomax', color: '#3a3a2a', name: 'Philip Lomax', role: 'An adventurer', room: 'jetty',
      bio: 'Forties, lean, amused. Carries a revolver and says so. The record accused him of leaving men to die in Africa.',
      topics: [
        { id: 'drinks', q: 'You poured the drinks.', a: 'I did. Everyone’s whisky from the same decanter, my own included, and the Major’s. We’re both still breathing. It wasn’t the decanter.', gives: 't_decanterok' },
        { id: 'revolver', q: 'Why do you carry a revolver?', a: 'Habit. And it’s just as well, on this island. It hasn’t been fired, if that’s your question.' },
        { id: 'record', q: 'What did the record say about you?', a: 'That I left twenty men in the bush to save my own skin. (He shrugs.) There wasn’t food for twenty-one.' },
        { id: 'fane', q: 'Did you know Fane?', a: 'Never met him till tonight. Pompous. Nobody wept.' },
      ],
    },
  ],

  accusation: {
    methods: [
      { id: 'glass', label: 'Cyanide slipped into his glass while every eye was on the gramophone' },
      { id: 'decanter', label: 'Cyanide put in the whisky decanter' },
      { id: 'injection', label: 'A lethal injection from the doctor’s bag' },
      { id: 'dinner', label: 'Poison in his dinner' },
    ],
    motives: [
      { id: 'brother', label: 'Revenge for a brother whose novel he stole' },
      { id: 'blackmail', label: 'To silence a blackmailer' },
      { id: 'memoirs', label: 'Anger at a rejected book' },
      { id: 'justice', label: 'A mad host punishing the guilty' },
    ],
  },

  solution: { culprit: 'ruth', method: 'glass', motive: 'brother' },

  keyClues: ['c_body', 'c_glass', 't_fast', 't_decanterok', 't_positions', 'c_card', 'c_typewriter', 'c_tin', 't_wasps', 'c_footprint', 'c_pryorboots', 'c_book', 'c_photo', 'c_cutting'],

  explanation: [
    'There is no Mr. A. N. Other. Ruth Calder, calling herself Ruth Carey, invented him. Her brother Tom wrote The Glass Tower; Gerald Fane rejected it, and after Tom drowned himself, published it under his own name.',
    'Ruth spent a year finding out other people’s secrets, so that Fane’s would be one among many. She typed the invitations and the host’s instructions on her own portable machine, with its bent “e”, and had the record made in London. She even gave herself an accusation, a false one.',
    'At tea she asked Mrs. Pryor about wasps and learned where the cyanide was kept; the sawdust in the shed took the print of her heel. At ten past nine, when the voice began and every eye went to the gramophone, she stood beside the mantelpiece and dropped the crystals into Fane’s glass.',
    'When the record ended, Fane said “Utter rot” and drank.',
  ],
};
