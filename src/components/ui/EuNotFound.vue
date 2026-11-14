<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    code?: string;
    class?: string;
  }>(),
  { code: '404' },
);

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', { error: string; title: string; body: string; home: string; browse: string }> = {
  en: {
    error: 'Error {code}',
    title: 'This route drifted off the map.',
    body: 'The page you want may have moved or never shipped.',
    home: 'Back home',
    browse: 'Browse components',
  },
  'zh-CN': {
    error: '错误 {code}',
    title: '这条路由已经漂离了地图。',
    body: '你要找的页面可能已迁移，或从未上线。',
    home: '返回首页',
    browse: '浏览组件',
  },
};

const d = computed(() => DATA[locale.value]);
const chars = computed(() => props.code.split(''));
</script>

<template>
  <div :class="cn('flex w-full flex-col items-center gap-4 py-6 text-center', props.class)">
    <div class="flex gap-1 text-6xl font-bold tracking-tight text-fg" :aria-label="d.error.replace('{code}', props.code)">
      <motion.span
        v-for="(ch, i) in chars"
        :key="i"
        :animate="{ y: [0, -7, 0], rotate: [0, i % 2 ? 3 : -3, 0] }"
        :transition="{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }"
        class="inline-block"
      >
        {{ ch }}
      </motion.span>
    </div>
    <div>
      <p class="text-sm font-medium">{{ d.title }}</p>
      <p class="mt-1 text-sm text-muted">{{ d.body }}</p>
    </div>
    <div class="flex gap-2">
      <a href="#/" class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95">
        {{ d.home }}
      </a>
      <a
        href="#/components"
        class="rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-fg"
      >
        {{ d.browse }}
      </a>
    </div>
  </div>
</template>
