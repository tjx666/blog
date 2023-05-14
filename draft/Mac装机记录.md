## 机器配置

旧机器：

- MacBook Pro 2019 13 寸
- 1.4 GHz 四核 Intel Core i5
- 16 GB 内存 250G SSD

新机器：

- MacBook Pro 2020 13 寸
- M1 芯片
- 16G 内存 245G SSD

最后一台无刘海 + Touch bar + M 芯片的 mbp。

## 初始化系统

机器拿到手的时候是在选择系统语言界面，按部就班走流程，需要注意的有：

- 先不使用 Apple Id 登入，ICloud 并不支持同步系统设置，分辨率，手势设置都需要重新设置一遍，所以不急着登入。
- 用户账号使用自己的姓名拼音全拼，你也不想每次打开 terminal 对着一个意义不明的 home 目录名敲命令吧
- 不共享故障数据给苹果和开发者，尤其是对于重视自己隐私的用户

## 准备工作

- 更新最新的系统 Ventura
- 登入 Apple Id，目的是为了从 Apple Store 安装应用
- Apple Store 下载安装[微信](https://weixin.qq.com/)，先装它的目的是为了手机上传文件过去
- Safari 下载安装[搜狗输入法](https://pinyin.sogou.com/mac/)，不理解为什么有人喜欢折腾别的输入法。使用微信账号同步数据，我已经全面放弃 QQ 账号，即便是已经用了好几年的 QQ 音乐和腾讯视频。
- 安装配置 [ClashX](https://github.com/yichengchen/clashX/releases)，日常代理工具，手机上下载好最新版本通过微信传输到新 Mac 上

## [Chrome](https://www.google.com/chrome/)

Safari 又号称 Chrome 下载器，开启代理后，从 <https://www.google.com/chrome/> 下载安装 Chrome，而不是去 <https://www.google.cn/intl/zh-CN/chrome/>。很多国内专属版应用总是被代理商加入各种奇奇怪怪的东西，最好还是从原始的官网下载。

我平常浏览器只用 Chrome，使用 Google 账号同步数据。Chrome 默认走的就是系统代理，配置好代理后登入自己的账号，等待插件同步完成。

### flags

打开  <chrome://flags>，以下是我开启的 flags：

- Parallel downloading 强烈推荐，多线程下载加速。
- Experimental QUIC protocol
- Experimental JavaScript
- Future V8 VM features
- Enable experimental cookie features
- Enable the battery saver mode feature in the settings
- Enable the high efficiency mode feature in the settings

### 一些日常在用的 Chrome 插件

- [Better History](https://chrome.google.com/webstore/detail/better-history/egehpkpgpgooebopjihjmnpejnjafefi) 我觉得 Chrome Devtools 团队是在做事情的，每个月都有惊喜。但感觉 Chrome 浏览器本身的产品经理正事不干，净添乱。Chrome 浏览器本身非常简陋，自带的历史记录很难用。
- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) 拦截网页广告
- [Vimium C](https://chrome.google.com/webstore/detail/vimium-c-all-by-keyboard/hfjbmagddngcpeloejdejnfgbamkjaeg) 虽然我不用 VIM 写代码，但是用 VIM 的方式来操作网页确实挺方便。不用原版是因为原版不咋更新了，和这个国内开发者在 github issue 交流还是蛮愉快的。
- [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) 分组功能对我很有用，用来管理平时不同的业务需求对应的几个常开的网页。我不是那种同时开几十个网页的那种，超过三个都觉得太乱了
- [沙拉查词](https://chrome.google.com/webstore/detail/%E6%B2%99%E6%8B%89%E6%9F%A5%E8%AF%8D-%E8%81%9A%E5%90%88%E8%AF%8D%E5%85%B8%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91/cdonnmffkdaoajfknoeeecmchibpmkmg) 翻译工具千千万，选你合适的就好。等我搞定 ChatGPT 订阅的问题，可能会考虑换到 [openai-translator](https://github.com/yetone/openai-translator)
- [Infinity 新标签页](https://chrome.google.com/webstore/detail/infinity-new-tab-pro/nnnkddnnlpamobajfibfdgfnbcnkgngh) 标签页插件千千万，有人喜欢 Momentum，有人喜欢掘金标签页，有人喜欢直接打开某个网页，有人直接默认，反正我这个老年人还是觉得点点点方便点。使用微信账号登入，同步数据。
- [Refined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf) 大佬出品，维护积极，高度自定义，完美！
- [Notifications Preview for GitHub](https://chrome.google.com/webstore/detail/notifications-preview-for/kgilejfahkjidpaclkepbdoeioeohfmj) Github 虽然一直在做事，但太慢了，新的 Code Search 不错，可以替代 Octo Tree。这个插件的功能不知道啥时候能内置，让你不用打开 issue 页面就预览消息页表，简直不要太方便。
- [OctoLinker](https://chrome.google.com/webstore/detail/octolinker/jlmafbaeoofdegohdhinkhilhclaklkp) 最近没咋用了，一直没有适配最新的 Code Search。
- [Minimal Theme for Twitter](https://chrome.google.com/webstore/detail/minimal-theme-for-twitter/pobhoodpcipjmedfenaigbeloiidbflp) 装上它后，刷 twitter 的瘾更大了，更喜欢摸鱼了
- [v2ex plus](https://chrome.google.com/webstore/detail/v2ex-plus/daeclijmnojoemooblcbfeeceopnkolo) 好像最近同类的插件在 V2EX 上卷起来了，但是我觉得这个已经够用了
- [Hover Zoom+](https://chrome.google.com/webstore/detail/hover-zoom%20/pccckmaobkjjboncdfnnofkonhgpceea) 配合触发键查看图片和视频预览挺方便的
- [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) 当你实在是对某些网站的设计下不了眼的时候，它就很有用了
- [Wappalyzer](https://chrome.google.com/webstore/detail/wappalyzer-technology-pro/gppongmhjkpfnbhagpmjfkannfbllamg) 查看网页用到的技术
- [JSON Viewer Pro](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc) 可能不是最好用的 JSON Viewer，但绝对是最好看的
- [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) 用的最多的是反倒是切换系统代理和直连，其它可能用到的场景例如配置网页走 charles 代理，调试网页接口
- [Chrono](https://chrome.google.com/webstore/detail/chrono-download-manager/mciiogijehkdemklbdcbfkefimifhecn) 上上一次更新好像还是几年前。今年忽然诈尸了

以上是部分我日常在用的插件，其实还有一些开着但不常用，以及装了但是平时禁用的插件就不介绍了，总共有 90 多个插件。好在 Chrome 支持同步安装的插件和插件数据，只要登入了 Google 账号就能把旧电脑上的插件同步过来了。

其中一些 github 相关的插件需要重新生成 token。

### [TamperMonkey Beta](https://chrome.google.com/webstore/detail/tampermonkey-beta/gcalenpjmijncebpfijmoaglllgpjagf)

用 Beta 是因为某些 api 稳定版没有。在旧的设备上利用它自带的备份功能将最新的脚本备份到 Google Driver，再在新设备上恢复最新的备份。

以下几个是日常在用的脚本：

- [Refined GitHub Reactions](https://github.com/patak-dev/refined-github-reactions) 社区总是喜欢教 Github 做事
- [Anti Redirect](https://github.com/axetroy/anti-redirect) 去除重定向
- [Bilibili Evolved](https://github.com/the1812/Bilibili-Evolved) B 站用户必备
- [DouyuEx](https://github.com/qianjiachun/douyuEx) 斗鱼用户必备

### 其它浏览器

预计后续还会安装以下浏览器：

- [Chrome Canary](https://www.google.com/intl/zh-CN/chrome/canary/)
- [Firefox](https://www.mozilla.org/en-US/firefox/new/)
- [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)

等用到它们的时候再安装不迟。其实也就测试新的 api，或者测试兼容性还有调试专属 bug 才会用到。

## 应用软件

多数软件都是开源免费的，以下是日常在用的，所以先安装：

- [Draw.io](https://github.com/jgraph/drawio-desktop) 不会画流程图的程序员不是好程序员，注意下载的时候选择 arm64 版本
- [MonitorControl](https://github.com/MonitorControl/MonitorControl) 调节外接显示器亮度
- [Obsidian](https://github.com/obsidianmd/obsidian-releases) 多数时候是用来记 TODO 的
- [QQ 音乐](https://y.qq.com/) 版权最多的国内音乐平台，其实更多时候我是开着 Youtube 音乐合集，除非喜欢的歌手发了新歌，可能就用它单曲循环
- [Snipaste](https://www.snipaste.com/) 截图标注界的神
- [Typora](https://typora.io/) 付费用户，弥补了 Obsidian 不能单独打开 Markdown 编辑的问题，暂时还是写博客的主力工具，后续可能会迁移到使用 Obsidian 写博客
- [柠檬清理](https://github.com/Tencent/lemon-cleaner) 腾讯开源的系统维护工具
- [钉钉](https://page.dingtalk.com/wow/z/dingtalk/simple/ddhomedownload#/) 公司用的 IM 工具

以下很少用，用到的时候再安装：

- [Adobe After Effects](https://www.macw.com/mac/3727.html)
- [Adobe Photoshop](https://www.macw.com/mac/4244.html) 和 AE 一样都是工作内容强相关应用
- [Better Display](https://github.com/waydabber/BetterDisplay) 显示器设置工具
- [Charles](https://www.charlesproxy.com/) 以前调试移动端 app 用到过
- [IINA](https://github.com/iina/iina) 视频播放器
- [Key Codes](https://apps.apple.com/cn/app/key-codes/id414568915?mt=12) Debug Key Code 的时候很有用
- [KeyCastr](https://github.com/keycastr/keycastr) 录屏时显示键盘输入
- [MacUpdater](https://www.corecode.io/macupdater/) 我不用它去更新，只用来查看哪些 app 可以更新，可能会考虑入正
- [Maccy](https://github.com/p0deje/Maccy) 剪贴板管理器，批量复制
- [OSS Browser](https://github.com/aliyun/oss-browser) 之前把 CDN 当数据库存东西的时候，感觉图形化操作还是很方便的
- [Parallels Desktop](https://www.macw.com/) 之前测试一个 Electron 客户端的时候经常要在 Windows 上跑
- [PicGo](https://github.com/Molunerfinn/PicGo) 图床应用，自从 sm.ms 不支持国内用户后就不咋用了
- [Postman](https://www.postman.com/downloads/?utm_source=postman-home) 调式接口
- [QQ](https://im.qq.com/macqq/index.shtml) 某些人只有 QQ 联系方式
- [Silicon](https://github.com/DigiDNA/Silicon) 查看已经安装的软件哪些是 intel 芯片的哪些是 arm 的
- [ScreenFlow](https://www.macw.com/mac/3537.html) 录屏工具
- [Sourcetree](https://www.sourcetreeapp.com/) 其实 VSCode 内置的 Source Control + Gitlens（我是付费用户） 对我来说已经完全够用。
- [stats](https://github.com/exelban/stats) 有些系统参数还是得用它来看
- [Telegram](https://macos.telegram.org/) 一些隐私要求比较高的场景需要用它
- [Unarchiver](https://theunarchiver.com/) 解压工具
- [Warp](https://www.warp.dev/) 骚气的现代 Terminal，不过对我说其实有点花里胡哨了，我连 Fig 补全都不用，[fzf-tab](https://github.com/Aloxaf/fzf-tab) 对我来说足矣
- [WPS](https://mac.wps.cn/) 上一次用它还是帮我姐处理照片格式问题
- [百度网盘](https://pan.baidu.com/download#pan)
- [迅雷](https://mac.xunlei.com/) 国内下载磁力速度这块真没能打得过迅雷的吧？不过现在动不动就因为版权问题下载不了也是很久没用了
- [速享](https://github.com/nightmare-space/speed_share) 应该是最好的局域网跨端传输客户端工具

## 安装字体

- [Fira Code](https://github.com/tonsky/FiraCode) 代码字体
- [Meslo Nerd Font](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k) 终端字体, 支持显示各种图标，这个后面配置 powerlevel10k 的时候就会自动安装

## 开发环境配置

### [VSCode](https://code.visualstudio.com/)

我用的是稳定版的 VSCode，安装的时候注意选择苹果芯片版本的安装包。

之前有一段时间一直用的是 insiders 版本，现在我只用稳定版：

- insiders 版本有时候会出现严重 bug 而且还不是一两天就能修好，有些问题都没法 reproduce，会影响我开发进度
- 很多插件没有对 insiders 版做适配和测试

VSCode 自带设置同步功能，我选择使用 Github 账号登入。

### [Iterm2](https://iterm2.com/)

其实我日常用的最多的 terminal 是 VSCode 的集成 terminal，其次就是 iterm2。Warp 暂时还没有啥吸引我转过去的杀手级优势，反倒很多功能都是没有的，例如 Key Mapping。

安装完后切换 Minimal 主题。

### [HomeBrew](https://brew.sh/)

在 finder 中打开 home 目录，通过 `cmd + shift + .` 显示隐藏文件。新增 `.zshrc` 文件，加入代理配置（把代理开关封装成一个 zsh 函数），类似：

```bash
function proxy() {
  export http_proxy="http://127.0.0.1:8888"
  export https_proxy="http://127.0.0.1:8888"
  echo "HTTP Proxy on"
}
```

打开 iterm2，开启终端代理，按照官方文档安装 homebrew, 这个过程中会安装 Command Line Tools for XCode，会比较慢。

### 安装常用命令行工具

使用 brew 安装以下命令行工具：

- [git](https://git-scm.com/)， 替换苹果内置的 git，方便后续通过 brew 更新
- [lsd](https://github.com/lsd-rs/lsd)
- [fd](https://github.com/sharkdp/fd#installation)
- [rg](https://github.com/BurntSushi/ripgrep)
- [fzf](https://github.com/junegunn/fzf)

通过命令 `brew leaves` 输出所有手动安装的包（排除依赖包）：

```bash
axel
bat
bcal
bitwise
bottom
cloc
cmatrix
croc
difftastic
dog
double-conversion
dua-cli
duf
dust
egoist/tap/dum
eva
fd
fmt
fnm
fx
gh
git
git-delta
git-filter-repo
git-quick-stats
glog
gnu-time
gnutls
gping
graphviz
htmlq
htop
httpie
hyperfine
ipinfo-cli
jq
lsd
lua
mkcert
neofetch
neovim
nghttp2
nginx
onefetch
oven-sh/bun/bun
pcalc
progress
pyenv
python@3.10
ripgrep
shared-mime-info
tokei
tree
ugit
yq
zoxide
```

### 配置 shell

#### [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)

zsh 框架

修改以下配置：

```bash
HIST_STAMPS="yyyy-mm-dd"
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
```

安装以下非官方插件：

- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
- [you-should-use](https://github.com/search?q=you-should-use&type=repositories)
- [fzf-tab](https://github.com/Aloxaf/fzf-tab) 强烈推荐，也是我为啥一直没有用 [fig](https://github.com/withfig/autocomplete) 和 warp 的原因

#### [powerlevel10k](https://github.com/romkatv/powerlevel10k)

zsh prompts，安装完后初次打开 terminal 会运行 `p10k configure`，下载字体需要走代理，因此你可能需要先开启全局代理。

修改以下配置：

```bash
# 显示具体的错误码
typeset -g POWERLEVEL9K_STATUS_ERROR=true
# 命令执行时间精度改为 ms
typeset -g POWERLEVEL9K_COMMAND_EXECUTION_TIME_PRECISION=1
# 修改默认 Nodejs 图标
typeset -g POWERLEVEL9K_NODE_ICON='\uF898'
```

### nodejs

使用 [fnm](https://github.com/Schniz/fnm) 管理 node 版本，安装最新的 lts node V18.16.0。

使用 [corepack](https://nodejs.org/docs/latest-v18.x/api/corepack.html) 安装 pnpm。

在旧设备上使用 `pnpm ls -g` 列出所有全局安装的命令行工具：

```bash
@antfu/ni 0.21.3
@ast-grep/cli 0.4.1
@gdcli/cli 2.3.22
@growing-web/wpm 0.3.1
@rafaelrinaldi/whereami 2.2.1
@vscode/vsce 2.19.0
@yutengjing/find-similar-packages 0.0.3
carbonyl 0.0.2-next.bacf3db
cnpm 9.2.0
cross-port-killer 1.4.0
envinfo 7.8.1
eslint-nibble 8.1.0
esno 0.16.3
find-versions-cli 4.0.0
generator-code 1.7.6
is-my-node-vulnerable 1.3.0
npkill 0.11.3
npm-check-updates 16.10.10
nrm 1.2.5
open-cli 7.2.0
ovsx 0.8.1
pkg 5.8.1
prm-cli 0.0.30
semver 7.5.0
serve 14.2.0
stale-dep 0.6.0
syncpack 9.8.6
taze 0.10.1
tldr 3.3.8
ts-node 10.9.1
tsx 3.12.7
typescript 5.0.4
unimported 1.27.1
vite-perf 0.1.0
yo 4.3.1
```

有很多，用到的时候再装。

#### [Rust](https://www.rust-lang.org/tools/install)

直接按照官网提示使用 `rustup` 安装 `rust`。

使用 `cargo install --list` 列出 cargo 全局安装的命令行工具。

```bash
cargo-update v11.1.1:
    cargo-install-update
    cargo-install-update-config
grex v1.4.1:
    grex
rusti-cal v1.0.1:
    rusti-cal
xcp v0.9.3:
    xcp
```

#### [Golang](https://go.dev/dl/)

直接从官网下载安装器安装最新的 Golang。

使用 `ls $GOPATH/bin` 列出所有全局安装的命令行工具。

```bash
clash-speedtest  github-compare   go-global-update
```
