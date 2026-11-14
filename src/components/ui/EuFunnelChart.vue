<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

export interface FunnelStage {
  label: string;
  value: number;
}

const props = defineProps<{
  stages: FunnelStage[];
  class?: string;
}>();

const COLORS = ['#6366f1', '#818cf8', '#22d3ee', '#34d399', '#fbbf24', '#fb7185'];

const top = computed(() => props.stages[0]?.value || 1);
const overall = computed(() =>
  Math.round(((props.stages[props.stages.length - 1]?.value ?? 0) / top.value) * 100),
);
const drops = computed(() => props.stages.slice(1).map((s, i) => props.stages[i].value - s.value));
const biggest = computed(() => (drops.value.length ? Math.max(...drops.value) : 0));
const biggestIdx = computed(() => drops.value.indexOf(biggest.value));

const rows = computed(() =>
  props.stages.map((s, i) => {
    const frac = s.value / top.value;
    const color = COLORS[i % COLORS.length];
    return {
      i,
      label: s.label,
      value: s.value,
      frac,
      width: `${Math.max(8, frac * 100)}%`,
      background: `linear-gradient(90deg, ${color}, ${color}cc)`,
      percent: Math.round(frac * 100),
      lost: i > 0 ? drops.value[i - 1] : 0,
    };
  }),
);
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="space-y-1.5">
      <div v-for="row in rows" :key="row.label">
        <div v-if="row.i > 0" class="mb-1 flex items-center gap-2 pl-2 text-[11px] text-muted">
          <span class="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 font-medium text-red-600 dark:text-red-400">
            −{{ row.lost }} lost
          </span>
          <span class="h-px flex-1 bg-line" />
        </div>
        <motion.div
          :initial="{ width: 0, opacity: 0 }"
          :while-in-view="{ width: row.width, opacity: 1 }"
          :in-view-options="{ once: true }"
          :transition="{ ...motionTransitions.springSmooth, delay: row.i * 0.08 }"
          class="flex h-11 items-center justify-between rounded-xl px-3 text-sm text-white"
          :style="{ background: row.background, minWidth: '30%' }"
        >
          <span class="font-medium">{{ row.label }}</span>
          <span class="tabular-nums opacity-90">{{ row.value }} · {{ row.percent }}%</span>
        </motion.div>
      </div>
    </div>
    <p class="mt-3 text-xs text-muted" aria-live="polite">
      Overall conversion <span class="font-semibold text-fg tabular-nums">{{ overall }}%</span>
      <template v-if="biggest > 0">
        · biggest drop at <span class="font-medium text-fg">{{ props.stages[biggestIdx + 1]?.label }}</span> (−{{ biggest }})
      </template>
    </p>
  </div>
</template>
