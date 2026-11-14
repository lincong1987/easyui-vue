<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', { labels: string[]; fan: string; tuck: string; fullBleed: string }> = {
  en: {
    labels: ['Kyoto · dusk', 'Fjord · noon', 'Pine · fog'],
    fan: 'fan photos',
    tuck: 'tuck back',
    fullBleed: ' — full bleed',
  },
  'zh-CN': {
    labels: ['京都 · 黄昏', '峡湾 · 正午', '松林 · 雾'],
    fan: '展开照片',
    tuck: '收起',
    fullBleed: ' — 满版',
  },
};

const TINTS = ['from-orange-300 to-rose-400', 'from-sky-300 to-indigo-400', 'from-emerald-300 to-cyan-400'];

const d = computed(() => DATA[locale.value]);
const shots = computed(() => d.value.labels.map((label, i) => ({ label, tint: TINTS[i] })));

const open = ref(false);
const zoomedIndex = ref<number | null>(null);
const zoomed = computed(() => (zoomedIndex.value === null ? null : (shots.value[zoomedIndex.value] ?? null)));

function fanTransition(i: number) {
  return { ...motionTransitions.springResponsive, delay: i * 0.06 };
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <div class="relative h-44 w-44">
      <div class="absolute inset-0 rounded-2xl border border-line bg-white/70 shadow-inner backdrop-blur-sm" />
      <div class="absolute inset-x-3 top-3 h-24 rounded-lg bg-white/50" />
      <div class="absolute inset-x-0 bottom-3 flex justify-center">
        <button
          class="rounded-full bg-fg px-3.5 py-1.5 text-[11px] font-medium text-bg transition-transform active:scale-95"
          @click="open = !open"
        >
          {{ open ? d.tuck : d.fan }}
        </button>
      </div>

      <AnimatePresence>
        <motion.button
          v-for="(s, i) in open ? shots : []"
          :key="s.label"
          :initial="{ y: 40, opacity: 0, rotate: 0, scale: 0.7 }"
          :animate="{ y: -58 - i * 8, opacity: 1, rotate: (i - 1) * 10, scale: 1, x: (i - 1) * 34 }"
          :exit="{ y: 40, opacity: 0, scale: 0.7 }"
          :transition="fanTransition(i)"
          class="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-1.5 pb-3 shadow-xl"
          @click="zoomedIndex = i"
        >
          <span :class="cn('block h-16 rounded-sm bg-gradient-to-br', s.tint)" />
          <span class="mt-1 block text-left text-[8px] font-medium text-stone-600">{{ s.label }}</span>
        </motion.button>
      </AnimatePresence>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="zoomed"
        key="zoom"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
        @click="zoomedIndex = null"
      >
        <motion.div
          :initial="{ scale: 0.7, rotate: -4 }"
          :animate="{ scale: 1, rotate: 0 }"
          :transition="motionTransitions.springMorph"
          class="w-72 rounded-lg bg-white p-3 pb-6 shadow-2xl"
        >
          <span :class="cn('block h-56 rounded bg-gradient-to-br', zoomed.tint)" />
          <p class="mt-2 text-xs font-medium text-stone-700">{{ zoomed.label }}{{ d.fullBleed }}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
