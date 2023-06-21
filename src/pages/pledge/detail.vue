<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
            <div class="flex-col space-y-12 pledgedetail">
                <div class="flex-col section space-y-24" :key="i" v-for="(item, i) in PledgeList">
                    <div class="flex-col space-y-19">
                        <div class="flex-row justify-between items-center">
                            <div class="flex-row items-center space-x-12">
                                <img class="shrink-0 image_2"
                                    src="/logo.png" />
                                <span class="font_1">{{ item.zynum }}</span>
                            </div>
                            <div class="flex-col justify-start items-center text-wrapper">
                                <span class="font_2 text_2">第{{ filters.numberToChinese(item.zylun) }}轮进行中</span>
                            </div>
                        </div>
                        <div class="flex-row justify-between">
                            <div class="flex-row space-x-12">
                                <span class="font_3 text_3">质押周期</span>
                                <span class="font_4 text_4">{{ item.zyday }}天</span>
                            </div>
                            <div class="flex-row items-center space-x-10">
                                <span class="font_3">收益率</span>
                                <span class="font_5 text_5">{{ siteRulers.zy_rate }}%</span>
                            </div>
                        </div>
                        <div class="flex-row items-center space-x-10">
                            <span class="font_3">质押收益(ARB)</span>
                            <span class="font_4">{{ item.shuhuinum }}</span>
                            <img class="image_2"
                                src="/logo.png" />
                        </div>
                        <div class="flex-row space-x-10">
                            <span class="font_3 text_6">质押倒计时</span>
                            <span class="font_4" v-if="item.leftTime"><van-count-down :time="item.leftTime"
                                    format="DD 天 HH 时 mm 分 ss 秒" /></span>
                            <span class="font_4" v-else>未知</span>
                        </div>
                    </div>
                    <div class="flex-row space-x-12">
                        <span class="font_3">挖矿收益</span>
                        <span class="font_3">{{ filters.pledgeStatus(item.status) }}</span>
                    </div>
                    <div class="flex-row space-x-10">
                        <span class="font_6">质押时间</span>
                        <span class="font_7">{{ item.createtime }}</span>
                    </div>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { myPledgeList } from '../../api/app.js'
import filters from '../../../utils/filters'
import { useAddrStore } from '../../store/user'
import { storeToRefs } from "pinia"

const store = useAddrStore();
let { siteRulers } = storeToRefs(store)
const PledgeList = ref([])
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
const orderpage = ref(1)

onMounted(async () => {
    await getMyPledgeList()
})

const getMyPledgeList = async () => {
    if (refreshing.value) {
        PledgeList.value = [];
        orderpage.value = 1
        refreshing.value = false;
    }
    const { data } = await myPledgeList({ page: orderpage.value, status: 1, shuhuistatus: 'all' })
    let now = new Date().getTime()
    data.data.forEach(element => {
        let endTime = new Date(element.daoqitime).getTime() * 1000
        element.leftTime = endTime - now
    });
    PledgeList.value = [...PledgeList.value, ...data.data]
    loading.value = false;
    if (PledgeList.value.length >= data.total) {
        finished.value = true;
    } else {
        orderpage.value += 1
    }
}

const onRefresh = async () => {
    // 清空列表数据
    finished.value = false;
    refreshing.value = true
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    getMyPledgeList();
};
</script>

<style lang='scss' scoped>
.pledgedetail {
    min-height: 30vh;
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }

    .section {
        padding: 16px 12px 24px;
        background-color: #242b44;
        border-radius: 8px;

        .space-y-19 {
            &>*:not(:first-child) {
                margin-top: 19px;
            }

            .text-wrapper {
                padding: 10px 0;
                background-color: #ffffff1a;
                border-radius: 16px;
                width: 102px;
                height: 32px;

                .font_2 {
                    font-size: 13px;
                    font-family: MiSans;
                    line-height: 12px;
                    color: #10e057;
                }

                .text_2 {
                    line-height: 12.5px;
                }
            }

            .font_4 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #c3cbd6;
            }

            .image_2 {
                border-radius: 20px;
                width: 24px;
                height: 24px;
            }
        }

        .space-x-12 {
            &>*:not(:first-child) {
                margin-left: 12px;
            }

            .font_1 {
                font-size: 17px;
                font-family: MiSans;
                line-height: 14px;
                color: #f72557;
            }

            .text_3 {
                line-height: 13.5px;
            }

            .text_4 {
                line-height: 12.5px;
            }
        }

        .font_3 {
            font-size: 15px;
            font-family: MiSans;
            line-height: 14px;
            color: #c3cbd6;
        }

        .space-x-10 {
            &>*:not(:first-child) {
                margin-left: 10px;
            }

            .font_5 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #10e057;
            }

            .text_5 {
                line-height: 11.5px;
            }

            .text_6 {
                line-height: 13.5px;
            }

            .font_6 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 12px;
                color: #7887ae;
            }

            .font_7 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 10px;
                color: #7887ae;
            }
        }
    }

    .space-y-24 {
        &>*:not(:first-child) {
            margin-top: 24px;
        }
    }
}
</style>
