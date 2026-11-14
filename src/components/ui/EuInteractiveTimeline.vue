<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { motion } from 'motion-v';
import { CheckIcon, CopyIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface TimelineNode {
  version: string;
  state: 'done' | 'active' | 'pending';
  note: string;
  hash: string;
}

const NODES: TimelineNode[] = [
  { version: 'v0.9.0', state: 'done', note: 'Initial 30 components', hash: 'a1f03c9' },
  { version: 'v1.0.0', state: 'active', note: 'Charts + gallery site', hash: 'be7712d' },
  { version: 'v1.1.0', state: 'pending', note: 'Full catalog sweep', hash: '—' },
];

const copied = ref<string | null>(null);
let timer: number | undefined;

function copy(hash: string) {
  navigator.clipboard?.writeText(hash).catch(() => {});
  copied.value = hash;
  timer = window.setTimeout(() => {
    copied.value = null;
  }, 1400);
}

onUnmounted(() => window.clearTimeout(timer));
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <div class="relative pl-6">
      <div class="absolute left-[9px] top-2 bottom-2 w-0.5 bg-line" />
      <motion.div
        class="absolute left-[9px] top-2 w-0.5 bg-fg"
        :initial="{ height: 0 }"
        :animate="{ height: '58%' }"
        :transition="{ duration: 1.1, ease: 'easeOut' }"
      />
      <div v-for="n in NODES" :key="n.version" class="relative mb-5 last:mb-0">
        <span
          :class="cn(
            'absolute -left-6 top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2',
            n.state === 'done' && 'border-emerald-500 bg-emerald-500 text-white',
            n.state === 'active' && 'border-fg bg-bg',
            n.state === 'pending' && 'border-line bg-surface',
          )"
        >
          <CheckIcon v-if="n.state === 'done'" :size="10" />
          <motion.span
            v-else-if="n.state === 'active'"
            class="h-2 w-2 rounded-full bg-fg"
            :animate="{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }"
            :transition="{ duration: 1.4, repeat: Infinity }"
          />
        </span>
        <div class="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5">
          <div>
            <p class="text-sm font-medium">
              {{ n.version }}<span v-if="n.state === 'active'" class="ml-2 text-[10px] font-normal text-muted">in progress</span>
            </p>
            <p class="text-xs text-muted">{{ n.note }}</p>
          </div>
          <button
            v-if="n.hash !== '—'"
            class="flex items-center gap-1 rounded-lg border border-line px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:text-fg"
            :aria-label="`Copy commit ${n.hash}`"
            @click="copy(n.hash)"
          >
            <CheckIcon v-if="copied === n.hash" :size="10" />
            <CopyIcon v-else :size="10" />
            {{ n.hash }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
