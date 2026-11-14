<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { ChevronDownIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const { locale } = useLocale();

const DATA: Record<
  'en' | 'zh-CN',
  {
    save: string;
    saveApplied: string;
    moreActions: string;
    hint: string;
    actions: string[];
  }
> = {
  en: {
    save: 'Save changes',
    saveApplied: 'Save applied',
    moreActions: 'More save actions',
    hint: 'chevron shares the pill with the primary action',
    actions: ['Duplicate', 'Rename', 'Archive'],
  },
  'zh-CN': {
    save: '保存更改',
    saveApplied: '已保存',
    moreActions: '更多保存操作',
    hint: '下拉箭头与主操作共用同一颗胶囊按钮',
    actions: ['复制', '重命名', '归档'],
  },
};

const d = computed(() => DATA[locale.value]);

const open = ref(false);
const last = ref<number | 'save' | null>(null);

const hint = computed(() => {
  if (last.value === null) return d.value.hint;
  if (last.value === 'save') return d.value.saveApplied;
  return d.value.actions[last.value] ?? d.value.hint;
});

function choose(index: number) {
  last.value = index;
  open.value = false;
}
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-3', props.class)">
    <div class="relative">
      <div class="flex overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
        <button
          class="px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-card"
          @click="last = 'save'"
        >{{ d.save }}</button>
        <span class="w-px bg-line" />
        <button
          :aria-expanded="open"
          :aria-label="d.moreActions"
          :class="
            cn(
              'px-2.5 py-2.5 text-muted transition-colors hover:bg-card hover:text-fg',
              open && 'bg-card text-fg',
            )
          "
          @click="open = !open"
        >
          <motion.span :animate="{ rotate: open ? 180 : 0 }" :transition="motionTransitions.springSnappy">
            <ChevronDownIcon :size="14" />
          </motion.span>
        </button>
      </div>
      <AnimatePresence>
        <motion.ul
          v-if="open"
          key="actions"
          :initial="{ opacity: 0, y: -6, scale: 0.97 }"
          :animate="{ opacity: 1, y: 6, scale: 1 }"
          :exit="{ opacity: 0, y: -6, scale: 0.97 }"
          :transition="motionTransitions.springSnappy"
          role="menu"
          class="absolute inset-x-0 top-full z-30 rounded-xl border border-line bg-surface p-1 shadow-xl"
        >
          <li v-for="(a, i) in d.actions" :key="i" role="none">
            <button
              role="menuitem"
              class="w-full rounded-lg px-3 py-2 text-left text-xs text-fg transition-colors hover:bg-card"
              @click="choose(i)"
            >{{ a }}</button>
          </li>
        </motion.ul>
      </AnimatePresence>
    </div>
    <p class="text-xs text-muted">{{ hint }}</p>
  </div>
</template>
