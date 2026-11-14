import { inject, provide, ref, type InjectionKey, type Ref } from 'vue';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'easyui-vue-theme';
const ThemeKey: InjectionKey<{ theme: Ref<Theme>; toggle: () => void }> = Symbol('theme');

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Wrap the app: provides theme state and keeps <html> in sync. */
export function provideTheme(): { theme: Ref<Theme>; toggle: () => void } {
  const theme = ref<Theme>(initialTheme());

  const sync = () => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme.value === 'dark');
    root.style.colorScheme = theme.value;
  };
  sync();

  try {
    localStorage.setItem(STORAGE_KEY, theme.value);
  } catch {
    /* storage unavailable */
  }

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, theme.value);
    } catch {
      /* storage unavailable */
    }
    sync();
  };

  provide(ThemeKey, { theme, toggle });
  return { theme, toggle };
}

export function useTheme(): { theme: Ref<Theme>; toggle: () => void } {
  const ctx = inject(ThemeKey);
  if (!ctx) throw new Error('useTheme must be used within provideTheme()');
  return ctx;
}
