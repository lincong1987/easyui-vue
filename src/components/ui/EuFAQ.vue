<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const QA = [
  { q: 'Is this a fork of EasyUI?', a: 'No — it is a from-scratch port of the documented behavior, with original code.', cat: 'General' },
  { q: 'Which React versions work?', a: 'React 18 and 19 are supported; the demo runs on React 19.', cat: 'General' },
  { q: 'How do I install a component?', a: 'Copy the source file into your project, or use the shadcn registry in the upstream repo.', cat: 'Usage' },
  { q: 'Can I use it commercially?', a: 'Yes — MIT licensed, copy-paste ownership included.', cat: 'Usage' },
];

const props = defineProps<{ class?: string }>();

const open = ref(0);
const query = ref('');
const cat = ref('All');
const cats = ['All', ...new Set(QA.map((x) => x.cat))];

const list = computed(() => {
  const q = query.value.trim().toLowerCase();
  return QA.filter((x) => (cat.value === 'All' || x.cat === cat.value) && (!q || `${x.q} ${x.a}`.toLowerCase().includes(q)));
});
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="mb-3 flex flex-wrap gap-1.5">
      <button
        v-for="c in cats"
        :key="c"
        :class="cn(
          'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
          cat === c ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="cat = c"
      >
        {{ c }}
      </button>
      <input
        v-model="query"
        placeholder="Search…"
        aria-label="Search FAQ"
        class="min-w-0 flex-1 rounded-full border border-line bg-surface px-3 text-xs outline-none focus:border-fg"
      />
    </div>

    <div class="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      <div v-for="(item, i) in list" :key="item.q">
        <button
          :aria-expanded="open === i"
          class="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-card"
          @click="open = open === i ? -1 : i"
        >
          {{ item.q }}
          <motion.span :animate="{ rotate: open === i ? 180 : 0 }" :transition="motionTransitions.springSnappy" class="text-muted">
            <ChevronDownIcon :size="14" />
          </motion.span>
        </button>
        <AnimatePresence :initial="false">
          <motion.div
            v-if="open === i"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="motionTransitions.springGentle"
            class="overflow-hidden"
          >
            <p class="px-4 pb-3 text-sm text-muted">{{ item.a }}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p v-if="list.length === 0" class="px-4 py-6 text-center text-sm text-muted">No answers match.</p>
    </div>
  </div>
</template>
