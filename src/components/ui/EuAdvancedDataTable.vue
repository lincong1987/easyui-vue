<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronRightIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
const { locale } = useLocale();

type Category = 'Motion' | 'Feedback' | 'Forms';
type Status = 'stable' | 'beta';

interface Row {
  id: string;
  component: string;
  category: Category;
  status: Status;
  downloads: number;
  deps: string[];
}

const ROWS: Row[] = [
  { id: 'r1', component: 'Spotlight Card', category: 'Motion', status: 'stable', downloads: 1840, deps: ['framer-motion'] },
  { id: 'r2', component: 'Donut Chart', category: 'Feedback', status: 'stable', downloads: 1210, deps: [] },
  { id: 'r3', component: 'OTP Input', category: 'Forms', status: 'stable', downloads: 980, deps: ['framer-motion', 'tailwind'] },
  { id: 'r4', component: 'Glyph Matrix', category: 'Motion', status: 'beta', downloads: 640, deps: ['canvas'] },
  { id: 'r5', component: 'Combobox', category: 'Forms', status: 'beta', downloads: 540, deps: ['framer-motion'] },
  { id: 'r6', component: 'Payment Status', category: 'Feedback', status: 'beta', downloads: 470, deps: ['framer-motion', 'lucide'] },
  { id: 'r7', component: 'Date Picker', category: 'Forms', status: 'stable', downloads: 1100, deps: ['framer-motion'] },
  { id: 'r8', component: 'Live Line Chart', category: 'Feedback', status: 'beta', downloads: 720, deps: [] },
];

const CATEGORIES: readonly Category[] = ['Motion', 'Feedback', 'Forms'];
const STATUSES: readonly ('all' | Status)[] = ['all', 'stable', 'beta'];
const PER = 5;

const DATA: Record<'en' | 'zh-CN', {
  categories: Record<Category, string>;
  statuses: Record<'all' | Status, string>;
  columns: { component: string; downloads: string; status: string };
  dependencies: string;
  zeroDependency: string;
  empty: string;
  summary: (rows: number, page: number, pages: number) => string;
  pageAria: (page: number) => string;
}> = {
  en: {
    categories: { Motion: 'Motion', Feedback: 'Feedback', Forms: 'Forms' },
    statuses: { all: 'all', stable: 'stable', beta: 'beta' },
    columns: { component: 'Component', downloads: '↓ /mo', status: 'Status' },
    dependencies: 'dependencies',
    zeroDependency: 'zero-dependency',
    empty: 'Nothing matches those facets.',
    summary: (rows, page, pages) => `${rows} rows · page ${page}/${pages}`,
    pageAria: (page) => `Page ${page}`,
  },
  'zh-CN': {
    categories: { Motion: '动效', Feedback: '反馈', Forms: '表单' },
    statuses: { all: '全部', stable: '稳定', beta: '内测' },
    columns: { component: '组件', downloads: '↓ /月', status: '状态' },
    dependencies: '依赖',
    zeroDependency: '无依赖',
    empty: '没有符合当前筛选条件的条目。',
    summary: (rows, page, pages) => `${rows} 行 · 第 ${page}/${pages} 页`,
    pageAria: (page) => `第 ${page} 页`,
  },
};

const data = computed(() => DATA[locale.value]);

const facets = ref<Set<string>>(new Set());
const statusFilter = ref<'all' | Status>('all');
const sort = ref<{ key: 'component' | 'downloads'; dir: 1 | -1 }>({ key: 'downloads', dir: -1 });
const expanded = ref<string | null>(null);
const page = ref(0);

const filtered = computed(() => {
  let list = ROWS;
  if (facets.value.size > 0) list = list.filter((r) => facets.value.has(r.category));
  if (statusFilter.value !== 'all') list = list.filter((r) => r.status === statusFilter.value);
  return [...list].sort((a, b) => {
    const dir = sort.value.dir;
    if (sort.value.key === 'downloads') {
      return a.downloads === b.downloads ? 0 : (a.downloads < b.downloads ? -1 : 1) * dir;
    }
    return a.component === b.component ? 0 : (a.component < b.component ? -1 : 1) * dir;
  });
});

const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER)));
const safePage = computed(() => Math.min(page.value, pages.value - 1));
const visible = computed(() => filtered.value.slice(safePage.value * PER, safePage.value * PER + PER));

