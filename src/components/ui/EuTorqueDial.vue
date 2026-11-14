<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { motion, useMotionValue, useSpring } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const dialEl = ref<HTMLDivElement | null>(null);

const angle = useMotionValue(0);
const display = useSpring(angle, { stiffness: 260, damping: 26, mass: 0.6 });

const drag = { active: false, last: 0, velocity: 0 };
let raf = 0;
let lastAria = 0;

function angleOf(e: PointerEvent) {
  const el = dialEl.value;
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  return (
    (Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180) /
    Math.PI
  );
}

function onDown(e: PointerEvent) {
  drag.active = true;
  drag.last = angleOf(e);
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
}

function onMove(e: PointerEvent) {
  if (!drag.active) return;
  const a = angleOf(e);
  let d = a - drag.last;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  drag.last = a;
  angle.set(angle.get() + d);
  drag.velocity = d * 0.9;
}

function onRelease() {
  drag.active = false;
}

onMounted(() => {
  let lastT = performance.now();
  const tick = (now: number) => {
    const dt = Math.max(1, now - lastT);
    lastT = now;
    if (!drag.active) {
      // exponential friction decay
      drag.velocity *= Math.pow(0.994, dt);
      if (Math.abs(drag.velocity) > 0.01) angle.set(angle.get() + drag.velocity * dt);
    }
    const deg = Math.round(((display.get() % 360) + 360) % 360);
    if (deg !== lastAria) {
      lastAria = deg;
      dialEl.value?.setAttribute('aria-valuenow', String(deg));
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
});

onUnmounted(() => cancelAnimationFrame(raf));
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <div
      ref="dialEl"
      class="relative h-44 w-44 cursor-grab touch-none select-none rounded-full border border-line bg-surface shadow-lg active:cursor-grabbing"
      role="slider"
      aria-label="Torque dial"
      :aria-valuenow="0"
      :aria-valuemin="0"
      :aria-valuemax="360"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onRelease"
      @pointercancel="onRelease"
    >
      <motion.div :style="{ rotate: display }" class="absolute inset-0">
        <span class="absolute left-1/2 top-3 h-8 w-1 -translate-x-1/2 rounded-full bg-fg" />
        <span class="absolute inset-6 rounded-full border-2 border-dashed border-line" />
        <span class="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg" />
      </motion.div>
    </div>
    <p class="text-xs text-muted tabular-nums">fling it — momentum decays with friction</p>
  </div>
</template>
