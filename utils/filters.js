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

    //订单状态转换
    orderStatus(status) {
        switch (parseInt(status)) {
            case 0:
                return '待确定'
            case 1:
                return '有效'
            case -1:
                return '无效'
            default:
                return '未知状态'
        }
    },

    //质押状态转换
    pledgeStatus(status) {
        switch (parseInt(status)) {
            case 0:
                return '待确认'
            case 1:
                return '质押成功'
            case 2:
                return '待赎回'
            case 3:
                return '已完成'
            case 4:
                return '质押失败'
            default:
                return '未知状态'
        }
    },

    //时间戳倒计时
    countDown(time) {
        let now = new Date().getTime()
        let endTime = new Date(time).getTime() * 1000
        let leftTime = endTime - now
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
        let seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
        days = this.checkTime(days);
        hours = this.checkTime(hours);
        minutes = this.checkTime(minutes);
        seconds = this.checkTime(seconds);
        return days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
    },

    checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10 && i !== 0) {
            i = "0" + i;
        }
        return i;
    },

    //数字转中文
    numberToChinese(num) {
        switch (num) {
            case 0:
                return '零'
            case 1:
                return '一'
            case 2:
                return '二'
            case 3:
                return '三'
            case 4:
                return '四'
            case 5:
                return '五'
            case 6:
                return '六'
            case 7:
                return '七'
            case 8:
                return '八'
            case 9:
                return '九'
            case 10:
                return '十'
            default:
                return '未知'
        }
    },

    // js精度除法
    accDiv(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) { }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return this.accMul((r1 / r2), Math.pow(10, t2 - t1));
    },
    // js精度乘法
    accMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) { }
        try {
            m += s2.split(".")[1].length
        } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    // js精度加法
    accAdd(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        return (arg1 * m + arg2 * m) / m
    },
    // js精度减法
    accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }


}
var timeout = null