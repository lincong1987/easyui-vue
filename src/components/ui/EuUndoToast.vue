<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  message?: string;
  duration?: number;
  class?: string;
}>();

const duration = props.duration ?? 6000;
const visible = ref(true);
const deleted = ref(false);
const paused = ref(false);
const progress = ref(0);

let raf = 0;
let last = 0;

function tick(now: number) {
  const dt = now - last;
  last = now;
  progress.value = Math.min(1, progress.value + dt / duration);
  if (progress.value >= 1) {
    visible.value = false;
    deleted.value = true;
    return;
  }
  raf = requestAnimationFrame(tick);
}

function start() {
  cancelAnimationFrame(raf);
  last = performance.now();
  raf = requestAnimationFrame(tick);
}

watch([visible, paused], ([v, p]) => {
  if (v && !p) start();
  else cancelAnimationFrame(raf);
});

onUnmounted(() => cancelAnimationFrame(raf));

function undo() {
  visible.value = false;
  deleted.value = false;
}

function replay() {
  visible.value = true;
  progress.value = 0;
  deleted.value = false;
}
</script>

<template>
  <div :class="cn('flex w-full max-w-sm flex-col items-center gap-3', props.class)">
    <div
      :class="cn(
        'rounded-2xl border border-dashed p-4 text-center text-sm transition-all',
        deleted ? 'border-red-500/40 text-red-600 dark:text-red-400' : 'border-line text-muted',
      )"
    >
      {{ deleted ? '“Q3 report.pdf” was removed' : '“Q3 report.pdf” sits safely in the folder' }}
    </div>
    <AnimatePresence>
      <motion.div
        v-if="visible"
        :initial="{ opacity: 0, y: 24, scale: 0.96 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: 12, scale: 0.96 }"
        :transition="motionTransitions.springSnappy"
        class="flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-lg"
        role="status"
        @pointerenter="paused = true"
        @pointerleave="paused = false"
      >
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ props.message ?? 'Item deleted' }}</p>
          <div class="mt-1.5 h-1 overflow-hidden rounded-full bg-card">
            <div
              class="h-full rounded-full bg-fg/70 transition-[width] duration-100 ease-linear"
              :style="{ width: `${(1 - progress) * 100}%` }"
            />
          </div>
        </div>
        <button
          class="shrink-0 rounded-full bg-fg px-3.5 py-1.5 text-xs font-semibold text-bg transition-transform active:scale-95"
          @click="undo"
        >
          Undo
        </button>
      </motion.div>
    </AnimatePresence>
    <button
      v-if="!visible"
      class="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-fg"
      @click="replay"
    >
      replay toast
    </button>
  </div>
</template>
