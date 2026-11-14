<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

const props = defineProps<{
  segments: DonutSegment[];
  half?: boolean;
  class?: string;
}>();

const R = 56;
const CIRC = 2 * Math.PI * R;
const off = ref<string | null>(null);
const hidden = ref<Set<string>>(new Set());

function toggleLegend(label: string) {
  const next = new Set(hidden.value);
  if (next.has(label)) next.delete(label);
  else next.add(label);
  hidden.value = next;
}

const visible = computed(() => props.segments.filter((s) => !hidden.value.has(s.label)));
const total = computed(() => visible.value.reduce((a, s) => a + s.value, 0) || 1);
const arcs = computed(() => {
  let acc = 0;
  return visible.value.map((s) => {
    const frac = s.value / total.value;
    const arc = { ...s, frac, offset: acc };
    acc += frac;
    return arc;
  });
});
</script>

<template>
  <div :class="cn('flex flex-wrap items-center justify-center gap-6', props.class)">
    <div class="relative">
      <svg
        :width="150"
        :height="props.half ? 90 : 150"
        :viewBox="props.half ? '0 0 150 90' : '0 0 150 150'"
        role="img"
        :aria-label="`Donut chart: ${visible.map((s) => s.label + ' ' + s.value).join(', ')}`"
      >
        <g :transform="props.half ? 'translate(0, 10)' : undefined">
          <circle
            cx="75"
            cy="75"
            :r="R"
            fill="none"
            stroke-width="16"
            class="stroke-line"
            :stroke-dasharray="`${CIRC * (props.half ? 0.5 : 1)} ${CIRC}`"
            :transform="props.half ? 'rotate(-90 75 75)' : undefined"
            opacity="0.6"
          />
          <motion.circle
            v-for="a in arcs"
            :key="a.label"
            cx="75"
            cy="75"
            :r="R"
            fill="none"
            :stroke="a.color"
            :stroke-width="off === a.label ? 20 : 16"
            stroke-linecap="butt"
            :stroke-dasharray="`${a.frac * CIRC * (props.half ? 0.5 : 1) - 2} ${CIRC}`"
            :initial="{ strokeDashoffset: CIRC }"
            :animate="{
              strokeDashoffset: -(a.offset * CIRC * (props.half ? 0.5 : 1)) + (props.half ? CIRC * 0.25 : 0),
              opacity: off && off !== a.label ? 0.35 : 1,
            }"
            :transition="motionTransitions.springSmooth"
            transform="rotate(-90 75 75)"
            style="cursor: pointer"
            @pointerenter="off = a.label"
            @pointerleave="off = null"
          />
        </g>
      </svg>
      <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-lg font-semibold tabular-nums">
          {{ Math.round(((off ? arcs.find((a) => a.label === off)?.value ?? 0 : total) / total) * 100) }}%
        </span>
        <span class="text-xs text-muted">{{ off ? arcs.find((a) => a.label === off)?.label : 'Total' }}</span>
      </div>
    </div>
    <ul class="space-y-1.5">
      <li v-for="s in props.segments" :key="s.label">
        <button
          :class="cn('flex items-center gap-2 text-sm transition-opacity', hidden.has(s.label) ? 'opacity-40' : 'opacity-100')"
          @click="toggleLegend(s.label)"
        >
          <span class="h-2.5 w-2.5 rounded-full" :style="{ background: s.color }" />
          <span class="text-fg">{{ s.label }}</span>
          <span class="text-muted tabular-nums">{{ s.value }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
