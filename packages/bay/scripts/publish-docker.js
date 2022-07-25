const pkg = require('../package.json');
const publish = require('../../../scripts/shared-docker-publish');
const clean = require('../../../scripts/shared-docker-clean');

publish('wkfe/bay', pkg.version);
clean('wkfe/bay');
