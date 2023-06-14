<template>
    <div class="flex-col">
        <div class="flex-col section_2 statebox">
            <div class="flex-row justify-between group">
                <div class="flex-row space-x-24">
                    <span class="font_2 text">全部</span>
                    <span class="font_2">进行中</span>
                    <span class="font_2">已完成</span>
                </div>
                <span class="font_2 text_2" @click="allearming">一键领取</span>
            </div>
            <div class="self-start section_3"></div>
        </div>
        <div style="height: 80px;"></div>
        <div class="flex-col list space-y-12">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getpledgeList">
                    <div class="flex-col list-item space-y-26" :key="i" v-for="(item, i) in pledgeList">
                        <div class="flex-col">
                            <div class="flex-row justify-between items-center">
                                <div class="flex-row items-center space-x-6">
                                    <img class="shrink-0 image_2"
                                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798185856872482.png" />
                                    <span class="font_3">{{ item.usdtPrice }}</span>
                                    <span class="font_1">≈{{ item.ltcPrice }} LTC</span>
                                </div>
                                <div class="flex-col justify-start items-center text-wrapper_2" v-if="item.status == 4"
                                    @click="getmyRedeem(item)">
                                    <span class="font_4">赎回</span>
                                </div>
                                <div class="flex-col justify-start items-center text-wrapper_2" @click="getEarning(item)">
                                    <span class="font_4">领取</span>
                                </div>
                            </div>
                            <div class="flex-row justify-center relative group_2">
                                <span class="font_5 pos">质押周期</span>
                                <span class="font_5">收益率</span>
                                <span class="font_5 pos_2">状态</span>
                            </div>
                            <div class="flex-row justify-center relative group_3">
                                <span class="font_6 text_3 pos_3">{{ item.time }}天</span>
                                <span class="font_7">{{ item.rate }}%</span>
                                <span class="font_8 pos_4">{{ item.statusStr }}</span>
                            </div>
                        </div>
                        <div class="flex-col space-y-12">
                            <div class="flex-row space-x-10">
                                <span class="font_9 text_4">质押时间</span>
                                <span class="font_10">{{ item.createTime }}</span>
                            </div>
                            <div class="flex-row items-center space-x-9">
                                <span class="font_9">可领取收益(LTC)</span>
                                <span class="font_10">{{ item.earnings }}</span>
                                <img class="image_2"
                                    src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798186353877799.png" />
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pledgeInfo, getEarnings, getRedeem, lqallearnings } from '../../api/app.js'
import { connetWallet, sign, allowance, balance, createCCContract, createRechargeContract, toAmount } from '../../connectWallet/index'
import { Base64 } from 'js-base64';
import { showToast, showConfirmDialog, showFailToast, showLoadingToast } from 'vant';

const pledgeList = ref([])
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const teamPage = ref({
    pageNum: 1,
    pageSize: 10,
    status: 0
})

onMounted(() => {
    let dom = document.getElementById('container');
    if (dom !== null) {
        dom.scrollTop = 0;
    }
})

const getmyRedeem = (item) => {
    showConfirmDialog({
        title: '提示',
        message:
            `您正在進行贖回，本次贖回可獲得${item.ltcPrice}LTC，請確認`,
    }).then(() => {
        showLoadingToast('贖回中~')
        getRedeem({
            id: item.id
        }).then(async res => {
            let obj = res.obj
            let amount = await toAmount(obj.amount.toString())
            console.log(amount, obj.timeStmp, obj.signer, obj.desc)
            try {
                let MyContract = await createRechargeContract();
                const signerres = Base64.decode(obj.signer);
                MyContract.withdraw(amount, obj.timeStmp, signerres, obj.desc).then(
                    res => {
                        console.log("赎回成功==", res);
                        onRefresh()
                        return showToast('赎回成功~')
                    }).catch(err => {
                        console.log("赎回失敗==", err);
                        return showFailToast('赎回失敗~')
                    })
            } catch (error) {
                console.error("trigger smart contract error", error)
                return showFailToast('合約交互失敗~', error)
            }
        })
    }).catch(() => {
        // on cancel
    });
}

const allearming = async () => {
    let studs = false
    pledgeList.value.forEach(item => {
        if (item.status == 3 && item.earnings > 0) {
            studs = true
        }
    })
    if (!studs) {
        return showFailToast('當前暫無訂單有收益可領取~')
    }
    let signuser = await sign()
    if (signuser) {
        showConfirmDialog({
            title: '提示',
            message:
                '您確定要一鍵領取所有收益嗎？',
        }).then(() => {
            showLoadingToast('領取中~')
            lqallearnings().then(res => {
                onRefresh()
                showToast('領取成功~')
            })
        }).catch(() => {
            // on cancel
        });
    }
    // that.$tools.toast('維護中，請稍後~')

}

