如果要说 VSCode 哪个特性极大的提高了编码效率，多光标编辑绝对是其中之一。多光标编辑让我们避免重复进行相同的文本操作，VSCode 内建的和第三方扩展提供的文本处理命令更是能极大的增强多光标编辑的灵活性。希望通过阅读这篇文章，能够教会读者如何在日常编辑中灵活运用多光标编辑。

内容大纲：

- 如何添加多光标
- 移动光标
- 选中文本
- 删除文本
- 文本处理命令
- 多光标实战示例
- 多光标外更好的选择

## 如何添加多光标

### 通用的方法

按住 <kbd>⌥</kbd> 键不放，再将光标移动到任何你想添加光标的地方直接点击就会增加一个光标。

![通用的方法](https://s2.loli.net/2022/03/26/e5Bybvk9nurJqSc.gif)

### 添加光标的快捷键

> VSCode 中和光标相关的快捷键中都有 ⌥ 键

我们可以通过 <kbd>⌘</kbd>+<kbd>K</kbd>, <kbd>⌘</kbd>+<kbd>D</kbd> 快捷键组合打开 VSCode 快捷键表，搜索 `cursor` 会列出所有和光标有关的快捷键，搜索 `add cursor` 就可以查看和 `添加多光标` 相关的快捷键：

![VSCode 添加多光标快捷键.png](https://s2.loli.net/2022/03/27/oUiHwexWBvOy8RP.png)

同一列添加光标：

- <kbd>⌥</kbd>+<kbd>⇧</kbd>+<kbd>↓</kbd>: 向下一行同一列添加光标
- <kbd>⌥</kbd>+<kbd>⇧</kbd>+<kbd>↑</kbd>: 向上一行同一列添加光标

![同一列添加光标](https://s2.loli.net/2022/03/26/eGUiylqvfCO3mZn.gif)

### 添加选区

VSCode 中可以同时存在多个光标，也可以同时存在多个选区。在 VSCode 中大多数添加选区的命令，添加选区的同时也会添加一个光标。因此我们可以利用添加选区的快捷键来添加多光标。

常用的有：

- <kbd>⌘</kbd>+<kbd>D</kbd>：添加选区到下一个查找到的匹配
- <kbd>⌘</kbd>+<kbd>⇧</kbd>+<kbd>L</kbd>: 添加选区到所有查找到的匹配

![添加选区](https://s2.loli.net/2022/03/26/bPfYT5J8v6BwAnz.gif)

上面两个快捷键虽然是说查到到的匹配，实际上使用的时候并不会展开搜索框。

VSCode 提供的命令很多时候是满足对称性的，例如 <kbd>⌘</kbd>+<kbd>D</kbd> 是添加选区到下一个查找到匹配，那么大概率就会有一个命令用于添加选区到前一个查到到的匹配。

![添加选区快捷键](https://s2.loli.net/2022/03/26/tpfR7xWMGKO8cmD.png)

如过要查找的文本比较复杂，我们可以直接先打开搜索，利用搜索框提供的大小写忽略，匹配整个单词，正则功能来查找复杂的文本，再使用 <kbd>⌘</kbd>+<kbd>⇧</kbd>+<kbd>L</kbd> 来选中所有。

![通过搜索来添加选区](https://s2.loli.net/2022/03/26/sIfcbknyrYqHu7j.gif)

**如果已经有一个选区**，我们可以使用快捷键 <kbd>⌘</kbd>+<kbd>⌥</kbd>+<kbd>I</kbd> 来在选区的所有行尾添加光标。如果这个时候你想将光标移动到行首，直接输入 Home 键即可。

下面的例子就是先选中多行，再将光标添加到所有行的行尾，将 ts interface 的每个属性行尾改成使用逗号分隔：

![添加光标到选区行尾](https://s2.loli.net/2022/03/26/PfxdhvnlyTbrFsN.gif)

## 光标移动

多光标编辑的时候显然是不能使用鼠标定位的，这就要求我们使用按键去移动。最基本的上下左右四个箭头，Home, End 键就不用多说了。除此之外，常用的还有每次移动一个单词，或者单词的一部分。

通过搜索 `cursor right`，`cursor end` 之类的可以查看和移动光标相关的快捷键：

![cursor right](https://s2.loli.net/2022/03/26/Cu3JZXQE5kPdTpt.png)

单词级别的移动是非常常用的：

- <kbd>⌥</kbd>+<kbd>→</kbd>：向右移动光标到下一个词尾
- <kbd>^</kbd>+<kbd>⌥</kbd>+<kbd>→</kbd>：向右移动光标到单词的下一部分

![移动一个单词](https://s2.loli.net/2022/03/27/H8a1CgQyIMo96PX.gif)

之前说过 VSCode 命令的对称式设计，<kbd>⌥</kbd>+<kbd>→</kbd> 是向右移动到下一个词尾，那么 <kbd>⌥</kbd> + left 就是向左移动上一个词首。

而且这里也验证了之前我们说的，和光标相关的快捷键都有 <kbd>⌥</kbd>，所以我们自定义快捷键时，和光标相关的快捷键最好也带上 <kbd>⌥</kbd>。例如可以定义 <kbd>⌥</kbd>+<kbd>J</kbd> 为移动到下一个 git change 处，也可以在对称式设计 <kbd>⌥</kbd>+<kbd>K</kbd> 移动到下一个 git change 处。方便记忆，也方便搜索。

有些 Mac 用户可能会觉得光标移动太慢，这个可以在 设置 -> 键盘中调节，让光标移动的更丝滑：

![按键重复](https://s2.loli.net/2022/03/27/VIFTDUeOj3xhWub.png)

- 拖移“重复前延迟”滑块以设置字符开始重复前的等待时间。
- 拖移“按键重复”滑块以设置字符重复的速率。

## 选中文本

在多光标编辑时，最常见操作便是移动，选中，删除，插入等。

> 移动光标的快捷键加上 <kbd>⇧</kbd> 就是选中移动区域的快捷键

稍微列举几个例子验证这个规律：

- <kbd>→</kbd> 是向右移动一个字符，<kbd>⇧</kbd>+<kbd>→</kbd> 可以向右选中下一个字符
- <kbd>↑</kbd> 是向上移动一行，<kbd>⇧</kbd>+<kbd>↑</kbd> 就是向上选中一行
- <kbd>⌥</kbd>+<kbd>→</kbd> 是向右移动到词尾, <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>→</kbd> 就是选中光标当前位置到下一个词尾
- <kbd>^</kbd>+<kbd>⌥</kbd>+<kbd>→</kbd> 是向右移动到单词的下一部分, <kbd>⇧</kbd>+<kbd>^</kbd>+<kbd>⌥</kbd>+<kbd>→</kbd> 就是向右选中单词的一部分

![向右选中一个单词](https://s2.loli.net/2022/03/27/kvUpF7jsigO6nzo.gif)

有个需要单独介绍的选中命令是 `smart select`。我们知道快捷键 `cmd + D` 可以选中一个单词，但如果想选中一个字符串它就不行了，这个时候可以就可以用智能选中来实现。

- ctrl + shift + arrRight：扩大选中范围
- Ctrl + shift + arrLeft：减小选中范围

![smart select](https://s2.loli.net/2022/03/27/ZrVjpihockGnUsq.gif)

## 文本处理命令

在多光标编辑时我们可以借助 VSCode 自带的或者第三方扩展提供的命令来快捷插入特定文本或者将选中文本转换成特定文本。

VSCode 内置的有下面几个，以单词 `letterCase` 举例，转换结果分别为：

- Transform to Uppercase：`LETTERCASE`
- Transform to Lowercase：`lettercase`
- Transform to Title Case：`LetterCase`
- Transform to Snake Case：`letter_case`

搜索 `transform to` 就可以找到所有文本转换命令了

![VSCode 内置文本命令](https://s2.loli.net/2022/03/27/oZq4289Ehf5tyBu.png)

举个实际的使用例子，例如我们要把一堆原本是小驼峰的常量改成全大写：

![转换常量为全大写](https://s2.loli.net/2022/03/27/kixECvjdOuzI8sn.gif)

除了 VSCode 内置的文本处理命令，还可以借助第三方插件，这里推荐：[Text Power Tools](https://github.com/qcz/vscode-text-power-tools)。推荐理由：维护积极，功能丰富。

功能非常多，读者可以查看扩展主页自行了解。我觉得如果你没有探索精神和折腾的能力估计也看不到文章这里了。我这里只演示一下插入数字的功能：

![插入数字](https://s2.loli.net/2022/03/27/xVEdyK8uoGqQbOj.gif)

有能力的读者也可以自己编写 VSCode 扩展去实现更多的插入，转换，甚至删除等文本处理命令。需要注意的是实现的时候要处理所有选中，例如笔者的 VSCode 扩展 [VSCode FE Helper](https://github.com/tjx666/vscode-fe-helper) 实现的将选中单词变复数的扩展是下面这样实现的，代码很简单。可以注意到里面遍历了所有选区，所以在多光标编辑时调用这个命令时能够处理所有选中：

```
import { TextEditor } from 'vscode';

export default async function plur(editor: TextEditor): Promise<void> {
    const { default: pluralize } = await import('pluralize');
    editor.edit((editorBuilder) => {
        const { document, selections } = editor;
        for (const selection of selections) {
            const word = document.getText(selection);
            const pluralizedWord = pluralize(word);
            editorBuilder.replace(selection, pluralizedWord);
        }
    });
}
```

![pluralize](https://s2.loli.net/2022/03/27/Uo5AYIL6t9gr4Gx.gif)

## 多光标实战示例

接下来我会演示几个我平时用到多光标的几个例子。可能对不熟悉多光标编辑的朋友看着会有点复杂，不过自己实操一遍多练练应该就没问题。我平时开发的时候经常会用到多光标编辑，但没有文中演示的那么丝滑，可能步骤也不是最少的，但还是比重复编辑效率高多了。也会经常输错，但是没关系反正可以撤回嘛。

### 替换 var

众所周知，当你学会了 ctrl + c, ctrl + v，你已经是个初级程序员了。当你不但能够抄代码还能够改别人的代码，那么你已经是个成熟的程序员了。学会了多光标编辑，可以大大提高那我们修改代码的效率。

当我们从 stackover 抄了一段 JS 代码下来，可能里面有很多 var，我们可以利用多光标编辑来将所有 var 替换成 let。

Steps:

1. 将光标定到 var 上
2. cmd + shift + L，来选中所有 var
3. 输入 let

![替换 var](https://s2.loli.net/2022/03/27/z9DTBNwlXCMojYJ.gif)

### 安装多个 node package

有时新开了一个项目，我会需要安装很多 eslint 插件，最开始我是到之前项目的 package.json 中一个一个抄过来，那太麻烦了。有人说，你咋不直接把包名和版本号一块复制过去就好了，不直接复制主要是版本号不一定是最新的，新项目需要安装最新的版本。

Steps:

1. 打开 package.json，把光标定到第一个包名
2. Cmd + alt + arrDown 添加多个光标到多个包名
3. ctrl + shift + arrRight，利用 `smart select` 选中包名并 cmd + c 复制
4. cmd + n，新建一个临时文件，cmd + v 粘贴过去
5. 把光标定到第二行的行首，cmd + alt + arrDown 往下面同一列添加多光标
6. 先 Backspace，再敲一个空格就可以把整个文本复制到 terminal 了

![安装多个 node package](https://s2.loli.net/2022/03/27/fLGTtunjhi6pmd9.gif)

### 重构 react router path 为枚举

原代码：

```typescript
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/exporting" element={<Exporting />} />
                <Route path="/exportSuccess" element={<ExportSuccess />} />
                <Route path="/exportFailed" element={<ExportFailed />} />
                <Route path="/sizeOverflow" element={<SizeOverflow />} />
                <Route path="/problems" element={<Problems />} />
            </Routes>
        </HashRouter>
    );
}
```

要重构为：

```typescript
export function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path={RoutePath.Settings} element={<Settings />} />
                <Route path={RoutePath.Collection} element={<Collection />} />
                <Route path={RoutePath.NotFound} element={<NotFound />} />
            </Routes>
        </HashRouter>
    );
}

enum RoutePath {
    Settings = 'settings',
    Collection = 'collection',
    NotFound = 'notFound',
}
```

挑选这个例子主要是因为操作过程中用到了文本处理命令来处理大小写问题，由于步骤太多，大家就直接看动图演示吧：

![重构 react route path](https://s2.loli.net/2022/03/27/Ri9qLBJkE8bf63A.gif)

### 实现 LetterMapper 类型

在我 [TypeScript 类型体操实例解析](https://github.com/tjx666/blog/blob/main/src/TS%20%E7%B1%BB%E5%9E%8B%E4%BD%93%E6%93%8D%E5%AE%9E%E4%BE%8B%E8%A7%A3%E6%9E%90.md) 这篇文章中有实现过一个将字符串字面量类型中所有转换成大写的类型：

```typescript
type LetterMapper = {
  a: 'A';
  b: 'B';
  c: 'C';
  d: 'D';
  e: 'E';
  f: 'F';
  g: 'G';
  h: 'H';
  i: 'I';
  j: 'J';
  k: 'K';
  l: 'L';
  m: 'M';
  n: 'N';
  o: 'O';
  p: 'P';
  q: 'Q';
  r: 'R';
  s: 'S';
  t: 'T';
  u: 'U';
  v: 'V';
  w: 'W';
  x: 'X';
  y: 'Y';
  z: 'Z';
};

type CapitalFirstLetter<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends keyof LetterMapper
    ? `${LetterMapper[First]}${Rest}`
    : S
  : S;
```

这个 LetterMapper 类型手敲会觉得很浪费光阴，让我们用多光标编辑酷炫的实现它：

![Letter Mapper](https://s2.loli.net/2022/03/27/pA8dDa7h3zcKYIJ.gif)

