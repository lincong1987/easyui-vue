<script setup lang="ts">
import { computed } from 'vue';
import { CATALOG } from '../lib/catalog';
import { useLocale } from '../i18n/useLocale';

const { t, locale } = useLocale();

const byCat = computed(() => {
  const map = new Map<string, typeof CATALOG>();
  for (const c of CATALOG) {
    const list = map.get(c.category) ?? [];
    list.push(c);
    map.set(c.category, list);
  }
  return [...map.entries()];
});

const catLabel = (cat: string) =>
  t.value.categories[cat as keyof typeof t.value.categories] ?? cat;

const desc = (slug: string, fallback: string) =>
  locale.value === 'zh-CN' ? CATALOG.find((c) => c.slug === slug)?.descriptionZh ?? fallback : fallback;

const catKey = (cat: string) => cat;
</script>

<template>
  <main class="mx-auto max-w-4xl px-5 pb-16 pt-12">
    <h1 class="text-3xl font-semibold tracking-[-0.02em]">{{ t.llms.title }}</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
      {{ t.llms.intro.replace('{count}', String(CATALOG.length)) }}
    </p>

    <section v-for="[cat, items] in byCat" :key="catKey(cat)" class="mt-8">
      <h2 class="text-lg font-semibold tracking-tight">
        {{ catLabel(cat) }} <span class="text-sm font-normal text-muted">({{ items.length }})</span>
      </h2>
      <ul class="mt-2 divide-y divide-line/70 overflow-hidden rounded-2xl border border-line bg-surface">
        <li v-for="c in items" :key="c.slug">
          <a
            :href="`#/component/${c.slug}`"
            class="flex items-baseline justify-between gap-4 px-4 py-2.5 text-sm transition-colors hover:bg-card"
          >
            <span class="font-medium">{{ c.title }}</span>
            <span class="truncate text-xs text-muted">{{ desc(c.slug, c.description) }}</span>
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>
