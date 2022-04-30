本文是 CEP 扩展开发系列教程的第二篇，首先会讲解 CEP 的开发环境的配置，跑起来一个 hello world 级别的应用，然后分析探讨运行这个 hello world 应用背后发生的技术细节。

CEP 扩展本身是跨平台的，但是不同环境的 jsx engine 的技术实现有些许差异，注入的 API 那更是完全不一样。博主本身是开发过 AE 和 PS 的 CEP 插件，相对而言，对于 AE 的 CEP 开发更为熟悉和深入，所以本教程演示将会以 AE 为主，碰到 PS 和 AE 有较大差异的部分会提一下。

## 开发工具

- 宿主应用：After Effects / Photoshop，我自己用的都是 2021 的英文版
- 代码编辑器：Visual Studio Code，理论上你用记事本也没关系，但是目前 ExtendScript 的 debugger 工具只有 VSCode 的 debugger 扩展还在维护，而且用 VSCode 你还可以安装一些 CEP 开发辅助的扩展
- 操作系统：我本人用的是 MacOS，但是 CEP 本身就像网页应用一样因为底层浏览器本身是跨平台的所有也是跨平台的，你完全可以用 Windows 来开发
- 浏览器：Chrome，CEP 扩展本身是使用 Chromium 内核渲染的，你可以使用任何基于 Chromium 内核的浏览器来远程 debug CEP 的网页代码。我测试过 360 和 edge 也是可以的，想用 safari 和 firefox 来 debug CEP 网页的读者可以参考后面的 debug CEP 网页代码的内容自行尝试。

### 为什么我强烈建议使用英文版而不是中文版的 AE？

不知道学习编程开发后多久，对于和开发相关的工具，我开始有意识的尽量使用软件的原生语言版本。也就是说如果一个软件是英文软件我就用英文，不切换中文界面，也不用翻译包。

英语词汇够用是一方面，最重要的是很多技术细节就涵盖在界面的英文单词中，有助于你对技术的理解和 Google。举个例子：当你想要去获取 AE 中一个图层在合成中的位置数据，那么通过界面可以看出它的英文单词是 `Position`，那么借助 VSCode 的代码提示你可以很容易知道，位置的数据就是 `layer.position`。而在 AE 的中文界面你看到的它的中文翻译，也就是就是 `位置` 两个字。那对应的英文单词到底是 CSS 中常用的 translate 还是 position 呢？或者还是谷歌翻译推荐的 location，place？

![平移](https://s2.loli.net/2022/05/01/gBnPmd5ORIqtwQj.png)

![谷歌翻译位置](https://s2.loli.net/2022/05/01/ZY7jBGINgMqai3v.png)

## ExtendScript 开发环境配置

