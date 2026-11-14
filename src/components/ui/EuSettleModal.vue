<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    title?: string;
    class?: string;
  }>(),
  { title: 'Settle Modal' },
);

const open = ref(false);

const settleTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
const bodyTransition = { delay: 0.12, ...motionTransitions.easeSoft };
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <button
      type="button"
      class="rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-sm transition-shadow hover:shadow-md"
      @click="open = true"
    >
      Open settle modal
    </button>

    <AnimatePresence>
      <div v-if="open" key="settle-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="motionTransitions.easeSoft"
          class="absolute inset-0 bg-black/40"
          @click="open = false"
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          :aria-label="props.title"
          :initial="{ scale: 0.94, y: 14, opacity: 0 }"
          :animate="{ scale: [0.94, 1.02, 1], y: [14, -2, 0], opacity: 1 }"
          :exit="{ scale: 0.96, y: 8, opacity: 0 }"
          :transition="settleTransition"
          class="relative z-10 w-full max-w-sm rounded-3xl border border-line bg-surface p-6 shadow-2xl"
        >
          <div class="flex items-start justify-between">
            <h3 class="text-base font-semibold">{{ props.title }}</h3>
            <button
              aria-label="Close"
              class="rounded-full p-1 text-muted transition-colors hover:bg-card hover:text-fg"
              @click="open = false"
            >
              <XIcon :size="16" />
            </button>
          </div>
          <motion.div
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="bodyTransition"
            class="mt-3 text-sm text-muted"
          >
            <slot>The panel lands with a two-stage settle; the body content arrives a beat later.</slot>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
