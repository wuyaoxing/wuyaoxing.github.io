---
title: npm安装/删除/发布/更新/撤销发布包
date: 2018-05-08 09:37:34
tags:
    - npm
---

## npm

npm 是javascript的包管理工具，是前端模块化下的一个标志性产物。

## npm 安装包

- 全局安装
    > npm install -g <package>
- 本地安装
    > npm install <package> 安装好后不写入package.json
    > npm install <package> --save 安装好后写入package.json的dependencies中（生产环境依赖）
    > npm install <package> --save-dev 安装好后写入package.json的devDependencies中（开发环境依赖）

## npm 删除包

- 删除全局模块
    > npm uninstall -g <package>
- 删除本地模块
    > npm uninstall <package> 删除模块，但不删除package.json的模块依赖
    > npm uninstall <package> --save 删除模块，同时删除package.json中dependencies的模块依赖
    > npm uninstall <package> --save-dev 删除模块，同时删除package.json中devDependencies的模块依赖

## npm 发布包

首先你需要到 [npmjs](https://www.npmjs.com/) 注册一个账号

进入待发布项目目录，在终端输入

> npm login

按提示输入账号、密码、邮箱登录，然后执行

> npm publish

发布成功会返回包的名称和版本号。

## npm撤销发布包

不推荐使用

> npm unpublish

推荐

> npm deprecate <package>[@<version>] <message>

例如：`npm deprecate testproject '这个项目不再维护了！！！`

## npm 更新发布后的包

npm更新和发布的命令一样，都是npm publish，不同之处在于，更新时你需要修改包的版本号

npm有一套自己的版本控制标准——Semantic versioning（[语义化版本](https://semver.org/lang/zh-CN/)），具体如下，

版本格式：`主版本号.次版本号.修订号`，版本号递增规则如下：

> 主版本号：当你做了不兼容的 API 修改
> 次版本号：当你做了向下兼容的功能性新增
> 修订号：当你做了向下兼容的问题修正

例如：`version: 'x.y.z'`
1. 修复bug，小改动，增加z， 
2. 增加了新特性，但仍能向下兼容，增加y
3. 较大改动，向下不兼容，增加x

通过npm version <update_type> 自动改变版本
update_type: 
- patch 修订号
- minor 次版本号
- major 主版本号

---
