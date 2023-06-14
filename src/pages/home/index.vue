<template>
  <div class="flex-col group_2 space-y-20">
    <div class="flex-col space-y-20">
      <div class="flex-col section_3">
        <!-- <img class="shrink-0 image_3"
          src="http://tupian-user.oss-cn-hongkong.aliyuncs.com/image/548b4f19-653b-4937-9d8c-5254cc94497e.image/jpeg" /> -->
        <van-swipe :autoplay="3000" lazy-render>
          <van-swipe-item v-for="image in swiperItems" :key="image">
            <img :src="image.img" />
          </van-swipe-item>
        </van-swipe>
        <van-notice-bar mode="link" scrollable left-icon="volume-o" background="#ffffff" color="#484856">{{
          noticeList[0]?.title }}</van-notice-bar>
      </div>
      <div class="flex-col justify-start section_5">
        <div class="grid">
          <div class="flex-col items-center grid-item space-y-4" @click="navgateto('/home/pool')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842181731285.png" />
            <span class="font_4">{{ $t('second.kuangc') }}</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4" @click="navgateto('/home/nft')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842283272835.png" />
            <span class="font_4">NFT</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4" @click="navgateto('/home/swap')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842334982784.png" />
            <span class="font_4">SWAP</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4"
            @click="hrefto('https://www.litebringer.com/home/#page-top')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842369296414.png" />
            <span class="font_4">GameFi</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4" @click="navgateto('/home/invite')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842407374754.png" />
            <span class="font_4">{{ $t('second.invide') }}</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4" @click="navgateto('/home/asset')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842432667816.png" />
            <span class="font_4">{{ $t('second.assets') }}</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4" @click="navgateto('/home/myteam')">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842453474680.png" />
            <span class="font_4">{{ $t('second.community') }}</span>
          </div>
          <div class="flex-col items-center grid-item space-y-4">
            <img class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16832793842460571009.png" />
            <span class="font_4">{{ $t('second.shopping') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row space-x-12">
      <div class="flex-col equal-division-item">
        <span class="self-start font_3">{{ $t('second.nowprice') }}</span>
        <div class="flex-row group_3 space-x-4">
          <span class="font_5">$</span>
          <span class="font_5">{{ mylttinfo.ltt }}</span>
        </div>
        <div class="flex-row justify-center items-center self-start section_6 space-x-6">
          <span class="font_3">{{ $t('second.deal') }}</span>
          <img class="image_6"
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798119236955448.png" />
        </div>
      </div>
      <div class="flex-col equal-division-item">
        <span class="self-start font_3">{{ $t('second.assets') }}</span>
        <div class="flex-row group_3 space-x-4">
          <span class="font_5">{{ UserMoney.pledge }}</span>
          <span class="font_5">LTC</span>
        </div>
        <div class="flex-row justify-center items-center self-start section_6 space-x-6">
          <span class="font_3">{{ $t('index.extract') }}</span>
          <img class="image_6"
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798119886576665.png" />
        </div>
      </div>
    </div>
    <div class="flex-col space-y-20">
      <div class="flex-col section_7">
        <div class="flex-row items-center">
          <img class="image_2 image_7"
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798120129376005.png" />
          <span class="font_7 text_6">LTT</span>
          <span class="font_6 text_5">$ {{ mylttinfo.ltt }}</span>
          <span class="font_2 text_7">+0.02%</span>
        </div>
        <div id="myEchart" style="width: 100%;height: 300px;"></div>

      </div>
      <!-- 交易K綫 -->
      <div class="flex-col section_12 space-y-30">
        <div class="flex-col">
          <div class="flex-row justify-between items-center group_11">
            <span class="font_6 text_8">{{ $t('index.zhiyaqu') }}</span>
            <div class="flex-row items-center space-x-2" @click="navgateto('/home/poolinfo')">
              <span class="font_8">{{ $t('second.poolinfo') }}</span>
              <img class="shrink-0 image_6"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798123311761657.png" />
            </div>
          </div>
          <div class="flex-row items-center group_12 space-x-14">
            <div class="flex-col justify-start items-start relative group_13">
              <img class="image_8"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798121047326382.png" />
              <img class="image_8 pos_9"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798121368023120.png" />
            </div>
            <span class="font_5 text_9">USDT - LTC</span>
          </div>
        </div>
        <div class="flex-col">
          <div class="flex-row justify-between">
            <span class="font_8">{{ $t('second.tchemical') }}</span>
            <span class="font_9">0.5%-0.7%</span>
          </div>
          <div class="flex-row justify-between items-baseline group_14">
            <span class="font_8">{{ $t('second.ychemical') }}</span>
            <span class="font_9 text_10">5%</span>
          </div>
          <div class="flex-row justify-between group_15">
            <span class="font_8 text_11">{{ $t('second.pledgetime') }}</span>
            <span class="font_9 text_12">{{ pledgeDayid }}{{ $t('index.day') }}</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_3">
            <van-field v-model="pledgenum" type="number" autofocus center :placeholder="$t('index.pledgeusdtnum')" />
          </div>
          <div class="flex-row items-baseline group_16 space-x-2">
            <span class="font_2 text_13">{{ $t('second.kypledgenum') }}：</span>
            <span class="font_2">{{ usdtbalance }} USDT</span>
          </div>
          <div class="flex-row group_17 space-x-12">
            <div
              :class="['flex-col', 'justify-start', 'items-center', item.actived ? 'text-wrapper_4' : 'text-wrapper_5', i == pledgeDay.length - 1 ? 'view_3' : '']"
              @click="changeTime(i)" v-for="(item, i) in pledgeDay"><span
                :class="[item.actived ? 'font_2 text_14' : 'font_1 text_15']">{{ item.name }}{{ $t('index.day') }}</span></div>
          </div>
          <div class="flex-col justify-start items-center button" v-if="!approveFlagUSDT" @click="getApprovecoin(1)"><span
              class="font_10 text_16">{{ $t('index.Authorization') }}</span></div>
          <div class="flex-col justify-start items-center button" v-else @click="pledgefun"><span
              class="font_10 text_16">{{ $t('index.pledge') }}</span></div>
        </div>
      </div>
      <div class="flex-col section_13 space-y-16">
        <div class="flex-col justify-start items-center text-wrapper_6">
          <span class="font_10 text_17">Lido Finace{{ $t('second.synopsis') }}</span>
        </div>
        <img class="shrink-0 image_9"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798113733666444.png" />
      </div>
      <div class="flex-col section_13 space-y-16">
        <div class="flex-col justify-start items-center text-wrapper_6">
          <span class="font_10 text_18">{{ $t('second.partner') }}</span>
        </div>
        <img class="shrink-0 image_9"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798113788969278.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { connetWallet, sign, allowance, balance, createCCContract, createRechargeContract, toAmount, ApproveCoin } from '../../connectWallet/index'
import { showToast, showConfirmDialog, showFailToast, showLoadingToast } from 'vant';
import { useAddrStore } from '../../store/user'
import { storeToRefs } from "pinia"
import filters from '../../../utils/filters';
import { Login, getLttline, getContent, getSwiper, checkAddress, pledgeapi, getUserassets, lttbalance } from '../../api/app.js'
import { ethers } from "ethers";
// 将npm方式下载的echarts插件引入进来
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

let myEcharts = null;
const store = useAddrStore();
const router = useRouter();
const route = useRoute();
const pledgenum = ref(null)
const pledgeDay = ref([{
  name: 7,
  actived: false
}, {
  name: 30,
  actived: false
}, {
  name: 90,
  actived: false
}, {
  name: 180,
  actived: false
}, {
  name: 360,
  actived: true
}])
const pledgeDayid = ref(null)
let { address } = storeToRefs(store)
const approveFlagUSDT = ref(false)
const usdtbalance = ref(0)
const linedata = ref({})
const noticeList = ref([])
const swiperItems = ref([])
const UserMoney = ref({})
const mylttinfo = ref({})

onMounted(async () => {
  pledgeDayid.value = pledgeDay.value[4].name // 初始化值
  const res = await connetWallet()
  console.log(res)
  await drawinit()
  if (!res || res == '') {
    showToast(t('index.wallteerror'))
  } else {
    address.value = res
    if (route.query.inviteCode) {
      await store.changeParent(route.query.inviteCode)
    }
    await callRegister()
  }
})

// 卸载时销毁图表
onUnmounted(() => {
  // 销毁图表
  myEcharts.dispose;
});

const callRegister = async () => {
  let MyContract = await createCCContract();
  checkAddress({
    address: address.value
  }).then(async res => {
    console.log('是否注册=', res.obj)
    showLoadingToast('登陆中~')
    if (!res.obj) {
      const bnbnum = await toAmount('0.001')
      MyContract.register({
        value: bnbnum,
        gasLimit: 210000
      }).then(res => {
        console.log('注册成功=', res)
        // uni.hideLoading()
        // 调取后台注册接口
        getUserLogin()
      }).catch(err => {
        // uni.hideLoading()
        showFailToast({
          message: 'Gas费不足~',
          overlay: true,
          forbidClick: true,
          duration: 0
        })
        console.log('注册失败=', err)
      })
    } else {
      // 调取后台注册接口
      getUserLogin()
    }
  })
}

const getUserLogin = async () => {
  await store.loginaddr(address.value, () => {
    myallowance()
    getbalance()
    getLttlinedata()
    getallConttent()
    getallSwiper()
    getUserMoney()
    getlttusingp()
  })
}

const getallSwiper = () => {
  getSwiper().then(({ obj }) => {
    let newarr = []
    obj.forEach(item => {
      newarr.push({
        img: item.path
      })
    })
    swiperItems.value = newarr
  })
}

const getallConttent = () => {
  getContent().then(({ obj }) => {
    noticeList.value = obj.list
  })
}

const getLttlinedata = async () => {
  getLttline().then(({ obj }) => {
    let open = []
    let date = []
    obj.forEach(item => {
      open.push(item.open)
      date.push(item.timeStmp)
    })
    linedata.value = {
      open: open,
      date: date
    }
    drawKline()
  })
}

const drawKline = () => {
  let option = {
    xAxis: {
      data: linedata.value.date.slice(-10),
    },
    series: [{
      data: linedata.value.open.slice(-10)
    }]
  }
  // 这里不要忘记把option设置给echarts实例
  myEcharts.setOption(option);
}

const getApprovecoin = async (type) => {
  showLoadingToast('授權中~')
    ApproveCoin(type, res => {
        console.log(res)
        if (res?.hash) {
          myallowance()
        }
    })
}

// 绘制(配置项)
const drawinit = () => {
  myEcharts = echarts.init(document.getElementById("myEchart"));
  myEcharts.setOption({
    grid: [{
      top: '8%',
      left: 20,
      right: 10,
      height: '82%',
    }
    ],
    xAxis: {
      type: 'category',
      data: [],
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(144,144,156, 0.1)'
        }
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(144,144,156, 0.1)'
        }
      },
    },
    animation: true, //是否开启动画。
    series: [{
      data: [],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00D383'
      }
    }]
  })
  // 加载上一页数据
  myEcharts.on('datazoom', function (params) {
    let num = params.batch[0]['start'];
    if (num == 0) {
      console.log('到最左边了')
    }
  })
  window.addEventListener('resize', () => {
    myEcharts.resize()
  })
}

