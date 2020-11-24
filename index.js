var http = require('http')
const crypto = require("crypto")
class iKuai {
	constructor(host, port, username, password, https) {
		let passwd = crypto.createHash("md5").update(password).digest("hex");
		let pass = new Buffer.from("salt_11" + password).toString('base64')
		let login_info = {
			passwd: passwd,
			pass: pass,
			remember_password: "",
			username: username
		}
		this.host = host
		this.port = port
		this.login_info = login_info
		if (https) {
			http = require('https')
		}
	}
	async login() {
		return new Promise(resove => {
			let options = {
				method: 'POST',
				host: this.host,
				port: this.port,
				path: '/Action/login',
			};
			var that = this
			let req = http.request(options, function(res, err) {
				res.setEncoding('utf-8');
				res.on('data', function(chunk) {
					// console.log(res.statusCode)
					let data = JSON.parse(chunk)
					if (data && data.Result == 10000) {
						that.accessKey = res.headers['set-cookie'][0]
						resove(res.headers['set-cookie'][0])
					} else {
						console.log(data)
						resove(false)
					}
				});
			});
			req.write(JSON.stringify(this.login_info))
			req.end();
		})
	}
	exec(func, action, param, accessKey) {
		return new Promise(resove => {
			let go_accesskey
			if (this.accessKey) {
				go_accesskey = this.accessKey
			} else {
				go_accesskey = accessKey
			}
			var options = {
				method: 'POST',
				host: this.host,
				port: this.port,
				path: '/Action/call',
				headers: {
					'Cookie': go_accesskey
				}
			};
			var req = http.request(options, function(res, err) {
				res.setEncoding('utf-8');
				let str = ""
				res.on('data', function(chunk) {
					str += chunk
				});
				res.on('end', () => {
					try {
						str = JSON.parse(str)
					} catch (e) {
						console.log(e)
					} finally {
						resove(str)
					}
				})
			});
			req.write(JSON.stringify({
				"func_name": func,
				"action": action,
				"param": param
			}))
			req.end();
		})
	}
}
module.exports = iKuai
