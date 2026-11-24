// Dad Joke Showdown — make.fun one-liner entry (Node 22, standard library only).
//
// Writes one original dad joke to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt when the variable is unset), with no trailing newline.
// The joke is written to be told out loud: a clean pun on a dog named Stay,
// with the punchline arriving at the end.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  'I named my dog Stay, so now when I call him he just stands there — technically obedient and completely useless.';

// The gate only accepts UTF-8 text of 1 to 200 characters, not only white space,
// so refuse to write an entry that would fail it instead of shipping silently.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200 || JOKE.trim().length === 0 || JOKE.includes('\n')) {
  process.stderr.write(`dad joke showdown: entry is ${chars} characters, must be 1-200, one line\n`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), JOKE, 'utf8');
