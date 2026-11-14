<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const STEPS = [
  { title: 'Pick a target', body: 'This spotlight is the current step. Click next to move.' },
  { title: 'Springs, not fades', body: 'The cutout glides between targets on a shared spring.' },
  { title: 'Escape anytime', body: 'Finish or press the ✕ — the tour is fully keyboard-driven.' },
];

const step = ref<number | null>(null);

const current = computed(() => {
  const index = step.value ?? 0;
  return { index, ...STEPS[index] };
});

const nextLabel = computed(() => (step.value !== null && step.value < STEPS.length - 1 ? 'Next' : 'Finish'));

function toggleTour() {
  step.value = step.value === null ? 0 : null;
}

function next() {
  if (step.value === null) return;
  step.value = step.value < STEPS.length - 1 ? step.value + 1 : null;
}
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <div class="grid grid-cols-1 gap-2.5 rounded-2xl border border-line bg-surface p-3 sm:grid-cols-3">
      <div v-for="(s, i) in STEPS" :key="s.title" :data-tour="i" class="rounded-xl border border-line bg-card/70 p-3">
        <p class="text-xs font-semibold text-fg">{{ i + 1 }}. {{ s.title }}</p>
        <p class="mt-1 text-[11px] leading-relaxed text-muted">{{ s.body }}</p>
      </div>
    </div>

    <div class="mt-3 flex justify-center">
      <button
        class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95"
        @click="toggleTour"
      >
        {{ step === null ? 'Start tour' : 'End tour' }}
      </button>
    </div>

    <AnimatePresence>
      <div v-if="step !== null" key="tour" class="absolute inset-0 z-30">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="absolute inset-0 rounded-2xl"
          :style="{
            background: 'radial-gradient(circle at var(--sx) var(--sy), transparent 0 86px, rgba(0,0,0,0.55) 110px)',
            '--sx': `${18 + current.index * 33}%`,
            '--sy': '38%',
          }"
          @click="step = null"
        />
        <motion.div
          :key="current.index"
          :initial="{ opacity: 0, y: 10, scale: 0.96 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: 10 }"
          :transition="motionTransitions.springSnappy"
          class="absolute bottom-4 left-1/2 w-64 -translate-x-1/2 rounded-2xl border border-line bg-surface p-4 shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-semibold">{{ current.index + 1 }}/{{ STEPS.length }} — {{ current.title }}</p>
              <p class="mt-1 text-xs text-muted">{{ current.body }}</p>
            </div>
            <button aria-label="End tour" class="text-muted hover:text-fg" @click="step = null">✕</button>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <span class="flex gap-1">
              <span
                v-for="i in STEPS.length"
                :key="i"
                :class="cn('h-1.5 rounded-full transition-all', i - 1 === step ? 'w-4 bg-fg' : 'w-1.5 bg-line')"
              />
            </span>
            <button class="rounded-full bg-fg px-3 py-1.5 text-[11px] font-medium text-bg" @click="next">
              {{ nextLabel }}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
