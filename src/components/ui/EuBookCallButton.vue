<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const hover = ref(false);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <motion.button
      type="button"
      :animate="{ width: hover ? 168 : 148 }"
      :transition="motionTransitions.springMorph"
      class="relative flex h-12 items-center justify-start overflow-hidden rounded-full border border-emerald-600/30 bg-surface px-1.5 shadow-sm"
      aria-label="Book a call"
      @pointerenter="hover = true"
      @pointerleave="hover = false"
      @click="hover = !hover"
    >
      <motion.span
        :animate="{ width: hover ? 152 : 116 }"
        :transition="motionTransitions.springMorph"
        class="flex h-9 items-center justify-between rounded-full bg-emerald-600 px-3.5"
      >
        <span class="flex items-center gap-2 text-xs font-semibold text-white">
          <span class="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-white/70 text-[9px]">↗</span>
          <motion.span
            :animate="{ opacity: hover ? 0 : 1, width: hover ? 0 : 'auto' }"
            class="overflow-hidden whitespace-nowrap"
          >Book a call</motion.span>
        </span>
        <motion.span
          :animate="{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }"
          :transition="motionTransitions.springSnappy"
          class="text-base leading-none text-white"
        >✆</motion.span>
      </motion.span>
      <AnimatePresence>
        <motion.span
          v-if="hover"
          key="ringing"
          :initial="{ opacity: 0, x: -6 }"
          :animate="{ opacity: [0.4, 1, 0.4], x: 0 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 1.1, repeat: Infinity }"
          class="absolute right-4 text-emerald-700"
        >((·))</motion.span>
      </AnimatePresence>
    </motion.button>
    <p class="text-xs text-muted">hover — the capsule fills the pill, label slides out</p>
  </div>
</template>
