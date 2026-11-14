<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const PEOPLE = [
  { name: 'Rin', gradient: 'from-rose-400 to-orange-300' },
  { name: 'Kai', gradient: 'from-sky-400 to-indigo-400' },
  { name: 'Momo', gradient: 'from-emerald-400 to-teal-300' },
  { name: 'Jin', gradient: 'from-amber-400 to-rose-300' },
  { name: 'Ada', gradient: 'from-violet-400 to-fuchsia-300' },
];

const hovered = ref<number | null>(null);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <div class="flex items-center">
      <motion.div
        v-for="(person, i) in PEOPLE"
        :key="person.name"
        class="relative -ml-3 first:ml-0"
        :animate="{ zIndex: hovered === i ? 30 : i }"
        @pointerenter="hovered = i"
        @pointerleave="hovered = null"
      >
        <motion.span
          :animate="{ scale: hovered === i ? 1.18 : 1, y: hovered === i ? -6 : 0 }"
          :transition="motionTransitions.springResponsive"
          :class="cn(
            'flex h-11 w-11 items-center justify-center rounded-full border-2 border-bg bg-gradient-to-br text-xs font-bold text-white shadow-md',
            person.gradient,
          )"
        >
          {{ person.name }}
        </motion.span>
        <AnimatePresence>
          <motion.span
            v-if="hovered === i"
            key="tooltip"
            :initial="{ opacity: 0, y: 4, scale: 0.9 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :exit="{ opacity: 0, y: 4, scale: 0.9 }"
            :transition="motionTransitions.springSnappy"
            role="tooltip"
            class="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-fg px-2.5 py-1 text-[11px] font-medium text-bg shadow-md"
          >
            {{ person.name }}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span class="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-bg bg-card text-xs font-semibold text-muted shadow-md">
        +9
      </span>
    </div>
    <p class="text-xs text-muted">hover a face — it springs forward with a tooltip</p>
  </div>
</template>
