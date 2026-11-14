<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const on = ref(false);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <button
      role="switch"
      :aria-checked="on"
      :class="
        cn(
          'relative flex h-11 w-[72px] items-center rounded-full p-1.5 transition-colors duration-300',
          on ? 'bg-indigo-600' : 'bg-line',
        )
      "
      @click="on = !on"
    >
      <motion.span
        class="relative block h-8 w-8"
        :animate="{ x: on ? 28 : 0 }"
        :transition="motionTransitions.springResponsive"
      >
        <motion.span
          :class="cn('absolute inset-0 shadow-md', on ? 'bg-white' : 'bg-fg/85')"
          :animate="{
            borderRadius: on
              ? ['50% 50% 46% 54% / 52% 48% 52% 48%', '42% 58% 54% 46% / 46% 42% 58% 54%', '50%']
              : ['50%', '58% 42% 46% 54% / 44% 56% 44% 56%', '50%'],
            scaleX: [1, 1.22, 1],
            scaleY: [1, 0.86, 1],
          }"
          :transition="{ duration: 0.42, times: [0, 0.5, 1], ease: 'easeInOut' }"
        />
      </motion.span>
      <span class="sr-only">{{ on ? 'On' : 'Off' }}</span>
    </button>
    <p class="text-xs text-muted">{{ on ? 'on — blob settled right' : 'off — blob settled left' }}</p>
  </div>
</template>
