<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion-v';
import type { PanInfo } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { BellIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const NOTES = [
  { id: 1, title: 'Deploy finished', body: 'main → production in 42s', icon: '🚀' },
  { id: 2, title: 'New mention', body: 'kai tagged you in #design', icon: '💬' },
  { id: 3, title: 'Star milestone', body: '290 stars on the repo', icon: '⭐' },
];

const notes = ref([...NOTES]);
const x = useMotionValue(0);
const sx = useSpring(x, motionTransitions.springSnappy);

function dismiss(id: number) {
  notes.value = notes.value.filter((p) => p.id !== id);
}

function receive() {
  const id = Date.now();
  notes.value = [
    { id, title: 'Fresh ping', body: `arrived at ${new Date().toLocaleTimeString('en-GB')}`, icon: '🔔' },
    ...notes.value,
  ].slice(0, 3);
}

const cards = computed(() =>
  notes.value.map((note, i) => {
    const depth = notes.value.length - 1 - i;
    return {
      note,
      depth,
      zIndex: notes.value.length - depth,
      onDragEnd: (_event: PointerEvent, info: PanInfo) => {
        if (depth === 0 && Math.abs(info.offset.x) > 80) dismiss(note.id);
      },
    };
  }),
);
</script>

<template>
  <div :class="cn('flex w-full max-w-sm flex-col items-center gap-4', props.class)">
    <div class="relative h-44 w-full">
      <AnimatePresence :initial="false">
        <motion.div
          v-for="card in cards"
          :key="card.note.id"
          :layout="true"
          :initial="{ y: -30, opacity: 0, scale: 0.9 }"
          :animate="{ y: card.depth * -12, scale: 1 - card.depth * 0.05, opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -160, scale: 0.9 }"
          :transition="motionTransitions.springMorph"
          drag="x"
          :drag-constraints="{ left: 0, right: 0 }"
          :drag-elastic="0.9"
          :style="{ x: card.depth === 0 ? sx : 0, zIndex: card.zIndex }"
          class="absolute inset-x-4 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-xl"
          @drag-end="card.onDragEnd"
        >
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card text-base">{{ card.note.icon }}</span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-fg">{{ card.note.title }}</p>
            <p class="truncate text-xs text-muted">{{ card.note.body }}</p>
          </div>
          <span v-if="card.depth === 0" class="shrink-0 text-[10px] text-muted">swipe →</span>
        </motion.div>
      </AnimatePresence>
      <div
        v-if="notes.length === 0"
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-sm text-muted"
      >
        <BellIcon :size="18" />
        inbox zero
      </div>
    </div>
    <button
      class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95"
      @click="receive"
    >
      receive notification
    </button>
  </div>
</template>
