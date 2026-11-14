<script setup lang="ts">
import { computed } from 'vue';
import { provideTheme } from './theme/useTheme';
import { useHashRoute } from './composables/useHashRoute';
import SiteChrome from './site/SiteChrome.vue';
import HomePage from './site/HomePage.vue';
import ComponentsPage from './site/ComponentsPage.vue';
import DetailPage from './site/DetailPage.vue';
import LlmsPage from './site/LlmsPage.vue';

provideTheme();
const { route } = useHashRoute();

const view = computed(() => {
  if (route.value.startsWith('/component/')) {
    return { name: 'detail' as const, slug: route.value.slice('/component/'.length) };
  }
  if (route.value.startsWith('/components')) return { name: 'components' as const, slug: '' };
  if (route.value.startsWith('/llms')) return { name: 'llms' as const, slug: '' };
  return { name: 'home' as const, slug: '' };
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteChrome />
    <div class="flex-1">
      <DetailPage v-if="view.name === 'detail'" :slug="view.slug" />
      <ComponentsPage v-else-if="view.name === 'components'" />
      <LlmsPage v-else-if="view.name === 'llms'" />
      <HomePage v-else />
    </div>
    <footer class="border-t border-line/60 py-10 text-center text-sm text-muted">
      <p class="font-medium text-fg">Open-source, thoughtful components for modern React interfaces</p>
      <p class="mt-2">
        Vue 3 port of
        <a class="underline decoration-line underline-offset-4 hover:text-fg" href="https://easyui.site" target="_blank" rel="noreferrer">easyui.site</a>
        ·
        <a class="underline decoration-line underline-offset-4 hover:text-fg" href="https://github.com/Surajmaurya1/easyui" target="_blank" rel="noreferrer">upstream repository</a>
        · MIT
      </p>
    </footer>
  </div>
</template>

