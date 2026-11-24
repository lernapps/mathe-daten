import { expect, test } from "vite-plus/test";
import { counts, draw, fill, percent, random } from "./StichprobeZiehen.ts";

const categories = ["Zu Fuß", "Fahrrad", "Bus", "Auto"];
// the school of the data file: 600 pupils, the first 24 the class
const school = [
  ...Array(8).fill("Zu Fuß"),
  ...Array(6).fill("Fahrrad"),
  ...Array(7).fill("Bus"),
  ...Array(3).fill("Auto"),
  ...Array(112).fill("Zu Fuß"),
  ...Array(204).fill("Fahrrad"),
  ...Array(203).fill("Bus"),
  ...Array(57).fill("Auto"),
];

test("the school has 600 pupils with the shares 20, 35, 35 and 10 percent", () => {
  expect(school).toHaveLength(600);
  expect(counts(school, categories)).toEqual([120, 210, 210, 60]);
  expect(counts(school, categories).map((c) => percent(c, 600))).toEqual([20, 35, 35, 10]);
});

test("the class is the first 24 pupils: 8, 6, 7 and 3", () => {
  const sample = draw(school, { kind: "class" }, 1, 24, "Fahrrad");
  expect(sample).toHaveLength(24);
  expect(counts(sample, categories)).toEqual([8, 6, 7, 3]);
  expect(counts(sample, categories).map((c) => percent(c, 24))).toEqual([33, 25, 29, 13]);
});

test("a random sample has the size asked, is the same for a seed and differs between seeds", () => {
  const a = draw(school, { kind: "random", n: 30 }, 5, 24, "Fahrrad");
  expect(a).toHaveLength(30);
  expect(draw(school, { kind: "random", n: 30 }, 5, 24, "Fahrrad")).toEqual(a);
  expect(draw(school, { kind: "random", n: 30 }, 6, 24, "Fahrrad")).not.toEqual(a);
  expect(draw(school, { kind: "random", n: 700 }, 5, 24, "Fahrrad")).toHaveLength(600);
});

test("the sample at the bicycle stand has only riders: one-sided", () => {
  const sample = draw(school, { kind: "stand" }, 3, 24, "Fahrrad");
  expect(sample).toHaveLength(30);
  expect(counts(sample, categories)).toEqual([0, 30, 0, 0]);
});

test("small helpers", () => {
  expect(percent(0, 0)).toBe(0);
  expect(percent(1, 3)).toBe(33);
  expect(fill("{n} Lernende", 30)).toBe("30 Lernende");
  const next = random(1);
  const first = next();
  expect(first).toBeGreaterThanOrEqual(0);
  expect(first).toBeLessThan(1);
});
