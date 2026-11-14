<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

type Kind = 'deploy' | 'star' | 'issue' | 'merge';
interface EventItem {
  id: number;
  kind: Kind;
  text: string;
  time: string;
  meta: Record<string, string>;
}

const KINDS: Record<Kind, { tint: string }> = {
  deploy: { tint: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  star: { tint: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  issue: { tint: 'bg-red-500/15 text-red-600 dark:text-red-400' },
  merge: { tint: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
};

const DATA: Record<
  'en' | 'zh-CN',
  {
    labels: Record<'all' | Kind, string>;
    pool: Omit<EventItem, 'id' | 'time'>[];
    hint: string;
  }
> = {
  en: {
    labels: { all: 'all', deploy: 'deploy', star: 'star', issue: 'issue', merge: 'merge' },
    pool: [
      { kind: 'deploy', text: 'production deploy finished', meta: { env: 'prod', dur: '42s' } },
      { kind: 'star', text: 'new star on the repository', meta: { from: '@devkai' } },
      { kind: 'merge', text: 'PR #212 merged into main', meta: { by: 'rin', files: '6' } },
      { kind: 'issue', text: 'flaky test reported', meta: { suite: 'registry' } },
      { kind: 'deploy', text: 'preview environment rebuilt', meta: { env: 'preview', dur: '18s' } },
    ],
    hint: 'live simulation · click an event to expand its payload',
  },
  'zh-CN': {
    labels: { all: '全部', deploy: '部署', star: '星标', issue: '问题', merge: '合并' },
    pool: [
      { kind: 'deploy', text: '生产环境部署完成', meta: { env: 'prod', dur: '42s' } },
      { kind: 'star', text: '仓库收到新的 Star', meta: { from: '@devkai' } },
      { kind: 'merge', text: 'PR #212 已合并到 main', meta: { by: 'rin', files: '6' } },
      { kind: 'issue', text: '发现不稳定的测试', meta: { suite: 'registry' } },
      { kind: 'deploy', text: '预览环境已重建', meta: { env: 'preview', dur: '18s' } },
    ],
    hint: '实时模拟 · 点击事件可展开其 payload',
  },
};

const FILTERS: ('all' | Kind)[] = ['all', 'deploy', 'star', 'merge', 'issue'];

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);

const filter = ref<'all' | Kind>('all');
const events = ref<EventItem[]>([]);
const expanded = ref<number | null>(null);
let idCounter = 1;
let timer: number | undefined;

onMounted(() => {
  const push = () => {
    const pool = DATA[locale.value].pool;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    events.value = [
      {
        ...pick,
        id: idCounter++,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      },
      ...events.value,
    ].slice(0, 8);
  };
  push();
  push();
  push();
  timer = window.setInterval(push, 3200);
});
onUnmounted(() => window.clearInterval(timer));

const shown = computed(() => (filter.value === 'all' ? events.value : events.value.filter((e) => e.kind === filter.value)));

</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="mb-3 flex flex-wrap gap-1.5">
      <button
        v-for="f in FILTERS"
        :key="f"
        :class="cn(
          'rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-colors',
          filter === f ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="filter = f"
      >
        {{ ui.labels[f] }}
      </button>
    </div>

    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <ul class="divide-y divide-line/70">
        <AnimatePresence :initial="false">
          <motion.li
            v-for="e in shown"
            :key="e.id"
            layout
            :initial="{ opacity: 0, x: -24, height: 0 }"
            :animate="{ opacity: 1, x: 0, height: 'auto' }"
            :exit="{ opacity: 0, height: 0 }"
            :transition="motionTransitions.springSnappy"
            class="overflow-hidden"
          >
            <button
              class="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-card"
              @click="expanded = expanded === e.id ? null : e.id"
            >
              <span :class="cn('rounded-md px-1.5 py-0.5 text-[10px] font-semibold', KINDS[e.kind].tint)">
                {{ ui.labels[e.kind] }}
              </span>
              <span class="min-w-0 flex-1 truncate text-xs text-fg">{{ e.text }}</span>
              <span class="shrink-0 text-[10px] text-muted tabular-nums">{{ e.time }}</span>
            </button>
            <AnimatePresence>
              <motion.pre
                v-if="expanded === e.id"
                :initial="{ height: 0, opacity: 0 }"
                :animate="{ height: 'auto', opacity: 1 }"
                :exit="{ height: 0, opacity: 0 }"
                :transition="motionTransitions.easeFast"
                class="overflow-hidden bg-card/70 px-3.5 pb-2.5 font-mono text-[10px] leading-relaxed text-muted"
              >
                {{ JSON.stringify({ kind: e.kind, ...e.meta, at: e.time }, null, 2) }}
              </motion.pre>
            </AnimatePresence>
          </motion.li>
        </AnimatePresence>
      </ul>
    </div>
    <p class="mt-2 text-center text-[10px] text-muted">{{ ui.hint }}</p>
  </div>
</template>
