<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const STORIES = [
  { title: 'Midnight Train', tag: 'Travel', tint: 'from-indigo-600 to-slate-900' },
  { title: 'Cedar Coast', tag: 'Nature', tint: 'from-emerald-600 to-teal-900' },
  { title: 'Neon Alley', tag: 'City', tint: 'from-rose-600 to-purple-900' },
];

const index = ref(0);
const dir = ref(1);
let lock = false;

const DOTS = STORIES.map((_, i) => i);

const story = computed(() => STORIES[index.value]);

function go(d: number) {
  if (lock) return;
  lock = true;
  dir.value = d;
  index.value = (index.value + d + STORIES.length) % STORIES.length;
  window.setTimeout(() => (lock = false), 420);
}

function goTo(i: number) {
  dir.value = i > index.value ? 1 : -1;
  index.value = i;
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="relative h-56 overflow-hidden rounded-3xl border border-line shadow-lg">
      <AnimatePresence :initial="false">
        <motion.div
          :key="index"
          :initial="{ x: dir * 260, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :exit="{ x: -dir * 260, opacity: 0 }"
          :transition="motionTransitions.springSmooth"
          :class="cn('absolute inset-0 flex flex-col justify-end bg-gradient-to-br p-5 text-white', story.tint)"
        >
          <span
            class="mb-1 w-fit rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest"
          >
            {{ story.tag }}
          </span>
          <p class="text-xl font-semibold tracking-tight">{{ story.title }}</p>
          <p class="text-xs text-white/70">story {{ index + 1 }} of {{ STORIES.length }}</p>
        </motion.div>
      </AnimatePresence>
      <button
        aria-label="Previous story"
        class="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        @click="go(-1)"
      >
        ‹
      </button>
      <button
        aria-label="Next story"
        class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        @click="go(1)"
      >
        ›
      </button>
    </div>
    <div class="mt-3 flex justify-center gap-1.5">
      <button
        v-for="i in DOTS"
        :key="i"
        :aria-label="`Go to story ${i + 1}`"
        :class="cn('h-1.5 rounded-full transition-all', i === index ? 'w-5 bg-fg' : 'w-1.5 bg-line hover:bg-muted')"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
