# reno-server

> A Static Web server


采用Nodejs, 实现了一个集`缓存`,`压缩`,`常用mime类型`,`返回部分内容`以及`cli`的静态资源服务器。

借此来巩固提高自己对于部分HTTP协议的认识，同时不断打造一个高可用的静态资源服务器。

## 安装

```
npm install -g reno-server
```

## 使用方法

``` shell
reno-server  # 把当前文件夹作为静态资源服务器根目录

reno-server -p 8080 # 设置端口号为 8080

reno-server -h localhost # 设置 host 为 localhost

reno-server -d /usr # 设置根目录为 /usr

```


