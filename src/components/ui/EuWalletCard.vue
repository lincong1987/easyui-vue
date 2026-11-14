<script setup lang="ts">
import { ref } from 'vue';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CreditCardIcon, SendIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    balance?: string;
    cardType?: string;
    cardLastFour?: string;
    buttonLabel?: string;
    balanceLabel?: string;
    class?: string;
  }>(),
  {
    balance: '$4,566.00',
    cardType: 'Mastercard',
    cardLastFour: '3040',
    buttonLabel: 'Use Wallet',
    balanceLabel: 'Total Balance',
  },
);

const el = ref<HTMLDivElement | null>(null);
const reduced = useReducedMotion();
const pressed = ref(false);
const px = useMotionValue(-1000);
const py = useMotionValue(-1000);

function onMove(e: PointerEvent) {
  if (reduced.value) return;
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  px.set(e.clientX - rect.left);
  py.set(e.clientY - rect.top);
}

function onLeave() {
  px.set(-1000);
  py.set(-1000);
}

const shine = useMotionTemplate`radial-gradient(220px circle at ${px}px ${py}px, rgba(56, 224, 240, 0.18), transparent 70%)`;
</script>

<template>
  <div
    ref="el"
    :class="cn(
      'relative isolate aspect-[458/285] w-full max-w-[458px] select-none overflow-hidden rounded-[26px] bg-[#020202] text-white',
      'shadow-[0_24px_42px_rgba(0,0,0,0.48),0_8px_20px_rgba(0,0,0,0.28)]',
      props.class,
    )"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <!-- Painted blue radial surface + diagonal specular sweep -->
    <div
      aria-hidden="true"
      class="absolute inset-0"
      :style="{
        background:
          'radial-gradient(120% 150% at 85% -10%, rgba(56,116,255,0.55), rgba(24,52,140,0.35) 45%, rgba(2,2,2,0) 75%)',
      }"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0"
      :style="{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.09) 45%, transparent 60%)' }"
    />
    <motion.div aria-hidden="true" :style="{ background: shine }" class="absolute inset-0" />

    <div class="relative z-10 flex h-full flex-col justify-between p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-[22px] font-normal leading-tight tracking-[-0.02em] text-white/90">{{ props.balance }}</p>
          <p class="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">{{ props.balanceLabel }}</p>
        </div>
        <CreditCardIcon :size="22" class="text-white/70" />
      </div>

      <div class="flex items-end justify-between">
        <p class="text-xs tracking-wide text-white/55">{{ props.cardType }} •••• {{ props.cardLastFour }}</p>
        <motion.button
          type="button"
          :while-press="reduced ? undefined : { scale: 0.97 }"
          :transition="motionTransitions.springSnappy"
          class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          @pointerdown="pressed = true"
          @pointerup="pressed = false"
          @pointerleave="pressed = false"
        >
          <SendIcon :size="14" />
          {{ pressed ? 'Tap!' : props.buttonLabel }}
        </motion.button>
      </div>
    </div>
  </div>
</template>
