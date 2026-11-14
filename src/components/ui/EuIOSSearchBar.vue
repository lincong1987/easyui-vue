<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { SearchIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const focused = ref(false);
const value = ref('');
</script>

<template>
  <div :class="cn('w-full max-w-xs', props.class)">
    <motion.div
      :animate="{ scale: focused ? 1.03 : 1 }"
      :transition="motionTransitions.springSnappy"
      :class="cn(
        'flex items-center gap-2 rounded-full bg-card px-3.5 py-2.5 transition-colors',
        focused && 'bg-surface ring-2 ring-fg/70',
      )"
    >
      <SearchIcon :size="15" class="shrink-0 text-muted" />
      <input
        v-model="value"
        placeholder="Search"
        aria-label="iOS style search"
        class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/80"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        v-if="value"
        aria-label="Clear"
        class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted/60 text-[9px] text-bg"
        @click="value = ''"
      >
        <XIcon :size="9" />
      </button>
    </motion.div>
    <p class="mt-2 text-center text-[10px] text-muted">{{ focused ? 'focused — pill lifts and widens' : 'resting pill' }}</p>
  </div>
</template>
