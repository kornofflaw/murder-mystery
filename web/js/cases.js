// cases.js — every playable case, in the order shown on the case picker.
// A case is one data file in js/cases/ plus its scenes file.

import { CASE as blackwood } from './cases/blackwood.js';
import { CASE as train } from './cases/train.js';
import { CASE as moor } from './cases/moor.js';
import { CASE as island } from './cases/island.js';

export const CASES = [blackwood, train, moor, island];
