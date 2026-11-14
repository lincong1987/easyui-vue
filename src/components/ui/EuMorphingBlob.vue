<script setup lang="ts">
import { ref } from 'vue';
import { motion, useMotionValue, useSpring } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{ size?: number; color?: string; class?: string }>(),
  {
    size: 220,
    color: '#6366f1',
  },
);

const SHAPES = [
  '62% 38% 46% 54% / 54% 48% 52% 46%',
  '38% 62% 63% 37% / 41% 44% 56% 59%',
  '61% 39% 34% 66% / 62% 37% 63% 38%',
  '35% 65% 55% 45% / 56% 60% 40% 44%',
];
const REVERSED_SHAPES = [...SHAPES].reverse();

const el = ref<HTMLDivElement | null>(null);
const mx = useMotionValue(0);
const my = useMotionValue(0);
const x = useSpring(mx, motionTransitions.springSoft);
const y = useSpring(my, motionTransitions.springSoft);

function onMove(e: PointerEvent) {
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 34);
  my.set(((e.clientY - rect.top) / rect.height - 0.5) * 34);
}

function onLeave() {
  mx.set(0);
  my.set(0);
}
</script>

<template>
  <div
    ref="el"
    :class="cn('flex items-center justify-center', props.class)"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <motion.div
      aria-hidden="true"
      :style="{ width: `${props.size}px`, height: `${props.size}px`, x, y }"
      class="relative"
    >
      <motion.div
        class="absolute inset-0 opacity-25 blur-2xl"
        :style="{ background: props.color }"
        :animate="{ borderRadius: SHAPES }"
        :transition="{ duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.33, 0.66, 1] }"
      />
      <motion.div
        class="absolute inset-2"
        :style="{ background: `linear-gradient(135deg, ${props.color}, ${props.color}55)` }"
        :animate="{ borderRadius: REVERSED_SHAPES }"
        :transition="{ duration: 11, repeat: Infinity, ease: 'easeInOut', times: [0, 0.33, 0.66, 1] }"
      />
    </motion.div>
  </div>
</template>
