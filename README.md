# 爱快路由SDK iKuai SDK
为爱快路由设计的node模块
Node SDK for iKuai Router System

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/ikuai.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ikuai

## 更新内容 Update
  * 新增了信息编码模块，现在可以支持直接输入用户名密码登陆了
  * 更新了文档，加入了一个例子
  * 更新了github
## 安装 Installation
```bash
$ npm install ikuai
```


## 使用 Usage

  新建路由器连接 New router connection
  * address (string): 路由器地址 IP / Domain of the router
  * port (int/string): 路由器web端口 Port of the web interface
  * username (string): 路由器登录用户 Username of the router
  * password (string): 路由器登录密码 Password of the router
  * https (bool): 是否启用https Use https or not
  * router (object): 返回的路由器Obj Returned Router Obj
```js
router = new iKuai(address, port, username, password, https)
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
   获取在线设备列表 Get online device list
```js
myRouter = new iKuai("www.example.com", 8443, "admin", "admin", true)
await myRouter.login()
param = {
"ORDER": "",				//留空即可 Empty
"ORDER_BY": "ip_addr_int",	//排序字段名（返回数据中有对应） Order by (items in return data)
"TYPE": "data,total",		//类型，保持不动 Do not change
"limit": "0,20",			//查询数量，可自行更改 Limit (Same as SQL)
"orderType": "IP"			//保持不动 Do not change
}
result = await myRouter.exec("monitor_lanip", "show", param)
```
- [等待更新 Waiting for update](https://www.ltgzs.top)
