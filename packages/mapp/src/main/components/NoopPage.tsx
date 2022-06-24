import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export const NoopPage = defineComponent(() => () => <RouterView />);
