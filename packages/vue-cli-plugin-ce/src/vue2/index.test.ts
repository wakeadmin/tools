/* eslint-disable no-useless-escape */
import { CompilerOptions, compile } from 'vue-template-compiler';

import { TransformModule } from '.';

/**
 * 创建编译器
 */
function createCompile(options: CompilerOptions) {
  return (template: string): string => {
    const result = compile(template, options);
    if (result.errors.length) {
      console.error(result.errors);
      throw new Error('编译失败');
    }
    return result.render;
  };
}

const baseOptions = {
  modules: [
    new TransformModule({
      customElement: /wkc-/,
      mustUseDomProp: /wkc-/,
    }),
  ],
  whitespace: 'condense' as 'condense',
};

const baseCompile = createCompile(baseOptions);

test('节点识别', () => {
  // 基本转换
  expect(baseCompile('<div></div>')).toBe(`with(this){return _c('div')}`);

  // 识别自定义节点
  expect(baseCompile('<div><Div><wkc-i :value="1"></wkc-i></Div></div>')).toBe(
    `with(this){return _c('div',[_c('Div',[_c('wkc-i',{attrs:{},domProps:{"value":1}})],1)],1)}`
  );
});

test('转换各种形式的 v-bind', () => {
  expect(
    baseCompile(`
		<div>
			<Foo
				v-bind:value1="value1"
				v-bind:value2.prop="value2"
				value3="value3"
				:value4="value4"
				:value5.prop="value5"
				v-bind:[value6]="value6"
				:[value7]="value7"
				:[value8].prop="value8"
				:value9.sync="value9"
				:value10.sync.prop="value10"
				@input="eventHandler"
			></Foo>
			<div
				v-bind="value8"
			>
			</div>
			<div
				v-bind.prop="value9"
			></div>

		</div>
		`)
  ).toBe(
    `with(this){return _c('div',[_c('Foo',_b({attrs:{\"value1\":value1,\"value3\":\"value3\",\"value4\":value4,\"value9\":value9},domProps:_d({\"value2\":value2,\"value5\":value5,\"value10\":value10},[value8,value8]),on:{\"update:value9\":function($event){value9=$event},\"update:value10\":function($event){value10=$event},\"input\":eventHandler}},\"Foo\",_d({},[value6,value6,value7,value7]))),_c('div',_b({},'div',value8,false)),_c('div',_b({},'div',value9,true))],1)}`
  );

  expect(
    baseCompile(`
		  <wkc-i
			  v-bind:value1="value1"
				v-bind:value2.prop="value2"
				value3="value3"
				_value31="value31"
				:value4="value4"
				:value5.prop="value5"
				v-bind:[value6]="value6"
				:[value7]="value7"
				:[_value71]="value71"
				:[value8].prop="value8"
				:[_value81].prop="value81"
				v-bind="value9"
				:value10.sync="value10"
				:value11.sync.prop="value11"
				@input="eventHandler"
			></wkc-i>
	`)
  ).toBe(
    `with(this){return _c('wkc-i',_b(_b({attrs:{\"value3\":\"value3\",\"_value31\":\"value31\"},domProps:_d({\"value2\":value2,\"value5\":value5,\"value11\":value11,\"value1\":value1,\"value4\":value4,\"value10\":value10},[value8,value8,_value81,value81,value6,value6,value7,value7,_value71,value71]),on:{\"update:value10\":function($event){value10=$event},\"update:value11\":function($event){value11=$event},\"input\":eventHandler}},\"wkc-i\",{}),'wkc-i',value9,true))}`
  );
});

test('支持 .bind 语法', () => {
  expect(
    baseCompile(`<wkc-i
	 :value0="value0"
	 :[value01]="value01"
	 :[value02].prop="value02"
	 :[value03].prop.sync="value03"
	 .value1="value1"
	 .value11.prop="value11"
	 .value12.sync="value12"
	 .value13.prop.sync="value13"
	 .[value2]="value2"
	 .[value21].prop="value21"
	 .[value22].sync="value22"
	 .[value23].prop.sync="value23"
	 ></wkc-i>
	 `)
  ).toBe(
    `with(this){return _c('wkc-i',_b({attrs:{},domProps:_d({\"value1\":value1,\"value11\":value11,\"value12\":value12,\"value13\":value13,\"value0\":value0},[value02,value02,value03,value03,value2,value2,value21,value21,value22,value22,value23,value23,value01,value01]),on:_d({\"update:value12\":function($event){value12=$event},\"update:value13\":function($event){value13=$event}},[\"update:\"+(value03),function($event){value03=$event},\"update:\"+(value22),function($event){value22=$event},\"update:\"+(value23),function($event){value23=$event}])},\"wkc-i\",{}))}`
  );
});

test('支持 v-model 转换', () => {
  expect(baseCompile(`<wkc-input v-model="value" />`)).toBe(
    `with(this){return _c('wkc-input',{attrs:{},domProps:{\"value\":value},on:{\"input\":function($event){(value) = $event.detail[0]}}})}`
  );
  expect(baseCompile(`<wkc-input v-model.lazy="value" />`)).toBe(
    `with(this){return _c('wkc-input',{attrs:{},domProps:{\"value\":value},on:{\"change\":function($event){(value) = $event.detail[0]}}})}`
  );
});
