<script setup lang="ts">
// Four categories with a count each; the learner sets a bar for each to its count with plus and minus buttons. Its logic
// is in SaeulenZeichnen.ts. It is the input of the task: it emits the four bar heights on every change, and the
// explainer draws "Prüfen", checks the answer, gives the feedback with the message of a typical mistake, the task
// number and "Neue Aufgabe". The bars start at 0; the component shows the learner's own heights, never the answer.
import { computed, ref } from "vue";
import { fill, generate, MAX } from "./SaeulenZeichnen.ts";

const props = defineProps<{
  /** The task with {k0} to {k3}: each becomes "Name: count". */
  task: string;
  /** The four categories, in the order of the bars. */
  categories: string[];
  /** The label of a plus button for screen readers, with {name}. */
  plus: string;
  /** The label of a minus button for screen readers, with {name}. */
  minus: string;
  /** The text of a bar for screen readers and below it, with {name} and {n}. */
  bar: string;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
  /** The message for exactly one bar that does not fit, with {name}. */
  oneOff: string;
  /** The message for several bars that do not fit. */
  several: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer the bars give now. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [number[]] }>();

const current = computed(() => generate(props.seed, props));
const heights = ref<number[]>(props.categories.map(() => 0));
const unit = 14;

function set(index: number, delta: number): void {
  const next = Math.min(MAX, Math.max(0, (heights.value[index] ?? 0) + delta));
  heights.value[index] = next;
  emit("answer", [...heights.value]);
}

const text = (template: string, name: string, n = 0) =>
  template.replace(/\{name\}/g, name).replace(/\{n\}/g, String(n));
</script>

<template>
  <div class="saeulen-zeichnen">
    <p>{{ fill(props, current) }}</p>
    <div class="saeulen-zeichnen-row" :class="{ 'saeulen-zeichnen-checked': checked }">
      <div v-for="(name, i) in categories" :key="name" class="saeulen-zeichnen-column">
        <div class="saeulen-zeichnen-field" :style="{ height: `${MAX * unit}px` }">
          <div class="saeulen-zeichnen-bar" :style="{ height: `${(heights[i] ?? 0) * unit}px` }"></div>
        </div>
        <p class="saeulen-zeichnen-label" aria-live="polite">{{ text(bar, name, heights[i]) }}</p>
        <div class="saeulen-zeichnen-buttons">
          <button type="button" :aria-label="text(plus, name)" @click="set(i, 1)">+</button>
          <button type="button" :aria-label="text(minus, name)" @click="set(i, -1)">−</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.saeulen-zeichnen-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
  align-items: end;
  max-width: 28rem;
}

.saeulen-zeichnen-column {
  text-align: center;
}

.saeulen-zeichnen-field {
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid var(--page-text);
  border-left: 1px solid var(--page-border);
}

.saeulen-zeichnen-bar {
  width: 100%;
  background: var(--page-accent);
  border: 1px solid var(--page-text);
  box-sizing: border-box;
}

.saeulen-zeichnen-checked .saeulen-zeichnen-bar {
  opacity: 0.75;
}

.saeulen-zeichnen-label {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  min-height: 2.6rem;
}

.saeulen-zeichnen-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.saeulen-zeichnen-buttons button {
  min-width: 44px;
  min-height: 44px;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-surface);
  color: var(--page-text);
  font-size: 1.2rem;
}
</style>
