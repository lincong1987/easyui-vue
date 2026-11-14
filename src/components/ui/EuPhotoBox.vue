<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const SHOTS = [
  { label: 'Kyoto · dusk', tint: 'from-orange-300 to-rose-400' },
  { label: 'Fjord · noon', tint: 'from-sky-300 to-indigo-400' },
  { label: 'Pine · fog', tint: 'from-emerald-300 to-cyan-400' },
];

const open = ref(false);
const zoomed = ref<{ label: string; tint: string } | null>(null);

function fanTransition(i: number) {
  return { ...motionTransitions.springResponsive, delay: i * 0.06 };
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <div class="relative h-44 w-44">
      <div class="absolute inset-0 rounded-2xl border border-line bg-white/70 shadow-inner backdrop-blur-sm" />
      <div class="absolute inset-x-3 top-3 h-24 rounded-lg bg-white/50" />
      <div class="absolute inset-x-0 bottom-3 flex justify-center">
        <button
          class="rounded-full bg-fg px-3.5 py-1.5 text-[11px] font-medium text-bg transition-transform active:scale-95"
          @click="open = !open"
        >
          {{ open ? 'tuck back' : 'fan photos' }}
        </button>
      </div>

      <AnimatePresence>
        <motion.button
          v-for="(s, i) in open ? SHOTS : []"
          :key="s.label"
          :initial="{ y: 40, opacity: 0, rotate: 0, scale: 0.7 }"
          :animate="{ y: -58 - i * 8, opacity: 1, rotate: (i - 1) * 10, scale: 1, x: (i - 1) * 34 }"
          :exit="{ y: 40, opacity: 0, scale: 0.7 }"
          :transition="fanTransition(i)"
          class="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-1.5 pb-3 shadow-xl"
          @click="zoomed = s"
        >
          <span :class="cn('block h-16 rounded-sm bg-gradient-to-br', s.tint)" />
          <span class="mt-1 block text-left text-[8px] font-medium text-stone-600">{{ s.label }}</span>
        </motion.button>
      </AnimatePresence>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="zoomed"
        key="zoom"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
        @click="zoomed = null"
      >
        <motion.div
          :initial="{ scale: 0.7, rotate: -4 }"
          :animate="{ scale: 1, rotate: 0 }"
          :transition="motionTransitions.springMorph"
          class="w-72 rounded-lg bg-white p-3 pb-6 shadow-2xl"
        >
          <span :class="cn('block h-56 rounded bg-gradient-to-br', zoomed.tint)" />
          <p class="mt-2 text-xs font-medium text-stone-700">{{ zoomed.label }} — full bleed</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
