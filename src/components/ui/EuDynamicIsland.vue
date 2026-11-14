<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { BellIcon, HeartIcon, SparklesIcon, ZapIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

type Mode = 'compact' | 'summary' | 'profile' | 'social';

const ORDER: Mode[] = ['compact', 'summary', 'profile', 'social'];

const SOCIAL = [
  { icon: HeartIcon, tint: 'bg-rose-500/20 text-rose-400' },
  { icon: SparklesIcon, tint: 'bg-indigo-500/20 text-indigo-300' },
  { icon: ZapIcon, tint: 'bg-amber-500/20 text-amber-300' },
];

const mode = ref<Mode>('compact');

function next() {
  mode.value = ORDER[(ORDER.indexOf(mode.value) + 1) % ORDER.length];
}

function socialTransition(i: number) {
  return { ...motionTransitions.springResponsive, delay: i * 0.05 };
}
</script>

<template>
  <div :class="cn('flex w-full flex-col items-center gap-3', props.class)">
    <motion.button
      :layout="true"
      :transition="motionTransitions.springMorph"
      :style="{ padding: (mode === 'compact' ? 10 : 14) + 'px' }"
      :aria-label="`Dynamic island, mode ${mode}`"
      class="flex cursor-pointer items-center overflow-hidden rounded-full bg-black text-white shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10"
      @click="next"
    >
      <AnimatePresence mode="wait" :initial="false">
        <motion.span
          v-if="mode === 'compact'"
          key="compact"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.8 }"
          :transition="motionTransitions.springSnappy"
          class="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"
        >
          <ZapIcon :size="14" />
        </motion.span>
        <motion.span
          v-else-if="mode === 'summary'"
          key="summary"
          :initial="{ opacity: 0, x: -12 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: 12 }"
          :transition="motionTransitions.springSnappy"
          class="flex items-center gap-3 px-1"
        >
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <ZapIcon :size="14" />
          </span>
          <span class="text-left text-xs leading-tight">
            <span class="block font-medium">3 tasks done</span>
            <span class="block text-white/50">2 pending</span>
          </span>
        </motion.span>
        <motion.span
          v-else-if="mode === 'profile'"
          key="profile"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -10 }"
          :transition="motionTransitions.springSnappy"
          class="flex items-center gap-3 px-1"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 text-xs font-bold">
            EU
          </span>
          <span class="text-left text-xs leading-tight">
            <span class="block font-medium">easyui port</span>
            <span class="block text-white/50">building in public</span>
          </span>
          <BellIcon :size="15" class="text-white/60" />
        </motion.span>
        <motion.span
          v-else
          key="social"
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.9 }"
          :transition="motionTransitions.springSnappy"
          class="flex items-center gap-2 px-1"
        >
          <motion.span
            v-for="(a, i) in SOCIAL"
            :key="i"
            :initial="{ scale: 0, y: 8 }"
            :animate="{ scale: 1, y: 0 }"
            :transition="socialTransition(i)"
            :class="cn('flex h-8 w-8 items-center justify-center rounded-full', a.tint)"
          >
            <component :is="a.icon" :size="14" />
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
    <p class="text-xs text-muted">mode: {{ mode }} — click the island to morph</p>
  </div>
</template>
