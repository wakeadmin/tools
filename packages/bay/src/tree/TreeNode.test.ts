import { TreeNode } from './TreeNode';
import { MenuType, TreeNodeRaw } from './types';

describe('基本结构测试', () => {
  const data0: TreeNodeRaw = {
    id: '9',
    parentId: '0',
    identifier: 'root',
    name: 'root',
    url: '/root',
    level: 0,
    isMenu: 1,
  };

  const data1: TreeNodeRaw = {
    id: '1',
    parentId: '9',
    identifier: 'create',
    name: 'create',
    url: '/create/page',
    level: 1,
    isMenu: 1,
  };

  const data2: TreeNodeRaw = {
    id: '2',
    parentId: '1',
    identifier: 'delete',
    name: 'delete',
    url: '/create/page/delete',
    level: 2,
    isMenu: 1,
  };

  test('基本属性', () => {
    const node = new TreeNode(data1);

    expect(node.isRoot).toBe(true);
    expect(node.isLeaf).toBe(true);
    expect(node.root).toBe(node);
    expect(node.parent).toBe(undefined);
    expect(node.uid).toBe(data1.id);
    expect(node.identifier).toBe(data1.identifier);
    expect(node.name).toBe(data1.name);
    expect(node.type).toBe(MenuType.Menu);
    expect(node.level).toBe(data1.level);

    expect(node.url).toBe('/create/page');
    expect(node.matchKey).toBe('/create/page#/');
  });

  test('基本方法', () => {
    const root = new TreeNode(data0);
    const child = new TreeNode(data1, root);
    const grandchild = new TreeNode(data2, child);

    root.children = [child];
    child.children = [grandchild];

    expect(root.contains(child)).toBe(true);
    expect(root.contains(root)).toBe(true);
    expect(root.contains(grandchild)).toBe(true);

    expect(child.identifierPath).toBe('root.create');
    expect(grandchild.identifierPath).toBe('root.create.delete');

    expect(root.isLeaf).toBe(false);
    expect(root.isRoot).toBe(true);
    expect(child.isLeaf).toBe(false);
    expect(child.isRoot).toBe(false);
    expect(grandchild.isLeaf).toBe(true);
    expect(grandchild.isRoot).toBe(false);

    expect(child.url).toBe('/root#/create/page');
    expect(child.matchKey).toBe('/root#/create/page');

    // 激活
    grandchild._lightUp(true);

    expect(grandchild.active).toBe(true);
    expect(grandchild.exactMatched).toBe(true);
    expect(child.active).toBe(true);
    expect(child.exactMatched).toBe(false);
    expect(child.collapsed).toBe(false);
    expect(root.active).toBe(true);
    expect(root.exactMatched).toBe(false);

    // 取消激活
    grandchild._extinguish();
    expect(grandchild.active).toBe(false);
    expect(child.active).toBe(false);
    expect(root.active).toBe(false);
  });
});

describe('路由转换测试', () => {
  test('一级菜单', () => {
    const data0: TreeNodeRaw = {
      id: '9',
      parentId: '0',
      identifier: 'root',
      name: 'root',
      url: '/root',
      level: 0,
      isMenu: 1,
    };

    const data1: TreeNodeRaw = {
      id: '1',
      parentId: '9',
      identifier: 'second',
      name: 'second',
      url: '/second',
      level: 1,
      isMenu: 1,
    };

    const data2: TreeNodeRaw = {
      id: '2',
      parentId: '1',
      identifier: 'third',
      name: 'third',
      url: '/third',
      level: 2,
      isMenu: 1,
    };

    const root = new TreeNode(data0);
    const child = new TreeNode(data1, root);
    const grandchild = new TreeNode(data2, child);

    root.children = [child];
    child.children = [grandchild];

    expect(root.url).toBe('/root');
    expect(root.routeType).toBe('main');

    expect(child.url).toBe('/root#/second');
    expect(child.routeType).toBe('subRoute');

    expect(grandchild.url).toBe('/root#/third');
    expect(grandchild.routeType).toBe('subRoute');
  });

  test('一级菜单为分组', () => {
    const data0: TreeNodeRaw = {
      id: '9',
      parentId: '0',
      identifier: 'root',
      name: 'root',
      level: 0,
      isMenu: 1,
    };

    const data1: TreeNodeRaw = {
      id: '1',
      parentId: '9',
      identifier: 'second',
      name: 'second',
      url: '/second',
      level: 1,
      isMenu: 1,
    };

    const data2: TreeNodeRaw = {
      id: '2',
      parentId: '1',
      identifier: 'third',
      name: 'third',
      url: '/third',
      level: 2,
      isMenu: 1,
    };

    const root = new TreeNode(data0);
    const child = new TreeNode(data1, root);
    const grandchild = new TreeNode(data2, child);

    root.children = [child];
    child.children = [grandchild];

    expect(child.url).toBe('/second');
    expect(child.routeType).toBe('main');

    expect(grandchild.url).toBe('/second#/third');
    expect(grandchild.routeType).toBe('subRoute');
  });

  test('@外挂路由', () => {
    const data0: TreeNodeRaw = {
      id: '9',
      parentId: '0',
      identifier: 'root',
      name: 'root',
      level: 0,
      isMenu: 1,
    };

    const data1: TreeNodeRaw = {
      id: '1',
      parentId: '9',
      identifier: 'second',
      name: 'second',
      url: '@second#hello',
      level: 1,
      isMenu: 1,
    };

    const data2: TreeNodeRaw = {
      id: '2',
      parentId: '1',
      identifier: 'third',
      name: 'third',
      url: '/third',
      level: 2,
      isMenu: 1,
    };

    const root = new TreeNode(data0);
    const child = new TreeNode(data1, root);
    const grandchild = new TreeNode(data2, child);

    root.children = [child];
    child.children = [grandchild];

    expect(child.url).toBe('/second#/hello');
    expect(child.routeType).toBe('outside');

    expect(grandchild.url).toBe('/second#/third');
    expect(grandchild.routeType).toBe('subRoute');
  });
});
