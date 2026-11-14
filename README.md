# EasyUI Vue

> Open-source, beautifully crafted animated UI components for **Vue 3** — built with Tailwind CSS and [Motion for Vue](https://motion.dev/vue).

A Vue 3 port of [EasyUI](https://github.com/Surajmaurya1/easyui) — the React motion component library by [Suraj Maurya](https://github.com/Surajmaurya1). Same 134 components, same spring language, same copy-paste ownership — rebuilt from scratch as Vue 3 `<script setup>` single-file components.

**Live demo:** [lincong1987.github.io/easyui-vue](https://lincong1987.github.io/easyui-vue/)

## Highlights

- **134 animated components** in 7 categories: Motion, Buttons, Navigation, Feedback, Overlays, Forms, Auth
- Pointer-following shines, shared-layout morphs, spring physics — all on [Motion for Vue](https://motion.dev/vue)
- Hand-written SVG charts (donut, bar, funnel, area, live line) with zero chart libraries
- Canvas effects (matrix rain, warp starfield, particle bursts, sparkles) with zero WebGL dependencies
- Tailwind CSS 4 design tokens, light/dark themes
- TypeScript throughout, `script setup` single-file components

## Install

```bash
npm install easyui-vue
```

Or copy-paste any component from `src/components/ui/` straight into your project — they are plain SFCs with Tailwind classes and `motion-v` as the only runtime dependency.

## Usage

```vue
<script setup lang="ts">
import EuWalletCard from '@/components/ui/EuWalletCard.vue';
</script>

<template>
  <EuWalletCard balance="$4,566.00" card-type="Mastercard" card-last-four="3040" />
</template>
```

Every component is also browsable with live previews in the bundled gallery (`npm run dev`), including search, category filters and per-component documentation.

## Components (134)

| Category | Count | Highlights |
|---|---|---|
| Motion | 42 | Spotlight Card, Wallet Card, Animated Number, Airport Matrix Clock, Glyph Matrix, Speed Warp, Thinking Orb |
| Feedback | 34 | Donut / Bar / Funnel / Area / Live-line charts, Chat, AI Response, Payment Status, Notification Stack |
| Navigation | 18 | Command Menu, Spotlight Search (⌘K), Dynamic Island, Gooey Menu, Mega Menu, Sidebar |
| Forms | 13 | Combobox, Date Picker, OTP Input, Advanced Data Table, File Upload, Prompt Input |
| Overlays | 11 | Morphing Dialog, Sheet, Directional Tooltip, Peek Card, Intro Loader |
| Buttons | 12 | Magnetic, Liquid Ripple, Neon Edge, Rainbow, Drag-to-Confirm, Typewriter |
| Auth | 2 | Login, Sign Up |

## Development

```bash
npm install
npm run dev      # gallery with all 134 live previews
npm run build    # vue-tsc + vite production build
npm run preview  # serve the production build
```

## Credits

- [EasyUI](https://github.com/Surajmaurya1/easyui) by [Suraj Maurya](https://github.com/Surajmaurya1) — original React library, design language and component catalog. MIT.
- This port is an independent Vue 3 re-implementation, published under MIT with gratitude to the upstream project.

## License

[MIT](LICENSE)
