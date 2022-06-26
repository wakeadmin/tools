import {
  request,
  requestByGet,
  requestByPost,
  requestPagination,
  requestPaginationByGet,
  requestPaginationByPost,
} from '@wakeapp/wakedata-backend';
import { configureDI } from '@wakeadmin/framework';
import { PromiseQueue } from './PromiseQueue';

configureDI(({ registerSingletonCreator, registerClass }) => {
  registerClass('DI.bay.promiseQueue', PromiseQueue);

  // 注册接口请求器
  registerSingletonCreator('DI.bay.requestor', () => {
    return {
      request,
      requestByGet,
      requestByPost,
      requestPagination,
      requestPaginationByGet,
      requestPaginationByPost,
    };
  });

  // promise 并发请求队列
});

export * from './BaseRepoImplement';
export * from './PromiseQueue';
