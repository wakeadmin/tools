import { useBay } from '../hooks';
import { DEFAULT_ROOT_WITHOUT_PREFIX } from '../constants';

const DefaultMainPageImplementation = () => {
  return <div class="main" id={DEFAULT_ROOT_WITHOUT_PREFIX}></div>;
};

export const MainPage = () => {
  const bay = useBay();
  const MainPageImplementation = bay.options.pages?.main ?? DefaultMainPageImplementation;

  return <MainPageImplementation />;
};
