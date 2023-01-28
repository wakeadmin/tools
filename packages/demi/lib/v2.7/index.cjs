var VueModule = require('vue');

// get the real Vue https://github.com/vueuse/vue-demi/issues/192
var Vue = VueModule.default || VueModule;

exports.Vue = Vue;
exports.Vue2 = Vue;
exports.isVue2 = true;
exports.isVue3 = false;
exports.install = function () {};
exports.warn = Vue.util.warn;

// component polyfill
exports.KeepAlive = 'keep-alive';
exports.TransitionGroup = 'transition-group';
exports.Transition = {
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
exports.resolveComponent = function (name) {
  return name;
};
exports.resolveDirective = function (name) {
  return name;
};
exports.vShow = 'show';

exports.Teleport = undefined;
exports.Suspense = undefined;
exports.Fragment = undefined;
exports.Text = undefined;
exports.Comment = undefined;
exports.isVNode = undefined;
exports.withDirectives = undefined;

exports.render = undefined;
exports.createVNode = undefined;

// createApp polyfill
exports.createApp = function (rootComponent, rootProps) {
  var vm;
  var provide = {};
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
};

Object.keys(VueModule).forEach(function (key) {
  exports[key] = VueModule[key];
});
