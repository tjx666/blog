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

ExtendScript 可以调用宿主的各种 API，例如访问图层信息，调用渲染队列输出媒体资源，也有原生能力例如读写文件，还可以使用内置的各种窗口和控件接口去创建图形界面。因此它完全可以作为一种插件形式去实现独立的功能。

例如可能很多人用过的这个用来优化 PSD 体积的 jsx 脚本：[一键压缩 PSD 文件从 GB 变为 MB](https://github.com/julysohu/photoshop_deep_cleaner)

再例如 github 上 1.2k star 的一个将 psd 图层导出文件的工具：[Photoshop-Export-Layers-to-Files-Fast](https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast)

![Photoshop-Export-Layers-to-Files-Fast](https://s2.loli.net/2022/04/25/LosJhwSniUVQvrc.png)

### 面板插件

所谓面板插件，指的是界面是面板形式的插件，例如用于导出 [lottie](https://airbnb.io/lottie) 动画数据的 bodymovin。由于是界面是面板的形式，因此它们可以悬浮显示，也可以内嵌到 worksapce 布局中。

![bodymovin](https://s2.loli.net/2022/04/25/dZxuoPXQzYhBHNE.gif)

实际上你也可以开发一个无界面的面板扩展，虽然在 windows -> extensions 菜单中会显示出来，但是点击后不会弹出界面。像 bodymovin 其实就使用了这么一个无界面的面板扩展来启动一个 node server，用来提供例如图片压缩等服务。

#### flash 面板插件

在 CS6 以前，开发面板扩展只能通过 flash。但是众所周知 adobe 早就宣布放弃 flash 技术转投 html 的怀抱，从 CC2014 开始直接废弃了 flash 的插件架构，这也是为什么你看到很多以前用的插件都无法再 CC2014/15 上跑起来。

#### CEP 面板插件
