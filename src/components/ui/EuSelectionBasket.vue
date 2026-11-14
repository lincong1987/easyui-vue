<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, TrashIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const ROWS = ['component-a.tsx', 'component-b.tsx', 'component-c.tsx', 'component-d.tsx'];

const selected = ref<Set<string>>(new Set(['component-a.tsx', 'component-c.tsx']));
const removed = ref<string[]>([]);

function toggle(row: string) {
  const next = new Set(selected.value);
  if (next.has(row)) next.delete(row);
  else next.add(row);
  selected.value = next;
}

function removeSelected() {
  removed.value = [...removed.value, ...selected.value];
  selected.value = new Set();
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <button
        v-for="row in ROWS.filter((r) => !removed.includes(r))"
        :key="row"
        :aria-pressed="selected.has(row)"
        :class="cn(
          'flex w-full items-center gap-2.5 border-b border-line/70 px-3.5 py-2.5 text-left text-sm transition-colors last:border-b-0',
          selected.has(row) ? 'bg-card' : 'hover:bg-card/60',
        )"
        @click="toggle(row)"
      >
        <span
          :class="cn(
            'flex h-4 w-4 items-center justify-center rounded border text-[9px]',
            selected.has(row) ? 'border-fg bg-fg text-bg' : 'border-line',
          )"
        >
          <CheckIcon v-if="selected.has(row)" :size="10" />
        </span>
        <span class="font-mono text-xs text-fg">{{ row }}</span>
      </button>
      <p v-if="ROWS.every((r) => removed.includes(r))" class="px-3.5 py-6 text-center text-xs text-muted">
        everything removed
      </p>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="selected.size > 0"
        key="bulk-toolbar"
        :initial="{ y: 90, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :exit="{ y: 90, opacity: 0 }"
        :transition="motionTransitions.springMorph"
        class="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit max-w-[92vw] items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 shadow-2xl"
      >
        <span class="pl-1 text-[11px] font-medium text-muted tabular-nums">{{ selected.size }} selected</span>
        <button
          class="flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-red-600"
          @click="removeSelected"
        >
          <TrashIcon :size="12" /> Remove
        </button>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
