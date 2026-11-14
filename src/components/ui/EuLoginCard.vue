<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { GithubIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import EuDrawCheckbox from './EuDrawCheckbox.vue';
import EuLockInput from './EuLockInput.vue';

const props = defineProps<{
  class?: string;
}>();

const emit = defineEmits<{
  submit: [email: string];
}>();

const email = ref('');
const password = ref('');
const state = ref<'idle' | 'loading' | 'done'>('idle');

let timer: ReturnType<typeof setTimeout> | null = null;

function submit() {
  if (state.value !== 'idle') return;
  state.value = 'loading';
  timer = setTimeout(() => {
    state.value = 'done';
    emit('submit', email.value);
  }, 900);
}

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <form
    :class="cn('w-full max-w-sm rounded-3xl border border-line bg-surface p-6 shadow-lg', props.class)"
    @submit.prevent="submit"
  >
    <h3 class="text-lg font-semibold tracking-tight">Welcome back</h3>
    <p class="mt-1 text-sm text-muted">Sign in to your EasyUI account.</p>

    <div class="mt-5 space-y-3.5">
      <div>
        <label for="login-email" class="mb-1.5 block text-sm font-medium">Email</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-fg/40 focus:border-fg"
        />
      </div>

      <EuLockInput label="Password" :value="password" @update:value="password = $event" />
    </div>

    <div class="mt-3.5 flex items-center justify-between">
      <EuDrawCheckbox label="Remember me" />
      <button type="button" class="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
        Forgot password?
      </button>
    </div>

    <motion.button
      type="submit"
      :while-press="{ scale: 0.97 }"
      :transition="motionTransitions.springSnappy"
      :class="cn(
        'mt-5 flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors',
        state === 'done' ? 'bg-emerald-600 text-white' : 'bg-fg text-bg hover:opacity-90',
      )"
    >
      <template v-if="state === 'idle'">Sign in</template>
      <motion.span
        v-else-if="state === 'loading'"
        class="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 0.7, repeat: Infinity, ease: 'linear' }"
      />
      <template v-else>Signed in ✓</template>
    </motion.button>

    <div class="my-4 flex items-center gap-3 text-xs text-muted">
      <span class="h-px flex-1 bg-line" />
      or continue with
      <span class="h-px flex-1 bg-line" />
    </div>

    <div class="grid grid-cols-2 gap-2.5">
      <button
        type="button"
        class="flex h-10 items-center justify-center gap-2 rounded-xl border border-line text-sm transition-colors hover:bg-card"
      >
        <span class="font-semibold text-[#4285F4]">G</span> Google
      </button>
      <button
        type="button"
        class="flex h-10 items-center justify-center gap-2 rounded-xl border border-line text-sm transition-colors hover:bg-card"
      >
        <GithubIcon :size="15" /> GitHub
      </button>
    </div>
  </form>
</template>
