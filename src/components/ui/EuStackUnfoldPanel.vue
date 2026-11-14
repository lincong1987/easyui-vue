<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

const PANELS = [
  { title: 'Discovery', body: 'We mapped 134 upstream components into 7 categories.' },
  { title: 'Porting', body: 'Each signature behavior was rebuilt with original code.' },
  { title: 'Verification', body: 'A headless walkthrough gates every release.' },
  { title: 'Release', body: 'The gallery ships as a single static page on port 5454.' },
];

const open = ref(true);

function cardTransition(i: number) {
  return { ...motionTransitions.springSnappy, delay: open.value ? i * 0.07 : 0 };
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="relative">
      <!-- peeking edges behind the top card -->
      <div class="absolute inset-x-3 -top-2 h-full rounded-2xl border border-line bg-card/80" />
      <div class="absolute inset-x-5 -top-4 h-full rounded-2xl border border-line bg-card/40" />

      <motion.div :layout="true" class="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
        <button
          class="flex w-full items-center justify-between px-4 py-3.5 text-left"
          @click="open = !open"
        >
          <span class="text-sm font-medium">Project log — 4 chapters</span>
          <span class="text-xs text-muted">{{ open ? 'fold' : 'unfold' }}</span>
        </button>
        <motion.div
          :initial="false"
          :animate="{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }"
          :transition="motionTransitions.springGentle"
          class="overflow-hidden"
        >
          <div class="space-y-2 px-4 pb-4">
            <motion.div
              v-for="(panel, i) in PANELS"
              :key="panel.title"
              :initial="{ y: 24, opacity: 0 }"
              :animate="{ y: 0, opacity: 1 }"
              :transition="cardTransition(i)"
              class="rounded-xl border border-line bg-card/60 p-3"
            >
              <p class="text-xs font-semibold text-fg">{{ i + 1 }}. {{ panel.title }}</p>
              <p class="mt-0.5 text-[11px] leading-relaxed text-muted">{{ panel.body }}</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</template>
