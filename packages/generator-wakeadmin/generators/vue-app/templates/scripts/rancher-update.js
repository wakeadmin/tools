const { update } = require('@wakeadmin/docker-build');
const { PRODUCTION, DOCKER_IMAGE_NAME, DOCKER_VERSION, WORKLOAD } = require('./shared');

// Rancher 项目名称
const PROJECT = process.env.PROJECT;

if (!PRODUCTION && PROJECT) {
  update(DOCKER_IMAGE_NAME, DOCKER_VERSION, {
    project: PROJECT,
    // 工作负载固定为 wakeadmin-apps, 详见规范：https://wakeadmin.wakedata.com/standard/docker.html
    workload: 'wakeadmin-apps',
    // 子应用使用 sidecar 挂载
    container: '<%= name %>'
  });
}
