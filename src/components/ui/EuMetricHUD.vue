<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();

const DATA: Record<
  'en' | 'zh-CN',
  {
    throughput: string;
    deltaLabel: string;
    hint: string;
    point: string;
    sparkline: string;
  }
> = {
  en: {
    throughput: 'throughput',
    deltaLabel: '{sign} {n} over {range}',
    hint: 'hover the line to inspect points',
    point: 'point {i}/{n} · {v} req/s',
    sparkline: 'Throughput sparkline',
  },
  'zh-CN': {
    throughput: '吞吐量',
    deltaLabel: '{sign} {n}，对比 {range}',
    hint: '悬停折线可查看数据点',
    point: '第 {i}/{n} 个数据点 · {v} req/s',
    sparkline: '吞吐量迷你折线图',
  },
};

const d = computed(() => DATA[locale.value]);

const RANGES = ['1H', '24H', '7D'] as const;
type Range = (typeof RANGES)[number];

function seriesFor(range: Range): number[] {
  const n = range === '1H' ? 12 : range === '24H' ? 24 : 28;
  return Array.from({ length: n }, (_, i) => {
    const base = 40 + Math.sin(i / 3 + n) * 18 + i * (range === '7D' ? 1.2 : 0.4);
    return Math.max(4, Math.round(base));
  });
}

const range = ref<Range>('24H');
const scrub = ref<number | null>(null);

const data = computed(() => seriesFor(range.value));
const min = computed(() => Math.min(...data.value));
const max = computed(() => Math.max(...data.value));
const rangeSpan = computed(() => max.value - min.value || 1);
const pts = computed(() =>
  data.value.map((v, i) => ({
    x: (i / (data.value.length - 1)) * 100,
    y: 30 - ((v - min.value) / rangeSpan.value) * 24 - 3,
  })),
);
const path = computed(() => pts.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '));
const areaPath = computed(() => `${path.value} L100,34 L0,34 Z`);
const shown = computed(() => {
  const idx = scrub.value;
  return idx !== null && data.value[idx] !== undefined ? data.value[idx] : data.value[data.value.length - 1];
});
const delta = computed(() => data.value[data.value.length - 1] - data.value[0]);
const deltaLabel = computed(() => {
  const sign = delta.value >= 0 ? '▲' : '▼';
  return d.value.deltaLabel
    .replace('{sign}', sign)
    .replace('{n}', String(Math.abs(delta.value)))
    .replace('{range}', range.value);
});
const activePoint = computed(() => {
  const idx = scrub.value;
  return idx === null ? null : (pts.value[idx] ?? null);
});
const hint = computed(() => {
  const idx = scrub.value;
  if (idx === null) return d.value.hint;
  return d.value.point
    .replace('{i}', String(idx + 1))
    .replace('{n}', String(data.value.length))
    .replace('{v}', String(data.value[idx]));
});

function setRange(r: Range) {
  range.value = r;
  scrub.value = null;
}

function onScrub(e: PointerEvent) {
  const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
  const fx = (e.clientX - rect.left) / rect.width;
  scrub.value = Math.max(0, Math.min(data.value.length - 1, Math.round(fx * (data.value.length - 1))));
}
</script>

<template>
  <div :class="cn('w-full max-w-sm rounded-3xl border border-line bg-surface p-5 shadow-sm', props.class)">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs uppercase tracking-widest text-muted">{{ d.throughput }}</p>
        <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
          {{ shown }}
          <span class="ml-1 text-sm font-normal text-muted">req/s</span>
        </p>
        <p
          :class="cn(
            'text-xs font-medium tabular-nums',
            delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500',
          )"
        >
          {{ deltaLabel }}
        </p>
      </div>
      <div class="flex rounded-full border border-line bg-card p-0.5">
        <button
          v-for="r in RANGES"
          :key="r"
          :class="cn(
            'relative rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
            range === r ? 'text-bg' : 'text-muted hover:text-fg',
          )"
          @click="setRange(r)"
        >
          <motion.span
            v-if="range === r"
            layout-id="hud-range-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-full bg-fg"
          />
          <span class="relative z-10">{{ r }}</span>
        </button>
      </div>
    </div>

    <svg
      viewBox="0 0 100 34"
      preserveAspectRatio="none"
      class="mt-3 h-24 w-full touch-none"
      role="img"
      :aria-label="d.sparkline"
      @pointermove="onScrub"
      @pointerleave="scrub = null"
    >
      <motion.path
        :d="areaPath"
        fill="rgba(99,102,241,0.14)"
        :initial="false"
        :animate="{ d: areaPath }"
        :transition="motionTransitions.springSmooth"
      />
      <motion.path
        :d="path"
        fill="none"
        stroke="#6366f1"
        stroke-width="2"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
        :initial="false"
        :animate="{ d: path }"
        :transition="motionTransitions.springSmooth"
      />
      <circle
        v-if="activePoint"
        :cx="activePoint.x"
        :cy="activePoint.y"
        r="3"
        fill="#6366f1"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <p class="mt-1 text-center text-[10px] text-muted">
      {{ hint }}
    </p>
  </div>
</template>
