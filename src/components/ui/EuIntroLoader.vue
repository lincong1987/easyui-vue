<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const GREETINGS = ['Welcome', '欢迎', 'ようこそ', 'Bienvenue', 'Willkommen', 'Добро пожаловать', '환영합니다'];

const i = ref(0);
const done = ref(false);

const progress = computed(() => `${((i.value + 1) / GREETINGS.length) * 100}%`);

let tick: ReturnType<typeof setInterval> | null = null;
let finish: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (tick) {
    clearInterval(tick);
    tick = null;
  }
  if (finish) {
    clearTimeout(finish);
    finish = null;
  }
}

function startCycle() {
  clearTimers();
  i.value = 0;
  tick = setInterval(() => {
    if (i.value >= GREETINGS.length - 1) {
      clearTimers();
      finish = setTimeout(() => {
        done.value = true;
      }, 450);
      return;
    }
    i.value += 1;
  }, 480);
}

onMounted(startCycle);
onUnmounted(clearTimers);

function replay() {
  done.value = false;
  startCycle();
}
</script>

<template>
  <div :class="cn('relative flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-zinc-950', props.class)">
    <AnimatePresence mode="wait">
      <motion.div
        v-if="!done"
        key="loader"
        :exit="{ opacity: 0, scale: 1.06 }"
        :transition="motionTransitions.easeSoft"
        class="text-center"
      >
        <motion.p
          :key="i"
          :initial="{ opacity: 0, filter: 'blur(10px)', y: 8 }"
          :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
          :exit="{ opacity: 0, filter: 'blur(10px)', y: -8 }"
          :transition="{ duration: 0.32 }"
          class="text-3xl font-semibold tracking-tight text-white"
        >
          {{ GREETINGS[i] }}
        </motion.p>
        <div class="mx-auto mt-5 h-0.5 w-40 overflow-hidden rounded-full bg-white/15">
          <motion.div
            class="h-full bg-white"
            :animate="{ width: progress }"
            :transition="motionTransitions.easeSoft"
          />
        </div>
        <p class="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">easyui port</p>
      </motion.div>

      <motion.div
        v-else
        key="app"
        :initial="{ opacity: 0, scale: 0.97 }"
        :animate="{ opacity: 1, scale: 1 }"
        class="text-center"
      >
        <p class="text-lg font-semibold text-white">You are in 🎉</p>
        <p class="mt-1 text-xs text-white/50">splash complete — content ready</p>
        <button
          class="mt-4 rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10"
          @click="replay"
        >
          replay intro
        </button>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
