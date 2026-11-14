<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const CARDS = ['Inbox', 'Calendar', 'Notes', 'Metrics'];

const focus = ref<number | null>(null);

const hint = computed(() =>
  focus.value === null
    ? 'click a card to isolate it · Esc dismisses'
    : `focused: ${CARDS[focus.value]} — press Esc to release`,
);

function cardAnimate(i: number) {
  const dimmed = focus.value !== null && focus.value !== i;
  return {
    opacity: dimmed ? 0.25 : 1,
    scale: focus.value === i ? 1.04 : 1,
    filter: dimmed ? 'blur(1px)' : 'blur(0px)',
  };
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') focus.value = null;
}
</script>

<template>
  <div :class="cn('w-full', props.class)" :tabindex="-1" @keydown="onKeyDown">
    <div class="relative grid grid-cols-2 gap-3 rounded-2xl p-2">
      <motion.button
        v-for="(c, i) in CARDS"
        :key="c"
        :animate="cardAnimate(i)"
        :transition="motionTransitions.springGentle"
        class="rounded-2xl border border-line bg-surface p-4 text-left shadow-sm"
        @click="focus = i"
      >
        <p class="text-sm font-medium">{{ c }}</p>
        <p class="mt-1 text-xs text-muted">focus target {{ i + 1 }}</p>
      </motion.button>
      <motion.div
        v-if="focus !== null"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        class="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-fg/70"
      />
    </div>
    <p class="mt-3 text-center text-xs text-muted">
      {{ hint }}
    </p>
  </div>
</template>
