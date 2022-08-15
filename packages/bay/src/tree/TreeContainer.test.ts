/* eslint-disable @typescript-eslint/no-non-null-assertion */
import menus from './__fixture__/menu';
import { TreeContainer } from './TreeContainer';
import { TreeNode } from './TreeNode';

jest.mock('./microAppContext', () => ({
  getMicroAppContext() {
    return null;
  },
  setMicroAppContext(route: string, runner: Function) {
    runner();
  },
}));

describe('TreeContainer', () => {
  let warn: jest.MockInstance<any, any> = jest.spyOn(global.console, 'warn').mockImplementation(() => null);

  const container = new TreeContainer(menus);
  const getWarnings = () => warn.mock.calls.map(c => c[0]);
  const serializeNodes = (nodes: TreeNode[]) => nodes.map(node => node.identifierPath);

  describe('初始化', () => {
    test('索引警告信息', () => {
      expect(getWarnings()).toEqual([
        '[bay] 菜单类型的节点应该指定 url, 节点: 批量导出(company.company_mgr.store_manage.store_manage_export)',
        '[bay] 菜单类型的节点应该指定 url, 节点: 视频列表(marketing.materials.video.video_list)',
        '[bay] 菜单类型的节点应该指定 url, 节点: 音频列表(marketing.materials.audio.audio_list)',
        '[bay] 菜单类型的节点应该指定 url, 节点: PDF列表(marketing.materials.pdf.pdf_list)',
        '[bay] 菜单类型的节点应该指定 url, 节点: 删除(wkb.goods_available_mgr.available_list.available_manage.del_goods)',
        '[bay] 同一棵树下，存在重复的路由: /demo.html#/foo, 这可能导致路由匹配出现歧义，请检查菜单配置',
        '[bay] 存在重复的路由: /demo.html#/, 这可能导致路由匹配出现歧义，请检查菜单配置',
        '[bay] 全限定标识符冲突，请检查菜单配置：demo',
      ]);
    });

    test('入口页面收集', () => {
      expect(Array.from(container.entries.values())).toEqual([
        '/hello',
        '/console.html',
        '/dsp.html',
        '/ad.html',
        '/app.html',
        '/wkb.html',
        '/dmp.html',
        '/demo.html',
        '/outside',
        '/group1',
        '/group2',
      ]);
    });
  });

  describe('使用', () => {
    beforeEach(() => {
      warn.mockClear();
      container.clearFindCache();
      container.extinguish();
    });

    describe('查找', () => {
      describe('路由匹配', () => {
        test('冲突情况1, 不同树之间的冲突', () => {
          const result1 = container.findByRoute('/demo.html');

          expect(getWarnings()).toEqual(['[bay] 路由匹配存在冲突: /demo.html, 将就近匹配']);

          // 冲突情况匹配第一个
          expect(result1.result?.uid).toBe('fc8af4bc-6b13-4107-8e7d-a6066017909a-demo');
          expect(result1.exact).toBe(true);
        });

        test('冲突情况2, 同树之间的冲突', () => {
          const result1 = container.findByRoute('/demo.html#/foo');

          // 没有警告，因为在建立索引的时候就检查过了，优先级以 level 为准
          expect(getWarnings()).toEqual([]);

          // 冲突情况: 优先匹配 level 较大的
          expect(result1.result?.uid).toBe('fc8af4bc-6b13-4107-8e7d-a6066017909a-demo-foo-2');
          expect(result1.exact).toBe(true);
        });

        test('冲突情况3，优先匹配 active 的树', () => {
          const result1 = container.findByPullIdentifierPath('demo.baz');
          expect(result1.result).toBeDefined();

          // 激活
          container.lightUp(result1.result!);
          const result2 = container.findByRoute('/demo.html');

          // 优先激活 active 的树
          expect(result2.result?.uid).toBe('fc8af4bc-6b13-4107-8e7d-a6066017909a-demo-2');
          expect(result2.exact).toBe(true);
        });

        test('逐级裁剪匹配', () => {
          // 精确匹配
          // 会自动规范化之后再匹配
          const result1 = container.findByRoute('console.html#setting/wx/');
          expect(result1.result).toBeDefined();
          expect(result1.exact).toBe(true);
          expect(result1.result?.uid).toBe('6b9ce541-23a8-4d16-9a6c-99d83a4b0c5c');

          // 非精确
          const result2 = container.findByRoute('/console.html#/setting/wx/unknown');
          expect(result2.result).toBeDefined();
          expect(result2.exact).toBe(false); // 非精确
          expect(result2.result?.uid).toBe('6b9ce541-23a8-4d16-9a6c-99d83a4b0c5c');

          // path 也支持非精确匹配
          const result3 = container.findByRoute('/console.html/unknown');
          expect(result3.result).toBeDefined();
          expect(result3.exact).toBe(false); // 非精确
          expect(result3.result?.uid).toBe('3c3eb0a6-fa17-44ea-b8e3-584edc898cdd');

          const result4 = container.findByRoute('/console.html/unknown#/foo');
          expect(result4.result).toBeDefined();
          expect(result4.exact).toBe(false); // 非精确
          expect(result3.result?.uid).toBe('3c3eb0a6-fa17-44ea-b8e3-584edc898cdd');
        });

        test('未匹配情况', () => {
          const result1 = container.findByRoute('unknown.html');
          expect(result1.result).not.toBeDefined();
          expect(result1.exact).toBe(false);
          expect(getWarnings()).toEqual(['[bay] 路由匹配失败: unknown.html, 未找到匹配该节点的菜单节点']);
        });
      });

      describe('权限标识符路径匹配', () => {
        test('合法性检查', () => {
          expect(() => {
            container.findByIdentifierPath('');
          }).toThrowError('[bay] 权限标识符路径不合法: ');
        });

        test('精确匹配', () => {
          const result1 = container.findByIdentifierPath('company.wx_setting.wx_pay.payment_settings_show');
          expect(result1.result?.uid).toBe('d9a941d3-8704-4182-b151-3e7d4490f214');
          expect(result1.exact).toBe(true);
        });

        test('跨级别匹配', () => {
          const result1 = container.findByIdentifierPath('company.payment_settings_show');
          expect(result1.result?.uid).toBe('d9a941d3-8704-4182-b151-3e7d4490f214');
          expect(result1.exact).toBe(true);

          const result2 = container.findByIdentifierPath('company.wx_pay.payment_settings_show');
          expect(result2.result?.uid).toBe('d9a941d3-8704-4182-b151-3e7d4490f214');

          // 缓存
          const result3 = container.findByIdentifierPath('company.wx_pay.payment_settings_show');
          expect(result2).toBe(result3);
        });

        test('跨级别匹配冲突情况1: 下级节点冲突', () => {
          const result1 = container.findByIdentifierPath('demo.create');
          // 如果冲突会选择第一个结果
          expect(result1.result?.uid).toBe('fc8af4bc-6b13-4107-8e7d-a6066017909a-demo-foo-create');
          expect(result1.exact).toBe(false);
          expect(getWarnings()).toEqual([
            '[bay: 1001] 查找 demo.create 时， 存在多个节点匹配到同一个标识符: create, 请检查菜单配置或程序，避免标识符冲突. 默认会采用第一个作为结果',
          ]);
        });

        test('跨级别匹配冲突情况2: 根节点冲突', () => {
          const result1 = container.findByIdentifierPath('foo.create');
          // 如果冲突会选择第一个结果
          expect(result1.result?.uid).toBe('fc8af4bc-6b13-4107-8e7d-a6066017909a-demo-foo-create');
          expect(result1.exact).toBe(false);
          expect(getWarnings()).toEqual([
            '[bay: 1000] 查找 foo.create 时， 存在多个节点匹配到同一个标识符: foo, 请检查菜单配置或程序，避免标识符冲突. 默认会采用第一个作为结果',
          ]);
        });
      });

      describe('权限标识符上下文匹配', () => {
        test('未激活查找应该警告', () => {
          container.findByIdentifierUnderActiveContext('arc_normal_integral');
          expect(getWarnings()).toEqual(['[bay] 基于上下文查找节点失败，当前没有激活的上下文: arc_normal_integral']);
        });

        test('路径匹配应该警告', () => {
          const target = container.findByIdentifierUnderActiveContext('member_center.arc_normal_integral');
          expect(getWarnings()).toEqual([
            `[bay] 基于上下文查找节点时，不推荐使用'权限标识符路径'，这会使用查找效率更低的'路径查找方法': member_center.arc_normal_integral`,
          ]);
          expect(target.result).toBeDefined();
        });

        test('激活匹配', () => {
          // 激活
          const target = container.findByIdentifierPath('archives');
          expect(target.result?.uid).toBe('029453a6-b9a5-45e9-89f9-59245ecd5b5a');
          container.lightUp(target.result!);
          expect(container.activeNode).toBe(target.result);

          // 当前节点应该能匹配
          const currentNode = container.findByIdentifierUnderActiveContext('archives');
          expect(currentNode.result?.uid).toBe('029453a6-b9a5-45e9-89f9-59245ecd5b5a');
          expect(currentNode.exact).toBe(true);

          // 子节点应该能匹配
          const childNode = container.findByIdentifierUnderActiveContext('arc_normal_integral');
          expect(childNode.result?.uid).toBe('42e229f3-99f1-4afe-a334-e28526a1a7d0');
          expect(childNode.exact).toBe(true);

          // 父节点应该能够匹配
          const parent = container.findByIdentifierUnderActiveContext('member_center');
          expect(parent.result?.uid).toBe('6c16bb20-a0ec-4f7d-a63a-a02329e46753');
          expect(parent.exact).toBe(false);

          // 兄弟节点应该能够匹配
          const sibling = container.findByIdentifierUnderActiveContext('company_archives');
          expect(sibling.result?.uid).toBe('bccf58bf-6ecb-4b6a-bb26-9c52141a5795');
          expect(sibling.exact).toBe(false);

          // 叔伯节点应该能匹配
          const uncle = container.findByIdentifierUnderActiveContext('member_protocol');
          expect(uncle.result?.uid).toBe('adc64227-7748-4ba5-8eb2-c5ad0f8e8aff');
          expect(uncle.exact).toBe(false);
        });
      });
    });

    describe('菜单信息', () => {
      test('顶级菜单', () => {
        expect(serializeNodes(container.topMenus)).toEqual([
          'hello',
          'company',
          'marketing',
          'ad',
          'wkb',
          'customer',
          'demo',
          'group',
        ]);
        expect(serializeNodes(container.topButtons)).toEqual(['switchApp', 'demo']);
      });

      test('侧边栏菜单', () => {
        const result = container.findByIdentifierPath('sms_group');
        expect(result.result).toBeDefined();
        container.lightUp(result.result!);

        expect(serializeNodes(container.secondaryNodes)).toEqual([
          'marketing.message',
          'marketing.materials',
          'marketing.marketing_tools',
          'marketing.marketing_tools_create',
        ]);
        expect(serializeNodes(container.secondaryMenus)).toEqual([
          'marketing.message',
          'marketing.materials',
          'marketing.marketing_tools',
        ]);
      });

      test('四级菜单', () => {
        // 激活的是四级节点
        let result = container.findByIdentifierPath('sms_group');
        expect(result.result).toBeDefined();
        container.lightUp(result.result!);

        expect(serializeNodes(container.tabMenus)).toEqual([
          'marketing.message.sms.sms_group',
          'marketing.message.sms.sms_sign',
        ]);

        expect(container.activeSecondaryNode?.identifierPath).toBe('marketing.message.sms');

        // 激活的是三级节点
        result = container.findByIdentifierPath('marketing.message.sms');
        expect(result.result?.identifierPath).toBe('marketing.message.sms');
        container.lightUp(result.result!);

        expect(serializeNodes(container.tabMenus)).toEqual([
          'marketing.message.sms.sms_group',
          'marketing.message.sms.sms_sign',
        ]);
        expect(container.activeSecondaryNode?.identifierPath).toBe('marketing.message.sms');
      });

      test('四级菜单, 当激活的不包含四级菜单时, 返回空', () => {
        const result = container.findByIdentifierPath('message.template');
        expect(result.result).toBeDefined();
        container.lightUp(result.result!);

        expect(serializeNodes(container.tabMenus)).toEqual([]);
      });
    });
  });
});
