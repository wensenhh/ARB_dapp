<template>
    <van-pull-refresh v-model="refreshing" @refresh="onPullRefresh">
        <div class="flex-col group_2">
            <div class="flex-row justify-between items-center section">
                <van-field v-model="exchangenum" type="number" placeholder="请输入您要兑换的数量" />
                <span class="font_3">ART</span>
            </div>
            <img class="self-center image_2 image_3"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123267535856841.png" />
            <div class="flex-row justify-between section view">
                <van-field v-model="arbnum" type="number" disabled="disabled" placeholder="可兑换的ARB数量" />
                <span class="font_3">ARB</span>
            </div>
            <div class="flex-row justify-between equal-division">
                <div class="flex-col items-center space-y-18">
                    <span class="font_4">{{ userinfo.balance_art }}</span>
                    <span class="font_2">ART余额</span>
                </div>
                <div class="horiz-divider"></div>
                <div class="flex-col items-center space-y-18">
                    <span class="font_4">{{ siteRulers.art_today_jyprice }}</span>
                    <span class="font_2">ART/USDT</span>
                </div>
                <div class="horiz-divider"></div>
                <div class="flex-col items-center space-y-18">
                    <span class="font_4">{{ userinfo.balance_arb }}</span>
                    <span class="font_2">ARB/USDT</span>
                </div>
            </div>
        </div>
        <div class="flex-col justify-start items-center button" @click="exchange"><span class="font_1">兑换</span></div>
        <div class="flex-col group_3 space-y-16">
            <span class="self-start font_1">兑换记录</span>
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
                <div class="flex-col space-y-12">
                    <div class="flex-col list-item space-y-14" :key="i" v-for="(item, i) in exchangeList">
                        <div class="flex-row justify-between">
                            <span class="font_4">ART/ARB</span>
                            <span class="font_5">{{ item.num }}</span>
                        </div>
                        <span class="self-start font_6">{{ item.createtime }}</span>
                    </div>
                </div>
            </van-list>
        </div>
    </van-pull-refresh>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAddrStore } from '../../store/user'
import { storeToRefs } from "pinia"
import { exchangeInfo, getARBprice, userexchange } from '../../api/app'
import filters from '../../../utils/filters'
import { showToast } from 'vant'
import { sign } from '../../connectWallet/index'

const store = useAddrStore();
let { userinfo, siteRulers } = storeToRefs(store)
const exchangenum = ref('')
const arbnum = ref('')
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
const orderpage = ref(1)
const exchangeList = ref([])
const arbprice = ref('')

onMounted(() => {
    store.getsiteRuler()
    store.getUserinfo()
    onRefresh();
    getnewarbprice()
});

//监听exchangenum的变化
watch(exchangenum, (newVal, oldVal) => {
    let key1 = filters.accMul( parseFloat(newVal), parseFloat(siteRulers.value.art_today_jyprice))
    let key2 = filters.accDiv(parseFloat(key1), parseFloat(arbprice.value))
    let key3 = filters.accDiv(parseFloat(siteRulers.value.dh_toarb), 100)
    console.log(key1,key2,key3)

    arbnum.value = filters.accMul( parseFloat(key2), parseFloat(key3)).toFixed(4)
})

const getnewarbprice = () => {
    getARBprice().then(({ data }) => {
        arbprice.value = data
    })
}

const exchange = async () => {
    if (exchangenum.value == '') {
        showToast('请输入兑换数量')
        return
    }
    if (exchangenum.value < 10 || exchangenum.value > 500) {
        showToast('兑换数量最少10个，最多500个~')
        return
    }
    if (parseFloat(exchangenum.value) > parseFloat(userinfo.value.balance_art)) {
        showToast('余额不足')
        return
    }
    const signres = await sign()
    if(!signres) return
    userexchange({
        num: exchangenum.value
    }).then(({ data }) => {
        showToast('兑换成功')
        store.getsiteRuler()
        store.getUserinfo()
        exchangenum.value = ''
        arbnum.value = ''
        onRefresh();
    })
}

const getExchangeList = () => {
    if (refreshing.value) {
        exchangeList.value = [];
        orderpage.value = 1
        refreshing.value = false;
    }
    exchangeInfo({
        page: orderpage.value
    }).then(({ data }) => {
        exchangeList.value = [...exchangeList.value, ...data.data]
        loading.value = false;
        if (exchangeList.value.length >= data.total) {
            finished.value = true;
        } else {
            orderpage.value += 1
        }
    })
}

// 下拉刷新
const onPullRefresh = async () => {
    exchangenum.value = '';
    arbnum.value = '';
    await onRefresh();
    setTimeout(() => {

        refreshing.value = false;

    }, 1000);
};

const onRefresh = async () => {
    // 清空列表数据
    finished.value = false;
    refreshing.value = true
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    getExchangeList();
};
</script>

<style lang='scss' scoped>
:deep(.van-cell:after) {
    border: none;
}

.group_2 {
    margin-top: 20px;

    .section {
        background-color: #242b44;
        border-radius: 4px;
        position: relative;

        .font_3 {
            font-size: 15px;
            font-family: MiSans;
            line-height: 12px;
            color: #c3cbd6;
            position: absolute;
            right: 6px;
            top: 16px;
        }

        .text_4 {
            color: #7887ae;
        }
    }

    .image_2 {
        margin: 2px 0 2px 16px;
        width: 24px;
        height: 24px;
    }

    .image_3 {
        margin-top: 12px;
        margin-right: 0;
        margin-bottom: 0;
        margin-left: 0;
    }

    .view {
        margin-top: 12px;
    }

    .equal-division {
        margin: 30px 4px 0 10px;

        .space-y-18 {
            &>*:not(:first-child) {
                margin-top: 18px;
            }

            .font_2 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 10px;
                color: #c3cbd6;
            }
        }

        .horiz-divider {
            margin: 10px 0;
            background-color: #243652;
            width: 1px;
            height: 20px;
        }
    }

    .font_4 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #ffffff;
    }
}

.button {
    margin-top: 40px;
    padding: 16px 0;
    background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
    border-radius: 24px;

    .font_1 {
        font-size: 17px;
        font-family: MiSans;
        line-height: 16px;
        color: #ffffff;
    }
}

.group_3 {
    margin-top: 28px;

    .font_1 {
        font-size: 17px;
        font-family: MiSans;
        line-height: 16px;
        color: #ffffff;
    }

    .space-y-12 {
        &>*:not(:first-child) {
            margin-top: 12px;
        }

        .list-item {
            padding: 18px 12px;
            background-color: #242b44;
            border-radius: 4px;

            .font_4 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #ffffff;
            }

            .font_5 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #f72557;
            }

            .font_6 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 10px;
                color: #7887ae;
            }
        }

        .space-y-14 {
            &>*:not(:first-child) {
                margin-top: 14px;
            }
        }
    }
}

.space-y-16 {
    &>*:not(:first-child) {
        margin-top: 16px;
    }
}
</style>
