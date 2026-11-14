<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const canvas = ref<HTMLCanvasElement | null>(null);
let cleanup: (() => void) | null = null;

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext('2d');
  if (!ctx) return;
  let raf = 0;
  let w = 0;
  let h = 0;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const N = 150;
  const parts = Array.from({ length: N }, (_, i) => ({
    a: (i / N) * Math.PI * 2,
    r: 20 + Math.random() * 70,
    speed: 0.004 + Math.random() * 0.012,
    size: 0.8 + Math.random() * 1.6,
  }));
  let t = 0;

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
    t += 1;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const fg = getComputedStyle(el).color;
    ctx.fillStyle = fg;
    for (const p of parts) {
      p.a += p.speed;
      // breathe the radius with a slow pulse → "cognitive" deformation
      const wob = Math.sin(t * 0.02 + p.a * 3) * 8;
      const r = p.r + wob;
      const x = cx + Math.cos(p.a) * r;
      const y = cy + Math.sin(p.a) * r * 0.92;
      ctx.globalAlpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(p.a * 2 + t * 0.05));
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  resize();
  frame();
  window.addEventListener('resize', resize);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas
      ref="canvas"
      class="h-48 w-full rounded-2xl border border-line bg-surface text-fg"
      aria-label="Thinking orb vortex"
    />
  </div>
</template>
