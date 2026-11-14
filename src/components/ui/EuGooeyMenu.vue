<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { HeartIcon, PlusIcon, SendIcon, StarIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ACTIONS = [
  { icon: HeartIcon, label: 'Like', tint: 'bg-rose-500' },
  { icon: StarIcon, label: 'Star', tint: 'bg-amber-500' },
  { icon: SendIcon, label: 'Share', tint: 'bg-sky-500' },
];

const open = ref(false);

const visible = computed(() => (open.value ? ACTIONS : []));

function enterTransition(i: number) {
  return { ...motionTransitions.springResponsive, delay: i * 0.04 };
}
</script>

<template>
  <div :class="cn('relative flex flex-col items-center gap-6', props.class)">
    <!-- Metaball filter: blur merges the blobs, the alpha ramp re-sharpens them -->
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
        />
      </filter>
    </svg>

    <div class="relative flex flex-col items-center" style="filter: url(#gooey)">
      <div class="relative flex h-40 w-24 flex-col-reverse items-center justify-start gap-3 pb-1">
        <AnimatePresence>
          <motion.button
            v-for="(a, i) in visible"
            :key="a.label"
            :aria-label="a.label"
            :initial="{ y: 30, scale: 0.5, opacity: 0 }"
            :animate="{ y: 0, scale: 1, opacity: 1 }"
            :exit="{ y: 30, scale: 0.5, opacity: 0 }"
            :transition="enterTransition(i)"
            :class="cn('flex h-12 w-12 items-center justify-center rounded-full text-white', a.tint)"
          >
            <component :is="a.icon" :size="18" />
          </motion.button>
        </AnimatePresence>
      </div>
      <motion.button
        :aria-expanded="open"
        aria-label="Toggle gooey menu"
        :while-press="{ scale: 0.92 }"
        :transition="motionTransitions.springSnappy"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-bg shadow-lg"
        @click="open = !open"
      >
        <motion.span :animate="{ rotate: open ? 45 : 0 }" :transition="motionTransitions.springSnappy">
          <PlusIcon :size="22" />
        </motion.span>
      </motion.button>
    </div>
    <p class="text-xs text-muted">{{ open ? 'blobs fused out of the pill' : 'tap the pill' }}</p>
  </div>
</template>
