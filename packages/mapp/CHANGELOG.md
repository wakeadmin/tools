# @wakeadmin/mapp

## 0.4.0

### Minor Changes

- 剥离代码到 mapp-child, mapp-shared, 当前该库只处理基座相关内容

- Updated dependencies
  - @wakeadmin/utils@0.1.4
  - @wakeadmin/h@0.2.10

## 0.3.2

### Patch Changes

- 更新依赖
- Updated dependencies
  - @wakeadmin/h@0.2.9
  - @wakeadmin/utils@0.1.3

## 0.3.1

### Patch Changes

- 支持 beforeEnterMain 返回重定向路由

## 0.3.0

### Minor Changes

- error、landing 等内置页面统一使用 \_\_ 前缀

### Patch Changes

- Updated dependencies
  - @wakeadmin/h@0.2.1

## 0.2.3

### Patch Changes

- Updated dependencies
  - @wakeadmin/h@0.2.0

## 0.2.2

### Patch Changes

- 应用加载失败使用 console.error 提示

## 0.2.1

### Patch Changes

- 修复子应用错误状态没有识别挂载错误的场景

## 0.2.0

### Minor Changes

- activeRule 支持数组形式; 支持 history 模式

## 0.1.2

### Patch Changes

- 暴露子应用加载状态

## 0.1.1

### Patch Changes

- 新增 createMicroApp 方法，不再依赖子应用的导出方式，直接挂载在 window 对象上
