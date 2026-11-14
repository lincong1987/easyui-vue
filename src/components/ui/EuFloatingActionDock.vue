<script setup lang="ts">
import { computed, ref } from 'vue';
import { BellIcon, HeartIcon, PlusIcon, SearchIcon, SendIcon } from '../../lib/icons';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

type ActionKey = 'create' | 'search' | 'alerts' | 'likes' | 'send';

const DATA: Record<
  'en' | 'zh-CN',
  {
    actions: Record<ActionKey, string>;
    caption: string;
  }
> = {
  en: {
    actions: { create: 'Create', search: 'Search', alerts: 'Alerts', likes: 'Likes', send: 'Send' },
    caption: 'proximity magnification, just like the macOS dock',
  },
  'zh-CN': {
    actions: { create: '新建', search: '搜索', alerts: '提醒', likes: '喜欢', send: '发送' },
    caption: '邻近放大效果，和 macOS 程序坞一致',
  },
};

const { locale } = useLocale();
const T = computed(() => DATA[locale.value]);

const ACTIONS: { icon: typeof PlusIcon; key: ActionKey }[] = [
  { icon: PlusIcon, key: 'create' },
  { icon: SearchIcon, key: 'search' },
  { icon: BellIcon, key: 'alerts' },
  { icon: HeartIcon, key: 'likes' },
  { icon: SendIcon, key: 'send' },
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
      <div v-for="(a, i) in ACTIONS" :key="a.key" class="relative flex flex-col items-center">
        <span
          v-if="hover === i"
          class="absolute -top-8 whitespace-nowrap rounded-lg bg-fg px-2 py-1 text-[10px] font-medium text-bg shadow"
        >{{ T.actions[a.key] }}</span>
        <button
          :aria-label="T.actions[a.key]"
          :style="{ transform: `scale(${scales[i]})`, transformOrigin: 'bottom center' }"
          class="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-card text-fg shadow-sm transition-[background-color] hover:bg-line"
          @pointerenter="hover = i"
          @pointerleave="hover = null"
        >
          <component :is="a.icon" :size="17" />
        </button>
      </div>
    </div>
    <p class="text-xs text-muted">{{ T.caption }}</p>
  </div>
</template>
