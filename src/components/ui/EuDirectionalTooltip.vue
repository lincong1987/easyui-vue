<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    side?: Side;
    class?: string;
  }>(),
  { label: 'I came from the trigger edge', side: 'top' },
);
</script>

<template>
  <TooltipCore :label="props.label" :side="props.side" :class="props.class" />
</template>

<script lang="ts">
import { computed, defineComponent, h, ref, type PropType } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

type Side = 'top' | 'bottom' | 'left' | 'right';

interface Offset {
  x: number;
  y: number;
  cls: string;
}

const OFFSETS: Record<Side, Offset> = {
  top: { x: 0, y: 8, cls: 'bottom-full left-1/2 -translate-x-1/2 mb-2' },
  bottom: { x: 0, y: -8, cls: 'top-full left-1/2 -translate-x-1/2 mt-2' },
  left: { x: 8, y: 0, cls: 'right-full top-1/2 -translate-y-1/2 mr-2' },
  right: { x: -8, y: 0, cls: 'left-full top-1/2 -translate-y-1/2 ml-2' },
};

/**
 * A tooltip that materializes from the direction it originates — it
 * starts a small distance outside the trigger and springs inward.
 */
const TooltipCore = defineComponent({
  props: {
    label: { type: String, default: 'I came from the trigger edge' },
    side: { type: String as PropType<Side>, default: 'top' },
    class: { type: String, default: undefined },
  },
  setup(props) {
    const open = ref(false);
    const offset = computed<Offset>(() => OFFSETS[props.side]);

    return () =>
      h('div', { class: cn('relative inline-flex', props.class) }, [
        h(
          'button',
          {
            type: 'button',
            onPointerenter: () => {
              open.value = true;
            },
            onPointerleave: () => {
              open.value = false;
            },
            onFocus: () => {
              open.value = true;
            },
            onBlur: () => {
              open.value = false;
            },
            class: 'rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-sm transition-shadow hover:shadow-md',
          },
          `hover · ${props.side}`,
        ),
        h(AnimatePresence, null, {
          default: () =>
            open.value
              ? h(
                  motion.span,
                  {
                    key: 'tooltip',
                    role: 'tooltip',
                    initial: { opacity: 0, x: offset.value.x, y: offset.value.y, scale: 0.96 },
                    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
                    exit: { opacity: 0, x: offset.value.x, y: offset.value.y, scale: 0.96 },
                    transition: motionTransitions.springSnappy,
                    class: cn(
                      'pointer-events-none absolute z-30 whitespace-nowrap rounded-lg bg-fg px-2.5 py-1.5 text-xs font-medium text-bg shadow-lg',
                      offset.value.cls,
                    ),
                  },
                  { default: () => props.label },
                )
              : null,
        }),
      ]);
  },
});

export { TooltipCore as DirectionalTooltip };

const SIDES: Side[] = ['top', 'bottom', 'left', 'right'];

export const DirectionalTooltipShowcase = defineComponent({
  props: { class: { type: String, default: undefined } },
  setup(props) {
    return () =>
      h(
        'div',
        { class: cn('flex flex-wrap items-center justify-center gap-3', props.class) },
        SIDES.map((s) => h(TooltipCore, { key: s, side: s })),
      );
  },
});
</script>
