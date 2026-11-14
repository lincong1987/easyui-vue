import { h, type FunctionalComponent, type VNodeChild } from 'vue';

interface IconProps {
  size?: number;
  class?: string;
}

type IconFC = FunctionalComponent<IconProps>;

function svgAttrs(props: IconProps) {
  return {
    width: props.size ?? 16,
    height: props.size ?? 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    class: props.class,
  };
}

export const SearchIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('circle', { cx: 11, cy: 11, r: 7 }),
    h('path', { d: 'm20 20-3.2-3.2' }),
  ]) as VNodeChild;

export const SunIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('circle', { cx: 12, cy: 12, r: 4 }),
    h('path', { d: 'M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' }),
  ]) as VNodeChild;

export const MoonIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z' })]) as VNodeChild;

export const GithubIcon: IconFC = (props) =>
  h(
    'svg',
    { ...svgAttrs(props), fill: 'currentColor', stroke: 'none' },
    [h('path', { d: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z' })],
  ) as VNodeChild;

export const ArrowRightIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'M5 12h14' }), h('path', { d: 'm13 6 6 6-6 6' })]) as VNodeChild;

export const ArrowUpRightIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'M7 17 17 7' }), h('path', { d: 'M8 7h9v9' })]) as VNodeChild;

export const CheckIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'm4 12.5 5 5L20 6.5' })]) as VNodeChild;

export const XIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'M6 6l12 12M18 6 6 18' })]) as VNodeChild;

export const ChevronDownIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'm6 9 6 6 6-6' })]) as VNodeChild;

export const ChevronRightIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'm9 6 6 6-6 6' })]) as VNodeChild;

export const CopyIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('rect', { x: 9, y: 9, width: 12, height: 12, rx: 2.5 }),
    h('path', { d: 'M5 15V5a2 2 0 0 1 2-2h10' }),
  ]) as VNodeChild;

export const MenuIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'M4 7h16M4 12h16M4 17h16' })]) as VNodeChild;

export const BellIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('path', { d: 'M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6' }),
    h('path', { d: 'M10 19a2.2 2.2 0 0 0 4 0' }),
  ]) as VNodeChild;

export const InfoIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M12 11v5' }), h('path', { d: 'M12 8h.01' })]) as VNodeChild;

export const CircleCheckIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'm8.5 12.5 2.5 2.5 4.5-5' })]) as VNodeChild;

export const CircleAlertIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M12 8v5' }), h('path', { d: 'M12 16h.01' })]) as VNodeChild;

export const EyeIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('path', { d: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z' }),
    h('circle', { cx: 12, cy: 12, r: 3 }),
  ]) as VNodeChild;

export const EyeOffIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('path', { d: 'M4 4l16 16' }),
    h('path', { d: 'M9.9 5.9A9.9 9.9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17.4 17.4 0 0 1-3.2 3.9' }),
    h('path', { d: 'M6.6 6.9A16.7 16.7 0 0 0 2.5 12S6 18.5 12 18.5a9.6 9.6 0 0 0 4-.85' }),
    h('path', { d: 'M10.6 10.7a3 3 0 0 0 4 4.2' }),
  ]) as VNodeChild;

export const SparklesIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('path', { d: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z' }),
    h('path', { d: 'M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z' }),
  ]) as VNodeChild;

export const ZapIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z' })]) as VNodeChild;

export const CreditCardIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('rect', { x: 2.5, y: 5.5, width: 19, height: 13, rx: 2.5 }), h('path', { d: 'M2.5 10h19' })]) as VNodeChild;

export const SendIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'M21 3 10.5 13.5' }), h('path', { d: 'M21 3l-7 18-3.5-7.5L3 10l18-7Z' })]) as VNodeChild;

export const StarIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'm12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7L12 3Z' })]) as VNodeChild;

export const PackageIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('path', { d: 'm7.5 4.3 9 5.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z' }),
    h('path', { d: 'M3.3 7 12 12l8.7-5' }),
    h('path', { d: 'M12 22V12' }),
  ]) as VNodeChild;

export const HeartIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6Z' })]) as VNodeChild;

export const SnailIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('circle', { cx: 10, cy: 10, r: 6.5 }),
    h('circle', { cx: 10, cy: 10, r: 3 }),
    h('path', { d: 'M16.5 13.5c2 1 3.5 2.6 3.5 4.5H8' }),
    h('path', { d: 'M16 18v2M20 16.5l1.5-1' }),
  ]) as VNodeChild;

export const LockIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('rect', { x: 4.5, y: 10.5, width: 15, height: 10, rx: 2.5 }),
    h('path', { d: 'M8 10.5V8a4 4 0 0 1 8 0v2.5' }),
    h('path', { d: 'M12 15v2' }),
  ]) as VNodeChild;

export const PlusIcon: IconFC = (props) => h('svg', svgAttrs(props), [h('path', { d: 'M12 5v14M5 12h14' })]) as VNodeChild;

export const EditIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [h('path', { d: 'M4 20h4L20.5 7.5a2.1 2.1 0 0 0-3-3L5 17v3Z' }), h('path', { d: 'm13.5 6.5 4 4' })]) as VNodeChild;

export const TrashIcon: IconFC = (props) =>
  h('svg', svgAttrs(props), [
    h('path', { d: 'M4 7h16' }),
    h('path', { d: 'M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2' }),
    h('path', { d: 'M6.5 7l1 13h9l1-13' }),
    h('path', { d: 'M10 11v5M14 11v5' }),
  ]) as VNodeChild;
