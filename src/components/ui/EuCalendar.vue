<script setup lang="ts">
import { computed, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface Cell {
  day: number;
  iso: string;
  inMonth: boolean;
}

function matrix(year: number, month: number): Cell[] {
  const first = new Date(Date.UTC(year, month, 1));
  const startDow = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: Cell[] = [];
  for (let i = 0; i < startDow; i++) cells.push({ day: 0, iso: `p${i}`, inMonth: false });
  for (let d = 1; d <= days; d++)
    cells.push({ day: d, iso: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, inMonth: true });
  return cells;
}

const now = new Date();
const year = ref(now.getFullYear());
const month = ref(now.getMonth());
const range = ref<{ from: string; to: string | null }>({ from: '2026-11-03', to: '2026-11-07' });
const hover = ref<string | null>(null);

const cells = computed(() => matrix(year.value, month.value));

const rangeLabel = computed(() =>
  range.value.to ? `${range.value.from} → ${range.value.to}` : `${range.value.from} → pick an end day`,
);

function pick(iso: string) {
  if (!range.value.from || (range.value.from && range.value.to)) {
    range.value = { from: iso, to: null };
  } else if (iso >= range.value.from) {
    range.value = { from: range.value.from, to: iso };
  } else {
    range.value = { from: iso, to: range.value.from };
  }
}

function inBand(iso: string) {
  const r = range.value;
  if (!r.to) return iso === r.from;
  const previewing = hover.value !== null && hover.value >= r.from && hover.value <= r.to;
  const hi = previewing ? (hover.value as string) : r.to;
  return iso >= r.from && iso <= hi;
}

function nav(d: number) {
  const m = month.value + d;
  if (m < 0) {
    month.value = 11;
    year.value -= 1;
  } else if (m > 11) {
    month.value = 0;
    year.value += 1;
  } else month.value = m;
}
</script>

<template>
  <div :class="cn('w-full max-w-xs rounded-3xl border border-line bg-surface p-4 shadow-sm', props.class)">
    <div class="mb-3 flex items-center justify-between">
      <button
        aria-label="Previous month"
        class="rounded-full px-2.5 py-1 text-sm text-muted hover:bg-card hover:text-fg"
        @click="nav(-1)"
      >
        ‹
      </button>
      <p class="text-sm font-medium">{{ MONTHS[month] }} {{ year }}</p>
      <button
        aria-label="Next month"
        class="rounded-full px-2.5 py-1 text-sm text-muted hover:bg-card hover:text-fg"
        @click="nav(1)"
      >
        ›
      </button>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-[10px] text-muted">
      <span v-for="d in WEEK" :key="d" class="py-1">{{ d }}</span>
    </div>
    <div class="mt-1 grid grid-cols-7 gap-1">
      <template v-for="c in cells" :key="c.iso">
        <span v-if="!c.inMonth" />
        <button
          v-else
          :class="cn(
            'relative h-8 rounded-lg text-xs tabular-nums transition-colors',
            (c.iso === range.from || c.iso === range.to) && 'bg-fg text-bg',
            c.iso !== range.from && c.iso !== range.to && inBand(c.iso) && 'bg-fg/[0.12] text-fg',
            c.iso !== range.from && c.iso !== range.to && !inBand(c.iso) && 'text-fg hover:bg-card',
          )"
          @click="pick(c.iso)"
          @pointerenter="hover = c.iso"
          @pointerleave="hover = null"
        >
          {{ c.day }}
        </button>
      </template>
    </div>
    <p class="mt-3 text-center text-[11px] text-muted" aria-live="polite">{{ rangeLabel }}</p>
  </div>
</template>
