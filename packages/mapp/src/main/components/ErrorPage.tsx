import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { ErrorPageProps } from '../../types';
import { useBay } from '../hooks';

export const DefaultErrorPageImplementation = (props: ErrorPageProps) => {
  return <div>error page</div>;
};

export const ErrorPage = defineComponent({
  name: 'MappErrorPage',
  setup() {
    const route = useRoute();
    const bay = useBay();
    const ErrorPageImplementation = bay.options.pages?.error ?? DefaultErrorPageImplementation;

    return () => <ErrorPageImplementation {...(route.query as ErrorPageProps)} />;
  },
});
