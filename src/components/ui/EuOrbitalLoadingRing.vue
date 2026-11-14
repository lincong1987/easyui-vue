<script setup lang="ts">
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    size?: number;
    label?: string;
    class?: string;
  }>(),
  { size: 96, label: 'Processing' },
);

const ORBITS = [0, 1, 2];
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)" role="status" :aria-label="props.label">
    <div class="relative" :style="{ width: `${props.size}px`, height: `${props.size}px` }">
      <motion.span
        class="absolute inset-0 rounded-full border border-line"
        :animate="{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }"
        :transition="{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }"
      />
      <motion.span
        class="absolute inset-3 rounded-full border-2 border-line border-t-fg"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 1.1, repeat: Infinity, ease: 'linear' }"
      />
      <motion.span
        v-for="i in ORBITS"
        :key="i"
        class="absolute inset-0"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 2.4 + i * 0.7, repeat: Infinity, ease: 'linear' }"
        :style="{ rotate: i * 120 }"
      >
        <span
          class="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fg"
          :style="{ top: `${props.size * 0.08}px` }"
        />
      </motion.span>
    </div>
    <p class="text-xs text-muted">{{ props.label }}…</p>
  </div>
</template>
