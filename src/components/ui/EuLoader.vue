<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

type Variant = 'dots' | 'ring' | 'bars' | 'orbit';

const VARIANTS: Variant[] = ['dots', 'ring', 'bars', 'orbit'];
const DOTS = [0, 1, 2];
const BARS = [0, 1, 2, 3];

const props = defineProps<{
  variant?: Variant;
  class?: string;
}>();

const picked = ref<Variant>('dots');
const current = computed<Variant>(() => props.variant ?? picked.value);

function dotsTransition(d: number) {
  return { duration: 1.1, repeat: Infinity, delay: d * 0.16, ease: 'easeInOut' };
}

function barsTransition(d: number) {
  return { duration: 1, repeat: Infinity, delay: d * 0.13, ease: 'easeInOut' };
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <div class="flex h-14 items-center justify-center">
      <div v-if="current === 'dots'" class="flex gap-1.5">
        <motion.span
          v-for="d in DOTS"
          :key="d"
          class="h-2 w-2 rounded-full bg-fg/70"
          :animate="{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }"
          :transition="dotsTransition(d)"
        />
      </div>

      <motion.span
        v-else-if="current === 'ring'"
        class="h-7 w-7 rounded-full border-[3px] border-line border-t-fg"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 0.9, repeat: Infinity, ease: 'linear' }"
      />

      <div v-else-if="current === 'bars'" class="flex items-end gap-1">
        <motion.span
          v-for="d in BARS"
          :key="d"
          class="w-1 rounded-full bg-fg/70"
          :animate="{ height: [8, 22, 8] }"
          :transition="barsTransition(d)"
        />
      </div>

      <div v-else class="relative h-9 w-9">
        <span class="absolute inset-0 rounded-full border border-line" />
        <motion.span
          class="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fg"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 1.3, repeat: Infinity, ease: 'linear' }"
          style="transform-origin: 50% 18px"
        />
      </div>
    </div>

    <div class="flex gap-1.5">
      <button
        v-for="v in VARIANTS"
        :key="v"
        :aria-pressed="current === v"
        :class="cn(
          'rounded-full px-2.5 py-1 text-xs transition-colors',
          current === v ? 'bg-fg text-bg' : 'bg-card text-muted hover:text-fg',
        )"
        @click="picked = v"
      >
        {{ v }}
      </button>
    </div>
  </div>
</template>
