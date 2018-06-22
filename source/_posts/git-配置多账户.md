---
title: git 配置多账户
date: 2018-06-22 19:39:48
tags:
    - git
---

在工作中，公司会有专门的git账号（公司使用gitlab），有时会做些个人项目放到github，这时候就需要配置多个git账号和服务器。

第一个账号：
- 设置git账号
    ```
        git config --global user.name "username"
        git config --global user.email "xxxxx@xxxxxxx.xxxx"
    ```
- 创建个人SSH key
    ```
        ssh-keygen -t rsa -C "xxxx@xxx.xx"
    ```
- 把~/.ssh/id_rsa.pub的内容添加到gitlab的SSH keys中
- 测试
    ```
        ssh -T git@gitlab.com
    ```

第二个账号：
- 创建个人SSH key
    ```
        # 新建SSH key：  
        cd ~/.ssh     # 切换到C:\Users\Administrator\.ssh  
        ssh-keygen -t rsa -C "youremail@example.com"
        # 设置名称为id_rsa_wyx(名字随意)  
        Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa): id_rsa_wyx
    ```
- 添加新密钥
    ```
        // 因为默认只读取id_rsa，为了让SSH识别新的私钥，需将其添加到SSH agent中
        ssh-add ~/.ssh/id_rsa_wyx
        // 如果出现`Could not open a connection to your authentication agent`，则先输入
        ssh-agent bash
        // 然后再输入
        ssh-add ~/.ssh/id_rsa_wyx
    ```
- 修改config文件
    ```
        // 若config文件不存在，使用`touch config`创建
        # 该配置用于工作  
        # Host 服务器别名  
        Host gitlab.com
        # HostName 服务器ip地址或机器名  
        HostName gitlab.com
        # User连接服务器的用户名  
        User wuyaoxing  
        # IdentityFile 密匙文件的具体路径  
        IdentityFile ~/.ssh/id_rsa 
        PreferredAuthentications publickey 
        
        
        # 该配置用于个人 github 上  
        # Host 服务器别名  
        Host github.com  
        # HostName 服务器ip地址或机器名  
        HostName github.com  
        # User连接服务器的用户名  
        User wuyaoxing  
        # IdentityFile 密匙文件的具体路径  
        IdentityFile ~/.ssh/id_rsa_wyx
        PreferredAuthentications publickey 
    ```
- 把~/.ssh/id_rsa_wyx.pub的内容添加到github的SSH keys中
- 测试
    ```
        ssh -T git@github.com
    ```
至此，已完成多个git账号配置，快去clone 项目吧。
