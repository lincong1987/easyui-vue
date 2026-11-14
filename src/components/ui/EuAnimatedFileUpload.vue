<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, XIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

interface UploadItem {
  id: number;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'done';
}

const dragging = ref(false);
const items = ref<UploadItem[]>([]);
let nextId = 1;
const timers: number[] = [];

function addFiles(names: string[]) {
  const added: UploadItem[] = names.slice(0, 4).map((name) => ({
    id: nextId++,
    name,
    size: `${(Math.random() * 4 + 0.3).toFixed(1)} MB`,
    progress: 0,
    status: 'uploading',
  }));
  items.value = [...items.value, ...added];
  added.forEach((it, i) => {
    let progress = 0;
    const iv = window.setInterval(() => {
      progress = Math.min(100, progress + 9 + Math.random() * 14);
      items.value = items.value.map((p) =>
        p.id === it.id ? { ...p, progress, status: progress >= 100 ? 'done' : 'uploading' } : p,
      );
      if (progress >= 100) window.clearInterval(iv);
    }, 180 + i * 60);
    timers.push(iv);
  });
}

function remove(id: number) {
  items.value = items.value.filter((p) => p.id !== id);
}

function onDrop(e: DragEvent) {
  dragging.value = false;
  addFiles(Array.from(e.dataTransfer?.files ?? []).map((f) => f.name));
}

function onPick(e: Event) {
  const input = e.target as HTMLInputElement;
  addFiles(Array.from(input.files ?? []).map((f) => f.name));
  input.value = '';
}

onUnmounted(() => {
  timers.forEach((t) => window.clearInterval(t));
});
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <div
      :class="cn(
        'rounded-3xl border-2 border-dashed p-6 text-center transition-all',
        dragging ? 'scale-[1.02] border-fg bg-card shadow-inner' : 'border-line hover:border-fg/40',
      )"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
    >
      <motion.p :animate="{ y: dragging ? -4 : 0 }" :transition="motionTransitions.springSnappy" class="text-sm font-medium">
        {{ dragging ? 'Release to drop' : 'Drag files here' }}
      </motion.p>
      <p class="mt-1 text-xs text-muted">or</p>
      <label class="mt-2 inline-block cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-card">
        Browse files
        <input type="file" multiple class="sr-only" @change="onPick" />
      </label>
    </div>

    <ul class="mt-3 space-y-1.5">
      <AnimatePresence :initial="false">
        <motion.li
          v-for="it in items"
          :key="it.id"
          :layout="true"
          :initial="{ opacity: 0, y: 10, scale: 0.97 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, x: -30, scale: 0.95 }"
          :transition="motionTransitions.springSnappy"
          class="rounded-2xl border border-line bg-surface p-2.5"
        >
          <div class="flex items-center gap-2.5">
            <span
              :class="cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs',
                it.status === 'done' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-card text-muted',
              )"
            >
              <CheckIcon v-if="it.status === 'done'" :size="13" />
              <template v-else>{{ it.progress.toFixed(0) }}</template>
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-xs font-medium">{{ it.name }}</p>
              <div class="mt-1 h-1 overflow-hidden rounded-full bg-card">
                <div
                  :class="cn(
                    'h-full rounded-full transition-[width] duration-200',
                    it.status === 'done' ? 'bg-emerald-500' : 'bg-fg/70',
                  )"
                  :style="{ width: `${it.progress}%` }"
                />
              </div>
            </div>
            <span class="shrink-0 text-[10px] text-muted tabular-nums">{{ it.size }}</span>
            <button
              :aria-label="`Remove ${it.name}`"
              class="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-card hover:text-fg"
              @click="remove(it.id)"
            >
              <XIcon :size="12" />
            </button>
          </div>
        </motion.li>
      </AnimatePresence>
    </ul>
  </div>
</template>
