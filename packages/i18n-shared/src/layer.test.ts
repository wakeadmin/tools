import { LayerLink } from './layer';

describe('LayerLink', () => {
  test('正常存取值', () => {
    const link = new LayerLink();
    let value = link.flattenLayer() as any;

    // 初始层
    link.assignLayer(0, { one: '1' });

    value = link.flattenLayer();
    expect(value.one).toBe('1');

    // 第1层
    link.assignLayer(1, { two: '2' });

    value = link.flattenLayer();
    expect(value.two).toBe('2');

    // 第5层
    link.assignLayer(5, { five: '5' });
    value = link.flattenLayer();
    expect(value.five).toBe('5');

    // 中间插入第3层
    link.assignLayer(3, { three: '3' });
    value = link.flattenLayer();
    expect(value.three).toBe('3');
    expect(value.five).toBe('5');

    // 层数越低，查找优先级越高
    link.assignLayer(3, { five: '-5' });
    value = link.flattenLayer();
    expect(value.five).toBe('-5');

    // 插入第6层
    link.assignLayer(6, { six: '6' });
    value = link.flattenLayer();
    expect(value.six).toBe('6');

    link.assignLayer(5, { six: '-6' });
    value = link.flattenLayer();
    expect(value.six).toBe('-6');

    expect(link.flattenLayer()).toEqual({
      five: '-5',
      one: '1',
      six: '-6',
      three: '3',
      two: '2',
    });
  });

  test('深度合并', () => {
    const link = new LayerLink();

    link.assignLayer(0, { foo: { bar: '1', baz: '2' } });
    link.assignLayer(0, { foo: { bar: '2' } });
    link.assignLayer(1, { foo: { bazz: '3' } });
    link.assignLayer(1, { bay: { header: 'wk', nested: {} } });
    link.assignLayer(0, { bay: { footer: 'wk', header: 'yk' } });

    expect(link.flattenLayer()).toEqual({
      bay: {
        footer: 'wk',
        header: 'yk',
        nested: {},
      },
      foo: {
        bar: '2',
        baz: '2',
        bazz: '3',
      },
    });
  });
});
