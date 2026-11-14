<script setup lang="ts">
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    class?: string;
    /** Seconds per border revolution. */
    period?: number;
  }>(),
  { period: 3.2 },
);

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <motion.button
    type="button"
    :while-press="{ scale: 0.97 }"
    :class="
      cn(
        'group relative inline-flex rounded-full p-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
        props.class,
      )
    "
    @click="emit('click')"
  >
    <motion.span
      aria-hidden
      class="absolute inset-0 rounded-full"
      :style="{
        background:
          'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(129,140,248,0.9) 330deg, rgba(244,114,182,0.9) 350deg, transparent 360deg)',
      }"
      :animate="{ rotate: 360 }"
      :transition="{ duration: props.period, repeat: Infinity, ease: 'linear' }"
    />
    <span class="relative z-10 inline-flex items-center gap-2 rounded-full bg-bg px-5 py-2.5 text-sm font-medium text-fg">
      <slot />
    </span>
  </motion.button>
</template>
