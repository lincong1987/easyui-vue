<script setup lang="ts">
import { computed } from 'vue';
import { provideTheme } from './theme/useTheme';
import { provideLocale } from './i18n/useLocale';
import { useHashRoute } from './composables/useHashRoute';
import SiteChrome from './site/SiteChrome.vue';
import SiteFooter from './site/SiteFooter.vue';
import HomePage from './site/HomePage.vue';
import ComponentsPage from './site/ComponentsPage.vue';
import DetailPage from './site/DetailPage.vue';
import LlmsPage from './site/LlmsPage.vue';

provideTheme();
provideLocale();
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
    <SiteFooter />
  </div>
</template>

