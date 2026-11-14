<script setup lang="ts">
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    class?: string;
  }>(),
  { variant: 'primary', size: 'md', loading: false, disabled: false },
);

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-fg text-bg hover:opacity-90',
  secondary: 'bg-card text-fg hover:bg-line',
  outline: 'border border-line text-fg hover:bg-card',
  ghost: 'text-fg hover:bg-card',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  link: 'text-fg underline underline-offset-4 hover:opacity-80',
  subtle: 'bg-fg/[0.06] text-fg hover:bg-fg/[0.12] dark:bg-white/10',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-sm rounded-xl',
};
</script>

<template>
  <motion.button
    :while-press="props.disabled ? undefined : { scale: 0.96 }"
    :transition="motionTransitions.springSnappy"
    :disabled="props.disabled || props.loading"
    :class="cn(
      'inline-flex select-none items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:cursor-not-allowed disabled:opacity-50',
      VARIANTS[props.variant],
      SIZES[props.size],
      props.class,
    )"
  >
    <motion.span
      v-if="props.loading"
      class="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
      :animate="{ rotate: 360 }"
      :transition="{ duration: 0.7, repeat: Infinity, ease: 'linear' }"
    />
    <slot />
  </motion.button>
</template>
