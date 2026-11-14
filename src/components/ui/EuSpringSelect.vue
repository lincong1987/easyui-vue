<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
const { locale } = useLocale();

type Frequency = 'weekly' | 'monthly' | 'quarterly' | 'never';

interface Option {
  value: Frequency;
  label: string;
}

const DATA: Record<'en' | 'zh-CN', { options: Option[] }> = {
  en: {
    options: [
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'never', label: 'Never' },
    ],
  },
  'zh-CN': {
    options: [
      { value: 'weekly', label: '每周' },
      { value: 'monthly', label: '每月' },
      { value: 'quarterly', label: '每季度' },
      { value: 'never', label: '从不' },
    ],
  },
};

const data = computed(() => DATA[locale.value]);

const open = ref(false);
const value = ref<Frequency>('monthly');

const current = computed(() => data.value.options.find((o) => o.value === value.value)?.label ?? '');

function select(item: Frequency) {
  value.value = item;
  open.value = false;
}
</script>

<template>
  <div :class="cn('relative w-full max-w-xs', props.class)">
    <button
      aria-haspopup="listbox"
      :aria-expanded="open"
      class="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 text-sm shadow-sm transition-colors hover:border-fg/40"
      @click="open = !open"
    >
      {{ current }}
      <motion.span :animate="{ rotate: open ? 200 : 0 }" :transition="motionTransitions.springSnappy" class="text-muted">
        <ChevronDownIcon :size="15" />
      </motion.span>
    </button>

    <AnimatePresence>
      <motion.ul
        v-if="open"
        key="spring-select-list"
        role="listbox"
        :initial="{ opacity: 0, y: -8, scale: 0.96 }"
        :animate="{ opacity: 1, y: 6, scale: 1 }"
        :exit="{ opacity: 0, y: -8, scale: 0.96 }"
        :transition="motionTransitions.springSnappy"
        class="absolute inset-x-0 top-full z-30 rounded-2xl border border-line bg-surface p-1.5 shadow-xl"
      >
        <li v-for="it in data.options" :key="it.value" role="option" :aria-selected="it.value === value">
          <button
            :class="cn(
              'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-card',
              it.value === value ? 'font-medium text-fg' : 'text-muted',
            )"
            @click="select(it.value)"
          >
            {{ it.label }}
            <CheckIcon v-if="it.value === value" :size="14" />
          </button>
        </li>
      </motion.ul>
    </AnimatePresence>
  </div>
</template>
