import { AssetFilter } from './exclude-asset';

test('asset filter', () => {
  const f = new AssetFilter();
  f.addFiler([
    'baidu.com',
    /google/,
    src => {
      return src.includes('wakedata');
    },
  ]);
  f.addFiler('test');

  expect(f.filter('www.baidu.com')).toBe(true);
  expect(f.filter('google.com')).toBe(true);
  expect(f.filter('wakedata.com')).toBe(true);
  expect(f.filter('test.com')).toBe(true);
  expect(f.filter('bobi.com')).toBe(false);
});
