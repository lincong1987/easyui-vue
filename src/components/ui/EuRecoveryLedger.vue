<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const SNAPSHOTS = [
  { id: 'snap-3', label: 'after palette tweak', when: '14:02', change: 'accent → indigo' },
  { id: 'snap-2', label: 'before radius bump', when: '13:47', change: 'radius 12 → 20' },
  { id: 'snap-1', label: 'initial import', when: '13:30', change: 'baseline' },
];

const current = ref('live');
const log = ref<string[]>([]);

function rollback(id: string) {
  log.value = [`rolled back to ${id}`, ...log.value].slice(0, 4);
  current.value = id;
}
</script>

<template>
  <div :class="cn('w-full max-w-sm space-y-3', props.class)">
    <div class="rounded-2xl border border-line bg-surface p-4">
      <div class="flex items-center justify-between">
        <p class="text-xs uppercase tracking-widest text-muted">Current state</p>
        <span class="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {{ current === 'live' ? 'live' : current }}
        </span>
      </div>
      <div class="mt-3 space-y-1.5 font-mono text-[10px] text-muted">
        <p>accent = var(--color-accent)</p>
        <p>radius = var(--radius-card)</p>
        <motion.p v-for="(l, i) in log" :key="i" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" class="text-red-500">
          ⚠ {{ l }}
        </motion.p>
      </div>
    </div>

    <ul class="space-y-1.5">
      <motion.li
        v-for="(s, i) in SNAPSHOTS"
        :key="s.id"
        layout
        :transition="motionTransitions.springSnappy"
        class="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5"
      >
        <div>
          <p class="text-xs font-medium text-fg">{{ i + 1 }}. {{ s.label }}</p>
          <p class="font-mono text-[10px] text-muted">{{ s.when }} · {{ s.change }}</p>
        </div>
        <button
          :disabled="current === s.id"
          :class="cn(
            'rounded-full px-3 py-1 text-[10px] font-medium transition-colors',
            current === s.id ? 'bg-line text-muted' : 'bg-fg text-bg hover:opacity-90',
          )"
          @click="rollback(s.id)"
        >
          {{ current === s.id ? 'restored' : 'rollback' }}
        </button>
      </motion.li>
    </ul>
  </div>
</template>
