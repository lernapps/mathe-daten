// The logic of AchseSchieber.vue: a column chart whose vertical axis starts at 0 or at a higher value. Pure functions,
// tested in AchseSchieber.test.ts. The same values look very different: that is how a chart can mislead.

/** The height of a bar in a plot `plot` units high, for a vertical axis from `min` to `max`. */
export function barHeight(value: number, min: number, max: number, plot: number): number {
  if (max <= min) return 0;
  const clamped = Math.min(Math.max(value, min), max);
  return ((clamped - min) / (max - min)) * plot;
}

/** The marks on the vertical axis: every `step` from `min` to `max`. */
export function ticks(min: number, max: number, step: number): number[] {
  const marks: number[] = [];
  for (let value = min; value <= max; value += step) marks.push(value);
  return marks;
}

/** How many times as high the tallest bar looks as the shortest: the impression the chart gives. */
export function lookRatio(values: readonly number[], min: number, max: number): number {
  const heights = values.map((value) => barHeight(value, min, max, 1));
  const shortest = Math.min(...heights);
  return shortest === 0 ? Infinity : Math.max(...heights) / shortest;
}

/** A text with {min} filled in. */
export const fill = (text: string, min: number) => text.replace(/\{min\}/g, String(min));
