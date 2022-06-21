import { useInject } from '@wakeadmin/framework';
import { declareComponent } from '@wakeadmin/h';
import { unref } from 'vue';

export const JSXTest = declareComponent({
  setup() {
    const counter = unref(useInject('DI.demo.Counter'));

    return () => <div onClick={counter.add}>{counter.count}</div>;
  },
});
