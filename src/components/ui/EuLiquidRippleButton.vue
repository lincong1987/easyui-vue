<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
const emit = defineEmits<{ click: [] }>();

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const el = ref<HTMLButtonElement | null>(null);
const ripples = ref<Ripple[]>([]);
const timers = new Set<number>();

function spawn(e: PointerEvent) {
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  const id = Date.now() + Math.random();
  ripples.value = [...ripples.value, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }];
  const timer = window.setTimeout(() => {
    ripples.value = ripples.value.filter((p) => p.id !== id);
    timers.delete(timer);
  }, 700);
  timers.add(timer);
}

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t));
  timers.clear();
});
</script>

<template>
  <button
    ref="el"
    type="button"
    :class="
      cn(
        'relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg',
        'transition-transform active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
        props.class,
      )
    "
    @pointerdown="spawn"
    @click="emit('click')"
  >
    <AnimatePresence>
      <motion.span
        v-for="r in ripples"
        :key="r.id"
        :initial="{ opacity: 0.45, scale: 0 }"
        :animate="{ opacity: 0, scale: 2.6 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.65, ease: 'easeOut' }"
        :style="{ left: r.x + 'px', top: r.y + 'px' }"
        class="pointer-events-none absolute -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
      />
    </AnimatePresence>
    <motion.span
      aria-hidden
      :animate="{ y: [0, 1.5, 0] }"
      :transition="{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }"
      class="absolute inset-0 -z-20 bg-gradient-to-b from-transparent via-white/5 to-transparent"
    />
    <slot />
  </button>
</template>
