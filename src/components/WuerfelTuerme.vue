<script setup lang="ts">
// Towers of cubes, one per value: the learner gives a cube to a neighbouring tower, with the arrows below each tower,
// until all towers are equally high. Its logic is in WuerfelTuerme.ts. It is no exercise: nothing is checked or stored.
// The towers start as the values; the sum of the cubes never changes, and equal towers show the mean.
import { computed, ref } from "vue";
import { fill, isLevel, level, move } from "./WuerfelTuerme.ts";

const props = defineProps<{
  /** The heights the towers start with. */
  values: number[];
  /** The names of the towers, as many as values. */
  names: string[];
  /** The text of a tower for screen readers and below it, with {name} and {n}. */
  tower: string;
  /** The label of the button that gives a cube to the left neighbour, with {name}. */
  left: string;
  /** The label of the button that gives a cube to the right neighbour, with {name}. */
  right: string;
  /** What to do, shown while the towers are not level. */
  hint: string;
  /** What the learner sees when the towers are level, with {k} for the number of towers and {h} for the height. */
  done: string;
  /** The label of the button that sets the towers back. */
  reset: string;
}>();

const heights = ref<number[]>([...props.values]);
const unit = 16;
const tallest = computed(() => Math.max(...props.values, 1) + 2);
const levelHeight = computed(() => level(heights.value));

function give(index: number, direction: -1 | 1): void {
  heights.value = move(heights.value, index, direction);
}
</script>

<template>
  <div class="wuerfel-tuerme">
    <div class="wuerfel-tuerme-row" :style="{ gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))` }">
      <div v-for="(name, i) in names" :key="name" class="wuerfel-tuerme-column">
        <div class="wuerfel-tuerme-field" :style="{ height: `${tallest * unit}px` }">
          <div v-for="c in heights[i] ?? 0" :key="c" class="wuerfel-tuerme-cube" :style="{ height: `${unit}px` }"></div>
        </div>
        <p class="wuerfel-tuerme-label">{{ fill(tower, { name, n: heights[i] ?? 0 }) }}</p>
        <div class="wuerfel-tuerme-buttons">
          <button
            type="button"
            :aria-label="fill(left, { name })"
            :disabled="i === 0 || (heights[i] ?? 0) === 0"
            @click="give(i, -1)"
          >
            ←
          </button>
          <button
            type="button"
            :aria-label="fill(right, { name })"
            :disabled="i === heights.length - 1 || (heights[i] ?? 0) === 0"
            @click="give(i, 1)"
          >
            →
          </button>
        </div>
      </div>
    </div>
    <p class="wuerfel-tuerme-status" aria-live="polite">
      {{ isLevel(heights) && levelHeight !== undefined ? fill(done, { k: heights.length, h: levelHeight }) : hint }}
    </p>
    <button
      type="button"
      class="wuerfel-tuerme-reset"
      :disabled="heights.every((h, i) => h === values[i])"
      @click="heights = [...values]"
    >
      {{ reset }}
    </button>
  </div>
</template>

<style scoped>
.wuerfel-tuerme-row {
  display: grid;
  gap: 0.4rem;
  align-items: end;
  max-width: 30rem;
}

.wuerfel-tuerme-column {
  text-align: center;
}

.wuerfel-tuerme-field {
  display: flex;
  flex-direction: column-reverse;
  border-bottom: 2px solid var(--page-text);
}

.wuerfel-tuerme-cube {
  box-sizing: border-box;
  border: 1px solid var(--page-text);
  background: var(--page-accent);
}

.wuerfel-tuerme-label {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  min-height: 2.6rem;
}

.wuerfel-tuerme-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
}

.wuerfel-tuerme-buttons button,
.wuerfel-tuerme-reset {
  min-width: 44px;
  min-height: 44px;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
  font-size: 1.1rem;
}

.wuerfel-tuerme-status {
  margin: 0.75rem 0 0.5rem;
  min-height: 1.5rem;
}

.wuerfel-tuerme-reset {
  padding: 0 1rem;
  font-size: 1rem;
}

/* buttons in the look of the runtime: the accent colour, the radius and the focus ring of its questions */
.wuerfel-tuerme-buttons button,
.wuerfel-tuerme-reset {
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

.wuerfel-tuerme-buttons button,
.wuerfel-tuerme-reset:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.wuerfel-tuerme-buttons button,
.wuerfel-tuerme-reset:disabled {
  border-color: var(--page-border);
  color: var(--page-muted);
  cursor: not-allowed;
}
</style>
