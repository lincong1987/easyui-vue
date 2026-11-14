<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();

interface Tier {
  name: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const DATA: Record<'en' | 'zh-CN', { recommended: string; tiers: Tier[] }> = {
  en: {
    recommended: 'Recommended',
    tiers: [
      {
        name: 'Free',
        price: '$0',
        note: 'forever',
        features: ['66 ported components', 'MIT license', 'Community support'],
        cta: 'Start building',
        featured: false,
      },
      {
        name: 'Pro',
        price: '$49',
        note: '/ month',
        features: ['All 134 components', 'Priority registry sync', 'Motion design reviews', 'Sponsor badge'],
        cta: 'Sponsor & go Pro',
        featured: true,
      },
    ],
  },
  'zh-CN': {
    recommended: '推荐',
    tiers: [
      {
        name: '免费版',
        price: '$0',
        note: '永久',
        features: ['66 个已移植组件', 'MIT 许可证', '社区支持'],
        cta: '开始构建',
        featured: false,
      },
      {
        name: 'Pro',
        price: '$49',
        note: '/ 月',
        features: ['全部 134 个组件', '优先 registry 同步', '动效设计评审', '赞助者徽章'],
        cta: '赞助并升级 Pro',
        featured: true,
      },
    ],
  },
};

const d = computed(() => DATA[locale.value]);
</script>

<template>
  <div :class="cn('grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2', props.class)">
    <motion.div
      v-for="t in d.tiers"
      :key="t.name"
      :while-hover="{ y: -4 }"
      :transition="motionTransitions.springSnappy"
      :class="cn(
        'relative flex flex-col rounded-3xl border p-5',
        t.featured ? 'border-fg/60 bg-surface shadow-lg' : 'border-line bg-surface',
      )"
    >
      <span
        v-if="t.featured"
        class="absolute -top-2.5 right-4 rounded-full bg-fg px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bg"
      >
        {{ d.recommended }}
      </span>
      <p class="text-sm font-medium text-muted">{{ t.name }}</p>
      <p class="mt-1.5 text-3xl font-semibold tracking-tight">
        {{ t.price }}
        <span class="ml-1 text-xs font-normal text-muted">{{ t.note }}</span>
      </p>
      <ul class="mt-4 flex-1 space-y-2">
        <li v-for="f in t.features" :key="f" class="flex items-start gap-2 text-sm text-muted">
          <CheckIcon :size="14" class="mt-0.5 shrink-0 text-fg" />
          {{ f }}
        </li>
      </ul>
      <button
        :class="cn(
          'mt-5 h-10 rounded-xl text-sm font-medium transition-transform active:scale-[0.98]',
          t.featured ? 'bg-fg text-bg hover:opacity-90' : 'border border-line hover:bg-card',
        )"
      >
        {{ t.cta }}
      </button>
    </motion.div>
  </div>
</template>
