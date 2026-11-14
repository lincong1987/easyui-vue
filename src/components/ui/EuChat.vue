<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { SendIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{
  class?: string;
}>();

interface Msg {
  id: number;
  from: 'me' | 'them';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

const SEED: Msg[] = [
  { id: 1, from: 'them', text: 'Hey! Is the EasyUI port alive?', time: '09:41' },
  { id: 2, from: 'me', text: 'Yes — 66 components implemented so far.', time: '09:41', status: 'read' },
  { id: 3, from: 'them', text: 'Nice. Does the donut chart animate?', time: '09:42' },
];

const REPLIES = [
  'Perfect, checking it now.',
  'The springs feel great.',
  'Can you add the heatmap next?',
  'Ship it 🚀',
];

const msgs = ref<Msg[]>([...SEED]);
const draft = ref('');
const typing = ref(false);
const idRef = ref(100);

const timers = new Set<number>();

function nextId() {
  return idRef.value++;
}

function send() {
  const text = draft.value.trim();
  if (!text) return;
  const id = nextId();
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  msgs.value = [...msgs.value, { id, from: 'me', text, time, status: 'sent' }];
  draft.value = '';
  typing.value = true;
  const timer = window.setTimeout(() => {
    timers.delete(timer);
    typing.value = false;
    msgs.value = [
      ...msgs.value.map((x) => (x.id === id ? { ...x, status: 'read' as const } : x)),
      { id: nextId(), from: 'them', text: REPLIES[id % REPLIES.length], time },
    ];
  }, 1400);
  timers.add(timer);
}

function onInput(e: Event) {
  draft.value = (e.target as HTMLTextAreaElement).value;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
}

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t));
  timers.clear();
});
</script>

<template>
  <div
    :class="
      cn(
        'flex h-[420px] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-surface',
        props.class,
      )
    "
  >
    <div class="flex items-center gap-2.5 border-b border-line px-4 py-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-fg text-[11px] font-bold text-bg">EU</span>
      <div>
        <p class="text-sm font-medium leading-tight">EasyUI Team</p>
        <p class="text-[11px] text-emerald-600 dark:text-emerald-400">{{ typing ? 'typing…' : 'online' }}</p>
      </div>
    </div>

    <div class="flex-1 space-y-2 overflow-y-auto p-3.5" aria-live="polite">
      <AnimatePresence :initial="false">
        <motion.div
          v-for="m in msgs"
          :key="m.id"
          :initial="{ opacity: 0, y: 10, scale: 0.97 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="motionTransitions.springSnappy"
          :class="cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')"
        >
          <div
            :class="
              cn(
                'max-w-[80%] rounded-2xl px-3.5 py-2 text-sm',
                m.from === 'me' ? 'rounded-br-md bg-fg text-bg' : 'rounded-bl-md bg-card text-fg',
              )
            "
          >
            <p>{{ m.text }}</p>
            <p
              :class="
                cn(
                  'mt-0.5 text-right text-[10px] tabular-nums',
                  m.from === 'me' ? 'text-bg/60' : 'text-muted',
                )
              "
            >
              {{ m.time }}{{ m.status === 'read' ? ' · ✓✓' : m.status === 'sent' ? ' · ✓' : '' }}
            </p>
          </div>
        </motion.div>
        <motion.div
          v-if="typing"
          key="typing"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="flex justify-start"
        >
          <div class="flex gap-1 rounded-2xl rounded-bl-md bg-card px-3.5 py-3">
            <motion.span
              v-for="i in [0, 1, 2]"
              :key="i"
              class="h-1.5 w-1.5 rounded-full bg-muted"
              :animate="{ opacity: [0.3, 1, 0.3] }"
              :transition="{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    <div class="flex items-end gap-2 border-t border-line p-2.5">
      <textarea
        :value="draft"
        rows="1"
        placeholder="Message…"
        aria-label="Message"
        class="max-h-24 min-h-10 flex-1 resize-none rounded-xl border border-line bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-fg"
        @input="onInput"
        @keydown="onKeydown"
      />
      <button
        aria-label="Send message"
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fg text-bg transition-transform active:scale-95"
        @click="send"
      >
        <SendIcon :size="16" />
      </button>
    </div>
  </div>
</template>
