<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { EditIcon, PlusIcon, TrashIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ACTIONS = [
  { icon: PlusIcon, label: 'Add', tint: 'bg-fg text-bg' },
  { icon: EditIcon, label: 'Edit', tint: 'bg-card text-fg' },
  { icon: TrashIcon, label: 'Delete', tint: 'bg-red-500/90 text-white' },
];

const open = ref(true);
const used = ref<string | null>(null);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <div class="flex items-end gap-2">
      <AnimatePresence>
        <motion.button
          v-for="(a, i) in open ? ACTIONS.slice(1) : []"
          :key="a.label"
          :aria-label="a.label"
          :initial="{ y: 16, opacity: 0, scale: 0.7 }"
          :animate="{ y: 0, opacity: 1, scale: 1 }"
          :exit="{ y: 16, opacity: 0, scale: 0.7 }"
          :transition="{ ...motionTransitions.springResponsive, delay: i * 0.05 }"
          :class="cn('flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg', a.tint)"
          @click="used = a.label"
        >
          <component :is="a.icon" :size="16" />
        </motion.button>
      </AnimatePresence>
      <motion.button
        aria-label="Toggle dock"
        :while-press="{ scale: 0.9 }"
        :transition="motionTransitions.springSnappy"
        class="flex h-11 w-11 items-center justify-center rounded-2xl bg-fg text-bg shadow-lg"
        @click="open = !open"
      >
        <motion.span :animate="{ rotate: open ? 45 : 0 }" :transition="motionTransitions.springSnappy">
          <PlusIcon :size="18" />
        </motion.span>
      </motion.button>
    </div>
    <p class="text-xs text-muted">{{ used ? `last action: ${used}` : 'tap + to collapse the fan' }}</p>
  </div>
</template>
