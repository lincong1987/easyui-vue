<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const TILES = ['A', 'B', 'C', 'D', 'E', 'F'];
const RADIUS = 92;

const ring = ref<HTMLDivElement | null>(null);
let cleanup: (() => void) | null = null;

onMounted(() => {
  let raf = 0;
  let angle = 0;
  const tick = () => {
    angle += 0.008;
    const el = ring.value;
    if (el) {
      el.style.transform = `rotate(${angle}rad)`;
      const tiles = el.children;
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i] as HTMLElement;
        const a = angle + (i / TILES.length) * Math.PI * 2;
        // counter-rotate so tiles stay upright
        tile.style.transform = `translate(${Math.cos(a) * RADIUS}px, ${Math.sin(a) * RADIUS}px) rotate(${-angle}rad)`;
      }
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  cleanup = () => cancelAnimationFrame(raf);
});

onUnmounted(() => cleanup?.());
</script>

<template>
  <div :class="cn('flex h-64 w-full items-center justify-center', props.class)">
    <div class="relative">
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p class="text-lg font-semibold tracking-tight">Orbit</p>
        <p class="text-[10px] text-muted">single rAF · no re-renders</p>
      </div>
      <div ref="ring" class="relative h-8 w-8">
        <div
          v-for="(t, i) in TILES"
          :key="t"
          class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-line bg-surface text-xs font-bold text-fg shadow-md"
          :style="{ marginLeft: i === 0 ? '0px' : undefined }"
        >
          {{ t }}
        </div>
      </div>
    </div>
  </div>
</template>
