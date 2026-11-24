<script setup lang="ts">
// A column chart of the same values whose vertical axis the learner switches between starting at 0 and starting at a
// higher value. Its logic is in AchseSchieber.ts. It is no exercise: nothing is checked or stored. The numbers stay
// the same; only the look of the bars changes.
import { computed, ref } from "vue";
import { barHeight, fill, ticks } from "./AchseSchieber.ts";

const props = defineProps<{
  /** The values of the bars. */
  values: number[];
  /** The names under the bars, as many as values. */
  names: string[];
  /** The highest mark of the axis. */
  max: number;
  /** The value the axis starts at when it is cut. */
  cut: number;
  /** The label of the title of the axis. */
  axis: string;
  /** The label of the button that starts the axis at 0 and the one that starts it at the cut value, with {min}. */
  zero: string;
  cutLabel: string;
  /** What the chart shows, for screen readers, with {min}. */
  alt: string;
  /** What to notice when the axis starts at 0 and when it is cut, with {min}. */
  noticeZero: string;
  noticeCut: string;
}>();

const cutOn = ref(false);
const min = computed(() => (cutOn.value ? props.cut : 0));
const plot = 150;
const left = 44;
const base = 190;
const width = computed(() => 300 / props.values.length);
</script>

<template>
  <div class="achse-schieber">
    <svg viewBox="0 0 360 240" role="img" :aria-label="fill(alt, min)" class="achse-schieber-chart">
      <text x="4" y="14" class="achse-schieber-text">{{ axis }}</text>
      <g v-for="mark in ticks(min, max, cutOn ? 1 : 2)" :key="mark">
        <line
          :x1="left"
          :x2="350"
          :y1="base - barHeight(mark, min, max, plot)"
          :y2="base - barHeight(mark, min, max, plot)"
          class="achse-schieber-grid"
        />
        <text
          :x="left - 6"
          :y="base - barHeight(mark, min, max, plot) + 4"
          text-anchor="end"
          class="achse-schieber-text"
        >
          {{ mark }}
        </text>
      </g>
      <g v-for="(value, i) in values" :key="i">
        <rect
          :x="left + 14 + i * width"
          :y="base - barHeight(value, min, max, plot)"
          :width="width - 28"
          :height="barHeight(value, min, max, plot)"
          class="achse-schieber-bar"
        />
        <text
          :x="left + width / 2 + i * width"
          :y="base - barHeight(value, min, max, plot) - 5"
          text-anchor="middle"
          class="achse-schieber-number"
        >
          {{ value }}
        </text>
        <text :x="left + width / 2 + i * width" :y="base + 20" text-anchor="middle" class="achse-schieber-text">
          {{ names[i] }}
        </text>
      </g>
      <line :x1="left" :x2="350" :y1="base" :y2="base" class="achse-schieber-axis" />
      <line :x1="left" :x2="left" :y1="base - plot - 6" :y2="base" class="achse-schieber-axis" />
    </svg>
    <div class="achse-schieber-buttons">
      <button type="button" :aria-pressed="!cutOn" @click="cutOn = false">{{ fill(zero, 0) }}</button>
      <button type="button" :aria-pressed="cutOn" @click="cutOn = true">{{ fill(cutLabel, cut) }}</button>
    </div>
    <p class="achse-schieber-status" aria-live="polite">{{ fill(cutOn ? noticeCut : noticeZero, min) }}</p>
  </div>
</template>

<style scoped>
.achse-schieber-chart {
  display: block;
  width: 100%;
  max-width: 30rem;
}

.achse-schieber-text,
.achse-schieber-number {
  fill: var(--page-text);
  font-size: 13px;
}

.achse-schieber-number {
  font-weight: 700;
  font-size: 14px;
}

.achse-schieber-grid {
  stroke: var(--page-border);
}

.achse-schieber-axis {
  stroke: var(--page-text);
  stroke-width: 1.5;
}

.achse-schieber-bar {
  fill: var(--page-accent);
  stroke: var(--page-text);
}

.achse-schieber-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.achse-schieber-buttons button {
  min-height: 44px;
  padding: 0 0.9rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
}

.achse-schieber-buttons button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}

.achse-schieber-status {
  margin: 0.5rem 0 0;
  min-height: 3rem;
}

/* buttons in the look of the runtime: the accent colour, the radius and the focus ring of its questions */
.achse-schieber-buttons button {
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

.achse-schieber-buttons button:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.achse-schieber-buttons button:disabled {
  border-color: var(--page-border);
  color: var(--page-muted);
  cursor: not-allowed;
}
</style>
