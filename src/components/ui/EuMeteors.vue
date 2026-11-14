<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ count?: number; class?: string }>(), {
  count: 8,
});

/** Deterministic pseudo-random so SSR/CSR and re-renders stay stable. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const meteors = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    left: `${rand(i + 1) * 100}%`,
    top: `${rand(i + 7) * 40 - 10}%`,
    delay: rand(i + 13) * 4,
    duration: 2.6 + rand(i + 21) * 2.4,
    scale: 0.6 + rand(i + 31) * 0.8,
  })),
);
</script>

<template>
  <div aria-hidden="true" :class="cn('pointer-events-none absolute inset-0 overflow-hidden', props.class)">
    <span
      v-for="(m, i) in meteors"
      :key="i"
      class="absolute h-px w-[120px] bg-gradient-to-r from-transparent via-fg/60 to-transparent"
      :style="{
        left: m.left,
        top: m.top,
        transform: `rotate(215deg) scaleX(${m.scale})`,
        animation: `eu-meteor ${m.duration}s linear ${m.delay}s infinite`,
      }"
    >
      <span class="absolute right-0 top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-fg/80 shadow-[0_0_8px_2px_rgba(255,255,255,0.35)]" />
    </span>
  </div>
</template>
