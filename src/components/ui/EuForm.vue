<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { useLocale } from '../../i18n/useLocale';
import EuDrawCheckbox from './EuDrawCheckbox.vue';
import EuStretchSwitch from './EuStretchSwitch.vue';

const props = defineProps<{ class?: string }>();

type Plan = 'Hobby' | 'Pro' | 'Team';

const { locale } = useLocale();

const DATA: Record<'en' | 'zh-CN', {
  emailLabel: string;
  emailError: string;
  planLabel: string;
  plans: { id: Plan; label: string }[];
  notify: string;
  terms: string;
  submitted: string;
  continueWith: string;
}> = {
  en: {
    emailLabel: 'Work email',
    emailError: "That doesn't look like an email address.",
    planLabel: 'Plan',
    plans: [
      { id: 'Hobby', label: 'Hobby' },
      { id: 'Pro', label: 'Pro' },
      { id: 'Team', label: 'Team' },
    ],
    notify: 'Email me release notes',
    terms: 'I agree to the terms',
    submitted: 'Submitted — check your inbox',
    continueWith: 'Continue with {plan}',
  },
  'zh-CN': {
    emailLabel: '工作邮箱',
    emailError: '这看起来不像有效的邮箱地址。',
    planLabel: '套餐',
    plans: [
      { id: 'Hobby', label: '入门版' },
      { id: 'Pro', label: '专业版' },
      { id: 'Team', label: '团队版' },
    ],
    notify: '通过邮件接收更新日志',
    terms: '我同意相关条款',
    submitted: '已提交 —— 请查收邮件',
    continueWith: '继续使用{plan}',
  },
};

const copy = computed(() => DATA[locale.value]);

const email = ref('');
const plan = ref<Plan>('Hobby');
const notify = ref(true);
const tos = ref(false);
const submitted = ref(false);

const emailError = computed(() => email.value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const valid = computed(() => !emailError.value && email.value.length > 0 && tos.value);
const submitLabel = computed(() => {
  const name = copy.value.plans.find((p) => p.id === plan.value)?.label ?? plan.value;
  return copy.value.continueWith.replace('{plan}', name);
});

function onSubmit() {
  if (valid.value) submitted.value = true;
}
</script>

<template>
  <form
    :class="cn('w-full max-w-sm space-y-4 rounded-3xl border border-line bg-surface p-5 shadow-sm', props.class)"
    @submit.prevent="onSubmit"
  >
    <div>
      <label for="f-email" class="mb-1.5 block text-sm font-medium">{{ copy.emailLabel }}</label>
      <input
        id="f-email"
        v-model="email"
        placeholder="you@company.com"
        :aria-invalid="emailError"
        :class="cn(
          'w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70',
          emailError ? 'border-red-500/70' : 'border-line hover:border-fg/40 focus:border-fg',
        )"
      />
      <AnimatePresence>
        <motion.p
          v-if="emailError"
          key="email-error"
          :initial="{ opacity: 0, height: 0 }"
          :animate="{ opacity: 1, height: 'auto' }"
          :exit="{ opacity: 0, height: 0 }"
          :transition="motionTransitions.easeFast"
          class="overflow-hidden pt-1 text-xs text-red-500"
        >
          {{ copy.emailError }}
        </motion.p>
      </AnimatePresence>
    </div>

    <div>
      <span class="mb-1.5 block text-sm font-medium">{{ copy.planLabel }}</span>
      <div class="flex gap-1.5">
        <button
          v-for="p in copy.plans"
          :key="p.id"
          type="button"
          :class="cn(
            'flex-1 rounded-xl border px-2 py-2 text-xs font-medium transition-colors',
            plan === p.id ? 'border-fg bg-card text-fg' : 'border-line text-muted hover:text-fg',
          )"
          @click="plan = p.id"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5">
      <span class="text-sm text-fg">{{ copy.notify }}</span>
      <EuStretchSwitch :default-on="notify" @change="notify = $event" />
    </div>

    <EuDrawCheckbox :label="copy.terms" :checked="tos" @update:checked="tos = $event" />

    <motion.button
      type="submit"
      :while-press="{ scale: 0.97 }"
      :transition="motionTransitions.springSnappy"
      :disabled="!valid || submitted"
      :class="cn(
        'h-11 w-full rounded-xl text-sm font-medium transition-colors',
        submitted
          ? 'bg-emerald-600 text-white'
          : valid
            ? 'bg-fg text-bg hover:opacity-90'
            : 'cursor-not-allowed bg-line text-muted',
      )"
    >
      <span v-if="submitted" class="inline-flex items-center gap-2">
        <CheckIcon :size="14" /> {{ copy.submitted }}
      </span>
      <template v-else>{{ submitLabel }}</template>
    </motion.button>
  </form>
</template>
