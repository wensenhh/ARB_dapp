<template>
    <div class="flex-col list space-y-20">
        <div class="flex-col section_3">
            <div class="flex-col justify-start list-item">
                <div class="flex-row space-x-30">
                    <div class="flex-col items-center equal-division-item space-y-12">
                        <span class="font_1">LTT价格($)</span>
                        <span class="font_2">0.00</span>
                    </div>
                    <div class="flex-col items-center equal-division-item space-y-12">
                        <span class="font_1">LTT余额</span>
                        <span class="font_2">{{ coinDetail.ltt }}</span>
                    </div>
                </div>
            </div>
            <div class="flex-col justify-start list-item_2">
                <div class="flex-row space-x-12">
                    <div class="flex-col items-center equal-division-item_2 group_2 space-y-12">
                        <span class="font_1 text_4">个人算力(T)</span>
                        <span class="font_2">{{ coinDetail.hashrate }}</span>
                    </div>
                    <div class="flex-col items-center equal-division-item_2 group_3 space-y-12">
                        <span class="font_1 text_5">全网算力(T)</span>
                        <span class="font_2">{{ coinDetail.allHashrate }}</span>
                    </div>
                </div>
            </div>
            <div class="flex-row items-start relative list-item">
                <div class="flex-col items-center equal-division-item_3 space-y-12">
                    <span class="font_1">总发行(枚)</span>
                    <span class="font_2">{{ coinDetail.gross }}</span>
                </div>
                <div class="flex-col items-center equal-division-item_3 space-y-12">
                    <span class="font_1">流通量(枚)</span>
                    <span class="font_2">{{ coinDetail.sent }}</span>
                </div>
            </div>
            <div class="flex-col justify-start list-item_2">
                <div class="flex-row space-x-12">
                    <div class="flex-col items-center equal-division-item_2 group_4 space-y-12">
                        <span class="font_1">永动池</span>
                        <span class="font_2">{{ coinDetail.fomoPool }}</span>
                    </div>
                    <div class="flex-col items-center equal-division-item_2 group_5 space-y-12">
                        <span class="font_1">保险仓</span>
                        <span class="font_2">{{ coinDetail.tatolBxcLtc }}</span>
                    </div>
                </div>
            </div>
            <div class="flex-col justify-start list-item">
                <div class="flex-row space-x-32">
                    <div class="flex-col equal-division-item_2 group_6 space-y-12">
                        <span class="self-center font_1">Top池</span>
                        <span class="self-center font_2">{{ coinDetail.topLtc }}</span>
                    </div>
                    <div class="flex-col equal-division-item_2 group_7 space-y-12">
                        <span class="self-center font_1">今日产出</span>
                        <span class="self-center font_2">{{ coinDetail.newSent }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-col section_4">
            <div class="flex-row justify-between items-center group_8">
                <span class="font_2 text_6">Top待分红</span>
                <span class="font_3 text_7">{{ ranktop.newPrice }}</span>
            </div>
            <div class="flex-col section_5 space-y-24">
                <div class="flex-col">
                    <div class="flex-row items-center space-x-12" v-for="(item, i) in rankList" :key="i">
                        <img class="shrink-0 image_2" v-if="i == 0"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798131122699275.png" />
                        <img class="shrink-0 image_2" v-if="i == 1"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798131934469408.png" />
                        <img class="image_2" v-if="i == 2"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798132385036607.png" />
                        <div class="flex-row justify-between items-center flex-auto group_9">
                            <div class="flex-row space-x-12">
                                <img class="image_5"
                                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798132429191768.png" />
                                <div class="flex-col items-start space-y-10">
                                    <span class="font_4">{{ filters.hideaddress(item.name) }}</span>
                                    <span class="font_1">{{item.ran}}</span>
                                </div>
                            </div>
                            <div class="flex-col items-center space-y-12">
                                <span class="font_1">今日业绩</span>
                                <span class="font_3 text_8">${{ item.sum }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { coininfo, tatolRankingList, getrankList } from '../../api/app.js'
import filters from '../../../utils/filters';

const coinDetail = ref({})
const ranktop = ref({})
const rankList = ref([])

onMounted(() => {
    getcoininfo()
    getranklist()
    getallrank()
})

const getallrank = () => {
    getrankList().then(res => {
        let list = res.obj
        if (list.length > 3) list = list.slice(0, 3)
        rankList.value = list
    })
}

const getranklist = () => {
    tatolRankingList().then(res => {
        ranktop.value = res.obj
    })
}
const getcoininfo = () => {
    coininfo().then(res => {
        coinDetail.value = res.obj
    })
}
</script>

<style lang='scss' scoped>
.list {

    .section_3 {
        padding: 20px 12px;
        background-image: linear-gradient(128.8deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;

        .list-item {
            padding: 20px 0;
            background-color: #f0f0f0;

            .space-x-30 {
                &>*:not(:first-child) {
                    margin-left: 30px;
                }

                .equal-division-item {
                    flex: 1 1 152.5px;
                    padding: 6px 18px;
                }
            }

            .equal-division-item_3 {
                padding: 6px 0;
                width: 161px;
            }

            .space-x-32 {
                &>*:not(:first-child) {
                    margin-left: 32px;
                }

                .group_6 {
                    flex: 1 1 151.5px;
                }

                .group_7 {
                    flex: 1 1 151.5px;
                }
            }
        }

        .list-item_2 {
            padding: 20px 0;
            background-image: linear-gradient(166.3deg, #f9f9f9 0%, #f8f8f8 100%);

            .space-x-12 {
                &>*:not(:first-child) {
                    margin-left: 12px;
                }

                .group_2 {
                    flex: 1 1 161px;
                }

                .group_3 {
                    flex: 1 1 161px;
                }

                .group_4 {
                    flex: 1 1 161px;
                }

                .group_5 {
                    flex: 1 1 161px;
                }
            }
        }

        .space-y-12 {
            &>*:not(:first-child) {
                margin-top: 12px;
            }
        }

        .font_1 {
            font-size: 13px;
            font-family: MiSans;
            line-height: 12px;
            color: #90909c;
        }

        .font_2 {
            font-size: 17px;
            font-family: MiSans;
            line-height: 14px;
            color: #28282f;
        }

        .equal-division-item_2 {
            padding: 6px 0;

            .text_4 {
                line-height: 12.5px;
            }

            .text_5 {
                line-height: 12.5px;
            }
        }
    }

    .section_4 {
        padding: 20px 12px;
        background-image: linear-gradient(138.2deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;
        overflow: hidden;

        .group_8 {
            padding: 14px 0;

            .font_2 {
                font-size: 17px;
                font-family: MiSans;
                line-height: 14px;
                color: #28282f;
            }

            .text_6 {
                line-height: 19px;
            }

            .text_7 {
                line-height: 12px;
            }
        }

        .section_5 {
            padding: 0 10px 24px 12px;
            background-image: linear-gradient(144.4deg, #f9f9f9 0%, #f8f8f8 100%);
            overflow: hidden;

            .space-x-12 {
                &>*:not(:first-child) {
                    margin-left: 12px;
                }

                .image_2 {
                    width: 24px;
                    height: 24px;
                }

                .group_9 {
                    margin-right: 2px;
                    padding: 24px 0;
                    height: 86px;
                    border-bottom: solid 1px #f0f0f0;
                }

                .image_5 {
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                }

                .space-y-10 {
                    &>*:not(:first-child) {
                        margin-top: 10px;
                    }

                    .text_10 {
                        line-height: 14.5px;
                    }
                }

                .space-y-8 {
                    &>*:not(:first-child) {
                        margin-top: 8px;
                    }

                    .text_9 {
                        line-height: 15.5px;
                    }
                }

                .font_4 {
                    font-size: 15px;
                    font-family: MiSans;
                    line-height: 14px;
                    color: #484856;
                }
            }

            .space-y-12 {
                &>*:not(:first-child) {
                    margin-top: 12px;
                }

                .text_8 {
                    line-height: 14.5px;
                }

                .text_11 {
                    line-height: 14.5px;
                }
            }

            .font_1 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 12px;
                color: #90909c;
            }
        }

        .space-y-24 {
            &>*:not(:first-child) {
                margin-top: 24px;
            }
        }

        .font_3 {
            font-size: 15px;
            font-family: MiSans;
            line-height: 14px;
            color: #28282f;
        }
    }
}

.space-y-20 {
    &>*:not(:first-child) {
        margin-top: 20px;
    }
}
</style>
