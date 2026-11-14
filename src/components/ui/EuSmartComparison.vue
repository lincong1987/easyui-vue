<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const FEATURES = [
  { name: 'Animated previews', free: true, pro: true, ent: true, group: 'Core' },
  { name: 'TypeScript source', free: true, pro: true, ent: true, group: 'Core' },
  { name: 'Registry sync', free: false, pro: true, ent: true, group: 'Tooling' },
  { name: 'Design reviews', free: false, pro: true, ent: true, group: 'Tooling' },
  { name: 'SSO / SAML', free: false, pro: false, ent: true, group: 'Security' },
  { name: 'Audit log export', free: false, pro: false, ent: true, group: 'Security' },
];

const onlyDiff = ref(true);
const query = ref('');
const collapsed = ref<Set<string>>(new Set());

const rows = computed(() => {
  let list = FEATURES;
  if (onlyDiff.value) list = list.filter((f) => !(f.free === f.pro && f.pro === f.ent));
  const q = query.value.trim().toLowerCase();
  if (q) list = list.filter((f) => f.name.toLowerCase().includes(q) || f.group.toLowerCase().includes(q));
  return list;
});

const groups = computed(() => [...new Set(rows.value.map((r) => r.group))]);

function toggleGroup(g: string) {
  const next = new Set(collapsed.value);
  if (next.has(g)) next.delete(g);
  else next.add(g);
  collapsed.value = next;
}
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <button
        :class="cn(
          'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          onlyDiff ? 'bg-fg text-bg' : 'border border-line text-muted hover:text-fg',
        )"
        @click="onlyDiff = !onlyDiff"
      >
        differences only
      </button>
      <input
        v-model="query"
        placeholder="Filter features…"
        aria-label="Filter features"
        class="min-w-0 flex-1 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs outline-none focus:border-fg"
      />
    </div>

    <div class="overflow-hidden rounded-2xl border border-line bg-surface">
      <div class="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
        <span>Feature</span>
        <span class="text-center">Free</span>
        <span class="text-center">Pro</span>
        <span class="text-center">Ent</span>
      </div>
      <div v-for="g in groups" :key="g">
        <button
          class="flex w-full items-center justify-between bg-card/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted"
          @click="toggleGroup(g)"
        >
          {{ g }}
          <span>{{ collapsed.has(g) ? '+' : '−' }}</span>
        </button>
        <AnimatePresence :initial="false">
          <motion.div
            v-if="!collapsed.has(g)"
            :key="g"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="motionTransitions.springGentle"
            class="overflow-hidden"
          >
            <motion.div
              v-for="r in rows.filter((row) => row.group === g)"
              :key="r.name"
              layout
              :transition="motionTransitions.springSmooth"
              class="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center border-t border-line/60 px-3 py-2 text-xs"
            >
              <span class="text-fg">{{ r.name }}</span>
              <span class="flex justify-center">
                <span
                  :class="cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                    r.free ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-line/70 text-muted',
                  )"
                >
                  <CheckIcon v-if="r.free" :size="11" />
                  <XIcon v-else :size="10" />
                </span>
              </span>
              <span class="flex justify-center">
                <span
                  :class="cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                    r.pro ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-line/70 text-muted',
                  )"
                >
                  <CheckIcon v-if="r.pro" :size="11" />
                  <XIcon v-else :size="10" />
                </span>
              </span>
              <span class="flex justify-center">
                <span
                  :class="cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                    r.ent ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-line/70 text-muted',
                  )"
                >
                  <CheckIcon v-if="r.ent" :size="11" />
                  <XIcon v-else :size="10" />
                </span>
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p v-if="rows.length === 0" class="px-3 py-6 text-center text-xs text-muted">No features match.</p>
    </div>
  </div>
</template>
