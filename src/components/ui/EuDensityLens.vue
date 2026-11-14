<script setup lang="ts">
import { computed, ref } from 'vue';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const COLS = 24;
const ROWS = 10;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => i);
const GRID_STYLE = { gridTemplateColumns: `repeat(${COLS}, 1fr)` };

const lens = ref<{ x: number; y: number } | null>(null);
const fieldWidth = ref(400);

function onMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  fieldWidth.value = el.clientWidth - 32;
  lens.value = { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function cell(i: number) {
  const r = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return r > 0.72 ? 'bg-fg' : r > 0.45 ? 'bg-fg/40' : 'bg-fg/10';
}

const lensInner = computed(() => {
  const l = lens.value;
  if (!l) return GRID_STYLE;
  return {
    ...GRID_STYLE,
    width: `${fieldWidth.value}px`,
    left: `${32 - l.x * 2.6}px`,
    top: `${32 - l.y * 2.6}px`,
    transform: 'scale(2.6)',
    transformOrigin: '0 0',
  };
});
</script>

<template>
  <div
    :class="
      cn(
        'relative w-full cursor-none select-none overflow-hidden rounded-2xl border border-line bg-surface p-4',
        props.class,
      )
    "
    @pointermove="onMove"
    @pointerleave="lens = null"
  >
    <div class="grid gap-[5px]" :style="GRID_STYLE" aria-hidden>
      <span v-for="i in CELLS" :key="i" :class="cn('h-[9px] rounded-[2px]', cell(i))" />
    </div>

    <div
      v-if="lens"
      class="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-fg/70 bg-bg shadow-[0_0_0_4px_rgba(0,0,0,0.06),0_18px_40px_rgba(0,0,0,0.25)]"
      :style="{ left: `${lens.x}px`, top: `${lens.y}px` }"
    >
      <div class="absolute grid gap-[5px]" :style="lensInner">
        <span v-for="i in CELLS" :key="i" :class="cn('h-[9px] rounded-[2px]', cell(i))" />
      </div>
    </div>
    <p class="mt-3 text-center text-[10px] text-muted">
      {{ lens ? 'lens locked — 2.6× magnification' : 'move the pointer over the field' }}
    </p>
  </div>
</template>
