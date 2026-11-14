export interface LocaleOption {
  code: 'en' | 'zh-CN';
  label: string;
}

export const LOCALES: LocaleOption[] = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
];

export type LocaleCode = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export function isLocaleCode(value: string | null | undefined): value is LocaleCode {
  return LOCALES.some((l) => l.code === value);
}
