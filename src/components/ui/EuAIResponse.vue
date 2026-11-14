<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, CopyIcon, SparklesIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  prompt?: string;
  class?: string;
}>();

const DATA: Record<
  'en' | 'zh-CN',
  {
    defaultPrompt: string;
    answer: string;
    copy: string;
    copied: string;
    goodAria: string;
    badAria: string;
  }
> = {
  en: {
    defaultPrompt: 'How do I build a pointer-following shine?',
    answer: `Use framer-motion's useMotionValue + useMotionTemplate for pointer effects:

const px = useMotionValue(-1000);
const shine = useMotionTemplate\`radial-gradient(220px circle at \${px}px 0px, rgba(99,102,241,.2), transparent 70%)\`;

No React state updates per frame — the gradient is pure MotionValue output.`,
    copy: 'Copy',
    copied: 'Copied',
    goodAria: 'Good response',
    badAria: 'Bad response',
  },
  'zh-CN': {
    defaultPrompt: '如何实现跟随指针的光泽效果？',
    answer: `用 framer-motion 的 useMotionValue + useMotionTemplate 实现指针跟随效果：

const px = useMotionValue(-1000);
const shine = useMotionTemplate\`radial-gradient(220px circle at \${px}px 0px, rgba(99,102,241,.2), transparent 70%)\`;

每帧都不触发 React 状态更新 —— 渐变完全由 MotionValue 的输出驱动。`,
    copy: '复制',
    copied: '已复制',
    goodAria: '回答有帮助',
    badAria: '回答无帮助',
  },
};

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);
const promptText = computed(() => props.prompt ?? ui.value.defaultPrompt);

const full = computed(() => ui.value.answer);
const CHUNKS = computed(() => full.value.match(/\S+\s*/g) ?? [full.value]);

const shown = ref(0);
const copied = ref(false);
const vote = ref<'up' | 'down' | null>(null);
const streaming = computed(() => shown.value < CHUNKS.value.length);
const text = computed(() => CHUNKS.value.slice(0, shown.value).join(''));

watch(
  streaming,
  (isStreaming, _prev, onCleanup) => {
    if (!isStreaming) return;
    const id = window.setInterval(() => {
      shown.value = Math.min(CHUNKS.value.length, shown.value + 2);
    }, 55);
    onCleanup(() => window.clearInterval(id));
  },
  { immediate: true },
);

function copy() {
  navigator.clipboard?.writeText(full.value).catch(() => {});
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1600);
}
</script>

<template>
  <div :class="cn('w-full max-w-md overflow-hidden rounded-3xl border border-line bg-surface', props.class)">
    <div class="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-muted">
      <SparklesIcon :size="13" class="text-accent" />
      <span class="truncate">{{ promptText }}</span>
    </div>
    <div class="p-4">
      <p class="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-fg" aria-live="polite">
        {{ text }}<motion.span
          v-if="streaming"
          class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-fg"
          :animate="{ opacity: [1, 0.1, 1] }"
          :transition="{ duration: 0.7, repeat: Infinity }"
        />
      </p>
    </div>
    <motion.div
      v-if="!streaming"
      :initial="{ opacity: 0, y: 6 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="motionTransitions.easeSoft"
      class="flex items-center gap-1.5 border-t border-line px-3 py-2"
    >
      <button
        class="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-muted transition-colors hover:bg-card hover:text-fg"
        @click="copy"
      >
        <CheckIcon v-if="copied" :size="12" />
        <CopyIcon v-else :size="12" />
        {{ copied ? ui.copied : ui.copy }}
      </button>
      <span class="flex-1" />
      <button
        :aria-label="ui.goodAria"
        :class="
          cn(
            'rounded-full px-2 py-1 text-xs transition-colors hover:bg-card',
            vote === 'up' ? 'text-emerald-600' : 'text-muted',
          )
        "
        @click="vote = 'up'"
      >
        ▲
      </button>
      <button
        :aria-label="ui.badAria"
        :class="
          cn(
            'rounded-full px-2 py-1 text-xs transition-colors hover:bg-card',
            vote === 'down' ? 'text-red-500' : 'text-muted',
          )
        "
        @click="vote = 'down'"
      >
        ▼
      </button>
    </motion.div>
  </div>
</template>
