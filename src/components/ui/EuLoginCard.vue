<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { GithubIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { useLocale } from '../../i18n/useLocale';
import EuDrawCheckbox from './EuDrawCheckbox.vue';
import EuLockInput from './EuLockInput.vue';

const props = defineProps<{
  class?: string;
}>();

const emit = defineEmits<{
  submit: [email: string];
}>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  remember: string;
  forgot: string;
  signIn: string;
  signedIn: string;
  orContinue: string;
}> = {
  en: {
    title: 'Welcome back',
    subtitle: 'Sign in to your EasyUI account.',
    email: 'Email',
    password: 'Password',
    remember: 'Remember me',
    forgot: 'Forgot password?',
    signIn: 'Sign in',
    signedIn: 'Signed in ✓',
    orContinue: 'or continue with',
  },
  'zh-CN': {
    title: '欢迎回来',
    subtitle: '登录你的 EasyUI 账号。',
    email: '邮箱',
    password: '密码',
    remember: '记住我',
    forgot: '忘记密码？',
    signIn: '登录',
    signedIn: '已登录 ✓',
    orContinue: '或使用以下方式继续',
  },
};

const copy = computed(() => DATA[locale.value]);

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
    <h3 class="text-lg font-semibold tracking-tight">{{ copy.title }}</h3>
    <p class="mt-1 text-sm text-muted">{{ copy.subtitle }}</p>

    <div class="mt-5 space-y-3.5">
      <div>
        <label for="login-email" class="mb-1.5 block text-sm font-medium">{{ copy.email }}</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-fg/40 focus:border-fg"
        />
      </div>

      <EuLockInput :label="copy.password" :value="password" @update:value="password = $event" />
    </div>

    <div class="mt-3.5 flex items-center justify-between">
      <EuDrawCheckbox :label="copy.remember" />
      <button type="button" class="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
        {{ copy.forgot }}
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
      <template v-if="state === 'idle'">{{ copy.signIn }}</template>
      <motion.span
        v-else-if="state === 'loading'"
        class="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 0.7, repeat: Infinity, ease: 'linear' }"
      />
      <template v-else>{{ copy.signedIn }}</template>
    </motion.button>

    <div class="my-4 flex items-center gap-3 text-xs text-muted">
      <span class="h-px flex-1 bg-line" />
      {{ copy.orContinue }}
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