const getbalance = async () => {
  let mybalance = await balance()
  usdtbalance.value = mybalance
  console.log('USDT余额=' + mybalance)
}

const myallowance = async () => {
  let usdtallowance = await allowance(1)
  approveFlagUSDT.value = usdtallowance
  console.log('USDT是否授权=' + usdtallowance)
}

const getlttusingp = async () => {
  lttbalance().then(({ obj }) => {
    mylttinfo.value = obj
  })
}

// 质押lido
const pledgefun = () => {
  console.log(t('index.pledge'))
  if (!filters.verifyparam(pledgenum.value, 'number')) {
    return showToast(t('index.pledgenumjy'))
  }
  if (Number(pledgenum.value) > usdtbalance.value) {
    return showToast(t('index.balanceno'))
  }
  // that.$tools.loading(that.$t('index.pledgeing'))
  showLoadingToast(t('index.pledgeing'))
  // 先調取后台接口
  pledgeapi({
    price: pledgenum.value,
    time: pledgeDayid.value
  }).then(async res => {
    //获取到后台返回的订单号后请求合约
    const orderid = ethers.utils.toUtf8Bytes(res.obj)
    try {
      let MyContract = await createRechargeContract();// Lido质押合约交互
      let mypledgenum = await toAmount(pledgenum.value.toString())
      console.log(orderid, mypledgenum)
      //转账数量  质押合约调用
      MyContract.swapUSDTforLTC(orderid, mypledgenum, {
        gasLimit: 210000
      }).then(res => {
        console.log("質押成功==", res);
        showToast('質押成功~')
        getbalance()
        getUserMoney()
        // uni.hideLoading()
      }).catch(err => {
        console.log('質押失敗~', err)
        console.log('質押失敗=', err.message)
        showFailToast('質押失敗~', err.message)
        // uni.hideLoading()
      })
    } catch (error) {
      // this.allowanceBalance = 0;
      console.error("trigger smart contract error", error)
      // uni.hideLoading()
    }
  })

}

