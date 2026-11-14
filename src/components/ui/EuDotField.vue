<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ gap?: number; class?: string }>(), {
  gap: 18,
});

const canvas = ref<HTMLCanvasElement | null>(null);
let cleanup: (() => void) | null = null;

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const draw = () => {
    const rect = el.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const fg = getComputedStyle(el).color;
    for (let x = props.gap / 2; x < w; x += props.gap) {
      for (let y = props.gap / 2; y < h; y += props.gap) {
        const f = 1 - (x / w) * 0.55 - (y / h) * 0.25;
        ctx.globalAlpha = Math.max(0.06, f);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  draw();
  const ro = new ResizeObserver(draw);
  ro.observe(el);
  cleanup = () => ro.disconnect();
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas ref="canvas" class="h-44 w-full rounded-2xl" aria-label="Dot field background" />
  </div>
</template>
