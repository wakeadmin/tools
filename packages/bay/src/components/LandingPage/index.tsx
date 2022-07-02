/* eslint-disable vue/no-setup-props-destructure */
/* eslint-disable vue/one-component-per-file */
/**
 * 落地页
 */
import { defineComponent, PropType, Suspense } from 'vue';
import { ElMessageBox } from 'element-plus';

import { useBayModel } from '@/hooks';
import { LandingProps } from '@/types';

import './index.scss';

const LANDING_PROPS = {
  data: {
    type: Object as PropType<LandingProps>,
    required: true,
    // fuck vue, 垃圾的 ts 使用体验
    default: null,
  },
};

const LandingNavigator = defineComponent({
  name: 'BayLadingNavigator',
  props: LANDING_PROPS,
  async setup(props) {
    // 需要等待 bay 加载完成才能进行可靠的跳转
    const bay = useBayModel();

    await bay.initialize();

    if (bay.error) {
      ElMessageBox.confirm(`应用启动失败: ${bay.error.message}, 请稍后重试`, '抱歉', {
        type: 'error',
        confirmButtonText: '重试',
        cancelButtonText: '返回',
      })
        .then(() => {
          bay.retry();
        })
        .catch(() => {
          window.history.back();
        });
    } else {
      // 跳转
      const data = props.data;
      switch (data.type) {
        case 'app':
          bay.openByAppName(data.name, data.options);
          break;
        case 'app-alias':
          bay.openByAppAlias(data.alias, data.options);
          break;
        case 'main':
          bay.openMain(data.options);
          break;
        case 'identifier':
          bay.openByIdentifierPath(data.path, data.options);
          break;
        case 'url':
          bay.openUrl(data.url);
          break;
        default:
          console.error(`[bay] 未知落地页参数`, data);
          // 默认打开首页
          bay.openMain();
      }
    }

    return () => null;
  },
});

export const LandingPage = defineComponent({
  name: 'BayLanding',
  props: LANDING_PROPS,
  render() {
    return (
      <Suspense
        v-slots={{
          fallback: () => {
            return <div class="bay-landing">跳转中...</div>;
          },
        }}
      >
        <LandingNavigator {...this.$props} />
      </Suspense>
    );
  },
});
