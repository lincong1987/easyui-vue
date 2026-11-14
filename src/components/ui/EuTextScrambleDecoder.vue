<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    text: string;
    /** ms between scramble ticks. */
    speed?: number;
    class?: string;
  }>(),
  { speed: 34 },
);

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';

function scrambleFor(text: string, revealed: number): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (i < revealed || ch === ' ') out += ch;
    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return out;
}

const display = ref(scrambleFor(props.text, 0));
let timer: ReturnType<typeof setInterval> | null = null;

function start() {
  if (timer) clearInterval(timer);
  let frame = 0;
  const total = props.text.length;
  timer = setInterval(() => {
    frame += 1;
    // each character locks in after a staggered number of ticks
    const revealed = Math.floor(frame / 2.2);
    if (revealed >= total) {
      display.value = props.text;
      if (timer) clearInterval(timer);
      timer = null;
    } else {
      display.value = scrambleFor(props.text, revealed);
    }
  }, props.speed);
}

onMounted(start);
watch([() => props.text, () => props.speed], start);
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <span :class="cn('font-mono tabular-nums', props.class)" :aria-label="props.text" role="text">{{ display }}</span>
</template>
