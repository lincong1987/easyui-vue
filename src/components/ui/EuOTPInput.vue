<script setup lang="ts">
import { ref, type ComponentPublicInstance } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    length?: number;
    class?: string;
  }>(),
  { length: 6 },
);

const emit = defineEmits<{ complete: [code: string] }>();

const digits = ref<string[]>(Array.from({ length: props.length }, () => ''));
const focusIdx = ref(0);
const inputs = ref<(HTMLInputElement | null)[]>([]);

function setInputRef(i: number, el: Element | ComponentPublicInstance | null) {
  inputs.value[i] = el instanceof HTMLInputElement ? el : null;
}

function setDigit(i: number, ch: string) {
  const d = ch.replace(/\D/g, '').slice(-1);
  const next = [...digits.value];
  next[i] = d;
  digits.value = next;
  if (d && i < props.length - 1) {
    inputs.value[i + 1]?.focus();
    focusIdx.value = i + 1;
  }
  if (next.every((x) => x !== '')) emit('complete', next.join(''));
}

function onInput(i: number, e: Event) {
  const input = e.target as HTMLInputElement;
  setDigit(i, input.value);
  input.value = digits.value[i] ?? '';
}

function onKeyDown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    inputs.value[i - 1]?.focus();
    focusIdx.value = i - 1;
  } else if (e.key === 'ArrowLeft' && i > 0) {
    inputs.value[i - 1]?.focus();
    focusIdx.value = i - 1;
  } else if (e.key === 'ArrowRight' && i < props.length - 1) {
    inputs.value[i + 1]?.focus();
    focusIdx.value = i + 1;
  }
}
</script>

<template>
  <div :class="cn('flex gap-2', props.class)" role="group" aria-label="One-time passcode">
    <div v-for="(d, i) in digits" :key="i" class="relative">
      <input
        :ref="(el) => setInputRef(i, el)"
        :value="d"
        inputmode="numeric"
        autocomplete="one-time-code"
        :aria-label="`Digit ${i + 1}`"
        :class="cn(
          'h-12 w-11 rounded-xl border bg-surface text-center text-lg font-semibold tabular-nums outline-none transition-colors',
          focusIdx === i ? 'border-fg' : 'border-line hover:border-fg/40',
        )"
        @focus="focusIdx = i"
        @input="onInput(i, $event)"
        @keydown="onKeyDown(i, $event)"
      />
      <AnimatePresence>
        <motion.span
          v-if="d !== ''"
          :key="d + i"
          :initial="{ scale: 0.5, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0.6, opacity: 0 }"
          :transition="motionTransitions.springResponsive"
          class="pointer-events-none absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums"
        >{{ d }}</motion.span>
      </AnimatePresence>
    </div>
  </div>
</template>
