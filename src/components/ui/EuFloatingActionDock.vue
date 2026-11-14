<script setup lang="ts">
import { ref } from 'vue';
import { BellIcon, HeartIcon, PlusIcon, SearchIcon, SendIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ACTIONS = [
  { icon: PlusIcon, label: 'Create' },
  { icon: SearchIcon, label: 'Search' },
  { icon: BellIcon, label: 'Alerts' },
  { icon: HeartIcon, label: 'Likes' },
  { icon: SendIcon, label: 'Send' },
];

const dockEl = ref<HTMLDivElement | null>(null);
const scales = ref<number[]>(ACTIONS.map(() => 1));
const hover = ref<number | null>(null);

function onMove(e: PointerEvent) {
  const rect = dockEl.value?.getBoundingClientRect();
  if (!rect) return;
  const itemW = rect.width / ACTIONS.length;
  scales.value = Array.from({ length: ACTIONS.length }, (_, i) => {
    const d = Math.abs(e.clientX - rect.left - (i + 0.5) * itemW);
    return 1 + Math.max(0, 0.55 - d / 90);
  });
}

function reset() {
  scales.value = ACTIONS.map(() => 1);
  hover.value = null;
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <div
      ref="dockEl"
      class="flex items-end gap-2 rounded-3xl border border-line bg-surface/90 px-3 py-2.5 shadow-xl backdrop-blur"
      @pointermove="onMove"
      @pointerleave="reset"
    >
      <div v-for="(a, i) in ACTIONS" :key="a.label" class="relative flex flex-col items-center">
        <span
          v-if="hover === i"
          class="absolute -top-8 whitespace-nowrap rounded-lg bg-fg px-2 py-1 text-[10px] font-medium text-bg shadow"
        >{{ a.label }}</span>
        <button
          :aria-label="a.label"
          :style="{ transform: `scale(${scales[i]})`, transformOrigin: 'bottom center' }"
          class="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-card text-fg shadow-sm transition-[background-color] hover:bg-line"
          @pointerenter="hover = i"
          @pointerleave="hover = null"
        >
          <component :is="a.icon" :size="17" />
        </button>
      </div>
    </div>
    <p class="text-xs text-muted">proximity magnification, just like the macOS dock</p>
  </div>
</template>
