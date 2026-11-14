<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

export type MorphingButtonState = 'idle' | 'loading' | 'success' | 'error';

const props = withDefaults(defineProps<{ label?: string; class?: string }>(), {
  label: 'Save changes',
});

const CYCLE: MorphingButtonState[] = ['idle', 'loading', 'success', 'error'];

const state = ref<MorphingButtonState>('idle');

function advance() {
  state.value = CYCLE[(CYCLE.indexOf(state.value) + 1) % CYCLE.length];
}
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'relative inline-flex h-11 w-44 items-center justify-center rounded-full bg-fg text-sm font-medium text-bg',
        'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
        state === 'success' && 'bg-emerald-600 text-white dark:bg-emerald-500',
        state === 'error' && 'bg-red-600 text-white dark:bg-red-500',
        props.class,
      )
    "
    @click="advance"
  >
    <AnimatePresence mode="wait" :initial="false">
      <motion.span
        v-if="state === 'idle'"
        key="idle"
        :initial="{ opacity: 0, y: 6 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -6 }"
        :transition="motionTransitions.easeFast"
      >{{ props.label }}</motion.span>
      <motion.span
        v-else-if="state === 'loading'"
        key="loading"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="motionTransitions.easeFast"
        class="absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          class="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 0.7, repeat: Infinity, ease: 'linear' }"
        />
      </motion.span>
      <motion.span
        v-else-if="state === 'success'"
        key="success"
        :initial="{ scale: 0.4, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :exit="{ scale: 0.6, opacity: 0 }"
        :transition="motionTransitions.springResponsive"
      >
        <CheckIcon :size="18" />
      </motion.span>
      <motion.span
        v-else
        key="error"
        :initial="{ x: -4, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :exit="{ x: 4, opacity: 0 }"
        :transition="motionTransitions.springSnappy"
      >
        <XIcon :size="18" />
      </motion.span>
    </AnimatePresence>
  </button>
</template>
