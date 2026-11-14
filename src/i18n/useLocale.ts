import { computed, inject, provide, ref, watch, type ComputedRef, type InjectionKey, type Ref } from 'vue';
import { DEFAULT_LOCALE, isLocaleCode, type LocaleCode } from './locales';
import { en } from './en';
import { zhCN } from './zh-CN';

const STORAGE_KEY = 'easyui-vue-locale';
const LocaleKey: InjectionKey<LocaleState> = Symbol('locale');

const DICTS: Record<LocaleCode, typeof en> = { en, 'zh-CN': zhCN };

export type LocaleState = {
  locale: Ref<LocaleCode>;
  setLocale: (code: LocaleCode) => void;
  /** Dictionary for the active locale; use `t.value.xxx` in script, `t.xxx` in templates. */
  t: ComputedRef<typeof en>;
};

function initialLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocaleCode(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const lang = navigator.language ?? 'en';
  return lang.toLowerCase().startsWith('zh') ? 'zh-CN' : DEFAULT_LOCALE;
}

function createLocaleState(): LocaleState {
  const locale = ref<LocaleCode>(initialLocale());
  const t = computed(() => DICTS[locale.value]);

  const sync = () => {
    document.documentElement.lang = locale.value;
  };
  sync();

  watch(locale, () => {
    try {
      localStorage.setItem(STORAGE_KEY, locale.value);
    } catch {
      /* storage unavailable */
    }
    sync();
  });

  function setLocale(code: LocaleCode) {
    locale.value = code;
  }

  return { locale, setLocale, t };
}

/** Call once at the app root. */
export function provideLocale(): LocaleState {
  const state = createLocaleState();
  provide(LocaleKey, state);
  return state;
}

export function useLocale(): LocaleState {
  const ctx = inject(LocaleKey);
  if (!ctx) throw new Error('useLocale must be used within provideLocale()');
  return ctx;
}
