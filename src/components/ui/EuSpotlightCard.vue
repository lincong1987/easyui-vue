<script setup lang="ts">
import { ref } from 'vue';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{
  radius?: number;
  color?: string;
  class?: string;
}>();

const el = ref<HTMLDivElement | null>(null);
const reduced = useReducedMotion();
const px = useMotionValue(-1000);
const py = useMotionValue(-1000);

function onMove(e: PointerEvent) {
  if (reduced.value) return;
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  px.set(e.clientX - rect.left);
  py.set(e.clientY - rect.top);
}

function onLeave() {
  px.set(-1000);
  py.set(-1000);
}

const radius = props.radius ?? 260;
const color = props.color ?? '99, 102, 241';

const inner = useMotionTemplate`radial-gradient(${radius}px circle at ${px}px ${py}px, rgba(${color}, 0.14), transparent 72%)`;
const border = useMotionTemplate`radial-gradient(${radius}px circle at ${px}px ${py}px, rgba(${color}, 0.55), transparent 70%)`;
</script>

<template>
  <div
    ref="el"
    :class="cn(
      'group relative isolate overflow-hidden rounded-[22px]',
      'border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]',
      'p-6 transition-colors',
      props.class,
    )"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <motion.div
      aria-hidden
      :style="{ background: border }"
      class="pointer-events-none absolute inset-0 -z-10 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
    <div aria-hidden class="pointer-events-none absolute inset-[1px] -z-10 rounded-[21px] bg-bg" />
    <motion.div
      aria-hidden
      :style="{ background: inner }"
      class="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
    <slot />
  </div>
</template>
