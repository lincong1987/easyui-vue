<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion-v';
import type { PanInfo } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { BellIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

interface Note {
  id: number;
  title: string;
  body: string;
  icon: string;
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    notes: Note[];
    freshPing: string;
    arrivedAt: string;
    swipe: string;
    inboxZero: string;
    receive: string;
  }
> = {
  en: {
    notes: [
      { id: 1, title: 'Deploy finished', body: 'main → production in 42s', icon: '🚀' },
      { id: 2, title: 'New mention', body: 'kai tagged you in #design', icon: '💬' },
      { id: 3, title: 'Star milestone', body: '290 stars on the repo', icon: '⭐' },
    ],
    freshPing: 'Fresh ping',
    arrivedAt: 'arrived at {time}',
    swipe: 'swipe →',
    inboxZero: 'inbox zero',
    receive: 'receive notification',
  },
  'zh-CN': {
    notes: [
      { id: 1, title: '部署完成', body: 'main → production，用时 42 秒', icon: '🚀' },
      { id: 2, title: '新的提及', body: 'kai 在 #design 中提到了你', icon: '💬' },
      { id: 3, title: 'Star 里程碑', body: '仓库 Star 数达到 290', icon: '⭐' },
    ],
    freshPing: '新提醒',
    arrivedAt: '{time} 送达',
    swipe: '滑动 →',
    inboxZero: '收件箱已清空',
    receive: '接收通知',
  },
};

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);

const notes = ref<Note[]>(DATA[locale.value].notes.map((n) => ({ ...n })));

watch(locale, () => {
  notes.value = notes.value.map((n) => {
    const seed = DATA[locale.value].notes.find((s) => s.id === n.id);
    return seed ? { ...seed } : n;
  });
});

const x = useMotionValue(0);
const sx = useSpring(x, motionTransitions.springSnappy);

function dismiss(id: number) {
  notes.value = notes.value.filter((p) => p.id !== id);
}

function receive() {
  const id = Date.now();
  const time = new Date().toLocaleTimeString('en-GB');
  notes.value = [
    { id, title: ui.value.freshPing, body: ui.value.arrivedAt.replace('{time}', time), icon: '🔔' },
    ...notes.value,
  ].slice(0, 3);
}

const cards = computed(() =>
  notes.value.map((note, i) => {
    const depth = notes.value.length - 1 - i;
    return {
      note,
      depth,
      zIndex: notes.value.length - depth,
      onDragEnd: (_event: PointerEvent, info: PanInfo) => {
        if (depth === 0 && Math.abs(info.offset.x) > 80) dismiss(note.id);
      },
    };
  }),
);
</script>

<template>
  <div :class="cn('flex w-full max-w-sm flex-col items-center gap-4', props.class)">
    <div class="relative h-44 w-full">
      <AnimatePresence :initial="false">
        <motion.div
          v-for="card in cards"
          :key="card.note.id"
          :layout="true"
          :initial="{ y: -30, opacity: 0, scale: 0.9 }"
          :animate="{ y: card.depth * -12, scale: 1 - card.depth * 0.05, opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -160, scale: 0.9 }"
          :transition="motionTransitions.springMorph"
          drag="x"
          :drag-constraints="{ left: 0, right: 0 }"
          :drag-elastic="0.9"
          :style="{ x: card.depth === 0 ? sx : 0, zIndex: card.zIndex }"
          class="absolute inset-x-4 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-xl"
          @drag-end="card.onDragEnd"
        >
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card text-base">{{ card.note.icon }}</span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-fg">{{ card.note.title }}</p>
            <p class="truncate text-xs text-muted">{{ card.note.body }}</p>
          </div>
          <span v-if="card.depth === 0" class="shrink-0 text-[10px] text-muted">{{ ui.swipe }}</span>
        </motion.div>
      </AnimatePresence>
      <div
        v-if="notes.length === 0"
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-sm text-muted"
      >
        <BellIcon :size="18" />
        {{ ui.inboxZero }}
      </div>
    </div>
    <button
      class="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-transform active:scale-95"
      @click="receive"
    >
      {{ ui.receive }}
    </button>
  </div>
</template>
