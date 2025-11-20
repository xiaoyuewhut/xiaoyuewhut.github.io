---
title: blog写作
date: 2025-11-20 11:46:58
tags:
- hexo
categories:
- 其他
- 实用
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

# 总结
每次写完博客，需要提交两次推送：
1. 发布博客： `hexo d` (推送到 main 分支，供 Pages 展示)

2. 备份源码： `git push origin source` (推送到 `source` 分支，保存源文件)