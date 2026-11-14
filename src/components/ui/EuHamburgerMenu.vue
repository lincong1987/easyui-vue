<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const open = ref(false);

function line(i: number) {
  if (i === 0)
    return open.value
      ? { rotate: 45, y: 6, width: 20 }
      : { rotate: 0, y: 0, width: 20 };
  if (i === 1)
    return open.value
      ? { rotate: 0, y: 0, width: 0 }
      : { rotate: 0, y: 0, width: 20 };
  return open.value
    ? { rotate: -45, y: -6, width: 20 }
    : { rotate: 0, y: 0, width: 20 };
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <button
      type="button"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      :aria-expanded="open"
      class="flex h-12 w-12 flex-col items-center justify-center gap-[6px] rounded-2xl border border-line bg-surface transition-shadow hover:shadow-md"
      @click="open = !open"
    >
      <motion.span
        v-for="i in [0, 1, 2]"
        :key="i"
        :animate="line(i)"
        :transition="motionTransitions.springSnappy"
        class="h-[2px] rounded-full bg-fg"
        :style="{ width: '20px' }"
      />
    </button>
    <motion.span
      :animate="{ opacity: open ? 1 : 0, y: open ? 0 : -4 }"
      :transition="motionTransitions.easeSoft"
      class="text-xs text-muted"
    >
      {{ open ? 'close' : 'menu' }}
    </motion.span>
  </div>
</template>
