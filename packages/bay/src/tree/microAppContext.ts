import { getInject } from '@wakeadmin/framework';
import { MicroApp } from '@wakeadmin/mapp';

let app: MicroApp | null;

export function getMicroAppContext(): MicroApp | null {
  return app;
}

/**
 * 设置当前微应用 app 作用域
 * @param route
 */
export function setMicroAppContext(route: string, runner: () => void) {
  let executed = false;
  const prevApp = app;
  try {
    const bay = getInject('DI.bay');
    const matched = bay.getAppByRoute(route);
    app = matched;

    executed = true;
    runner();
  } catch (err) {
    console.error(`[bay] setCurrentMicroAppContext failed: `, err);
    if (!executed) {
      runner();
    }
  } finally {
    app = prevApp;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function __setMicroAppContextJustForTest(context: MicroApp | null) {
  app = context;
}
