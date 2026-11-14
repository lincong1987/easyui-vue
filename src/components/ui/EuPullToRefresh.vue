<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const MAX = 70;

const pull = ref(0);
const refreshing = ref(false);
const startY = ref<number | null>(null);

let refreshTimer: number | undefined;

function onDown(e: PointerEvent) {
  if (refreshing.value) return;
  startY.value = e.clientY;
}

function onMove(e: PointerEvent) {
  if (startY.value === null || refreshing.value) return;
  const d = Math.max(0, Math.min(MAX, (e.clientY - startY.value) * 0.55));
  // elastic resistance curve
  pull.value = d * (1 - d / (MAX * 2.2));
}

function onUp() {
  if (startY.value === null) return;
  startY.value = null;
  if (pull.value > 42) {
    refreshing.value = true;
    pull.value = 34;
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      refreshing.value = false;
      pull.value = 0;
    }, 1400);
  } else {
    pull.value = 0;
  }
}

onUnmounted(() => window.clearTimeout(refreshTimer));
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div
      class="relative touch-none select-none overflow-hidden rounded-2xl border border-line bg-surface"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointerleave="onUp"
    >
      <div class="flex items-center justify-center bg-card transition-[height] duration-150" :style="{ height: `${44 + pull}px` }">
        <motion.span
          :animate="{ rotate: refreshing ? 360 : pull * 3, opacity: pull > 6 || refreshing ? 1 : 0 }"
          :transition="refreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : motionTransitions.easeFast"
          class="h-5 w-5 rounded-full border-2 border-fg/30 border-t-fg"
        />
      </div>
      <motion.div
        :animate="{ y: pull * 0.4 }"
        :transition="motionTransitions.springSnappy"
        class="space-y-2 p-4"
      >
        <div v-for="i in [1, 2, 3]" :key="i" class="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">
          <span class="h-8 w-8 rounded-full bg-card" />
          <div class="flex-1 space-y-1.5">
            <div class="h-2 w-2/3 rounded bg-card" />
            <div class="h-2 w-1/3 rounded bg-line" />
          </div>
        </div>
      </motion.div>
    </div>
    <p class="mt-2 text-center text-[10px] text-muted">
      {{ refreshing ? 'refreshing…' : 'drag the list down past ~42px to trigger' }}
    </p>
  </div>
</template>
