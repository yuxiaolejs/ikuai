# 爱快路由SDK iKuai SDK
为爱快路由设计的node模块
Node SDK for iKuai Router System

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/ikuai.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ikuai


## 安装 Installation
```bash
$ npm install ikuai
```


## 使用 Usage


  新建路由器连接 New router connection
  * address (string): 路由器地址 IP / Domain of the router
  * port (int/string): 路由器web端口 Port of the web interface
  * login_info (object): 路由器登录信息 Login info of the router
  * https (bool): 是否启用https Use https or not
```js
new iKuai(address, port, login_info, https)
```

  登录路由器 Login the router
  * token (string): 登录产生的cookie  Cookie of login
```js
token = await myRouter.login()
```

  执行命令 Execute command
  * method (string): 调用方法名 Method to be called
  * action (string): 方法对应操作 Action to be called
  * param (object): 传入参数 Parameters to be passed
```js
result = await myRouter.exec(method, action, param)
```

## Demo：
- [等待更新 Waiting for update](https://www.ltgzs.top)
