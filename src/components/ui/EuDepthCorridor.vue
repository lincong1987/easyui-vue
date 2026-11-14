<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const LAYERS = [
  { label: 'L4 · distant', tint: '#c7d2fe' },
  { label: 'L3', tint: '#a5b4fc' },
  { label: 'L2', tint: '#818cf8' },
  { label: 'L1 · near', tint: '#6366f1' },
];

const tiltSpring = { type: 'spring', stiffness: 120, damping: 18 } as const;

const tilt = ref({ x: 0, y: 0 });

function onMove(e: PointerEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  tilt.value = {
    x: ((e.clientY - rect.top) / rect.height - 0.5) * -10,
    y: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
  };
}

function onLeave() {
  tilt.value = { x: 0, y: 0 };
}
</script>

<template>
  <div
    :class="cn('flex h-64 w-full items-center justify-center [perspective:900px]', props.class)"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <motion.div
      :animate="{ rotateX: 58 + tilt.x, rotateZ: tilt.y }"
      :transition="tiltSpring"
      class="relative h-40 w-40 [transform-style:preserve-3d]"
    >
      <div
        v-for="(l, i) in LAYERS"
        :key="l.label"
        :class="
          cn(
            'absolute inset-0 flex items-center justify-center rounded-2xl border border-white/40 text-[10px] font-semibold text-indigo-950/70',
            i === LAYERS.length - 1 && 'shadow-[0_25px_50px_rgba(79,70,229,0.35)]',
          )
        "
        :style="{ background: l.tint, transform: `translateZ(${i * 34}px)`, opacity: 0.55 + i * 0.15 }"
      >
        {{ l.label }}
      </div>
    </motion.div>
  </div>
</template>
