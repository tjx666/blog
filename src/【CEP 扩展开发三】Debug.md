通过第二篇的教程我们已经可以初步上手开发 CEP 插件了。实际的开发工作中，随着业务的增多和复杂度的加深，单凭人肉代码来定位和修复 bug 会变得越来越困难。这时候，debug 工具就显得尤为强大和高效了。由于 CEP 架构的特殊性，本篇将会按照不同的环境分别讲述对应的 debug 方法。

## 浏览器环境代码 debug

由于 CEP 的浏览器环境代码下可以直接使用 nodejs 代码，因此浏览器 v8 的代码和调式 nodejs v8 的代码是可以混在一起调试的，也就是说 debug 的时候你可以直接从浏览器原生代码跳进 nodejs 的函数，再跳回来。

### 配置 .debug 文件

在开启了 CEP 的 debug 模式后，我们便可以在不签名的情况下加载 CEP 插件。如果需要 debug 浏览器环境的代码或者查看浏览器的 DOM 元素，首先要做的便是配置 .debug 文件。

在 CEP 项目的根路径增加 .debug 文件。这是一个 xml 格式的文件，需要注意的是虽然是 xml 格式，但是**不能使用注释语法**。之前我就踩过这个坑，查了半天才发现之所以没法 debug 居然是因为我在 xml 文件里用了注释语法...。 在添加完 .debug 文件后记得先关闭面板再重新打开面板让 ps 加载 .debug 文件。

```xml
<!-- !!! 拷贝这段代码去用的时候记得删掉所有注释 -->
<!-- 可以指定多个插件面板的 debug 配置 -->
<ExtensionList>
    <!-- id 为面板 id -->
    <Extension Id="org.ytj.helloWorld.panel">
        <HostList>
            <!-- 不同的宿主可以使用不同的端口号 -->
            <!-- port 为 chromium remote debug 的端口 -->
            <Host Name="PHSP" Port="9999" />
            <Host Name="PHXS" Port="9999" />
        </HostList>
    </Extension>
</ExtensionList>

```

如果这个时候我们查看一下 tcp 端口占用，我们会发现 CEP 的 Html engine 占用了 9999 这个 tcp 端口：

```bash
# lstcp 是一个 alias
alias lstcp="sudo lsof -iTCP -sTCP:LISTEN -P -n"
```

![tcp 端口占用情况](https://s2.loli.net/2022/08/14/moWAnqOLwVGQp3C.png)

由于这个文件的后缀名不是 xml, 因此 vscode 无法识别它为 xml，为此我们需要配置 vscode 的文件类型映射：

```json
// .vscode/settings.json
{
  "files.associations": {
    // 将所有 jsx 代码映射为 javascript 代码而不是 javascriptreact
    "**/JSX/**/*.jsx": "javascript",
    // .debug 文件映射为 xml
    ".debug": "xml",
    // 将 scripting listener 的 日志文件识别为 javascript
    "**/Desktop/ScriptingListenerJS.log": "javascript"
  }
}
```

### 使用 chrome 远程调试

我们 debug 浏览器环境代码采用的是 remote debug，如果你以前有开发过移动端网页，使用 chrome 远程调式过 node/react native 之类的话应该对 remote debug 很熟悉了。

通过上面的配置我们给我们的面板扩展指定了远程调式的端口号：9999。接下来我们使用 chrome 打开地址 `chrome://inspect`，启用 `Discover network targets`，点击 `Configure...` 按钮来配置 chrome 扫描的端口号，我们添加 `localhost:9999`。刷新一下，就可以在 remote target 列表中找到 PS 托管的插件服务了。

![Chrome Inspect](https://s2.loli.net/2022/08/14/n4CFqdoVu5WmAlz.png)

点击上图中的 `inspect` 按钮可以打开 remote devtools 窗口对浏览器代码进行调试了。

![Debug 浏览器代码](https://s2.loli.net/2022/08/14/9jy32GYUXDCnqOh.png)

### 踩坑记录

1. 如果你是使用 edge 浏览器来调试，`chrome://inspect` 对应的是 `edge://inspect`
2. 实测在 Windows 系统上当你打开 `chrome://inspect` 页面，扫描到 CEP 的 remote target 会比较慢，10s 以内都不奇怪。
3. 每次当你关闭调式中的 CEP 扩展，当前的 remote devtools 窗口都会失效，需要你从新到 `chrome://inspect` 页面点击 `inspect` 打开新的 devtools 窗口
4. 目前 CEP 的 debug 有个 bug，在开着 devtools 的情况下，很多 DOM 事件会失效。例如 hover 事件，mouseMove 事件等。所以当你在调试如按钮的 hover 样式或者 mouseMove 事件代码时请关掉 devtools 窗口。这也是我为什么会自己还封装了一套跨端的日志框架的原因。

演示的代码对应这次提交：[配置调试浏览器代码](https://github.com/tjx666/cep-hello-world/commit/62ab13ad596b48826ec9f0ae115384daacd8ba3d)
