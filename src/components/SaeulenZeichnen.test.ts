import { expect, test } from "vite-plus/test";
import { check, describe, generate, mistakes, params, reason, show, solution, wrong } from "./SaeulenZeichnen.ts";

const props = {
  task: "Die Klasse hat gezählt: {k0}, {k1}, {k2}, {k3}.",
  categories: ["Zu Fuß", "Fahrrad", "Bus", "Auto"],
  mistakes: ["Zwei Säulen sind vertauscht.", "Jede Säule ist um 1 zu hoch."],
  oneOff: "Bei {name} passt die Säule nicht.",
  several: "Erst {n} von 4 Säulen passen.",
};

test("the right bars are right; swapped and one too high are wrong", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(new Set(task.counts).size).toBe(4);
    expect(task.counts.every((n) => n >= 2 && n <= 9)).toBe(true);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
    expect(check(task, [0, 0, 0, 0])).toBe(false);
  }
});

test("the same seed gives the same task", () => {
  expect(generate(7, props)).toEqual(generate(7, props));
});

test("describe fills in the task; typical mistakes get their message, a single wrong bar its own", () => {
  const task = { counts: [5, 3, 8, 2] };
  expect(describe(task, props, "de")).toEqual({
    task: "Die Klasse hat gezählt: Zu Fuß: 5, Fahrrad: 3, Bus: 8, Auto: 2.",
    solution: "Die Säulen haben die Höhen Zu Fuß 5, Fahrrad 3, Bus 8, Auto 2.",
  });
  expect(reason(task, [3, 5, 8, 2], props)).toBe("Zwei Säulen sind vertauscht.");
  expect(reason(task, [6, 4, 9, 3], props)).toBe("Jede Säule ist um 1 zu hoch.");
  expect(reason(task, [5, 3, 7, 2], props)).toBe("Bei Bus passt die Säule nicht.");
  expect(reason(task, [0, 0, 0, 0], props)).toBe("Erst 0 von 4 Säulen passen.");
  expect(reason(task, [5, 3, 0, 0], props)).toBe("Erst 2 von 4 Säulen passen.");
  expect(reason(task, [0, 0, 0, 0], { task: props.task, categories: props.categories })).toBeUndefined();
  expect(params(task, props, "de")).toEqual({ k0: "Zu Fuß: 5", k1: "Fahrrad: 3", k2: "Bus: 8", k3: "Auto: 2" });
  expect(show([5, 3, 8, 2], task, props)).toBe("Zu Fuß 5, Fahrrad 3, Bus 8, Auto 2");
});
