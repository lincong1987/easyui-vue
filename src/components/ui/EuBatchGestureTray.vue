<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { TrashIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const DOCS = ['Q3 report.pdf', 'brand-kit.zip', 'roadmap.md', 'budget.xlsx', 'logo-suite.svg'];

const props = defineProps<{ class?: string }>();

const selected = ref<Set<string>>(new Set(['Q3 report.pdf', 'roadmap.md']));
const cleared = ref(false);

function toggle(d: string) {
  cleared.value = false;
  const next = new Set(selected.value);
  if (next.has(d)) next.delete(d);
  else next.add(d);
  selected.value = next;
}

function clearAll() {
  selected.value = new Set();
  cleared.value = true;
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <ul class="space-y-1.5">
      <li v-for="d in DOCS" :key="d">
        <button
          :aria-pressed="selected.has(d)"
          :class="cn(
            'flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors',
            selected.has(d) ? 'border-fg/60 bg-card' : 'border-line bg-surface hover:border-fg/40',
          )"
          @click="toggle(d)"
        >
          <span
            :class="cn(
              'flex h-4 w-4 items-center justify-center rounded border text-[9px]',
              selected.has(d) ? 'border-fg bg-fg text-bg' : 'border-line',
            )"
          >
            {{ selected.has(d) ? '✓' : '' }}
          </span>
          <span class="truncate text-fg">{{ d }}</span>
        </button>
      </li>
    </ul>

    <AnimatePresence>
      <motion.div
        v-if="selected.size > 0 && !cleared"
        :initial="{ y: 80, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :exit="{ y: 80, opacity: 0 }"
        :transition="motionTransitions.springMorph"
        class="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit max-w-[92vw] items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-2xl"
        role="toolbar"
        aria-label="Bulk actions"
      >
        <span class="rounded-full bg-fg px-2.5 py-1 text-[11px] font-semibold text-bg tabular-nums">{{ selected.size }} selected</span>
        <button
          class="flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-red-600"
          @click="clearAll"
        >
          <TrashIcon :size="12" /> Delete
        </button>
        <button
          aria-label="Clear selection"
          class="rounded-full p-1.5 text-muted transition-colors hover:text-fg"
          @click="clearAll"
        >
          <XIcon :size="13" />
        </button>
      </motion.div>
    </AnimatePresence>
    <p v-if="cleared" class="mt-2 text-center text-[10px] text-muted">selection cleared</p>
  </div>
</template>
