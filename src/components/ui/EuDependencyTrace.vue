<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const NODES: GraphNode[] = [
  { id: 'app', label: 'App', x: 50, y: 12 },
  { id: 'router', label: 'Router', x: 26, y: 42 },
  { id: 'store', label: 'Store', x: 74, y: 42 },
  { id: 'ui', label: 'UI Kit', x: 26, y: 78 },
  { id: 'api', label: 'API', x: 74, y: 78 },
];
const EDGES: [string, string][] = [
  ['app', 'router'],
  ['app', 'store'],
  ['router', 'ui'],
  ['store', 'api'],
  ['store', 'ui'],
];

const byId: Record<string, GraphNode> = Object.fromEntries(NODES.map((n) => [n.id, n] as const));

const hover = ref<string | null>(null);

const edges = computed(() =>
  EDGES.map(([a, b]) => {
    const from = byId[a];
    const to = byId[b];
    const midY = (from.y + to.y) / 2;
    return {
      key: `${a}-${b}`,
      d: `M${from.x},${from.y + 4} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y - 4}`,
      active: hover.value === a || hover.value === b,
    };
  }),
);
</script>

<template>
  <div :class="cn('w-full max-w-md', props.class)">
    <svg viewBox="0 0 100 92" class="h-56 w-full" role="img" aria-label="Dependency graph">
      <motion.path
        v-for="e in edges"
        :key="e.key"
        :d="e.d"
        fill="none"
        :stroke="e.active ? '#6366f1' : '#a1a1aa'"
        :stroke-width="e.active ? 1.6 : 1"
        vector-effect="non-scaling-stroke"
        :initial="{ pathLength: 0, opacity: 0 }"
        :animate="{ pathLength: 1, opacity: 1 }"
        :transition="{ duration: 0.9, ease: 'easeOut' }"
      />
      <motion.g
        v-for="n in NODES"
        :key="n.id"
        :initial="{ opacity: 0, scale: 0.6 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="motionTransitions.springSnappy"
        :style="{ cursor: 'pointer', transformOrigin: `${n.x}px ${n.y}px` }"
        @pointerenter="hover = n.id"
        @pointerleave="hover = null"
      >
        <rect
          :x="n.x - 9"
          :y="n.y - 5"
          width="18"
          height="10"
          rx="3"
          :fill="hover === n.id ? '#6366f1' : 'var(--color-surface)'"
          :stroke="hover === n.id ? '#6366f1' : 'var(--color-line)'"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
        <text
          :x="n.x"
          :y="n.y + 1.8"
          text-anchor="middle"
          font-size="3.4"
          :fill="hover === n.id ? '#ffffff' : 'var(--color-fg)'"
        >
          {{ n.label }}
        </text>
      </motion.g>
    </svg>
    <p class="text-center text-[10px] text-muted">hover a node — its edges light up</p>
  </div>
</template>
