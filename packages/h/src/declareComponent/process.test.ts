import { findEventHandler, getEventNameFindCache } from './process';

test('getEventNameFindCache', () => {
  expect(getEventNameFindCache({})).toEqual({});
  expect(getEventNameFindCache(Object.preventExtensions({}))).toEqual({});
  expect(getEventNameFindCache(Object.freeze({}))).toEqual({});
});

test('findEventHandler', () => {
  const target = {
    click: 0,
    clickMe: 0,
    'click-you': 0,
    clickthis: 0,
    'update:modelValue': 0,
    'update:model-another-value': 0,
    'update:modelValue:modelValue': 0,
    'update:this-value:this-value': 0,
    'update:thatvalue:thatvalue': 0,
  };

  [
    ['click', 'click'],
    ['clickMe', 'clickMe'],
    ['clickYou', 'click-you'],
    ['clickThis', 'clickthis'],
    ['update:modelValue', 'update:modelValue'],
    ['update:modelAnotherValue', 'update:model-another-value'],
    ['update:modelValue:modelValue', 'update:modelValue:modelValue'],
    ['update:thisValue:thisValue', 'update:this-value:this-value'],
    ['update:thatValue:thatValue', 'update:thatvalue:thatvalue'],
  ].forEach(([input, output]) => {
    expect(findEventHandler(input, target)).toBe(output);
  });
});
