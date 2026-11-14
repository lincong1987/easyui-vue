<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from '../../lib/icons';
import { useTheme } from '../../theme/useTheme';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const LINKS = ['Home', 'Components', 'Docs', 'Sponsors'];

const active = ref('Home');
const open = ref(false);
const { theme, toggle } = useTheme();

function pick(link: string) {
  active.value = link;
  open.value = false;
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <nav
      :class="cn(
        'flex items-center justify-between rounded-2xl border border-line/70 px-3 py-2 backdrop-blur-xl',
        'bg-surface/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:bg-white/[0.04]',
      )"
    >
      <div class="flex items-center gap-1">
        <span class="mr-2 flex h-7 w-7 items-center justify-center rounded-lg bg-fg text-[11px] font-bold text-bg">eu</span>
        <button
          v-for="link in LINKS"
          :key="link"
          :class="cn(
            'relative hidden rounded-full px-3 py-1.5 text-sm transition-colors sm:block',
            active === link ? 'text-fg' : 'text-muted hover:text-fg',
          )"
          @click="active = link"
        >
          <motion.span
            v-if="active === link"
            layout-id="glass-nav-pill"
            :transition="motionTransitions.springMorph"
            class="absolute inset-0 rounded-full bg-fg/[0.06] dark:bg-white/10"
          />
          <span class="relative z-10">{{ link }}</span>
        </button>
      </div>
      <div class="flex items-center gap-1">
        <button aria-label="Search" class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg">
          <SearchIcon :size="16" />
        </button>
        <button
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg"
          @click="toggle"
        >
          <SunIcon v-if="theme === 'dark'" :size="16" />
          <MoonIcon v-else :size="16" />
        </button>
        <button
          aria-label="Menu"
          class="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-fg sm:hidden"
          @click="open = !open"
        >
          <MenuIcon :size="16" />
        </button>
      </div>
    </nav>
    <motion.div
      v-if="open"
      :initial="{ opacity: 0, y: -8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="motionTransitions.springSnappy"
      class="mt-2 rounded-2xl border border-line bg-surface p-2 sm:hidden"
    >
      <button
        v-for="link in LINKS"
        :key="link"
        :class="cn(
          'block w-full rounded-xl px-3 py-2 text-left text-sm',
          active === link ? 'bg-card text-fg' : 'text-muted',
        )"
        @click="pick(link)"
      >
        {{ link }}
      </button>
    </motion.div>
  </div>
</template>
