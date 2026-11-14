<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    code?: string;
    class?: string;
  }>(),
  { code: '404' },
);

const chars = computed(() => props.code.split(''));
</script>

<template>
  <div :class="cn('flex w-full flex-col items-center gap-4 py-6 text-center', props.class)">
    <div class="flex gap-1 text-6xl font-bold tracking-tight text-fg" :aria-label="`Error ${props.code}`">
      <motion.span
        v-for="(ch, i) in chars"
        :key="i"
        :animate="{ y: [0, -7, 0], rotate: [0, i % 2 ? 3 : -3, 0] }"
        :transition="{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }"
        class="inline-block"
      >
        {{ ch }}
      </motion.span>
    </div>
    <div>
      <p class="text-sm font-medium">This route drifted off the map.</p>
      <p class="mt-1 text-sm text-muted">The page you want may have moved or never shipped.</p>
    </div>
    <div class="flex gap-2">
      <a href="#/" class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95">
        Back home
      </a>
      <a
        href="#/components"
        class="rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-fg"
      >
        Browse components
      </a>
    </div>
  </div>
</template>
