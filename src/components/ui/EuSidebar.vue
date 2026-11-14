<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { BellIcon, CreditCardIcon, PackageIcon, SearchIcon, SparklesIcon } from '../../lib/icons';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

type ItemKey = 'components' | 'motion' | 'billing' | 'alerts';

const DATA: Record<
  'en' | 'zh-CN',
  {
    menu: string;
    expand: string;
    collapse: string;
    open: string;
    close: string;
    items: Record<ItemKey, string>;
    paneActive: string;
    paneHint: string;
  }
> = {
  en: {
    menu: 'Menu',
    expand: 'Expand sidebar',
    collapse: 'Collapse sidebar',
    open: 'Open menu',
    close: 'Close menu',
    items: { components: 'Components', motion: 'Motion', billing: 'Billing', alerts: 'Alerts' },
    paneActive: 'content pane — active:',
    paneHint: '⌘B toggles collapse in the real app; here the « button does.',
  },
  'zh-CN': {
    menu: '菜单',
    expand: '展开侧栏',
    collapse: '收起侧栏',
    open: '打开菜单',
    close: '关闭菜单',
    items: { components: '组件', motion: '动效', billing: '账单', alerts: '提醒' },
    paneActive: '内容区 — 当前：',
    paneHint: '实际应用里用 ⌘B 切换折叠，这里点 « 按钮。',
  },
};

const { locale } = useLocale();
const T = computed(() => DATA[locale.value]);

const ITEMS: { icon: typeof PackageIcon; key: ItemKey }[] = [
  { icon: PackageIcon, key: 'components' },
  { icon: SparklesIcon, key: 'motion' },
  { icon: CreditCardIcon, key: 'billing' },
  { icon: BellIcon, key: 'alerts' },
];

const active = ref<ItemKey>('components');
const hover = ref<ItemKey | null>(null);
const collapsed = ref(false);
const mobileOpen = ref(false);
</script>

<template>
  <div :class="cn('flex w-full max-w-md items-stretch gap-3', props.class)">
    <aside class="hidden rounded-2xl border border-line bg-surface p-2 shadow-sm sm:block">
      <div :class="cn('mb-2 flex', collapsed ? 'justify-center' : 'items-center justify-between px-2')">
        <span v-if="!collapsed" class="text-xs font-semibold uppercase tracking-widest text-muted">{{ T.menu }}</span>
        <button
          :aria-label="collapsed ? T.expand : T.collapse"
          class="rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:bg-card hover:text-fg"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? '»' : '«' }}
        </button>
      </div>
      <nav :class="cn('flex flex-col gap-1', collapsed ? 'items-center' : 'px-2')">
        <button
          v-for="it in ITEMS"
          :key="it.key"
          :aria-current="active === it.key ? 'page' : undefined"
          :class="cn(
            'relative flex items-center rounded-xl text-sm transition-colors',
            collapsed ? 'h-10 w-10 justify-center' : 'gap-2.5 px-3 py-2.5',
            active === it.key ? 'text-fg' : 'text-muted hover:text-fg',
          )"
          @click="active = it.key"
          @pointerenter="hover = it.key"
          @pointerleave="hover = null"
        >
          <motion.span
            v-if="hover === it.key && active !== it.key"
            layout-id="sidebar-hover-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-xl bg-card"
          />
          <motion.span
            v-if="active === it.key"
            layout-id="sidebar-active-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-xl bg-fg/[0.08] dark:bg-white/10"
          />
          <component :is="it.icon" :size="16" class="relative z-10 shrink-0" />
          <span v-if="!collapsed" class="relative z-10">{{ T.items[it.key] }}</span>
        </button>
      </nav>
    </aside>

    <div class="sm:hidden">
      <button
        class="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-medium"
        @click="mobileOpen = !mobileOpen"
      >
        {{ mobileOpen ? T.close : T.open }}
      </button>
      <AnimatePresence>
        <motion.aside
          v-if="mobileOpen"
          key="mobile-drawer"
          :initial="{ x: -40, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :exit="{ x: -40, opacity: 0 }"
          :transition="motionTransitions.springSnappy"
          class="mt-2 rounded-2xl border border-line bg-surface p-2 shadow-lg"
        >
          <nav class="flex flex-col gap-1 px-2">
            <button
              v-for="it in ITEMS"
              :key="it.key"
              :aria-current="active === it.key ? 'page' : undefined"
              :class="cn(
                'relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors',
                active === it.key ? 'text-fg' : 'text-muted hover:text-fg',
              )"
              @click="active = it.key"
              @pointerenter="hover = it.key"
              @pointerleave="hover = null"
            >
              <motion.span
                v-if="hover === it.key && active !== it.key"
                layout-id="sidebar-hover-pill"
                :transition="motionTransitions.springMorph"
                class="absolute inset-0 rounded-xl bg-card"
              />
              <motion.span
                v-if="active === it.key"
                layout-id="sidebar-active-pill"
                :transition="motionTransitions.springMorph"
                class="absolute inset-0 rounded-xl bg-fg/[0.08] dark:bg-white/10"
              />
              <component :is="it.icon" :size="16" class="relative z-10 shrink-0" />
              <span class="relative z-10">{{ T.items[it.key] }}</span>
            </button>
          </nav>
        </motion.aside>
      </AnimatePresence>
    </div>

    <div class="hidden flex-1 rounded-2xl border border-dashed border-line p-4 sm:block">
      <p class="flex items-center gap-2 text-sm text-muted">
        <SearchIcon :size="14" /> {{ T.paneActive }} <b class="text-fg">{{ T.items[active] }}</b>
      </p>
      <p class="mt-2 text-xs text-muted">{{ T.paneHint }}</p>
    </div>
  </div>
</template>
