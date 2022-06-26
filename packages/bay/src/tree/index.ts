import { configureDI } from '@wakeadmin/framework';
import { MenuModel } from './MenuModel';
import { MenuRepo } from './MenuRepo';

configureDI(({ registerSingletonClass }) => {
  registerSingletonClass('DI.bay.MenuModel', MenuModel);
  registerSingletonClass('DI.bay.MenuRepo', MenuRepo);
});

export * from './MenuModel';
export * from './types';
export * from './TreeNode';
export * from './TreeContainer';
