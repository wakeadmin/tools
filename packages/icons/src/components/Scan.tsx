// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Scan = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgScan',
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
          <path d="M170.656 673.344v151.552c0 14.496 10.88 26.464 24.896 28.224l3.552.224 176.352-.032v68.256l-176.32.032a96.704 96.704 0 0 1-96.544-90.816l-.192-5.888V673.344h68.256zm750.944 3.2v148.352a96.704 96.704 0 0 1-90.816 96.512l-5.888.192-176.384-.032v-68.256h176.384a28.48 28.48 0 0 0 28.224-24.864l.224-3.552V676.544H921.6zm27.744-198.688c3.52 0 6.4 2.88 6.4 6.4v55.488a6.4 6.4 0 0 1-6.4 6.4H74.656a6.4 6.4 0 0 1-6.4-6.4v-55.488c0-3.52 2.88-6.4 6.4-6.4h874.688zM375.456 102.4v68.256h-176.32a28.48 28.48 0 0 0-28.256 24.896l-.224 3.552V355.84H102.4V199.104a96.704 96.704 0 0 1 90.816-96.512l5.888-.192h176.352zm449.44 0a96.704 96.704 0 0 1 96.512 90.816l.192 5.888v156.672h-68.256V199.104a28.48 28.48 0 0 0-24.896-28.224l-3.552-.224H648.512V102.4h176.384z" />
        </svg>
      );
    };
  },
});
