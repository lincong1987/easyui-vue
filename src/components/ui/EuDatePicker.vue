<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', {
  weekdays: string[];
  months: string[];
  prevMonth: string;
  nextMonth: string;
  selected: (iso: string) => string;
  pickDay: string;
  monthTitle: (month: string, year: number) => string;
}> = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    selected: (iso) => `selected ${iso}`,
    pickDay: 'pick a day — the pill glides over',
    monthTitle: (month, year) => `${month} ${year}`,
  },
  'zh-CN': {
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    prevMonth: '上个月',
    nextMonth: '下个月',
    selected: (iso) => `已选 ${iso}`,
    pickDay: '选择日期 —— 高亮块会随之滑动',
    monthTitle: (month, year) => `${year}年${month}`,
  },
};

const data = computed(() => DATA[locale.value]);

interface DayCell {
  day: number;
  iso: string;
  inMonth: boolean;
}

function monthMatrix(year: number, month: number): DayCell[] {
  const first = new Date(Date.UTC(year, month, 1));
  const startDow = (first.getUTCDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: DayCell[] = [];
  for (let i = 0; i < startDow; i++) {
    cells.push({ day: 0, iso: `pad-${i}`, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      iso: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      inMonth: true,
    });
  }
  return cells;
}

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth());
const selected = ref<string | null>(null);
const dir = ref(1);

const cells = computed(() => monthMatrix(year.value, month.value));

function nav(delta: number) {
  dir.value = delta;
  const m = month.value + delta;
  if (m < 0) {
    month.value = 11;
    year.value -= 1;
  } else if (m > 11) {
    month.value = 0;
    year.value += 1;
  } else {
    month.value = m;
  }
}
</script>

<template>
  <div :class="cn('w-full max-w-xs rounded-3xl border border-line bg-surface p-4 shadow-sm', props.class)">
    <div class="mb-3 flex items-center justify-between">
      <button
        :aria-label="data.prevMonth"
        class="rounded-full px-2.5 py-1 text-sm text-muted transition-colors hover:bg-card hover:text-fg"
        @click="nav(-1)"
      >
        ‹
      </button>
      <div class="relative h-5 overflow-hidden">
        <AnimatePresence mode="popLayout" :initial="false">
          <motion.p
            :key="`${year}-${month}`"
            :initial="{ y: dir * 18, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: -dir * 18, opacity: 0 }"
            :transition="motionTransitions.springSnappy"
            class="text-sm font-medium"
          >
            {{ data.monthTitle(data.months[month], year) }}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        :aria-label="data.nextMonth"
        class="rounded-full px-2.5 py-1 text-sm text-muted transition-colors hover:bg-card hover:text-fg"
        @click="nav(1)"
      >
        ›
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center text-[10px] text-muted">
      <span v-for="d in data.weekdays" :key="d" class="py-1">{{ d }}</span>
    </div>

    <div class="relative mt-1 grid grid-cols-7 gap-1">
      <template v-for="c in cells" :key="c.iso">
        <span v-if="!c.inMonth" />
        <button
          v-else
          :class="cn(
            'relative h-8 rounded-lg text-xs tabular-nums transition-colors',
            selected === c.iso ? 'text-bg' : 'text-fg hover:bg-card',
          )"
          @click="selected = c.iso"
        >
          <motion.span
            v-if="selected === c.iso"
            layout-id="datepicker-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-lg bg-fg"
          />
          <span class="relative z-10">{{ c.day }}</span>
        </button>
      </template>
    </div>
    <p class="mt-3 text-center text-xs text-muted" aria-live="polite">
      {{ selected ? data.selected(selected) : data.pickDay }}
    </p>
  </div>
</template>
