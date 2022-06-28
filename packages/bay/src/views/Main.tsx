import { Suspense } from 'vue';
import { Header } from '@/components/Header';

export const Main = () => {
  return (
    <Suspense>
      {{
        default: () => (
          <div class="bay">
            <Header />
          </div>
        ),
        fallback: () => <div>loading...</div>,
      }}
    </Suspense>
  );
};

export default Main;
