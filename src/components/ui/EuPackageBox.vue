<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const FACE = 'absolute inset-0 border border-amber-800/40 bg-gradient-to-br from-amber-200 to-amber-400';

const open = ref(false);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-5', props.class)">
    <div class="relative h-44 w-44 [perspective:800px]">
      <motion.div
        class="relative h-full w-full [transform-style:preserve-3d]"
        :animate="{ rotateX: open ? -18 : 0, rotateY: 0 }"
        :transition="motionTransitions.springGentle"
      >
        <div
          :class="
            cn(
              FACE,
              'left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 [transform:rotateX(-90deg)_translateZ(48px)]',
            )
          "
        />
        <div :class="cn(FACE, 'left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-80')" />

        <motion.div
          :class="cn(FACE, 'left-1/2 top-1/2 h-24 w-28 -translate-x-1/2 [transform-origin:top]')"
          :animate="{ rotateX: open ? -160 : 0 }"
          :transition="motionTransitions.springGentle"
          style="transform: translate(-50%, -100%)"
        />
        <motion.div
          :class="cn(FACE, 'left-1/2 top-1/2 h-24 w-28 -translate-x-1/2 opacity-90 [transform-origin:bottom]')"
          :animate="{ rotateX: open ? 160 : 0 }"
          :transition="motionTransitions.springGentle"
          style="transform: translate(-50%, 0%)"
        />
      </motion.div>

      <AnimatePresence>
        <motion.div
          v-if="open"
          key="slip"
          :initial="{ y: 30, opacity: 0, rotate: -6 }"
          :animate="{ y: -46, opacity: 1, rotate: -6 }"
          :exit="{ y: 30, opacity: 0 }"
          :transition="motionTransitions.springMorph"
          class="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 rounded-md border border-line bg-surface p-2 text-[8px] leading-snug text-muted shadow-xl"
        >
          <p class="text-[9px] font-semibold text-fg">PACKING SLIP</p>
          <p>1× EasyUI Pro</p>
          <p>1× Motion tokens</p>
          <p>66× components</p>
          <p class="mt-1 border-t border-line pt-1">Handle with care</p>
        </motion.div>
      </AnimatePresence>
    </div>

    <button
      class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95"
      @click="open = !open"
    >
      {{ open ? 'close box' : 'open box' }}
    </button>
  </div>
</template>
