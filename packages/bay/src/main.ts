import { configureBackend, configureBay } from './configure';
import './tree';

const bay = configureBay();

configureBackend();

bay.mount();
