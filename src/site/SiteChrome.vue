<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../lib/motion-tokens';
import { useTheme } from '../theme/useTheme';
import { GithubIcon, MoonIcon, SearchIcon, SnailIcon, SunIcon, XIcon } from '../lib/icons';
import { cn } from '../lib/utils';

defineProps<{ class?: string }>();

const showBanner = ref(true);

const NAV_LINKS = [
  { label: 'Home', href: '#/' },
  { label: 'Components', href: '#/components' },
  { label: 'LLMs', href: '#/llms' },
];

const { theme, toggle } = useTheme();
const active = ref('/');

function readHash() {
  active.value = window.location.hash.replace('#', '') || '/';
}

onMounted(() => {
  readHash();
  window.addEventListener('hashchange', readHash);
});

function goSearch() {
  window.location.hash = '#/components';
}
</script>

<template>
  <div v-if="showBanner" class="relative z-40 bg-black px-10 py-2 text-center text-xs font-medium text-white dark:bg-zinc-900">
    EasyUI Vue port — a from-scratch Vue 3 replica of easyui.site · research notes ship with the task directory
    <button
      aria-label="Dismiss banner"
      class="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 transition-colors hover:text-white"
      @click="showBanner = false"
    >
      <XIcon :size="13" />
    </button>
  </div>

  <header class="sticky top-0 z-30 border-b border-line/60 bg-bg/80 backdrop-blur-xl">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
      <a href="#/" class="flex items-center gap-2 font-semibold tracking-tight">
        <SnailIcon :size="22" />
        <span>easyui <span class="text-muted">vue</span></span>
      </a>

      <div class="flex items-center gap-1">
        <a
          v-for="l in NAV_LINKS"
          :key="l.href"
          :href="l.href"
          :class="cn(
            'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
            (l.href.slice(1) === '/' ? active === '/' : active.startsWith(l.href.slice(1))) ? 'text-fg' : 'text-muted hover:text-fg',
          )"
        >
          <motion.span
            v-if="(l.href.slice(1) === '/' ? active === '/' : active.startsWith(l.href.slice(1)))"
            layout-id="site-nav-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-full bg-fg/[0.06] dark:bg-white/10"
          />
          <span class="relative z-10">{{ l.label }}</span>
        </a>
      </div>

      <div class="flex items-center gap-1">
        <button
          aria-label="Browse components"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg"
          @click="goSearch"
        >
          <SearchIcon :size="16" />
        </button>
        <a
          href="https://github.com/Surajmaurya1/easyui"
          target="_blank"
          rel="noreferrer"
          aria-label="Upstream GitHub repository"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg"
        >
          <GithubIcon :size="16" />
        </a>
        <button
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg"
          @click="toggle"
        >
          <SunIcon v-if="theme === 'dark'" :size="16" />
          <MoonIcon v-else :size="16" />
        </button>
      </div>
    </nav>
  </header>
</template>

