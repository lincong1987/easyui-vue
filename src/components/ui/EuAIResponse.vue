<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, CopyIcon, SparklesIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    prompt?: string;
    class?: string;
  }>(),
  { prompt: 'How do I build a pointer-following shine?' },
);

const FULL = `Use framer-motion's useMotionValue + useMotionTemplate for pointer effects:

const px = useMotionValue(-1000);
const shine = useMotionTemplate\`radial-gradient(220px circle at \${px}px 0px, rgba(99,102,241,.2), transparent 70%)\`;

No React state updates per frame — the gradient is pure MotionValue output.`;

const CHUNKS: string[] = FULL.match(/\S+\s*/g) ?? [FULL];

const shown = ref(0);
const copied = ref(false);
const vote = ref<'up' | 'down' | null>(null);
const streaming = computed(() => shown.value < CHUNKS.length);
const text = computed(() => CHUNKS.slice(0, shown.value).join(''));

watch(
  streaming,
  (isStreaming, _prev, onCleanup) => {
    if (!isStreaming) return;
    const id = window.setInterval(() => {
      shown.value = Math.min(CHUNKS.length, shown.value + 2);
    }, 55);
    onCleanup(() => window.clearInterval(id));
  },
  { immediate: true },
);

function copy() {
  navigator.clipboard?.writeText(FULL).catch(() => {});
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
      <span class="truncate">{{ props.prompt }}</span>
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
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
      <span class="flex-1" />
      <button
        aria-label="Good response"
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
        aria-label="Bad response"
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
