<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const CONFETTI_COLORS = ['#f43f5e', '#f59e0b', '#22c55e', '#06b6d4', '#6366f1', '#d946ef'];

const phase = ref<'idle' | 'flying' | 'burst'>('idle');
const seed = ref(0);

const timers = new Set<number>();

const particles = computed(() =>
  Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2 + seed.value;
    const dist = 60 + ((i * 37 + seed.value * 13) % 70);
    return {
      i,
      x: Math.cos(a) * dist,
      y: Math.sin(a) * dist + 40,
      rotate: i * 40,
      delay: (i % 5) * 0.03,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    };
  }),
);

const burstParticles = computed(() => (phase.value === 'burst' ? particles.value : []));

function launch() {
  if (phase.value === 'flying') return;
  phase.value = 'flying';
  seed.value += 1;
  const burst = window.setTimeout(() => {
    timers.delete(burst);
    phase.value = 'burst';
  }, 900);
  const idle = window.setTimeout(() => {
    timers.delete(idle);
    phase.value = 'idle';
  }, 2600);
  timers.add(burst);
  timers.add(idle);
}

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t));
  timers.clear();
});
</script>

<template>
  <div
    :class="
      cn(
        'relative flex h-56 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-slate-950 to-indigo-950',
        props.class,
      )
    "
  >
    <AnimatePresence>
      <motion.div
        v-if="phase === 'flying'"
        key="rocket"
        :initial="{ y: 90, rotate: 45, scale: 0.9 }"
        :animate="{ y: -110, rotate: 45, scale: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.85, ease: 'easeIn' }"
        class="absolute left-1/2 top-1/2 -translate-x-1/2"
      >
        <div class="relative h-14 w-6 rounded-t-full bg-gradient-to-b from-white to-zinc-400">
          <span class="absolute -bottom-1 left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-lg bg-red-500" />
          <motion.span
            class="absolute -bottom-8 left-1/2 h-8 w-3 -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-500 to-red-500 blur-[2px]"
            :animate="{ scaleY: [1, 1.6, 1] }"
            :transition="{ duration: 0.3, repeat: Infinity }"
          />
        </div>
      </motion.div>
      <motion.span
        v-for="p in burstParticles"
        :key="p.i"
        :initial="{ x: 0, y: 0, opacity: 1, scale: 1 }"
        :animate="{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }"
        :transition="{ duration: 1.5, ease: 'easeOut', delay: p.delay }"
        class="absolute left-1/2 top-1/2 h-2 w-2 rounded-[2px]"
        :style="{ background: p.color }"
      />
    </AnimatePresence>

    <div v-if="phase === 'idle'" class="text-center">
      <p class="text-sm font-medium text-white/90">Milestone ready</p>
      <p class="mt-1 text-xs text-white/50">launch the rocket → confetti popper</p>
    </div>
    <button
      :disabled="phase === 'flying'"
      class="absolute bottom-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-transform active:scale-95 disabled:opacity-50"
      @click="launch"
    >
      {{ phase === 'flying' ? 'launching…' : 'celebrate' }}
    </button>
  </div>
</template>
