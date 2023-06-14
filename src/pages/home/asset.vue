<template>
    <div class="flex-col group space-y-16">
        <div class="flex-col section_2 space-y-16">
            <div class="flex-col justify-start items-start text-wrapper_2 view"><span class="font_2 text">{{$t('second.myassets')}}</span></div>
            <div class="flex-row justify-between">
                <span class="font_3">{{$t('capital.llqb')}}(LTC)</span>
                <span class="font_3 text_2">{{$t('capital.llqb')}}(LTC)</span>
            </div>
            <div class="flex-row justify-between">
                <div class="flex-row items-baseline space-x-2">
                    <span class="font_4">{{ UserMoney.linglu }}</span>
                    <span class="font_3">≈$100.00</span>
                </div>
                <div class="flex-row items-baseline space-x-2">
                    <span class="font_4">{{ UserMoney.pledge }}</span>
                    <span class="font_3">≈$100.00</span>
                </div>
            </div>
        </div>
        <div class="flex-col section_3 space-y-24">
            <div class="flex-col space-y-16">
                <div class="flex-col relative group_2 view_2">
                    <span class="self-start font_5">{{$t('with.lqqb')}}</span>
                    <div class="flex-row items-baseline group_4 space-x-12">
                        <span class="font_6">{{$t('with.linelx')}}</span>
                        <span class="font_1">BSC</span>
                    </div>
                    <div class="flex-row items-center group_3 pos">
                        <div v-for="(item, i) in assetsList" :key="item.value">
                            <img class="image_2 image_5" v-show="nowasset == item.value"
                                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798183188295600.png" />
                            <img class="image_2 image_5" v-show="nowasset != item.value" @click="changeasset(item.value)"
                                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798183426905675.png" />
                            <span class="font_5 text_3" @click="changeasset(item.value)">{{ item.text }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-col justify-start items-start text-wrapper_3">
                    <!-- <span class="font_5 text_5">请输入提现的LTC数量</span> -->
                    <van-field v-model="withdrawnum" :placeholder="$t('with.qsrlqultcnum')" />
                </div>
            </div>
            <div class="flex-col">
                <div class="flex-row justify-between group_5">
                    <span class="font_6">{{$t('with.klqsl')}} ：{{ applyinfo.applynum }}</span>
                    <span class="font_6" v-if="nowasset === 1">{{$t('with.sxf')}}：{{ applyinfo.servicecharge }}</span>
                    <span class="font_6" v-if="nowasset === 2">{{$t('with.sl')}}：{{ applyinfo.servicecharge }}</span>
                </div>
                <div class="flex-col justify-start items-center button" v-if="!usdtapproveFlag" @click="getApprovecoin(1)">
                    <span class="font_2 text_6">{{$t('pledge.get')}}</span>
                </div>
                <div class="flex-col justify-start items-center button" v-else-if="!ltcapproveFlag"
                    @click="getApprovecoin(2)"><span class="font_2 text_6">{{$t('pledge.get')}}</span></div>
                <div class="flex-col justify-start items-center button" v-else @click="filters.debounce(withdraw, 1000)">
                    <span class="font_2 text_6">{{$t('pledge.get')}}</span>
                </div>
            </div>
        </div>
        <div class="flex-col section_4">
            <div class="flex-col justify-start items-start text-wrapper_2"><span class="font_2">{{$t('with.mylqinfo')}}</span></div>
            <div class="flex-col">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="getzcList">
                        <div class="flex-col group_2 space-y-10" :key="i" v-for="(item, i) in applyList">
                            <div class="flex-row justify-between">
                                <span class="font_5 text_7">{{ item.statusStr }}</span>
                                <span class="font_7">{{ item.quantity }}</span>
                            </div>
                            <span class="self-start font_8">{{ item.createTime }}</span>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getApplyLog, getassetsTotal, getApplyset, getUserassets, userwithdraw } from '../../api/app.js'
