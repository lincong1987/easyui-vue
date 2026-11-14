<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    pages?: number;
    class?: string;
  }>(),
  { pages: 7 },
);

const page = ref(3);

const numbers = computed(() => Array.from({ length: props.pages }, (_, i) => i + 1));

function prev() {
  page.value = Math.max(1, page.value - 1);
}

function next() {
  page.value = Math.min(props.pages, page.value + 1);
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <div class="flex items-center gap-1">
      <button
        aria-label="Previous page"
        class="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
        @click="prev"
      >
        ‹
      </button>
      <button
        v-for="p in numbers"
        :key="p"
        :aria-current="p === page ? 'page' : undefined"
        :class="cn(
          'relative h-9 min-w-9 rounded-full px-2 text-sm tabular-nums transition-colors',
          p === page ? 'text-bg' : 'text-muted hover:text-fg',
        )"
        @click="page = p"
      >
        <motion.span
          v-if="p === page"
          layout-id="slide-pagination-pill"
          :transition="motionTransitions.springMorph"
          class="absolute inset-0 rounded-full bg-fg"
        />
        <span class="relative z-10">{{ p }}</span>
      </button>
      <button
        aria-label="Next page"
        class="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
        @click="next"
      >
        ›
      </button>
    </div>
    <p class="text-xs text-muted" aria-live="polite">
      showing page {{ page }} of {{ props.pages }} — the pill travels between numbers
    </p>
  </div>
</template>
