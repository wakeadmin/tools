/* eslint-disable vue/one-component-per-file */
/**
 * 权限检查
 */
import { NoopArray } from '@wakeadmin/utils';
import { defineComponent, PropType } from 'vue';
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

export const Allows = defineComponent({
  name: 'BayAllows',
  props: ALLOW_PROPS,
  setup(props) {
    const pass = computedAsync(async () => {
      return await allows(parseTo(props.to), props.type ?? 'OR');
    });

    return () => {
      return pass.value ? (
        <>
          <slot></slot>
          <slot name="allow"></slot>
        </>
      ) : (
        <slot name="deny"></slot>
      );
    };
  },
});

/**
 * 页面检查
 */
export const AllowsPage = defineComponent({
  name: 'BayAllowsPage',
  props: ALLOW_PROPS,
  render() {
    return (
      <wkc-allows to={this.to} type={this.type}>
        <slot></slot>
        <div slot="deny">403 您无权操作该页面</div>
      </wkc-allows>
    );
  },
});
