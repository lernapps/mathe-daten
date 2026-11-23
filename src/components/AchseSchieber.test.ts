import { expect, test } from "vite-plus/test";
import { barHeight, fill, lookRatio, ticks } from "./AchseSchieber.ts";

test("with the axis at 0 the heights are in the ratio of the values", () => {
  expect(barHeight(6, 0, 10, 100)).toBe(60);
  expect(barHeight(8, 0, 10, 100)).toBe(80);
  expect(lookRatio([6, 8], 0, 10)).toBeCloseTo(8 / 6);
});

test("with the axis at 5 the same values look much more different", () => {
  expect(barHeight(6, 5, 9, 100)).toBe(25);
  expect(barHeight(8, 5, 9, 100)).toBe(75);
  expect(lookRatio([6, 8], 5, 9)).toBeCloseTo(3);
  expect(barHeight(3, 5, 9, 100)).toBe(0);
  expect(barHeight(12, 5, 9, 100)).toBe(100);
  expect(barHeight(6, 5, 5, 100)).toBe(0);
});

test("ticks and texts", () => {
  expect(ticks(5, 9, 1)).toEqual([5, 6, 7, 8, 9]);
  expect(ticks(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
  expect(fill("Achse ab {min}", 5)).toBe("Achse ab 5");
});
