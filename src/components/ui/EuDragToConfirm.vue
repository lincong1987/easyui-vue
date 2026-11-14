<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion, useMotionValue, useSpring, type PanInfo } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';
import { useLocale } from '../../i18n/useLocale';

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', {
  drag: string;
  deleted: string;
  undo: string;
}> = {
  en: {
    drag: 'Drag to delete account →',
    deleted: 'Account deleted — unrecoverable',
    undo: 'undo (demo reset)',
  },
  'zh-CN': {
    drag: '拖动以删除账号 →',
    deleted: '账号已删除 —— 无法恢复',
    undo: '撤销（演示重置）',
  },
};

const copy = computed(() => DATA[locale.value]);

const TRAVEL = 148;

const x = useMotionValue(0);
const sx = useSpring(x, motionTransitions.springSnappy);
const done = ref(false);

function onDragEnd(_event: PointerEvent, info: PanInfo) {
  if (info.offset.x >= TRAVEL - 6) {
    done.value = true;
  } else {
    x.set(0);
  }
}

function undo() {
  done.value = false;
  x.set(0);
}
</script>

<template>
  <div :class="cn('w-full max-w-sm space-y-3', props.class)">
    <div
      :class="
        cn(
          'relative h-14 overflow-hidden rounded-2xl border transition-colors',
          done ? 'border-red-600 bg-red-600' : 'border-line bg-card',
        )
      "
    >
      <motion.div
        :drag="done ? false : 'x'"
        :drag-constraints="{ left: 0, right: TRAVEL }"
        :drag-elastic="0.04"
        :drag-momentum="false"
        :style="{ x: sx }"
        :on-drag-end="onDragEnd"
        class="absolute left-1 top-1 flex h-12 w-16 cursor-grab items-center justify-center rounded-xl bg-surface text-lg text-muted shadow-md active:cursor-grabbing"
      >{{ done ? '✓' : '»' }}</motion.div>
      <p
        :class="
          cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium',
            done ? 'text-white' : 'text-muted',
          )
        "
      >{{ done ? copy.deleted : copy.drag }}</p>
    </div>
    <button
      v-if="done"
      class="mx-auto block rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-fg"
      @click="undo"
    >{{ copy.undo }}</button>
  </div>
</template>
