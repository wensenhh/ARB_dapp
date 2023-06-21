import service from '../../utils/request.js'
 
/**
 * 授权登录
 * @param {*} data 
 */
export function Login(data) {
	return service({
		url: '/api/user/login',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 质押列表
 * @param {*} data 
 */
export function getpledgeList(data) {
	return service({
		url: '/api/arb/zyrule',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 获取平台规则
 * @param {*} data 
 */
export function getRulers(data) {
	return service({
		url: '/api/arb/getrule',
		method: 'get',
		params: data,
		data
	})
}

/**
 * 轮播图
 * @param {*} data 
 */
export function getSwiper(data) {
	return service({
		url: '/addons/cms/wxapp.index/h5index',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 我的质押列表
 * @param {*} data 
 */
export function myPledgeList(data) {
	return service({
		url: '/api/arb/myzyorder',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 质押生成订单
 * @param {*} data 
 */
export function pledgeapi(data) {
	return service({
		url: '/api/arb/create_zyorder',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 获取资产明细
 * @param {*} data 
 */
export function getUserassets(data) {
	return service({
		url: '/api/arb/moneylog',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 分红统计
 * @param {*} data 
 */
export function shareinfo(data) {
	return service({
		url: '/api/arb/v15info',
		method: 'get',
		params: data,
		data
	})
}

/**
 * 兑换记录
 * @param {*} data 
 */
export function exchangeInfo(data) {
	return service({
		url: '/api/arb/duihuanlog',
		method: 'post',
		params: data,
		data
	})
}

/**
 * ART钱包
 * @param {*} data 
 */
export function getARTaccets(data) {
	return service({
		url: '/api/arb/artinfo',
		method: 'post',
		params: data,
	})
}

/**
 * 钱包列表
 * @param {*} data 
 */
export function accetsList(data) {
	return service({
		url: '/api/arb/qianblist',
		method: 'post',
		params: data,
		data
	})
}

/**
 * art提取
 * @param {*} data 
 */
export function getuserExtract(data) {
	return service({
		url: '/api/arb/arttiqu',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 用户提现
 * @param {*} data 
 */
export function userwithdraw(data) {
	return service({
		url: '/api/arb/tixian',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 获取arb价格
 * @param {*} data 
 */
export function getARBprice(data) {
	return service({
		url: '/api/arb/getARBprice',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 我的团队
 * @param {*} data 
 */
export function getMyTeam(data) {
	return service({
		url: '/api/arb/myteam',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 直推列表
 * @param {*} data 
 */
export function getMyPush(data) {
	return service({
		url: '/api/arb/zhituilist',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 用户兑换
 * @param {*} data 
 */
export function userexchange(data) {
	return service({
		url: '/api/arb/duihuan',
		method: 'post',
		params: data,
		data
	})
}

/**
 * 公告列表
 * @param {*} data 
 */
export function noticeList(data) {
	return service({
		url: '/addons/cms/wxapp.index/get_blocklist',
		method: 'get',
		params: data,
		data
	})
}

/**
 * 公告详情
 * @param {*} data 
 */
export function noticeDetail(data) {
	return service({
		url: '/addons/cms/wxapp.index/get_blockinfo',
		method: 'get',
		params: data,
		data
	})
}

/**
 * 用户信息
 * @param {*} data 
 */
export function myuserinfo(data) {
	return service({
		url: '/api/user/index',
		method: 'post',
		params: data,
		data
	})
}