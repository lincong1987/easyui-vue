<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{
  text?: string;
  variant?: 'rgb' | 'clip' | 'vhs' | 'decode' | 'surge';
  class?: string;
}>();

const VARIANTS = ['rgb', 'clip', 'vhs', 'decode', 'surge'] as const;

const ANIM: Record<string, string> = {
  rgb: 'eu-glitch-rgb 2.6s steps(1) infinite',
  clip: 'eu-glitch-clip 3.1s steps(1) infinite',
  vhs: 'eu-glitch-vhs 2.8s steps(1) infinite',
  surge: 'eu-glitch-surge 2.2s steps(1) infinite',
};

const GLYPHS = '!<>-_\\/[]{}=+*^?#';

const variant = ref(props.variant ?? 'rgb');
const scrambled = ref(props.text ?? 'GLITCH');
const text = props.text ?? 'GLITCH';
let id: number | undefined;

function startDecode() {
  if (variant.value !== 'decode') {
    scrambled.value = text;
    return;
  }
  let frame = 0;
  id = window.setInterval(() => {
    frame += 1;
    const revealed = Math.floor(frame / 3);
    if (revealed >= text.length) {
      scrambled.value = text;
    } else {
      scrambled.value = text
        .split('')
        .map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join('');
    }
  }, 60);
}
startDecode();

onUnmounted(() => {
  if (id) window.clearInterval(id);
});

function setVariant(v: (typeof VARIANTS)[number]) {
  variant.value = v;
  if (id) window.clearInterval(id);
  startDecode();
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <span
      role="text"
      :aria-label="text"
      :class="cn(
        'select-none font-mono text-4xl font-bold tracking-[0.18em]',
        variant === 'decode' && 'tabular-nums',
      )"
      :style="variant !== 'decode' ? { animation: ANIM[variant] } : undefined"
    >
      {{ scrambled }}
    </span>
    <div class="flex gap-1.5">
      <button
        v-for="v in VARIANTS"
        :key="v"
        :aria-pressed="v === variant"
        :class="cn(
          'rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide transition-colors',
          v === variant ? 'bg-fg text-bg' : 'bg-card text-muted hover:text-fg',
        )"
        @click="setVariant(v)"
      >
        {{ v }}
      </button>
    </div>
  </div>
</template>
