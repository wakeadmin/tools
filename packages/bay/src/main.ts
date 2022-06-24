import { configureBackend, configureBay } from './configure';
import './menu';

const bay = configureBay();

configureBackend();

bay.mount();
