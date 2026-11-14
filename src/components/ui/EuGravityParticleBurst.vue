<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);
const particleCount = ref(0);
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

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const burst = (x: number, y: number) => {
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 4.5;
      parts.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 2.4,
        r: 1.5 + Math.random() * 2.5,
        hue: 200 + Math.random() * 120,
        life: 1,
      });
    }
    particleCount.value = parts.length;
  };

  const frame = () => {
    raf = requestAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vy += 0.14; // gravity
      p.vx *= 0.99; // friction
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > h - p.r) {
        p.y = h - p.r;
        p.vy *= -0.55; // bounce with damping
      }
      p.life -= 0.008;
      if (p.life <= 0) {
        parts.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = `hsl(${p.hue} 85% 62%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    particleCount.value = parts.length;
  };

  resize();
  frame();
  const onDown = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    burst(e.clientX - rect.left, e.clientY - rect.top);
  };
  window.addEventListener('resize', resize);
  el.addEventListener('pointerdown', onDown);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    el.removeEventListener('pointerdown', onDown);
  };
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas
      ref="canvas"
      class="h-48 w-full rounded-2xl border border-line bg-surface"
      aria-label="Gravity particle playground"
    />
    <p class="mt-1 text-center text-[10px] text-muted">
      click to burst · {{ particleCount }} particles airborne
    </p>
  </div>
</template>
