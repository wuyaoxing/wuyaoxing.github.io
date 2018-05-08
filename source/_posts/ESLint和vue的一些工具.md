---
title: ESLint和vue的一些工具
date: 2017-03-28 15:10:02
tags:
    - ESLint
    - vue
---

任何实际项目的开发都不仅仅是完成编码，规范的开发流程和严谨的测试都是不可或缺的。合理使用各种工具来进行测试开发与调试，能极大地提升编码的效率以及团队协作效率，使开发过程事半功倍，对于提高代码质量、稳定线上服务至关重要。

## ESLint

在日常的团队开发中，为了避免出现低级bug和统一代码风格，通常会在开发之前约定一套编码规范。使用 Lint 工具和代码风格检测工具，则可以辅助编码规范执行，有效控制代码质量。

ESLint 由 JavaScript 红宝书 作者 Nicholas C. Zakas 编写， 2013 年发布第一个版本。 NCZ 的初衷不是重复造一个轮子，而是在实际需求得不到 JSHint 团队响应 的情况下做出的选择：以可扩展、每条规则独立、不内置编码风格为理念编写一个 lint 工具。

ESLint被设计为完全可配置的，主要有两种方式来配置ESLint：

- 在注释中配置：使用JavaScript注释直接把配置嵌入到文件中。
- 配置文件：使用一个JSON或YAML文件来为全部的目录和它的子目录指定配置信息。

有很多信息是可以被配置的：

- Environments：你的脚步将要运行在什么环境中。如browser、node环境变量、es6环境变量、mocha环境变量等。

> {
>    "env": {
>        "browser": true,
>        "node": true
>    }
>}

- Globals：额外的全局变量。如指定你所要使用的全局变量，true代表允许重写、false代表不允许重写。

> {
>    "globals": {
>        "var1": true,
>        "var2": false
>    }
>}

- Rules：开启规则和发生错误时报告的等级。

ESLint 主要有以下特点：

- 默认规则包含所有 JSLint、JSHint 中存在的规则，易迁移；
- 规则可配置性高：可设置「警告」、「错误」两个 error 等级，或者直接禁用；
- 包含代码风格检测的规则（可以丢掉 JSCS 了）；
- 支持插件扩展、自定义规则。

EsLint提供以下几种校验：

- 语法错误校验
- 不重要或丢失的标点符号，如分号
- 没法运行到的代码块（使用过WebStorm的童鞋应该了解）
- 未被使用的参数提醒
- 漏掉的结束符，如}
- 确保样式的统一规则，如sass或者less
- 检查变量的命名

### 安装

> npm install -g eslint

### 使用方法

如果你的项目还没有配置文件（.eslintrc）的话，可以通过指定--init参数来生成一个新的配置文件：

> eslint --init

然后，就可以在任何JavaScript中运行ESLint了。.eslintrc 放在项目根目录，则会应用到整个项目；如果子目录中也包含 .eslintrc 文件，则子目录会忽略根目录的配置文件，应用该目录中的配置文件。这样可以方便地对不同环境的代码应用不同的规则。

### 配置

运行eslint --init后，会在当前目录下生成一个.eslintrc文件，你可以在这个文件中配置一些规则。

规则的错误等级有三种：

- 0：关闭规则。
- 1：打开规则，并且作为一个警告（不影响exit code）。
- 2：打开规则，并且作为一个错误（exit code将会是1）。

具体的规则可以在官网 (http://eslint.org/) 上找到，或者使用别人写好的配置，例如eslint-config-airbnb (https://www.npmjs.com/package/eslint-config-airbnb) 。

在团队协作中，统一的代码风格更具可读性、可维护性。ESLint 内置了一系列有关代码风格的 规则 ，可以根据团队的编码规范设置。


## 开发工具

开发vuejs项目是可能会遇到一个问题，就是.vue后缀文件中的内容是不会被自动高亮显示的，感觉像是在记事本中开发一样。不过现在你不用担心，各大流行的IDE基本都已经支持.vue文件的语法高亮了，例如Sublime、WebStorm、idea、VSC等，就像安装普通插件一样安装vue插件。


## 调试工具

vuejs团队为大家提供了Chrome下的调试工具，可以在Chrome的插件商定找到并安装。国内可能需要翻墙。我们可以到github上找到 [vue-devtools](https://github.com/vuejs/vue-devtools),然后按照文档编译安装。

安装成功后，打开开发者工具，在工具栏中就会出现Vue Devtools选项。该工具可以展示出各个组件的层级结构、组件当前状态、组件的prop值。

## 参考
- http://www.tuicool.com/articles/7JZZJzn
- http://www.jianshu.com/p/2bcdce1dc8d4
- vuejs权威指南
