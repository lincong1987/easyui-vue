<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../lib/motion-tokens';
import { CATALOG, daysSince } from '../lib/catalog';
import { SearchIcon } from '../lib/icons';
import ComponentPreview from './ComponentPreview.vue';
import { cn } from '../lib/utils';

const TABS = ['All', 'Recent', 'Motion', 'Buttons', 'Navigation', 'Feedback', 'Overlays', 'Forms', 'Auth'] as const;
type Tab = (typeof TABS)[number];
const PER_PAGE = 10;

const tab = ref<Tab>('All');
const query = ref('');
const page = ref(1);

const counts = computed<Record<string, number>>(() => {
  const c: Record<string, number> = { All: CATALOG.length };
  for (const t of TABS.slice(1)) {
    c[t] =
      t === 'Recent'
        ? CATALOG.filter((x) => daysSince(x.createdAt) <= 30).length
        : CATALOG.filter((x) => x.category === t).length;
  }
  return c;
});

const filtered = computed(() => {
  let list = CATALOG;
  if (tab.value === 'Recent') list = list.filter((x) => daysSince(x.createdAt) <= 30);
  else if (tab.value !== 'All') list = list.filter((x) => x.category === tab.value);
  const q = query.value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (x) => x.title.toLowerCase().includes(q) || x.description.toLowerCase().includes(q) || x.slug.includes(q),
    );
  }
  return list;
});

const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)));
const safePage = computed(() => Math.min(page.value, pages.value));
const visible = computed(() => filtered.value.slice((safePage.value - 1) * PER_PAGE, safePage.value * PER_PAGE));

function pick(t: Tab) {
  tab.value = t;
  page.value = 1;
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-5 pb-16 pt-12">
    <p class="text-xs font-medium uppercase tracking-[0.2em] text-muted">Directory</p>
    <h1 class="mt-2 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
      Vue Component Library
      <br />
      with Copy Paste UI
    </h1>
    <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted">
      {{ CATALOG.length }} components to explore. Copy accessible, typed Vue 3 UI into your project.
      Browse live demos, review Tailwind styles, and install only what you need.
    </p>

    <div class="mt-8 flex flex-col gap-4">
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="t in TABS"
          :key="t"
          :class="cn(
            'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
            tab === t ? 'text-bg' : 'text-muted hover:text-fg',
          )"
          @click="pick(t)"
        >
          <motion.span
            v-if="tab === t"
            layout-id="components-tab-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-full bg-fg"
          />
          <span class="relative z-10">
            {{ t }} <span :class="cn('tabular-nums', tab === t ? 'opacity-70' : 'opacity-50')">{{ counts[t] }}</span>
          </span>
        </button>
      </div>

      <div class="relative max-w-sm">
        <SearchIcon :size="15" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          v-model="query"
          placeholder="Search components…"
          aria-label="Search components"
          class="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-fg/40 focus:border-fg"
          @input="page = 1"
        />
      </div>
    </div>

    <p class="mt-6 text-xs text-muted" aria-live="polite">
      {{ filtered.length }} result{{ filtered.length === 1 ? '' : 's' }} · page {{ safePage }} of {{ pages }}
    </p>

    <motion.div layout class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        <motion.div
          v-for="c in visible"
          :key="c.slug"
          layout
          :initial="{ opacity: 0, scale: 0.97 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.97 }"
          :transition="motionTransitions.springSmooth"
        >
          <ComponentPreview :slug="c.slug" :title="c.title" :created-at="c.createdAt" />
        </motion.div>
      </AnimatePresence>
    </motion.div>

    <div v-if="filtered.length === 0" class="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">
      No components match “{{ query }}” in {{ tab }}.
    </div>

    <div v-if="pages > 1" class="mt-8 flex items-center justify-center gap-1.5">
      <button
        v-for="p in pages"
        :key="p"
        :aria-current="p === safePage ? 'page' : undefined"
        :class="cn(
          'relative h-8 min-w-8 rounded-full px-2 text-sm tabular-nums transition-colors',
          p === safePage ? 'text-bg' : 'text-muted hover:text-fg',
        )"
        @click="page = p"
      >
        <motion.span
          v-if="p === safePage"
          layout-id="page-pill"
          :transition="motionTransitions.springMorph"
          class="absolute inset-0 rounded-full bg-fg"
        />
        <span class="relative z-10">{{ p }}</span>
      </button>
    </div>
  </main>
</template>
