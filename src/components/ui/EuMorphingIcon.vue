<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { MoonIcon, SunIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const on = ref(false);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <button
      :aria-label="on ? 'Switch to sun' : 'Switch to moon'"
      class="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-md"
      @click="on = !on"
    >
      <AnimatePresence mode="wait" :initial="false">
        <motion.span
          :key="on ? 'moon' : 'sun'"
          :initial="{ rotate: -90, scale: 0.5, opacity: 0 }"
          :animate="{ rotate: 0, scale: 1, opacity: 1 }"
          :exit="{ rotate: 90, scale: 0.5, opacity: 0 }"
          :transition="motionTransitions.springSnappy"
          class="text-fg"
        >
          <MoonIcon v-if="on" :size="24" />
          <SunIcon v-else :size="24" />
        </motion.span>
      </AnimatePresence>
    </button>
    <p class="text-xs text-muted">{{ on ? 'moon' : 'sun' }} — coordinated rotate + scale + fade</p>
  </div>
</template>
