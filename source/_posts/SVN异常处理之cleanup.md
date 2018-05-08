---
title: SVN异常处理之cleanup
date: 2017-04-25 15:18:37
tags:
    - svn
---

## 事件起因

昨天下午更新代码前执行 update 然后报了错，如下：

> svn cleanup failed–previous operation has not finished; run cleanup if it was interrupted

提示让执行cleanup，然后执行cleanup失败。

## 解决方案

今天上班写了会代码去update才想起这个事。然后就是谷歌（百度）。

网上有种说法是： **svn提交遇到恶心的问题，可能是因为上次cleanup中断后，进入死循环了。**

解决方法：清空SVN的队列

1. 下载[sqlite3.exe](http://www.sqlite.org/download.html)
2. 找到你项目的.svn文件，查看是否存在wc.db
3. 将sqlite3.exe放到.svn的同级目录
4. 启动cmd执行 sqlite3 .svn/wc.db "select * from work_queue"
5. 看到一些记录，下一步执行 sqlite3 .svn/wc.db "delete from work_queue"
6. 现在在到项目里面，执行cleanup，完全没问题了，图标状态也已经恢复了。
7. 没有装图片插件，提供不了图片，遗憾。

## 回忆

事后想了下问题出现的原因

- 打开svn下文件，开始工作。我打开的是axure。
- 准备更新，axure打开的文件未关闭。
- 在这段时间内，正好其他同事对该文件进行了删除操作，其他操作可能会出现文件合并的情况。然后svn罢工了。
- 准备commit，开始update，报错。

## 收获

只有不断的踩坑，才会成长。可以说这次动手解决SVN的报错对我很有意义。
