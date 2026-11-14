<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ gap?: number; class?: string }>(), {
  gap: 22,
});

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
  const pointer = { x: -9999, y: -9999 };
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
    t += 0.03;
    ctx.clearRect(0, 0, w, h);
    const fg = getComputedStyle(el).color;
    for (let x = props.gap / 2; x < w; x += props.gap) {
      for (let y = props.gap / 2; y < h; y += props.gap) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const repel = d < 90 ? (1 - d / 90) * 16 : 0;
        const wave = Math.sin(x / 60 + t) * 1.6 + Math.cos(y / 70 + t * 0.8) * 1.6;
        const px = x + (d > 0 ? (dx / d) * repel : 0);
        const py = y + (d > 0 ? (dy / d) * repel : 0) + wave;
        const glow = d < 130 ? 1 - d / 130 : 0;
        ctx.globalAlpha = Math.min(1, 0.14 + glow * 0.8);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(px, py, 1.3 + glow * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  };
  const onLeave = () => {
    pointer.x = -9999;
    pointer.y = -9999;
  };

  resize();
  frame();
  window.addEventListener('resize', resize);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
  };
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas
      ref="canvas"
      class="h-48 w-full rounded-2xl border border-line bg-surface text-fg"
      aria-label="Interactive dot shader field"
    />
  </div>
</template>
