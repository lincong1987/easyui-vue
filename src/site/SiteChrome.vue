<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../lib/motion-tokens';
import { useTheme } from '../theme/useTheme';
import { useLocale } from '../i18n/useLocale';
import { LOCALES } from '../i18n/locales';
import { GithubIcon, MoonIcon, SearchIcon, SnailIcon, SunIcon, XIcon } from '../lib/icons';
import { cn } from '../lib/utils';

defineProps<{ class?: string }>();

const showBanner = ref(true);

const { theme, toggle } = useTheme();
const { locale, setLocale, t } = useLocale();
const active = ref('/');
const langOpen = ref(false);

const NAV_LINKS = computed(() => [
  { label: t.value.nav.home, href: '#/' },
  { label: t.value.nav.components, href: '#/components' },
  { label: t.value.nav.llms, href: '#/llms' },
]);

const currentLocaleLabel = computed(() => LOCALES.find((l) => l.code === locale.value)?.label ?? locale.value);

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

function pickLocale(code: (typeof LOCALES)[number]['code']) {
  setLocale(code);
  langOpen.value = false;
}
</script>

<template>
  <div v-if="showBanner" class="relative z-40 bg-black px-10 py-2 text-center text-xs font-medium text-white dark:bg-zinc-900">
    {{ t.banner.text }}
    <button
      :aria-label="t.banner.dismiss"
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
          :aria-label="t.nav.browseComponents"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg"
          @click="goSearch"
        >
          <SearchIcon :size="16" />
        </button>
        <a
          href="https://github.com/Surajmaurya1/easyui"
          target="_blank"
          rel="noreferrer"
          :aria-label="t.nav.upstreamRepo"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg"
        >
          <GithubIcon :size="16" />
        </a>

        <div class="relative">
          <button
            :aria-label="t.nav.language"
            class="rounded-full px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-card hover:text-fg"
            @click="langOpen = !langOpen"
          >
            {{ currentLocaleLabel }}
          </button>
          <AnimatePresence>
            <motion.ul
              v-if="langOpen"
              :initial="{ opacity: 0, y: -6 }"
              :animate="{ opacity: 1, y: 4 }"
              :exit="{ opacity: 0, y: -6 }"
              :transition="motionTransitions.springSnappy"
              class="absolute right-0 top-full z-40 w-36 rounded-xl border border-line bg-surface p-1 shadow-xl"
            >
              <li v-for="l in LOCALES" :key="l.code">
                <button
                  :class="cn(
                    'w-full rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors',
                    l.code === locale ? 'bg-card font-medium text-fg' : 'text-muted hover:text-fg',
                  )"
                  @click="pickLocale(l.code)"
                >
                  {{ l.label }}
                </button>
              </li>
            </motion.ul>
          </AnimatePresence>
        </div>

        <button
          :aria-label="theme === 'dark' ? t.nav.switchToLight : t.nav.switchToDark"
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
