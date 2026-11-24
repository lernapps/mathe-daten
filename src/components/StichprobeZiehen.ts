// The logic of StichprobeZiehen.vue: a simulation. All pupils of a school are known (the data file), and the learner draws
// a sample in different ways and compares its shares with the shares of all. Pure functions, tested in
// StichprobeZiehen.test.ts. The drawing is deterministic for a seed, so the same click gives the same sample.

/** How a sample is chosen: at random from all, only the first `classSize` (one class), or all the pupils of one answer. */
export type Choice = { kind: "random"; n: number } | { kind: "class" } | { kind: "stand" };

/** A small seeded random generator (mulberry32). */
export function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The answers of the sample: for `random`, n pupils drawn without putting back; for `class`, the first `classSize` pupils
 * (the class that was asked); for `stand`, 30 of the pupils whose answer is `standAnswer` (those at the bicycle stand). */
export function draw(
  all: readonly string[],
  choice: Choice,
  seed: number,
  classSize: number,
  standAnswer: string,
): string[] {
  if (choice.kind === "class") return all.slice(0, classSize);
  const next = random(seed);
  const pool = choice.kind === "stand" ? all.filter((answer) => answer === standAnswer) : [...all];
  const n = choice.kind === "stand" ? Math.min(30, pool.length) : Math.min(choice.n, pool.length);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [pool[i], pool[j]] = [pool[j] ?? "", pool[i] ?? ""];
  }
  return pool.slice(0, n);
}

/** How many of `answers` equal each category, in the order of the categories. */
export const counts = (answers: readonly string[], categories: readonly string[]) =>
  categories.map((category) => answers.filter((answer) => answer === category).length);

/** The share of `count` in `total` as a whole percentage. */
export const percent = (count: number, total: number) => (total === 0 ? 0 : Math.round((count / total) * 100));

/** A text with {n} filled in. */
export const fill = (text: string, n: number) => text.replace(/\{n\}/g, String(n));
