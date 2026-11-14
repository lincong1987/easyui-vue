<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const x = useMotionValue(-100);
const y = useMotionValue(-100);
const sx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
const sy = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });
const scale = useMotionValue(1);
const sscale = useSpring(scale, motionTransitions.springSnappy);
const hovering = ref(false);

function move(e: PointerEvent) {
  x.set(e.clientX);
  y.set(e.clientY);
}
function down() {
  scale.set(0.82);
}
function up() {
  scale.set(1);
}

onMounted(() => {
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerdown', down);
  window.addEventListener('pointerup', up);
});
onUnmounted(() => {
  window.removeEventListener('pointermove', move);
  window.removeEventListener('pointerdown', down);
  window.removeEventListener('pointerup', up);
});
</script>

<template>
  <div
    :class="cn('relative min-h-[220px]', props.class)"
    @pointerenter="hovering = true"
    @pointerleave="hovering = false"
  >
    <AnimatePresence>
      <motion.div
        v-if="hovering"
        aria-hidden
        :initial="{ opacity: 0, scale: 0.6 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.6 }"
        :transition="motionTransitions.springSnappy"
        :style="{ x: sx, y: sy, scale: sscale }"
        class="pointer-events-none fixed left-0 top-0 z-50 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-fg/85 text-bg shadow-lg backdrop-blur-sm"
      >
        <slot />
      </motion.div>
    </AnimatePresence>
    <div class="flex h-full min-h-[220px] items-center justify-center text-sm text-muted">
      Move the pointer — the orb follows on a spring.
    </div>
  </div>
</template>
