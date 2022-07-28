#!/usr/bin/env bash

set -e
set -x

# 容器构建
# 需要提供以下参数
# DOCKER_USER docker 用户
# DOCKER_PASSWORD docker 用户密码

if [ "$STAGE" = 'PRODUCTION' ]; then
  export DOCKER_SERVER=ccr.ccs.tencentyun.com
else
  export DOCKER_SERVER=172.26.59.200
fi

env
node -v

npm i -g pnpm
pnpm -v

# 构建静态资源
pnpm build

# 构建镜像
pnpm run build:docker

# 发布
pnpm run publish:docker
