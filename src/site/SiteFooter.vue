<script setup lang="ts">
import { useLocale } from '../i18n/useLocale';

const { t } = useLocale();
</script>

<template>
  <footer class="border-t border-line/60 py-10 text-center text-sm text-muted">
    <p class="font-medium text-fg">{{ t.footer.tagline }}</p>
    <p class="mt-2">
      {{ t.footer.builtBy }}
      ·
      <a class="underline decoration-line underline-offset-4 hover:text-fg" href="https://easyui.site" target="_blank" rel="noreferrer">{{ t.footer.portOf }}</a>
      ·
      <a class="underline decoration-line underline-offset-4 hover:text-fg" href="https://github.com/Surajmaurya1/easyui" target="_blank" rel="noreferrer">{{ t.footer.upstreamRepo }}</a>
      · MIT
    </p>
  </footer>
</template>
