/**
 * 全局 event bus, 可以用于应用间通信
 * 这些事件通常也可以通过全局的 document CustomEvent 监听
 */
import { EventEmitter } from '@wakeadmin/utils';

export class Emitter extends EventEmitter {
  override emit(eventName: string | symbol, ...args: any[]): boolean {
    const event = new CustomEvent(eventName as string, { detail: args });

    window.document.dispatchEvent(event);

    return super.emit(eventName, ...args);
  }
}

export const eventBus = new Emitter();
