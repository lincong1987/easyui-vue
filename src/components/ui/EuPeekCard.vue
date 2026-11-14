<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

type Slug = 'donut-chart' | 'wallet-card' | 'command-menu';

interface Preview {
  title: string;
  meta: string;
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    peek: string;
    caption: string;
    previews: Record<Slug, Preview>;
  }
> = {
  en: {
    peek: 'peek:',
    caption: 'hover a trigger — the preview pops from the target edge',
    previews: {
      'donut-chart': { title: 'Donut Chart', meta: 'SVG · hover legend · center readout' },
      'wallet-card': { title: 'Wallet Card', meta: 'pointer shine · spring tap' },
      'command-menu': { title: 'Command Menu', meta: 'fuzzy filter · ↑↓⏎ keys' },
    },
  },
  'zh-CN': {
    peek: '预览：',
    caption: '悬停触发器——预览从目标边缘弹出',
    previews: {
      'donut-chart': { title: 'Donut Chart', meta: 'SVG · 悬停图例 · 中心读数' },
      'wallet-card': { title: 'Wallet Card', meta: '指针高光 · 弹簧点按' },
      'command-menu': { title: 'Command Menu', meta: '模糊筛选 · ↑↓⏎ 按键' },
    },
  },
};

const TINTS: Record<Slug, string> = {
  'donut-chart': 'from-indigo-500 to-violet-500',
  'wallet-card': 'from-blue-600 to-cyan-500',
  'command-menu': 'from-rose-500 to-orange-400',
};

const { locale } = useLocale();
const T = computed(() => DATA[locale.value]);

const slugs: Slug[] = ['donut-chart', 'wallet-card', 'command-menu'];
const open = ref<Slug | null>(null);
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="flex flex-wrap justify-center gap-2.5">
      <div v-for="slug in slugs" :key="slug" class="relative">
        <button
          class="rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-medium text-fg shadow-sm transition-shadow hover:shadow-md"
          @pointerenter="open = slug"
          @pointerleave="open = null"
          @click="open = slug"
        >
          {{ T.peek }} {{ slug.replace(/-/g, ' ') }}
        </button>
        <AnimatePresence>
          <motion.div
            v-if="open === slug"
            :key="slug"
            :initial="{ opacity: 0, y: 6, scale: 0.95 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :exit="{ opacity: 0, y: 6, scale: 0.95 }"
            :transition="motionTransitions.springSnappy"
            role="tooltip"
            class="absolute bottom-full left-1/2 z-30 mb-2 w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <div :class="cn('h-16 bg-gradient-to-br', TINTS[slug])" />
            <div class="p-3">
              <p class="text-xs font-semibold text-fg">{{ T.previews[slug].title }}</p>
              <p class="mt-0.5 text-[10px] text-muted">{{ T.previews[slug].meta }}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <p class="mt-3 text-center text-[10px] text-muted">{{ T.caption }}</p>
  </div>
</template>
