import { EventEmitter } from '@wakeadmin/utils';

/**
 * 创建事件总线
 * @returns
 */
export function createEventBus() {
  return new EventEmitter();
}
