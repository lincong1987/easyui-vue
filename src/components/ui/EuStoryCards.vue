<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();

const DATA: Record<
  'en' | 'zh-CN',
  {
    stories: { title: string; tag: string }[];
    counter: string;
    prev: string;
    next: string;
    goTo: string;
  }
> = {
  en: {
    stories: [
      { title: 'Midnight Train', tag: 'Travel' },
      { title: 'Cedar Coast', tag: 'Nature' },
      { title: 'Neon Alley', tag: 'City' },
    ],
    counter: 'story {i} of {n}',
    prev: 'Previous story',
    next: 'Next story',
    goTo: 'Go to story {i}',
  },
  'zh-CN': {
    stories: [
      { title: '午夜列车', tag: '旅行' },
      { title: '雪松海岸', tag: '自然' },
      { title: '霓虹小巷', tag: '城市' },
    ],
    counter: '第 {i} / {n} 个故事',
    prev: '上一个故事',
    next: '下一个故事',
    goTo: '前往第 {i} 个故事',
  },
};

const TINTS = [
  'from-indigo-600 to-slate-900',
  'from-emerald-600 to-teal-900',
  'from-rose-600 to-purple-900',
];

const d = computed(() => DATA[locale.value]);
const stories = computed(() => d.value.stories.map((s, i) => ({ ...s, tint: TINTS[i] })));

const index = ref(0);
const dir = ref(1);
let lock = false;

const dots = computed(() => stories.value.map((_, i) => i));

const story = computed(() => stories.value[index.value]);
const counter = computed(() =>
  d.value.counter.replace('{i}', String(index.value + 1)).replace('{n}', String(stories.value.length)),
);

function go(step: number) {
  if (lock) return;
  lock = true;
  dir.value = step;
  index.value = (index.value + step + stories.value.length) % stories.value.length;
  window.setTimeout(() => (lock = false), 420);
}

function goTo(i: number) {
  dir.value = i > index.value ? 1 : -1;
  index.value = i;
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="relative h-56 overflow-hidden rounded-3xl border border-line shadow-lg">
      <AnimatePresence :initial="false">
        <motion.div
          :key="index"
          :initial="{ x: dir * 260, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :exit="{ x: -dir * 260, opacity: 0 }"
          :transition="motionTransitions.springSmooth"
          :class="cn('absolute inset-0 flex flex-col justify-end bg-gradient-to-br p-5 text-white', story.tint)"
        >
          <span
            class="mb-1 w-fit rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest"
          >
            {{ story.tag }}
          </span>
          <p class="text-xl font-semibold tracking-tight">{{ story.title }}</p>
          <p class="text-xs text-white/70">{{ counter }}</p>
        </motion.div>
      </AnimatePresence>
      <button
        :aria-label="d.prev"
        class="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        @click="go(-1)"
      >
        ‹
      </button>
      <button
        :aria-label="d.next"
        class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        @click="go(1)"
      >
        ›
      </button>
    </div>
    <div class="mt-3 flex justify-center gap-1.5">
      <button
        v-for="i in dots"
        :key="i"
        :aria-label="d.goTo.replace('{i}', String(i + 1))"
        :class="cn('h-1.5 rounded-full transition-all', i === index ? 'w-5 bg-fg' : 'w-1.5 bg-line hover:bg-muted')"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
