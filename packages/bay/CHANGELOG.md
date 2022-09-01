# @wakeadmin/bay

## 0.5.2

### Patch Changes

- - 菜单节点排序
  - 未选择应用重定向到 app.html 页面
  - 修复 / 重定向加载子应用失败
- Updated dependencies
  - @wakeadmin/mapp@0.3.1

## 0.5.1

### Patch Changes

- 基座重复加载提示

## 0.5.0

### Minor Changes

- error、landing 等内置页面统一使用 \_\_ 前缀

### Patch Changes

- Updated dependencies
  - @wakeadmin/mapp@0.3.0

## 0.4.5

### Patch Changes

- 优化调试体验
  - @wakeadmin/mapp@0.2.3

## 0.4.4

### Patch Changes

- 支持独立隐藏侧边栏

## 0.4.3

### Patch Changes

- 侧边栏滚动条优化；新增菜单搜索接口

## 0.4.2

### Patch Changes

- 基座关闭 vendor

## 0.4.1

### Patch Changes

- - 网络拦截支持使用 X-Disable-Intercept 跳过
  - 接入 vendor 插件
  - debug 页面优化
  - wkc-breadcrumbs 支持扩展
  - wkc-menuless 支持动画配置
  - 会话失效不展示弹窗
- Updated dependencies
  - @wakeadmin/mapp@0.2.2

## 0.4.0

### Minor Changes

- - 完善多语言支持
  - 支持菜单隐藏
  - 修复 wkc-\*-slot 失效

## 0.3.0

### Minor Changes

- activeRule 支持数组形式; 支持 history 模式

### Patch Changes

- asset 动态化
- Updated dependencies
- Updated dependencies
  - @wakeadmin/assets@0.1.1
  - @wakeadmin/mapp@0.2.0

## 0.2.1

### Patch Changes

- 修复自定义组件无法识别 html attribute
- Updated dependencies
  - @wakeadmin/mapp@0.1.2

## 0.2.0

### Minor Changes

- 模板语法变动

## 0.1.5

### Patch Changes

- 支持 auto-index；支持 head、body 模板注入

## 0.1.4

### Patch Changes

- assets 库迁移

## 0.1.2

### Patch Changes

- 新增 wk-icon 组件

## 0.1.1

### Patch Changes

- 新增 createMicroApp 方法，不再依赖子应用的导出方式，直接挂载在 window 对象上
- Updated dependencies
  - @wakeadmin/mapp@0.1.1
