<script setup lang="ts">
import { computed, type Component } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../lib/motion-tokens';
import { DEMOS } from '../site/demos';
import { isNew } from '../lib/catalog';
import { ArrowUpRightIcon, PackageIcon } from '../lib/icons';
import { cn } from '../lib/utils';

const props = defineProps<{
  slug: string;
  title: string;
  createdAt: string;
  class?: string;
}>();

const Demo = computed<Component | null>(() => DEMOS[props.slug] ?? null);
const newBadge = computed(() => isNew(props.createdAt));
</script>

<template>
  <motion.a
    :href="`#/component/${slug}`"
    :while-hover="{ y: -3 }"
    :transition="motionTransitions.springSnappy"
    :class="cn(
      'group block overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-lg',
      props.class,
    )"
  >
    <div class="flex items-center justify-between px-5 pt-4">
      <h3 class="text-sm font-semibold tracking-tight">{{ title }}</h3>
      <div class="flex items-center gap-2">
        <span
          v-if="newBadge"
          class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
        >NEW</span>
        <span class="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRightIcon :size="15" />
        </span>
      </div>
    </div>
    <div class="mx-4 mb-4 mt-3 flex min-h-[190px] items-center justify-center overflow-hidden rounded-2xl bg-card/70 p-5 dark:bg-white/[0.03]">
      <component :is="Demo" v-if="Demo" />
      <div v-else class="flex flex-col items-center gap-1.5 text-center">
        <PackageIcon :size="18" class="text-muted/60" />
        <p class="max-w-[220px] text-xs leading-relaxed text-muted">
          Catalogued from upstream — implementation not included in this port.
        </p>
      </div>
    </div>
  </motion.a>
</template>
