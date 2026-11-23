import { expect, test } from "vite-plus/test";
import { fill, five, german, sorted } from "./Perlenkette.ts";

const klasse8b = [12, 4, 20, 7, 35, 12, 5, 18, 8, 15, 10];
const klasse8c = [14, 6, 19, 9, 12, 16, 8, 11, 17, 10, 13, 15];

test("odd number of values: the median belongs to neither half", () => {
  const f = five(klasse8b);
  expect(sorted(klasse8b)).toEqual([4, 5, 7, 8, 10, 12, 12, 15, 18, 20, 35]);
  expect(f).toMatchObject({ min: 4, q1: 7, median: 12, q3: 18, max: 35, range: 31 });
  expect(f?.at).toEqual({ median: [5], q1: [2], q3: [8] });
});

test("even number of values: the mean of the two middle values", () => {
  const f = five(klasse8c);
  expect(f).toMatchObject({ min: 6, q1: 9.5, median: 12.5, q3: 15.5, max: 19, range: 13 });
  expect(f?.at).toEqual({ median: [5, 6], q1: [2, 3], q3: [8, 9] });
});

test("small sets, other sizes and texts", () => {
  expect(five([1, 2, 3])).toBeUndefined();
  expect(five([1, 2, 3, 4])).toMatchObject({ q1: 1.5, median: 2.5, q3: 3.5 });
  expect(five([3, 1, 2, 5, 4])).toMatchObject({ q1: 1.5, median: 3, q3: 4.5 });
  expect(german(12.5)).toBe("12,5");
  const f = five(klasse8c);
  if (f)
    expect(fill("Median {m}, Q1 {q1}, Q3 {q3}, von {min} bis {max}, Spannweite {range}", f)).toBe(
      "Median 12,5, Q1 9,5, Q3 15,5, von 6 bis 19, Spannweite 13",
    );
});
