/**
 * 利用原型链将 localeMessage 按照优先级进行排序
 */
import { addHiddenProp, merge } from '@wakeadmin/utils';

const ManageStore = Symbol('LayerManage');

interface Manage {
  layer: number;
  next?: LayerLike;
}

interface LayerLike {
  [ManageStore]: Manage;
  [key: string]: unknown;
}

function createManage(layer: number) {
  return { layer };
}

function createLayer(layer: number, init: object): LayerLike {
  const value = init ?? {};
  addHiddenProp(value, ManageStore, createManage(layer));

  // 转换为响应式代码
  return value as LayerLike;
}

function getManage(value: LayerLike) {
  return value[ManageStore];
}

/**
 * 拍平分层
 * @param layer
 * @returns
 */

export class LayerLink {
  private head: LayerLike;

  private indexByLayer: Map<number, LayerLike> = new Map();

  get value() {
    return this.head;
  }

  constructor() {
    this.head = createLayer(0, {});
    this.indexByLayer.set(0, this.head);
  }

  assignLayer(layer: number, value: object) {
    if (layer < 0) {
      throw new Error('层数不能低于 0');
    }

    const layerInstance = this.insertLayer(layer);

    // 深度合并
    merge(layerInstance, value);
  }

  flattenLayer(): object {
    const layers: LayerLink[] = [];

    let current: any = this.head;
    while (current && current !== Object.prototype) {
      if (getManage(current)) {
        layers.unshift(current);
      }

      current = Object.getPrototypeOf(current);
    }

    if (layers.length) {
      const result = {};
      for (const item of layers) {
        merge(result, item);
      }

      return result;
    }

    return {};
  }

  private insertLayer(value: number) {
    if (this.indexByLayer.has(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.indexByLayer.get(value)!;
    }

    const layer = createLayer(value, {});

    // 查找注入点
    let head: LayerLike | undefined = this.head;
    let prev: LayerLike = this.head;

    while (head) {
      // 查找
      const manage = getManage(head);

      if (manage.layer >= value) {
        // 找到前继节点
        break;
      }

      prev = head;
      head = manage.next;
    }

    const prevManage = getManage(prev);
    const layerMange = getManage(layer);
    const next = prevManage.next;

    prevManage.next = layer;

    Object.setPrototypeOf(prev, layer);

    if (next) {
      layerMange.next = next;

      Object.setPrototypeOf(layer, next);
    }

    this.indexByLayer.set(value, layer);

    return layer;
  }
}
