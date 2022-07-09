#!/usr/bin/env bash

# 规范检查

set -e
set -x

env
node -v

echo "开始规范化检查"

npm i -g pnpm
pnpm install

# 构建
pnpm run -r --filter=!playground-* build

# eslint 检查
pnpm wkstd gerrit-check '{"typescriptEnable": false}'

# 单元测试
pnpm run -r --filter=!playground-* test --passWithNoTests --silent
