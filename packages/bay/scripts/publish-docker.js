const pkg = require('../package.json');
const publish = require('../../../scripts/shared-docker-publish');

publish('wkfe/bay', pkg.version);
