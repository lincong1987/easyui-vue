<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { EditIcon, PlusIcon, TrashIcon } from '../../lib/icons';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

type ActionKey = 'add' | 'edit' | 'delete';

const DATA: Record<
  'en' | 'zh-CN',
  {
    actions: Record<ActionKey, string>;
    hint: string;
    lastAction: string;
    toggle: string;
  }
> = {
  en: {
    actions: { add: 'Add', edit: 'Edit', delete: 'Delete' },
    hint: 'tap + to collapse the fan',
    lastAction: 'last action: {action}',
    toggle: 'Toggle dock',
  },
  'zh-CN': {
    actions: { add: '添加', edit: '编辑', delete: '删除' },
    hint: '点 + 收起扇形菜单',
    lastAction: '最近操作：{action}',
    toggle: '切换操作坞',
  },
};

const { locale } = useLocale();
const T = computed(() => DATA[locale.value]);

const ACTIONS: { icon: typeof PlusIcon; key: ActionKey; tint: string }[] = [
  { icon: PlusIcon, key: 'add', tint: 'bg-fg text-bg' },
  { icon: EditIcon, key: 'edit', tint: 'bg-card text-fg' },
  { icon: TrashIcon, key: 'delete', tint: 'bg-red-500/90 text-white' },
];

const open = ref(true);
const used = ref<ActionKey | null>(null);

const footer = computed(() =>
  used.value ? T.value.lastAction.replace('{action}', T.value.actions[used.value]) : T.value.hint,
);
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <div class="flex items-end gap-2">
      <AnimatePresence>
        <motion.button
          v-for="(a, i) in open ? ACTIONS.slice(1) : []"
          :key="a.key"
          :aria-label="T.actions[a.key]"
          :initial="{ y: 16, opacity: 0, scale: 0.7 }"
          :animate="{ y: 0, opacity: 1, scale: 1 }"
          :exit="{ y: 16, opacity: 0, scale: 0.7 }"
          :transition="{ ...motionTransitions.springResponsive, delay: i * 0.05 }"
          :class="cn('flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg', a.tint)"
          @click="used = a.key"
        >
          <component :is="a.icon" :size="16" />
        </motion.button>
      </AnimatePresence>
      <motion.button
        :aria-label="T.toggle"
        :while-press="{ scale: 0.9 }"
        :transition="motionTransitions.springSnappy"
        class="flex h-11 w-11 items-center justify-center rounded-2xl bg-fg text-bg shadow-lg"
        @click="open = !open"
      >
        <motion.span :animate="{ rotate: open ? 45 : 0 }" :transition="motionTransitions.springSnappy">
          <PlusIcon :size="18" />
        </motion.span>
      </motion.button>
    </div>
    <p class="text-xs text-muted">{{ footer }}</p>
  </div>
</template>
