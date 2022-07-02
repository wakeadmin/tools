/* eslint-disable vue/one-component-per-file */
/**
 * 错误页面
 */
import { useAsset } from '@/hooks';
import { defineComponent } from 'vue';
import style from './ErrorPage.scss?inline';

import DEFAULT_ERROR_IMAGE from './default-error.svg';
import DEFAULT_ERROR_404_IMAGE from './default-404.svg';
import DEFAULT_ERROR_403_IMAGE from './default-403.svg';

const ERROR_PAGE_PROPS = {
  /**
   * 描述
   */
  description: {
    type: String,
    // 默认为暂无数据
    required: undefined,
  },
  /**
   * 图片地址
   */
  image: {
    type: String,
    default: undefined,
  },
};

export const ErrorPage = defineComponent({
  name: 'BayLayoutErrorPage',
  styles: [style],
  props: ERROR_PAGE_PROPS,
  setup(props) {
    const defaultImage = useAsset('IMG_BAY_ERROR', DEFAULT_ERROR_IMAGE);

    return () => {
      const image = props.image ?? defaultImage.value;
      return (
        <div class="bay-layout-error">
          <div class="bay-layout-error__image">
            <slot name="image">
              <img src={image} alt="error image" />
            </slot>
          </div>
          <div class="bay-layout-error__desc">
            <slot name="description">{props.description}</slot>
          </div>
          <div class="bay-layout-error__extra">
            <slot></slot>
          </div>
        </div>
      );
    };
  },
});

/**
 * 404  错误页面
 */
export const ErrorPageNotFound = defineComponent({
  name: 'BayLayoutErrorPageNotFound',
  styles: [style],
  props: ERROR_PAGE_PROPS,
  setup(props) {
    const description = useAsset('TXT_BAY_404', '抱歉，你访问的页面丢失了');
    const image = useAsset('IMG_BAY_ERROR_404', DEFAULT_ERROR_404_IMAGE);

    return () => {
      return <ErrorPage description={props.description ?? description.value} image={props.image ?? image.value} />;
    };
  },
});

/**
 * 404  错误页面
 */
export const ErrorPageForbidden = defineComponent({
  name: 'BayLayoutErrorPageForbidden',
  styles: [style],
  props: ERROR_PAGE_PROPS,
  setup(props) {
    const description = useAsset('TXT_BAY_403', '抱歉，暂无访问权限');
    const image = useAsset('IMG_BAY_ERROR_403', DEFAULT_ERROR_403_IMAGE);

    return () => {
      return <ErrorPage description={props.description ?? description.value} image={props.image ?? image.value} />;
    };
  },
});
