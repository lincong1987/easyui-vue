<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  tabs: string[];
  class?: string;
}>();

const active = ref(0);
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div role="tablist" aria-label="Demo sections" class="inline-flex rounded-full border border-line bg-card p-1">
      <button
        v-for="(tab, i) in props.tabs"
        :key="tab"
        role="tab"
        :aria-selected="i === active"
        :class="cn(
          'relative rounded-full px-4 py-1.5 text-sm transition-colors',
          i === active ? 'text-fg' : 'text-muted hover:text-fg',
        )"
        @click="active = i"
      >
        <motion.span
          v-if="i === active"
          layout-id="animated-tabs-pill"
          :transition="motionTransitions.springMorph"
          class="absolute inset-0 rounded-full bg-surface shadow-sm"
        />
        <span class="relative z-10">{{ tab }}</span>
      </button>
    </div>
    <div class="relative mt-4 overflow-hidden rounded-2xl border border-line bg-surface p-5">
      <motion.div
        :key="active"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="motionTransitions.easeSoft"
        class="text-sm text-muted"
      >
        <p class="mb-1 font-medium text-fg">{{ props.tabs[active] }}</p>
        Panel {{ active + 1 }} of {{ props.tabs.length }} — the indicator glides here with a shared layout spring instead of snapping.
      </motion.div>
    </div>
  </div>
</template>
