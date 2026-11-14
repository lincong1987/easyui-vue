<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ weeks?: number; class?: string }>(), { weeks: 26 });
const { locale } = useLocale();

const LEVELS = [
  'bg-line/60',
  'bg-emerald-500/25',
  'bg-emerald-500/45',
  'bg-emerald-500/70',
  'bg-emerald-500',
];

const DATA: Record<'en' | 'zh-CN', {
  dayLabels: string[];
  dayNames: string[];
  months: string[];
  readout: (weeks: number) => string;
  readoutHover: (count: number, week: number, day: string) => string;
  cellAria: (count: number) => string;
  less: string;
  more: string;
}> = {
  en: {
    dayLabels: ['M', '', 'W', '', 'F', '', 'S'],
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    readout: (weeks) => `${weeks} weeks of deterministic demo activity`,
    readoutHover: (count, week, day) => `${count} contributions · week ${week}, ${day}`,
    cellAria: (count) => `${count} contributions`,
    less: 'less',
    more: 'more',
  },
  'zh-CN': {
    dayLabels: ['一', '', '三', '', '五', '', '日'],
    dayNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    readout: (weeks) => `共 ${weeks} 周演示活动，数据由确定性算法生成`,
    readoutHover: (count, week, day) => `${count} 次贡献 · 第 ${week} 周 · ${day}`,
    cellAria: (count) => `${count} 次贡献`,
    less: '少',
    more: '多',
  },
};

const data = computed(() => DATA[locale.value]);

function rand(seed: number) {
  const x = Math.sin(seed * 7.13) * 43758.5453;
  return x - Math.floor(x);
}

const hover = ref<{ w: number; d: number; v: number } | null>(null);

const cells = computed(() =>
  Array.from({ length: props.weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const r = rand(w * 7 + d + 1);
      const weekend = d >= 5;
      const v = r < (weekend ? 0.45 : 0.18) ? 0 : 1 + Math.floor(rand(w * 31 + d * 3 + 7) * 4);
      return Math.min(4, v);
    }),
  ),
);

const monthTicks = computed(() => {
  const now = new Date('2026-11-13T00:00:00Z');
  return Array.from({ length: props.weeks }, (_, w) => {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - (props.weeks - 1 - w) * 7);
    return d.getUTCMonth();
  });
});

const readout = computed(() =>
  hover.value
    ? data.value.readoutHover(hover.value.v * 3, hover.value.w + 1, data.value.dayNames[hover.value.d])
    : data.value.readout(props.weeks),
);
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="mb-2 flex h-4 gap-[3px] pl-7 text-[10px] text-muted">
      <span v-for="(m, w) in monthTicks" :key="w" class="w-[13px] shrink-0 whitespace-nowrap">
        {{ w === 0 || monthTicks[w - 1] !== m ? data.months[m] : '' }}
      </span>
    </div>
    <div class="flex gap-[3px]">
      <div class="mr-1 flex flex-col gap-[3px] text-[10px] leading-none text-muted">
        <span v-for="(d, i) in data.dayLabels" :key="i" class="flex h-[13px] w-6 items-center">
          {{ d }}
        </span>
      </div>
      <div v-for="(week, w) in cells" :key="w" class="flex flex-col gap-[3px]">
        <motion.button
          v-for="(v, d) in week"
          :key="d"
          :initial="{ opacity: 0, scale: 0.6 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ ...motionTransitions.springSnappy, delay: (w * 7 + d) * 0.002 }"
          :aria-label="data.cellAria(v)"
          :class="cn(
            'h-[13px] w-[13px] rounded-[3px] transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-fg',
            LEVELS[v],
          )"
          @pointerenter="hover = { w, d, v }"
          @pointerleave="hover = null"
        />
      </div>
    </div>
    <div class="mt-3 flex items-center justify-between text-xs text-muted">
      <span aria-live="polite">{{ readout }}</span>
      <span class="flex items-center gap-1">
        {{ data.less }}
        <span v-for="(l, i) in LEVELS" :key="i" :class="cn('h-[11px] w-[11px] rounded-[3px]', l)" />
        {{ data.more }}
      </span>
    </div>
  </div>
</template>
