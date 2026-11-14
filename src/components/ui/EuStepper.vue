<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    steps?: string[];
    class?: string;
  }>(),
  { steps: () => ['Account', 'Profile', 'Billing', 'Done'] },
);

const current = ref(1);
</script>

<template>
  <div :class="cn('w-full max-w-lg', props.class)">
    <div class="relative flex items-start justify-between">
      <div class="absolute left-0 right-0 top-[18px] h-0.5 bg-line" />
      <motion.div
        class="absolute top-[18px] h-0.5 bg-fg"
        :initial="false"
        :animate="{ width: `${(current / (props.steps.length - 1)) * 100}%` }"
        :transition="motionTransitions.springGentle"
      />
      <button
        v-for="(s, i) in props.steps"
        :key="s"
        class="relative z-10 flex w-16 flex-col items-center gap-2"
        :aria-current="i === current ? 'step' : undefined"
        @click="current = i"
      >
        <motion.span
          :initial="false"
          :animate="{
            scale: i === current ? 1.12 : 1,
            backgroundColor: i <= current ? 'var(--color-fg)' : 'var(--color-surface)',
            color: i <= current ? 'var(--color-bg)' : 'var(--color-muted)',
          }"
          :transition="motionTransitions.springSnappy"
          class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-fg text-sm font-semibold"
        >
          <CheckIcon v-if="i < current" :size="15" />
          <template v-else>{{ i + 1 }}</template>
        </motion.span>
        <span :class="cn('text-xs', i === current ? 'font-medium text-fg' : 'text-muted')">{{ s }}</span>
      </button>
    </div>
    <div class="mt-6 overflow-hidden rounded-2xl border border-line bg-surface p-4">
      <motion.div
        :key="current"
        :initial="{ opacity: 0, x: 24 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="motionTransitions.springGentle"
        class="text-sm text-muted"
      >
        <p class="font-medium text-fg">Step {{ current + 1 }} — {{ props.steps[current] }}</p>
        The connector fills up to the active ring; completed rings show a drawn checkmark. Click a ring to travel.
      </motion.div>
    </div>
  </div>
</template>
