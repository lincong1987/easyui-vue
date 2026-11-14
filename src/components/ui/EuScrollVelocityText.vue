<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    text?: string;
    class?: string;
  }>(),
  {
    text: 'EASYUI',
  },
);

const MIN = 0.02;
const MAX = 0.34;

const stripEl = ref<HTMLDivElement | null>(null);
const innerEl = ref<HTMLSpanElement | null>(null);
let raf = 0;

onMounted(() => {
  let lastY = window.scrollY;
  let velocity = 0;
  let lastStrip = 0;

  const apply = () => {
    const el = innerEl.value;
    if (!el) return;
    const clamped = Math.max(-60, Math.min(60, velocity));
    const spacing = MIN + (Math.abs(clamped) / 60) * MAX;
    const scale = 1 + (clamped / 60) * 0.14;
    el.style.letterSpacing = `${spacing.toFixed(3)}em`;
    el.style.transform = `scale(${scale.toFixed(4)})`;
  };

  const tick = () => {
    const y = window.scrollY;
    const strip = stripEl.value?.scrollTop ?? 0;
    const dy = y - lastY + (strip - lastStrip);
    lastY = y;
    lastStrip = strip;
    velocity = velocity * 0.86 + dy * 0.14;
    apply();
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
});

onUnmounted(() => cancelAnimationFrame(raf));
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface">
      <span
        ref="innerEl"
        :aria-label="props.text"
        class="select-none text-4xl font-bold tracking-[0.02em] will-change-transform"
      >
        {{ props.text }}
      </span>
    </div>
    <p class="mt-1 text-center text-[10px] text-muted">
      scroll the page or the strip below — spacing breathes with velocity
    </p>
    <div
      ref="stripEl"
      class="mx-auto mt-2 h-24 w-2/3 overflow-y-auto rounded-xl border border-line"
      aria-hidden
    >
      <div class="h-64 bg-gradient-to-b from-transparent via-card to-transparent" />
    </div>
  </div>
</template>
