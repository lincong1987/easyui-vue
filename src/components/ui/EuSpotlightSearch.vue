<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { SearchIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const DOCS = [
  { title: 'Quick start', path: 'docs/quick-start' },
  { title: 'Registry architecture', path: 'docs/architecture' },
  { title: 'Animated Number Morph', path: 'components/animated-number' },
  { title: 'Wallet Card', path: 'components/wallet-card' },
  { title: 'Command Menu', path: 'components/command-menu' },
  { title: 'Spotlight Card', path: 'components/spotlight-card' },
  { title: 'Donut Chart', path: 'components/donut-chart' },
  { title: 'LLMs index', path: 'llms.txt' },
];

const open = ref(false);
const query = ref('');
const active = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return DOCS;
  return DOCS.filter((d) => `${d.title} ${d.path}`.toLowerCase().includes(q));
});

watch(query, () => {
  active.value = 0;
});

watch(open, (isOpen) => {
  if (isOpen) nextTick(() => inputRef.value?.focus());
});

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    open.value = !open.value;
  } else if (e.key === 'Escape') {
    open.value = false;
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey));
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey));

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    active.value = Math.min(results.value.length - 1, active.value + 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    active.value = Math.max(0, active.value - 1);
  } else if (e.key === 'Enter' || e.key === 'Escape') {
    open.value = false;
  }
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <button
      class="flex w-full items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-muted transition-colors hover:border-fg/40"
      @click="open = true"
    >
      <SearchIcon :size="15" />
      <span class="flex-1 text-left">Search docs &amp; components…</span>
      <kbd class="rounded border border-line bg-card px-1.5 py-0.5 text-[10px]">⌘K</kbd>
    </button>

    <AnimatePresence>
      <div v-if="open" key="spotlight" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24">
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="motionTransitions.easeFast"
          class="absolute inset-0 bg-black/45 backdrop-blur-sm"
          @click="open = false"
        />
        <motion.div
          :initial="{ opacity: 0, scale: 0.97, y: -10 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.97, y: -10 }"
          :transition="motionTransitions.springSnappy"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          class="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        >
          <div class="flex items-center gap-2.5 border-b border-line px-4">
            <SearchIcon :size="15" class="text-muted" />
            <input
              ref="inputRef"
              v-model="query"
              placeholder="Search…"
              aria-label="Search query"
              class="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted/70"
              @keydown="onKeyDown"
            />
            <kbd class="rounded border border-line bg-card px-1.5 py-0.5 text-[10px] text-muted">ESC</kbd>
          </div>
          <ul class="max-h-72 overflow-y-auto p-1.5">
            <li v-for="(r, i) in results" :key="r.path">
              <button
                :class="cn(
                  'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                  i === active ? 'bg-fg text-bg' : 'text-fg hover:bg-card',
                )"
                @mouseenter="active = i"
                @click="open = false"
              >
                <span>{{ r.title }}</span>
                <span
                  :class="cn(
                    'shrink-0 font-mono text-[10px]',
                    i === active ? 'text-bg/60' : 'text-muted',
                  )"
                >
                  /{{ r.path }}
                </span>
              </button>
            </li>
            <li v-if="results.length === 0" class="px-3 py-8 text-center text-sm text-muted">
              Nothing matches “{{ query }}”.
            </li>
          </ul>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
