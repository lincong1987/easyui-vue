<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

type CatKey = 'general' | 'usage';

interface QAItem {
  q: string;
  a: string;
  cat: CatKey;
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    cats: Record<'all' | CatKey, string>;
    placeholder: string;
    searchAria: string;
    empty: string;
    items: QAItem[];
  }
> = {
  en: {
    cats: { all: 'All', general: 'General', usage: 'Usage' },
    placeholder: 'Search…',
    searchAria: 'Search FAQ',
    empty: 'No answers match.',
    items: [
      { q: 'Is this a fork of EasyUI?', a: 'No — it is a from-scratch port of the documented behavior, with original code.', cat: 'general' },
      { q: 'Which React versions work?', a: 'React 18 and 19 are supported; the demo runs on React 19.', cat: 'general' },
      { q: 'How do I install a component?', a: 'Copy the source file into your project, or use the shadcn registry in the upstream repo.', cat: 'usage' },
      { q: 'Can I use it commercially?', a: 'Yes — MIT licensed, copy-paste ownership included.', cat: 'usage' },
    ],
  },
  'zh-CN': {
    cats: { all: '全部', general: '通用', usage: '使用' },
    placeholder: '搜索…',
    searchAria: '搜索常见问题',
    empty: '没有匹配的问答。',
    items: [
      { q: '这是 EasyUI 的 fork 吗？', a: '不是——它按文档描述的行为从零移植，代码为原创实现。', cat: 'general' },
      { q: '支持哪些 React 版本？', a: '支持 React 18 与 19，演示运行在 React 19 上。', cat: 'general' },
      { q: '如何安装组件？', a: '把源码文件复制进你的项目，或使用上游仓库中的 shadcn registry。', cat: 'usage' },
      { q: '可以商用吗？', a: '可以——MIT 许可，复制即用、代码归你所有。', cat: 'usage' },
    ],
  },
};

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();
const T = computed(() => DATA[locale.value]);

const open = ref(0);
const query = ref('');
const cat = ref<'all' | CatKey>('all');
const cats = computed<('all' | CatKey)[]>(() => ['all', ...new Set(T.value.items.map((x) => x.cat))]);

const list = computed(() => {
  const q = query.value.trim().toLowerCase();
  return T.value.items.filter((x) => (cat.value === 'all' || x.cat === cat.value) && (!q || `${x.q} ${x.a}`.toLowerCase().includes(q)));
});
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="mb-3 flex flex-wrap gap-1.5">
      <button
        v-for="c in cats"
        :key="c"
        :class="cn(
          'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
          cat === c ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="cat = c"
      >
        {{ T.cats[c] }}
      </button>
      <input
        v-model="query"
        :placeholder="T.placeholder"
        :aria-label="T.searchAria"
        class="min-w-0 flex-1 rounded-full border border-line bg-surface px-3 text-xs outline-none focus:border-fg"
      />
    </div>

    <div class="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      <div v-for="(item, i) in list" :key="item.q">
        <button
          :aria-expanded="open === i"
          class="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-card"
          @click="open = open === i ? -1 : i"
        >
          {{ item.q }}
          <motion.span :animate="{ rotate: open === i ? 180 : 0 }" :transition="motionTransitions.springSnappy" class="text-muted">
            <ChevronDownIcon :size="14" />
          </motion.span>
        </button>
        <AnimatePresence :initial="false">
          <motion.div
            v-if="open === i"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="motionTransitions.springGentle"
            class="overflow-hidden"
          >
            <p class="px-4 pb-3 text-sm text-muted">{{ item.a }}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p v-if="list.length === 0" class="px-4 py-6 text-center text-sm text-muted">{{ T.empty }}</p>
    </div>
  </div>
</template>
