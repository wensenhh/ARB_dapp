<template>
    <div class="flex-col group_2 space-y-20">
        <img class="image_3"
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832804542595553861.png" />
        <div class="flex-col section_3 space-y-10">
            <div class="flex-col justify-start items-center text-wrapper_2">
                <span class="font_2 text_4">Lido Finace简介</span>
            </div>
            <div class="flex-col justify-start text-wrapper_3">
                <span class="font_3 text_5">
                    Lido Finace是一个适合所有DEFI创业者的孵化平台，任何人都可以非常便捷的在平台创建自己的Token、宣传、预售。同时使用Lido
                    Finace平台来管理验证，锁定创建的流动性以及提供更多的功能集合。你无需事先掌握代码知识，在Lido Finace平台上你可以完成DEFI世界95%的工作。欢迎使用Lido Finace平台。
                </span>
            </div>
        </div>
        <div class="flex-col section_4 space-y-20">
            <div class="flex-col space-y-12">
                <div class="flex-col justify-start items-center text-wrapper_2 view">
                    <span class="font_2 text_6">预售倒计时</span>
                </div>
                <div class="flex-col section_5 space-y-8">
                    <div class="flex-row justify-between items-end">
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.d1 }}</span></div>
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.d2 }}</span></div>
                        <img class="image_4"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798133876884453.png" />
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.h1 }}</span></div>
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.h2 }}</span></div>
                        <img class="image_4"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798133876884453.png" />
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.m1 }}</span></div>
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.m2 }}</span></div>
                        <img class="image_4"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798133876884453.png" />
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.s1 }}</span></div>
                        <div class="flex-col justify-start items-center text-wrapper_4"><span class="font_4">{{ countdown.s2 }}</span></div>
                    </div>
                    <div class="flex-row justify-between group_3">
                        <div class="flex-col justify-start items-center text-wrapper_5"><span class="font_1 text_7">天</span>
                        </div>
                        <div class="flex-col justify-start"><span class="font_1 text_8">小时</span></div>
                        <div class="flex-col justify-start"><span class="font_1">分钟</span></div>
                        <div class="flex-col justify-start items-center text-wrapper_5"><span class="font_1">秒</span></div>
                    </div>
                </div>
                <div class="flex-col section_6 space-y-12">
                    <span class="self-start font_5">价格</span>
                    <div class="flex-row items-center space-x-19">
                        <div class="flex-row items-center space-x-3">
                            <span class="font_6">5LTC</span>
                            <img class="shrink-0 image_6"
                                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798135893351048.png" />
                            <span class="font_6">50LTT</span>
                        </div>
                        <img class="image_2 image_5"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798134863998527.png" />
                        <span class="font_5">1张卡牌</span>
                    </div>
                </div>
            </div>
            <div class="flex-row justify-between">
                <span class="font_7">开始时间</span>
                <span class="font_3">2023.05.20 00:00</span>
            </div>
            <div class="flex-row justify-between">
                <span class="font_7">結束时间</span>
                <span class="font_3">2023.06.10 24:00</span>
            </div>
            <div class="flex-col justify-start items-center button"><span class="font_2 text_9">暂未开放</span></div>
        </div>
        <div class="flex-col section_7 space-y-12">
            <div class="flex-col justify-start items-center text-wrapper_2"><span class="font_2 text_10">NFT简介</span></div>
            <div class="flex-col justify-start items-start group_4">
                <div class="flex-row horiz-list space-x-12">
                    <div class="flex-col items-center shrink-0 relative horiz-list-item space-y-12">
                        <img class="shrink-0 image_7"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832804542912013163.png" />
                        <span class="font_3">#0001</span>
                        <span class="font_1 text_11">Name of card</span>
                    </div>
                    <div class="flex-col items-center shrink-0 relative horiz-list-item space-y-12">
                        <img class="shrink-0 image_7"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832804542946874357.png" />
                        <span class="font_3">#0002</span>
                        <span class="font_1 text_11">Name of card</span>
                    </div>
                    <div class="flex-col shrink-0 horiz-list-item_2 space-y-12">
                        <img class="shrink-0 self-start image_8"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832804542977582583.png" />
                        <span class="self-center font_3">#0003</span>
                        <span class="self-center font_1 text_12">Name of card</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-col section_8 space-y-12">
            <div class="flex-col justify-start items-center text-wrapper_2"><span class="font_2 text_10">代币市场</span></div>
            <div class="flex-row space-x-8">
                <div class="flex-col equal-division-item space-y-13">
                    <img class="self-start image_9"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798135065485793.png" />
                    <span class="self-start font_6">BTC/USD</span>
                    <span class="self-start font_8 text_13">＄26305.7</span>
                    <div class="flex-row justify-evenly items-center section_9">
                        <img class="image_10"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798137381823676.png" />
                        <span class="font_9">+0.21%</span>
                    </div>
                </div>
                <div class="flex-col equal-division-item space-y-13">
                    <img class="self-start image_9"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798135703655324.png" />
                    <span class="self-start font_6">ETH/USD</span>
                    <span class="self-start font_8 text_13">＄1758.4</span>
                    <div class="flex-row items-center section_10">
                        <img class="shrink-0 image_10"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798137381823676.png" />
                        <span class="font_9">+0.52%</span>
                    </div>
                </div>
                <div class="flex-col equal-division-item space-y-13">
                    <img class="self-start image_9"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798137431502156.png" />
                    <span class="self-start font_6">BNB/USD</span>
                    <span class="self-start font_8 text_13">＄303.21</span>
                    <div class="flex-row justify-evenly items-center section_11">
                        <img class="image_10"
                            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798138226786945.png" />
                        <span class="font_9 text_14">-0.10%</span>
                    </div>
                </div>
            </div>
            <div class="flex-col section_12">
                <span class="self-start font_6 text_15">Top 100 coins</span>
                <div class="flex-row section_13">
                    <div class="section_14"></div>
                    <img class="image_11"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798138721523403.png" />
                </div>
                <div class="flex-row justify-between group_5">
                    <span class="font_10 text_16">36 Fall</span>
                    <span class="font_10 text_17">64 Rise</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timeall = ref(0)
