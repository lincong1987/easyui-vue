<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const CARDS = [
  { label: 'contracts', tint: 'from-sky-400 to-blue-500' },
  { label: 'invoices', tint: 'from-violet-400 to-purple-500' },
  { label: 'receipts', tint: 'from-emerald-400 to-teal-500' },
];

const hover = ref(false);

function cardTransition(i: number) {
  return { ...motionTransitions.springResponsive, delay: i * 0.05 };
}
</script>

<template>
  <div
    :class="cn('flex h-56 w-44 flex-col items-center justify-end pb-6', props.class)"
    @pointerenter="hover = true"
    @pointerleave="hover = false"
  >
    <div class="relative h-32 w-36">
      <!-- fanned cards behind the folder -->
      <AnimatePresence>
        <motion.div
          v-for="(c, i) in hover ? CARDS : []"
          :key="c.label"
          :initial="{ y: 26, x: 0, opacity: 0, rotate: 0, scale: 0.85 }"
          :animate="{ y: -44 - i * 10, x: (i - 1) * 26, opacity: 1, rotate: (i - 1) * 9, scale: 1 }"
          :exit="{ y: 26, opacity: 0, scale: 0.85 }"
          :transition="cardTransition(i)"
          class="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-2 shadow-xl"
        >
          <span :class="cn('block h-12 rounded-lg bg-gradient-to-br', c.tint)" />
          <span class="mt-1.5 block text-center text-[9px] font-medium text-stone-600">{{ c.label }}</span>
        </motion.div>
      </AnimatePresence>

      <!-- folder back + tab -->
      <div class="absolute inset-x-2 top-2 h-4 rounded-t-lg bg-gradient-to-b from-sky-500/80 to-sky-600/80" />
      <div
        class="absolute inset-x-2 top-5 h-24 rounded-b-xl rounded-t-md bg-gradient-to-b from-sky-400 to-sky-600 shadow-lg"
      />
      <motion.div
        class="absolute inset-x-2 top-7 h-20 rounded-lg bg-gradient-to-b from-sky-100 to-sky-200"
        :animate="{ rotateX: hover ? 28 : 0, y: hover ? -2 : 0 }"
        :transition="motionTransitions.springGentle"
        style="transform-origin: top"
      />
    </div>
    <p class="text-xs text-muted">{{ hover ? 'cards unrolled' : 'hover the folder' }}</p>
  </div>
</template>
