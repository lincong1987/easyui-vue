<script setup lang="ts">
import { ref } from 'vue';
import { motion, useSpring } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const el = ref<HTMLDivElement | null>(null);
const angle = useSpring(0, { stiffness: 70, damping: 7, mass: 0.9 });

const kick = (dir: number) => angle.set(dir * 20);

function onMove(e: PointerEvent) {
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  kick(e.clientX < rect.left + rect.width / 2 ? -1 : 1);
}
</script>

<template>
  <div ref="el" :class="cn('flex flex-col items-center', props.class)" @pointermove="onMove">
    <div class="h-10 w-px bg-line" />
    <motion.div :style="{ rotate: angle, transformOrigin: '50% 0%' }" class="relative flex flex-col items-center">
      <!-- string -->
      <div class="h-14 w-px bg-line" />
      <div class="relative flex items-end gap-1">
        <!-- green chilli -->
        <motion.div
          :animate="{ rotate: [-4, 4, -4] }"
          :transition="{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }"
          class="h-16 w-4 rounded-b-full rounded-t-md bg-gradient-to-b from-emerald-500 to-emerald-700"
        />
        <!-- lemon -->
        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[0_10px_20px_rgba(0,0,0,0.25)]" />
        <!-- red chilli -->
        <motion.div
          :animate="{ rotate: [4, -5, 4] }"
          :transition="{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }"
          class="h-16 w-4 rounded-b-full rounded-t-md bg-gradient-to-b from-red-500 to-red-700"
        />
      </div>
      <div class="mt-1 h-3 w-3 rounded-full border-2 border-line bg-surface" />
    </motion.div>
    <p class="mt-4 text-xs text-muted">ward off bugs · swing it with the pointer</p>
  </div>
</template>
