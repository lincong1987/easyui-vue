<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { SendIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const CONTACTS = ['Rin', 'Kai', 'Momo', 'Jin'];
const TXNS = [
  { name: 'Figma annual', amount: '-$144.00', time: 'Mon' },
  { name: 'Client payout', amount: '+$2,400.00', time: 'Fri' },
  { name: 'Server credits', amount: '-$36.00', time: 'Sun' },
];

const balance = ref(8420.5);
const sheet = ref(false);
const sentTo = ref<string | null>(null);
let closeTimer: ReturnType<typeof setTimeout> | null = null;

const formatted = computed(
  () => `$${balance.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
);

function send(to: string) {
  balance.value -= 25;
  sentTo.value = to;
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    sheet.value = false;
  }, 500);
}

onUnmounted(() => {
  if (closeTimer) clearTimeout(closeTimer);
});
</script>

<template>
  <div :class="cn('relative w-full max-w-sm', props.class)">
    <div class="overflow-hidden rounded-3xl border border-line bg-surface shadow-lg">
      <div class="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-5 text-white">
        <p class="text-xs uppercase tracking-widest text-white/60">Available balance</p>
        <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
          {{ formatted }}
        </p>
        <button
          class="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-indigo-700 transition-transform active:scale-95"
          @click="sheet = true"
        >
          <SendIcon :size="13" /> Send money
        </button>
      </div>
      <div class="p-4">
        <p class="text-xs font-medium uppercase tracking-widest text-muted">Recent</p>
        <ul class="mt-2 space-y-1.5">
          <li
            v-for="t in TXNS"
            :key="t.name"
            class="flex items-center justify-between rounded-xl px-2 py-1.5 text-sm transition-colors hover:bg-card"
          >
            <span class="text-fg">{{ t.name }}</span>
            <span class="text-right">
              <span
                :class="cn(
                  'block font-medium tabular-nums',
                  t.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-fg',
                )"
              >{{ t.amount }}</span>
              <span class="block text-[10px] text-muted">{{ t.time }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="sheet"
        key="sheet"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        class="absolute inset-0 z-20 flex items-end rounded-3xl bg-black/40"
        @click="sheet = false"
      >
        <motion.div
          :initial="{ y: 120 }"
          :animate="{ y: 0 }"
          :exit="{ y: 120 }"
          :transition="motionTransitions.springMorph"
          class="w-full rounded-t-3xl border-t border-line bg-surface p-4"
          @click.stop
        >
          <p class="text-sm font-medium">Send $25.00 to…</p>
          <div class="mt-3 flex justify-between">
            <button
              v-for="c in CONTACTS"
              :key="c"
              :class="cn(
                'flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold transition-transform active:scale-90',
                sentTo === c ? 'bg-emerald-500 text-white' : 'bg-card text-fg hover:bg-line',
              )"
              @click="send(c)"
            >
              {{ c }}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
