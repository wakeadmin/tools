import { stringifyOptions, createMatcher } from './utils';

test('stringifyOptions', () => {
  expect(stringifyOptions({ customElement: 'string' })).toEqual('{ customElement: ["string"], mustUseProp: [] }');
  expect(stringifyOptions({ customElement: /a/, mustUseProp: 'string' })).toEqual(
    '{ customElement: [/a/], mustUseProp: ["string"] }'
  );
  expect(stringifyOptions({ customElement: [/a/], mustUseProp: ['string'] })).toEqual(
    '{ customElement: [/a/], mustUseProp: ["string"] }'
  );
});

test('createMatcher', () => {
  const matcher = createMatcher({ customElement: [/wkc-/, /test/, 'hello-world'], mustUseProp: /wkc-/ });

  expect(matcher.isCustomElement('hello')).toBeFalsy();
  expect(matcher.isCustomElement('wkc-x')).toBeTruthy();
  expect(matcher.isCustomElement('hello-world')).toBeTruthy();

  // 没有携带 -, 不可能是 custom element
  expect(matcher.isCustomElement('test1')).toBeFalsy();
  expect(matcher.isCustomElement('test-1')).toBeTruthy();

  // 一样的规则
  expect(matcher.mustUseProp('wkc-h')).toBeTruthy();
  expect(matcher.mustUseProp('wkch')).toBeFalsy();
});
