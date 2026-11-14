<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, SparklesIcon, ZapIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

interface Step {
  id: string;
  label: string;
  detail: string;
  state: 'pending' | 'running' | 'done';
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    header: string;
    script: Omit<Step, 'state'>[];
  }
> = {
  en: {
    header: 'agent run · live',
    script: [
      { id: 'think', label: 'Planning the task', detail: 'decompose goal → 4 steps' },
      { id: 'tool', label: 'Calling tool: search_registry', detail: 'query "animated charts"' },
      { id: 'fetch', label: 'Fetching component source', detail: 'GET /registry/donut-chart.json' },
      { id: 'write', label: 'Writing integration notes', detail: 'streaming tokens…' },
    ],
  },
  'zh-CN': {
    header: '智能体运行 · 实时',
    script: [
      { id: 'think', label: '规划任务', detail: '拆解目标 → 4 个步骤' },
      { id: 'tool', label: '调用工具：search_registry', detail: '查询 "animated charts"' },
      { id: 'fetch', label: '获取组件源码', detail: 'GET /registry/donut-chart.json' },
      { id: 'write', label: '撰写集成说明', detail: '流式输出 token…' },
    ],
  },
};

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);

const started = ref(0);
const inspect = ref<string | null>('tool');
let timer: number | undefined;
let restart: number | undefined;

const steps = computed<Step[]>(() =>
  ui.value.script.map((s, idx) => {
    const state: Step['state'] =
      idx < started.value - 1 ? 'done' : idx === started.value - 1 ? 'running' : 'pending';
    return { ...s, state };
  }),
);

onMounted(() => {
  timer = window.setInterval(() => {
    started.value += 1;
    if (started.value > ui.value.script.length) {
      window.clearInterval(timer);
      restart = window.setTimeout(() => {
        started.value = 0;
      }, 2200);
    }
  }, 1300);
});
onUnmounted(() => {
  window.clearInterval(timer);
  window.clearTimeout(restart);
});

function toggleInspect(id: string) {
  inspect.value = inspect.value === id ? null : id;
}
</script>

<template>
  <div :class="cn('w-full max-w-md rounded-2xl border border-line bg-surface p-3.5', props.class)">
    <div class="mb-2 flex items-center gap-2 text-xs font-medium text-fg">
      <SparklesIcon :size="14" class="text-accent" />
      {{ ui.header }}
    </div>
    <ul class="space-y-1">
      <li v-for="(s, i) in steps" :key="s.id" class="relative flex gap-3 pl-1">
        <span v-if="i < steps.length - 1" class="absolute left-[13px] top-6 h-[calc(100%-14px)] w-px bg-line" />
        <span
          :class="cn(
            'relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px]',
            s.state === 'done' && 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
            s.state === 'running' && 'border-fg bg-fg text-bg',
            s.state === 'pending' && 'border-line bg-surface text-muted',
          )"
        >
          <CheckIcon v-if="s.state === 'done'" :size="11" />
          <motion.span
            v-else-if="s.state === 'running'"
            class="h-3 w-3 rounded-full border-2 border-current border-t-transparent"
            :animate="{ rotate: 360 }"
            :transition="{ duration: 0.7, repeat: Infinity, ease: 'linear' }"
          />
          <ZapIcon v-else :size="10" />
        </span>
        <button
          :class="cn(
            'min-w-0 flex-1 rounded-lg px-2 py-1.5 text-left transition-colors',
            inspect === s.id ? 'bg-card' : 'hover:bg-card/60',
          )"
          @click="toggleInspect(s.id)"
        >
          <p class="truncate text-xs font-medium text-fg">{{ s.label }}</p>
          <AnimatePresence>
            <motion.p
              v-if="inspect === s.id"
              :initial="{ opacity: 0, height: 0 }"
              :animate="{ opacity: 1, height: 'auto' }"
              :exit="{ opacity: 0, height: 0 }"
              :transition="motionTransitions.easeFast"
              class="overflow-hidden font-mono text-[10px] text-muted"
            >
              {{ s.detail }}
            </motion.p>
          </AnimatePresence>
        </button>
      </li>
    </ul>
  </div>
</template>
