<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const pressed = ref(false);
</script>

<template>
  <motion.button
    :while-press="{ scale: 0.94, y: 1 }"
    :transition="motionTransitions.springResponsive"
    :class="cn(
      'inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
      props.class,
    )"
    @click="pressed = !pressed"
  >
    Tactile press{{ pressed ? ' ✓' : '' }}
  </motion.button>
</template>
