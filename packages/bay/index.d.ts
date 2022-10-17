import * as assets from './types/assets';
import * as bayMethods from './types/bay-methods';
import * as components from './types/components';
import * as eventBus from './types/event-bus';
import * as headerDropdown from './types/header-dropdown';
import * as i18n from './types/i18n';
import * as mappChild from './types/mapp-child';
import * as permissions from './types/permissions';
import * as plugin from './types/plugin';

declare const exposes: typeof assets &
  typeof bayMethods &
  typeof components &
  typeof eventBus &
  typeof headerDropdown &
  typeof i18n &
  typeof mappChild &
  typeof permissions &
  typeof plugin;

export default exposes;
