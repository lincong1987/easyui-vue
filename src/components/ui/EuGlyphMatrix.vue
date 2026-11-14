<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const GLYPHS = 'アイウエオカキクケコ01';
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
  const fontSize = 14;
  let cols = 0;
  let drops: number[] = [];
  const pointer = { x: -9999, y: -9999 };

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * (h / fontSize));
  };

  let last = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < 55) return;
    last = now;
    ctx.clearRect(0, 0, w, h);
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < cols; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const near = Math.abs(x - pointer.x) < 30 && Math.abs(y - pointer.y) < 60;
      ctx.fillStyle = near ? 'rgba(255,255,255,0.9)' : 'rgba(16,185,129,0.85)';
      ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y);
      ctx.fillStyle = 'rgba(16,185,129,0.35)';
      ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - fontSize);
      drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
    }
  };

  resize();
  raf = requestAnimationFrame(frame);
  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  };
  window.addEventListener('resize', resize);
  el.addEventListener('pointermove', onMove);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    el.removeEventListener('pointermove', onMove);
  };
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas ref="canvas" class="h-48 w-full rounded-2xl bg-black" aria-label="Matrix glyph rain" />
  </div>
</template>