const countdown = ref({})
const inter = ref(null)

onMounted(()=>{
    let now = Date.now() + ''
    console.log(now.substring(0,now.length-3))
    timeall.value = 1684512000 - now.substring(0,now.length-3);
    Time()
})
//定时器没过1秒参数减1
const Time = () => {
    inter.value = setInterval(() => {
        timeall.value -= 1
        countDown(timeall.value)
    }, 1000)
}
//计算倒计时时间
const countDown = (value) => {
    let d = parseInt(value / (24 * 60 * 60));
    d = d < 10 ? "0" + d : d;
    let h = parseInt(value / (60 * 60) % 24);
    h = h < 10 ? "0" + h : h;
    let m = parseInt(value / 60 % 60);
    m = m < 10 ? "0" + m : m;
    let s = parseInt(value % 60);
    s = s < 10 ? "0" + s : s;
    console.log(d + "天" + h + "时" + m + "分" + s + "秒");
    // timeall.value = value
    countdown.value = {
        d1: d.charAt(0),
        d2: d.charAt(1),
        h1: h.charAt(0),
        h2: h.charAt(1),
        m1: String(m).charAt(0),
        m2: String(m).charAt(1),
        s1: String(s).charAt(0),
        s2: String(s).charAt(1)
    }
    // h + "時" + m + "分" + s + "秒"
}
</script>

