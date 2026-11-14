<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, ChevronDownIcon, SearchIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const OPTIONS = [
  'Activity Heatmap',
  'Animated Number',
  'Bar Chart',
  'Command Menu',
  'Donut Chart',
  'Morphing Dialog',
  'Spotlight Card',
  'Wallet Card',
];

const open = ref(false);
const query = ref('');
const selected = ref('Spotlight Card');
const active = ref(0);

const results = computed(() => {
  const q = query.value.toLowerCase();
  return OPTIONS.filter((o) => o.toLowerCase().includes(q));
});

let closeTimer: number | undefined;

function choose(o: string) {
  selected.value = o;
  open.value = false;
  query.value = '';
}

function onFocus() {
  open.value = true;
}

function onBlur() {
  closeTimer = window.setTimeout(() => {
    open.value = false;
  }, 120);
}

function onInput(e: Event) {
  query.value = (e.target as HTMLInputElement).value;
  active.value = 0;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') active.value = Math.min(results.value.length - 1, active.value + 1);
  else if (e.key === 'ArrowUp') active.value = Math.max(0, active.value - 1);
  else if (e.key === 'Enter' && results.value[active.value]) choose(results.value[active.value]);
  else if (e.key === 'Escape') open.value = false;
}

function matchParts(o: string): { text: string; match: boolean }[] {
  const q = query.value;
  const idx = q ? o.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (idx < 0) return [{ text: o, match: false }];
  return [
    { text: o.slice(0, idx), match: false },
    { text: o.slice(idx, idx + q.length), match: true },
    { text: o.slice(idx + q.length), match: false },
  ].filter((p) => p.text !== '');
}

onUnmounted(() => {
  if (closeTimer !== undefined) window.clearTimeout(closeTimer);
});
</script>

<template>
  <div :class="cn('relative w-full max-w-xs', props.class)">
    <div
      :class="cn(
        'flex items-center gap-2 rounded-xl border bg-surface px-3.5 py-2.5 transition-colors',
        open ? 'border-fg' : 'border-line hover:border-fg/40',
      )"
    >
      <SearchIcon :size="14" class="shrink-0 text-muted" />
      <input
        :value="open ? query : selected"
        placeholder="Search components…"
        aria-label="Combobox search"
        role="combobox"
        :aria-expanded="open"
        class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeyDown"
      />
      <motion.span :animate="{ rotate: open ? 180 : 0 }" :transition="motionTransitions.springSnappy">
        <ChevronDownIcon :size="14" class="text-muted" />
      </motion.span>
    </div>

    <AnimatePresence>
      <motion.ul
        v-if="open"
        key="combobox-list"
        :initial="{ opacity: 0, y: -6, scale: 0.98 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -6, scale: 0.98 }"
        :transition="motionTransitions.springSnappy"
        role="listbox"
        class="absolute inset-x-0 top-full z-30 mt-1.5 max-h-56 overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-xl"
      >
        <li v-for="(o, i) in results" :key="o" role="option" :aria-selected="o === selected">
          <button
            :class="cn(
              'relative flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors',
              i === active ? 'text-fg' : 'text-muted hover:text-fg',
            )"
            @mouseenter="active = i"
            @click="choose(o)"
          >
            <motion.span
              v-if="i === active"
              layout-id="combobox-highlight"
              :transition="motionTransitions.springMorph"
              class="absolute inset-0 rounded-xl bg-card"
            />
            <span class="relative z-10">
              <span
                v-for="(p, pi) in matchParts(o)"
                :key="pi"
                :class="p.match ? 'font-semibold underline decoration-2 underline-offset-2' : ''"
              >{{ p.text }}</span>
            </span>
            <AnimatePresence>
              <motion.span
                v-if="o === selected"
                :key="o"
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :exit="{ scale: 0 }"
                :transition="motionTransitions.springResponsive"
                class="relative z-10 text-fg"
              >
                <CheckIcon :size="14" />
              </motion.span>
            </AnimatePresence>
          </button>
        </li>
        <li v-if="results.length === 0" class="px-3 py-6 text-center text-sm text-muted">No matches.</li>
      </motion.ul>
    </AnimatePresence>
  </div>
</template>
