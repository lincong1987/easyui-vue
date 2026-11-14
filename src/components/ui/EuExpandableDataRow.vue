<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ROWS = [
  { id: 'INV-2041', client: 'Nimbus Labs', total: '$4,280.00', status: 'Paid', owner: 'Rin', updated: '2h ago' },
  { id: 'INV-2042', client: 'Fjord Media', total: '$1,950.00', status: 'Open', owner: 'Kai', updated: '5h ago' },
  { id: 'INV-2043', client: 'Atelier Nord', total: '$12,000.00', status: 'Overdue', owner: 'Momo', updated: '1d ago' },
];

const STATUS_TINT: Record<string, string> = {
  Paid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Open: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  Overdue: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

const open = ref<string | null>(ROWS[0].id);
</script>

<template>
  <div :class="cn('w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface', props.class)">
    <div
      class="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-line px-4 py-2 text-[10px] uppercase tracking-widest text-muted"
    >
      <span>Invoice</span>
      <span>Status</span>
    </div>
    <div v-for="r in ROWS" :key="r.id" class="border-b border-line last:border-b-0">
      <button
        :aria-expanded="open === r.id"
        class="grid w-full grid-cols-[1fr_auto] items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-card"
        @click="open = open === r.id ? null : r.id"
      >
        <span>
          <span class="block text-sm font-medium">{{ r.id }}</span>
          <span class="block text-xs text-muted">{{ r.client }} · {{ r.total }}</span>
        </span>
        <span class="flex items-center gap-2">
          <span :class="cn('rounded-full px-2 py-0.5 text-[10px] font-medium', STATUS_TINT[r.status])">
            {{ r.status }}
          </span>
          <motion.span
            :animate="{ rotate: open === r.id ? 180 : 0 }"
            :transition="motionTransitions.springSnappy"
            class="text-muted"
          >
            <ChevronDownIcon :size="14" />
          </motion.span>
        </span>
      </button>
      <AnimatePresence :initial="false">
        <motion.div
          v-if="open === r.id"
          :key="r.id"
          :initial="{ height: 0, opacity: 0 }"
          :animate="{ height: 'auto', opacity: 1 }"
          :exit="{ height: 0, opacity: 0 }"
          :transition="motionTransitions.springGentle"
          class="overflow-hidden bg-card/60"
        >
          <div class="grid grid-cols-2 gap-2 px-4 py-3 text-xs text-muted">
            <span>Owner: <span class="text-fg">{{ r.owner }}</span></span>
            <span>Updated: <span class="text-fg">{{ r.updated }}</span></span>
            <span>Terms: <span class="text-fg">Net 30</span></span>
            <span>Method: <span class="text-fg">Bank transfer</span></span>
          </div>
          <div class="flex gap-2 px-4 pb-3">
            <button class="rounded-full bg-fg px-3 py-1 text-[11px] font-medium text-bg">Send reminder</button>
            <button
              class="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-muted transition-colors hover:text-fg"
            >
              Download PDF
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</template>
