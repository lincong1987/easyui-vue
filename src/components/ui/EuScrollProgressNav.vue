<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const SECTIONS = ['Top', 'Usage', 'Tokens', 'FAQ'];

const panelEl = ref<HTMLDivElement | null>(null);
const progress = ref(0);
const active = ref(0);

function onScroll() {
  const el = panelEl.value;
  if (!el) return;
  const total = el.scrollHeight - el.clientHeight || 1;
  const p = Math.max(0, Math.min(1, el.scrollTop / total));
  progress.value = p;
  active.value = Math.min(SECTIONS.length - 1, Math.floor(p * SECTIONS.length));
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div
      id="scroll-progress-demo"
      ref="panelEl"
      class="h-44 overflow-y-auto rounded-2xl border border-line bg-surface p-4 text-sm text-muted"
      @scroll.passive="onScroll"
    >
      <section v-for="(s, i) in SECTIONS" :key="s" class="mb-6">
        <p class="font-medium text-fg">{{ i + 1 }}. {{ s }}</p>
        <p class="mt-1 text-xs leading-relaxed">
          Scroll this panel — the floating pill below fills with the same progress ratio and the active section follows your depth.
        </p>
        <div class="mt-2 h-16 rounded-xl bg-card/80" />
      </section>
    </div>

    <motion.nav
      :animate="{ y: progress > 0.02 ? -2 : 0, scale: progress > 0.02 ? 1.04 : 1 }"
      :transition="motionTransitions.springSnappy"
      aria-label="Section progress"
      class="mx-auto -mt-6 flex w-fit items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-lg"
    >
      <span
        v-for="(s, i) in SECTIONS"
        :key="s"
        :class="cn(
          'relative rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors',
          i === active ? 'text-bg' : 'text-muted',
        )"
      >
        <span v-if="i === active" class="absolute inset-0 rounded-full bg-fg" />
        <span class="relative z-10">{{ s }}</span>
      </span>
      <span class="relative ml-1 h-1.5 w-10 overflow-hidden rounded-full bg-line">
        <motion.span
          class="absolute inset-y-0 left-0 rounded-full bg-fg"
          :animate="{ width: `${progress * 100}%` }"
          :transition="motionTransitions.easeFast"
        />
      </span>
    </motion.nav>
  </div>
</template>
