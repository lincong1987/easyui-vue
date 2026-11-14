<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ density?: number; class?: string }>(), {
  density: 90,
});

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  shape: 0 | 1 | 2;
}

interface Burst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
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
  const parts: P[] = [];
  const bursts: Burst[] = [];
  const pointer = { x: -9999, y: -9999 };

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const seed = () => {
    parts.length = 0;
    for (let i = 0; i < props.density; i++) {
      parts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        shape: (i % 3) as 0 | 1 | 2,
      });
    }
  };

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  };
  const onDown = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const bx = e.clientX - rect.left;
    const by = e.clientY - rect.top;
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      bursts.push({ x: bx, y: by, vx: Math.cos(a) * 2.4, vy: Math.sin(a) * 2.4, life: 1 });
    }
  };

  let t = 0;
  const frame = () => {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);
    const fg = getComputedStyle(el).color;
    ctx.fillStyle = fg;
    ctx.strokeStyle = fg;
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 3600) {
        const d = Math.sqrt(d2) || 1;
        p.x += (dx / d) * 1.6;
        p.y += (dy / d) * 1.6;
      }
      if (p.x < -4) p.x = w + 4;
      if (p.x > w + 4) p.x = -4;
      if (p.y < -4) p.y = h + 4;
      if (p.y > h + 4) p.y = -4;
      const tw = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 2.2 + p.phase));
      ctx.globalAlpha = tw;
      if (p.shape === 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 1) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        ctx.restore();
      } else {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - p.size * 2, p.y);
        ctx.lineTo(p.x + p.size * 2, p.y);
        ctx.moveTo(p.x, p.y - p.size * 2);
        ctx.lineTo(p.x, p.y + p.size * 2);
        ctx.stroke();
      }
    }
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.96;
      b.vy *= 0.96;
      b.life -= 0.03;
      if (b.life <= 0) {
        bursts.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = b.life;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  };

  const onResize = () => {
    resize();
    seed();
  };

  resize();
  seed();
  frame();
  window.addEventListener('resize', onResize);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerdown', onDown);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerdown', onDown);
  };
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas ref="canvas" class="h-48 w-full rounded-2xl text-fg" aria-label="Sparkles particle field" />
    <p class="mt-1 text-center text-[10px] text-muted">click for a burst · particles flee the cursor</p>
  </div>
</template>
