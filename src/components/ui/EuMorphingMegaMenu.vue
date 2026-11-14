<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const MENUS = {
  Products: {
    w: 300,
    items: ['Spotlight Card', 'Wallet Card', 'Animated Number', 'Donut Chart'],
    note: 'Live-animated components ready to paste in.',
  },
  Resources: {
    w: 240,
    items: ['Docs', 'Registry JSON', 'llms.txt', 'Changelog'],
    note: 'Everything an integrator needs.',
  },
  Company: {
    w: 200,
    items: ['About', 'Sponsors', 'GitHub'],
    note: 'Built in public since August.',
  },
} as const;

type MenuKey = keyof typeof MENUS;

const MENU_KEYS = Object.keys(MENUS) as MenuKey[];

const open = ref<MenuKey | null>(null);
const panel = computed(() => (open.value ? MENUS[open.value] : MENUS.Products));
</script>

<template>
  <div :class="cn('relative w-full max-w-lg', props.class)">
    <div class="flex items-center justify-center gap-1 rounded-2xl border border-line bg-surface p-1.5 shadow-sm">
      <button
        v-for="k in MENU_KEYS"
        :key="k"
        :aria-expanded="open === k"
        :class="cn(
          'flex items-center gap-1 rounded-xl px-3 py-2 text-sm transition-colors',
          open === k ? 'bg-card text-fg' : 'text-muted hover:text-fg',
        )"
        @click="open = open === k ? null : k"
        @pointerenter="open = k"
      >
        {{ k }}
        <motion.span :animate="{ rotate: open === k ? 180 : 0 }" :transition="motionTransitions.springSnappy">
          <ChevronDownIcon :size="13" />
        </motion.span>
      </button>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="open"
        :key="open"
        :initial="{ opacity: 0, y: -8, scale: 0.97 }"
        :animate="{ opacity: 1, y: 8, scale: 1 }"
        :exit="{ opacity: 0, y: -8, scale: 0.97 }"
        :transition="motionTransitions.springMorph"
        :style="{ width: `${panel.w}px` }"
        class="absolute left-1/2 top-full z-30 -translate-x-1/2 rounded-2xl border border-line bg-surface p-3 shadow-2xl"
      >
        <p class="px-2 pb-2 text-[10px] uppercase tracking-widest text-muted">{{ panel.note }}</p>
        <a
          v-for="it in panel.items"
          :key="it"
          href="#/components"
          class="block rounded-xl px-3 py-2 text-sm text-fg transition-colors hover:bg-card"
        >
          {{ it }}
        </a>
        <span
          aria-hidden
          class="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-line bg-surface"
        />
      </motion.div>
    </AnimatePresence>
    <p class="mt-8 text-center text-xs text-muted">one morphing panel — width and arrow adapt to the trigger</p>
  </div>
</template>