<style lang='scss' scoped>
.group_2 {

    .image_3 {
        background-color: #f4f5f9;
        border-radius: 20px;
        overflow: hidden;
        width: 358px;
        height: 128px;
    }

    .section_3 {
        padding: 12px 12px 24px;
        background-image: linear-gradient(140.4deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;
        overflow: hidden;

        .text-wrapper_3 {
            padding: 16px 0 12px;
            border-radius: 20px;
            border-image-slice: 1;
            border: solid 1.5px #6b46fe;

            .text_5 {
                margin-left: 12px;
                margin-right: 8px;
                line-height: 24px;
            }
        }
    }

    .space-y-10 {
        &>*:not(:first-child) {
            margin-top: 10px;
        }
    }

    .section_4 {
        padding: 12px 6px 24px 12px;
        background-image: linear-gradient(132.6deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;
        overflow: hidden;

        .font_7 {
            font-size: 15px;
            font-family: MiSans;
            line-height: 14px;
            color: #484856;
        }

        .button {
            margin-right: 6px;
            padding: 16px 0;
            background-image: linear-gradient(98.2deg, #6b46fe 0%, #fe46eb 100%);
            border-radius: 24px;

            .text_9 {
                color: #ffffff;
            }
        }
    }

    .text-wrapper_2 {
        padding: 16px 0;
        height: 48px;
        border-bottom: solid 1px #f0f0f0;

        .text_4 {
            background-image: linear-gradient(96.4deg, #6b46fe 0%, #fe46eb 100%);
            -webkit-background-clip: text;
        }

        .text_6 {
            background-image: linear-gradient(94.2deg, #6b46fe 0%, #fe46eb 100%);
            -webkit-background-clip: text;
        }

        .text_10 {
            background-image: linear-gradient(93.3deg, #6b46fe 0%, #fe46eb 100%);
            -webkit-background-clip: text;
        }
    }

    .font_3 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #484856;
    }

    .font_2 {
        font-size: 17px;
        font-family: MiSans;
        color: transparent;
    }

    .section_7 {
        padding: 12px;
        background-image: linear-gradient(140deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;
        overflow: hidden;

        .group_4 {
            padding-bottom: 12px;
            overflow: hidden;

            .horiz-list {
                overflow-x: auto;

                .horiz-list-item {
                    padding-bottom: 12px;
                    background-image: linear-gradient(120.8deg, #f9f9f9 0%, #f8f8f8 100%);
                    border-radius: 12px;
                    box-shadow: 0px 8px 16px #a5a5a51a;
                    overflow: hidden;
                    width: 126px;
                    height: 228px;

                    .image_7 {
                        width: 126px;
                        height: 168px;
                    }

                    .text_11 {
                        line-height: 11px;
                    }
                }

                .horiz-list-item_2 {
                    padding-bottom: 12px;
                    background-image: linear-gradient(120.8deg, #f9f9f9 0%, #f8f8f8 100%);
                    border-radius: 12px 0 0 12px;
                    box-shadow: 0px 8px 16px #a5a5a51a;
                    overflow: hidden;
                    width: 109px;
                    height: 228px;

                    .image_8 {
                        width: 58px;
                        height: 168px;
                    }

                    .text_12 {
                        line-height: 11px;
                    }
                }
            }

            .space-x-12 {
                &>*:not(:first-child) {
                    margin-left: 12px;
                }
            }
        }
    }

    .space-y-12 {
        &>*:not(:first-child) {
            margin-top: 12px;
        }

        .view {
            margin-right: 6px;
        }

        .section_5 {
            margin-right: 6px;
            padding-bottom: 4px;
            background-image: linear-gradient(166.3deg, #f9f9f9 0%, #f8f8f8 100%);

            .text-wrapper_4 {
                padding: 26px 0 22px;
                background-color: #f0f0f0;
                border-radius: 12px;
                border-image-slice: 1;
                width: 28px;
                height: 64px;
                border: solid 1px #6b46fe;

                .font_4 {
                    font-size: 17px;
                    font-family: Impact;
                    line-height: 14px;
                    color: #484856;
                }
            }

            .image_4 {
                margin-bottom: 4px;
                width: 8px;
                height: 32px;
            }

            .group_3 {
                padding: 0 18px;

                .text-wrapper_5 {
                    width: 26px;

                    .text_7 {
                        line-height: 11px;
                    }
                }

                .text_8 {
                    line-height: 11.5px;
                }
            }
        }

        .space-y-8 {
            &>*:not(:first-child) {
                margin-top: 8px;
            }
        }

        .section_6 {
            margin-right: 6px;
            padding: 18px 12px 20px;
            background-color: #ff4b7b1a;
            border-radius: 12px;

            .font_5 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 14px;
                color: #28282f;
            }

            .space-x-19 {
                &>*:not(:first-child) {
                    margin-left: 19px;
                }

                .space-x-3 {
                    &>*:not(:first-child) {
                        margin-left: 3px;
                    }

                    .image_6 {
                        width: 20px;
                        height: 20px;
                    }
                }

                .image_2 {
                    margin: 2px 0 2px 12px;
                    width: 24px;
                    height: 24px;
                }

                .image_5 {
                    margin-top: 0;
                    margin-right: 0;
                    margin-bottom: 0;
                    margin-left: 0;
                }
            }
        }
    }

    .font_1 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 12px;
        color: #90909c;
    }

    .section_8 {
        padding: 12px 12px 24px;
        background-image: linear-gradient(137.4deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;
        overflow: hidden;

        .space-x-8 {
            &>*:not(:first-child) {
                margin-left: 8px;
            }

            .equal-division-item {
                flex: 1 1 106px;
                padding: 12px;
                background-color: #f0f0f0;
                border-radius: 20px;
                height: 146px;
                border: solid 1px #f0f0f0;

                .image_9 {
                    width: 32px;
                    height: 32px;
                }

                .font_8 {
                    font-size: 13px;
                    font-family: MiSans;
                    line-height: 12px;
                    color: transparent;
                }

                .text_13 {
                    margin-left: 4px;
                    background-image: linear-gradient(94.8deg, #6b46fe 0%, #fe46eb 100%);
                    -webkit-background-clip: text;
                }

                .section_9 {
                    padding: 4px 6px 4px 10px;
                    background-color: #22e3581a;
                    border-radius: 47px;
                    border: solid 1px #22e358;
                }

                .section_10 {
                    padding: 4px 4px 4px 9px;
                    background-color: #22e3581a;
                    border-radius: 47px;
                    border: solid 1px #22e358;
                }

                .image_10 {
                    width: 16px;
                    height: 16px;
                }

                .font_9 {
                    font-size: 13px;
                    font-family: MiSans;
                    line-height: 10.5px;
                    color: #22e358;
                }

                .section_11 {
                    padding: 4px 6px 4px 12px;
                    background-color: #ff4b7b1a;
                    border-radius: 47px;
                    border: solid 1px #ff4b7b;

                    .text_14 {
                        color: #ff4b7b;
                    }
                }
            }

            .space-y-13 {
                &>*:not(:first-child) {
                    margin-top: 13px;
                }
            }
        }

        .section_12 {
            padding: 18px 6px 0 12px;
            border-radius: 12px;
            border: solid 1px #f0f0f0;

            .text_15 {
                line-height: 16px;
            }

            .section_13 {
                margin-right: 4px;
                margin-top: 14px;
                border-radius: 8px;
                overflow: hidden;
                background-color: #22e358;
                height: 14px;

                .section_14 {
                    background-color: #ff4b7b;
                    width: 110px;
                    height: 16px;
                }

                .image_11 {
                    margin-left: -6px;
                    width: 11px;
                    height: 14px;
                }
            }

            .group_5 {
                padding: 8px 0 18px;

                .font_10 {
                    font-size: 17px;
                    font-family: MiSans;
                    line-height: 14px;
                }

                .text_16 {
                    color: #ff4b7b;
                    line-height: 13.5px;
                }

                .text_17 {
                    color: #22e358;
                }
            }
        }
    }

    .font_6 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #28282f;
    }
}

.space-y-20 {
    &>*:not(:first-child) {
        margin-top: 20px;
    }
}

.space-y-20 {
    &>*:not(:first-child) {
        margin-top: 20px;
    }
}
</style>
