<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const open = ref(true);
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <button
        :aria-expanded="open"
        class="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors hover:bg-card"
        @click="open = !open"
      >
        Unfold me
        <motion.span
          :animate="{ rotate: open ? 180 : 0, y: open ? 2 : 0 }"
          :transition="motionTransitions.springSnappy"
          class="text-muted"
        >
          <ChevronDownIcon :size="15" />
        </motion.span>
      </button>
      <AnimatePresence :initial="false">
        <motion.div
          v-if="open"
          key="unfold-panel"
          :initial="{ height: 0, opacity: 0 }"
          :animate="{ height: 'auto', opacity: 1 }"
          :exit="{ height: 0, opacity: 0 }"
          :transition="motionTransitions.springGentle"
          class="overflow-hidden"
        >
          <motion.div
            :initial="{ y: -8, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: -8, opacity: 0 }"
            :transition="motionTransitions.easeSoft"
            class="border-t border-line/70 px-4 py-3 text-sm text-muted"
          >
            The chevron and the spacing move together — one fluid motion instead of a fade.
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
    <p class="mt-2 text-center text-[10px] text-muted">chevron rotation + panel height + inner slide, one choreography</p>
  </div>
</template>
