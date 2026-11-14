<script setup lang="ts">
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ label?: string; class?: string }>(), {
  label: 'Rainbow dash',
});

const ROTATE = {
  background:
    'conic-gradient(from 0deg, #f43f5e, #f59e0b, #22c55e, #06b6d4, #6366f1, #d946ef, #f43f5e)',
};
</script>

<template>
  <div :class="cn('relative inline-flex flex-col items-center gap-4', props.class)">
    <motion.button
      :while-hover="{ scale: 1.03 }"
      :while-press="{ scale: 0.97 }"
      class="group relative rounded-2xl p-[2px] shadow-[0_10px_36px_rgba(99,102,241,0.35)]"
    >
      <motion.span
        aria-hidden
        class="absolute -inset-1 rounded-2xl opacity-60 blur-md"
        :style="ROTATE"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 4, repeat: Infinity, ease: 'linear' }"
      />
      <motion.span
        aria-hidden
        class="absolute inset-0 rounded-2xl"
        :style="ROTATE"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 4, repeat: Infinity, ease: 'linear' }"
      />
      <span class="relative z-10 flex h-12 items-center gap-2 rounded-[14px] bg-bg px-6 text-sm font-semibold text-fg">
        <span
          aria-hidden
          class="h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-indigo-500"
        />{{ props.label }}</span>
      <span
        aria-hidden
        class="pointer-events-none absolute inset-x-4 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/25 to-transparent"
      />
    </motion.button>
    <p class="text-xs text-muted">border spins the full hue circle · underglow follows</p>
  </div>
</template>
