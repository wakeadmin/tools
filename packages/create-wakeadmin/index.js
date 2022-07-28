#!/usr/bin/env node
import yeoman from 'yeoman-environment';
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

const env = yeoman.createEnv();
const require = createRequire(import.meta.url);
env.register(require.resolve('generator-wakeadmin'));

if (process.argv.length < 3) {
  console.log(`请指定应用名`);

  process.exit(-1);
}

const project = path.join(process.cwd(), process.argv[2]);

if (!fs.existsSync(project)) {
  fs.mkdirSync(project, { recursive: true });
}

env.run('wakeadmin:app', { destinationRoot: project });
