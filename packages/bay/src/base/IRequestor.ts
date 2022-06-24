import {
  request,
  requestByGet,
  requestByPost,
  requestPagination,
  requestPaginationByGet,
  requestPaginationByPost,
} from '@wakeapp/wakedata-backend';

declare global {
  interface DIMapper {
    /**
     * 接口请求器
     */
    'DI.bay.requestor': IRequestor;
  }

  interface WakedataRequestMeta {
    /**
     * 显示全局 错误信息, 默认为 false
     * 不建议使用，建议只在视图层展示错误信息，并让用户重试
     * 这个只为了向下兼容
     */
    showError?: boolean;

    /**
     * 显示全局 错误信息, 默认为 false
     * 不建议使用，建议只在视图层展示错误信息，并让用户重试
     * 这个只为了向下兼容
     */
    showLoading?: boolean;

    /**
     * 是否要等待登录完成，默认为 false
     */
    needAuth?: boolean;
  }
}

/**
 * 接口请求器
 */
export interface IRequestor {
  request: typeof request;
  requestByGet: typeof requestByGet;
  requestByPost: typeof requestByPost;
  requestPagination: typeof requestPagination;
  requestPaginationByGet: typeof requestPaginationByGet;
  requestPaginationByPost: typeof requestPaginationByPost;
}
