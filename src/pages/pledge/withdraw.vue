<template>
    <div class="flex-col group_2">
        <div class="flex-row items-center group_3 space-x-30">
            <span class="font_2">链类型</span>
            <div class="flex-row justify-between items-center flex-auto section" @click="lineVisible = true">
                <span class="font_3">ARB</span>
                <img class="image"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123254513859668.png" />
            </div>
        </div>
        <div class="flex-row items-center group_3 space-x-14">
            <span class="font_2">提现钱包</span>
            <div class="flex-row justify-between items-center flex-auto section" @click="walletVisible = true">
                <span class="font_3">{{ balance.name || '获取钱包中~' }}</span>
                <img class="image"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123254513859668.png" />
            </div>
        </div>
        <div class="flex-col justify-start items-start text-wrapper">
            <van-field v-model="withdrawnum" type="number" placeholder="请输入提现的ARB数量" />
        </div>
        <van-action-sheet v-model:show="lineVisible" :actions="lineList" @select="onlineSelect" />
        <van-action-sheet v-model:show="walletVisible" :actions="walletList" @select="onWalletSelect" />
    </div>
    <div class="flex-row justify-between group_4">
        <span class="font_4">可提现数量：{{ balance.balance_num }}</span>
        <span class="font_4">手续费：{{ balance.sxf }}%</span>
    </div>
    <div class="flex-row group_4" style="color: #c3cbd6;font-size: 12px;">
        V1-V5节点池提现手续费{{siteRulers.tixian_sxf_v15}}%
        <br>
        节点提现手续费{{siteRulers.tixian_sxf_jie}}%
        <br>
        超级节点提现手续费{{siteRulers.tixian_sxf_chao}}%
        <br>
        节点、超级节点、动态ARB最小提现数量{{siteRulers.tixian_jiemin}}
        <br>
        V1-V5最小提现数量{{siteRulers.tixian_v15min}}个
    </div>
    <div class="flex-col justify-start items-center button" @click="withdraw"><span class="font_1">提现</span></div>
</template>

<script setup>
import { Loading, showLoadingToast, closeToast, showToast } from 'vant';
import { ref, onMounted } from 'vue'
import { useAddrStore } from '../../store/user'
import { storeToRefs } from "pinia"
import { accetsList, userwithdraw } from '../../api/app'
import { sign } from '../../connectWallet/index'
import { useRoute, useRouter } from 'vue-router'
import filters from '../../../utils/filters';

//获取路由参数
const route = useRoute()
const store = useAddrStore();
let { userinfo, siteRulers } = storeToRefs(store)
const lineVisible = ref(false)
const walletVisible = ref(false)
const lineList = ref([
    { name: 'ARB', color: '#ee0a24', className: "sheetitem" },
]);
const walletList = ref([]);
const withdrawnum = ref(null)
const balance = ref({})
const routelevel = ref('')

onMounted(async () => {
    if (route.query.level) {
        routelevel.value = route.query.level
    }
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    });
    await getaccetsList()
    closeToast();
})

const withdraw = async () => {
    if (!withdrawnum.value) {
        showToast('请输入提现数量~')
        return
    }
    if (!filters.verifyparam(withdrawnum.value, 'number')) {
        showToast('请输入正确的提现数量~')
        return
    }
    if(withdrawnum.value > balance.value.balance_num){
        showToast('可提现数量不够~')
        return
    }
    if (!balance.value.balance_name) {
        showToast('请选择提现钱包~')
        return
    }
    const signres = await sign()
    if (!signres) return
    showLoadingToast({
        message: '提现中...',
        forbidClick: true,
        duration: 0,
    });
    userwithdraw({
        balance_name: balance.value.balance_name,
        num: withdrawnum.value,
    }).then(res => {
        setTimeout(() => {
            closeToast();
            showToast('提现成功~')
            store.getsiteRuler()
            getaccetsList()
        }, 1000);
    })
}

const getaccetsList = async () => {
    const { data } = await accetsList()
    if (routelevel.value && routelevel.value != '') {
        data.forEach(element => {
            if (element.name.indexOf(routelevel.value) != -1) {
                element.color = '#ee0a24'
                balance.value = element
            }
        });
    } else {
        data[0].color = '#ee0a24'
        balance.value = data[0]//初始化钱包
    }
    walletList.value = data
}

const onWalletSelect = (item) => {
    walletVisible.value = false
    walletList.value.forEach(element => {
        if (element.balance_name == item.balance_name) {
            balance.value = item
            element.color = '#ee0a24'
        } else {
            element.color = '#ffffff'
        }
    });
}

const onlineSelect = (item) => {
    lineVisible.value = false
    lineList.value.forEach(element => {
        if (element.name == item.name) {
            element.color = '#ee0a24'
        } else {
            element.color = '#ffffff'
        }
    });
}

</script>

<style lang='scss' scoped>
.sheetitem {
    color: #FFFFFF;
}

:deep(.van-action-sheet) {
    color: #FFFFFF !important;
}

.group_2 {
    .group_3 {
        margin-right: 4px;
        padding: 16px 0;
        border-bottom: solid 1px #243652;

        .section {
            padding: 12px;
            background-color: #242b44;
            border-radius: 4px;
            height: 48px;

            .font_3 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #c3cbd6;
            }

            .image {
                width: 24px;
                height: 24px;
            }
        }
    }

    .space-x-30 {
        &>*:not(:first-child) {
            margin-left: 30px;
        }
    }

    .space-x-14 {
        &>*:not(:first-child) {
            margin-left: 14px;
        }
    }

    .text-wrapper {
        margin-top: 10px;
        margin-right: 4px;
        background-color: #242b44;
        border-radius: 4px;
    }

    .font_2 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 14px;
        color: #c3cbd6;
    }
}

.group_4 {
    margin-top: 24px;

    .font_4 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 12px;
        color: #c3cbd6;
    }
}

.button {
    margin-right: 4px;
    margin-top: 32px;
    padding: 16px 0;
    background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
    border-radius: 24px;

    .font_1 {
        font-size: 17px;
        font-family: MiSans;
        line-height: 15.5px;
        color: #ffffff;
    }
}
</style>

