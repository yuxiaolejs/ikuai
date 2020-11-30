# 爱快路由SDK iKuai SDK
为爱快路由设计的node模块
Node SDK for iKuai Router System

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/ikuai.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ikuai

## 更新内容 Update
  * 更新了文档，加入了一个例子
  * 更新了github
  * 更新了登录方法，支持用户切换
  * 加入Reject
  * 加入回调调用方式，更新了例子
## 安装 Installation
```bash
$ npm install ikuai
```


## 使用 Usage

  新建路由器连接 New router connection
  * address (string): 路由器地址 IP / Domain of the router
  * port (int/string): 路由器web端口 Port of the web interface
  * https (bool): 是否启用https Use https or not
  * router (object): 返回的路由器对象 Returned Router Object
```js
router = new iKuai(address, port, https)
```

  登录路由器 Login the router
  * username (string): 路由器登录用户 Username of the router
  * password (string): 路由器登录密码 Password of the router
  * callback (function): 回调函数 Callback Function
  * e (string): 回调登录的token或者错误码 Token or Error code for callback
  * token (string): 登录产生的cookie  Cookie of login
```js
token = await myRouter.login(username, password) //异步方法 Async Method

myRouter.login(username, password, callback(e)) //回调方法 Callback Method
```

  执行命令 Execute command
  * method (string): 调用方法名 Method to be called
  * action (string): 方法对应操作 Action to be called
  * param (object): 传入参数 Parameters to be passed
  * callback (function): 回调函数 Callback Function
  * e (string): 回调登录的token或者错误码 Token or Error code for callback
  * result (object): 执行结果 Result of Command
  * token (string optional): 登录产生的header HTTP header produced by login
  关于Token About Token:
  默认登陆后Token会被自动保存，执行命令时不需要带Token，但如果该router对象没有登录过，则请求必须带token，否则会报 ERR_NOT_LOGGED_IN
  The token will be stored in the router object automactically, so it's not needed for executing the command, but if the router object is not logged in, the token is required, otherwise there will be an ERR_NOT_LOGGED_IN error
  
```js
result = await myRouter.exec(method, action, param) //异步方法不带Token Async Method without Token
result = await myRouter.exec(method, action, param, token) //异步方法带Token Async Method with Token

myRouter.exec(method, action, param, callback(e)) //回调方法不带Token Callback Method without Token
myRouter.exec(method, action, param, token, callback(e)) //回调方法带Token Callback Method with Token
```

## Demo：
   获取在线设备列表 Get online device list
```js
const ikuai = require("ikuai")
function go() { //使用回调方法调用 Use callback for requests
	myRouter = new ikuai(require("./info.js").host, require("./info.js").port, true)
	console.log(myRouter)
	myRouter.login(require("./info.js").username, require("./info.js").password, e => {
		console.log(e)
		param = {
			"ORDER": "", //留空即可 Empty
			"ORDER_BY": "ip_addr_int", //排序字段名（返回数据中有对应） Order by (items in return data)
			"TYPE": "data,total", //类型，保持不动 Do not change
			"limit": "0,20", //查询数量，可自行更改 Limit (Same as SQL)
			"orderType": "IP" //保持不动 Do not change
		}
		myRouter.exec("monitor_lanip", "show", param, e => console.log(e.Data))
	})
}

async function go_async() {//使用Promise调用 Use Promise for requests
	myRouter = new ikuai(require("./info.js").host, require("./info.js").port, true)
	console.log(myRouter)
	res = await myRouter.login(require("./info.js").username, require("./info.js").password).catch(e => console.log(e))
	console.log(res)
	param = {
		"ORDER": "", //留空即可 Empty
		"ORDER_BY": "ip_addr_int", //排序字段名（返回数据中有对应） Order by (items in return data)
		"TYPE": "data,total", //类型，保持不动 Do not change
		"limit": "0,20", //查询数量，可自行更改 Limit (Same as SQL)
		"orderType": "IP" //保持不动 Do not change
	}
	result = await myRouter.exec("monitor_lanip", "show", param).catch(e => console.log(e))
	console.log(result.Data)
}
go()//使用回调进行调用 Used callback method
```
- [等待更新 Waiting for update](https://www.ltgzs.top)
