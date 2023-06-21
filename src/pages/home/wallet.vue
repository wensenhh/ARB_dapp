<template>
    <div class="flex-col space-y-12">
        <div class="flex-row justify-between items-center section">
            <div class="flex-col space-y-30">
                <span class="self-start text_3">{{ pagetype == 1 ? 'ARB' : 'ART' }}钱包总额</span>
                <div class="flex-col items-start space-y-14">
                    <span class="font_2 text_4">{{ pagetype == 1 ? userinfo.balance_arb : userinfo.balance_art }}</span>
                    <span class="font_1 text_6">≈${{ pagetype == 1 ? userinfo.balance_arb :
                        userinfo.balance_art * siteRulers.art_today_jyprice }}</span>
                </div>
            </div>
            <div class="flex-col justify-start relative group_2">
                <img class="image_3"
                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123273767918574.png" />
                <div class="flex-col justify-start items-center text-wrapper_2 pos" v-if="pagetype == 1"
                    @click="navgateto('/pledge/withdraw')"><span class="font_3 text_5">提现</span>
                </div>
                <div class="flex-col justify-start items-center text-wrapper_2 pos" v-if="pagetype == 2"
                    @click="navgateto('/pledge/exchange')"><span class="font_3 text_5">兑换</span>
                </div>
            </div>
        </div>
        <div class="flex-row justify-between items-center section_2">
            <div class="flex-row items-baseline space-x-10">
                <span class="font_3 text_7">钱包地址</span>
                <span class="font_3 text_8">{{ filters.hideaddress(userinfo.account) || '用户信息读取失败~' }}</span>
            </div>
            <img class="image_4" @click="tools.copy(userinfo.account)"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123256290298419.png" />
        </div>
    </div>

    <div class="flex-col section_3 space-y-18" v-if="pagetype == 2">
        <span class="self-center font_2">ART</span>
        <div class="flex-col">
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123273891413977.png" />
                    <span class="font_3 text_9">合约地址</span>
                </div>
                <span class="font_4 text_10">{{ filters.hideaddress(artassetsinfo?.art_hyaddress) }}</span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123274620927281.png" />
                    <span class="font_3">距离下次铸币：</span>
                </div>
                <span class="font_4"><van-count-down :time="artassetsinfo?.leftTime"
                                    format="DD 天 HH 时 mm 分 ss 秒" /></span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123275266623067.png" />
                    <span class="font_3">流通总量：</span>
                </div>
                <span class="font_4 text_11">{{ artassetsinfo?.liutong }} ART</span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123275425892439.png" />
                    <span class="font_3">资金总额</span>
                </div>
                <span class="font_4 text_12">{{ artassetsinfo?.arbzynum }} ARB</span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123276066097459.png" />
                    <span class="font_3">ART价格：</span>
                </div>
                <span class="font_4 text_13">{{ artassetsinfo?.art_today_jyprice }} ARB</span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123276759759609.png" />
                    <span class="font_3">发行价格</span>
                </div>
                <span class="font_4">{{ artassetsinfo?.art_today_fxprice }} ARB</span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123276822878029.png" />
                    <span class="font_3 text_14">涨幅</span>
                </div>
                <span class="font_4 text_15">{{ artassetsinfo?.zhangfu }}%</span>
            </div>
            <div class="flex-row justify-between items-center group_3">
                <div class="flex-row items-center space-x-8">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123277457670642.png" />
                    <span class="font_3">我的ART</span>
                </div>
                <span class="font_4">{{ artassetsinfo?.balance_art }} ART</span>
            </div>
            <div class="flex-row justify-between items-center group_3" style="border: none;">
                <div class="flex-row items-center space-x-10">
                    <img class="shrink-0 image_4"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123278241052409.png" />
                    <span class="font_3">当前可提取</span>
                </div>
                <span class="font_4">{{ artassetsinfo?.balance_ketiart }} ART</span>
            </div>
        </div>

    </div>

    <div class="flex-col space-y-16" v-if="pagetype == 1">
        <span class="self-start font_1 text_8">资金记录</span>
        <div class="flex-col space-y-12">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
                <div class="flex-col list-item space-y-12" :key="i" v-for="(item, i) in arbassetsList">
                    <div class="flex-row justify-between">
                        <!-- <span class="font_3 text_9">{{ filters.orderStatus(item.status) {{ remark }} }}</span> -->
                        <span class="font_3 text_9"><van-text-ellipsis :content="item.remark" /></span>
                        <span class="font_4">{{ item.num }}</span>
                    </div>
                    <span class="self-start font_5">{{ item.createtime }}</span>
                </div>
            </van-list>
        </div>
    </div>
    <div style="height: 70px;"></div>
    <div class="extracttool" v-if="pagetype == 2" @click="extractDialog = true">提取</div>

    <van-dialog v-model:show="extractDialog" title="提取" show-cancel-button @confirm="userExtract">
        <div>
            <van-field v-model="extractnum" type="digit" placeholder="请输入提取的数量" />
        </div>
    </van-dialog>
