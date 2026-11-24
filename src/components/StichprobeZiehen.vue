<script setup lang="ts">
// A simulation: all pupils of a school are known, and the learner draws a sample in one of three ways (at random, one class,
// those at the bicycle stand) and compares its shares with the shares of all. Its logic is in StichprobeZiehen.ts. It is no
// exercise: nothing is checked or stored. A sample is drawn only after a click, so the page is the same on every load.
import { computed, ref, watch } from "vue";
import { counts, draw, fill, percent, type Choice } from "./StichprobeZiehen.ts";

const props = defineProps<{
  /** The answer of every pupil of the school; the first classSize are the class. */
  pupils: { mittel: string }[];
  /** The answers, in the order of the table rows; the second is the one of the pupils at the bicycle stand. */
  categories: string[];
  /** How many pupils the class has. */
  classSize: number;
  /** The title of the group of ways to choose. */
  group: string;
  /** The label of choosing n pupils at random from all, with {n}. */
  optRandom: string;
  /** The label of asking only the class, with {n}. */
  optClass: string;
  /** The label of asking only the pupils at the bicycle stand. */
  optStand: string;
  /** The label of the button that draws a sample. */
  drawLabel: string;
  /** The caption of the table, and its column titles; colAll and colSample have {n}. */
  caption: string;
  colAnswer: string;
  colAll: string;
  colSample: string;
  /** What the learner sees before the first sample. */
  none: string;
  /** What to notice after a sample drawn at random, and after one that always has the same pupils. */
  notice: string;
  noticeSame: string;
}>();

const options: { id: string; choice: Choice }[] = [
  { id: "r5", choice: { kind: "random", n: 5 } },
  { id: "r30", choice: { kind: "random", n: 30 } },
  { id: "r100", choice: { kind: "random", n: 100 } },
  { id: "class", choice: { kind: "class" } },
  { id: "stand", choice: { kind: "stand" } },
];
const selected = ref("r30");
const times = ref(0);
const sample = ref<string[] | undefined>(undefined);
watch(selected, () => {
  sample.value = undefined;
});

const all = computed(() => props.pupils.map((p) => p.mittel));
const allCounts = computed(() => counts(all.value, props.categories));
const sampleCounts = computed(() => (sample.value ? counts(sample.value, props.categories) : undefined));

function label(id: string): string {
  if (id === "class") return fill(props.optClass, props.classSize);
  if (id === "stand") return props.optStand;
  return fill(props.optRandom, id === "r5" ? 5 : id === "r30" ? 30 : 100);
}

function take(): void {
  const option = options.find((o) => o.id === selected.value);
  if (!option) return;
  times.value += 1;
  sample.value = draw(
    all.value,
    option.choice,
    times.value * 7919 + options.indexOf(option),
    props.classSize,
    props.categories[1] ?? "",
  );
}

const cell = (count: number, total: number) => `${percent(count, total)} % (${count}/${total})`;
</script>

<template>
  <div class="stichprobe-ziehen">
    <fieldset class="stichprobe-ziehen-group">
      <legend>{{ group }}</legend>
      <label v-for="o in options" :key="o.id" class="stichprobe-ziehen-option">
        <input v-model="selected" type="radio" name="stichprobe-wahl" :value="o.id" />
        {{ label(o.id) }}
      </label>
    </fieldset>
    <button type="button" class="stichprobe-ziehen-draw" @click="take">{{ drawLabel }}</button>
    <table class="stichprobe-ziehen-table">
      <caption>
        {{
          caption
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">{{ colAnswer }}</th>
          <th scope="col">{{ fill(colAll, all.length) }}</th>
          <th scope="col">{{ sample ? fill(colSample, sample.length) : "–" }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, i) in categories" :key="category">
          <th scope="row">{{ category }}</th>
          <td>{{ cell(allCounts[i] ?? 0, all.length) }}</td>
          <td>{{ sampleCounts && sample ? cell(sampleCounts[i] ?? 0, sample.length) : "–" }}</td>
        </tr>
      </tbody>
    </table>
    <p class="stichprobe-ziehen-status" aria-live="polite">
      {{ sample ? (selected === "class" || selected === "stand" ? noticeSame : notice) : none }}
    </p>
  </div>
</template>

<style scoped>
.stichprobe-ziehen-group {
  margin: 0 0 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
}

.stichprobe-ziehen-option {
  display: block;
  min-height: 44px;
  line-height: 1.3;
  padding: 0.6rem 0;
}

.stichprobe-ziehen-draw {
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.4rem;
  background: var(--page-accent);
  color: var(--page-on-accent);
  font-size: 1rem;
}

.stichprobe-ziehen-table {
  margin: 0.75rem 0 0;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.stichprobe-ziehen-table caption {
  text-align: left;
  font-weight: 600;
  padding-bottom: 0.25rem;
}

.stichprobe-ziehen-table th,
.stichprobe-ziehen-table td {
  border: 1px solid var(--page-border);
  padding: 0.3rem 0.4rem;
  text-align: left;
}

.stichprobe-ziehen-status {
  margin: 0.5rem 0 0;
  min-height: 3rem;
}

/* buttons in the look of the runtime: the accent colour, the radius and the focus ring of its questions */
.stichprobe-ziehen-draw {
  font: inherit;
  min-width: 44px;
  min-height: 44px;
  padding: 0.5rem 1rem;
  border: 2px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-background);
  color: var(--page-accent);
  cursor: pointer;
}

.stichprobe-ziehen-draw:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.stichprobe-ziehen-draw:disabled {
  border-color: var(--page-border);
  color: var(--page-muted);
  cursor: not-allowed;
  opacity: 0.6;
}

.stichprobe-ziehen-draw {
  background: var(--page-accent);
  color: var(--page-on-accent);
}
</style>
