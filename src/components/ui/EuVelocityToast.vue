<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  message?: string;
  duration?: number;
  class?: string;
}>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', { fallback: string; dismiss: string; replay: string }> = {
  en: {
    fallback: 'Changes saved to the draft',
    dismiss: 'Dismiss',
    replay: 'replay toast',
  },
  'zh-CN': {
    fallback: '更改已保存到草稿',
    dismiss: '关闭',
    replay: '重播提示',
  },
};

const d = computed(() => DATA[locale.value]);

const duration = props.duration ?? 5000;
const visible = ref(true);
const progress = ref(0);
const paused = ref(false);

let raf = 0;
let last = 0;

function tick(now: number) {
  const dt = now - last;
  last = now;
  const raw = Math.min(1, progress.value + dt / duration);
  // ease the final 10% so the countdown winds down gently
  progress.value = raw > 0.9 ? 0.9 + (raw - 0.9) * 0.5 : raw;
  if (progress.value >= 1) {
    visible.value = false;
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

function replay() {
  progress.value = 0;
  visible.value = true;
}
</script>

<template>
  <div :class="cn('flex w-full max-w-sm flex-col items-center gap-3', props.class)">
    <AnimatePresence>
      <motion.div
        v-if="visible"
        :initial="{ x: 120, opacity: 0, rotate: 2 }"
        :animate="{ x: 0, opacity: 1, rotate: 0 }"
        :exit="{ x: 80, opacity: 0 }"
        :transition="motionTransitions.springResponsive"
        class="w-full overflow-hidden rounded-2xl border border-line bg-surface p-3.5 shadow-lg"
        role="status"
        @pointerenter="paused = true"
        @pointerleave="paused = false"
      >
        <div class="flex items-center gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm text-emerald-600 dark:text-emerald-400">✓</span>
          <p class="min-w-0 flex-1 truncate text-sm font-medium">{{ props.message ?? d.fallback }}</p>
          <button
            :aria-label="d.dismiss"
            class="shrink-0 rounded-full p-1 text-xs text-muted transition-colors hover:text-fg"
            @click="visible = false"
          >
            ✕
          </button>
        </div>
        <div class="mt-2 h-1 overflow-hidden rounded-full bg-card">
          <div
            class="h-full rounded-full bg-emerald-500/70 transition-[width] duration-100 ease-linear"
            :style="{ width: `${(1 - progress) * 100}%` }"
          />
        </div>
      </motion.div>
    </AnimatePresence>
    <button
      v-if="!visible"
      class="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-fg"
      @click="replay"
    >
      {{ d.replay }}
    </button>
  </div>
</template>
