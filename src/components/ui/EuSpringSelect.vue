<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ITEMS = ['Weekly', 'Monthly', 'Quarterly', 'Never'];

const open = ref(false);
const value = ref('Monthly');

function select(item: string) {
  value.value = item;
  open.value = false;
}
</script>

<template>
  <div :class="cn('relative w-full max-w-xs', props.class)">
    <button
      aria-haspopup="listbox"
      :aria-expanded="open"
      class="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 text-sm shadow-sm transition-colors hover:border-fg/40"
      @click="open = !open"
    >
      {{ value }}
      <motion.span :animate="{ rotate: open ? 200 : 0 }" :transition="motionTransitions.springSnappy" class="text-muted">
        <ChevronDownIcon :size="15" />
      </motion.span>
    </button>

    <AnimatePresence>
      <motion.ul
        v-if="open"
        key="spring-select-list"
        role="listbox"
        :initial="{ opacity: 0, y: -8, scale: 0.96 }"
        :animate="{ opacity: 1, y: 6, scale: 1 }"
        :exit="{ opacity: 0, y: -8, scale: 0.96 }"
        :transition="motionTransitions.springSnappy"
        class="absolute inset-x-0 top-full z-30 rounded-2xl border border-line bg-surface p-1.5 shadow-xl"
      >
        <li v-for="it in ITEMS" :key="it" role="option" :aria-selected="it === value">
          <button
            :class="cn(
              'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-card',
              it === value ? 'font-medium text-fg' : 'text-muted',
            )"
            @click="select(it)"
          >
            {{ it }}
            <CheckIcon v-if="it === value" :size="14" />
          </button>
        </li>
      </motion.ul>
    </AnimatePresence>
  </div>
</template>
