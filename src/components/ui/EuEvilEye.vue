<script setup lang="ts">
import { ref } from 'vue';
import { motion, useSpring } from 'motion-v';
import { cn } from '../../lib/utils';

const props = withDefaults(defineProps<{ size?: number; class?: string }>(), {
  size: 150,
});

const el = ref<HTMLDivElement | null>(null);
const angle = useSpring(0, { stiffness: 90, damping: 9, mass: 0.7 });

const kick = (dir: number) => angle.set(dir * 16);

function onMove(e: PointerEvent) {
  const rect = el.value?.getBoundingClientRect();
  if (!rect) return;
  kick(e.clientX < rect.left + rect.width / 2 ? -1 : 1);
}
</script>

<template>
  <div ref="el" :class="cn('flex flex-col items-center', props.class)" @pointermove="onMove">
    <div class="h-10 w-px bg-line" />
    <motion.div :style="{ rotate: angle, transformOrigin: '50% 0%' }" class="flex flex-col items-center">
      <div
        class="rounded-full shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
        :style="{
          width: `${props.size}px`,
          height: `${props.size}px`,
          background:
            'radial-gradient(circle at 50% 38%, #ffffff 0 16%, #7dd3fc 16% 30%, #0ea5e9 30% 46%, #1e3a8a 46% 72%, #0b1d5c 72% 100%)',
        }"
      >
        <div class="flex h-full w-full items-center justify-center">
          <span class="block h-[14%] w-[14%] rounded-full bg-[#0b1d5c]" />
        </div>
      </div>
      <div class="h-4 w-4 rounded-full border-2 border-line bg-surface" />
    </motion.div>
    <p class="mt-4 text-xs text-muted">swipe past it — inertia swings the amulet</p>
  </div>
</template>
