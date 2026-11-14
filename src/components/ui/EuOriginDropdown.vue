<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

type Side = 'left' | 'center' | 'right';

const OPTIONS = ['Alpha', 'Beta', 'Gamma', 'Delta'];

const open = ref<Side | null>(null);
const selected = ref('Alpha');

function openAt(side: Side) {
  open.value = open.value === side ? null : side;
}

function choose(option: string) {
  selected.value = option;
  open.value = null;
}
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="flex items-center justify-center gap-2">
      <button
        class="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg"
        @click="openAt('left')"
      >
        align left
      </button>
      <div class="relative">
        <button
          :aria-expanded="open === 'center'"
          class="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm shadow-sm transition-shadow hover:shadow-md"
          @click="openAt('center')"
        >
          {{ selected }}
          <motion.span :animate="{ rotate: open ? 180 : 0 }" :transition="motionTransitions.springSnappy">
            <ChevronDownIcon :size="14" class="text-muted" />
          </motion.span>
        </button>
        <AnimatePresence>
          <motion.ul
            v-if="open"
            key="origin-dropdown"
            :initial="{
              opacity: 0,
              scale: 0.94,
              x: open === 'left' ? -10 : open === 'right' ? 10 : 0,
              y: -6,
            }"
            :animate="{ opacity: 1, scale: 1, x: 0, y: 0 }"
            :exit="{
              opacity: 0,
              scale: 0.94,
              x: open === 'left' ? -10 : open === 'right' ? 10 : 0,
              y: -6,
            }"
            :transition="motionTransitions.springSnappy"
            role="listbox"
            aria-label="Options"
            :class="cn(
              'absolute top-full z-30 mt-1.5 w-44 rounded-2xl border border-line bg-surface p-1.5 shadow-xl',
              open === 'left' && 'left-0 origin-top-left',
              open === 'center' && 'left-1/2 -translate-x-1/2 origin-top',
              open === 'right' && 'right-0 origin-top-right',
            )"
          >
            <li v-for="o in OPTIONS" :key="o">
              <button
                role="option"
                :aria-selected="o === selected"
                class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-card"
                @click="choose(o)"
              >
                {{ o }}
                <CheckIcon v-if="o === selected" :size="13" class="text-fg" />
              </button>
            </li>
          </motion.ul>
        </AnimatePresence>
      </div>
      <button
        class="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg"
        @click="openAt('right')"
      >
        align right
      </button>
    </div>
    <p class="mt-4 text-center text-xs text-muted">
      menu aligns to the chosen trigger edge — left / center / right
    </p>
  </div>
</template>
