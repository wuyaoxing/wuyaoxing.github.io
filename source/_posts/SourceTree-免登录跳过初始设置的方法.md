---
title: SourceTree 免登录跳过初始设置的方法
date: 2018-05-11 18:05:23
tags:
    - sourceTree
    - git
---

## SourceTree 免登录跳过初始设置的方法

- 首先，安装完 SourceTree 以后先运行一次，弹出初始化登录页面后退出。
打开
- 我的电脑，在最上方的地址栏直接输入以下地址

> %LocalAppData%\Atlassian\SourceTree\

新建 accounts.json 文件

```json
[
  {
    "$id": "1",
    "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
    "Authenticate": true,
    "HostInstance": {
      "$id": "2",
      "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
      "Host": {
        "$id": "3",
        "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
        "Id": "atlassian account"
      },
      "BaseUrl": "https://id.atlassian.com/"
    },
    "Credentials": {
      "$id": "4",
      "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
      "Username": "",
      "Email": null
    },
    "IsDefault": false
  }
]

```

将上面代码复制，重新打开即可。
