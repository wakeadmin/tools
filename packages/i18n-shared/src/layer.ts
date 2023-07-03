/**
 * 链表将 localeMessage 按照优先级进行排序
 */
import { cloneDeep, merge } from '@wakeadmin/utils';

/**
 * 拍平分层
 * @param layer
 * @returns
 */

export class LayerLink {
  private indexByLayer: Map<number, Record<string, any>> = new Map();

  assignLayer(layer: number, value: object) {
    if (layer < 0) {
      throw new Error('层数不能低于 0');
    }

    let layerInstance = this.indexByLayer.get(layer);

    if (layerInstance == null) {
      layerInstance = cloneDeep(value);
      this.indexByLayer.set(layer, layerInstance);
    } else {
      // 深度合并
      merge(layerInstance, value);
    }
  }

  flattenLayer(): object {
    const layers = Array.from(this.indexByLayer.entries())
      .sort((a, b) => b[0] - a[0])
      .map(i => i[1]);

    if (layers.length) {
      const result = {};
      for (const item of layers) {
        merge(result, item);
      }

      return result;
    }

    return {};
  }
}
