/**
 * 全局 event bus, 可以用于应用间通信
 * 这些事件通常也可以通过全局的 document CustomEvent 监听
 */
import { EventEmitter } from '@wakeadmin/utils';

export declare const eventBus: EventEmitter;
