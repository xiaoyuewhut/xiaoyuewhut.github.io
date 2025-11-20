---
title: blog写作
date: 2025-11-20 11:46:58
tags:
- hexo
categories:
- 其他
---
# 创建md文件
假设整个的项目文件夹是 `my-blog`，在这个文件夹下：
``` bash
hexo new "latex-test"
```

Hexo 会在 `source/_posts/` 目录下自动生成一个 Markdown 文件，比如：
```markdown
---
title: LaTeX 测试
date: 2023-11-20 12:00:00
categories: 
- 其他
- 测试
tags:
- latex
---

## 这是一个测试

行内公式：$E = mc^2$

块级公式 (薛定谔方程)：
$$
E = m c^2
$$

\begin{equation}
E = m c^2
\end{equation}
```

需要在这里配置文章的标题、分类、标签等.

# 插入图片
在 `_config.yml`文件中，把 `post_asset_folder: true`设置好。
这样的话，每次 `hexo new` 的时候都会创建同名文件夹来放图片，插入图片的时候要注意，不能用标准的markdown格式，必须：
```markdown
{% asset_img uds.PNG "UDS服务概览" %}
```
这样的话，路径会被自动处理。
但是现在又有新的问题产生，就是在vscode里，没发预览这个图片。

**没什么好的解决方法，换typora吧**。



# 本地预览
在发布前，可以在本地检查一遍排版和公式是否正常。
```bash
hexo clean && hexo s
```
通过 VS Code 的端口转发（`localhost:4000`）在本地电脑浏览器上查看文章

# 发布部署
```bash
hexo g -d
# 也可以分开写：hexo g && hexo d
```
`hexo g`: Generate，将 Markdown 文件和主题配置编译成 HTML 静态文件。

`hexo d`: Deploy，将这些 HTML 文件推送到 GitHub 仓库的 `main` 分支。

看到 `INFO Deploy done: git` 后，表示推送成功。

# 源码管理
目前你只部署了网站文件，博客源码（`my-blog` 文件夹）还在本地。强烈建议将源码也同步备份到 GitHub 的另一个分支或仓库，以防服务器丢失。

## 初始化 git 仓库
```bash
git init
```

## 添加远程仓库
```bash
git remote add origin git@github.com:xiaoyuewhut/xiaoyuewhut.github.io.git
```
然后创建并切换到 `source` 分支
```bash
git checkout -b source
```

提交并推送源码：
```bash
git add .
git commit -m "Initial commit of Hexo source files"
git push -u origin source # 推送到 source 分支
```

# 问题
## 1. 无法显示稍微复杂一点的latex公式
在vscode中预览一切正常，但是部署到服务器中，在网页中就是渲染不出来，可能的原因：
1. hexo Markdown 引擎问题

（通常是 `hexo-renderer-marked` 或其他默认渲染器）将 `$$...$$` 块、`_` 下划线和 `\\` 换行符都视为普通的 Markdown 或 HTML 内容，并将其转换为 HTML 标签，导致 MathJax 接收到的代码已经损坏。
所以 Hexo 默认的 `hexo-renderer-marked` 插件大概率是罪魁祸首。我们需要将其替换为一个更“温顺”的渲染器。
```bash
npm uninstall hexo-renderer-marked --save
```
先试试基于 `markdown-it` 的渲染器，因为它提供了更好的插件和配置支持。
```bash
npm install hexo-renderer-markdown-it --save
```
试试
```bash
hexo clean && hexo generate && hexo s
```
**好吧，还是不行**，进一步，在新安装的渲染器中，配置它不要去解析被认为是代码或 MathJax 的内容，从而将原始的 LaTeX 字符串安全地传递给浏览器端的 MathJax 脚本。

打开博客根目录下的主配置文件 _config.yml，添加或修改以下配置（一般是没有这个片段的）：
```yaml
# ------------------------------------
# 解决 MathJax 冲突的配置 (针对 hexo-renderer-markdown-it)
# ------------------------------------
markdown:
  # 启用 markdown-it 扩展
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '""''--'
  plugins:
    # 启用 mathjax 插件，以便渲染器忽略它
    - markdown-it-mathjax-chtml
    # 确保 code block 插件启用，避免在 ``` 中渲染 LaTeX
    - markdown-it-disable-url-encode
  # 重要的配置：让渲染器忽略 $$ 块
  presets: default
  ```

试了还是不行
  
2. 换个思路，看帖子又说再装一个 `hexo-filter-mathjax` 就行
```bash
npm install hexo-filter-mathjax --save
```
试了还是不行。

3. 参考[Hexo显示Latex公式最新解决方案](https://blog.csdn.net/qq_52466006/article/details/126924064)：卸载 `hexo-math` 和 `hexo-renderer-marked`
```bash
npm un hexo-math
npm un hexo-renderer-marked
```
然后在theme/next/_config.yml文件中配置
```yaml
mathjax:
  enable: true
  per_page: true
```
还是不行

4. [Hexo公式渲染问题](https://moonglowshadow.com/2024/06/26/hexo-formula-rendering/index.html)

```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```
不行。

于是终于明白，所有的教程都是狗屁。。。。。。。。。。
### 最终解决方案
1. 卸载之前的渲染器
```bash
npm uninstall hexo-renderer-kramed hexo-filter-mathjax
```
反正有什么卸载什么。
2. 安装新的渲染器 (Markdown-it)
```bash
# 安装 markdown-it 渲染器和 katex 插件
npm install hexo-renderer-markdown-it @iktakahiro/markdown-it-katex --save
```
3. 修改 `_config.yml`文件
```yaml
# Markdown-it 渲染引擎配置
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - '@iktakahiro/markdown-it-katex'
```
4. 修改 next 主题 `_config.yml` 文件
```yaml
# Math Formulas Render Support
math:
  per_page: false

  mathjax:
    enable: false
    # See: https://mhchem.github.io/MathJax-mhchem/
    mhchem: false

  katex:
    enable: true
    copy_tex: false
```
还有vendors：
```yaml
vendors:
  # Internal path prefix.
  _internal: lib

  anime:

  fontawesome:

  # MathJax
  mathjax:
    enable: true
    per_page: true

  katex: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css
  copy_tex_js:
  copy_tex_css:
```
如此便能解决了，浏览器控制台-network-css里也能看到 `katex.min.css`。

# 总结
每次写完博客，需要提交两次推送：

1. 发布博客： `hexo g -d` (推送到 main 分支，供 Pages 展示)

2. 备份源码： 三板斧 (推送到 `source` 分支，保存源文件)