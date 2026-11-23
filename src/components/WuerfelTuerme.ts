// The logic of WuerfelTuerme.vue: towers of cubes, one per value. The learner gives a cube to a neighbouring tower until all
// towers are equally high; that height is the mean. Pure functions, tested in WuerfelTuerme.test.ts.

/** The heights of the towers. */
export type Towers = readonly number[];

/** Gives one cube from tower `index` to its left or right neighbour; the towers unchanged when that is not possible. */
export function move(towers: Towers, index: number, direction: -1 | 1): number[] {
  const target = index + direction;
  const from = towers[index];
  if (from === undefined || from <= 0 || target < 0 || target >= towers.length) return [...towers];
  return towers.map((height, i) => (i === index ? height - 1 : i === target ? height + 1 : height));
}

/** Whether all towers are equally high. */
export function isLevel(towers: Towers): boolean {
  return towers.length > 0 && towers.every((height) => height === towers[0]);
}

/** The total number of cubes: moving never changes it. */
export const total = (towers: Towers) => towers.reduce((sum, height) => sum + height, 0);

/** The mean of the values: the height of equal towers, or undefined when the cubes do not divide evenly. */
export function level(towers: Towers): number | undefined {
  const mean = total(towers) / towers.length;
  return Number.isInteger(mean) ? mean : undefined;
}

/** A text with {name}, {n}, {h} and {k} filled in. */
export const fill = (text: string, values: { name?: string; n?: number; h?: number; k?: number }) =>
  text
    .replace(/\{name\}/g, values.name ?? "")
    .replace(/\{n\}/g, String(values.n ?? 0))
    .replace(/\{h\}/g, String(values.h ?? 0))
    .replace(/\{k\}/g, String(values.k ?? 0));
