<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../lib/motion-tokens';
import { ArrowRightIcon, GithubIcon, SparklesIcon, StarIcon, ZapIcon } from '../lib/icons';
import { CATALOG, FEATURED } from '../lib/catalog';
import { useLocale } from '../i18n/useLocale';
import ComponentPreview from './ComponentPreview.vue';

const { t } = useLocale();

const bySlug = new Map(CATALOG.map((c) => [c.slug, c]));
const implemented = computed(() => CATALOG.filter((c) => c.implemented).length);
const featured = FEATURED.map((s) => bySlug.get(s)).filter((c): c is (typeof CATALOG)[number] => Boolean(c));
</script>

<template>
  <main class="mx-auto max-w-6xl px-5">
    <section class="pb-10 pt-16 text-center sm:pt-24">
      <motion.div
        :initial="{ opacity: 0, y: 14 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="motionTransitions.easeSoft"
      >
        <p class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
          <SparklesIcon :size="12" />
          {{ t.home.badge.replace('{live}', String(implemented)) }}
        </p>
        <h1 class="mx-auto max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.03em] sm:text-6xl">
          {{ t.home.title1 }}
          <br />
          {{ t.home.title2 }}
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
          {{ t.home.subtitle }}
        </p>
        <div class="mt-7 flex items-center justify-center gap-3">
          <motion.a
            href="#/components"
            :while-press="{ scale: 0.97 }"
            :transition="motionTransitions.springSnappy"
            class="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-shadow hover:shadow-lg"
          >
            {{ t.home.browse }} <ArrowRightIcon :size="15" />
          </motion.a>
          <a
            href="https://github.com/Surajmaurya1/easyui"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
          >
            <GithubIcon :size="15" /> GitHub
          </a>
        </div>

        <div class="mt-8 flex items-center justify-center gap-6 text-xs text-muted">
          <span class="inline-flex items-center gap-1.5">
            <StarIcon :size="13" /> {{ t.home.starsUpstream }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <ZapIcon :size="13" /> Vue 3 · Tailwind 4 · Motion for Vue
          </span>
        </div>
      </motion.div>
    </section>

    <section class="pb-16">
      <div class="mb-5 flex items-end justify-between">
        <div>
          <h2 class="text-lg font-semibold tracking-tight">{{ t.home.featured }}</h2>
          <p class="text-sm text-muted">{{ t.home.featuredNote }}</p>
        </div>
        <a href="#/components" class="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">{{ t.home.viewAll }}</a>
      </div>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ComponentPreview
          v-for="c in featured"
          :key="c.slug"
          :slug="c.slug"
          :title="c.title"
          :created-at="c.createdAt"
        />
      </div>
    </section>
  </main>
</template>
