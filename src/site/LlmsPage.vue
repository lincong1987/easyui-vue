<script setup lang="ts">
import { computed } from 'vue';
import { CATALOG } from '../lib/catalog';

const byCat = computed(() => {
  const map = new Map<string, typeof CATALOG>();
  for (const c of CATALOG) {
    const list = map.get(c.category) ?? [];
    list.push(c);
    map.set(c.category, list);
  }
  return [...map.entries()];
});
</script>

<template>
  <main class="mx-auto max-w-4xl px-5 pb-16 pt-12">
    <h1 class="text-3xl font-semibold tracking-[-0.02em]">EasyUI Vue Port — llms.txt</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
      Production-ready, beautifully crafted animated UI components built with Vue 3, Tailwind CSS,
      and Motion for Vue. This port catalogues all {{ CATALOG.length }} upstream components; all of
      them are implemented here as live, from-scratch Vue implementations.
    </p>

    <section v-for="[cat, items] in byCat" :key="cat" class="mt-8">
      <h2 class="text-lg font-semibold tracking-tight">
        {{ cat }} <span class="text-sm font-normal text-muted">({{ items.length }})</span>
      </h2>
      <ul class="mt-2 divide-y divide-line/70 overflow-hidden rounded-2xl border border-line bg-surface">
        <li v-for="c in items" :key="c.slug">
          <a
            :href="`#/component/${c.slug}`"
            class="flex items-baseline justify-between gap-4 px-4 py-2.5 text-sm transition-colors hover:bg-card"
          >
            <span class="font-medium">{{ c.title }}</span>
            <span class="truncate text-xs text-muted">{{ c.description }}</span>
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>
