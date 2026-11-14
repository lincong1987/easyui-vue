<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  items: string[];
  class?: string;
}>();

const SUBMENU = ['Overview', 'Changelog', 'Roadmap'];

const active = ref(0);
const submenuOpen = ref(false);

function select(i: number) {
  active.value = i;
  submenuOpen.value = false;
}
</script>

<template>
  <div :class="cn('relative inline-flex flex-col items-center gap-2', props.class)">
    <div class="inline-flex rounded-full border border-line bg-card p-1">
      <button
        v-for="(item, i) in props.items"
        :key="item"
        :aria-pressed="i === active"
        :class="cn(
          'relative flex items-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors',
          i === active ? 'text-fg' : 'text-muted hover:text-fg',
        )"
        @click="select(i)"
      >
        <motion.span
          v-if="i === active"
          layout-id="pill-nav-indicator"
          :transition="motionTransitions.springMorph"
          class="absolute inset-0 rounded-full bg-surface shadow-sm"
        />
        <span class="relative z-10">{{ item }}</span>
        <ChevronDownIcon
          v-if="i === active"
          :size="13"
          :class="cn('relative z-10 transition-transform', submenuOpen && 'rotate-180')"
        />
      </button>
    </div>
    <AnimatePresence>
      <motion.div
        v-if="submenuOpen"
        key="pill-nav-submenu"
        :initial="{ opacity: 0, y: -6, scale: 0.97 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -6, scale: 0.97 }"
        :transition="motionTransitions.springSnappy"
        class="absolute top-full z-20 mt-1 w-44 rounded-2xl border border-line bg-surface p-1 shadow-xl"
      >
        <button
          v-for="sub in SUBMENU"
          :key="sub"
          class="block w-full rounded-xl px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-card hover:text-fg"
        >
          {{ sub }}
        </button>
      </motion.div>
    </AnimatePresence>
    <button
      type="button"
      class="text-xs text-muted underline decoration-line underline-offset-4 hover:text-fg"
      @click="submenuOpen = !submenuOpen"
    >
      toggle submenu
    </button>
  </div>
</template>
