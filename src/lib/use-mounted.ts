import { useSyncExternalStore } from 'react';
const noopSubscribe = () => () => {};
/** false during SSR and hydration, true afterwards. */
export const useMounted = () => useSyncExternalStore(noopSubscribe, () => true, () => false);
/** Server snapshot is true so SSR and hydration markup match; false only on clients without IO. */
export const useHasIO = () =>
  useSyncExternalStore(noopSubscribe, () => typeof IntersectionObserver !== 'undefined', () => true);
