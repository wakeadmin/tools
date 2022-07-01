/* eslint-disable vue/one-component-per-file */
/**
 * 权限检查
 */
import { NoopArray } from '@wakeadmin/utils';
import { defineComponent, PropType, watch } from 'vue';
import { computedAsync } from '@vueuse/core';

import { allows, PermissionCheckType } from '../permissions';

const parseTo = (to?: string | string[]): string[] => {
  if (!to) {
    return NoopArray;
  }

  if (Array.isArray(to)) {
    return to;
  }

  return to.split(',').map(i => i.trim());
};

const ALLOW_PROPS = {
  type: {
    type: String as PropType<PermissionCheckType>,
    default: undefined,
  },
  to: {
    type: [String, Array] as PropType<string | string[]>,
    required: true,
  },
};

const ALLOW_EMITS = {
  allow() {
    return true;
  },
};

export const Allows = defineComponent({
  name: 'BayAllows',
  props: ALLOW_PROPS,
  emits: ALLOW_EMITS,
  setup(props, context) {
    const pass = computedAsync<boolean | undefined>(async () => {
      return await allows(parseTo(props.to), props.type ?? 'OR');
    }, undefined);

    watch(
      pass,
      isPass => {
        if (isPass) {
          context.emit('allow');
        }
      },
      { immediate: true }
    );

    return () => {
      return pass.value ? (
        <>
          <slot></slot>
          <slot name="allow"></slot>
        </>
      ) : pass.value == null ? null : (
        <slot name="deny"></slot>
      );
    };
  },
});

/**
 * 页面检查
 * 注意，就算没有权限，slot 依旧还是会被渲染。可以配置 allow 事件使用，来进行一些初始化话
 */
export const AllowsPage = defineComponent({
  name: 'BayAllowsPage',
  props: ALLOW_PROPS,
  emits: ALLOW_EMITS,
  methods: {
    handleAllow() {
      this.$emit('allow');
    },
  },
  render() {
    return (
      <wkc-allows to={this.to} type={this.type} onAllow={this.handleAllow}>
        <slot></slot>
        <div slot="deny">403 您无权操作该页面</div>
      </wkc-allows>
    );
  },
});
