<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon, CopyIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

const props = defineProps<{ class?: string }>();

const RUNTIMES = ['cURL', 'TypeScript', 'Python', 'Go'] as const;
type Runtime = (typeof RUNTIMES)[number];

function snippet(rt: Runtime, endpoint: string): string {
  switch (rt) {
    case 'cURL':
      return `curl -X POST https://api.easyui.dev/v1/preview \\\n  -H "Authorization: Bearer $KEY" \\\n  -d '{"component":"${endpoint}"}'`;
    case 'TypeScript':
      return `import { client } from "@easyui/sdk";\n\nconst res = await client.preview({\n  component: "${endpoint}",\n});\nconsole.log(res.html);`;
    case 'Python':
      return `from easyui import Client\n\nclient = Client()\nres = client.preview(component="${endpoint}")\nprint(res.html)`;
    case 'Go':
      return `res, err := client.Preview(ctx, &PreviewReq{\n  Component: "${endpoint}",\n})\nfmt.Println(res.HTML)`;
  }
}

const rt = ref<Runtime>('TypeScript');
const endpoint = ref('donut-chart');
const copied = ref(false);
const code = computed(() => snippet(rt.value, endpoint.value));

let copyTimer: number | undefined;

function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  const next = input.value.replace(/[^a-z0-9-]/g, '');
  endpoint.value = next;
  if (input.value !== next) input.value = next;
}

function copy() {
  navigator.clipboard?.writeText(code.value).catch(() => {});
  copied.value = true;
  window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => (copied.value = false), 1500);
}

onUnmounted(() => window.clearTimeout(copyTimer));
</script>

<template>
  <div
    :class="cn('w-full max-w-md overflow-hidden rounded-2xl border border-line bg-zinc-950 text-zinc-100', props.class)"
  >
    <div class="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
      <button
        v-for="r in RUNTIMES"
        :key="r"
        :class="
          cn(
            'rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors',
            rt === r ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white',
          )
        "
        @click="rt = r"
      >{{ r }}</button>
      <span class="flex-1" />
      <button
        aria-label="Copy snippet"
        class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        @click="copy"
      >
        <CheckIcon v-if="copied" :size="13" />
        <CopyIcon v-else :size="13" />
      </button>
    </div>

    <div class="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-zinc-400">
      <span>component:</span>
      <input
        :value="endpoint"
        aria-label="Component parameter"
        :spellcheck="false"
        class="w-40 rounded-md bg-white/5 px-2 py-1 font-mono text-zinc-200 outline-none focus:bg-white/10"
        @input="onInput"
      />
    </div>

    <div class="relative min-h-[132px] p-3.5">
      <AnimatePresence mode="wait" :initial="false">
        <motion.pre
          :key="rt + endpoint"
          :initial="{ opacity: 0, y: 6 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -6 }"
          :transition="motionTransitions.easeFast"
          class="overflow-x-auto font-mono text-[11.5px] leading-relaxed text-emerald-300"
        >{{ code }}</motion.pre>
      </AnimatePresence>
    </div>
  </div>
</template>
