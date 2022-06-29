import { normalizeApps } from './options';

test('normalizeApps', () => {
  expect(normalizeApps('/base', [])).toEqual([]);

  expect(() =>
    normalizeApps('/base', [
      { name: 'foo', entry: '/', activeRule: '/' },
      { name: 'foo', entry: '/', activeRule: '/' },
    ])
  ).toThrowError('[mapp] 微应用名称重复: foo');

  expect(() =>
    normalizeApps('/base', [
      { name: 'foo', entry: '/foo', activeRule: '/' },
      { name: 'bar', entry: '/bar', activeRule: '/' },
    ])
  ).toThrowError('[mapp] 微应用 activeRule 重复: bar /base/');

  // without base
  expect(
    normalizeApps('/', [
      {
        name: '1',
        // 会加上 base
        activeRule: '/1',
        // 不会修改
        entry: 'http://localhost',
      },
      {
        name: '2',
        // 会加上 base
        activeRule: '/2',
        // 不会修改
        entry: '/',
        container: '#app',
      },
      {
        name: '3',
        // 已经配置了 base
        activeRule: '/base/3',
        // 不会修改
        entry: '//localhost',
      },
      {
        name: '4',
        // 已经配置了 base
        activeRule: '/4',
        entry: 'app',
      },
    ])
  ).toEqual([
    {
      name: '1',
      activeRule: '/1',
      activeRuleRaw: '/1',
      entry: 'http://localhost',
      // 默认值
      container: '#root',
    },
    {
      name: '2',
      // 会加上 base
      activeRule: '/2',
      activeRuleRaw: '/2',
      // 不会修改
      entry: '/',
      container: '#app',
    },
    {
      name: '3',
      // 已经配置了 base
      activeRule: '/base/3',
      activeRuleRaw: '/base/3',
      // 不会修改
      entry: '//localhost',
      container: '#root',
    },
    {
      name: '4',
      // 已经配置了 base
      activeRule: '/4',
      activeRuleRaw: '/4',
      entry: '/app',
      container: '#root',
    },
  ]);

  expect(
    normalizeApps('/base', [
      {
        name: '1',
        // 会加上 base
        activeRule: '/1',
        // 不会修改
        entry: 'http://localhost',
      },
      {
        name: '2',
        // 会加上 base
        activeRule: '/2',
        // 不会修改
        entry: '/',
        container: '#app',
      },
      {
        name: '3',
        // 已经配置了 base
        activeRule: '/base/3',
        // 不会修改
        entry: '//localhost',
      },
      {
        name: '4',
        // 已经配置了 base
        activeRule: '/4',
        entry: 'app',
      },
    ])
  ).toEqual([
    {
      name: '1',
      activeRule: '/base/1',
      activeRuleRaw: '/1',
      entry: 'http://localhost',
      // 默认值
      container: '#root',
    },
    {
      name: '2',
      // 会加上 base
      activeRule: '/base/2',
      activeRuleRaw: '/2',
      // 不会修改
      entry: '/',
      container: '#app',
    },
    {
      name: '3',
      // 已经配置了 base
      activeRule: '/base/3',
      activeRuleRaw: '/3',
      // 不会修改
      entry: '//localhost',
      container: '#root',
    },
    {
      name: '4',
      // 已经配置了 base
      activeRule: '/base/4',
      activeRuleRaw: '/4',
      entry: '/base/app',
      container: '#root',
    },
  ]);
});
