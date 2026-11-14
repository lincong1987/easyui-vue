<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';
import EuAnimatedNumber from './EuAnimatedNumber.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    delta?: number;
    series?: number[];
    class?: string;
  }>(),
  { prefix: '', suffix: '', delta: 0 },
);

const up = computed(() => props.delta >= 0);

const sparkPath = computed(() => {
  const points = props.series ?? [];
  if (points.length < 2) return '';
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 30 - ((p - min) / span) * 24 - 3;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
});

const hasSeries = computed(() => (props.series?.length ?? 0) > 1);
</script>

<template>
  <motion.div
    :while-hover="{ y: -2 }"
    :transition="motionTransitions.springSnappy"
    :class="cn('rounded-2xl border border-line bg-surface p-4 shadow-sm', props.class)"
  >
    <p class="text-xs font-medium uppercase tracking-wide text-muted">{{ props.label }}</p>
    <div class="mt-1.5 flex items-baseline gap-2">
      <span class="text-2xl font-semibold tracking-tight">{{ props.prefix }}<EuAnimatedNumber :key="props.value" :value="props.value" />{{ props.suffix }}</span>
      <span
        :class="cn(
          'rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums',
          up ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400',
        )"
      >
        {{ up ? '▲' : '▼' }} {{ Math.abs(props.delta).toFixed(1) }}%
      </span>
    </div>
    <div v-if="hasSeries" class="mt-2">
      <svg viewBox="0 0 100 30" class="h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          :d="sparkPath"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="up ? 'stroke-emerald-500' : 'stroke-red-500'"
          :initial="{ pathLength: 0 }"
          :animate="{ pathLength: 1 }"
          :transition="{ duration: 1.1, ease: 'easeOut' }"
        />
      </svg>
    </div>
  </motion.div>
</template>
