<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ACTIONS = ['Duplicate', 'Rename', 'Archive'];

const open = ref(false);
const last = ref<string | null>(null);

function choose(action: string) {
  last.value = action;
  open.value = false;
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <div class="relative">
      <div class="flex overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
        <button
          class="px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-card"
          @click="last = 'Save applied'"
        >Save changes</button>
        <span class="w-px bg-line" />
        <button
          :aria-expanded="open"
          aria-label="More save actions"
          :class="
            cn(
              'px-2.5 py-2.5 text-muted transition-colors hover:bg-card hover:text-fg',
              open && 'bg-card text-fg',
            )
          "
          @click="open = !open"
        >
          <motion.span :animate="{ rotate: open ? 180 : 0 }" :transition="motionTransitions.springSnappy">
            <ChevronDownIcon :size="14" />
          </motion.span>
        </button>
      </div>
      <AnimatePresence>
        <motion.ul
          v-if="open"
          key="actions"
          :initial="{ opacity: 0, y: -6, scale: 0.97 }"
          :animate="{ opacity: 1, y: 6, scale: 1 }"
          :exit="{ opacity: 0, y: -6, scale: 0.97 }"
          :transition="motionTransitions.springSnappy"
          role="menu"
          class="absolute inset-x-0 top-full z-30 rounded-xl border border-line bg-surface p-1 shadow-xl"
        >
          <li v-for="a in ACTIONS" :key="a" role="none">
            <button
              role="menuitem"
              class="w-full rounded-lg px-3 py-2 text-left text-xs text-fg transition-colors hover:bg-card"
              @click="choose(a)"
            >{{ a }}</button>
          </li>
        </motion.ul>
      </AnimatePresence>
    </div>
    <p class="text-xs text-muted">{{ last ?? 'chevron shares the pill with the primary action' }}</p>
  </div>
</template>