</template>

<script setup>
import { ref, onUpdated, watch, onMounted } from 'vue'
import tools from '../../../utils/tools'
import { showToast } from 'vant';
import { useAddrStore } from '../../store/user'
import { storeToRefs } from "pinia"
import filters from '../../../utils/filters';
import { getUserassets, getARTaccets, getuserExtract } from '../../api/app'
import { sign } from '../../connectWallet/index'
import { useRoute, useRouter } from 'vue-router'

const store = useAddrStore();
let { userinfo, siteRulers } = storeToRefs(store)
const pagetype = ref('')
const assetpage = ref(1)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const arbassetsList = ref([])
const artassetsinfo = ref({})
const extractDialog = ref(false)
const extractnum = ref('')

//获取路由参数
const route = useRoute()
const router = useRouter();

onMounted(() => {
    console.log(route.query.type)
    if (route.query.type) {
        pagetype.value = route.query.type
    } else {
        showToast('参数错误~')
    }
})

onUpdated((options) => {
    console.log(route.query.type)
    if (route.query.type) {
        pagetype.value = route.query.type
    } else {
        showToast('参数错误~')
    }
}),

    watch(pagetype, (newValue, oldValue) => {
        if (newValue !== oldValue) {
            console.log('值发生了变更', newValue, oldValue);
            if (newValue == 1) {
                onRefresh()
            } else {
                getARTaccetsinfo()
            }
        }
    })

const userExtract = async () => {
    if (extractnum.value) {
        if (!filters.verifyparam(extractnum.value, 'number')) {
            return showToast('请输入正确的提取数量~')
        }
        if (extractnum.value > artassetsinfo.value.balance_ketiart) {
            return showToast('提取数量不能大于可提取数量~')
        } else {
            const signres = await sign()
            if (signres) {
                getuserExtract({
                    num: extractnum.value
                }).then(({ data }) => {
                    showToast('提取成功~')
                    extractnum.value = ''
                    extractDialog.value = false
                    getARTaccetsinfo()
                    store.getsiteRuler()
                })
            }
        }
    } else {
        showToast('请输入提取数量~')
    }
}

const getassetsinfo = () => {
    if (refreshing.value) {
        arbassetsList.value = [];
        assetpage.value = 1
        refreshing.value = false;
    }
    getUserassets({
        page: assetpage.value,
        action: 'all',
        balance_name: 'arb'
    }).then(({ data }) => {
        arbassetsList.value = [...arbassetsList.value, ...data.data]
        loading.value = false;
        if (arbassetsList.value.length >= data.total) {
            finished.value = true;
        } else {
            assetpage.value += 1
        }
    })
}

const getARTaccetsinfo = () => {
    getARTaccets().then(({ data }) => {
        let now = new Date().getTime()
        let endTime = new Date(data.daojishi).getTime() * 1000
        data.leftTime = endTime - now
        artassetsinfo.value = data
    })
}

const onRefresh = async () => {
    // 清空列表数据
    finished.value = false;
    refreshing.value = true
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    getassetsinfo();
};

