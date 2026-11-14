<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { motion } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    class?: string;
  }>(),
  { label: 'Drawn checkmark', defaultChecked: false },
);

const emit = defineEmits<{
  'update:checked': [value: boolean];
  change: [value: boolean];
}>();

// Vue casts an absent Boolean prop to `false`, so `props.checked` cannot tell
// "not passed" apart from "passed as false". The raw attrs can.
const attrs = useAttrs();
const inner = ref(props.defaultChecked);
const isControlled = computed(() => attrs.checked !== undefined);
const value = computed(() => (isControlled.value ? (attrs.checked as boolean) : inner.value));

function toggle() {
  const next = !value.value;
  if (!isControlled.value) inner.value = next;
  emit('update:checked', next);
  emit('change', next);
}
</script>

<template>
  <!-- div root: a label wrapper would forward the bubbled click back to the
       control and double-toggle it -->
  <div
    :class="cn('inline-flex cursor-pointer select-none items-center gap-3 text-sm', props.class)"
    @click="toggle"
  >
    <button
      type="button"
      role="checkbox"
      :aria-checked="value"
      :aria-label="props.label"
      tabindex="-1"
      :class="cn(
        'flex h-6 w-6 items-center justify-center rounded-[7px] border-2 transition-colors',
        value ? 'border-fg bg-fg' : 'border-line bg-surface hover:border-fg/40',
      )"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <motion.path
          d="m5 12.5 4.5 4.5L19 7"
          stroke="var(--color-bg)"
          stroke-width="3.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :initial="false"
          :animate="{ pathLength: value ? 1 : 0, opacity: value ? 1 : 0 }"
          :transition="{ duration: 0.28, ease: 'easeOut' }"
        />
      </svg>
    </button>
    <span class="text-fg">{{ props.label }}</span>
  </div>
</template>
