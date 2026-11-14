<script setup lang="ts">
import { ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { BellIcon, CreditCardIcon, PackageIcon, SearchIcon, SparklesIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const ITEMS = [
  { icon: PackageIcon, label: 'Components' },
  { icon: SparklesIcon, label: 'Motion' },
  { icon: CreditCardIcon, label: 'Billing' },
  { icon: BellIcon, label: 'Alerts' },
];

const active = ref('Components');
const hover = ref<string | null>(null);
const collapsed = ref(false);
const mobileOpen = ref(false);
</script>

<template>
  <div :class="cn('flex w-full max-w-md items-stretch gap-3', props.class)">
    <aside class="hidden rounded-2xl border border-line bg-surface p-2 shadow-sm sm:block">
      <div :class="cn('mb-2 flex', collapsed ? 'justify-center' : 'items-center justify-between px-2')">
        <span v-if="!collapsed" class="text-xs font-semibold uppercase tracking-widest text-muted">Menu</span>
        <button
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          class="rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:bg-card hover:text-fg"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? '»' : '«' }}
        </button>
      </div>
      <nav :class="cn('flex flex-col gap-1', collapsed ? 'items-center' : 'px-2')">
        <button
          v-for="it in ITEMS"
          :key="it.label"
          :aria-current="active === it.label ? 'page' : undefined"
          :class="cn(
            'relative flex items-center rounded-xl text-sm transition-colors',
            collapsed ? 'h-10 w-10 justify-center' : 'gap-2.5 px-3 py-2.5',
            active === it.label ? 'text-fg' : 'text-muted hover:text-fg',
          )"
          @click="active = it.label"
          @pointerenter="hover = it.label"
          @pointerleave="hover = null"
        >
          <motion.span
            v-if="hover === it.label && active !== it.label"
            layout-id="sidebar-hover-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-xl bg-card"
          />
          <motion.span
            v-if="active === it.label"
            layout-id="sidebar-active-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-xl bg-fg/[0.08] dark:bg-white/10"
          />
          <component :is="it.icon" :size="16" class="relative z-10 shrink-0" />
          <span v-if="!collapsed" class="relative z-10">{{ it.label }}</span>
        </button>
      </nav>
    </aside>

    <div class="sm:hidden">
      <button
        class="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-medium"
        @click="mobileOpen = !mobileOpen"
      >
        {{ mobileOpen ? 'Close menu' : 'Open menu' }}
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
              :key="it.label"
              :aria-current="active === it.label ? 'page' : undefined"
              :class="cn(
                'relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors',
                active === it.label ? 'text-fg' : 'text-muted hover:text-fg',
              )"
              @click="active = it.label"
              @pointerenter="hover = it.label"
              @pointerleave="hover = null"
            >
              <motion.span
                v-if="hover === it.label && active !== it.label"
                layout-id="sidebar-hover-pill"
                :transition="motionTransitions.springMorph"
                class="absolute inset-0 rounded-xl bg-card"
              />
              <motion.span
                v-if="active === it.label"
                layout-id="sidebar-active-pill"
                :transition="motionTransitions.springMorph"
                class="absolute inset-0 rounded-xl bg-fg/[0.08] dark:bg-white/10"
              />
              <component :is="it.icon" :size="16" class="relative z-10 shrink-0" />
              <span class="relative z-10">{{ it.label }}</span>
            </button>
          </nav>
        </motion.aside>
      </AnimatePresence>
    </div>

    <div class="hidden flex-1 rounded-2xl border border-dashed border-line p-4 sm:block">
      <p class="flex items-center gap-2 text-sm text-muted">
        <SearchIcon :size="14" /> content pane — active: <b class="text-fg">{{ active }}</b>
      </p>
      <p class="mt-2 text-xs text-muted">⌘B toggles collapse in the real app; here the « button does.</p>
    </div>
  </div>
</template>
