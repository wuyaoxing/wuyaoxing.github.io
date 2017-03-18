---
title: HEXO搭建个人博客30分钟快速入门
date: 2017-03-13 13:35:35
tags:
---
## 什么是Hexo?

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 [Markdown](http://markdownpad.com/) ([Markdown语法说明中文](http://www.appinn.com/markdown/)) （或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。官网如是说，跟多介绍请移步[Hexo文档](https://hexo.io/zh-cn/docs/index.html)，我在这里就不废话了。

## 安装

Window环境（虽然很烂，却一直在用...），通过npm执行以下命令

> npm install -g hexo-cli

> hexo init blog

> cd blog

> npm install

> hexo server

**npm** 不好使的可以用淘宝npm镜像 **cnpm** 代替，有助于提升速度和成功率。

**安装前提** 你必须安装下面二个应用程序，这里暂不做详细介绍了，点击下面链接下载安装包一路next即可，装好后通过npm执行上面命令。

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-for-windows.github.io/)


安装完git之后，你需要[到这里](https://github.com/)注册一个github账号，后面要用到SSH key，关于SSH key的生成和配置，github有详细的[帮助文档](https://help.github.com/articles/connecting-to-github-with-ssh/)可以参考。

执行完以上步骤之后，浏览器会打开一个默认localhost:4000端口的地址，你就能看到默认主题为landscape的HEXO的你的博客了。兴奋吧！找一款好看的皮肤（[themes](https://hexo.io/themes/)）替换默认主题，打造属于你的个人博客吧，从此走上人生巅峰路，然后……  想多了。。。

## 创建博客用的git仓库

仓库名称必须为 username.github.io
注：username为你刚注册或已经在使用的github的用户名，比如我的就是 **wuyaoxing** .github.io

仓库创建成功后，github会给你该仓库的https和ssh地址。

部署成功后，打开https://your-github-username.github.io，就能看见默认博客。

至此，hexo的博客生成和部署已经全部成功。

不用买域名，不用搭服务器，完全开源，完全免费，不花一分钱，只要你有时间，分分钟折腾出一个博客。

更多详情请参照官网，有不明白的地方也可以联系我，互相学习，共同进步。

## 我的参考


 - [hexo入门指南](http://www.maintao.com/2014/hexo-beginner%27s-guide/)
 - [HEXO中文文档](https://hexo.io/zh-cn/docs/)
 - [如何使用Hexo搭建Github Pages博客](https://levblanc.github.io/2015/07/13/building-github-pages-blog-with-hexo/)
 
 
 花了将近一下午时间终于搞定一个博客，以后就有事情做了，勤写博客，多做总结，抵抗懒惰…这篇文章完成于搭建好博客的一个星期之后。。。
 参考这些内容，一天就能搭建出一个令自己满意的个人博客，然后就加油写博客吧！
