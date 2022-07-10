import { defineComponent } from 'vue';

import { useBay } from '../hooks';
import { DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX } from '../constants';

const DefaultIndependentPageImplementation = () => {
  return <div class="independent" id={DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX}></div>;
};

export const IndependentPage = defineComponent({
  name: 'MappIndependentPage',
  setup() {
    const bay = useBay();
    const IndependentPageImplementation = bay.options.pages?.independent ?? DefaultIndependentPageImplementation;

    return () => <IndependentPageImplementation />;
  },
});
