<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    amount?: string;
    class?: string;
  }>(),
  { amount: '$49.00' },
);

type Phase = 'processing' | 'verifying' | 'success';

const PHASES: Phase[] = ['processing', 'verifying', 'success'];

const phase = ref<Phase>('processing');
const failed = ref(false);

const title = computed(() =>
  failed.value
    ? 'Payment failed'
    : phase.value === 'success'
      ? 'Payment complete'
      : phase.value === 'verifying'
        ? 'Verifying with your bank…'
        : 'Processing payment…',
);

const subtitle = computed(() =>
  failed.value ? 'The issuer declined the charge — nothing was taken.' : `${props.amount} · EasyUI Pro annual`,
);

function advance() {
  if (phase.value === 'success') {
    phase.value = 'processing';
    failed.value = false;
    return;
  }
  phase.value = PHASES[PHASES.indexOf(phase.value) + 1];
}

function fail() {
  failed.value = true;
  phase.value = 'processing';
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="overflow-hidden rounded-3xl border border-line bg-surface p-6 text-center shadow-sm">
      <div class="relative mx-auto flex h-20 w-20 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.svg
            v-if="phase === 'success' && !failed"
            key="check"
            viewBox="0 0 52 52"
            class="h-20 w-20"
            :initial="{ scale: 0.7, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :transition="motionTransitions.springResponsive"
          >
            <motion.circle
              cx="26"
              cy="26"
              r="23"
              fill="none"
              stroke="#10b981"
              stroke-width="2.5"
              :initial="{ pathLength: 0 }"
              :animate="{ pathLength: 1 }"
              :transition="{ duration: 0.5, ease: 'easeOut' }"
            />
            <motion.path
              d="m15 27 7.5 7.5L38 20"
              fill="none"
              stroke="#10b981"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :initial="{ pathLength: 0 }"
              :animate="{ pathLength: 1 }"
              :transition="{ duration: 0.4, delay: 0.35, ease: 'easeOut' }"
            />
          </motion.svg>
          <motion.span
            v-else
            key="spinner"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :class="
              cn(
                'flex h-20 w-20 items-center justify-center rounded-full border-2',
                failed ? 'border-red-500/40 text-red-500' : 'border-line border-t-fg',
              )
            "
          >
            <span v-if="failed" class="text-xl font-bold text-red-500">✕</span>
            <motion.span
              v-else
              class="h-10 w-10 rounded-full border-[3px] border-line border-t-fg"
              :animate="{ rotate: 360 }"
              :transition="{ duration: 0.8, repeat: Infinity, ease: 'linear' }"
            />
          </motion.span>
        </AnimatePresence>
      </div>

      <p class="mt-4 text-lg font-semibold tracking-tight">{{ title }}</p>
      <p class="mt-1 text-sm text-muted" aria-live="polite">{{ subtitle }}</p>

      <div class="mt-4 flex justify-center gap-1.5">
        <span
          v-for="p in PHASES"
          :key="p"
          :class="
            cn(
              'h-1.5 rounded-full transition-all',
              PHASES.indexOf(phase) >= PHASES.indexOf(p) && !failed ? 'w-6 bg-fg' : 'w-1.5 bg-line',
            )
          "
        />
      </div>
    </div>

    <div class="mt-3 flex justify-center gap-2">
      <button
        class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95"
        @click="advance"
      >
        {{ phase === 'success' ? 'replay' : 'next stage' }}
      </button>
      <button
        class="rounded-full border border-line px-4 py-2 text-xs font-medium transition-colors hover:bg-card"
        @click="fail"
      >
        simulate failure
      </button>
    </div>
  </div>
</template>
