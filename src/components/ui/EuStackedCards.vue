<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const CARDS = [
  {
    title: 'Signal',
    body: 'Scroll the panel — each card stacks with a scale falloff.',
    tint: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Structure',
    body: 'Cards keep their place via sticky offsets, no scroll hijack.',
    tint: 'from-cyan-500 to-sky-500',
  },
  {
    title: 'Settle',
    body: 'The last card rests flush and releases into normal flow.',
    tint: 'from-emerald-500 to-teal-500',
  },
];

const scrolled = ref(0);

function onScroll(e: Event) {
  scrolled.value = (e.currentTarget as HTMLElement).scrollTop;
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="h-72 overflow-y-auto rounded-2xl border border-line" @scroll="onScroll">
      <div v-for="(c, i) in CARDS" :key="c.title" class="sticky px-4 pb-4" :style="{ top: `${24 + i * 14}px` }">
        <div
          :class="cn('flex h-52 flex-col justify-end rounded-3xl bg-gradient-to-br p-5 text-white shadow-xl', c.tint)"
          :style="{
            transform: `scale(${1 - (CARDS.length - 1 - i) * 0.03})`,
            opacity: scrolled > i * 40 || i === 0 ? 1 : 0.85,
          }"
        >
          <p class="text-lg font-semibold tracking-tight">{{ c.title }}</p>
          <p class="mt-1 text-sm text-white/80">{{ c.body }}</p>
          <p class="mt-3 text-[10px] uppercase tracking-widest text-white/60">stack depth {{ i + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
