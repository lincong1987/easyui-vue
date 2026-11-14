<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

/* All three paths share one command structure (M + six cubics), so the
   path data interpolates vertex-for-vertex between shapes. */
const SHAPES = [
  // diamond
  'M50 8 C57 15 64 22 71 29 C78 36 85 43 92 50 C78 64 64 78 50 92 C43 85 36 78 29 71 C22 64 15 57 8 50 C22 36 36 22 50 8 Z',
  // hexagon
  'M50 8 C62.67 15.33 75.33 22.67 88 30 C88 43.33 88 56.67 88 70 C75.33 77.33 62.67 84.67 50 92 C37.33 84.67 24.67 77.33 12 70 C12 56.67 12 43.33 12 30 C24.67 22.67 37.33 15.33 50 8 Z',
  // circle
  'M50 8 C65 8 78.87 16 86.37 29 C93.87 42 93.87 58 86.37 71 C78.87 84 65 92 50 92 C35 92 21.13 84 13.63 71 C6.13 58 6.13 42 13.63 29 C21.13 16 35 8 50 8 Z',
];

const i = ref(0);
let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => {
    i.value = (i.value + 1) % SHAPES.length;
  }, 1400);
});

onUnmounted(() => window.clearInterval(timer));
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <svg viewBox="0 0 100 100" class="h-20 w-20" aria-label="Morphing shape loader">
      <motion.path
        :d="SHAPES[0]"
        fill="none"
        stroke="#6366f1"
        stroke-width="4"
        stroke-linejoin="round"
        :initial="false"
        :animate="{ d: SHAPES[i] }"
        :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
      />
      <motion.path
        :d="SHAPES[0]"
        fill="rgba(99,102,241,0.12)"
        stroke="none"
        :initial="false"
        :animate="{ d: SHAPES[(i + 1) % SHAPES.length] }"
        :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
      />
    </svg>
    <p class="text-xs text-muted">diamond → hexagon → circle → …</p>
  </div>
</template>
