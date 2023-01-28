import Vue from 'vue';

const isVue2 = true;
const isVue3 = false;
const Vue2 = Vue;
const warn = Vue.util.warn;

export const KeepAlive = 'keep-alive';
export const TransitionGroup = 'transition-group';
export const Transition = {
  functional: true,
  render(h, context) {
    const props = context.props;
    const children = context.children;
    const listeners = context.listeners;
    const leaveClass = props.leaveClass || props.leaveFromClass;
    const enterClass = props.enterClass || props.enterFromClass;

    return h(
      'transition',
      { props: Object.assign({}, props, { leaveClass: leaveClass, enterClass: enterClass }), on: listeners },
      children
    );
  },
};

export const resolveComponent = function (name) {
  return name;
};

export const resolveDirective = function (name) {
  return name;
};

export const vShow = 'show';

export const Teleport = undefined;
export const Suspense = undefined;
export const Fragment = undefined;
export const Text = undefined;
export const Comment = undefined;
export const isVNode = undefined;
export const withDirectives = undefined;

export const render = undefined;
export const createVNode = undefined;

function install() {}

// createApp polyfill
export function createApp(rootComponent, rootProps) {
  let vm;
  const provide = {};
  var app = {
    config: Vue.config,
    use: Vue.use.bind(Vue),
    mixin: Vue.mixin.bind(Vue),
    component: Vue.component.bind(Vue),
    provide: function (key, value) {
      provide[key] = value;
      return this;
    },
    directive: function (name, dir) {
      if (dir) {
        Vue.directive(name, dir);
        return app;
      } else {
        return Vue.directive(name);
      }
    },
    mount: function (el, hydrating) {
      if (!vm) {
        vm = new Vue(
          Object.assign({ propsData: rootProps }, rootComponent, {
            provide: Object.assign(provide, rootComponent.provide),
          })
        );
        vm.$mount(el, hydrating);
        return vm;
      } else {
        return vm;
      }
    },
    unmount: function () {
      if (vm) {
        vm.$destroy();
        vm = undefined;
      }
    },
  };
  return app;
}

export { Vue, Vue2, isVue2, isVue3, install, warn };
export * from 'vue';
