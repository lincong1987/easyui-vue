<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface Star {
  x: number;
  y: number;
  z: number;
}

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
  let stars: Star[] = [];
  const COUNT = 220;

  const reset = (s: Star) => {
    s.x = (Math.random() - 0.5) * w;
    s.y = (Math.random() - 0.5) * h;
    s.z = Math.random() * w;
  };

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: COUNT }, () => {
      const s: Star = { x: 0, y: 0, z: 0 };
      reset(s);
      return s;
    });
  };

  let speed = 3;
  const frame = () => {
    raf = requestAnimationFrame(frame);
    ctx.fillStyle = 'rgba(2, 2, 8, 0.4)';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    for (const s of stars) {
      s.z -= speed;
      if (s.z < 1) reset(s);
      const px = cx + (s.x / s.z) * 120;
      const py = cy + (s.y / s.z) * 120;
      const pz = cx + (s.x / (s.z + speed * 6)) * 120;
      const py2 = cy + (s.y / (s.z + speed * 6)) * 120;
      const r = Math.max(0.4, (1 - s.z / w) * 2.2);
      ctx.strokeStyle = `rgba(255,255,255,${(1 - s.z / w) * 0.9})`;
      ctx.lineWidth = r;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(pz, py2);
      ctx.stroke();
    }
  };

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    speed = 3 + Math.min(14, Math.abs(e.clientX - rect.left - rect.width / 2) / 30);
  };

  resize();
  frame();
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
    <canvas ref="canvas" class="h-48 w-full rounded-2xl bg-[#020208]" aria-label="Warp speed starfield" />
    <p class="mt-1 text-center text-[10px] text-muted">pointer offset raises the warp factor</p>
  </div>
</template>
