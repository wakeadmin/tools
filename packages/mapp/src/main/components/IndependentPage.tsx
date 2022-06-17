/** @jsx h */
import { h } from '@wakeadmin/h';
import { useBay } from '../hooks';
import { DEFAULT_ROOT_WITHOUT_PREFIX } from '../constants';

const DefaultIndependentPageImplementation = () => {
  return <div class="independent" id={DEFAULT_ROOT_WITHOUT_PREFIX}></div>;
};

export const IndependentPage = () => {
  const bay = useBay();
  const IndependentPageImplementation = bay.options.pages?.independent ?? DefaultIndependentPageImplementation;

  return <IndependentPageImplementation />;
};
