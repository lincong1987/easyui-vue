<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

const props = withDefaults(
  defineProps<{
    tone?: AlertTone;
    title: string;
    actionLabel?: string;
    class?: string;
  }>(),
  { tone: 'info' },
);

const TONES: Record<AlertTone, { icon: typeof InfoIcon; cls: string }> = {
  info: { icon: InfoIcon, cls: 'border-sky-500/30 bg-sky-500/[0.07] text-sky-700 dark:text-sky-300' },
  success: { icon: CircleCheckIcon, cls: 'border-emerald-500/30 bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300' },
  warning: { icon: CircleAlertIcon, cls: 'border-amber-500/30 bg-amber-500/[0.07] text-amber-700 dark:text-amber-300' },
  danger: { icon: CircleAlertIcon, cls: 'border-red-500/30 bg-red-500/[0.07] text-red-700 dark:text-red-300' },
};

const open = ref(true);
const tone = computed(() => TONES[props.tone]);
</script>

<template>
  <AnimatePresence :initial="false">
    <motion.div
      v-if="open"
      key="alert"
      role="alert"
      :initial="{ opacity: 0, height: 0, marginBottom: 0 }"
      :animate="{ opacity: 1, height: 'auto', marginBottom: 12 }"
      :exit="{ opacity: 0, height: 0, marginBottom: 0 }"
      :transition="motionTransitions.springGentle"
      :class="cn('overflow-hidden', props.class)"
    >
      <div :class="cn('flex items-start gap-3 rounded-2xl border p-3.5', tone.cls)">
        <component :is="tone.icon" :size="17" class="mt-0.5 shrink-0" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ props.title }}</p>
          <div v-if="$slots.default" class="mt-0.5 text-sm opacity-80">
            <slot />
          </div>
        </div>
        <button
          v-if="props.actionLabel"
          class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          @click="open = false"
        >
          {{ props.actionLabel }}
        </button>
        <button
          aria-label="Dismiss"
          class="shrink-0 rounded-full p-1 opacity-60 transition-opacity hover:opacity-100"
          @click="open = false"
        >
          <XIcon :size="14" />
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</template>
