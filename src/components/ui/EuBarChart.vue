<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

export interface BarChartSeries {
  name: string;
  color: string;
  values: number[];
}

const props = withDefaults(
  defineProps<{
    labels: string[];
    series: BarChartSeries[];
    stacked?: boolean;
    class?: string;
  }>(),
  { stacked: false },
);

const H = 150;
const GRID = [0.25, 0.5, 0.75, 1];

const hidden = ref<Set<string>>(new Set());
const hover = ref<{ i: number; name: string; value: number } | null>(null);

const visible = computed(() => props.series.filter((s) => !hidden.value.has(s.name)));

const max = computed(() => {
  let m = 1;
  props.labels.forEach((_, i) => {
    const total = visible.value.reduce((a, s) => a + (s.values[i] ?? 0), 0);
    const peak = props.stacked ? total : Math.max(...visible.value.map((s) => s.values[i] ?? 0));
    m = Math.max(m, peak);
  });
  return m;
});

interface GroupBar {
  name: string;
  color: string;
  value: number;
  width: number;
  height: number;
  x?: number;
  y?: number;
  xAnim?: number;
  yAttr?: number;
}

const groups = computed(() => {
  const n = props.labels.length;
  const groupW = n ? 100 / n : 100;
  return props.labels.map((label, i) => {
    const x0 = i * groupW;
    const inner = groupW * 0.6;
    if (props.stacked) {
      let acc = 0;
      const bars: GroupBar[] = visible.value.map((s) => {
        const frac = (s.values[i] ?? 0) / max.value;
        acc += frac;
        return {
          name: s.name,
          color: s.color,
          value: s.values[i] ?? 0,
          x: x0 + (groupW - inner) / 2,
          width: inner,
          height: H * frac,
          y: H * (1 - acc),
        };
      });
      return { i, label, bars };
    }
    const barW = inner / Math.max(1, visible.value.length);
    const bars: GroupBar[] = visible.value.map((s, si) => {
      const frac = (s.values[i] ?? 0) / max.value;
      return {
        name: s.name,
        color: s.color,
        value: s.values[i] ?? 0,
        width: barW * 0.85,
        height: H * frac,
        xAnim: x0 + (groupW - inner) / 2 + si * barW,
        yAttr: H * (1 - frac),
      };
    });
    return { i, label, bars };
  });
});

const legendLabel = computed(() => `Bar chart: ${visible.value.map((s) => s.name).join(', ')}`);

function toggleSeries(name: string) {
  const next = new Set(hidden.value);
  if (next.has(name)) next.delete(name);
  else if (hidden.value.size < props.series.length - 1) next.add(name);
  hidden.value = next;
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="relative h-[170px] w-full">
      <svg
        viewBox="0 0 100 150"
        preserveAspectRatio="none"
        class="absolute inset-0 h-full w-full"
        role="img"
        :aria-label="legendLabel"
      >
        <line
          v-for="f in GRID"
          :key="f"
          x1="0"
          x2="100"
          :y1="H * (1 - f)"
          :y2="H * (1 - f)"
          class="stroke-line"
          stroke-width="0.4"
          vector-effect="non-scaling-stroke"
        />
        <g v-for="g in groups" :key="g.i">
          <template v-if="props.stacked">
            <motion.rect
              v-for="b in g.bars"
              :key="b.name"
              :x="b.x"
              :width="b.width"
              :fill="b.color"
              rx="1"
              :initial="false"
              :animate="{ y: b.y ?? 0, height: b.height, opacity: hover && hover.i === g.i ? 1 : 0.92 }"
              :transition="motionTransitions.springSmooth"
              style="cursor: pointer"
              @pointerenter="hover = { i: g.i, name: b.name, value: b.value }"
              @pointerleave="hover = null"
            />
          </template>
          <template v-else>
            <motion.rect
              v-for="b in g.bars"
              :key="b.name"
              :y="b.yAttr"
              :width="b.width"
              :fill="b.color"
              rx="1"
              :initial="false"
              :animate="{ x: b.xAnim ?? 0, height: b.height, opacity: hover && hover.i === g.i ? 1 : 0.92 }"
              :transition="motionTransitions.springSmooth"
              style="cursor: pointer"
              @pointerenter="hover = { i: g.i, name: b.name, value: b.value }"
              @pointerleave="hover = null"
            />
          </template>
        </g>
      </svg>
      <div
        v-if="hover"
        class="pointer-events-none absolute right-2 top-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-md"
      >
        <span class="font-medium">{{ props.labels[hover.i] }}</span>
        <span class="text-muted"> · {{ hover.name }}: </span>
        <span class="font-semibold tabular-nums">{{ hover.value }}</span>
      </div>
    </div>
    <div class="mt-1 flex justify-between pl-1 text-[10px] text-muted">
      <span v-for="l in props.labels" :key="l">{{ l }}</span>
    </div>
    <div class="mt-2 flex flex-wrap gap-3">
      <button
        v-for="s in props.series"
        :key="s.name"
        :class="cn('flex items-center gap-1.5 text-xs transition-opacity', hidden.has(s.name) && 'opacity-40')"
        @click="toggleSeries(s.name)"
      >
        <span class="h-2.5 w-2.5 rounded-sm" :style="{ background: s.color }" />
        {{ s.name }}
      </button>
    </div>
  </div>
</template>