const getUserMoney = () => {
  getUserassets().then(({ obj }) => {
    UserMoney.value = {
      linglu: obj[0].list[1].using,
      pledge: obj[1].list[0].using,
      klLTC: obj[0].list[0].give,
      ifkl: obj[0].status
    }
  })
}

const changeTime = (i) => {
  let arr = pledgeDay.value
  arr.forEach((item, index) => {
    index === i ? item.actived = true : item.actived = false
  })
  pledgeDayid.value = arr[i].name //初始化数据时需设置该值
  pledgeDay.value = arr
}

const navgateto = (url, param) => {
  router.push({
    path: url,
    query: param
  });
}
const hrefto = (url) => {
  window.location.href = url
}
</script>

<style lang='scss' scoped>
.space-y-20 {
  &>*:not(:first-child) {
    margin-top: 20px;
  }

  .section_3 {
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;

    .image_3 {
      width: 358px;
      height: 128px;
    }

    .section_4 {
      padding: 8px 12px;
      background-image: linear-gradient(174.1deg, #f9f9f9 0%, #f8f8f8 100%);

      .image_4 {
        border-radius: 2px;
        width: 24px;
        height: 24px;
      }
    }
  }

  .section_5 {
    padding-bottom: 10px;
    background-image: linear-gradient(155.5deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .grid {
      padding-top: 4px;
      height: 165px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 19px;

      .grid-item {
        padding: 6px 0;

        .image_5 {
          border-radius: 24px;
          width: 50px;
          height: 50px;
        }

        .font_4 {
          font-size: 15px;
          font-family: MiSans;
          line-height: 12px;
          color: #484856;
        }
      }

      .space-y-4 {
        &>*:not(:first-child) {
          margin-top: 4px;
        }
      }
    }
  }

  .section_7 {
    padding: 16px 11px 0 16px;
    background-image: linear-gradient(142.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .image_2 {
      margin: 2px 0 2px 12px;
      width: 24px;
      height: 24px;
    }

    .image_7 {
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    .text_6 {
      margin-left: 12px;
      background-image: linear-gradient(91.7deg, #6b46fe 0%, #fe46eb 100%);
      -webkit-background-clip: text;
    }

    .text_5 {
      margin-left: 18px;
    }

    .text_7 {
      margin-left: 12px;
      color: #22e358;
    }

    .group_4 {
      margin-top: 28px;

      .space-x-8 {
        &>*:not(:first-child) {
          margin-left: 8px;
        }

        .space-y-26 {
          &>*:not(:first-child) {
            margin-top: 26px;
          }
        }

        .group_5 {
          padding: 4px 0;

          .group_6 {
            padding: 8px 0;

            .view_2 {
              margin-top: 35px;
            }

            .section_9 {
              padding: 16px 24px 8px;
              background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798119964055855.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 250px;

              .space-x-19 {
                &>*:not(:first-child) {
                  margin-left: 19px;
                }

                .view {
                  margin-left: 83px;
                }
              }

              .space-x-20 {
                &>*:not(:first-child) {
                  margin-left: 20px;
                }
              }

              .section_10 {
                background-color: #22e358;
                border-radius: 50%;
                width: 8px;
                height: 8px;
              }
            }

            .space-y-11 {
              &>*:not(:first-child) {
                margin-top: 11px;
              }
            }

            .pos_4 {
              position: absolute;
              right: 22px;
              top: 0;
            }
          }

          .section_8 {
            background-color: #22e358;
            border-radius: 50%;
            height: 8px;
          }

          .pos_5 {
            position: absolute;
            left: 31px;
            right: 267px;
            top: 51px;
          }

          .pos {
            position: absolute;
            left: 225px;
            right: 73px;
            top: 0;
          }

          .pos_2 {
            position: absolute;
            left: 252px;
            right: 46px;
            top: 0;
          }

          .pos_3 {
            position: absolute;
            left: 279px;
            right: 19px;
            top: 0;
          }
        }
      }
    }

    .group_7 {
      margin-top: 26px;
    }

    .space-x-10 {
      &>*:not(:first-child) {
        margin-left: 10px;
      }
    }

    .divider {
      background-image: repeating-linear-gradient(90deg, #f0f0f0, #f0f0f0 0.65%, transparent 0.65%, transparent 1.304%);
      background-position: -1px 0px;
      height: 1px;
    }

    .group_8 {
      padding: 26px 0 16px 4px;

      .divider_2 {
        margin-left: 12px;
        background-color: #90909c;
        height: 1px;
      }

      .section_11 {
        background-color: #90909c;
        width: 1px;
        height: 4px;
      }

      .pos_6 {
        position: absolute;
        left: 19.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_7 {
        position: absolute;
        left: 121.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_8 {
        position: absolute;
        right: 102px;
        top: 50%;
        transform: translateY(-50%);
      }

      .group_9 {
        padding: 0 18px;

        .group_10 {
          margin-right: 8px;
        }
      }
    }

    .space-y-10 {
      &>*:not(:first-child) {
        margin-top: 10px;
      }
    }
  }

  .section_12 {
    padding: 12px 8px 24px 12px;
    background-image: linear-gradient(131.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .group_11 {
      margin-right: 4px;
      padding: 14px 0;
      border-bottom: solid 1px #f0f0f0;

      .text_8 {
        line-height: 15.5px;
      }
    }

    .group_12 {
      padding-top: 8px;

      .group_13 {
        width: 56px;

        .image_8 {
          width: 32px;
          height: 32px;
        }

        .pos_9 {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .text_9 {
        color: #000000;
      }
    }

    .space-x-14 {
      &>*:not(:first-child) {
        margin-left: 14px;
      }
    }

    .font_8 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 14px;
      color: #90909c;
    }

    .font_9 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 12px;
      color: #28282f;
    }

    .group_14 {
      margin-top: 18px;

      .text_10 {
        margin-right: 4px;
      }
    }

    .group_15 {
      margin-top: 18px;

      .text_11 {
        line-height: 13.5px;
      }

      .text_12 {
        margin-right: 4px;
        line-height: 13px;
      }
    }

    .text-wrapper_3 {
      margin-right: 4px;
      margin-top: 20px;
      // padding: 16px 0;
      background-color: #f5f5f5;
      border-radius: 24px;
      overflow: hidden;
    }

    .group_16 {
      margin-top: 12px;

      .text_13 {
        line-height: 12px;
      }
    }

    .space-x-2 {
      &>*:not(:first-child) {
        margin-left: 2px;
      }
    }

    .group_17 {
      margin-top: 20px;

      .text-wrapper_4 {
        padding: 4px 0 4px;
        flex: 1 1 57px;
        border-radius: 16px;
        border-image-slice: 1;
        height: 24px;
        border: solid 1px #6b46fe;

        .text_14 {
          line-height: 11px;
          background-image: linear-gradient(91.2deg, #6b46fe 0%, #fe46eb 100%);
          -webkit-background-clip: text;
        }
      }

      .text-wrapper_5 {
        flex: 1 1 57px;
        padding: 4px 0 4px;
        border-radius: 16px;
        height: 24px;
        border: solid 1px #f0f0f0;

        .font_1 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 10px;
          color: #484856;
        }

        .text_15 {
          line-height: 11px;
        }
      }

      .view_3 {
        margin-right: 4px;
      }
    }

    .button {
      margin-right: 4px;
      margin-top: 20px;
      padding: 16px 0;
      background-image: linear-gradient(98.2deg, #6b46fe 0%, #fe46eb 100%);
      border-radius: 24px;

      .text_16 {
        color: #ffffff;
        line-height: 15.5px;
      }
    }
  }

  .space-y-30 {
    &>*:not(:first-child) {
      margin-top: 30px;
    }
  }

  .font_6 {
    font-size: 17px;
    font-family: MiSans;
    line-height: 16px;
    color: #28282f;
  }

  .font_2 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: #90909c;
  }

  .font_7 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: transparent;
  }

  .section_13 {
    padding: 12px 12px 24px;
    background-image: linear-gradient(146.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .text-wrapper_6 {
      padding: 16px 0;
      height: 48px;
      border-bottom: solid 1px #f0f0f0;

      .text_17 {
        background-image: linear-gradient(96.4deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }

      .text_18 {
        background-image: linear-gradient(93.3deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }
    }

    .image_9 {
      width: 334px;
      height: 160px;
    }
  }

  .space-y-16 {
    &>*:not(:first-child) {
      margin-top: 16px;
    }
  }

  .font_10 {
    font-size: 17px;
    font-family: MiSans;
    // line-height: 16px;
    color: transparent;
  }
}

.space-y-20 {
  &>*:not(:first-child) {
    margin-top: 20px;
  }

  .section_3 {
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;

    .image_3 {
      width: 358px;
      height: 128px;
    }

    .section_4 {
      padding: 8px 12px;
      background-image: linear-gradient(174.1deg, #f9f9f9 0%, #f8f8f8 100%);

      .image_4 {
        border-radius: 2px;
        width: 24px;
        height: 24px;
      }
    }
  }

  .section_5 {
    padding-bottom: 10px;
    background-image: linear-gradient(155.5deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .grid {
      padding-top: 4px;
      height: 165px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 19px;

      .grid-item {
        padding: 6px 0;

        .image_5 {
          border-radius: 24px;
          width: 50px;
          height: 50px;
        }

        .font_4 {
          font-size: 15px;
          font-family: MiSans;
          line-height: 12px;
          color: #484856;
        }
      }

      .space-y-4 {
        &>*:not(:first-child) {
          margin-top: 4px;
        }
      }
    }
  }

  .section_7 {
    padding: 16px 11px 0 16px;
    background-image: linear-gradient(142.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .image_2 {
      margin: 2px 0 2px 12px;
      width: 24px;
      height: 24px;
    }

    .image_7 {
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    .text_6 {
      margin-left: 12px;
      background-image: linear-gradient(91.7deg, #6b46fe 0%, #fe46eb 100%);
      -webkit-background-clip: text;
    }

    .text_5 {
      margin-left: 18px;
    }

    .text_7 {
      margin-left: 12px;
      color: #22e358;
    }

    .group_4 {
      margin-top: 28px;

      .space-x-8 {
        &>*:not(:first-child) {
          margin-left: 8px;
        }

        .space-y-26 {
          &>*:not(:first-child) {
            margin-top: 26px;
          }
        }

        .group_5 {
          padding: 4px 0;

          .group_6 {
            padding: 8px 0;

            .view_2 {
              margin-top: 35px;
            }

            .section_9 {
              padding: 16px 24px 8px;
              background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798119964055855.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 250px;

              .space-x-19 {
                &>*:not(:first-child) {
                  margin-left: 19px;
                }

                .view {
                  margin-left: 83px;
                }
              }

              .space-x-20 {
                &>*:not(:first-child) {
                  margin-left: 20px;
                }
              }

              .section_10 {
                background-color: #22e358;
                border-radius: 50%;
                width: 8px;
                height: 8px;
              }
            }

            .space-y-11 {
              &>*:not(:first-child) {
                margin-top: 11px;
              }
            }

            .pos_4 {
              position: absolute;
              right: 22px;
              top: 0;
            }
          }

          .section_8 {
            background-color: #22e358;
            border-radius: 50%;
            height: 8px;
          }

          .pos_5 {
            position: absolute;
            left: 31px;
            right: 267px;
            top: 51px;
          }

          .pos {
            position: absolute;
            left: 225px;
            right: 73px;
            top: 0;
          }

          .pos_2 {
            position: absolute;
            left: 252px;
            right: 46px;
            top: 0;
          }

          .pos_3 {
            position: absolute;
            left: 279px;
            right: 19px;
            top: 0;
          }
        }
      }
    }

    .group_7 {
      margin-top: 26px;
    }

    .space-x-10 {
      &>*:not(:first-child) {
        margin-left: 10px;
      }
    }

    .divider {
      background-image: repeating-linear-gradient(90deg, #f0f0f0, #f0f0f0 0.65%, transparent 0.65%, transparent 1.304%);
      background-position: -1px 0px;
      height: 1px;
    }

    .group_8 {
      padding: 26px 0 16px 4px;

      .divider_2 {
        margin-left: 12px;
        background-color: #90909c;
        height: 1px;
      }

      .section_11 {
        background-color: #90909c;
        width: 1px;
        height: 4px;
      }

      .pos_6 {
        position: absolute;
        left: 19.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_7 {
        position: absolute;
        left: 121.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_8 {
        position: absolute;
        right: 102px;
        top: 50%;
        transform: translateY(-50%);
      }

      .group_9 {
        padding: 0 18px;

        .group_10 {
          margin-right: 8px;
        }
      }
    }

    .space-y-10 {
      &>*:not(:first-child) {
        margin-top: 10px;
      }
    }
  }

  .section_12 {
    padding: 12px 8px 24px 12px;
    background-image: linear-gradient(131.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .group_11 {
      margin-right: 4px;
      padding: 14px 0;
      border-bottom: solid 1px #f0f0f0;

      .text_8 {
        line-height: 15.5px;
      }
    }

    .group_12 {
      padding-top: 8px;

      .group_13 {
        width: 56px;

        .image_8 {
          width: 32px;
          height: 32px;
        }

        .pos_9 {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .text_9 {
        color: #000000;
      }
    }

    .space-x-14 {
      &>*:not(:first-child) {
        margin-left: 14px;
      }
    }

    .font_8 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 14px;
      color: #90909c;
    }

    .font_9 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 12px;
      color: #28282f;
    }

    .group_14 {
      margin-top: 18px;

      .text_10 {
        margin-right: 4px;
      }
    }

    .group_15 {
      margin-top: 18px;

      .text_11 {
        line-height: 13.5px;
      }

      .text_12 {
        margin-right: 4px;
        line-height: 13px;
      }
    }

    .text-wrapper_3 {
      margin-right: 4px;
      margin-top: 20px;
      // padding: 16px 0;
      background-color: #f5f5f5;
      border-radius: 24px;
      overflow: hidden;
    }

    .group_16 {
      margin-top: 12px;

      .text_13 {
        line-height: 12px;
      }
    }

    .space-x-2 {
      &>*:not(:first-child) {
        margin-left: 2px;
      }
    }

    .group_17 {
      margin-top: 20px;

      .text-wrapper_4 {
        padding: 8px 0 4px;
        flex: 1 1 57px;
        border-radius: 16px;
        border-image-slice: 1;
        height: 24px;
        border: solid 1px #6b46fe;

        .text_14 {
          line-height: 11px;
          background-image: linear-gradient(91.2deg, #6b46fe 0%, #fe46eb 100%);
          -webkit-background-clip: text;
        }
      }

      .text-wrapper_5 {
        flex: 1 1 57px;
        padding: 4px 0 4px;
        border-radius: 16px;
        height: 24px;
        border: solid 1px #f0f0f0;

        .font_1 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 10px;
          color: #484856;
        }

        .text_15 {
          line-height: 11px;
        }
      }

      .view_3 {
        margin-right: 4px;
      }
    }

    .button {
      margin-right: 4px;
      margin-top: 20px;
      padding: 16px 0;
      background-image: linear-gradient(98.2deg, #6b46fe 0%, #fe46eb 100%);
      border-radius: 24px;

      .text_16 {
        color: #ffffff;
        line-height: 15.5px;
      }
    }
  }

  .space-y-30 {
    &>*:not(:first-child) {
      margin-top: 30px;
    }
  }

  .font_6 {
    font-size: 17px;
    font-family: MiSans;
    line-height: 16px;
    color: #28282f;
  }

  .font_2 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: #90909c;
  }

  .font_7 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: transparent;
  }

  .section_13 {
    padding: 12px 12px 24px;
    background-image: linear-gradient(146.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .text-wrapper_6 {
      padding: 16px 0;
      height: 48px;
      border-bottom: solid 1px #f0f0f0;

      .text_17 {
        background-image: linear-gradient(96.4deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }

      .text_18 {
        background-image: linear-gradient(93.3deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }
    }

    .image_9 {
      width: 334px;
      height: 160px;
    }
  }

  .space-y-16 {
    &>*:not(:first-child) {
      margin-top: 16px;
    }
  }

  .font_10 {
    font-size: 17px;
    font-family: MiSans;
    // line-height: 16px;
    color: transparent;
  }
}

.space-x-12 {
  &>*:not(:first-child) {
    margin-left: 12px;
  }

  .text-wrapper_2 {
    padding: 6px 0;
    background-color: #ff4b7b;
    border-radius: 4px;
    width: 36px;
    height: 20px;

    .text_3 {
      color: #ffffff;
      font-size: 13px;
      font-family: YouSheBiaoTiHei;
      line-height: 9.5px;
    }
  }

  .font_3 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 12px;
    color: #484856;
  }

  .text_4 {
    color: #b0b0b0;
  }

  .equal-division-item {
    flex: 1 1 173px;
    padding: 16px 16px 12px;
    background-image: linear-gradient(149.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 12px;
    height: 112px;

    .group_3 {
      margin-top: 12px;
    }

    .section_6 {
      margin-top: 18px;
      padding: 4px 10px;
      background-color: #f5f5f5;
      border-radius: 14px;
      width: 72px;
    }
  }
}

.space-y-20 {
  &>*:not(:first-child) {
    margin-top: 20px;
  }

  .section_3 {
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;

    .image_3 {
      width: 358px;
      height: 128px;
    }

    .section_4 {
      padding: 8px 12px;
      background-image: linear-gradient(174.1deg, #f9f9f9 0%, #f8f8f8 100%);

      .image_4 {
        border-radius: 2px;
        width: 24px;
        height: 24px;
      }
    }
  }

  .section_5 {
    padding-bottom: 10px;
    background-image: linear-gradient(155.5deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .grid {
      padding-top: 4px;
      height: 165px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 19px;

      .grid-item {
        padding: 6px 0;

        .image_5 {
          border-radius: 24px;
          width: 50px;
          height: 50px;
        }

        .font_4 {
          font-size: 15px;
          font-family: MiSans;
          line-height: 12px;
          color: #484856;
        }
      }

      .space-y-4 {
        &>*:not(:first-child) {
          margin-top: 4px;
        }
      }
    }
  }

  .section_7 {
    padding: 16px 11px 0 16px;
    background-image: linear-gradient(142.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .image_2 {
      margin: 2px 0 2px 12px;
      width: 24px;
      height: 24px;
    }

    .image_7 {
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    .text_6 {
      margin-left: 12px;
      background-image: linear-gradient(91.7deg, #6b46fe 0%, #fe46eb 100%);
      -webkit-background-clip: text;
    }

    .text_5 {
      margin-left: 18px;
    }

    .text_7 {
      margin-left: 12px;
      color: #22e358;
    }

    .group_4 {
      margin-top: 28px;

      .space-x-8 {
        &>*:not(:first-child) {
          margin-left: 8px;
        }

        .space-y-26 {
          &>*:not(:first-child) {
            margin-top: 26px;
          }
        }

        .group_5 {
          padding: 4px 0;

          .group_6 {
            padding: 8px 0;

            .view_2 {
              margin-top: 35px;
            }

            .section_9 {
              padding: 16px 24px 8px;
              background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798119964055855.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 250px;

              .space-x-19 {
                &>*:not(:first-child) {
                  margin-left: 19px;
                }

                .view {
                  margin-left: 83px;
                }
              }

              .space-x-20 {
                &>*:not(:first-child) {
                  margin-left: 20px;
                }
              }

              .section_10 {
                background-color: #22e358;
                border-radius: 50%;
                width: 8px;
                height: 8px;
              }
            }

            .space-y-11 {
              &>*:not(:first-child) {
                margin-top: 11px;
              }
            }

            .pos_4 {
              position: absolute;
              right: 22px;
              top: 0;
            }
          }

          .section_8 {
            background-color: #22e358;
            border-radius: 50%;
            height: 8px;
          }

          .pos_5 {
            position: absolute;
            left: 31px;
            right: 267px;
            top: 51px;
          }

          .pos {
            position: absolute;
            left: 225px;
            right: 73px;
            top: 0;
          }

          .pos_2 {
            position: absolute;
            left: 252px;
            right: 46px;
            top: 0;
          }

          .pos_3 {
            position: absolute;
            left: 279px;
            right: 19px;
            top: 0;
          }
        }
      }
    }

    .group_7 {
      margin-top: 26px;
    }

    .space-x-10 {
      &>*:not(:first-child) {
        margin-left: 10px;
      }
    }

    .divider {
      background-image: repeating-linear-gradient(90deg, #f0f0f0, #f0f0f0 0.65%, transparent 0.65%, transparent 1.304%);
      background-position: -1px 0px;
      height: 1px;
    }

    .group_8 {
      padding: 26px 0 16px 4px;

      .divider_2 {
        margin-left: 12px;
        background-color: #90909c;
        height: 1px;
      }

      .section_11 {
        background-color: #90909c;
        width: 1px;
        height: 4px;
      }

      .pos_6 {
        position: absolute;
        left: 19.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_7 {
        position: absolute;
        left: 121.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_8 {
        position: absolute;
        right: 102px;
        top: 50%;
        transform: translateY(-50%);
      }

      .group_9 {
        padding: 0 18px;

        .group_10 {
          margin-right: 8px;
        }
      }
    }

    .space-y-10 {
      &>*:not(:first-child) {
        margin-top: 10px;
      }
    }
  }

  .section_12 {
    padding: 12px 8px 24px 12px;
    background-image: linear-gradient(131.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .group_11 {
      margin-right: 4px;
      padding: 14px 0;
      border-bottom: solid 1px #f0f0f0;

      .text_8 {
        line-height: 15.5px;
      }
    }

    .group_12 {
      padding-top: 8px;

      .group_13 {
        width: 56px;

        .image_8 {
          width: 32px;
          height: 32px;
        }

        .pos_9 {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .text_9 {
        color: #000000;
      }
    }

    .space-x-14 {
      &>*:not(:first-child) {
        margin-left: 14px;
      }
    }

    .font_8 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 14px;
      color: #90909c;
    }

    .font_9 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 12px;
      color: #28282f;
    }

    .group_14 {
      margin-top: 18px;

      .text_10 {
        margin-right: 4px;
      }
    }

    .group_15 {
      margin-top: 18px;

      .text_11 {
        line-height: 13.5px;
      }

      .text_12 {
        margin-right: 4px;
        line-height: 13px;
      }
    }

    .text-wrapper_3 {
      margin-right: 4px;
      margin-top: 20px;
      // padding: 16px 0;
      background-color: #f5f5f5;
      border-radius: 24px;
      overflow: hidden;
    }

    .group_16 {
      margin-top: 12px;

      .text_13 {
        line-height: 12px;
      }
    }

    .space-x-2 {
      &>*:not(:first-child) {
        margin-left: 2px;
      }
    }

    .group_17 {
      margin-top: 20px;

      .text-wrapper_4 {
        padding: 4px 0 4px;
        flex: 1 1 57px;
        border-radius: 16px;
        border-image-slice: 1;
        height: 24px;
        border: solid 1px #6b46fe;

        .text_14 {
          line-height: 11px;
          background-image: linear-gradient(91.2deg, #6b46fe 0%, #fe46eb 100%);
          -webkit-background-clip: text;
        }
      }

      .text-wrapper_5 {
        flex: 1 1 57px;
        padding: 8px 0 4px;
        border-radius: 16px;
        height: 24px;
        border: solid 1px #f0f0f0;

        .font_1 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 10px;
          color: #484856;
        }

        .text_15 {
          line-height: 11px;
        }
      }

      .view_3 {
        margin-right: 4px;
      }
    }

    .button {
      margin-right: 4px;
      margin-top: 20px;
      padding: 16px 0;
      background-image: linear-gradient(98.2deg, #6b46fe 0%, #fe46eb 100%);
      border-radius: 24px;

      .text_16 {
        color: #ffffff;
        line-height: 15.5px;
      }
    }
  }

  .space-y-30 {
    &>*:not(:first-child) {
      margin-top: 30px;
    }
  }

  .font_6 {
    font-size: 17px;
    font-family: MiSans;
    line-height: 16px;
    color: #28282f;
  }

  .font_2 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: #90909c;
  }

  .font_7 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: transparent;
  }

  .section_13 {
    padding: 12px 12px 24px;
    background-image: linear-gradient(146.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .text-wrapper_6 {
      padding: 16px 0;
      height: 48px;
      border-bottom: solid 1px #f0f0f0;

      .text_17 {
        background-image: linear-gradient(96.4deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }

      .text_18 {
        background-image: linear-gradient(93.3deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }
    }

    .image_9 {
      width: 334px;
      height: 160px;
    }
  }

  .space-y-16 {
    &>*:not(:first-child) {
      margin-top: 16px;
    }
  }

  .font_10 {
    font-size: 17px;
    font-family: MiSans;
    // line-height: 16px;
    color: transparent;
  }
}

.space-y-20 {
  &>*:not(:first-child) {
    margin-top: 20px;
  }

  .section_3 {
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;

    .image_3 {
      width: 358px;
      height: 128px;
    }

    .section_4 {
      padding: 8px 12px;
      background-image: linear-gradient(174.1deg, #f9f9f9 0%, #f8f8f8 100%);

      .image_4 {
        border-radius: 2px;
        width: 24px;
        height: 24px;
      }
    }
  }

  .section_5 {
    padding-bottom: 10px;
    background-image: linear-gradient(155.5deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .grid {
      padding-top: 4px;
      height: 165px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 19px;

      .grid-item {
        padding: 6px 0;

        .image_5 {
          border-radius: 24px;
          width: 50px;
          height: 50px;
        }

        .font_4 {
          font-size: 15px;
          font-family: MiSans;
          line-height: 12px;
          color: #484856;
        }
      }

      .space-y-4 {
        &>*:not(:first-child) {
          margin-top: 4px;
        }
      }
    }
  }

  .section_7 {
    padding: 16px 11px 0 16px;
    background-image: linear-gradient(142.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .image_2 {
      margin: 2px 0 2px 12px;
      width: 24px;
      height: 24px;
    }

    .image_7 {
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    .text_6 {
      margin-left: 12px;
      background-image: linear-gradient(91.7deg, #6b46fe 0%, #fe46eb 100%);
      -webkit-background-clip: text;
    }

    .text_5 {
      margin-left: 18px;
    }

    .text_7 {
      margin-left: 12px;
      color: #22e358;
    }

    .group_4 {
      margin-top: 28px;

      .space-x-8 {
        &>*:not(:first-child) {
          margin-left: 8px;
        }

        .space-y-26 {
          &>*:not(:first-child) {
            margin-top: 26px;
          }
        }

        .group_5 {
          padding: 4px 0;

          .group_6 {
            padding: 8px 0;

            .view_2 {
              margin-top: 35px;
            }

            .section_9 {
              padding: 16px 24px 8px;
              background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798119964055855.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 250px;

              .space-x-19 {
                &>*:not(:first-child) {
                  margin-left: 19px;
                }

                .view {
                  margin-left: 83px;
                }
              }

              .space-x-20 {
                &>*:not(:first-child) {
                  margin-left: 20px;
                }
              }

              .section_10 {
                background-color: #22e358;
                border-radius: 50%;
                width: 8px;
                height: 8px;
              }
            }

            .space-y-11 {
              &>*:not(:first-child) {
                margin-top: 11px;
              }
            }

            .pos_4 {
              position: absolute;
              right: 22px;
              top: 0;
            }
          }

          .section_8 {
            background-color: #22e358;
            border-radius: 50%;
            height: 8px;
          }

          .pos_5 {
            position: absolute;
            left: 31px;
            right: 267px;
            top: 51px;
          }

          .pos {
            position: absolute;
            left: 225px;
            right: 73px;
            top: 0;
          }

          .pos_2 {
            position: absolute;
            left: 252px;
            right: 46px;
            top: 0;
          }

          .pos_3 {
            position: absolute;
            left: 279px;
            right: 19px;
            top: 0;
          }
        }
      }
    }

    .group_7 {
      margin-top: 26px;
    }

    .space-x-10 {
      &>*:not(:first-child) {
        margin-left: 10px;
      }
    }

    .divider {
      background-image: repeating-linear-gradient(90deg, #f0f0f0, #f0f0f0 0.65%, transparent 0.65%, transparent 1.304%);
      background-position: -1px 0px;
      height: 1px;
    }

    .group_8 {
      padding: 26px 0 16px 4px;

      .divider_2 {
        margin-left: 12px;
        background-color: #90909c;
        height: 1px;
      }

      .section_11 {
        background-color: #90909c;
        width: 1px;
        height: 4px;
      }

      .pos_6 {
        position: absolute;
        left: 19.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_7 {
        position: absolute;
        left: 121.5px;
        top: 50%;
        transform: translateY(-50%);
      }

      .pos_8 {
        position: absolute;
        right: 102px;
        top: 50%;
        transform: translateY(-50%);
      }

      .group_9 {
        padding: 0 18px;

        .group_10 {
          margin-right: 8px;
        }
      }
    }

    .space-y-10 {
      &>*:not(:first-child) {
        margin-top: 10px;
      }
    }
  }

  .section_12 {
    padding: 12px 8px 24px 12px;
    background-image: linear-gradient(131.6deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .group_11 {
      margin-right: 4px;
      padding: 14px 0;
      border-bottom: solid 1px #f0f0f0;

      .text_8 {
        line-height: 15.5px;
      }
    }

    .group_12 {
      padding-top: 8px;

      .group_13 {
        width: 56px;

        .image_8 {
          width: 32px;
          height: 32px;
        }

        .pos_9 {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .text_9 {
        color: #000000;
      }
    }

    .space-x-14 {
      &>*:not(:first-child) {
        margin-left: 14px;
      }
    }

    .font_8 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 14px;
      color: #90909c;
    }

    .font_9 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 12px;
      color: #28282f;
    }

    .group_14 {
      margin-top: 18px;

      .text_10 {
        margin-right: 4px;
      }
    }

    .group_15 {
      margin-top: 18px;

      .text_11 {
        line-height: 13.5px;
      }

      .text_12 {
        margin-right: 4px;
        line-height: 13px;
      }
    }

    .text-wrapper_3 {
      margin-right: 4px;
      margin-top: 20px;
      // padding: 16px 0;
      background-color: #f5f5f5;
      border-radius: 24px;
      overflow: hidden;
    }

    .group_16 {
      margin-top: 12px;

      .text_13 {
        line-height: 12px;
      }
    }

    .space-x-2 {
      &>*:not(:first-child) {
        margin-left: 2px;
      }
    }

    .group_17 {
      margin-top: 20px;

      .text-wrapper_4 {
        padding: 4px 0 4px;
        flex: 1 1 57px;
        border-radius: 16px;
        border-image-slice: 1;
        height: 24px;
        border: solid 1px #6b46fe;

        .text_14 {
          line-height: 11px;
          background-image: linear-gradient(91.2deg, #6b46fe 0%, #fe46eb 100%);
          -webkit-background-clip: text;
        }
      }

      .text-wrapper_5 {
        flex: 1 1 57px;
        padding: 4px 0 4px;
        border-radius: 16px;
        height: 24px;
        border: solid 1px #f0f0f0;

        .font_1 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 10px;
          color: #484856;
        }

        .text_15 {
          line-height: 11px;
        }
      }

      .view_3 {
        margin-right: 4px;
      }
    }

    .button {
      margin-right: 4px;
      margin-top: 20px;
      padding: 16px 0;
      background-image: linear-gradient(98.2deg, #6b46fe 0%, #fe46eb 100%);
      border-radius: 24px;

      .text_16 {
        color: #ffffff;
        line-height: 15.5px;
      }
    }
  }

  .space-y-30 {
    &>*:not(:first-child) {
      margin-top: 30px;
    }
  }

  .font_6 {
    font-size: 17px;
    font-family: MiSans;
    line-height: 16px;
    color: #28282f;
  }

  .font_2 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: #90909c;
  }

  .font_7 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: transparent;
  }

  .section_13 {
    padding: 12px 12px 24px;
    background-image: linear-gradient(146.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;
    overflow: hidden;

    .text-wrapper_6 {
      padding: 16px 0;
      height: 48px;
      border-bottom: solid 1px #f0f0f0;

      .text_17 {
        background-image: linear-gradient(96.4deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }

      .text_18 {
        background-image: linear-gradient(93.3deg, #6b46fe 0%, #fe46eb 100%);
        -webkit-background-clip: text;
      }
    }

    .image_9 {
      width: 334px;
      height: 160px;
    }
  }

  .space-y-16 {
    &>*:not(:first-child) {
      margin-top: 16px;
    }
  }

  .font_10 {
    font-size: 17px;
    font-family: MiSans;
    // line-height: 16px;
    color: transparent;
  }
}

.space-x-6 {
  &>*:not(:first-child) {
    margin-left: 6px;
  }
}

.space-x-4 {
  &>*:not(:first-child) {
    margin-left: 4px;
  }
}

.space-x-4 {
  &>*:not(:first-child) {
    margin-left: 4px;
  }
}

.image_6 {
  width: 20px;
  height: 20px;
}

.font_5 {
  font-size: 17px;
  font-family: MiSans;
  line-height: 14px;
  color: #28282f;
}

.space-x-12 {
  &>*:not(:first-child) {
    margin-left: 12px;
  }

  .text-wrapper_2 {
    padding: 6px 0;
    background-color: #ff4b7b;
    border-radius: 4px;
    width: 36px;
    height: 20px;

    .text_3 {
      color: #ffffff;
      font-size: 13px;
      font-family: YouSheBiaoTiHei;
      line-height: 9.5px;
    }
  }

  .font_3 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 12px;
    color: #484856;
  }

  .text_4 {
    color: #b0b0b0;
  }

  .equal-division-item {
    flex: 1 1 173px;
    padding: 16px 16px 12px;
    background-image: linear-gradient(149.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 12px;
    height: 112px;

    .group_3 {
      margin-top: 12px;
    }

    .section_6 {
      margin-top: 18px;
      padding: 4px 10px;
      background-color: #f5f5f5;
      border-radius: 14px;
      width: 72px;
    }
  }
}
</style>
