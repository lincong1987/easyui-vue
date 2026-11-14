<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

// 3x5 dot font, 15 bits per glyph, row-major from top-left.
const FONT: Record<string, number> = {
  '0': 0b111101101101111,
  '1': 0b010110010010111,
  '2': 0b111001111100111,
  '3': 0b111001111001111,
  '4': 0b101101111001001,
  '5': 0b111100111001111,
  '6': 0b111100111101111,
  '7': 0b111001010010010,
  '8': 0b111101111101111,
  '9': 0b111101111001111,
  ':': 0b000010000010000,
};

const CITIES = [
  { name: 'SHANGHAI', offset: 8 },
  { name: 'LONDON', offset: 0 },
  { name: 'NEW YORK', offset: -5 },
  { name: 'TOKYO', offset: 9 },
];

function bitsFor(ch: string): boolean[] {
  const bits = FONT[ch] ?? 0;
  return Array.from({ length: 15 }, (_, i) => ((bits >> (14 - i)) & 1) === 1);
}

function utcNow(): Date {
  return new Date();
}

function timeParts(offset: number): string {
  const now = utcNow();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const d = new Date(utcMs + offset * 3600000);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

const tick = ref(0);
const rows = computed(() => {
  void tick.value;
  return CITIES.map((c) => ({ ...c, time: timeParts(c.offset) }));
});

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    tick.value += 1;
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div :class="cn('w-full max-w-sm space-y-3', props.class)" aria-label="World clocks">
    <div
      v-for="c in rows"
      :key="c.name"
      class="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-4 py-3"
    >
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{{ c.name }}</p>
        <p class="text-[10px] text-muted tabular-nums">UTC{{ c.offset >= 0 ? '+' : '' }}{{ c.offset }}</p>
      </div>
      <div class="flex items-center gap-[3px]" :aria-label="c.time">
        <span v-for="(ch, i) in c.time.split('')" :key="i" class="inline-block">
          <AnimatePresence mode="popLayout" :initial="false">
            <motion.span
              :key="ch"
              :initial="{ opacity: 0, y: -5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: 5 }"
              :transition="{ duration: 0.18 }"
              class="inline-block"
            >
              <span class="inline-grid grid-cols-3 gap-[2px]">
                <span
                  v-for="(on, j) in bitsFor(ch)"
                  :key="j"
                  :class="cn('h-[5px] w-[5px] rounded-full transition-colors duration-200', on ? 'bg-fg' : 'bg-line/50')"
                />
              </span>
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  </div>
</template>
