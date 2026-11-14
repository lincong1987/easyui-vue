<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { GithubIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { useLocale } from '../../i18n/useLocale';

const props = defineProps<{
  class?: string;
}>();

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  password: string;
  confirmPassword: string;
  mismatch: string;
  strength: string[];
  terms: string;
  submit: string;
  created: string;
  or: string;
  github: string;
}> = {
  en: {
    title: 'Create account',
    subtitle: 'Join the EasyUI port in one minute.',
    name: 'Name',
    namePlaceholder: 'Lin Yifan',
    password: 'Password',
    confirmPassword: 'Confirm password',
    mismatch: "Passwords don't match yet.",
    strength: ['too short', 'weak', 'fair', 'good', 'strong'],
    terms: 'I agree to the terms and the MIT license of the upstream project.',
    submit: 'Create account',
    created: 'Account created ✓',
    or: 'or',
    github: 'Continue with GitHub',
  },
  'zh-CN': {
    title: '创建账号',
    subtitle: '一分钟即可加入 EasyUI 移植版。',
    name: '姓名',
    namePlaceholder: '林一凡',
    password: '密码',
    confirmPassword: '确认密码',
    mismatch: '两次输入的密码还不一致。',
    strength: ['太短', '弱', '一般', '良好', '强'],
    terms: '我同意相关条款以及上游项目的 MIT 许可协议。',
    submit: '创建账号',
    created: '账号已创建 ✓',
    or: '或',
    github: '使用 GitHub 继续',
  },
};

const copy = computed(() => DATA[locale.value]);

function strengthOf(value: string): number {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

function barClass(index: number, score: number) {
  if (index >= score) return 'bg-line';
  if (score >= 3) return 'bg-emerald-500';
  if (score === 2) return 'bg-amber-500';
  return 'bg-red-500';
}

const name = ref('');
const pw = ref('');
const pw2 = ref('');
const agreed = ref(false);
const done = ref(false);

const score = computed(() => strengthOf(pw.value));
const strengthLabel = computed(() => (pw.value ? copy.value.strength[score.value] : ''));
const match = computed(() => pw.value.length > 0 && pw.value === pw2.value);
const canSubmit = computed(() => Boolean(name.value.trim()) && score.value >= 2 && match.value && agreed.value);

function submit() {
  if (canSubmit.value) done.value = true;
}
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
        <label for="su-name" class="mb-1.5 block text-sm font-medium">{{ copy.name }}</label>
        <input
          id="su-name"
          v-model="name"
          :placeholder="copy.namePlaceholder"
          class="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-fg/40 focus:border-fg"
        />
      </div>

      <div>
        <label for="su-pw" class="mb-1.5 block text-sm font-medium">{{ copy.password }}</label>
        <input
          id="su-pw"
          v-model="pw"
          type="password"
          placeholder="••••••••"
          class="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-fg/40 focus:border-fg"
        />
        <div class="mt-1.5 flex items-center gap-2">
          <div class="flex flex-1 gap-1">
            <span
              v-for="bar in [0, 1, 2, 3]"
              :key="bar"
              :class="cn('h-1 flex-1 rounded-full', barClass(bar, score))"
            />
          </div>
          <span class="w-16 text-right text-[11px] text-muted">{{ strengthLabel }}</span>
        </div>
      </div>

      <div>
        <label for="su-pw2" class="mb-1.5 block text-sm font-medium">{{ copy.confirmPassword }}</label>
        <input
          id="su-pw2"
          v-model="pw2"
          type="password"
          placeholder="••••••••"
          :class="cn(
            'w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70',
            pw2 && !match ? 'border-red-500/60' : 'border-line hover:border-fg/40 focus:border-fg',
          )"
        />
        <p v-if="pw2 && !match" class="mt-1 text-xs text-red-500">{{ copy.mismatch }}</p>
      </div>
    </div>

    <label class="mt-4 flex cursor-pointer items-start gap-2 text-xs text-muted">
      <input v-model="agreed" type="checkbox" class="mt-0.5 h-3.5 w-3.5 accent-current" />
      <span>{{ copy.terms }}</span>
    </label>

    <motion.button
      type="submit"
      :while-press="{ scale: 0.97 }"
      :transition="motionTransitions.springSnappy"
      :disabled="!canSubmit || done"
      :class="cn(
        'mt-5 h-11 w-full rounded-xl text-sm font-medium transition-colors',
        done
          ? 'bg-emerald-600 text-white'
          : canSubmit
            ? 'bg-fg text-bg hover:opacity-90'
            : 'cursor-not-allowed bg-line text-muted',
      )"
    >
      {{ done ? copy.created : copy.submit }}
    </motion.button>

    <div class="my-4 flex items-center gap-3 text-xs text-muted">
      <span class="h-px flex-1 bg-line" />
      {{ copy.or }}
      <span class="h-px flex-1 bg-line" />
    </div>
    <button
      type="button"
      class="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-line text-sm transition-colors hover:bg-card"
    >
      <GithubIcon :size="15" /> {{ copy.github }}
    </button>
  </form>
</template>
