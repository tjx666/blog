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
  - UXP 面板插件

- 独立客户端
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

再例如 github 上 1.2k star 的一个将 psd 图层导出为文件的工具：[Photoshop-Export-Layers-to-Files-Fast](https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast)

![Photoshop-Export-Layers-to-Files-Fast](https://s2.loli.net/2022/04/25/LosJhwSniUVQvrc.png)

#### 不只是 ExtendScript

其实 adobe 软件支持的脚本语言并不只有 ExtendScript，例如在 PS 其实是支持：Apple Script, VBScript 和 ExtendScript，具体可以查看软件对应的文档：[Photoshop Scripting](https://github.com/Adobe-CEP/CEP-Resources/tree/master/Documentation/Product%20specific%20Documentation/Photoshop%20Scripting)。

#### 优缺点

优点：

- 方便分享，本质上就是一个或多个 .jsx 后缀的文本文件，多个 jsx 文件可以使用 [jsxbin](https://www.npmjs.com/package/jsxbin) 打包成单个二进制文件。用户可以直接通过菜单直接加载执行
- 界面风格非常贴近宿主界面：ScriptUI 是对 JSX 内置的图形界面框架的统称，例如上面 psd 导出工具的界面，可以看出使用 ScriptUI 构建的界面风格非常贴近宿主的原生界面风格
- 方便复用：CEP 插件涉及到对宿主的访问都需要调用 JSX 脚本，这样的话，你用 JSX 脚本使用的功能其实很容易复用到 CEP 插件中。比如你在开发 CEP 扩展的某个功能的时候你就可以直接去把别人实现好的 JSX 代码直接拷过来调用

缺点：

- 构建界面不够灵活：ScriptUI 只能使用内置组件构建界面，如果涉及到画图表或者更复杂的界面就不行了，不像 CEP 扩展是完全使用前端技术构建界面
- 网络请求不方便：ScriptUI 网络请求非常底层，需要用 socket 对象请求，不像 CEP 扩展可以使用浏览器环境的 xhr 和 nodejs 的 httpClient
- 不支持异步：jsx 环境没有定时器，文件操作也没有异步形式。AE 环境倒还是定时器接口让代码异步执行，PS 环境那是彻底的木有办法异步执行代码。相对而言，CEP 可以使用 nodejs 来进行异步 IO 操作，甚至还可以使用子进程，web worker 来执行重计算任务防止阻塞界面渲染。

### 面板插件

所谓面板插件，指的是界面是面板形式的插件，例如用于导出 [lottie](https://airbnb.io/lottie) 动画数据的 bodymovin。由于是界面是面板的形式，因此它们可以悬浮显示，也可以内嵌到 worksapce 布局中。

![bodymovin](https://s2.loli.net/2022/04/25/dZxuoPXQzYhBHNE.gif)

实际上你也可以开发一个无界面的面板扩展，虽然在 windows -> extensions 菜单中会显示出来，但是点击后不会弹出界面。像 bodymovin 其实就使用了这么一个无界面的面板扩展来启动一个 node server，用来提供例如图片压缩等服务。

#### Flash 面板插件

在 CS6 以前，开发面板扩展只能通过 flash。但是众所周知 adobe 早就宣布放弃 flash 技术转投 html 的怀抱，从 CC2014 开始直接废弃了 flash 的插件架构，这也是为什么你看到很多以前用的插件都无法再 CC2014/15 上跑起来。说实话，我对这类插件一点都不了解，没有开发过，甚至都没见过这类插件。

#### CEP 面板插件

在 AE 中，就像上面 GIF 图中展示的那样，你通过菜单 Window -> Extensions 的下拉列表打开的就是 CEP 扩展了。

CEP([Common Extensibility Platform](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md)) 扩展的界面是使用 Chromium 渲染的，采用的是 CEF（Chromium Embedded Framework） 架构。CEF 简单理解就是将浏览器嵌入到其它应用中让我们可以直接使用前端技术去开发界面，electron, nwjs，tarui 是 CEF 架构的代表框架了。这类框架除了是使用前端技术开发界面，runtime 往往都还搞成混合型的，例如开启了 node 集成的 electron 和 nwjs 的浏览器窗口的运行时都是 web runtime 和 nodejs runtime 的复合 runtime。

其实 CEP 的架构和[从 HTML 页面启动的 nwjs](https://www.electronjs.org/docs/latest/development/electron-vs-nwjs#1-entry-of-application) 最像，每一个 CEP 扩展本质就是本地的一个文件夹，**打开一个 CEP 扩展其实就是就是去渲染配置文件指定的在这个文件夹中的一个 HTML 文件**。

看一个典型的 CEP 扩展目录：[AfterEffectsPanel](https://github.com/Adobe-CEP/Samples/tree/master/AfterEffectsPanel)

![CEP 扩展目录](https://s2.loli.net/2022/04/26/wWVAz5aR34oKrGD.png)

关于 CEP 的架构先简单介绍到这，将在下一章详细介绍。

#### UXP 面板插件

[UXP](https://developer.adobe.com/photoshop/uxp/guides/#the-uxp-technology-stack) (**U**nified E**x**tensibility **P**latform)是下一代的面板插件架构，相对于 CEP，一个很明显的优势是可以直接在浏览器环境代码中直接访问宿主，不需要像 CEP 那样通过 evalScript 或者 evalFile 调用 jsx 代码来访问宿主，在 CEP 中浏览器环境的代码和 jsx 代码是完全隔离的。

有点像你在 nodejs 执行 shell 脚本，原本需要开个子进程执行 shell 脚本，现在好了，它直接支持在 nodejs 中混编 shell 代码，有点像 [shelljs](https://github.com/shelljs/shelljs)。

例如同样实现获取当前打开的 PSD 文件名，CEP 中代码是这样的：

```html
<script>
  // 需要执行 jsx 代码
  var jsxScript = 'activeDocument.name';
	window.__adobe_cep__.evalScript(jsxScript, function(name) {
		console.log(name)
	});
<script/>
```

在 UXP 里面你只需要：

```html
<script>
  // 直接使用宿主模块
  const app = require('photoshop').app;
  const doc = app.activeDocument;
  console.log(doc.name);
</script>
```

UXP 扩展还处在发展中，目前只有 PS2021 及其以上的版本支持 UXP 扩展，而且目前还有很多 PS 宿主的 API 没有暴露出来。

对于 PS 这个宿主而言，UXP 比起 CEP 还有一个巨大优势是 UXP 扩展的宿主 API 是支持异步的。这在 CEP 中是完全做不到的，PS 中的 jsx 是完全没有异步支持的。目前 PS 有一个限制，如果你在 CEP 扩展中调用 jsx 代码，那么会直接阻塞所有 CEP 扩展的代码执行和渲染，也就是说浏览器代码和 JSX 代码是互斥的。举个直观点的例子，你在 CEP 调用 jsx 读取一个很大的文件，然后在 CEP 面板放了一张 GIF 图，那么在读取文件期间，这个 GIF 图会卡住不动，直到 jsx 代码执行完，才会开始播放。这个问题目前是无解的，相关的讨论可以移步：[[BUG] The CSInterface.evalScript API blocks on macOS](https://github.com/Adobe-CEP/CEP-Resources/issues/163)。因此你如果想实现类似调用一个 jsx 接口，然后在面板中渲染 jsx 执行进度的进度条的功能，这在 PS 的 CEP 扩展中是没法实现的。

以前我在公司的交流群里经常开玩笑说 PS 是 adobe 的亲儿子，很大一部分原因就是因为 UXP 先支持 AE 平台。后来我真正开始写 PS 的 CEP 扩展的时候，我改变了我的看法，我觉得 UXP 先支持 PS 可能是因为 PS 的 CEP 开发环境太烂。在 AE 中开发 CEP 扩展基本上 JSX 提供的 DOM API 就能满足日常开发，但是 PS 的 jsx DOM API 只能满足大概日常开发的 30% - 40%，剩下的要写 ActionManager 代码，ActionManager 是一套调用底层 C++ 代码的框架，写起来贼恶心。

### 独立客户端

你可以实现一个独立于宿主软件之外的客户端来给它们提供扩展能力。本质上，其实你只需要有办法去调用宿主 API，能和宿主通信即可。通信的方式有很多，如果你是使用 VB 构建的界面，你可以使用 ps 的 com 库。如果你是用 electron 写的客户端，那么你可以用 osascript 去执行一段 jsx 代码。笔者开发的一个 VSCode 扩展 [ Adobe Extension Development Tools](https://marketplace.visualstudio.com/items?itemName=YuTengjing.adobe-extension-devtools) 提供了 AE 合成 Outline 功能，获取 AE 合成信息时本质上就是通过 osascript 去执行了一段 jsx 代码。

![AE Composition Outline](https://s2.loli.net/2022/04/27/Q39sKIUPeEOZcql.gif)

### C++ 插件

每一个 adobe 的设计软件都提供了对应的 c++ 插件开发 SDK，它们自身就是用 c++ 开发。C++ 插件在所有插件中无疑是获取宿主信息最全面，性能最强的插件类型。可以说如果有哪个能力 c++ 插件做不到，别的插件类型那就不用想了。

由于开发 c++ 插件需要使用对应宿主提供的 c++ SDK，因此 c++ 插件显然不是跨平台的。其实这也可以从插件的存放路径可以看出来，c++ 插件一般存放在宿主应用的 Plugins 目录下，例如 Mac 上 AE 的 c++ 插件就放在：

```bash
/Applications/Adobe After Effects 2021/Plug-ins/xxx.plugin
```

对比而言，用户级别的 CEP 插件是放在：

```bash
~/Library/Application Support/Adobe/CEP/xxx
```

可以看到 CEP 扩展存放路径并不是和某个宿主关联的，这意味着所有宿主在启动时都会去加载所有的 CEP 插件的配置文件。在 CEP 的配置文件中你是可以配置它兼容的宿主的，所有也不是说 AE CEP 插件会出现在 PS 中。

在 AE 中，出现在特效和预设面板的中的第三方插件都是 c++ 插件。给 AE 新增一种特效这在 JSX 中是做不到的，只能通过 c++。涉及到对应用中的二进制数据计算的功能也是没法通过 jsx 实现的，jsx 中都没有 buffer 对象，nodejs 倒是可以读取本地文件，但是也没办法读取编辑中的合成使用到的媒体资源的二进制数据。After Codes 是一个在 AE 和 PR 提供丰富的导出格式和对导出媒体文件压缩能力的扩展，例如 AE 渲染队列是不支持导出 mp4 格式的，通过它可以导出 mp4，并可以设置导出的 mp4 的压缩级别。由于需要读取和计算合成中的媒体资源二进制数据，因此显而易见是个 c++ 插件。

![c++ plugin](https://s2.loli.net/2022/04/27/kW8MsuHFRGeDoc6.png)
