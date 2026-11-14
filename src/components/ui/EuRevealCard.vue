<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    title?: string;
    body?: string;
    class?: string;
  }>(),
  {
    title: 'Aurora Frames',
    body: 'A 3D-tilt showcase card — the glare tracks your pointer and the hidden panel rises on hover.',
  },
);

const rx = useSpring(0, motionTransitions.springSoft);
const ry = useSpring(0, motionTransitions.springSoft);
const gx = useMotionValue(50);
const gy = useMotionValue(50);

const SPECS = ['Spec 1', 'Spec 2', 'Spec 3'];

function onMove(e: PointerEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  ry.set((px - 0.5) * 16);
  rx.set(-(py - 0.5) * 14);
  gx.set(px * 100);
  gy.set(py * 100);
}

function reset() {
  rx.set(0);
  ry.set(0);
  gx.set(50);
  gy.set(50);
}

const glare = useMotionTemplate`radial-gradient(220px circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 65%)`;
</script>

<template>
  <div :class="cn('w-full max-w-sm [perspective:900px]', props.class)">
    <motion.div
      :style="{ rotateX: rx, rotateY: ry }"
      class="group relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-lg [transform-style:preserve-3d]"
      @pointermove="onMove"
      @pointerleave="reset"
    >
      <motion.div aria-hidden :style="{ background: glare }" class="pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        class="h-28 rounded-2xl"
        style="background: linear-gradient(120deg, #312e81, #6366f1 45%, #22d3ee)"
      />
      <div class="relative mt-4" style="transform: translateZ(24px)">
        <p class="text-lg font-semibold tracking-tight">{{ props.title }}</p>
        <p class="mt-1 text-sm text-muted">{{ props.body }}</p>
        <motion.div :initial="false" :animate="{ height: 'auto', opacity: 1 }" class="mt-3 flex gap-2 overflow-hidden">
          <span
            v-for="s in SPECS"
            :key="s"
            class="translate-y-2 rounded-full border border-line bg-card px-2.5 py-1 text-[11px] text-muted opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >{{ s }}</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
</template>
