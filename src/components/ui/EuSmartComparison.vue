<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
const { locale } = useLocale();

interface Feature {
  name: string;
  free: boolean;
  pro: boolean;
  ent: boolean;
  group: string;
}

const DATA: Record<'en' | 'zh-CN', {
  features: Feature[];
  differencesOnly: string;
  filterPlaceholder: string;
  filterAria: string;
  columns: { feature: string; free: string; pro: string; ent: string };
  empty: string;
}> = {
  en: {
    features: [
      { name: 'Animated previews', free: true, pro: true, ent: true, group: 'Core' },
      { name: 'TypeScript source', free: true, pro: true, ent: true, group: 'Core' },
      { name: 'Registry sync', free: false, pro: true, ent: true, group: 'Tooling' },
      { name: 'Design reviews', free: false, pro: true, ent: true, group: 'Tooling' },
      { name: 'SSO / SAML', free: false, pro: false, ent: true, group: 'Security' },
      { name: 'Audit log export', free: false, pro: false, ent: true, group: 'Security' },
    ],
    differencesOnly: 'differences only',
    filterPlaceholder: 'Filter features…',
    filterAria: 'Filter features',
    columns: { feature: 'Feature', free: 'Free', pro: 'Pro', ent: 'Ent' },
    empty: 'No features match.',
  },
  'zh-CN': {
    features: [
      { name: '动效预览', free: true, pro: true, ent: true, group: '核心' },
      { name: 'TypeScript 源码', free: true, pro: true, ent: true, group: '核心' },
      { name: '组件库同步', free: false, pro: true, ent: true, group: '工具链' },
      { name: '设计评审', free: false, pro: true, ent: true, group: '工具链' },
      { name: 'SSO / SAML', free: false, pro: false, ent: true, group: '安全' },
      { name: '审计日志导出', free: false, pro: false, ent: true, group: '安全' },
    ],
    differencesOnly: '仅显示差异',
    filterPlaceholder: '筛选功能…',
    filterAria: '筛选功能',
    columns: { feature: '功能', free: '免费', pro: '专业版', ent: '企业版' },
    empty: '没有匹配的功能。',
  },
};

const data = computed(() => DATA[locale.value]);

const onlyDiff = ref(true);
const query = ref('');
const collapsed = ref<Set<string>>(new Set());

const rows = computed(() => {
  let list = data.value.features;
  if (onlyDiff.value) list = list.filter((f) => !(f.free === f.pro && f.pro === f.ent));
  const q = query.value.trim().toLowerCase();
  if (q) list = list.filter((f) => f.name.toLowerCase().includes(q) || f.group.toLowerCase().includes(q));
  return list;
});

const groups = computed(() => [...new Set(rows.value.map((r) => r.group))]);

function toggleGroup(g: string) {
  const next = new Set(collapsed.value);
  if (next.has(g)) next.delete(g);
  else next.add(g);
  collapsed.value = next;
}
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <button
        :class="cn(
          'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          onlyDiff ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="onlyDiff = !onlyDiff"
      >
        {{ data.differencesOnly }}
      </button>
      <input
        v-model="query"
        :placeholder="data.filterPlaceholder"
        :aria-label="data.filterAria"
        class="min-w-0 flex-1 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs outline-none focus:border-fg"
      />
    </div>

    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <div class="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
        <span>{{ data.columns.feature }}</span>
        <span class="text-center">{{ data.columns.free }}</span>
        <span class="text-center">{{ data.columns.pro }}</span>
        <span class="text-center">{{ data.columns.ent }}</span>
      </div>
      <div v-for="g in groups" :key="g">
        <button
          class="flex w-full items-center justify-between bg-card/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted"
          @click="toggleGroup(g)"
        >
          {{ g }}
          <span>{{ collapsed.has(g) ? '+' : '−' }}</span>
        </button>
        <AnimatePresence :initial="false">
          <motion.div
            v-if="!collapsed.has(g)"
            :key="g"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="motionTransitions.springGentle"
            class="overflow-hidden"
          >
            <motion.div
              v-for="r in rows.filter((row) => row.group === g)"
              :key="r.name"
              layout
              :transition="motionTransitions.springSmooth"
              class="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center border-t border-line/60 px-3 py-2 text-xs"
            >
              <span class="text-fg">{{ r.name }}</span>
              <span class="flex justify-center">
                <span
                  :class="cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                    r.free ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-line/70 text-muted',
                  )"
                >
                  <CheckIcon v-if="r.free" :size="11" />
                  <XIcon v-else :size="10" />
                </span>
              </span>
              <span class="flex justify-center">
                <span
                  :class="cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                    r.pro ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-line/70 text-muted',
                  )"
                >
                  <CheckIcon v-if="r.pro" :size="11" />
                  <XIcon v-else :size="10" />
                </span>
              </span>
              <span class="flex justify-center">
                <span
                  :class="cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                    r.ent ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-line/70 text-muted',
                  )"
                >
                  <CheckIcon v-if="r.ent" :size="11" />
                  <XIcon v-else :size="10" />
                </span>
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p v-if="rows.length === 0" class="px-3 py-6 text-center text-xs text-muted">{{ data.empty }}</p>
    </div>
  </div>
</template>
