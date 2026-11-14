/** English dictionary — the key structure is the source of truth for all locales. */
export const en = {
  banner: {
    text: 'Launch offer: Sponsor EasyUI for $49 / month',
    dismiss: 'Dismiss banner',
  },
  nav: {
    home: 'Home',
    components: 'Components',
    llms: 'LLMs',
    browseComponents: 'Browse components',
    upstreamRepo: 'Upstream GitHub repository',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    language: 'Language',
  },
  home: {
    title1: 'Open-Source Vue UI Library',
    title2: 'with Animated Components',
    subtitle:
      'Copy and paste Vue 3 components for Tailwind, with live previews, TypeScript source, and Motion (Framer) interactions.',
    browse: 'Browse components',
    featured: 'Featured components',
    featuredNote: 'Live previews rendered by the real ported components.',
    viewAll: 'View all components',
  },
  directory: {
    eyebrow: 'Directory',
    title1: 'Vue Component Library',
    title2: 'with Copy Paste UI',
    intro:
      '{count} components to explore. Copy accessible, typed Vue 3 UI into your project. Browse live demos, review Tailwind styles, and install only what you need.',
    searchPlaceholder: 'Search components…',
    searchAria: 'Search components',
    results: '{count} result{suffix} · page {page} of {pages}',
    empty: 'No components match “{query}” in {tab}.',
    tabs: {
      All: 'All',
      Recent: 'Recent',
      Motion: 'Motion',
      Buttons: 'Buttons',
      Navigation: 'Navigation',
      Feedback: 'Feedback',
      Overlays: 'Overlays',
      Forms: 'Forms',
      Auth: 'Auth',
    },
  },
  detail: {
    back: '← All components',
    implemented: '✓ Implemented in this Vue port',
    cataloguedOnly: 'Catalogued only',
    livePreview: 'Live preview',
    notPortedYet: 'Not ported yet',
    notPortedBody:
      'This entry is catalogued from upstream metadata. The live implementation lives in the upstream repository — follow the source link below.',
    created: 'Created',
    badges: 'Badges',
    upstreamPage: 'Upstream page',
    upstreamSource: 'Upstream source',
    notFound: 'Component not found',
    notFoundBody: 'No catalog entry for “{slug}”.',
    backToDirectory: 'Back to directory',
  },
  llms: {
    title: 'EasyUI Vue — llms.txt',
    intro:
      'Production-ready, beautifully crafted animated UI components built with Vue 3, Tailwind CSS, and Motion for Vue — {count} components, all implemented as live, from-scratch Vue single-file components.',
  },
  preview: {
    new: 'NEW',
    cataloguedFromUpstream: 'Catalogued from upstream — implementation not included in this port.',
  },
  footer: {
    tagline: 'Open-source, thoughtful components for modern Vue interfaces',
    builtBy: '© 2026 EasyUI Vue · Built by lincong',
    portOf: 'easyui.site',
    upstreamRepo: 'upstream repository',
  },
  categories: {
    Motion: 'Motion',
    Buttons: 'Buttons',
    Navigation: 'Navigation',
    Feedback: 'Feedback',
    Overlays: 'Overlays',
    Forms: 'Forms',
    Auth: 'Auth',
    Uncategorized: 'Uncategorized',
  },
};

export type Dictionary = typeof en;
