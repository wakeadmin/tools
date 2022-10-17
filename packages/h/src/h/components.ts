import { Teleport as VueTeleport, Suspense as VueSuspense, Fragment as VueFragment } from '@wakeadmin/demi';

export { Transition, TransitionGroup, KeepAlive } from '@wakeadmin/demi';

const notSupportedInVue2 = (message: string) => ({
  functional: true,
  render(h: Function) {
    return h('div', null, message);
  },
});

export const Teleport: typeof VueTeleport = VueTeleport ?? (notSupportedInVue2('Teleport 在 Vue 2 下不支持') as any);

export const Suspense: typeof VueSuspense = VueSuspense ?? (notSupportedInVue2('Suspense 在 Vue 2 下不支持') as any);

export const Fragment: typeof VueFragment = VueFragment ?? (notSupportedInVue2('Fragment 在 Vue 2 下不支持') as any);
