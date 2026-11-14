<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { SendIcon, SparklesIcon, XIcon, ZapIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const MODELS = ['nex-n2.6', 'glm-5.3-flash', 'kimi-k3.1-pro'];
const CHIPS = ['Summarize this page', 'Draft a changelog', 'Explain the springs'];

const value = ref('');
const model = ref(MODELS[0]);
const modelOpen = ref(false);
const streaming = ref(false);
const attachments = ref<string[]>([]);
const taRef = ref<HTMLTextAreaElement | null>(null);

let streamTimer: number | undefined;

function resize() {
  const ta = taRef.value;
  if (!ta) return;
  ta.style.height = 'auto';
  ta.style.height = `${Math.min(140, ta.scrollHeight)}px`;
}

function onInput(e: Event) {
  value.value = (e.target as HTMLTextAreaElement).value;
  resize();
}

function send() {
  if (!value.value.trim() || streaming.value) return;
  streaming.value = true;
  streamTimer = window.setTimeout(() => {
    streaming.value = false;
  }, 2400);
  value.value = '';
  if (taRef.value) taRef.value.style.height = 'auto';
}

function useChip(c: string) {
  value.value = c;
  requestAnimationFrame(resize);
  taRef.value?.focus();
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
}

function removeAttachment(a: string) {
  attachments.value = attachments.value.filter((p) => p !== a);
}

function pickModel(m: string) {
  model.value = m;
  modelOpen.value = false;
}

onUnmounted(() => {
  if (streamTimer !== undefined) window.clearTimeout(streamTimer);
});
</script>

<template>
  <div :class="cn('w-full max-w-md rounded-3xl border border-line bg-surface p-3 shadow-sm', props.class)">
    <div class="flex flex-wrap gap-1.5 pb-2">
      <button
        v-for="c in CHIPS"
        :key="c"
        class="rounded-full border border-line px-2.5 py-1 text-[10px] text-muted transition-colors hover:border-fg/40 hover:text-fg"
        @click="useChip(c)"
      >
        {{ c }}
      </button>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="attachments.length > 0"
        key="attachments"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
        :exit="{ opacity: 0, height: 0 }"
        class="flex flex-wrap gap-1.5 overflow-hidden pb-2"
      >
        <span v-for="a in attachments" :key="a" class="flex items-center gap-1 rounded-lg bg-card px-2 py-1 text-[10px] text-fg">
          📎 {{ a }}
          <button :aria-label="`Remove ${a}`" class="text-muted hover:text-fg" @click="removeAttachment(a)">
            <XIcon :size="9" />
          </button>
        </span>
      </motion.div>
    </AnimatePresence>

    <div
      :class="cn(
        'flex items-end gap-2 rounded-2xl border bg-card/60 px-3 py-2 transition-colors',
        streaming ? 'border-fg/60' : 'border-line',
      )"
    >
      <textarea
        ref="taRef"
        rows="1"
        :value="value"
        :placeholder="streaming ? 'Generating…' : 'Ask anything about the library…'"
        aria-label="Prompt"
        class="max-h-[140px] min-h-9 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted/70"
        @input="onInput"
        @keydown="onKeyDown"
      />
      <motion.button
        v-if="streaming"
        :initial="{ scale: 0.8, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/90 text-white"
        aria-label="Stop generating"
        @click="streaming = false"
      >
        <span class="h-3 w-3 rounded-[2px] bg-current" />
      </motion.button>
      <motion.button
        v-else
        :while-press="{ scale: 0.9 }"
        :transition="motionTransitions.springSnappy"
        :disabled="!value.trim()"
        aria-label="Send prompt"
        :class="cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
          value.trim() ? 'bg-fg text-bg' : 'bg-line text-muted',
        )"
        @click="send"
      >
        <SendIcon :size="15" />
      </motion.button>
    </div>

    <div class="flex items-center justify-between px-1 pt-2">
      <div class="relative">
        <button
          class="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted transition-colors hover:text-fg"
          @click="modelOpen = !modelOpen"
        >
          <ZapIcon :size="10" /> {{ model }}
        </button>
        <AnimatePresence>
          <motion.ul
            v-if="modelOpen"
            key="model-menu"
            :initial="{ opacity: 0, y: -6 }"
            :animate="{ opacity: 1, y: 4 }"
            :exit="{ opacity: 0, y: -6 }"
            :transition="motionTransitions.springSnappy"
            class="absolute bottom-full z-30 mb-1 w-44 rounded-xl border border-line bg-surface p-1 shadow-xl"
          >
            <li v-for="m in MODELS" :key="m">
              <button
                :class="cn(
                  'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors hover:bg-card',
                  m === model ? 'text-fg' : 'text-muted',
                )"
                @click="pickModel(m)"
              >
                <SparklesIcon :size="10" /> {{ m }}
              </button>
            </li>
          </motion.ul>
        </AnimatePresence>
      </div>
      <span class="text-[10px] text-muted tabular-nums">{{ value.length }}/2000</span>
    </div>
  </div>
</template>
