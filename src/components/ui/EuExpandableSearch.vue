<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { SearchIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const focused = ref(false);
const value = ref('');
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <motion.div
      :animate="{ width: focused ? '100%' : '62%' }"
      :transition="motionTransitions.springMorph"
      :class="cn(
        'flex items-center gap-2 rounded-full border bg-surface px-4 py-2.5 transition-colors',
        focused ? 'border-fg' : 'border-line hover:border-fg/40',
      )"
    >
      <SearchIcon :size="15" class="shrink-0 text-muted" />
      <input
        v-model="value"
        placeholder="Search components…"
        aria-label="Search"
        class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        v-if="value"
        aria-label="Clear search"
        class="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-card hover:text-fg"
        @click="value = ''"
      >
        <XIcon :size="12" />
      </button>
      <AnimatePresence>
        <motion.span
          v-if="!focused && !value"
          key="shortcut"
          :initial="{ opacity: 0, width: 0 }"
          :animate="{ opacity: 1, width: 'auto' }"
          :exit="{ opacity: 0, width: 0 }"
          class="hidden shrink-0 items-center gap-1 sm:flex"
        >
          <kbd
            v-for="k in ['⌘', 'K']"
            :key="k"
            class="rounded border border-line bg-card px-1.5 text-[10px] text-muted"
          >{{ k }}</kbd>
        </motion.span>
      </AnimatePresence>
    </motion.div>
    <p class="mt-2 pl-2 text-xs text-muted">{{ focused ? 'expanded — full width' : 'collapsed at rest' }}</p>
  </div>
</template>
