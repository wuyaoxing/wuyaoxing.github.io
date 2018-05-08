---
title: 如何关闭node进程
date: 2018-04-23 17:42:19
tags:
    - node
---

## 查看端口占用情况

- 假如我们要杀死3000端口

    > netstat -ano|findstr "3000"

## 关闭进程

1. 任务管理器关闭
    - 找到对应PID的进程，结束进程

2. 命令行工具关闭
    - 找到对应进程的PID
    
        > taskkill -PID <进程号> -F


