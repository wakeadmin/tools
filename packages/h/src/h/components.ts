import {
  isVue2,
  Transition as VueTransition,
  TransitionGroup as VueTransitionGroup,
  KeepAlive as VueKeepAlive,
  Teleport as VueTeleport,
  Suspense as VueSuspense,
} from 'vue-demi';

/**
 * Vue3 Transition 变动
 *
 * props:
 * leave-class -> leave-from-class
 * enter-class -> enter-from-class
 *
 * class
 * .v-enter -> .v-enter-from
 * .v-leave -> .v-leave-from
 *
 * https://v3-migration.vuejs.org/breaking-changes/transition.html#_3-x-update
 */
export const Transition: typeof VueTransition = isVue2
  ? ({
      functional: true,
      render(h: Function, context: any) {
        const { props, children, listeners } = context;
        const leaveClass = props.leaveClass ?? props.leaveFromClass;
        const enterClass = props.enterClass ?? props.enterFromClass;

        return h('transition', { props: { ...props, leaveClass, enterClass }, on: listeners }, children);
      },
    } as any)
  : VueTransition;

export const TransitionGroup: typeof VueTransitionGroup = isVue2 ? ('transition-group' as any) : VueTransitionGroup;

export const KeepAlive: typeof VueKeepAlive = isVue2 ? ('keep-alive' as any) : VueKeepAlive;

const notSupportedInVue2 = (message: string) => ({
  functional: true,
  render(h: Function) {
    return h('div', null, message);
  },
});

export const Teleport: typeof VueTeleport = isVue2
  ? (notSupportedInVue2('Teleport 在 Vue 2 下不支持') as any)
  : VueTeleport;

export const Suspense: typeof VueSuspense = isVue2
  ? (notSupportedInVue2('Suspense 在 Vue 2 下不支持') as any)
  : VueSuspense;
