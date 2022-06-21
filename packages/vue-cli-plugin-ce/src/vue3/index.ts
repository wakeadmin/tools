import {
  createSimpleExpression,
  NodeTypes,
  ConstantTypes,
  NodeTransform,
  DirectiveNode,
  ExpressionNode,
} from '@vue/compiler-core';

import { PluginOptions } from '../types';
import { createMatcher } from '../utils';

// @vue/compiler-core 没有实际导出 NodeTypes(const)
const ELEMENT: NodeTypes.ELEMENT = 1;
const DIRECTIVE: NodeTypes.DIRECTIVE = 7;
const NOT_CONSTANT: ConstantTypes.NOT_CONSTANT = 0;
const CAN_STRINGIFY: ConstantTypes.CAN_STRINGIFY = 3;

/**
 * 创建 vue3 的模板转换器，用于优化自定义组件的使用
 */
export const nodeTransform = (options: PluginOptions): NodeTransform => {
  const matcher = createMatcher(options);

  return (node, context) => {
    if (node.type !== ELEMENT) {
      return;
    }

    const tag = node.tag;

    if (!matcher.isCustomElement(tag)) {
      return;
    }

    // 查找 v-model
    const vModel = node.props.find((p): p is DirectiveNode => p.type === DIRECTIVE && p.name === 'model');

    if (vModel == null) {
      return;
    }

    const lazy = vModel.modifiers?.includes('lazy');

    // 转换 v-model 为 input/value
    const valueProp: DirectiveNode = {
      type: DIRECTIVE,
      name: 'bind',
      loc: vModel.loc,
      modifiers: [],
      arg: createSimpleExpression('value', true, vModel.loc, CAN_STRINGIFY),
      exp: vModel.exp,
    };

    const eventHandler: ExpressionNode = createSimpleExpression(
      // 这里使用 source 避免上游转换的副作用
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `(${vModel.exp!.loc.source}) = $event.detail[0]`,
      false,
      vModel.loc,
      NOT_CONSTANT
    );

    const eventDirective: DirectiveNode = {
      type: DIRECTIVE,
      name: 'on',
      loc: vModel.loc,
      modifiers: [],
      arg: createSimpleExpression(lazy ? 'change' : 'input', true, vModel.loc, CAN_STRINGIFY),
      exp: eventHandler,
    };

    const vModelIndex = node.props.indexOf(vModel);
    node.props.splice(vModelIndex, 1, valueProp, eventDirective);
  };
};