const getEarning = async (item) => {
    if (item.earnings == 0) {
        return showFailToast('當前訂單暫無收益可領取~')
    }
    let signuser = await sign()
    if (signuser) {
        showConfirmDialog({
            title: '提示',
            message:
                '您確定要領取當前質押收益嗎？',
        }).then(() => {
            showLoadingToast('領取中~')
            getEarnings({
                id: item.id
            }).then(res => {
                onRefresh()
                showToast('領取成功~')
            })
        }).catch(() => {
            // on cancel
        });
    }
}

const getpledgeList = async () => {
    if (refreshing.value) {
        pledgeList.value = [];
        teamPage.value.pageNum = 1
        refreshing.value = false;
    }
    await pledgeInfo(teamPage.value).then(({ obj }) => {
        pledgeList.value = [...pledgeList.value, ...obj.list]
        loading.value = false;
        if (pledgeList.value.length >= obj.total) {
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
    getpledgeList();
};
</script>

<style lang='scss' scoped>
.statebox {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
}

.container {
    padding: 4px 0 !important;
}

.section_2 {
    padding: 0 16px;
    background-image: linear-gradient(174deg, #f9f9f9 0%, #f8f8f8 100%);

    .group {
        padding: 16px 0 10px;

        .space-x-24 {
            &>*:not(:first-child) {
                margin-left: 24px;
            }

            .text {
                color: #28282f;
            }
        }

        .font_2 {
            font-size: 17px;
            font-family: MiSans;
            line-height: 16px;
            color: #90909c;
        }

        .text_2 {
            color: transparent;
            background-image: linear-gradient(93.3deg, #6b46fe 0%, #fe46eb 100%);
            -webkit-background-clip: text;
        }
    }

    .section_3 {
        margin-left: 8px;
        background-image: linear-gradient(99.4deg, #6b46fe 0%, #fe46eb 100%);
        width: 16px;
        height: 2px;
    }
}

.list {

    .list-item {
        padding: 16px 12px 20px;
        background-image: linear-gradient(153.3deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;

        .space-x-6 {
            &>*:not(:first-child) {
                margin-left: 6px;
            }

            .font_3 {
                font-size: 17px;
                font-family: MiSans;
                line-height: 14px;
                color: #ff4b7b;
            }

            .font_1 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 10px;
                color: #484856;
            }
        }

        .text-wrapper_2 {
            padding: 10px 0;
            background-image: linear-gradient(93deg, #6b46fe 0%, #fe46eb 100%);
            border-radius: 16px;
            width: 80px;
            height: 32px;

            .font_4 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 12px;
                color: #ffffff;
            }
        }

        .group_2 {
            margin-top: 16px;

            .font_5 {
                font-size: 13px;
                font-family: MiSans;
                line-height: 12px;
                color: #90909c;
            }

            .pos {
                position: absolute;
                left: 0.5px;
                top: 50%;
                transform: translateY(-50%);
            }

            .pos_2 {
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .group_3 {
            margin-top: 10px;

            .font_6 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #28282f;
            }

            .text_3 {
                line-height: 13px;
            }

            .pos_3 {
                position: absolute;
                left: 0.5px;
                top: 50%;
                transform: translateY(-50%);
            }

            .font_7 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 12px;
                color: #22e358;
            }

            .font_8 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 14px;
                color: #fec42e;
            }

            .pos_4 {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .image_2 {
            width: 24px;
            height: 24px;
        }
    }

    .space-y-26 {
        &>*:not(:first-child) {
            margin-top: 26px;
        }
    }
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }

    .space-x-10 {
        &>*:not(:first-child) {
            margin-left: 10px;
        }

        .text_4 {
            line-height: 13.5px;
        }
    }

    .space-x-9 {
        &>*:not(:first-child) {
            margin-left: 9px;
        }
    }

    .font_9 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 14px;
        color: #90909c;
    }

    .font_10 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #484856;
    }
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }

    .space-x-10 {
        &>*:not(:first-child) {
            margin-left: 10px;
        }

        .text_4 {
            line-height: 13.5px;
        }
    }

    .space-x-9 {
        &>*:not(:first-child) {
            margin-left: 9px;
        }
    }

    .font_9 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 14px;
        color: #90909c;
    }

    .font_10 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #484856;
    }
}
</style>
