<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface Item {
  label: string;
  hint: string;
  category: string;
}

const ITEMS: Item[] = [
  { label: 'Install via shadcn CLI', hint: 'npx shadcn add', category: 'Getting started' },
  { label: 'Browse motion components', hint: '42 items', category: 'Catalog' },
  { label: 'Browse feedback components', hint: '34 items', category: 'Catalog' },
  { label: 'Theme tokens', hint: 'colors · radius · fonts', category: 'Styling' },
  { label: 'Dark mode setup', hint: 'class strategy', category: 'Styling' },
  { label: 'Framer Motion springs', hint: 'motion-tokens.ts', category: 'Motion' },
  { label: 'Copy-paste ownership', hint: 'MIT license', category: 'Licensing' },
];

const KEYS = ['↑', '↓', '⏎'];

const open = ref(false);
const query = ref('');
const active = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);

function fuzzy(needle: string, text: string): boolean {
  let i = 0;
  for (const ch of text.toLowerCase()) {
    if (ch === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return needle.length === 0;
}

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  return ITEMS.filter((it) => fuzzy(q, `${it.label} ${it.category}`));
});

watch(query, () => {
  active.value = 0;
});

watch(open, (isOpen) => {
  if (isOpen) nextTick(() => inputRef.value?.focus());
});

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    active.value = Math.min(results.value.length - 1, active.value + 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    active.value = Math.max(0, active.value - 1);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    open.value = false;
  } else if (e.key === 'Escape') {
    open.value = false;
  }
}
</script>

<template>
  <div :class="cn('relative w-full max-w-sm', props.class)">
    <button
      class="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-muted transition-colors hover:border-fg/40"
      @click="open = !open"
    >
      <span>Open command menu</span>
      <span class="flex gap-1">
        <kbd v-for="k in KEYS" :key="k" class="rounded border border-line bg-card px-1.5 text-[10px]">{{ k }}</kbd>
      </span>
    </button>

    <AnimatePresence>
      <motion.div
        v-if="open"
        key="command-menu"
        :initial="{ opacity: 0, y: -6, scale: 0.98 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -6, scale: 0.98 }"
        :transition="motionTransitions.springSnappy"
        class="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl"
      >
        <input
          ref="inputRef"
          v-model="query"
          placeholder="Type a command or search…"
          aria-label="Command search"
          class="w-full border-b border-line bg-transparent px-3.5 py-3 text-sm outline-none placeholder:text-muted/70"
          @keydown="onKeyDown"
        />
        <ul class="max-h-56 overflow-y-auto p-1.5">
          <li v-for="(it, i) in results" :key="it.label">
            <button
              :class="cn(
                'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                i === active ? 'bg-fg text-bg' : 'text-fg hover:bg-card',
              )"
              @mouseenter="active = i"
              @click="open = false"
            >
              <span class="truncate">{{ it.label }}</span>
              <span
                :class="cn(
                  'shrink-0 text-[10px] uppercase tracking-wide',
                  i === active ? 'text-bg/60' : 'text-muted',
                )"
              >
                {{ it.category }}
              </span>
            </button>
          </li>
          <li v-if="results.length === 0" class="px-3 py-6 text-center text-sm text-muted">No commands found.</li>
        </ul>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
