<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const Pages = ['Showroom', 'Garage'];

const canvas = ref<HTMLCanvasElement | null>(null);
const page = ref(0);
let racing = false;
let driveRaf = 0;
let cleanup: (() => void) | null = null;

const race = () => {
  if (racing) return;
  racing = true;
  const el = canvas.value;
  const ctx = el?.getContext('2d');
  const w = el?.clientWidth ?? 400;
  const h = el?.clientHeight ?? 200;
  const y = h * 0.62;
  const start = performance.now();
  const DUR = 1100;

  const drive = (now: number) => {
    const t = Math.min(1, (now - start) / DUR);
    const x = -60 + t * (w + 160);
    if (ctx) {
      // car silhouette
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#111827';
      ctx.beginPath();
      ctx.roundRect(x - 34, y - 14, 68, 14, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(x - 20, y - 26, 34, 14, 5);
      ctx.fill();
      ctx.fillStyle = '#374151';
      ctx.beginPath();
      ctx.arc(x - 20, y, 6, 0, Math.PI * 2);
      ctx.arc(x + 20, y, 6, 0, Math.PI * 2);
      ctx.fill();
      // smoke trail
      for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#9ca3af';
        ctx.beginPath();
        ctx.arc(x - 40 - Math.random() * 30, y - 6 + (Math.random() - 0.5) * 10, 4 + Math.random() * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    if (t < 1) driveRaf = requestAnimationFrame(drive);
    else {
      ctx?.clearRect(0, 0, w, h);
      page.value = (page.value + 1) % Pages.length;
      racing = false;
    }
  };
  driveRaf = requestAnimationFrame(drive);
};

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext('2d');
  if (!ctx) return;
  let raf = 0;
  let w = 0;
  let h = 0;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const smoke: { x: number; y: number; r: number; life: number }[] = [];

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const frame = () => {
    raf = requestAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h);
    for (let i = smoke.length - 1; i >= 0; i--) {
      const s = smoke[i];
      s.r += 0.7;
      s.life -= 0.02;
      if (s.life <= 0) {
        smoke.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = s.life * 0.35;
      ctx.fillStyle = '#9ca3af';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  resize();
  frame();
  window.addEventListener('resize', resize);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
});

onUnmounted(() => {
  cleanup?.();
  cancelAnimationFrame(driveRaf);
});
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="relative h-52 overflow-hidden rounded-2xl border border-line bg-surface">
      <AnimatePresence mode="wait">
        <motion.div
          :key="page"
          :initial="{ opacity: 0, y: 14 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -14 }"
          :transition="{ duration: 0.35 }"
          class="flex h-full flex-col items-center justify-center"
        >
          <p class="text-2xl font-semibold tracking-tight">{{ Pages[page] }}</p>
          <p class="mt-1 text-xs text-muted">page {{ page + 1 }} of 2 — content swaps as the car lands</p>
        </motion.div>
      </AnimatePresence>
      <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
    <button
      class="mx-auto mt-3 block rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95"
      @click="race"
    >
      race to next page
    </button>
  </div>
</template>
