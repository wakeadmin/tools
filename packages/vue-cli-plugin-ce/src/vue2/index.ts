import type { ModuleOptions, ASTElement } from 'vue-template-compiler';
import { PluginOptions } from '../types';
import { createMatcher, Matcher } from '../utils';

export interface ASTAttribute {
  name: string;
  value: string;
  dynamic?: boolean;
}

/**
 * @typedef {{
 *   isCustomElement: (tag: string, element: import('vue-template-compiler').ASTElement) => boolean,
 *   ignoreAttribute?: (attr: string, tag: string, element: import('vue-template-compiler').ASTElement, attribute: ASTAttribute) => boolean,
 *   enableDotBinding?: boolean, // 支持 .bind="v" 语法, 默认开启
 * }} PluginOptions
 */

export class TransformModule implements ModuleOptions {
  private matcher: Matcher;

  constructor(options: PluginOptions) {
    this.matcher = createMatcher(options);
  }

  genData() {
    return '';
  }

  transformNode(el: any) {
    return el;
  }

  preTransformNode: ModuleOptions['preTransformNode'] = el => {
    const { tag } = el;
    const isCustomElement = this.matcher.isCustomElement(tag);
    if (!isCustomElement) {
      return el;
    }

    return this._transformVModel(this._transformDotBinging(el));
  };

  /**
   * transform an AST node after built-ins like v-if, v-for are processed
   */
  postTransformNode: ModuleOptions['postTransformNode'] = el => {
    this._transformDomProps(el);
  };

  /**
   * 支持 .bind 语法
   */
  _transformDotBinging = (el: ASTElement) => {
    const { attrsList, attrsMap } = el;

    // 支持 .bind 语法

    if (attrsList == null || attrsList.length === 0) {
      return el;
    }

    for (const attr of attrsList) {
      const name = attr.name;
      let newName = name;

      if (!name.startsWith('.')) {
        continue;
      }

      // 替换 . 为 :
      newName = ':' + newName.slice(1);

      // 追加 .prop 修饰符
      newName = newName.replace('.prop', '');
      newName += '.prop';

      // 修改 attrsMap
      const value = attrsMap[name];

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete attrsMap[name];
      attrsMap[newName] = value;

      attr.name = newName;
    }

    return el;
  };

  /**
   * 支持 v-model 语法 preTransformNode
   */
  _transformVModel(el: ASTElement) {
    const { attrsList, attrsMap } = el;

    if (attrsList == null || attrsList.length === 0) {
      return el;
    }

    const vModel = attrsList.find(attr => attr.name.startsWith('v-model'));
    if (vModel == null) {
      return el;
    }
    const lazy = vModel.name.includes('.lazy');
    const eventName = lazy ? 'change' : 'input';
    const valueBinding = { name: ':value', value: vModel.value };
    const eventHandler = { name: `@${eventName}`, value: `(${vModel.value}) = $event.detail[0]` };

    // 删除 v-model
    attrsList.splice(attrsList.indexOf(vModel), 1, valueBinding, eventHandler);

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete attrsMap[vModel.name];
    attrsMap[valueBinding.name] = valueBinding.value;
    attrsMap[eventHandler.name] = eventHandler.value;

    return el;
  }

  /**
   * 强制使用 domProps 传入
   * TODO: 通过干预 mustUseProp 实现
   * @param el
   * @returns
   */
  _transformDomProps(el: ASTElement) {
    const { tag, attrs, dynamicAttrs, directives } = el as ASTElement & { dynamicAttrs?: ASTAttribute[] };

    const isCustomElement = this.matcher.isCustomElement(tag);

    if (!isCustomElement || (!this._hasAttribute(attrs) && !this._hasAttribute(dynamicAttrs))) {
      return;
    }

    const mustUseDomProp = this.matcher.mustUseDomProp(tag);

    /**
     * 迁移属性
     */
    const moveAttributes = (attributes: ASTAttribute[]) => {
      const clone = [...attributes];

      for (const attr of clone) {
        const ignore = this._defaultAttributeIgnore(attr.name);

        if (ignore) {
          continue;
        }

        // 纯文本不转换
        if (typeof attr.value === 'string' && attr.value.startsWith('"')) {
          continue;
        }

        // 放入 props 中
        const idx = attributes.indexOf(attr);
        if (idx !== -1) {
          attributes.splice(idx, 1);
        }

        if (el.props == null) {
          el.props = [];
        }

        el.props.push(attr);
      }
    };

    // 没有强制使用 dom 属性传入
    if (!mustUseDomProp) {
      return;
    }

    if (attrs) {
      moveAttributes(attrs);
    }

    if (dynamicAttrs) {
      moveAttributes(dynamicAttrs);
    }

    // 处理 v-bind="props" 透传语法
    if (directives?.length) {
      directives.forEach(d => {
        if (d.name === 'bind') {
          // 默认使用 prop 修饰
          if (d.modifiers == null) {
            d.modifiers = { prop: true };
          } else {
            d.modifiers.prop = true;
          }
        }
      });
    }
  }

  /**
   * 默认忽略的属性
   * @param {string} attr
   */
  _defaultAttributeIgnore(attr: string) {
    return attr === 'class' || attr === 'style';
  }

  _hasAttribute(attrs: ASTAttribute[] | undefined) {
    return attrs != null && attrs.length > 0;
  }
}
