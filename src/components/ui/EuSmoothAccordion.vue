<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  items: { title: string; content: string }[];
  multiple?: boolean;
  class?: string;
}>();

const open = ref<Set<number>>(new Set([0]));

function toggle(i: number) {
  const prev = open.value;
  const next = new Set(props.multiple ? prev : []);
  if (prev.has(i)) next.delete(i);
  else next.add(i);
  open.value = next;
}
</script>

<template>
  <div :class="cn('divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface', props.class)">
    <div v-for="(item, i) in props.items" :key="i">
      <button
        :aria-expanded="open.has(i)"
        class="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors hover:bg-card"
        @click="toggle(i)"
      >
        {{ item.title }}
        <motion.span
          :animate="{ rotate: open.has(i) ? 180 : 0 }"
          :transition="motionTransitions.springSnappy"
          class="shrink-0 text-muted"
        >
          <ChevronDownIcon :size="15" />
        </motion.span>
      </button>
      <AnimatePresence :initial="false">
        <motion.div
          v-if="open.has(i)"
          :key="i"
          :initial="{ height: 0, opacity: 0 }"
          :animate="{ height: 'auto', opacity: 1 }"
          :exit="{ height: 0, opacity: 0 }"
          :transition="motionTransitions.springGentle"
          class="overflow-hidden"
        >
          <div class="px-4 pb-4 text-sm text-muted">{{ item.content }}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</template>
