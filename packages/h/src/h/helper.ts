import { resolveComponent as vueResolveComponent, isVue2 } from 'vue-demi';

export const resolveComponent: typeof vueResolveComponent = function (name) {
  if (isVue2) {
    return name;
  }

  return vueResolveComponent.apply(null, arguments as any);
};
