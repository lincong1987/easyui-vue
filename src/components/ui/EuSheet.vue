<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion, type PanInfo } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

type Side = 'bottom' | 'right';

const SECTIONS = ['Readable', 'Transferable', 'In-place'];

const open = ref<Side | null>(null);

function dismissFromBottom(_event: unknown, info: PanInfo) {
  if (info.offset.y > 90 || info.velocity.y > 400) open.value = null;
}

function dismissFromRight(_event: unknown, info: PanInfo) {
  if (info.offset.x > 90 || info.velocity.x > 400) open.value = null;
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="flex justify-center gap-2.5">
      <button
        class="rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-sm transition-shadow hover:shadow-md"
        @click="open = 'bottom'"
      >
        Bottom sheet
      </button>
      <button
        class="rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-sm transition-shadow hover:shadow-md"
        @click="open = 'right'"
      >
        Right drawer
      </button>
    </div>

    <AnimatePresence>
      <div v-if="open" key="sheet" class="fixed inset-0 z-50">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="motionTransitions.easeFast"
          class="absolute inset-0 bg-black/40"
          @click="open = null"
        />

        <motion.div
          v-if="open === 'bottom'"
          key="bottom"
          role="dialog"
          aria-modal="true"
          aria-label="Bottom sheet"
          :initial="{ y: '100%' }"
          :animate="{ y: 0 }"
          :exit="{ y: '100%' }"
          :transition="motionTransitions.springMorph"
          drag="y"
          :drag-constraints="{ top: 0, bottom: 0 }"
          :drag-elastic="{ top: 0, bottom: 0.6 }"
          class="absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-3xl border-t border-line bg-surface p-5 shadow-2xl"
          @drag-end="dismissFromBottom"
        >
          <div class="mx-auto h-1.5 w-12 rounded-full bg-line" />
          <h3 class="mt-4 text-base font-semibold">Bottom sheet</h3>
          <p class="mt-1 text-sm text-muted">
            Drag the handle area downward to dismiss — it springs back if you let go early.
          </p>
        </motion.div>

        <motion.div
          v-else
          key="right"
          role="dialog"
          aria-modal="true"
          aria-label="Right drawer"
          :initial="{ x: '100%' }"
          :animate="{ x: 0 }"
          :exit="{ x: '100%' }"
          :transition="motionTransitions.springMorph"
          drag="x"
          :drag-constraints="{ left: 0, right: 0 }"
          :drag-elastic="{ left: 0.6, right: 0 }"
          class="absolute inset-y-0 right-0 w-80 max-w-[85vw] border-l border-line bg-surface p-5 shadow-2xl"
          @drag-end="dismissFromRight"
        >
          <h3 class="text-base font-semibold">Right drawer</h3>
          <p class="mt-1 text-sm text-muted">Drag to the right to dismiss.</p>
          <div class="mt-4 space-y-2">
            <div
              v-for="section in SECTIONS"
              :key="section"
              class="rounded-xl border border-line px-3 py-2 text-sm text-muted"
            >
              {{ section }}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
