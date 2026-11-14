<script setup lang="ts">
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { ArrowUpRightIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();
</script>

<template>
  <motion.div
    :while-hover="{ y: -3 }"
    :transition="motionTransitions.springSnappy"
    :class="cn('w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-zinc-950 text-white shadow-xl dark:border-white/10', props.class)"
  >
    <div class="relative h-24 bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500">
      <div
        class="absolute inset-0 opacity-40"
        :style="{ background: 'radial-gradient(120px circle at 75% 30%, rgba(255,255,255,0.5), transparent 60%)' }"
      />
    </div>
    <div class="px-5 pb-5">
      <div class="-mt-8 mb-3 flex items-end justify-between">
        <span class="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-zinc-950 bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-lg font-bold">
          EU
        </span>
        <span class="mb-1 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/70">
          Pro · verified ✓
        </span>
      </div>
      <p class="text-base font-semibold tracking-tight">easyui port</p>
      <p class="text-xs text-white/50">@easyui_port · Shanghai</p>
      <p class="mt-2.5 text-sm leading-relaxed text-white/70">
        Rebuilding a beloved motion library, one spring at a time. 66 / 134 components live.
      </p>
      <div class="mt-3 flex gap-5 text-xs">
        <span><b class="text-sm">290</b> <span class="text-white/50">stars</span></span>
        <span><b class="text-sm">20</b> <span class="text-white/50">forks</span></span>
        <span><b class="text-sm">134</b> <span class="text-white/50">components</span></span>
      </div>
      <a
        href="https://easyui.site"
        target="_blank"
        rel="noreferrer"
        class="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-xs font-semibold text-black transition-transform active:scale-[0.98]"
      >
        Visit site <ArrowUpRightIcon :size="12" />
      </a>
    </div>
  </motion.div>
</template>
