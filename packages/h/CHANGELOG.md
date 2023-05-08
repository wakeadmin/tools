# @wakeadmin/h

## 0.2.15

### Patch Changes

- 指定 jsx-dev-runtime 导出规则

## 0.2.14

### Patch Changes

- 修复 h 在 vue2 下错误的传递 staticClass 的问题
- Updated dependencies
  - @wakeadmin/demi@0.2.6

## 0.2.13

### Patch Changes

- vue2 下 eventName 统一为 camelCase
- Updated dependencies
  - @wakeadmin/demi@0.2.4

## 0.2.12

### Patch Changes

- Vue 2 支持转换 on\*Native props

## 0.2.11

### Patch Changes

- 更新依赖

## 0.2.10

### Patch Changes

- Bug 修复: 导入 DefineComponent 类型, 修复 jsx-runtime 编译结果隐式依赖 vue

- Updated dependencies
  - @wakeadmin/utils@0.1.4
  - @wakeadmin/demi@0.2.1

## 0.2.9

### Patch Changes

- 更新依赖
- Updated dependencies
  - @wakeadmin/demi@0.2.0
  - @wakeadmin/utils@0.1.3

## 0.2.8

### Patch Changes

- 优化 declareSlots 类型，不强约束为 {}

## 0.2.7

### Patch Changes

- 让 Vnode 类型更宽松
- Updated dependencies
  - @wakeadmin/demi@0.1.4

## 0.2.6

### Patch Changes

- refactor(h): 不针对 nativeOn、on 进行特殊的合并，和 vue 3 行为保持一致

## 0.2.4

### Patch Changes

- 修复事件处理器合并问题

## 0.2.3

### Patch Changes

- 修复 vue 2 下， props 合并报错

## 0.2.2

### Patch Changes

- 修复 declareComponent vue 2 emit 异常

## 0.2.1

### Patch Changes

- declareProps 支持详细 props 定义

## 0.2.0

### Minor Changes

- slots 支持静态内容，修复 vue2 下 slot 无法正确传递

## 0.1.3

### Patch Changes

- 暴露插件, 支持 vue2 触发 case 无关的事件

## 0.1.2

### Patch Changes

- ExtraRef、ExtraArrayRef 类型调整
- Updated dependencies
  - @wakeadmin/utils@0.1.1

## 0.1.1

### Patch Changes

- Updated dependencies
  - @wakeadmin/demi@0.1.1
