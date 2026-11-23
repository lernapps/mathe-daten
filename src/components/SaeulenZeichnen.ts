// The logic of SaeulenZeichnen.vue: four categories with a count each (a table the task states); the learner sets a
// bar for each category to its count with plus and minus buttons. Pure functions, which the build tests over fixed
// seeds (the exercise contract). A task is the four counts, all different, so that swapped bars are a mistake of their
// own. An answer is the four bar heights in the order of the categories.

/** The props the logic needs: the task with {k0} to {k3}, the categories and the app's messages for mistakes. */
export interface Props {
  /** The task with {k0} … {k3}: each becomes "Name: count". */
  task: string;
  /** The four categories, in the order of the bars. */
  categories: readonly string[];
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes?: readonly string[];
  /** The message for exactly one bar that does not fit, with {name}. */
  oneOff?: string;
  /** The message for several bars that do not fit. */
  several?: string;
}

export interface Task {
  /** The counts of the four categories. */
  counts: number[];
}

/** The four bar heights. */
export type Answer = number[];

/** The tallest bar the component draws: the counts of a task are at most 9, so that "one too high" still fits. */
export const MAX = 10;

/** A small seeded random generator (mulberry32). */
function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The task of `seed`: four different counts from 2 to 9. */
export function generate(seed: number, _props?: Props): Task {
  const next = random(seed);
  const pool = [2, 3, 4, 5, 6, 7, 8, 9];
  const counts: number[] = [];
  while (counts.length < 4) {
    const index = Math.floor(next() * pool.length);
    counts.push(pool.splice(index, 1)[0] ?? 2);
  }
  return { counts };
}

/** Whether every bar has the height of its count. */
export function check(task: Task, answer: Answer): boolean {
  return answer.length === task.counts.length && answer.every((height, i) => height === task.counts[i]);
}

/** The right answer. */
export function solution(task: Task): Answer {
  return [...task.counts];
}

/** A wrong answer: the first two bars swapped. */
export function wrong(task: Task): Answer {
  const [a = 0, b = 0, ...rest] = task.counts;
  return [b, a, ...rest];
}

/** The answer of each typical mistake of about.mistakes: the first two bars swapped, every bar one too high. */
export function mistakes(task: Task): (Answer | undefined)[] {
  return [wrong(task), task.counts.map((n) => n + 1)];
}

/** The categories with their counts: "Bus: 5". */
export const entry = (props: Props, task: Task, i: number) => `${props.categories[i] ?? ""}: ${task.counts[i] ?? 0}`;

/** The task text of the props with {k0} … {k3} filled in. */
export const fill = (props: Props, task: Task) =>
  props.task.replace(/\{k([0-3])\}/g, (_, i: string) => entry(props, task, Number(i)));

/** The app's message for a wrong answer: that of a typical mistake, or that of one bar that does not fit, or none. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = mistakes(task).findIndex((mistaken) => mistaken !== undefined && sameBars(mistaken, answer));
  if (index >= 0) return props.mistakes?.[index];
  const differing = task.counts.map((n, i) => (answer[i] === n ? -1 : i)).filter((i) => i >= 0);
  if (differing.length === 1 && props.oneOff !== undefined) {
    return props.oneOff.replace(/\{name\}/g, props.categories[differing[0] ?? 0] ?? "");
  }
  if (differing.length > 1 && props.several !== undefined) return props.several;
  return undefined;
}

const sameBars = (a: Answer, b: Answer) => a.length === b.length && a.every((n, i) => n === b[i]);

/** The task as a learner sees it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return { task: fill(props, task), solution: `Die Säulen haben die Höhen ${show(solution(task), task, props)}.` };
}

/** The task as a learner reads it, with {k0} to {k3}: the prop task. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the four entries "Name: count". */
export function params(task: Task, props: Props, _lang: string): Record<string, string> {
  return Object.fromEntries(task.counts.map((_, i) => [`k${i}`, entry(props, task, i)]));
}

/** An answer as text: "Bus 5, Rad 3, …". */
export function show(answer: Answer, _task?: Task, props?: Props, _lang?: string): string {
  return answer.map((n, i) => `${props?.categories[i] ?? i + 1} ${n}`).join(", ");
}

/** What the exercise is, for a tutor. */
export const about = {
  task: "Die Aufgabe nennt eine Tabelle mit vier Kategorien und ihren Anzahlen. Das Kind setzt unter der Tabelle für jede Kategorie eine Säule auf die richtige Höhe, mit den Knöpfen Plus und Minus, und drückt „Prüfen“.",
  answer: "Die vier Säulenhöhen in der Reihenfolge der Kategorien.",
  correct: "Richtig, wenn jede Säule so hoch ist wie die Anzahl ihrer Kategorie.",
  mistakes: [
    "Die ersten beiden Säulen vertauscht: jede hat die Höhe der anderen Kategorie.",
    "Jede Säule um 1 zu hoch.",
  ],
};
