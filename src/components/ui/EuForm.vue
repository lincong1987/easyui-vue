<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { motionTransitions } from '../../lib/motion-tokens';
import { CheckIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import EuDrawCheckbox from './EuDrawCheckbox.vue';
import EuStretchSwitch from './EuStretchSwitch.vue';

const props = defineProps<{ class?: string }>();

const email = ref('');
const plan = ref('Hobby');
const notify = ref(true);
const tos = ref(false);
const submitted = ref(false);

const emailError = computed(() => email.value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const valid = computed(() => !emailError.value && email.value.length > 0 && tos.value);

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
      <label for="f-email" class="mb-1.5 block text-sm font-medium">Work email</label>
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
          That doesn't look like an email address.
        </motion.p>
      </AnimatePresence>
    </div>

    <div>
      <span class="mb-1.5 block text-sm font-medium">Plan</span>
      <div class="flex gap-1.5">
        <button
          v-for="p in ['Hobby', 'Pro', 'Team']"
          :key="p"
          type="button"
          :class="cn(
            'flex-1 rounded-xl border px-2 py-2 text-xs font-medium transition-colors',
            plan === p ? 'border-fg bg-card text-fg' : 'border-line text-muted hover:text-fg',
          )"
          @click="plan = p"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5">
      <span class="text-sm text-fg">Email me release notes</span>
      <EuStretchSwitch :default-on="notify" @change="notify = $event" />
    </div>

    <EuDrawCheckbox label="I agree to the terms" :checked="tos" @update:checked="tos = $event" />

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
        <CheckIcon :size="14" /> Submitted — check your inbox
      </span>
      <template v-else>Continue with {{ plan }}</template>
    </motion.button>
  </form>
</template>
