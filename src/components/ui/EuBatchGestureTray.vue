<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { TrashIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

interface Doc {
  id: string;
  name: string;
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    docs: Doc[];
    selectedCount: string;
    bulkActions: string;
    delete: string;
    clearSelection: string;
    cleared: string;
  }
> = {
  en: {
    docs: [
      { id: 'q3', name: 'Q3 report.pdf' },
      { id: 'brand', name: 'brand-kit.zip' },
      { id: 'roadmap', name: 'roadmap.md' },
      { id: 'budget', name: 'budget.xlsx' },
      { id: 'logo', name: 'logo-suite.svg' },
    ],
    selectedCount: '{n} selected',
    bulkActions: 'Bulk actions',
    delete: 'Delete',
    clearSelection: 'Clear selection',
    cleared: 'selection cleared',
  },
  'zh-CN': {
    docs: [
      { id: 'q3', name: 'Q3 报告.pdf' },
      { id: 'brand', name: '品牌素材包.zip' },
      { id: 'roadmap', name: '路线图.md' },
      { id: 'budget', name: '预算.xlsx' },
      { id: 'logo', name: 'Logo 套件.svg' },
    ],
    selectedCount: '已选 {n} 项',
    bulkActions: '批量操作',
    delete: '删除',
    clearSelection: '清除选择',
    cleared: '已清除选择',
  },
};

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);

const selected = ref<Set<string>>(new Set(['q3', 'roadmap']));
const cleared = ref(false);
const selectedLabel = computed(() => ui.value.selectedCount.replace('{n}', String(selected.value.size)));

function toggle(id: string) {
  cleared.value = false;
  const next = new Set(selected.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
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
      <li v-for="d in ui.docs" :key="d.id">
        <button
          :aria-pressed="selected.has(d.id)"
          :class="cn(
            'flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors',
            selected.has(d.id) ? 'border-fg/60 bg-card' : 'border-line bg-surface hover:border-fg/40',
          )"
          @click="toggle(d.id)"
        >
          <span
            :class="cn(
              'flex h-4 w-4 items-center justify-center rounded border text-[9px]',
              selected.has(d.id) ? 'border-fg bg-fg text-bg' : 'border-line',
            )"
          >
            {{ selected.has(d.id) ? '✓' : '' }}
          </span>
          <span class="truncate text-fg">{{ d.name }}</span>
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
        :aria-label="ui.bulkActions"
      >
        <span class="rounded-full bg-fg px-2.5 py-1 text-[11px] font-semibold text-bg tabular-nums">{{ selectedLabel }}</span>
        <button
          class="flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-red-600"
          @click="clearAll"
        >
          <TrashIcon :size="12" /> {{ ui.delete }}
        </button>
        <button
          :aria-label="ui.clearSelection"
          class="rounded-full p-1.5 text-muted transition-colors hover:text-fg"
          @click="clearAll"
        >
          <XIcon :size="13" />
        </button>
      </motion.div>
    </AnimatePresence>
    <p v-if="cleared" class="mt-2 text-center text-[10px] text-muted">{{ ui.cleared }}</p>
  </div>
</template>
