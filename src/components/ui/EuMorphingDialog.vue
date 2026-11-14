<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  title?: string;
  class?: string;
}>();

const open = ref(false);
const title = props.title ?? 'Morphing Dialog';
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <motion.button
      layout-id="morph-dialog"
      :transition="motionTransitions.springMorph"
      class="w-full cursor-pointer rounded-2xl border border-line bg-surface p-4 text-left shadow-sm transition-shadow hover:shadow-md"
      @click="open = true"
    >
      <p class="text-sm font-medium">{{ title }}</p>
      <p class="mt-1 text-sm text-muted">Click to expand — this card morphs into the dialog itself.</p>
    </motion.button>

    <AnimatePresence>
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="motionTransitions.easeSoft"
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="open = false"
        />
        <motion.div
          layout-id="morph-dialog"
          :transition="motionTransitions.springMorph"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          class="relative z-10 w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl"
        >
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-base font-semibold">{{ title }}</h3>
            <button
              aria-label="Close"
              class="rounded-full p-1 text-muted transition-colors hover:bg-card hover:text-fg"
              @click="open = false"
            >
              <XIcon :size="16" />
            </button>
          </div>
          <div class="mt-3 text-sm text-muted">
            <slot>The same surface that was tapped is now the dialog panel.</slot>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
