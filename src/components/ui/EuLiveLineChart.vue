<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    interval?: number;
    window?: number;
    class?: string;
  }>(),
  { interval: 450, window: 60 },
);

function nextValue(t: number) {
  return 50 + 28 * Math.sin(t / 9) + 12 * Math.sin(t / 3.7 + 1.3) + Math.sin(t * 12.9898) * 6;
}

const buf = ref<number[]>(Array.from({ length: props.window }, (_, i) => nextValue(i)));
const paused = ref(false);
const scrub = ref<number | null>(null);
const t = ref(props.window);
const svgRef = ref<SVGSVGElement | null>(null);

watchEffect((onCleanup) => {
  if (paused.value) return;
  const id = window.setInterval(() => {
    t.value += 1;
    buf.value = [...buf.value.slice(1), nextValue(t.value)];
  }, props.interval);
  onCleanup(() => window.clearInterval(id));
});

const chart = computed(() => {
  const values = buf.value;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const path = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 34 - ((v - min) / span) * 28 - 3;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
  return { min, max, path };
});

const current = computed(() => buf.value[buf.value.length - 1]);
const prev = computed(() => buf.value[buf.value.length - 2] ?? current.value);
const delta = computed(() => current.value - prev.value);
const shown = computed(() => (scrub.value !== null ? buf.value[scrub.value] : current.value));

function onMove(e: PointerEvent) {
  const rect = svgRef.value?.getBoundingClientRect();
  if (!rect) return;
  const fx = (e.clientX - rect.left) / rect.width;
  scrub.value = Math.max(0, Math.min(buf.value.length - 1, Math.round(fx * (buf.value.length - 1))));
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="flex items-end justify-between">
      <div>
        <p class="text-xs uppercase tracking-widest text-muted">live value</p>
        <p class="text-3xl font-semibold tabular-nums tracking-tight" aria-live="off">
          {{ shown.toFixed(1) }}<span
            :class="cn(
              'ml-2 align-middle text-sm font-medium tabular-nums',
              delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
            )"
          >{{ delta >= 0 ? '▲' : '▼' }} {{ Math.abs(delta).toFixed(1) }}</span>
        </p>
      </div>
      <button
        class="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-card"
        @click="paused = !paused"
      >
        {{ paused ? '▶ resume' : '❚❚ pause' }}
      </button>
    </div>
    <svg
      ref="svgRef"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      class="mt-2 h-32 w-full touch-none"
      role="img"
      :aria-label="`Live chart, range ${chart.min.toFixed(1)} to ${chart.max.toFixed(1)}`"
      @pointermove="onMove"
      @pointerleave="scrub = null"
    >
      <motion.path
        :key="paused ? 'paused' : 'live'"
        :d="chart.path"
        fill="none"
        stroke="#22d3ee"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
        stroke-linejoin="round"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="motionTransitions.easeFast"
      />
      <line
        v-if="scrub !== null"
        :x1="(scrub / (buf.length - 1)) * 100"
        :x2="(scrub / (buf.length - 1)) * 100"
        y1="0"
        y2="40"
        class="stroke-muted"
        stroke-dasharray="3 3"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <p class="mt-1 text-[10px] text-muted">
      {{ paused ? 'stream paused — hover to scrub' : 'streaming · hover to freeze & scrub' }}
    </p>
  </div>
</template>
