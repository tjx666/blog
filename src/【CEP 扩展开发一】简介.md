## 写作目的

Adobe 毫无疑问是设计软件行业的垄断巨头，旗下的 PS，AE 等都是搞设计和自媒体的必装软件。有很多小公司的产品其实本质上是依赖这些设计软件生存的，例如开发 AE 特效插件的公司，例如使用 PS 开发海报模板的我司。

**其实 CEP 扩展的开发生态是相当的恶劣**，中文资料不能说少，简直可以说是没有，质量不错的一只手可以数得过来。国外的资料相对多一点，但还是很少，主要还是以论坛，github 仓库, stackoverflow 提问的形式散落在各处，大多数文章的内容也很浅。

笔者将近一年时间的主要工作就是为 AE 和 PS 开发 CEP 扩展，各上线了一个扩展。踩过很多坑，也有很多的技术沉淀。我写这一系列的主要目的在于：

1. 思考总结，知识沉淀
2. 帮助新人快速入门，减少踩坑
3. 优化 CEP 扩展开发的生态环境，教你怎么最大限度的使用现代化的前端技术开发 CEP 扩展

## Adobe 插件种类

大致可以分成以下几类：

- ExtendScript 脚本
- 面板插件

  - Flash 面板插件
  - CEP 面板插件

- 通过 C++ 库和宿主通信的独立客户端
- C++ 插件

### ExtendScript 脚本

![ExtendScript 脚本](https://s2.loli.net/2022/04/25/kjoIGRTEpc29g8u.png)

ExtendScript 是 ECMAScript3 的一种方言，和 JavaScript 基本上语法一样，不过集成了一些例如指令，模块化，反射系统，三引号字符串等语法特性。文件后缀名是 `.jsx`（不是 react 用的那个 JS 的 DSL），**所以 ExtendScript 又被称为 jsx**。由宿主（**例如 PS, AE, PR 都叫宿主**）实现的 ExtendScript 引擎解释执行，不同宿主都能解释执行 jsx，但是底层实现以及注入的宿主特有的 API 不一样。

通过以下 jsx 代码查看 jsx 的引擎信息：

```javascript
$.about();
```

![about](https://s2.loli.net/2022/04/25/XweDa6QH7kGTF1R.png)

其实如果你不调用宿主特有的 API 或者针对不同的宿主做了兼容，那么 JSX 脚本就是兼容所有 adobe 设计软件的。既可以跑在 PS 上也能跑在 AE, InDesign 上，只要你跑的那个平台实现了 JSX 引擎（貌似绝大多数都实现了）。

其实 ExtendScript 脚本和宿主的关系有点像 shell 脚本和操作系统的关系，ExtendScript 由宿主提供的 JSX Engine 解释执行，可以调用宿主的 API，shell 脚本由 shell 解释执行，可以调用系统命令。

ExtendScript 可以调用宿主的各种 API，例如访问图层信息，调用渲染队列输出媒体资源，也有原生能力例如读写文件，还可以使用内置的各种窗口和控件接口去创建图形界面。因此它完全可以作为一种插件形式去实现独立的功能。

例如可能很多人用过的这个用来优化 PSD 体积的 jsx 脚本：[一键压缩 PSD 文件从 GB 变为 MB](https://github.com/julysohu/photoshop_deep_cleaner)

再例如 github 上 1.2k star 的一个将 psd 图层导出文件的工具：[Photoshop-Export-Layers-to-Files-Fast](https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast)

![Photoshop-Export-Layers-to-Files-Fast](https://s2.loli.net/2022/04/25/LosJhwSniUVQvrc.png)

优点：

- 方便分享，本质上就是一个或多个 .jsx 后缀的文本文件，多个 jsx 文件可以使用 [jsxbin](https://www.npmjs.com/package/jsxbin) 打包成单个二进制文件。用户可以直接通过菜单直接加载执行
- 界面风格非常贴近宿主界面：ScriptUI 是对 JSX 内置的图形界面框架的统称，例如上面 psd 导出工具的界面，可以看出使用 ScriptUI 构建的界面非常贴近宿主界面
- 方便复用，CEP 插件涉及到对宿主的访问都需要调用 JSX 脚本，这样的话，你用 JSX 脚本使用的功能其实很容易复用到 CEP 插件中

缺点：

- 构建界面不够灵活：ScriptUI 只能使用内置组件构建界面，如果涉及到画图表或者更复杂的界面就不行了，不像 CEP 扩展是完全使用前端技术构建界面
- 网络请求不方便：ScriptUI 网络请求非常底层，需要用 socket 对象请求，不像 CEP 扩展可以使用浏览器环境的 xhr 和 nodejs 的 httpClient
- 不支持异步：jsx 环境没有定时器，文件操作也没有异步形式，AE 环境倒还是定时器接口让代码异步执行，PS 环境那是彻底的木有办法异步执行代码。相对而言，CEP 可以使用 nodejs 来进行异步 IO 操作，甚至还可以使用子进程，web worker 来执行耗时操作防止阻塞界面渲染。

### 面板插件

所谓面板插件，指的是界面是面板形式的插件，例如用于导出 [lottie](https://airbnb.io/lottie) 动画数据的 bodymovin。由于是界面是面板的形式，因此它们可以悬浮显示，也可以内嵌到 worksapce 布局中。

![bodymovin](https://s2.loli.net/2022/04/25/dZxuoPXQzYhBHNE.gif)

实际上你也可以开发一个无界面的面板扩展，虽然在 windows -> extensions 菜单中会显示出来，但是点击后不会弹出界面。像 bodymovin 其实就使用了这么一个无界面的面板扩展来启动一个 node server，用来提供例如图片压缩等服务。

#### Flash 面板插件

在 CS6 以前，开发面板扩展只能通过 flash。但是众所周知 adobe 早就宣布放弃 flash 技术转投 html 的怀抱，从 CC2014 开始直接废弃了 flash 的插件架构，这也是为什么你看到很多以前用的插件都无法再 CC2014/15 上跑起来。说实话，我对这类插件一点都不了解，没有开发过，甚至都没见过这类插件。

#### CEP 面板插件

在 AE 中，就像上面 GIF 图中展示的那样，你通过菜单 Window -> Extensions 的下拉列表打开的就是 CEP 扩展了。

CEP 扩展的界面是使用 Chromium 渲染的，采用的是 CEF（Chromium Embedded Framework） 架构。CEF 简单理解就是将浏览器嵌入到其它应用中让我们可以直接使用前端技术去开发界面，electron, nwjs，tarui 是 CEF 架构的代表框架了。这类框架除了是使用前端技术开发界面，runtime 往往都还搞成混合型的，例如开启了 node 集成的 electron 和 nwjs 的浏览器窗口的运行时都是浏览器 runtime 和 nodejs runtime 的复合 runtime。

其实 CEP 的架构和[从 HTML 页面启动的 nwjs](https://www.electronjs.org/docs/latest/development/electron-vs-nwjs#1-entry-of-application) 最像，打开一个 CEP 扩展其实就是就是去渲染系统本地的扩展文件夹中的一个 HTML 文件。
