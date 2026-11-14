<script setup lang="ts">
import { computed, defineComponent, h } from 'vue';
import { motion, useSpring, useTransform } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{
  value: number;
  locale?: string;
  currency?: string;
  class?: string;
}>();

const formatted = computed(() => {
  try {
    return new Intl.NumberFormat(props.locale ?? 'en-US', {
      currency: props.currency,
      style: props.currency ? 'currency' : 'decimal',
      maximumFractionDigits: props.currency ? 2 : 0,
    }).format(props.value);
  } catch {
    return String(props.value);
  }
});

const chars = computed(() => formatted.value.split(''));

/** One digit column: a 0-9 strip translated by a physics spring. */
const RollingColumn = defineComponent({
  props: { digit: { type: Number, required: true } },
  setup(inner) {
    const spring = useSpring(inner.digit, motionTransitions.springMorph);
    spring.set(inner.digit);
    // rows are 1em tall; em translate sidesteps percentage-base ambiguity
    const y = useTransform(spring, (v) => `${-v}em`);
    return () =>
      h(
        motion.span,
        { class: 'absolute left-0 top-0 flex flex-col tabular-nums', style: { y } },
        {
          default: () =>
            Array.from({ length: 10 }, (_, n) =>
              h('span', { class: 'flex h-[1em] items-center justify-center' }, String(n)),
            ),
        },
      );
  },
});
</script>

<template>
  <span :class="cn('inline-flex items-baseline tabular-nums', props.class)" :aria-label="formatted">
    <template v-for="(ch, i) in chars" :key="i">
      <span v-if="/\d/.test(ch)" class="relative inline-block h-[1em] w-[1ch] overflow-hidden align-baseline">
        <RollingColumn :digit="Number(ch)" />
      </span>
      <span v-else>{{ ch }}</span>
    </template>
  </span>
</template>
