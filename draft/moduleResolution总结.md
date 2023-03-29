模块化之争的在 ESM 标准出来的时候已成为定局，这两年前端界也在进行 ESM 化大迁移。关于 ESM 其实可以聊的并不多，往上讨论最多的可能还是到底该不该用 default import。前不久 TS 发布了 5.0，引入了新的 moduleResolution：bundler。官方文档对此的描述非常简单，但是引进它带来的最大优势其实是你可以在 package.json 的 exports 中写 types，估计是考虑到展开来讲的需要讲述大量背景，文档就没提。本文就总结一下我所知道的关于模块解析策略的方方面面。

## 什么是 moduleResolution

当我们体积**模块化标准**，对应的英文术语 `module`，我们更多的是描述一个模块是如何声明导入导出的语法。具体来说：

- commonjs 使用 require 来导入，exports.xxx 来导出
- esm 使用 import/export

而**模块解析策略**也就是 `moduleResolution` 更多描述的是一个模块包括相对路径以及非相对路径（也就是第三方库）是如何被找到的。相对路径没什么可讨论的，本文不做讨论，主要聊聊第三方库的解析。

我们最熟悉的模块解析策略其实是 nodejs 的模块解析策略。第一次了解到还有别的模块解析策略还是在我刚学习 typescript 的时候。

虽然说一般情况下 module 和 moduleResolution 是绑定的，但你完全可以配置 tsconfig.json 成 module 是 commonjs，而 moduleResolution 是 classic。

### moduleResolution: classic

> You can use the [`moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution) option to specify the module resolution strategy. If not specified, the default is [Node](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node) for `--module commonjs`, and [Classic](https://www.typescriptlang.org/docs/handbook/module-resolution.html#classic) otherwise (including when [`module`](https://www.typescriptlang.org/tsconfig#module) is set to `amd`, `system`, `umd`, `es2015`, `esnext`, etc.).

从 ts 的文档来看 amd 模块化标准貌似用的就是 classic 解析策略。其实这才是普通人最容易想到的最正常的模块解析策略，对于下面这个导入第三方依赖 `moduleB` 的代码：

```typescript
// 文件：/root/src/folder/A.ts
import { b } from 'moduleB';
```

会经历下面的步骤来查找 `moduleB`:

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`
3. `/root/src/moduleB.ts`
4. `/root/src/moduleB.d.ts`
5. `/root/moduleB.ts`
6. `/root/moduleB.d.ts`
7. `/moduleB.ts`
8. `/moduleB.d.ts`

简单来说这种模块解析策略就是一直递归往上找同名文件。

### moduleResolution: node

写过 nodejs 的人应当非常熟悉了这个模块解析策略了，这个模块解析策略其实就是 nodejs 解析应该模块的策略。这也是各种前端构建工具如 webpack, vite 所采用的模块解析策略。这里没说 rollup 是因为 rollup 默认没有内置模块解析策略，默认所有 npm 包都是 external 的，你需要使用 node 模块解析策略的插件：[node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)。

对于下面这段 nodejs 代码：

```javascript
// 文件 /root/src/moduleA.js
var x = require('moduleB');
```

会按照下面的步骤来查找 `moduleB`：

1. 同级目录的 node_modules 找同名的 js 文件， `/root/src/node_modules/moduleB.js`

2. 同级目录 node_modules 里面找包含 package.json 的 `moduleB` 文件夹：`/root/src/node_modules/moduleB/package.json`

3. 同级目录 node_modules 里面找包含 `index.js` 的 moduleB 文件夹 `/root/src/node_modules/moduleB/index.js`

还是找不到就往上一级目录重复前面的查找步骤

4. `/root/node_modules/moduleB.js`

5. `/root/node_modules/moduleB/package.json`

6. `/root/node_modules/moduleB/index.js`

相比于 classic 的区别在于：

- 查找的目录是 node_modules，不是父级文件夹

- 引入了 package.json，package.json 中各种配置项尤其是后面会展开说的 exports 字段使得 node 模块解析策略的变得非常复杂

- 支持文件夹模块，也就是 moduleB/index.js，文件夹中包含 index.js，这个文件夹就是一个模块
