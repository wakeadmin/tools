const pkg = require('../package.json');
const publish = require('../../../scripts/shared-docker-publish');
const clean = require('../../../scripts/shared-docker-clean');

const { IMAGE_NAME, PLAYGROUND_IMAGE_NAME } = require('./shared');

publish(IMAGE_NAME, pkg.version);
publish(PLAYGROUND_IMAGE_NAME, pkg.version);

clean(IMAGE_NAME);
clean(PLAYGROUND_IMAGE_NAME);
