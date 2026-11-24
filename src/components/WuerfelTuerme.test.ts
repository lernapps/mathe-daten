import { expect, test } from "vite-plus/test";
import { fill, isLevel, level, move, total } from "./WuerfelTuerme.ts";

test("moving a cube keeps the total and stays inside the towers", () => {
  const start = [3, 9, 6, 12, 5];
  expect(move(start, 3, -1)).toEqual([3, 9, 7, 11, 5]);
  expect(move(start, 1, 1)).toEqual([3, 8, 7, 12, 5]);
  expect(total(move(start, 3, -1))).toBe(total(start));
  expect(move(start, 0, -1)).toEqual(start);
  expect(move(start, 4, 1)).toEqual(start);
  expect(move([0, 4], 0, 1)).toEqual([0, 4]);
});

test("the towers are level at the mean, 35 cubes on 5 towers are 7 each", () => {
  expect(isLevel([3, 9, 6, 12, 5])).toBe(false);
  expect(isLevel([7, 7, 7, 7, 7])).toBe(true);
  expect(isLevel([])).toBe(false);
  expect(level([3, 9, 6, 12, 5])).toBe(7);
  expect(level([3, 4])).toBeUndefined();
});

test("fill puts the name and the numbers into a text", () => {
  expect(fill("{name}: {n} Würfel", { name: "Mira", n: 3 })).toBe("Mira: 3 Würfel");
  expect(fill("Alle {k} Türme sind {h} hoch.", { k: 5, h: 7 })).toBe("Alle 5 Türme sind 7 hoch.");
});
