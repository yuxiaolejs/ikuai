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
go()