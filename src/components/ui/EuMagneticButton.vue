<script setup lang="ts">
import { ref } from 'vue';
import { motion, useMotionValue, useSpring } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    class?: string;
    /** Pull strength, 0–1. */
    strength?: number;
  }>(),
  { strength: 0.35 },
);

const emit = defineEmits<{ click: [] }>();

const el = ref<HTMLButtonElement | null>(null);
const x = useMotionValue(0);
const y = useMotionValue(0);
const sx = useSpring(x, motionTransitions.springResponsive);
const sy = useSpring(y, motionTransitions.springResponsive);

function onMove(e: PointerEvent) {
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  x.set((e.clientX - (rect.left + rect.width / 2)) * props.strength);
  y.set((e.clientY - (rect.top + rect.height / 2)) * props.strength);
}

function reset() {
  x.set(0);
  y.set(0);
}
</script>

<template>
  <motion.button
    ref="el"
    type="button"
    :style="{ x: sx, y: sy }"
    :while-press="{ scale: 0.96 }"
    :class="
      cn(
        'inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg',
        'transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
        props.class,
      )
    "
    @pointermove="onMove"
    @pointerleave="reset"
    @click="emit('click')"
  >
    <slot />
  </motion.button>
</template>
