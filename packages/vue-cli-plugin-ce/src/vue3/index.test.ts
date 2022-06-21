import { nodeTransform } from '.';
import { compile, CompilerOptions } from '@vue/compiler-dom';

const options: CompilerOptions = {
  nodeTransforms: [nodeTransform({ customElement: /^wkc-/ })],
  isCustomElement: t => t.startsWith('wkc'),
};

/**
 * 去掉每行前后的空格，方便比较
 * @returns
 */
const trim = (t: string) =>
  t
    .trim()
    .split(/\n/)
    .map(i => i.trim())
    .filter(Boolean)
    .join('\n');

/**
 * @param {string} t
 * @returns
 */
const c = (t: string) => trim(compile(t, options).code);

test('转换 v-model', () => {
  // 不会影响原本转换逻辑
  expect(c(`<input v-model="value" />`)).toBe(
    trim(`const _Vue = Vue
	return function render(_ctx, _cache) {
		with (_ctx) {
			const { vModelText: _vModelText, withDirectives: _withDirectives, openBlock: _openBlock, createElementBlock: _createElementBlock } = _Vue
			return _withDirectives((_openBlock(), _createElementBlock("input", {
				 "onUpdate:modelValue": $event => ((value) = $event)
				}, null, 8 /* PROPS */, ["onUpdate:modelValue"])), [
				[_vModelText, value]
			])
		}
	}`)
  );
  expect(c(`<wkc-input :value="value" @input="value = $event.detail[0]" />`)).toBe(
    trim(`
		const _Vue = Vue
			return function render(_ctx, _cache) {
				with (_ctx) {
					const { openBlock: _openBlock, createElementBlock: _createElementBlock } = _Vue
					return (_openBlock(), _createElementBlock("wkc-input", {
						value: value,
						onInput: $event => (value = $event.detail[0])
					}, null, 40 /* PROPS, HYDRATE_EVENTS */, ["value", "onInput"]))
				}
			}
	`)
  );

  // 自定义元素转换
  expect(c(`<wkc-input v-model="value" />`)).toBe(
    trim(`const _Vue = Vue
    return function render(_ctx, _cache) {
			with (_ctx) {
				const { openBlock: _openBlock, createElementBlock: _createElementBlock } = _Vue
				return (_openBlock(), _createElementBlock("wkc-input", {
					value: value,
					onInput: $event => ((value) = $event.detail[0])
					}, null, 40 /* PROPS, HYDRATE_EVENTS */, ["value", "onInput"]))
				}
			}
	`)
  );

  expect(c(`<wkc-input v-model.lazy="value" />`)).toBe(
    trim(`const _Vue = Vue
    return function render(_ctx, _cache) {
			with (_ctx) {
				const { openBlock: _openBlock, createElementBlock: _createElementBlock } = _Vue
				return (_openBlock(), _createElementBlock("wkc-input", {
					value: value,
					onChange: $event => ((value) = $event.detail[0])
					}, null, 40 /* PROPS, HYDRATE_EVENTS */, ["value", "onChange"]))
				}
			}
	`)
  );
});
