本文是 CEP 扩展开发系列教程的第二篇，首先会讲解 CEP 的开发环境的配置，跑起来一个 hello world 级别的应用，然后分析探讨运行这个 hello world 应用背后发生的技术细节。

CEP 扩展本身是跨系统（Windows，MacOS）平台的，但是不同宿主环境（Photoshop，AfterEffects 等）的 jsx 解释器（或者说 engine）的技术实现有些许差异。注入的 API 那更是完全不一样，毕竟不同宿主的文档模型和工具能力差异很大，PS 是 psd，AE 是 project。

由于最近一段时间我都是在写 PS 插件，因此本文将会主要以 PS 为例子来讲解。

## 开发工具

在开始我们的 Hello World 之前我们先检查一下是否安装了以下开发 CEP 的必备工具：

- 宿主应用：After Effects / Photoshop，创作这篇教程时用的是 Photoshop 2022 23.4.2，最近几个月已经不开发 AE 插件，主要在开发和维护 PS 扩展。因为电脑磁盘空间（251G）不够用，都没法保存 psd 了，暂时把 AE 都给卸了，有空清理下空间再装回来...
- 代码编辑器：[Visual Studio Code](https://code.visualstudio.com/)，理论上你用记事本编写代码也没关系，但是目前 ExtendScript 的 debugger 工具只有 VSCode 的 debugger 扩展还在维护。而且用 VSCode 你还可以安装一些 CEP 开发辅助的扩展，例如我开发的 [Adobe Extension Development Tools](https://marketplace.visualstudio.com/items?itemName=YuTengjing.adobe-extension-devtools) 和 [Scripting Listener](https://marketplace.visualstudio.com/items?itemName=YuTengjing.scripting-listener)
- Debugger： [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug&ssr=false#review-details) 是 VSCode 上用于 debug ExtendScript 和 CEP 扩展的 debugger 插件，如果需要向官方反馈这个插件的问题请去：[forums.adobeprerelease.com](https://forums.adobeprerelease.com/exmancmd/discussion/160/extendscript-debugger-2-0-beta-3-0-release/p1)，在插件市场的评论区反馈是没用的
- 操作系统：我本人用的是 MacOS Montery12.5，CEP 扩展核心技术 chromium + nodejs + extendscript 都是跨平台的，所以本身是跨系统平台的。CEP 全拼 Common Extensibility Platform，既然叫 Common（通用的意思） ，那么是跨平台也不然理解了。
- 浏览器：Chrome，CEP 扩展本身是使用 Chromium 内核渲染的，你可以使用任何基于 Chromium 内核的浏览器来远程 debug CEP 的网页代码。我测试过 360 和 edge 也是可以的，其它浏览器例如 safari 和 firefox 我没试过，有需要的读者可以参考后面会讲的使用 chrome 来 debug CEP 扩展的方法自行摸索。

![about ps](https://s2.loli.net/2022/08/02/QXMIrGScPwCOkWa.png)

## 为什么我强烈建议使用英文版而不是中文版

不知道学习编程开发后多久，对于和开发相关的工具，我开始有意识的尽量使用软件的原生语言。也就是说如果一个软件安装的时候默认是英文的我就用英文，不切换中文界面，也不用翻译包。换句话说，英文软件就用英文，中文软件就用中文，telegram 就用英文，钉钉就用中文。例如 VSCode 我是没有语言包，Chrome 我用的是中文版的，原因是用习惯了而且切到英文版后很多网站识别不出我是中文用户。

对于我个人来说，我更倾向于使用软件的原生语言的原因简单概括下：

1. 我的英语水平够用，足够支撑我流畅阅读英文技术文档和软件界面的英文

2. 我不信任第三方翻译，有很多第三方的翻译我觉得不太行，而且有可能更新也不及时，正常人都喜欢原汁原味的

3. 有助于更快更准确的理解软件代码中使用的字段名，也方便抄代码和找到谷歌关键字

关于第三点，这里再展开讲讲。我们编写代码是英文的，而且使用 debugger 或者第三方扩展查看 PS 中各种数据时得到的也是英文的，因此如果你的软件界面是英文的，就能很快的对应起来。举个简单的例子，当我们想通过代码修改一个图层的是否可见的，在 PS 中设置一个图层是否可见只要点击左侧的眼睛图标就可以，当我们把光标移动到这个眼睛上，我们看看 hover 提示：

![layer visibility](https://s2.loli.net/2022/08/02/ZiY3fVj2yHmUCdQ.png)

看到这其实我们基本上就能肯定 layer 上有一个 `visibilty` 或者它的形容词 `visible`，通过 debugger 工具查看果不其然有个 `visible` 属性：

![debugger_visible.png](https://s2.loli.net/2022/08/02/4ZI6sCDcT2jaYpP.png)

实际的项目开发你会发现很多场景这对于加速开发是非常帮助的，来一个更复杂的例子。例如我们最近的一个实际需求，检测一个矢量蒙版修改了密度，也就是不是默认的 100。产品给到我的示意图是这样的：

![vector_layer_density.png](https://s2.loli.net/2022/08/02/HyaQe3UBmKi1ZjG.png)

我看到这图的第一眼是很懵逼的，密度对应的英文单词是哪个？查了一下谷歌翻译：

![translate_density.png](https://s2.loli.net/2022/08/02/GUMr9diTnogKV1J.png)

那他丫的到底是 density 还是 thickness，又或者是 denseness 呢？直到我打开我英文版的 PS 的矢量蒙版的属性面板，一目了然：

![shape_layer_density_en.png](https://s2.loli.net/2022/08/02/3MHvSbp5k7cEg1l.png)

这时英文版的优势就极大的体现出来了，使用我开发的 [Adobe Extension Development Tools](https://marketplace.visualstudio.com/items?itemName=YuTengjing.adobe-extension-devtools&ssr=false#review-details) 打开图层的 Descriptor Info，直接搜索 density，毫无疑问 `vectorMaskDensity` 就是我们要找的属性。

![vector mask density](https://s2.loli.net/2022/08/02/vi1PkodOySqwxs6.png)

这样代码写起来也很快：

```javascript
// 至于怎么拿到 layerDesc 这个后序教程讲 AM 的时候就知道了，暂时你就理解为图层的描述对象，和底层 c++ 图层的结构体对应
function isVectorDensityModified(layerDesc) {
  return layerDesc.vectorMaskDensity != null && layerDesc.vectorMaskDensity !== 255;
}
```

## Hello World

接下来我们动手写一个简单的 Hellow World 级别的插件，功能很简单：插件面板有一个按钮，点击这个按钮在插件界面上显示出当前选中图层的名称。

### 创建项目

插件必须要放在特定的文件夹才能被 PS 读取到。有三个位置都能存放 CEP 插件：

#### 软件安装文件夹

> ${PP}/CEP/extensions (PPs may use different folder.)

例如软件（或者说宿主）是 Photoshop，那么在 Mac 对应的路径默认就是：`/Applications/Adobe Photoshop 2022`，当然软件的安装路径你是可以修改的。这个文件夹不应该被用于存放第三方插件，是用来存放软件自带的 CEP 插件的，而且在 Mac 上修改这个文件夹是需要 Root 权限的。

#### 系统级的插件文件夹

- Win(x64): `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`, and `C:\Program Files\Common Files\Adobe\CEP\extensions` (since CEP 6.1)
- macOS: `/Library/Application Support/Adobe/CEP/extensions`

既然是系统级的，那么将插件安装到这就是需要 root 权限。开发插件的时候肯定是不会放这的，放这都权限修改代码。

这个文件夹适合存放生产环境的插件，某种程度上可以防止用户修改到插件内容，修改了插件内容一般会导致 **PS 加载插件的时候报插件内容和签名不一致的问题**。

#### 用户级别的插件存放文件夹

- Win: `C:\Users\<USERNAME>\AppData\Roaming\Adobe\CEP/extensions`
- macOS: `~/Library/Application Support/Adobe/CEP/extensions`

这才是我们在开发插件时插件应该存放的目录，我们可以随意修改这个文件夹内的内容。

#### 插件查找顺序

软件安装文件夹 > 系统级的插件文件夹 > 用户级别的插件存放文件夹

### 添加插件配置文件

有过 chrome 扩展或者 pwa 应用的读者应该都见过你个名为 manifest 的文件，同样的在 CEP 插件中也必须存在一个 manifest.xml 文件。

它采用 xml 格式，而且
