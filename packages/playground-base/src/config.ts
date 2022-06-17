import { RegistrableApp } from 'qiankun';

/**
 * 默认注册的微应用
 */
const apps: RegistrableApp<any>[] =
  process.env.NODE_ENV !== 'production'
    ? [
        {
          name: 'vue2',
          activeRule: '/vue2',
          entry: '//localhost:13502',
          container: '#root',
        },
        {
          name: 'vue3',
          activeRule: '/vue3',
          entry: '//localhost:17355',
          container: '#root',
        },
      ]
    : [
        {
          name: 'vue2',
          // 将自动追加基座 base
          activeRule: '/vue2',
          // 如果是相对路径, 将自动追加基座base
          entry: '__apps__/vue2',
          container: '#root',
        },
        {
          name: 'vue3',
          activeRule: '/vue3',
          entry: '__apps__/vue3',
          container: '#root',
        },
      ];

export const getDefaultConfig = () => {
  return apps.slice(0);
};

/**
 * 获取配置
 */
export const getConfig = (): RegistrableApp<any>[] => {
  const localConfigInStorage = localStorage.getItem('__local_config__');

  if (localConfigInStorage != null) {
    return JSON.parse(localConfigInStorage);
  } else {
    return getDefaultConfig();
  }
};

export const saveLocalConfig = (config: RegistrableApp<any>[]) => {
  localStorage.setItem('__local_config__', JSON.stringify(config));
};
