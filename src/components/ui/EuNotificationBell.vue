<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion, useAnimationControls } from 'motion-v';
import { useLocale } from '../../i18n/useLocale';
import { motionTransitions } from '../../lib/motion-tokens';
import { BellIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

interface NotificationItem {
  title: string;
  body: string;
  time: string;
}

const DATA: Record<
  'en' | 'zh-CN',
  {
    notifications: NotificationItem[];
    unread: string;
    simulate: string;
    markAllRead: string;
  }
> = {
  en: {
    notifications: [
      { title: 'Build succeeded', body: 'easyui-port deployed to production.', time: '2m' },
      { title: 'New star', body: 'someone starred the repository.', time: '18m' },
      { title: 'Weekly digest', body: '134 components · 66 implemented.', time: '1h' },
    ],
    unread: 'Notifications, {count} unread',
    simulate: 'simulate arrival',
    markAllRead: 'Mark all as read',
  },
  'zh-CN': {
    notifications: [
      { title: '构建成功', body: 'easyui-port 已部署到生产环境。', time: '2 分钟前' },
      { title: '新增 Star', body: '有人 Star 了该仓库。', time: '18 分钟前' },
      { title: '每周摘要', body: '134 个组件 · 已实现 66 个。', time: '1 小时前' },
    ],
    unread: '通知，{count} 条未读',
    simulate: '模拟新通知',
    markAllRead: '全部标为已读',
  },
};

const { locale } = useLocale();
const ui = computed(() => DATA[locale.value]);

const open = ref(false);
const count = ref(3);
const controls = useAnimationControls();

const ariaLabel = computed(() => ui.value.unread.replace('{count}', String(count.value)));

function receive() {
  count.value += 1;
  controls.start({
    rotate: [0, -14, 12, -9, 6, 0],
    transition: { duration: 0.55, ease: 'easeInOut' },
  });
}

function markAllRead() {
  count.value = 0;
  open.value = false;
}
</script>

<template>
  <div :class="cn('relative inline-flex flex-col items-center gap-3', props.class)">
    <div class="flex items-center gap-3">
      <motion.button
        type="button"
        :aria-label="ariaLabel"
        :animate="controls"
        :while-press="{ scale: 0.92 }"
        :transition="motionTransitions.springSnappy"
        class="relative rounded-2xl border border-line bg-surface p-3 shadow-sm transition-shadow hover:shadow-md"
        @click="open = !open"
      >
        <BellIcon :size="19" />
        <AnimatePresence>
          <motion.span
            v-if="count > 0"
            :key="count"
            :initial="{ scale: 0, y: 4 }"
            :animate="{ scale: 1, y: 0 }"
            :exit="{ scale: 0 }"
            :transition="motionTransitions.springResponsive"
            class="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white tabular-nums"
          >
            {{ count }}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <button
        class="rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card"
        @click="receive"
      >
        {{ ui.simulate }}
      </button>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="open"
        key="panel"
        :initial="{ opacity: 0, y: -8, scale: 0.97 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -8, scale: 0.97 }"
        :transition="motionTransitions.springSnappy"
        class="absolute top-full z-30 mt-2 w-72 origin-top rounded-2xl border border-line bg-surface p-1.5 shadow-xl"
      >
        <div
          v-for="(n, i) in ui.notifications"
          :key="n.title"
          :class="cn('rounded-xl px-3 py-2.5', i === 0 && 'bg-card')"
        >
          <div class="flex items-baseline justify-between gap-3">
            <p class="text-sm font-medium">{{ n.title }}</p>
            <span class="text-[10px] text-muted tabular-nums">{{ n.time }}</span>
          </div>
          <p class="text-xs text-muted">{{ n.body }}</p>
        </div>
        <button
          class="mt-1 w-full rounded-xl px-3 py-2 text-center text-xs text-muted transition-colors hover:bg-card hover:text-fg"
          @click="markAllRead"
        >
          {{ ui.markAllRead }}
        </button>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
