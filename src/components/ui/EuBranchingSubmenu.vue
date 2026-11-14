<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const BRANCHES = [
  { label: 'Duplicate', hint: 'copy the doc' },
  { label: 'Move to…', hint: 'change space' },
  { label: 'Archive', hint: 'read-only' },
];

const open = ref(false);
const picked = ref<string | null>(null);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-5', props.class)">
    <div class="relative flex h-40 w-72 items-center justify-center">
      <button
        :aria-expanded="open"
        class="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium shadow-sm transition-shadow hover:shadow-md"
        @click="open = !open"
      >
        Doc actions {{ open ? '▴' : '▾' }}
      </button>
      <AnimatePresence>
        <motion.button
          v-for="(b, i) in open ? BRANCHES : []"
          :key="b.label"
          :initial="{ opacity: 0, x: -14, y: -8, scale: 0.9 }"
          :animate="{ opacity: 1, x: -110 + i * 4, y: -70 + i * 52, scale: 1 }"
          :exit="{ opacity: 0, x: -14, y: -8, scale: 0.9 }"
          :transition="{ ...motionTransitions.springResponsive, delay: i * 0.06 }"
          class="absolute left-1/2 top-1/2 w-32 rounded-xl border border-line bg-surface px-3 py-2 text-left shadow-lg"
          @click="picked = b.label; open = false"
        >
          <span class="block text-xs font-medium text-fg">{{ b.label }}</span>
          <span class="block text-[10px] text-muted">{{ b.hint }}</span>
        </motion.button>
      </AnimatePresence>
    </div>
    <p class="text-xs text-muted">{{ picked ? `branched action: ${picked}` : 'open the menu — actions branch spatially' }}</p>
  </div>
</template>
