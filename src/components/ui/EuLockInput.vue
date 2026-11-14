<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { EyeIcon, EyeOffIcon, LockIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
    value?: string;
    class?: string;
  }>(),
  { label: 'Password', placeholder: '••••••••', type: 'password' },
);

const emit = defineEmits<{
  'update:value': [value: string];
  change: [value: string];
}>();

const focused = ref(false);
const show = ref(false);
const inner = ref('');
const isControlled = computed(() => props.value !== undefined);
const current = computed(() => (props.value === undefined ? inner.value : props.value));
const actualType = computed(() => (props.type === 'password' && show.value ? 'text' : props.type));

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value;
  if (!isControlled.value) inner.value = v;
  emit('update:value', v);
  emit('change', v);
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <label class="mb-1.5 block text-sm font-medium text-fg">{{ props.label }}</label>
    <div
      :class="cn(
        'relative flex items-center rounded-xl border bg-surface transition-colors',
        focused ? 'border-fg' : 'border-line hover:border-fg/40',
      )"
    >
      <motion.span
        v-if="focused"
        aria-hidden="true"
        :initial="{ scale: 0.6, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :transition="motionTransitions.springSnappy"
        class="pointer-events-none absolute -inset-[3px] rounded-[14px] border-2 border-fg/25"
      />
      <LockIcon :size="15" class="ml-3.5 shrink-0 text-muted" />
      <input
        :type="actualType"
        :value="current"
        :placeholder="props.placeholder"
        class="w-full bg-transparent px-3 py-2.5 text-sm text-fg outline-none placeholder:text-muted/70"
        @focus="focused = true"
        @blur="focused = false"
        @input="onInput"
      />
      <button
        v-if="props.type === 'password'"
        type="button"
        :aria-label="show ? 'Hide password' : 'Show password'"
        class="mr-2.5 rounded-lg p-1.5 text-muted transition-colors hover:bg-card hover:text-fg"
        @click="show = !show"
      >
        <EyeOffIcon v-if="show" :size="15" />
        <EyeIcon v-else :size="15" />
      </button>
    </div>
  </div>
</template>
