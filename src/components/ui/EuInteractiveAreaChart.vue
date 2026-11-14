<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    labels: string[];
    values: number[];
    color?: string;
    class?: string;
  }>(),
  { color: '#6366f1' },
);

function splinePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

const chart = computed(() => {
  const min = Math.min(...props.values);
  const max = Math.max(...props.values);
  const span = max - min || 1;
  const pts = props.values.map((v, i) => ({
    x: (i / (props.values.length - 1)) * 100,
    y: 34 - ((v - min) / span) * 28 - 3,
  }));
  const path = splinePath(pts);
  return { pts, path, area: `${path} L100,40 L0,40 Z` };
});

const svgRef = ref<SVGSVGElement | null>(null);
const scrub = ref<number | null>(null);

function onMove(e: PointerEvent) {
  const rect = svgRef.value?.getBoundingClientRect();
  if (!rect) return;
  const fx = (e.clientX - rect.left) / rect.width;
  const idx = Math.round(fx * (props.values.length - 1));
  scrub.value = Math.max(0, Math.min(props.values.length - 1, idx));
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <svg
      ref="svgRef"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      class="h-44 w-full touch-none"
      role="img"
      :aria-label="`Area chart, ${props.labels[scrub ?? 0]}: ${props.values[scrub ?? 0]}`"
      @pointermove="onMove"
      @pointerleave="scrub = null"
    >
      <defs>
        <linearGradient id="iarea-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="props.color" stop-opacity="0.35" />
          <stop offset="100%" :stop-color="props.color" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <motion.path
        :d="chart.area"
        fill="url(#iarea-fill)"
        :initial="false"
        :animate="{ d: chart.area }"
        :transition="motionTransitions.springSmooth"
      />
      <motion.path
        :d="chart.path"
        fill="none"
        :stroke="props.color"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        :initial="false"
        :animate="{ d: chart.path }"
        :transition="motionTransitions.springSmooth"
      />
      <g v-if="scrub !== null">
        <line
          :x1="chart.pts[scrub].x"
          :x2="chart.pts[scrub].x"
          y1="0"
          y2="40"
          stroke="currentColor"
          class="text-muted"
          stroke-width="1"
          stroke-dasharray="3 3"
          vector-effect="non-scaling-stroke"
        />
        <circle :cx="chart.pts[scrub].x" :cy="chart.pts[scrub].y" r="3" :fill="props.color" vector-effect="non-scaling-stroke" />
      </g>
    </svg>
    <div class="mt-1 flex justify-between text-[10px] text-muted">
      <span>{{ props.labels[0] }}</span>
      <span class="font-medium text-fg tabular-nums">
        {{ scrub !== null ? `${props.labels[scrub]} · ${props.values[scrub]}` : 'hover to scrub' }}
      </span>
      <span>{{ props.labels[props.labels.length - 1] }}</span>
    </div>
  </div>
</template>
