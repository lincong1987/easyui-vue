<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface Snapshot {
  id: string;
  label: string;
  when: string;
  change: string;
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    snapshots: Snapshot[];
    currentState: string;
    live: string;
    rolledBackTo: string;
    restored: string;
    rollback: string;
  }
> = {
  en: {
    snapshots: [
      { id: 'snap-3', label: 'after palette tweak', when: '14:02', change: 'accent → indigo' },
      { id: 'snap-2', label: 'before radius bump', when: '13:47', change: 'radius 12 → 20' },
      { id: 'snap-1', label: 'initial import', when: '13:30', change: 'baseline' },
    ],
    currentState: 'Current state',
    live: 'live',
    rolledBackTo: 'rolled back to',
    restored: 'restored',
    rollback: 'rollback',
  },
  'zh-CN': {
    snapshots: [
      { id: 'snap-3', label: '调色板微调后', when: '14:02', change: 'accent → indigo' },
      { id: 'snap-2', label: '圆角调大前', when: '13:47', change: 'radius 12 → 20' },
      { id: 'snap-1', label: '初始导入', when: '13:30', change: '基线版本' },
    ],
    currentState: '当前状态',
    live: '实时',
    rolledBackTo: '已回滚到',
    restored: '已恢复',
    rollback: '回滚',
  },
};

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);

const current = ref('live');
const log = ref<string[]>([]);

function rollback(id: string) {
  log.value = [id, ...log.value].slice(0, 4);
  current.value = id;
}
</script>

<template>
  <div :class="cn('w-full max-w-sm space-y-3', props.class)">
    <div class="rounded-2xl border border-line bg-surface p-4">
      <div class="flex items-center justify-between">
        <p class="text-xs uppercase tracking-widest text-muted">{{ ui.currentState }}</p>
        <span class="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {{ current === 'live' ? ui.live : current }}
        </span>
      </div>
      <div class="mt-3 space-y-1.5 font-mono text-[10px] text-muted">
        <p>accent = var(--color-accent)</p>
        <p>radius = var(--radius-card)</p>
        <motion.p v-for="(l, i) in log" :key="i" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" class="text-red-500">
          ⚠ {{ ui.rolledBackTo }} {{ l }}
        </motion.p>
      </div>
    </div>

    <ul class="space-y-1.5">
      <motion.li
        v-for="(s, i) in ui.snapshots"
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
          {{ current === s.id ? ui.restored : ui.rollback }}
        </button>
      </motion.li>
    </ul>
  </div>
</template>
