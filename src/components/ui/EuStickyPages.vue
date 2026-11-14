<script setup lang="ts">
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    pages?: string[];
    class?: string;
  }>(),
  {
    pages: () => ['Dawn', 'Noon', 'Dusk', 'Night'],
  },
);

function pageBg(i: number) {
  return `color-mix(in srgb, var(--color-fg) ${4 + i * 5}%, var(--color-surface))`;
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="h-64 overflow-y-auto rounded-2xl border border-line [scroll-snap-type:y_mandatory]">
      <section
        v-for="(p, i) in props.pages"
        :key="p"
        class="flex h-64 flex-col items-center justify-center border-b border-line last:border-b-0 [scroll-snap-align:start]"
        :style="{ background: pageBg(i) }"
      >
        <p class="text-2xl font-semibold tracking-tight">{{ p }}</p>
        <p class="mt-1 text-xs text-muted">sticky page {{ i + 1 }} of {{ props.pages.length }} — scroll the panel</p>
      </section>
    </div>
    <p class="mt-2 text-center text-[10px] text-muted">scroll-snap stacking without hijacking page scroll</p>
  </div>
</template>
