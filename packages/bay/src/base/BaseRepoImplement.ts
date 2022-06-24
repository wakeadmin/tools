import { inject, injectable } from '@wakeadmin/framework';
import type { IRequestor } from './IRequestor';

/**
 * Repo 基类
 */
@injectable()
export class BaseRepoImplement {
  /**
   * 后端请求器
   */
  @inject('DI.bay.requestor')
  protected requestor!: IRequestor;
}
