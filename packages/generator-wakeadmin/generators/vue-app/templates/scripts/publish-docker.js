const { publish, clean } = require('@wakeadmin/docker-build');
const pkg = require('../package.json');

publish(pkg.imageName, pkg.version);
clean(pkg.imageName);
