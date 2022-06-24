import { TreeNode } from './TreeNode';
import { MenuType, TreeNodeRaw } from './types';

const root: TreeNodeRaw = {
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
  const node = new TreeNode(root);
  const child = new TreeNode(data1, node);

  node.children = [child];

  expect(node.contains(child)).toBe(true);
  expect(node.contains(node)).toBe(true);

  expect(child.identifierPath).toBe('root.create');
  expect(node.isLeaf).toBe(false);
  expect(node.isRoot).toBe(true);
  expect(child.isLeaf).toBe(true);

  expect(child.url).toBe('/root#/create/page');
  expect(child.matchKey).toBe('/root#/create/page');

  // 激活
  child._lightUp(true);

  expect(child.active).toBe(true);
  expect(child.exactMatched).toBe(true);
  expect(child.collapsed).toBe(false);
  expect(node.active).toBe(true);
  expect(node.exactMatched).toBe(false);

  // 取消激活
  child._extinguish();
  expect(child.active).toBe(false);
  expect(node.active).toBe(false);
});
