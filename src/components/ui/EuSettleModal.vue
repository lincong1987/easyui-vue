<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  title?: string;
  class?: string;
}>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', { title: string; open: string; close: string; body: string }> = {
  en: {
    title: 'Settle Modal',
    open: 'Open settle modal',
    close: 'Close',
    body: 'The panel lands with a two-stage settle; the body content arrives a beat later.',
  },
  'zh-CN': {
    title: 'Settle 弹窗',
    open: '打开 Settle 弹窗',
    close: '关闭',
    body: '面板分两段落定，正文内容稍后一拍进场。',
  },
};

const d = computed(() => DATA[locale.value]);
const title = computed(() => props.title ?? d.value.title);

const open = ref(false);

const settleTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
const bodyTransition = { delay: 0.12, ...motionTransitions.easeSoft };
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <button
      type="button"
      class="rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-sm transition-shadow hover:shadow-md"
      @click="open = true"
    >
      {{ d.open }}
    </button>
    <AnimatePresence>
      <div v-if="open" key="settle-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="motionTransitions.easeSoft"
          class="absolute inset-0 bg-black/40"
          @click="open = false"
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          :initial="{ scale: 0.94, y: 14, opacity: 0 }"
          :animate="{ scale: [0.94, 1.02, 1], y: [14, -2, 0], opacity: 1 }"
          :exit="{ scale: 0.96, y: 8, opacity: 0 }"
          :transition="settleTransition"
          class="relative z-10 w-full max-w-sm rounded-3xl border border-line bg-surface p-6 shadow-2xl"
        >
          <div class="flex items-start justify-between">
            <h3 class="text-base font-semibold">{{ title }}</h3>
            <button
              :aria-label="d.close"
              class="rounded-full p-1 text-muted transition-colors hover:bg-card hover:text-fg"
              @click="open = false"
            >
              <XIcon :size="16" />
            </button>
          </div>
          <motion.div
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="bodyTransition"
            class="mt-3 text-sm text-muted"
          >
            <slot>{{ d.body }}</slot>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
