<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronRightIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    trail?: string[];
    class?: string;
  }>(),
  { trail: () => ['Home', 'Library', 'Components', 'Donut Chart'] },
);

const hover = ref<number | null>(null);
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-0.5 text-sm">
      <span v-for="(t, i) in props.trail" :key="t" class="flex items-center gap-0.5">
        <ChevronRightIcon v-if="i > 0" :size="13" class="text-muted" />
        <span class="relative" @pointerenter="hover = i" @pointerleave="hover = null">
          <motion.span
            v-if="hover === i"
            layout-id="breadcrumb-pill"
            :transition="motionTransitions.springMorph"
            class="absolute -inset-x-2 -inset-y-1 rounded-full bg-fg/[0.07] dark:bg-white/10"
          />
          <span
            :class="cn(
              'relative z-10 cursor-default px-1 transition-colors',
              i === props.trail.length - 1 ? 'font-medium text-fg' : 'text-muted hover:text-fg',
            )"
            :aria-current="i === props.trail.length - 1 ? 'page' : undefined"
          >
            {{ t }}
          </span>
        </span>
      </span>
    </nav>
    <p class="mt-2 text-xs text-muted">hover any crumb — one pill glides between them</p>
  </div>
</template>
