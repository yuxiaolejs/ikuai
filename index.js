var http = require('http')
const crypto = require("crypto")
class iKuai {
	constructor(host, port, https) {
		this.host = host
		this.port = port
		if (https) {
			http = require('https')
		}
	}
	login(username, password, callback) {
		let passwd = crypto.createHash("md5").update(password).digest("hex");
		let pass = new Buffer.from("salt_11" + password).toString('base64')
		let login_info = {
			passwd: passwd,
			pass: pass,
			remember_password: "",
			username: username
		}
		let options = {
			method: 'POST',
			host: this.host,
			port: this.port,
			path: '/Action/login',
		};
		var that = this
		if (callback) {
			let req = http.request(options, function(res, err) {
				res.setEncoding('utf-8');
				res.on('data', function(chunk) {
					let data = JSON.parse(chunk)
					if (data && data.Result == 10000) {
						that.accessKey = res.headers['set-cookie'][0]
						callback(res.headers['set-cookie'][0])
					} else {
						callback(data)
					}
				});
			});
			req.write(JSON.stringify(login_info))
			req.end();
		} else
			return new Promise((resolve, reject) => {
				let req = http.request(options, function(res, err) {
					res.setEncoding('utf-8');
					res.on('data', function(chunk) {
						let data = JSON.parse(chunk)
						if (data && data.Result == 10000) {
							that.accessKey = res.headers['set-cookie'][0]
							resolve(res.headers['set-cookie'][0])
						} else {
							reject(data)
						}
					});
				});
				req.write(JSON.stringify(login_info))
				req.end();
			})
	}
	exec(func, action, param, accessKey, callback) {
		if (typeof(accessKey) == 'function') callback = accessKey
		if (callback) {
			let go_accesskey
			if (this.accessKey) {
				go_accesskey = this.accessKey
			} else {
				go_accesskey = accessKey
			}
			if (go_accesskey) {
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
							callback(str)
						}
					})
				});
				req.write(JSON.stringify({
					"func_name": func,
					"action": action,
					"param": param
				}))
				req.end();
			} else {
				callback("ERR_NOT_LOGGED_IN")
			}
		} else
			return new Promise((resolve, reject) => {
				let go_accesskey
				if (this.accessKey) {
					go_accesskey = this.accessKey
				} else {
					go_accesskey = accessKey
				}
				if (go_accesskey) {
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
								resolve(str)
							}
						})
					});
					req.write(JSON.stringify({
						"func_name": func,
						"action": action,
						"param": param
					}))
					req.end();
				} else {
					reject("ERR_NOT_LOGGED_IN")
				}
			})
	}
}
module.exports = iKuai
