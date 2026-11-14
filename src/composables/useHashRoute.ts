import { onMounted, onUnmounted, ref, type Ref } from 'vue';

/** Hash router: returns the current path (e.g. "/", "/components", "/component/x"). */
export function useHashRoute(): { route: Ref<string> } {
  const route = ref(window.location.hash.replace(/^#/, '') || '/');

  const read = () => {
    route.value = window.location.hash.replace(/^#/, '') || '/';
    window.scrollTo({ top: 0 });
  };

  onMounted(() => window.addEventListener('hashchange', read));
  onUnmounted(() => window.removeEventListener('hashchange', read));

  return { route };
}