function toggleFacet(c: string) {
  const next = new Set(facets.value);
  if (next.has(c)) next.delete(c);
  else next.add(c);
  facets.value = next;
}

function toggleSort(key: 'component' | 'downloads') {
  sort.value = { key, dir: sort.value.key === key && sort.value.dir === -1 ? 1 : -1 };
}

function toggleRow(id: string) {
  expanded.value = expanded.value === id ? null : id;
}
</script>

<template>
  <div :class="cn('w-full max-w-lg', props.class)">
    <div class="mb-2.5 flex flex-wrap items-center gap-1.5">
      <button
        v-for="c in CATEGORIES"
        :key="c"
        :class="cn(
          'rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors',
          facets.has(c) ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="toggleFacet(c)"
      >
        {{ data.categories[c] }}
      </button>
      <span class="mx-1 h-4 w-px bg-line" />
      <button
        v-for="s in STATUSES"
        :key="s"
        :class="cn(
          'rounded-full px-2.5 py-1 text-[10px] font-medium capitalize transition-colors',
          statusFilter === s ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="statusFilter = s"
      >
        {{ data.statuses[s] }}
      </button>
    </div>

    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <div class="grid grid-cols-[1.4fr_0.9fr_0.7fr] border-b border-line bg-card/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
        <button class="text-left" @click="toggleSort('component')">
          {{ data.columns.component }}
          <span v-if="sort.key === 'component'" class="text-fg">{{ sort.dir === -1 ? '↓' : '↑' }}</span>
        </button>
        <button class="text-right" @click="toggleSort('downloads')">
          {{ data.columns.downloads }}
          <span v-if="sort.key === 'downloads'" class="text-fg">{{ sort.dir === -1 ? '↓' : '↑' }}</span>
        </button>
        <span class="text-right">{{ data.columns.status }}</span>
      </div>

      <div v-for="r in visible" :key="r.id" class="border-b border-line/60 last:border-b-0">
        <button
          :aria-expanded="expanded === r.id"
          class="grid w-full grid-cols-[1.4fr_0.9fr_0.7fr] items-center px-3 py-2.5 text-left text-xs transition-colors hover:bg-card/50"
          @click="toggleRow(r.id)"
        >
          <span class="flex items-center gap-1 font-medium text-fg">
            <motion.span
              :animate="{ rotate: expanded === r.id ? 90 : 0 }"
              :transition="motionTransitions.springSnappy"
              class="text-muted"
            >
              <ChevronRightIcon :size="12" />
            </motion.span>
            {{ r.component }}
          </span>
          <span class="text-right tabular-nums text-muted">{{ r.downloads.toLocaleString() }}</span>
          <span class="flex justify-end">
            <span
              :class="cn(
                'rounded-full px-1.5 py-0.5 text-[9px] font-medium',
                r.status === 'stable'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              )"
            >
              {{ data.statuses[r.status] }}
            </span>
          </span>
        </button>
        <AnimatePresence :initial="false">
          <motion.div
            v-if="expanded === r.id"
            :key="r.id"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="motionTransitions.springGentle"
            class="overflow-hidden bg-card/50"
          >
            <div class="px-3 pb-3 pt-1">
              <p class="text-[10px] uppercase tracking-widest text-muted">{{ data.dependencies }}</p>
              <div class="mt-1.5 flex flex-wrap gap-1">
                <span v-for="d in r.deps" :key="d" class="rounded-md bg-line/70 px-1.5 py-0.5 font-mono text-[10px] text-fg">
                  {{ d }}
                </span>
                <span v-if="r.deps.length === 0" class="text-[10px] text-muted">{{ data.zeroDependency }}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p v-if="visible.length === 0" class="px-3 py-6 text-center text-xs text-muted">{{ data.empty }}</p>
    </div>

    <div class="mt-2 flex items-center justify-between text-[10px] text-muted">
      <span aria-live="polite">{{ data.summary(filtered.length, safePage + 1, pages) }}</span>
      <span class="flex gap-1">
        <button
          v-for="n in pages"
          :key="n"
          :aria-label="data.pageAria(n)"
          :class="cn('h-6 w-6 rounded-md tabular-nums transition-colors', n - 1 === safePage ? 'bg-fg text-bg' : 'hover:bg-card')"
          @click="page = n - 1"
        >
          {{ n }}
        </button>
      </span>
    </div>
  </div>
</template>
