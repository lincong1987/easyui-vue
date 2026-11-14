<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
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
  const stars: Star[] = [];
  const twinkles = Array.from({ length: 90 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.4 + Math.random() * 1.1,
    phase: i * 0.7,
    speed: 0.6 + Math.random() * 1.4,
  }));

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const spawn = () => {
    const fromLeft = Math.random() > 0.5;
    const speed = 5 + Math.random() * 4;
    const angle = fromLeft ? Math.PI * 0.82 + Math.random() * 0.12 : Math.PI * 0.06 + Math.random() * 0.12;
    stars.push({
      x: fromLeft ? -40 : w + 40,
      y: Math.random() * h * 0.5,
      vx: Math.cos(angle) * speed * (fromLeft ? -1 : 1),
      vy: Math.abs(Math.sin(angle) * speed),
      len: 60 + Math.random() * 70,
      life: 1,
      maxLife: 1,
    });
  };

  let t = 0;
  let nextSpawn = 40;
  const frame = () => {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);
    // nebula washes
    const g1 = ctx.createRadialGradient(w * 0.75, h * 0.2, 10, w * 0.75, h * 0.2, w * 0.5);
    g1.addColorStop(0, 'rgba(99,102,241,0.16)');
    g1.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);
    const g2 = ctx.createRadialGradient(w * 0.2, h * 0.8, 10, w * 0.2, h * 0.8, w * 0.45);
    g2.addColorStop(0, 'rgba(34,211,238,0.12)');
    g2.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    const fg = getComputedStyle(el).color;
    ctx.fillStyle = fg;
    for (const s of twinkles) {
      ctx.globalAlpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * s.speed * 2 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (--nextSpawn <= 0) {
      spawn();
      nextSpawn = 50 + Math.random() * 90;
    }
    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.012;
      const off = s.x < -80 || s.x > w + 80 || s.y > h + 60 || s.life <= 0;
      if (off) {
        stars.splice(i, 1);
        continue;
      }
      const tx = s.x - s.vx * (s.len / 6);
      const ty = s.y - s.vy * (s.len / 6);
      const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
      grad.addColorStop(0, `rgba(255,255,255,${0.9 * s.life})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.globalAlpha = s.life;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  };

  resize();
  frame();
  const onResize = () => resize();
  window.addEventListener('resize', onResize);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
  };
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <canvas ref="canvas" class="h-48 w-full rounded-2xl" aria-label="Shooting stars sky" />
  </div>
</template>
