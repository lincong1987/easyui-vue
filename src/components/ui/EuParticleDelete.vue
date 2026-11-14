<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ITEMS = ['old-logo.png', 'draft-v1.md', 'unused-icons.svg'];

const items = ref<string[]>([...ITEMS]);
const dying = ref<string | null>(null);
const timeouts: number[] = [];

function remove(name: string) {
  if (dying.value) return;
  dying.value = name;
  timeouts.push(
    window.setTimeout(() => {
      items.value = items.value.filter((p) => p !== name);
      dying.value = null;
    }, 650),
  );
}

onUnmounted(() => {
  timeouts.forEach((t) => clearTimeout(t));
});
</script>

<template>
  <div :class="cn('w-full max-w-sm space-y-2', props.class)">
    <AnimatePresence :initial="false">
      <motion.div
        v-for="it in items"
        :key="it"
        :layout="true"
        :initial="{ opacity: 0, y: 8 }"
        :animate="
          dying === it
            ? { opacity: [1, 0.9, 0], scale: [1, 1.02, 0.9], filter: ['blur(0px)', 'blur(1px)', 'blur(3px)'] }
            : { opacity: 1, y: 0, scale: 1 }
        "
        :exit="{ opacity: 0, scale: 0.9 }"
        :transition="dying === it ? { duration: 0.6, times: [0, 0.55, 1] } : motionTransitions.springSnappy"
        class="flex items-center justify-between rounded-2xl border border-line bg-surface px-3.5 py-2.5"
      >
        <span class="font-mono text-xs text-fg">{{ it }}</span>
        <button
          :aria-label="`Delete ${it}`"
          class="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-red-500 transition-colors hover:bg-red-500/10"
          @click="remove(it)"
        >
          delete
        </button>
      </motion.div>
    </AnimatePresence>
    <div
      v-if="items.length === 0"
      class="rounded-2xl border border-dashed border-line py-6 text-center text-xs text-muted"
    >
      all clean — nothing left to delete
    </div>
    <p class="text-center text-[10px] text-muted">rows blur + shrink before leaving state</p>
  </div>
</template>
