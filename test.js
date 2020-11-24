const ikuai = require("./index.js")
async function go() {
	myRouter = new ikuai("", , "", "", true)
	res = await myRouter.login()
	console.log(res)
	param = {
		"ORDER": "", //留空即可 Empty
		"ORDER_BY": "ip_addr_int", //排序字段名（返回数据中有对应） Order by (items in return data)
		"TYPE": "data,total", //类型，保持不动 Do not change
		"limit": "0,20", //查询数量，可自行更改 Limit (Same as SQL)
		"orderType": "IP" //保持不动 Do not change
	}
	result = await myRouter.exec("monitor_lanip", "show", param)
	console.log(result.Data)
}
go()
