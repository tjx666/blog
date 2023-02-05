# VSCode 插件推荐

身为一个 VSCode 老玩家，我对插件的质量要求是很高的。自己也写了好几个，还给非常流行的插件，以及 VSCode 都贡献过代码。本文主要介绍一下我自己常用的，以及收藏的一些 VSCode 插件，聊聊为啥在诸多同类中选择了它，顺带可能会聊聊插件的作者。

## 优质插件应该满足的一些特质

### 积极维护

至少 1 年以内还在提交代码，发个 issue 好歹会回的，如果发个严重 bug 的 issue 两月不回我，那在我眼里是很扣分的。有些插件是个例外，比方说 [filesize](https://github.com/mkxml/vscode-filesize)，本身功能比较简单，有没啥严重的问题，在没有啥更好的替代品的情况下，我是觉得还可以接受。

### 风评不能太差

这个包括 [VSCode 插件市场](https://marketplace.visualstudio.com/vscode)有大量的负面评论，低于 4 星的。或者在 github 有很多 bug issues 不处理。其实低于 4 星就很难有让我用的欲望了，例如：[IntelliCode API Usage Examples](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.intellicode-api-usage-examples&ssr=false)。再举个例子，[Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)，它之所以 3.5 星是因为前两年（具体）一直没人维护，issue 列表一堆问题没处理，很多问题都是崩溃之类的。

### 启动速度不能太慢

其实优化 VSCode 插件启动速度也是一门学问，最常见也是比较有效的就是对命令使用懒加载。当然，也很有可能插件在被激活的时候就做了一些比较慢的操作。有不少插件激活方式用的是 `*`，也就是在启动 VSCode 的时候启动插件，这会降低 VSCode 的启动速度。VSCode 最近加了一个新的插件激活方式 `onStartupFinished` 让你在 VSCode 启动后再激活插件，这样插件就不会影响 VSCode 启动速度，不过还是有不少插件没迁移过来。

### 对插件体积有追求

比较排斥那种发布 VSCode 插件还把整个 node_modules 一起发布的，建议阅读 johnsoncodehk 老哥的这篇文章 [Checklist for Building Minimize Size Extension](https://github.com/volarjs/volar.js/discussions/6)，有时间我可能也会写一篇文章去介绍优化插件体积的总总。实在是不愿意折腾的建议直接用我的 VSCode 插件开发模版 [awesome-vscode-extension-boilerplate](https://github.com/tjx666/awesome-vscode-extension-boilerplate)。你想想看，你 VSCode 装了 100 多个插件，这 100 多个插件都带 node_modules 那是啥情况。

### 对代码质量有追求

我每次体验一个 VSCode 插件之前都会去它的代码仓库看看，如果看到下面的问题在我心里是扣分的：

- 明明可以采用命令激活或者语言激活插件的还用 `*` 或者 `onStartupFinished` 激活方式
- tsconfig.json 的 target 写 es6 的，这意味着它代码里面的 async 函数全部编译成生成器那一堆东西，明明 VSCode 的 node 都 16 了，再过几个月都要上 18 了，还搁那 es6 也就是 es2015
- 用 js 写插件的，如果我对插件的作者不熟，看到他用 js 写插件第一感觉绝对会认为他是个菜逼
- 没有 Changelog，有必要搞这么神秘吗？
- 给你加一堆快捷键和菜单。VSCode 目前还没有支持让用户自定义菜单，你给用户加一堆菜单对我这种 13 寸屏幕的用户简直就是灾难。快捷键完全可以让用户自定义，你加一堆快捷键还得我给你一个个删了。有些人总搁那喷 VSCode 慢，也不想想其实你每加一个快捷键，加一个菜单其实也是在拖慢 VSCode 速度。
