<script setup lang="ts">
// Values as beads on a chain: the learner puts them in order, marks the middle (the median) and splits the halves
// (the quartiles). Its logic is in Perlenkette.ts. It is no exercise: nothing is checked or stored. Each step is a button
// that is switched on when the step before is done.
import { computed, ref } from "vue";
import { fill, five, sorted } from "./Perlenkette.ts";

const props = defineProps<{
  /** The values, in the order they come in. */
  values: number[];
  /** The label of the three step buttons and of the reset button. */
  order: string;
  middle: string;
  halves: string;
  reset: string;
  /** The captions under the lower and the upper half of the chain. */
  lower: string;
  upper: string;
  /** What the chain shows, for screen readers. */
  alt: string;
  /** What the learner sees after each step; {min}, {q1}, {m}, {q3}, {max} and {range} are filled in. */
  statusStart: string;
  statusOrdered: string;
  statusMiddle: string;
  statusHalves: string;
}>();

const step = ref(0);
const chain = computed(() => (step.value >= 1 ? sorted(props.values) : props.values));
const result = computed(() => five(props.values));
const n = computed(() => props.values.length);
const half = computed(() => Math.floor(n.value / 2));
const gap = computed(() => 340 / n.value);
const radius = computed(() => Math.min(14, gap.value / 2 - 2));
const x = (i: number) => 10 + gap.value * (i + 0.5);
const mid = (indices: number[]) => indices.reduce((sum, i) => sum + x(i), 0) / Math.max(indices.length, 1);

const marks = computed(() => {
  const f = result.value;
  if (!f) return [];
  const list: { label: string; at: number }[] = [];
  if (step.value >= 2) list.push({ label: "M", at: mid(f.at.median) });
  if (step.value >= 3) {
    list.push(
      { label: "min", at: x(0) },
      { label: "Q1", at: mid(f.at.q1) },
      { label: "Q3", at: mid(f.at.q3) },
      { label: "max", at: x(n.value - 1) },
    );
  }
  return list;
});
const status = computed(() => {
  const f = result.value;
  if (!f) return "";
  return fill([props.statusStart, props.statusOrdered, props.statusMiddle, props.statusHalves][step.value] ?? "", f);
});
const isMiddleBead = (i: number) => step.value >= 2 && (result.value?.at.median.includes(i) ?? false);
</script>

<template>
  <div class="perlenkette">
    <svg viewBox="0 0 360 150" role="img" :aria-label="alt" class="perlenkette-chart">
      <line x1="10" x2="350" y1="40" y2="40" class="perlenkette-string" />
      <g v-for="(value, i) in chain" :key="`${step}-${i}`">
        <circle
          :cx="x(i)"
          cy="40"
          :r="radius"
          :class="['perlenkette-bead', { 'perlenkette-middle': isMiddleBead(i) }]"
        />
        <text :x="x(i)" y="45" text-anchor="middle" class="perlenkette-number">{{ value }}</text>
      </g>
      <g v-for="mark in marks" :key="mark.label">
        <line :x1="mark.at" :x2="mark.at" y1="62" y2="72" class="perlenkette-tick" />
        <text :x="mark.at" y="90" text-anchor="middle" class="perlenkette-label">{{ mark.label }}</text>
      </g>
      <g v-if="step >= 3">
        <line :x1="x(0) - radius" :x2="x(half - 1) + radius" y1="108" y2="108" class="perlenkette-tick" />
        <text :x="(x(0) + x(half - 1)) / 2" y="126" text-anchor="middle" class="perlenkette-label">{{ lower }}</text>
        <line :x1="x(n - half) - radius" :x2="x(n - 1) + radius" y1="108" y2="108" class="perlenkette-tick" />
        <text :x="(x(n - half) + x(n - 1)) / 2" y="126" text-anchor="middle" class="perlenkette-label">
          {{ upper }}
        </text>
      </g>
    </svg>
    <div class="perlenkette-buttons">
      <button type="button" :disabled="step !== 0" @click="step = 1">{{ order }}</button>
      <button type="button" :disabled="step !== 1" @click="step = 2">{{ middle }}</button>
      <button type="button" :disabled="step !== 2" @click="step = 3">{{ halves }}</button>
      <button type="button" @click="step = 0">{{ reset }}</button>
    </div>
    <p class="perlenkette-status" aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.perlenkette-chart {
  display: block;
  width: 100%;
  max-width: 30rem;
}

.perlenkette-string,
.perlenkette-tick {
  stroke: var(--page-text);
  stroke-width: 1.5;
}

.perlenkette-bead {
  fill: var(--page-surface);
  stroke: var(--page-text);
  stroke-width: 1.5;
}

.perlenkette-middle {
  fill: var(--page-accent);
  stroke-width: 3;
}

.perlenkette-number {
  fill: var(--page-text);
  font-size: 12px;
  font-weight: 700;
}

.perlenkette-middle + .perlenkette-number {
  fill: var(--page-on-accent);
}

.perlenkette-label {
  fill: var(--page-text);
  font-size: 13px;
  font-weight: 700;
}

.perlenkette-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.perlenkette-buttons button {
  min-height: 44px;
  padding: 0 0.9rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
}

.perlenkette-buttons button:disabled {
  opacity: 0.5;
}

.perlenkette-status {
  margin: 0.5rem 0 0;
  min-height: 3.5rem;
}
</style>
