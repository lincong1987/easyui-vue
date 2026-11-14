<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ label?: string; class?: string }>(), {
  label: 'Deploy to production',
});

const shown = ref('');
const sound = ref(false);
const ctx = ref<AudioContext | null>(null);

let index = 0;
let timer: number | undefined;

function tick(context: AudioContext) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.frequency.value = 1800 + Math.random() * 600;
  gain.gain.setValueAtTime(0.03, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);
  osc.connect(gain).connect(context.destination);
  osc.start();
  osc.stop(context.currentTime + 0.06);
}

function start() {
  window.clearInterval(timer);
  shown.value = '';
  index = 0;
  timer = window.setInterval(() => {
    index += 1;
    shown.value = props.label.slice(0, index);
    if (sound.value && ctx.value) tick(ctx.value);
    if (index >= props.label.length) window.clearInterval(timer);
  }, 70);
}

function toggleSound() {
  if (!ctx.value) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx.value = new Ctor();
  }
  sound.value = !sound.value;
}

watch([() => props.label, sound], start, { immediate: true });

onUnmounted(() => window.clearInterval(timer));
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <motion.button
      :while-press="{ scale: 0.96 }"
      class="h-12 rounded-xl bg-fg px-5 font-mono text-sm text-bg"
      :aria-label="props.label"
    >
      {{ shown }}<span class="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-current align-middle" />
    </motion.button>
    <button
      class="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-muted transition-colors hover:text-fg"
      @click="toggleSound"
    >
      sound: {{ sound ? 'on' : 'off' }}
    </button>
  </div>
</template>
