import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { parseLandingData } from '../Bay/route';
import { useBay } from '../hooks';

const DefaultLandingImplement = () => {
  return <div>TODO: 落地页未实现</div>;
};

export const LandingPage = defineComponent({
  name: 'MappLandingPage',
  setup() {
    const bay = useBay();
    const route = useRoute();
    const LandingPageImplementation = bay.options.pages?.landing ?? DefaultLandingImplement;

    return () => {
      const data = parseLandingData(route.query);

      return <LandingPageImplementation data={data} />;
    };
  },
});
