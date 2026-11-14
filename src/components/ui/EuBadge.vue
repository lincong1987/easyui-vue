<script setup lang="ts">
import { getCurrentInstance, ref, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = withDefaults(
  defineProps<{
    label?: string;
    /** Numeric value that rolls on change. */
    count?: number;
    /** Renders the live status pulse dot. */
    pulse?: boolean;
    tone?: 'neutral' | 'accent';
    class?: string;
  }>(),
  { label: 'Status', pulse: true, tone: 'neutral' },
);

defineEmits<{ remove: [] }>();

const instance = getCurrentInstance();
// Declared emit listeners are stripped from attrs, so read the vnode props to
// know whether a remove handler was supplied — the chip only shows its ✕ then.
const removable = typeof instance?.vnode.props?.onRemove === 'function';

const prev = ref<number | undefined>(props.count);
const direction = ref(1);

watch(
  () => props.count,
  (count) => {
    if (count !== undefined && prev.value !== undefined && prev.value !== count) {
      direction.value = count > prev.value ? 1 : -1;
    }
    if (count !== undefined) prev.value = count;
  },
  { flush: 'post' },
);
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        props.tone === 'accent' ? 'border-accent/30 bg-accent/10 text-accent' : 'border-line bg-card text-fg',
        props.class,
      )
    "
  >
    <span v-if="props.pulse" class="relative flex h-2 w-2">
      <span
        class="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
        style="animation: eu-pulse-dot 1.8s cubic-bezier(0.4,0,0.6,1) infinite"
      />
      <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
    <AnimatePresence mode="popLayout" :initial="false">
      <motion.span
        :key="props.count ?? props.label"
        :initial="{ y: 10 * direction, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :exit="{ y: -10 * direction, opacity: 0 }"
        :transition="motionTransitions.springSnappy"
        class="tabular-nums"
      >
        {{ props.count !== undefined ? `${props.label} · ${props.count}` : props.label }}
      </motion.span>
    </AnimatePresence>
    <button
      v-if="removable"
      aria-label="Remove"
      class="rounded-full p-0.5 opacity-50 transition-opacity hover:opacity-100"
      @click="$emit('remove')"
    >
      <XIcon :size="11" />
    </button>
  </span>
</template>
