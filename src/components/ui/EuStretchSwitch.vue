<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    defaultOn?: boolean;
    class?: string;
  }>(),
  { defaultOn: false },
);

const emit = defineEmits<{ change: [value: boolean] }>();

const TRAVEL = 22; // px the thumb travels inside the 52px track

const on = ref(props.defaultOn);
const pressed = ref(false);

function flip() {
  on.value = !on.value;
  emit('change', on.value);
}
</script>

<template>
  <motion.button
    type="button"
    role="switch"
    :aria-checked="on"
    :class="cn(
      'relative flex h-8 w-[52px] items-center rounded-full border px-[3px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
      on ? 'border-fg bg-fg' : 'border-line bg-card',
      props.class,
    )"
    @click="flip"
    @pointerdown="pressed = true"
    @pointerup="pressed = false"
    @pointerleave="pressed = false"
  >
    <motion.span
      :animate="{ translateX: on ? TRAVEL : 0, scaleX: pressed ? 1.3 : 1 }"
      :transition="motionTransitions.springSnappy"
      :class="cn('block h-[22px] w-[22px] origin-center rounded-full shadow-sm', on ? 'bg-bg' : 'bg-fg/80')"
    />
    <span class="sr-only">{{ on ? 'On' : 'Off' }}</span>
  </motion.button>
</template>