const navgateto = (url, param) => {
    router.push({
        path: url,
        query: param
    });
}

</script>

<style lang='scss' scoped>
:deep(.van-count-down){
    color: #f29812 !important
}
.extracttool {
    @include flexCenter;
    width: 90%;
    height: 48px;
    margin: 0 auto;
    color: #ffffff;
    font-size: 17px;
    border-radius: 24px;
    background: linear-gradient(90deg, #5014fa 0%, #e023f0 100%);
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }

    .section {
        padding: 18px 12px;
        background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
        border-radius: 8px;
        overflow: hidden;

        .space-y-30 {
            &>*:not(:first-child) {
                margin-top: 30px;
            }

            .text_3 {
                color: #ffffff;
                font-size: 13px;
                font-family: MiSans;
                line-height: 12px;
            }

            .space-y-14 {
                &>*:not(:first-child) {
                    margin-top: 14px;
                }

                .font_2 {
                    font-size: 24px;
                    font-family: MiSans;
                    line-height: 19px;
                    color: #ffffff;
                }

                .text_4 {
                    line-height: 19.5px;
                }

                .font_1 {
                    font-size: 13px;
                    font-family: MiSans;
                    color: #c3cbd6;
                }

                .text_6 {
                    line-height: 12px;
                }
            }
        }

        .group_2 {
            width: 122px;

            .image_3 {
                margin-right: 6px;
                opacity: 0.2;
                width: 116px;
                height: 100px;
            }

            .text-wrapper_2 {
                padding: 8px 0;
                background-color: #242b44;
                border-radius: 24px;
                width: 64px;

                .text_5 {
                    color: #ffffff;
                }
            }

            .pos {
                position: absolute;
                right: 0;
                top: 68px;
            }
        }
    }

    .section_2 {
        padding: 14px 12px;
        background-color: #242b44;
        border-radius: 8px;

        .space-x-10 {
            &>*:not(:first-child) {
                margin-left: 10px;
            }

            .text_7 {
                line-height: 13.5px;
            }

            .text_8 {
                line-height: 12px;
            }
        }

        .image_4 {
            width: 20px;
            height: 20px;
        }
    }

    .font_3 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 14px;
        color: #c3cbd6;
    }
}

.section_3 {
    padding: 18px 12px;
    background-color: #242b44;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 18px;

    .font_2 {
        font-size: 24px;
        font-family: MiSans;
        line-height: 19px;
        color: #ffffff;
    }

    .group_3 {
        padding: 16px 0;
        border-bottom: solid 1px #243652;

        .space-x-8 {
            &>*:not(:first-child) {
                margin-left: 8px;
            }

            .text_9 {
                line-height: 13.5px;
            }

            .text_14 {
                line-height: 13.5px;
            }
        }

        .text_10 {
            margin-right: -4px;
        }

        .text_11 {
            margin-right: -8px;
        }

        .text_12 {
            margin-right: -6px;
        }

        .text_13 {
            margin-right: -4px;
        }

        .text_15 {
            margin-right: -4px;
        }
    }

    .space-x-10 {
        &>*:not(:first-child) {
            margin-left: 10px;
        }
    }

    .image_4 {
        width: 20px;
        height: 20px;
    }

    .font_3 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 14px;
        color: #c3cbd6;
    }

    .font_4 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #f29812;
    }
}

.space-y-16 {
    margin-top: 18px;

    .font_1 {
        font-size: 17px;
        font-family: MiSans;
        color: #ffffff;
    }

    .text_8 {
        line-height: 15.5px;
    }

    .space-y-12 {
        margin-top: 12px;

        .list-item {
            padding: 16px 12px;
            background-color: #242b44;
            border-radius: 4px;

            .font_3 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 13.5px;
                color: #ffffff;
            }

            .text_9 {
                line-height: 14px;
            }

            .font_4 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #f72557;
            }

            .font_5 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 10px;
                color: #7887ae;
            }
        }
    }
}
</style>
