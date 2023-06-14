export default {
    hideaddress(addr) {
        return addr.slice(0, 8) + '***' + addr.slice(-4)
    },
    fixednumber(num) {
        return String(num).replace(/^(.*\..{4}).*$/, "$1") || 0;
    },
    formatTime(value, type) {
        var dataTime = "";
        var data = new Date(+value * 1000);

        var year = data.getFullYear();
        var month_temp = data.getMonth() + 1;
        var month = month_temp < 10 ? '0' + month_temp : month_temp;
        var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
        var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
        var minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
        var second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
        if (type == "YMD") {
            dataTime = year + "-" + month + "-" + day;
        } else if (type == "YMDHMS") {
            dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        } else if (type == "HMS") {
            dataTime = hour + ":" + minute + ":" + second;
        } else if (type == "YM") {
            dataTime = year + "-" + month;
        } else if (type == "HM") {
            dataTime = hour + ":" + minute;
        } else if (type == "HMDM") {
            dataTime = hour + ":" + minute + " " + month + "/" + day;
        } else if (type == "LL") {
            dataTime = year + "" + month + "" + day + hour + "" + minute + "" + second;
        }
        return dataTime; //将格式化后的字符串输出到前端显示
    },
    verifyparam(para, type) {
        if (!para) return false
        if (type == 'number') {
            return (/(^[1-9]\d*$)/.test(para))
        }
    },
    /**
     * 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。等待触发事件n秒内不再触发事件才执行。
     * @param {Function} func 要执行的回调函数
     * @param {Number} wait 延时的时间 默认500
     */
    debounce(func, wait = 500) {
        // 清除定时器
        if (timeout !== null) clearTimeout(timeout);
        //设置定时器
        timeout = setTimeout(() => {
            typeof func === 'function' && func()
        }, wait);
    },
}
var timeout = null