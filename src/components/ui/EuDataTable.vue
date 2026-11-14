<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
const { locale } = useLocale();

interface Row {
  name: string;
  owner: string;
  status: 'stable' | 'beta' | 'new';
  stars: number;
}

const DATA: Record<'en' | 'zh-CN', {
  searchPlaceholder: string;
  searchAria: string;
  headers: { component: string; owner: string; stars: string };
  statuses: Record<Row['status'], string>;
  empty: string;
  selected: (count: number) => string;
  hint: string;
}> = {
  en: {
    searchPlaceholder: 'Search rows…',
    searchAria: 'Search table',
    headers: { component: 'Component', owner: 'Owner', stars: '★' },
    statuses: { stable: 'stable', beta: 'beta', new: 'new' },
    empty: 'No rows match.',
    selected: (count) => `${count} row(s) selected`,
    hint: 'click rows to select · headers sort',
  },
  'zh-CN': {
    searchPlaceholder: '搜索行…',
    searchAria: '搜索表格',
    headers: { component: '组件', owner: '负责人', stars: '★' },
    statuses: { stable: '稳定', beta: '内测', new: '新增' },
    empty: '没有匹配的行。',
    selected: (count) => `已选 ${count} 行`,
    hint: '点击行选择 · 点击表头排序',
  },
};

const data = computed(() => DATA[locale.value]);

const ROWS: Row[] = [
  { name: 'Wallet Card', owner: 'rin', status: 'stable', stars: 412 },
  { name: 'Command Menu', owner: 'kai', status: 'beta', stars: 265 },
  { name: 'Activity Heatmap', owner: 'momo', status: 'stable', stars: 198 },
  { name: 'Torque Dial', owner: 'jin', status: 'new', stars: 87 },
  { name: 'Glyph Matrix', owner: 'ada', status: 'new', stars: 143 },
];

const query = ref('');
const sortKey = ref<'name' | 'owner' | 'stars'>('stars');
const dir = ref(1);
const selected = ref<Set<string>>(new Set());

const rows = computed(() => {
  const q = query.value.toLowerCase();
  return ROWS.filter((r) => `${r.name} ${r.owner} ${data.value.statuses[r.status]}`.toLowerCase().includes(q)).sort((a, b) =>
    a[sortKey.value] > b[sortKey.value] ? dir.value : a[sortKey.value] < b[sortKey.value] ? -dir.value : 0,
  );
});

function toggleSort(k: 'name' | 'owner' | 'stars') {
  if (k === sortKey.value) dir.value = -dir.value;
  else {
    sortKey.value = k;
    dir.value = -1;
  }
}

function toggleRow(name: string) {
  const n = new Set(selected.value);
  if (n.has(name)) n.delete(name);
  else n.add(name);
  selected.value = n;
}
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <input
      v-model="query"
      :placeholder="data.searchPlaceholder"
      :aria-label="data.searchAria"
      class="mb-2 w-full rounded-xl border border-line bg-surface px-3.5 py-2 text-xs outline-none transition-colors focus:border-fg"
    />
    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <div class="grid grid-cols-[1.5fr_0.8fr_0.6fr] border-b border-line bg-card/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
        <button class="text-left" @click="toggleSort('name')">{{ data.headers.component }} {{ sortKey === 'name' ? (dir > 0 ? '↑' : '↓') : '' }}</button>
        <button class="text-left" @click="toggleSort('owner')">{{ data.headers.owner }} {{ sortKey === 'owner' ? (dir > 0 ? '↑' : '↓') : '' }}</button>
        <button class="text-right" @click="toggleSort('stars')">{{ data.headers.stars }} {{ sortKey === 'stars' ? (dir > 0 ? '↑' : '↓') : '' }}</button>
      </div>
      <button
        v-for="r in rows"
        :key="r.name"
        :aria-pressed="selected.has(r.name)"
        class="grid w-full grid-cols-[1.5fr_0.8fr_0.6fr] items-center border-b border-line/60 px-3 py-2.5 text-left text-xs transition-colors last:border-b-0 hover:bg-card/50"
        :class="selected.has(r.name) ? 'bg-card' : ''"
        @click="toggleRow(r.name)"
      >
        <span class="font-medium text-fg">{{ r.name }}</span>
        <span class="text-muted">@{{ r.owner }}</span>
        <span class="flex items-center justify-end gap-2">
          <span
            :class="cn(
              'rounded-full px-1.5 py-0.5 text-[9px] font-medium',
              r.status === 'stable' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
              r.status === 'beta' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              r.status === 'new' && 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
            )"
          >{{ data.statuses[r.status] }}</span>
          <span class="tabular-nums text-muted">{{ r.stars }}</span>
        </span>
      </button>
      <p v-if="rows.length === 0" class="px-3 py-6 text-center text-xs text-muted">{{ data.empty }}</p>
    </div>
    <p class="mt-2 text-center text-[10px] text-muted">
      {{ selected.size > 0 ? data.selected(selected.size) : data.hint }}
    </p>
  </div>
</template>
