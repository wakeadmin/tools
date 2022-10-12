const pkg = require('../package.json');
const publish = require('../../../scripts/shared-docker-publish');
const clean = require('../../../scripts/shared-docker-clean');

publish('wkfe/playground-vue2', pkg.version);
clean('wkfe/playground-vue2');
