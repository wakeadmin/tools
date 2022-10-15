// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Sector = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSector',
  inheritAttrs: true,
  setup() {
    const vm = getCurrentInstance()?.proxy;
    return () => {
      let fallthroughProps: any;

      if (isVue2) {
        fallthroughProps = {
          // @ts-ignore
          on: vm?.$listeners,
        };
      }
      return (
        <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
          <path d="M489.664 174.176v359.936h359.36v33.184C848.992 784.192 673.28 960 456.48 960S64 784.192 64 567.296c0-209.632 164.448-381.536 372.544-392.16l9.92-.384 43.2-.576zm-66.336 68.48-2.624.256a326.336 326.336 0 0 0-290.368 324.384c0 180.224 146.016 326.336 326.176 326.336 164.864 0 301.152-122.4 323.072-281.28l1.088-8.896.288-2.976H423.328V242.656zM567.04 64c209.536 0 381.344 164.512 392 372.736l.352 9.92.576 43.2h-426.08V64h33.184zm33.152 68.032v291.456h291.296l-.224-2.592a326.4 326.4 0 0 0-278.912-287.392l-9.216-1.152-2.944-.32z" />
        </svg>
      );
    };
  },
});
