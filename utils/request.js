import axios from 'axios'
import { networkConfig } from '../config/networkConfig'
import { showToast } from 'vant';
import { useAddrStore } from '../src/store/user'
import { storeToRefs } from 'pinia'
let store = null
// create an axios instance
const service = axios.create({
	baseURL: networkConfig.serverUrl,
	// 超时
	timeout: networkConfig.requestTimeout,
	crossDomain: true,
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		store = useAddrStore()
		const { usertoken } = storeToRefs(store)
		if (usertoken.value && usertoken.value !== '') {
			config.headers["token"] = usertoken.value;
		}
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(async res => {
	if (res.data.code == 1) {
		return res.data
	} else if (res.data.code == 302) {
		await store.changetoken('')
		await store.loginaddr()
	} else {
		showToast(res.data.msg)
		return Promise.reject(res.data.msg);
	}
}, error => {
	console.log(error)
	showToast(`接口${error.config.url}異常~`)
	if (error.response.code) {
		console.log('接口異常')
		switch (error.response.code) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
})

axios.defaults.adapter = function (config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}


export default service
