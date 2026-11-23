// The logic of Perlenkette.vue: values as beads on a chain. The learner puts them in order, marks the middle and splits the
// halves. Pure functions, tested in Perlenkette.test.ts. The method is the app's, the same everywhere: for an odd number of
// values the median belongs to neither half.

/** The five numbers of a data set and the places of the beads they stand on. */
export interface Five {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  /** The range: the largest minus the smallest value. */
  range: number;
  /** The bead indices (in the ordered chain) the median, Q1 and Q3 are taken from: one bead, or two whose mean it is. */
  at: { median: number[]; q1: number[]; q3: number[] };
}

/** The values in ascending order. */
export const sorted = (values: readonly number[]) => [...values].sort((a, b) => a - b);

/** The median of an ordered list and the bead indices it comes from, counted from `offset`. */
function middle(list: readonly number[], offset: number): { value: number; at: number[] } {
  const n = list.length;
  const h = Math.floor(n / 2);
  if (n % 2 === 1) return { value: list[h] ?? 0, at: [offset + h] };
  return { value: ((list[h - 1] ?? 0) + (list[h] ?? 0)) / 2, at: [offset + h - 1, offset + h] };
}

/** The five numbers of `values`; undefined for fewer than 4 values (the halves would be empty). */
export function five(values: readonly number[]): Five | undefined {
  if (values.length < 4) return undefined;
  const s = sorted(values);
  const n = s.length;
  const half = Math.floor(n / 2);
  const median = middle(s, 0);
  const lower = middle(s.slice(0, half), 0);
  const upperStart = n % 2 === 1 ? half + 1 : half;
  const upper = middle(s.slice(upperStart), upperStart);
  return {
    min: s[0] ?? 0,
    q1: lower.value,
    median: median.value,
    q3: upper.value,
    max: s[n - 1] ?? 0,
    range: (s[n - 1] ?? 0) - (s[0] ?? 0),
    at: { median: median.at, q1: lower.at, q3: upper.at },
  };
}

/** A number as a German decimal: 12.5 becomes "12,5". */
export const german = (value: number) => String(value).replace(".", ",");

/** A text with {min}, {q1}, {m}, {q3}, {max} and {range} filled in. */
export function fill(text: string, f: Five): string {
  return text
    .replace(/\{min\}/g, german(f.min))
    .replace(/\{q1\}/g, german(f.q1))
    .replace(/\{m\}/g, german(f.median))
    .replace(/\{q3\}/g, german(f.q3))
    .replace(/\{max\}/g, german(f.max))
    .replace(/\{range\}/g, german(f.range));
}
