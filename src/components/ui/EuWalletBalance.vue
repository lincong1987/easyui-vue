<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { EyeIcon, EyeOffIcon } from '../../lib/icons';
import { useLocale } from '../../i18n/useLocale';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const DATA: Record<
  'en' | 'zh-CN',
  {
    pouch: string;
    mask: string;
    reveal: string;
    hideAria: string;
    revealAria: string;
    caption: string;
  }
> = {
  en: {
    pouch: 'Leather pouch',
    mask: 'Mask',
    reveal: 'Reveal',
    hideAria: 'Hide balances',
    revealAria: 'Reveal balances',
    caption: 'tap a card to focus · eye masks with blur-crossfade',
  },
  'zh-CN': {
    pouch: '皮革卡包',
    mask: '隐藏',
    reveal: '显示',
    hideAria: '隐藏余额',
    revealAria: '显示余额',
    caption: '点按卡片切换焦点 · 眼睛图标以模糊交叉淡入隐藏金额',
  },
};

const { locale } = useLocale();
const T = computed(() => DATA[locale.value]);

const CARDS = [
  { brand: 'Mastercard', last4: '3040', balance: 4566.0, tint: 'from-blue-900 to-indigo-950' },
  { brand: 'Visa', last4: '8817', balance: 1284.4, tint: 'from-slate-800 to-slate-950' },
  { brand: 'Amex', last4: '0043', balance: 312.75, tint: 'from-emerald-900 to-teal-950' },
];

const revealed = ref(true);
const active = ref(0);

function money(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div class="relative rounded-3xl border border-line bg-gradient-to-b from-amber-950/80 to-stone-950 p-5 shadow-xl">
      <div class="flex items-center justify-between">
        <p class="text-xs uppercase tracking-widest text-amber-200/60">{{ T.pouch }}</p>
        <button
          :aria-label="revealed ? T.hideAria : T.revealAria"
          class="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-amber-100 transition-colors hover:bg-white/20"
          @click="revealed = !revealed"
        >
          <EyeOffIcon v-if="revealed" :size="12" />
          <EyeIcon v-else :size="12" />
          {{ revealed ? T.mask : T.reveal }}
        </button>
      </div>

      <div class="mt-4 space-y-2.5">
        <motion.button
          v-for="(c, i) in CARDS"
          :key="c.brand"
          :initial="false"
          :animate="{ scale: active === i ? 1 : 0.96, opacity: active === i ? 1 : 0.6 }"
          :transition="motionTransitions.springSnappy"
          :class="cn(
            'relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-left text-white',
            c.tint,
          )"
          @click="active = i"
        >
          <div>
            <p class="text-[10px] uppercase tracking-widest text-white/50">{{ c.brand }} •••• {{ c.last4 }}</p>
            <motion.p
              :key="revealed ? 'show' : 'hide'"
              :initial="{ filter: 'blur(8px)', opacity: 0 }"
              :animate="{ filter: revealed ? 'blur(0px)' : 'blur(8px)', opacity: 1 }"
              :transition="motionTransitions.easeSoft"
              class="mt-0.5 text-xl font-semibold tabular-nums"
            >
              {{ revealed ? money(c.balance) : '$••••••' }}
            </motion.p>
          </div>
          <motion.span
            v-if="active === i"
            layout-id="wallet-active-dot"
            class="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-400"
          />
        </motion.button>
      </div>
    </div>
    <p class="mt-2 text-center text-[10px] text-muted">{{ T.caption }}</p>
  </div>
</template>