import { allowance, ApproveCoin, createCCContract, createRechargeContract, toAmount } from '../../connectWallet/index'
import { showToast, closeToast, showFailToast, showLoadingToast } from 'vant';
import { storeToRefs } from "pinia"
import { useAddrStore } from '../../store/user'
import { Base64 } from 'js-base64';
import filters from '../../../utils/filters';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = useAddrStore();
let { address } = storeToRefs(store)
const nowasset = ref(null)
const applyList = ref([])
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const teamPage = ref({
    pageNum: 1,
    pageSize: 10
})
const assetsList = ref([])
const applyinfo = ref({})
const withdrawnum = ref(null)
const UserMoney = ref({})
const usdtapproveFlag = ref(false)
const ltcapproveFlag = ref(false)

onMounted(async () => {
    await getassets()
    await getUserMoney()
    getallallowance()
})

const withdraw = async () => {
    if (!filters.verifyparam(withdrawnum.value, 'number')) {
        return showToast(t('with.qsrzqdlqjl'))
    }
    if (withdrawnum.value < 0.1) {
        return showToast(t('with.zslq'))
    }
    if (!nowasset.value) {
        return showToast(t('with.qxzaddr'))
    }
    // if (!this.ChainTypenow) {
    //     return this.$tools.toast(that.$t('with.qxzline'))
    // }
    // that.$tools.loading(that.$t('with.lqz'))
    showLoadingToast(t('with.lqz'))
    userwithdraw({
        address: address.value,
        quantity: withdrawnum.value,
        walletType: nowasset.value,
        chadType: 1
    }).then(async res => {
        let obj = res.obj
        try {
            let MyContract = await createRechargeContract();
            let amount = await toAmount((obj.price).toString())
            const signerres = Base64.decode(obj.signer);
            console.log(amount, obj.time, signerres, obj.dec)
            MyContract.withdraw(amount, obj.time, signerres, obj.dec).then(res => {
                console.log("領取成功==", res);
                this.onRefresh()
                this.getassets()
                return showToast(t('with.lqcg'))
            }).catch(err => {
                this.onRefresh()
                this.getassets()
                return showFailToast(t('with.lqsb'))
                // console.log("領取失敗==", err);
                // uni.hideLoading()
                // return that.$tools.toast('領取失敗~')
            })
        } catch (error) {
            // canceltibi({
            //     id: obj.id
            // }).then(res => {

            // })
            // that.$tools.toast('合約交互失敗~', error)
            // uni.hideLoading()
            console.error("trigger smart contract error", error)
        }
    })
}


const getApprovecoin = async (type) => {
    ApproveCoin(type, res => {
        console.log(res)
        if (res?.hash) {
            getallallowance()
        }
    })
}

const getallallowance = async () => {
    usdtapproveFlag.value = await allowance(1)
    ltcapproveFlag.value = await allowance(2)
}

const changeasset = (i) => {
    nowasset.value = i
    onRefresh()
    getmyApplyset()
}

const getassets = () => {
    showLoadingToast('加载中~')
    getassetsTotal().then(res => {
        let list = res.obj
        list.forEach(item => {
            assetsList.value.push({
                text: item.name,
                value: item.type
            })
        })
        closeToast()
        nowasset.value = list[1].type
        onRefresh()
        getmyApplyset()
    })
}

const getUserMoney = () => {
    getUserassets().then(({ obj }) => {
        UserMoney.value = {
            linglu: obj[0].list[0].using,
            pledge: obj[1].list[0].using,
            klLTC: obj[0].list[0].give,
            ifkl: obj[0].status
        }
    })
}

const getmyApplyset = () => {
    getApplyset({
        assetType: nowasset.value
    }).then(res => {
        applyinfo.value = {
            applynum: res.obj[0].using,
            servicecharge: res.obj[0].change
        }
    })
}

const getzcList = async () => {
    if (refreshing.value) {
        applyList.value = [];
        teamPage.value.pageNum = 1
        refreshing.value = false;
    }
    teamPage.value.assetType = nowasset.value
    await getApplyLog({
        ...teamPage.value
    }).then(({ obj }) => {
        applyList.value = [...applyList.value, ...obj.list]
        loading.value = false;
        if (applyList.value.length >= obj.total) {
            finished.value = true;
        } else {
            teamPage.value.pageNum += 1
        }
    })
}

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;
    refreshing.value = true;
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    getzcList();
};
</script>

