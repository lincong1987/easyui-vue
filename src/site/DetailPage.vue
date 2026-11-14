<script setup lang="ts">
import { computed } from 'vue';
import { CATALOG } from '../lib/catalog';
import { DEMOS } from './demos';
import { ArrowUpRightIcon, PackageIcon } from '../lib/icons';
import { cn } from '../lib/utils';

const props = defineProps<{ slug: string }>();

const entry = computed(() => CATALOG.find((c) => c.slug === props.slug));
const Demo = computed(() => (entry.value ? DEMOS[entry.value.slug] ?? null : null));
</script>

<template>
  <main v-if="entry" class="mx-auto max-w-5xl px-5 pb-16 pt-12">
    <a href="#/components" class="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">← All components</a>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <h1 class="text-3xl font-semibold tracking-[-0.02em]">{{ entry.title }}</h1>
      <span class="rounded-full border border-line bg-card px-2.5 py-1 text-xs text-muted">{{ entry.category }}</span>
      <span
        :class="cn(
          'rounded-full px-2.5 py-1 text-xs font-medium',
          entry.implemented ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border border-dashed border-line text-muted',
        )"
      >
        {{ entry.implemented ? '✓ Implemented in this Vue port' : 'Catalogued only' }}
      </span>
    </div>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{{ entry.description }}</p>

    <div class="mt-6 overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
      <div class="border-b border-line/70 px-5 py-3 text-xs font-medium uppercase tracking-widest text-muted">Live preview</div>
      <div class="flex min-h-[320px] items-center justify-center bg-card/60 p-8 dark:bg-white/[0.02]">
        <div class="flex w-full items-center justify-center">
          <component :is="Demo" v-if="Demo" />
          <div v-else class="flex max-w-sm flex-col items-center gap-2 text-center">
            <PackageIcon :size="22" class="text-muted/60" />
            <p class="text-sm font-medium">Not ported yet</p>
            <p class="text-xs leading-relaxed text-muted">
              This entry is catalogued from upstream metadata. The live implementation lives in the
              upstream repository — follow the source link below.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
      <div class="rounded-2xl border border-line bg-surface p-4">
        <p class="text-xs font-medium uppercase tracking-widest text-muted">Created</p>
        <p class="mt-1.5 text-sm tabular-nums">{{ entry.createdAt }}</p>
      </div>
      <div class="rounded-2xl border border-line bg-surface p-4 md:col-span-2">
        <p class="text-xs font-medium uppercase tracking-widest text-muted">Badges</p>
        <div class="mt-2 flex flex-wrap gap-1.5">
          <template v-if="entry.badges.length > 0">
            <span v-for="b in entry.badges" :key="b" class="rounded-full border border-line bg-card px-2.5 py-1 text-xs text-fg">
              {{ b }}
            </span>
          </template>
          <span v-else class="text-sm text-muted">—</span>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <a
        :href="`https://easyui.site/components/${entry.slug}`"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:bg-card"
      >
        Upstream page <ArrowUpRightIcon :size="13" />
      </a>
      <a
        href="https://github.com/Surajmaurya1/easyui/tree/main/src/components/ui"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:bg-card"
      >
        Upstream source <ArrowUpRightIcon :size="13" />
      </a>
    </div>
  </main>

  <main v-else class="mx-auto max-w-3xl px-5 py-24 text-center">
    <h1 class="text-2xl font-semibold">Component not found</h1>
    <p class="mt-2 text-sm text-muted">No catalog entry for “{{ slug }}”.</p>
    <a href="#/components" class="mt-6 inline-block rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg">Back to directory</a>
  </main>
</template>
