<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { cn } from '../../lib/utils';
import { useLocale } from '../../i18n/useLocale';

const props = defineProps<{
  class?: string;
}>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', {
  lines: string[];
  printing: string;
  reprint: string;
  print: string;
}> = {
  en: {
    lines: [
      'EASYUI PRO — ANNUAL',
      '--------------------------------',
      '1x Component license   $49.00',
      '1x Motion review       $0.00',
      '1x Sponsor bump        $0.00',
      '--------------------------------',
      'TOTAL                  $49.00',
      'PAID · VISA ****3040',
    ],
    printing: 'printing…',
    reprint: 'reprint receipt',
    print: 'print receipt',
  },
  'zh-CN': {
    lines: [
      'EASYUI PRO — 年度订阅',
      '--------------------------------',
      '1x 组件授权            $49.00',
      '1x 动效评审            $0.00',
      '1x 赞助位              $0.00',
      '--------------------------------',
      '合计                   $49.00',
      '已支付 · VISA ****3040',
    ],
    printing: '打印中…',
    reprint: '重新打印小票',
    print: '打印小票',
  },
};

const copy = computed(() => DATA[locale.value]);
const lines = computed(() => copy.value.lines);

const printed = ref(0);
const printing = ref(false);
const label = computed(() =>
  printing.value ? copy.value.printing : printed.value === lines.value.length ? copy.value.reprint : copy.value.print,
);

let timer: number | undefined;

function run() {
  if (printing.value) return;
  printing.value = true;
  printed.value = 0;
  let i = 0;
  window.clearInterval(timer);
  timer = window.setInterval(() => {
    i += 1;
    printed.value = i;
    if (i >= lines.value.length) {
      window.clearInterval(timer);
      timer = undefined;
      printing.value = false;
    }
  }, 260);
}

onUnmounted(() => window.clearInterval(timer));
</script>

<template>
  <div :class="cn('flex w-full max-w-xs flex-col items-center', props.class)">
    <!-- printer chassis -->
    <div class="relative z-10 h-12 w-full rounded-t-2xl border border-b-0 border-line bg-gradient-to-b from-stone-700 to-stone-800">
      <span class="absolute left-4 top-2.5 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-widest text-stone-300">
        <motion.span
          :animate="printing ? { x: [0, -1, 1, -1, 1, 0] } : { x: 0 }"
          :transition="{ duration: 0.3, repeat: printing ? Infinity : 0 }"
        >
          ▪▪▪
        </motion.span>
        easyui pos-80
      </span>
      <span :class="cn('absolute right-4 top-3 h-2 w-2 rounded-full', printing ? 'bg-emerald-400' : 'bg-stone-500')" />
    </div>
    <!-- paper slot + extruding receipt -->
    <div class="relative w-full">
      <div class="absolute inset-x-6 -top-0.5 h-1.5 rounded-b bg-stone-900" />
      <div class="overflow-hidden px-6">
        <AnimatePresence :initial="false">
          <motion.div
            v-if="printed > 0"
            key="receipt"
            :initial="{ y: -40 }"
            :animate="{ y: 0 }"
            class="mt-0 rounded-b-lg bg-[#fbfbf6] px-3.5 py-3 font-mono text-[10px] leading-relaxed text-stone-700 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
          >
            <motion.p
              v-for="(l, i) in lines.slice(0, printed)"
              :key="i"
              :initial="{ opacity: 0, y: -4 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.18 }"
              class="whitespace-pre"
            >
              {{ l }}
            </motion.p>
            <p v-if="printed < lines.length" class="animate-pulse">...</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <button
      :disabled="printing"
      class="mt-3 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95 disabled:opacity-50"
      @click="run"
    >
      {{ label }}
    </button>
  </div>
</template>