<style lang='scss' scoped>
.group {
    .section_2 {
        padding: 16px 14px 34px 16px;
        background-image: linear-gradient(159deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;

        .view {
            margin-right: 2px;
        }

        .font_3 {
            font-size: 13px;
            font-family: MiSans;
            line-height: 12px;
            color: #90909c;
        }

        .text_2 {
            margin-right: 48px;
        }

        .space-x-2 {
            &>*:not(:first-child) {
                margin-left: 2px;
            }

            .font_4 {
                font-size: 17px;
                font-family: MiSans;
                line-height: 14px;
                color: #28282f;
            }
        }
    }

    .section_3 {
        padding: 12px 8px 24px 12px;
        background-image: linear-gradient(143.9deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;

        .group_5 {
            padding-bottom: 20px;
        }

        .button {
            margin-right: 4px;
            padding: 16px 0;
            background-image: linear-gradient(98.2deg, #6b46fe 0%, #fe46eb 100%);
            border-radius: 24px;

            .text_6 {
                color: #ffffff;
            }
        }
    }

    .space-y-24 {
        &>*:not(:first-child) {
            margin-top: 24px;
        }
    }

    .font_2 {
        font-size: 17px;
        font-family: MiSans;
        line-height: 15.5px;
        color: #28282f;
    }

    .section_4 {
        padding: 20px 16px 38px;
        background-image: linear-gradient(121.8deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;

        .space-y-10 {
            &>*:not(:first-child) {
                margin-top: 10px;
            }
        }
    }

    .text-wrapper_2 {
        padding: 4px 0 20px;
        border-bottom: solid 1px #f0f0f0;

        .text {
            line-height: 16px;
        }
    }
}

.space-y-16 {
    &>*:not(:first-child) {
        margin-top: 16px;
    }

    .view_2 {
        margin-right: 4px;
    }

    .text-wrapper_3 {
        margin-right: 4px;
        background-color: #f0f0f0;
        border-radius: 4px;

        .text_5 {
            margin-left: 12px;
            color: #90909c;
        }
    }
}

.space-y-16 {
    &>*:not(:first-child) {
        margin-top: 16px;
    }

    .view_2 {
        margin-right: 4px;
    }

    .text-wrapper_3 {
        margin-right: 4px;
        background-color: #f0f0f0;
        border-radius: 4px;

        .text_5 {
            margin-left: 12px;
            color: #90909c;
        }
    }
}

.space-y-16 {
    &>*:not(:first-child) {
        margin-top: 16px;
    }

    .view_2 {
        margin-right: 4px;
    }

    .text-wrapper_3 {
        margin-right: 4px;
        background-color: #f0f0f0;
        border-radius: 4px;

        .text_5 {
            margin-left: 12px;
            color: #90909c;
        }
    }
}

.font_6 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 12px;
    color: #484856;
}

.font_6 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 12px;
    color: #484856;
}

.group_2 {
    padding: 16px 0;
    border-bottom: solid 1px #f0f0f0;

    &:last-of-type {
        margin-top: 18px;
    }

    .group_4 {
        margin-top: 20px;

        .font_1 {
            font-size: 13px;
            font-family: MiSans;
            line-height: 10px;
            color: #484856;
        }
    }

    .space-x-12 {
        &>*:not(:first-child) {
            margin-left: 12px;
        }
    }

    .group_3 {
        padding: 0 12px;
        border-radius: 4px;

        div {
            @include flexLeft;

            .image_2 {
                width: 24px;
                height: 24px;
            }

            .text_3 {
                margin-left: 4px;
            }

            .image_5 {
                margin-left: 18px;
            }

            .text_4 {
                margin-left: 4px;
                margin-right: 36px;
            }
        }

    }

    .pos {
        position: absolute;
        right: 0;
        top: 10px;
    }

    .text_7 {
        line-height: 13.5px;
    }

    .font_7 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #ff4b7b;
    }

    .font_8 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 10px;
        color: #90909c;
    }
}

.font_5 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 14px;
    color: #484856;
}</style>
