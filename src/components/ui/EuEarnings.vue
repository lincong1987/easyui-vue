<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';
import EuAnimatedNumber from './EuAnimatedNumber.vue';

const props = defineProps<{ class?: string }>();

const PERIODS = ['7D', '30D', '12M'] as const;
type Period = (typeof PERIODS)[number];

function series(period: Period): number[] {
  const n = period === '7D' ? 7 : period === '30D' ? 30 : 12;
  return Array.from({ length: n }, (_, i) => {
    const r = Math.sin((i + n) * 5.31) * 0.5 + 0.5;
    return Math.round(400 + r * 900 + i * (period === '12M' ? 40 : 12));
  });
}

const SOURCES = [
  { name: 'Consulting', color: '#6366f1', share: 0.46 },
  { name: 'Products', color: '#22d3ee', share: 0.3 },
  { name: 'Affiliates', color: '#34d399', share: 0.16 },
  { name: 'Other', color: '#fbbf24', share: 0.08 },
];

const period = ref<Period>('30D');
const scrub = ref<number | null>(null);
const hoverSource = ref<string | null>(null);

const data = computed(() => series(period.value));
const total = computed(() => data.value.reduce((a, b) => a + b, 0));

const chart = computed(() => {
  const values = data.value;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * 100,
    y: 30 - ((v - min) / span) * 22 - 4,
  }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  return { pts, path, area: `${path} L100,34 L0,34 Z` };
});

const shownValue = computed(() => (scrub.value !== null ? data.value[scrub.value] : total.value));
const caption = computed(() =>
  scrub.value !== null ? `point ${scrub.value + 1} of ${data.value.length}` : `${period.value} cumulative`,
);

function selectPeriod(p: Period) {
  period.value = p;
  scrub.value = null;
}

function onMove(e: PointerEvent) {
  const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
  const fx = (e.clientX - rect.left) / rect.width;
  scrub.value = Math.max(0, Math.min(data.value.length - 1, Math.round(fx * (data.value.length - 1))));
}
</script>

<template>
  <div :class="cn('w-full max-w-md rounded-3xl border border-line bg-surface p-5 shadow-sm', props.class)">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs uppercase tracking-widest text-muted">Total earnings</p>
        <p class="mt-1 text-3xl font-semibold tracking-tight">
          <EuAnimatedNumber :key="shownValue" :value="shownValue" currency="USD" />
        </p>
        <p class="mt-0.5 text-xs text-muted">{{ caption }}</p>
      </div>
      <div class="flex rounded-full border border-line bg-card p-0.5">
        <button
          v-for="p in PERIODS"
          :key="p"
          :class="cn(
            'relative rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
            period === p ? 'text-bg' : 'text-muted hover:text-fg',
          )"
          @click="selectPeriod(p)"
        >
          <motion.span
            v-if="period === p"
            layout-id="earnings-period-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-full bg-fg"
          />
          <span class="relative z-10">{{ p }}</span>
        </button>
      </div>
    </div>

    <svg
      viewBox="0 0 100 34"
      preserveAspectRatio="none"
      class="mt-3 h-24 w-full touch-none"
      role="img"
      aria-label="Earnings trend"
      @pointermove="onMove"
      @pointerleave="scrub = null"
    >
      <motion.path
        :d="chart.area"
        fill="url(#earnings-fill)"
        :initial="false"
        :animate="{ d: chart.area }"
        :transition="motionTransitions.springSmooth"
      />
      <motion.path
        :d="chart.path"
        fill="none"
        stroke="#6366f1"
        stroke-width="2"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
        :initial="false"
        :animate="{ d: chart.path }"
        :transition="motionTransitions.springSmooth"
      />
      <circle
        v-if="scrub !== null"
        :cx="chart.pts[scrub].x"
        :cy="chart.pts[scrub].y"
        r="3"
        fill="#6366f1"
        vector-effect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id="earnings-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0.02" />
        </linearGradient>
      </defs>
    </svg>

    <p class="mt-3 text-xs font-medium uppercase tracking-widest text-muted">By source</p>
    <div class="mt-1.5 flex h-3.5 overflow-hidden rounded-full" @pointerleave="hoverSource = null">
      <motion.button
        v-for="s in SOURCES"
        :key="s.name"
        :initial="false"
        :animate="{ flexGrow: s.share }"
        :transition="motionTransitions.springSmooth"
        :aria-label="`${s.name} ${Math.round(s.share * 100)}%`"
        class="h-full transition-[filter]"
        :style="{
          background: s.color,
          filter: hoverSource && hoverSource !== s.name ? 'saturate(0.4) opacity(0.6)' : 'none',
        }"
        @pointerenter="hoverSource = s.name"
      />
    </div>
    <div class="mt-2 grid grid-cols-2 gap-1 text-xs">
      <span
        v-for="s in SOURCES"
        :key="s.name"
        :class="cn('flex items-center gap-1.5 transition-opacity', hoverSource && hoverSource !== s.name && 'opacity-50')"
      >
        <span class="h-2 w-2 rounded-full" :style="{ background: s.color }" />
        {{ s.name }} <span class="text-muted tabular-nums">{{ Math.round(s.share * 100) }}%</span>
      </span>
    </div>
  </div>
</template>
