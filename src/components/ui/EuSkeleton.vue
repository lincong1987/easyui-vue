<script lang="ts">
import { defineComponent, h, type PropType } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

type SkeletonVariant = 'text' | 'avatar' | 'block';

const VARIANT_CLASS: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded-md',
  avatar: 'h-10 w-10 rounded-full',
  block: 'h-24 w-full rounded-xl',
};

/** Placeholder with a subtle light sweep. */
export const Skeleton = defineComponent({
  name: 'Skeleton',
  props: {
    variant: { type: String as PropType<SkeletonVariant>, default: 'text' },
    class: { type: String, default: undefined },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          'aria-hidden': 'true',
          class: cn('relative overflow-hidden bg-card', VARIANT_CLASS[props.variant], props.class),
        },
        [
          h('div', {
            class:
              'absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10',
            style: { animation: 'eu-shimmer 1.8s ease-in-out infinite' },
          }),
        ],
      );
  },
});

/** Eases real content in with a gentle rise and un-blur. */
export const SkeletonReveal = defineComponent({
  name: 'SkeletonReveal',
  props: {
    loading: { type: Boolean, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: 'relative' },
        props.loading
          ? h('div', { class: 'space-y-2.5' }, [
              h('div', { class: 'flex items-center gap-3' }, [
                h(Skeleton, { variant: 'avatar' }),
                h('div', { class: 'flex-1 space-y-2' }, [
                  h(Skeleton, { class: 'w-1/3' }),
                  h(Skeleton, { class: 'w-2/3' }),
                ]),
              ]),
              h(Skeleton, { variant: 'block' }),
            ])
          : h(
              motion.div,
              {
                initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
                animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                transition: motionTransitions.easeSoft,
              },
              { default: () => (slots.default ? slots.default() : []) },
            ),
      );
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  variant?: SkeletonVariant;
  class?: string;
}>();
</script>

<template>
  <Skeleton :variant="props.variant" :class="props.class" />
</template>
