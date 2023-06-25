<template>
  <div class="flex-col group_2 space-y-20">

    <div class="flex-col space-y-20">
      <van-skeleton animate round :loading="bannaloading">
        <template #template>
          <van-skeleton-image image-size="100%" style="height: 120px;" />
        </template>
        <div class="flex-col section_3">
          <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in swiperItems" :key="image">
              <img :src="image.img" />
            </van-swipe-item>
          </van-swipe>
          <!-- <van-notice-bar mode="link" scrollable left-icon="volume-o" background="#252B44" color="#c4cbd7">{{
          noticeList[0]?.title }}</van-notice-bar> -->
        </div>
      </van-skeleton>

      <div class="flex-col space-y-15">
        <div class="flex-row justify-between items-center">
          <div class="flex-row items-baseline space-x-8">
            <span class="font_1 text_4">质押</span>
            <span class="font_4 text_5">PLEDGE</span>
          </div>
          <div class="flex-row items-center" @click="navgateto('/pledge/detail')">
            <span class="font_5 text_6">质押记录</span>
            <img class="shrink-0 image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123248525002782.png" />
          </div>
        </div>
        <div class="flex-col space-y-12">
          <div class="flex-col list-item space-y-20" :key="i" v-for="(item, i) in pledgeList">
            <div class="flex-row justify-between items-center">
              <div class="flex-row items-baseline space-x-4">
                <span class="font_4">{{ item.zynum }}ARB</span>
                <span class="font_3">可获得收益：{{ item.zynum * siteRulers.zy_zhouqi * (siteRulers.zy_rate / 100) +
                  item.zynum
                }}ARB</span>
              </div>
              <div class="flex-col justify-start items-center text-wrapper_2" v-if="!approveFlagUSDT"
                @click="getApprovecoin(1)">
                <span class="font_6">{{ $t('index.Authorization') }}</span>
              </div>
              <div class="flex-col justify-start items-center text-wrapper_2" v-else @click="pledgefun(item)"
                :style="item.is_zy === 0 || item.is_zy === 2 ? 'background: #666666' : ''">
                <span class="font_6">{{ item.is_zy === 2 ? '暂未开放' : $t('index.pledge') }}</span>
              </div>
            </div>
            <div class="flex-row justify-between">
              <span class="font_5">收益周期：{{ siteRulers.zy_zhouqi }}天</span>
              <span class="font_5">每日收益率：{{ siteRulers.zy_rate }}%</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="flex-col space-y-8">
        <span class="self-start font_3 text_8">规则说明</span>
        <span class="font_2 text_9">
          100ARB（币本位）入场，3天为一个计算收益周期，3天后再次质押后收益到账，ARB收益为日化1%，进一单出一单，系统必须有一单在质押中，3天后赎回的103个ARB直接到用户钱包地址，100ARB进行5轮后，可参与500ARB，500ARB进行5轮后，可参与1000ARB。
        </span>
      </div> -->
      <div class="flex-row justify-evenly items-center self-end relative section_4" @click="showOutput = true">
        <img class="image_2"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16871666841275466295.png" />
        <span class="font_3">质押规则</span>
      </div>
    </div>
    <van-popup v-model:show="showOutput" round safe-area-inset-top safe-area-inset-bottom>
      <div class="flex-col section_5">
        <div class="flex-col justify-start items-center text-wrapper_2"><span class="font_1">质押规则说明</span></div>
        <!-- <span class="self-center font_2 text_5">
          添加流动性总价值未超过200U不能获得收益；
          <br />
          移除流动性或者转移LP后不能获得收益；
        </span> -->
        <span class="self-center font_2 text_8">
          Arbitrum Orbit提供了一种强大的新方法来构建Arbitrum。第 3
          层链、新应用、协议创新，欢迎来到更快、更便宜、更安全的部署世界。Arbitrum基金会，提议成立ArbitrumDAO去中心化自治组织，该组织将由ARB持有者管理，ArbitrumDAO将能够集体决定和实施从核心协议技术到非技术决策的变化。根据ArbitrumDAO章程中规定的AIP流程，ArbitrumDAO将对DAO金库拥有直接的链上治理权。为了最好地为ArbitrumDAO提供有效治理和促进治理链发展的能力。
          <br />
          <br />
          入场规则：
          <br />
          100ARB（币本位）入场，3天为一个计算收益周期，3天后再次质押后收益到账，ARB收益为日化1%，进一单出一单，系统必须有一单在质押中。3天后赎回的103个ARB直接到用户钱包地址。
          <br />
          也可选择参与500ARB和1000ARB质押，ARB收益为参与质押数量的日化1%计算奖励。
          <br />
          2000ARB、5000ARB、10000ARB暂不开放。
        </span>
      </div>
    </van-popup>
    <van-popup v-model:show="showInvide" round :close-on-click-overlay="false" :transition-appear="true"
      safe-area-inset-top safe-area-inset-bottom>
      <div class="flex-col section_8 space-y-16">
        <span class="self-center font_1">请输入推荐人钱包地址</span>
        <div class="flex-col space-y-24">
          <div class="flex-col justify-start items-start text-wrapper_2">
            <van-field class="font_5 text_7" v-model="inviteCode" type="text" placeholder="请输入推荐人钱包地址" />
          </div>
          <div class="flex-row space-x-12 invidetoolbox">
            <div class="flex-col items-center text-wrapper_4" @click="bindInvideCode"><span
                class="font_1 text_9">确定</span></div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { connetWallet, sign, allowance, balance, createRechargeContract, toAmount, ApproveCoin } from '../../connectWallet/index'
import { showToast, showConfirmDialog, showFailToast, showLoadingToast, closeToast } from 'vant';
import { useAddrStore } from '../../store/user'
import { storeToRefs } from "pinia"
import filters from '../../../utils/filters';
import { Login, getpledgeList, getSwiper, pledgeapi, getUserassets } from '../../api/app.js'
import { ethers } from "ethers";
// 将npm方式下载的echarts插件引入进来
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = useAddrStore();
const router = useRouter();
const route = useRoute();
let { address, siteRulers, parentName } = storeToRefs(store)
const myaddress = ref('')
const approveFlagUSDT = ref(false)
const usdtbalance = ref(0)
const noticeList = ref([])
const swiperItems = ref([])
const pledgeList = ref([])
const showOutput = ref(false)
const bannaloading = ref(true)
const showInvide = ref(false)
const inviteCode = ref('')

onMounted(async () => {
  // if (route.query.inviteCode || parentName.value) {
  //   await store.changeParent(route.query.inviteCode)
  // } else {
  //   return showLoadingToast({
  //     message: '未获取到推荐码~',
  //     mask: true,
  //     forbidClick: true,
  //     overlay: true,
  //     duration: 0
  //   })
  // }
  const res = await connetWallet()
  if (!res || res == '') {
    showToast(t('index.wallteerror'))
  } else {
    myaddress.value = res
    store.changeaddr(res)
    await userLogin()
  }
  await getallSwiper()
})

const userLogin = async () => {
    Login({
      account: myaddress.value,
      parent_account: inviteCode.value || ''
    }).then(({ data }) => {
      showToast('登录成功~')
      showLoadingToast({
        message: '正在加载数据~',
        mask: true,
        forbidClick: true,
        overlay: true,
        duration: 0
      })
      store.changetoken(data.userinfo.token)
      store.changeuser(data.userinfo)
      initRequest()
      store.getsiteRuler()
    }).catch(err => {
      showInvide.value = true
      showToast(err.msg)
    })
}

const bindInvideCode = async () => {
  if (inviteCode.value && inviteCode.value.length > 38) {
    await store.changeParent(inviteCode.value)
    await store.loginaddr(myaddress.value, async () => {
      userLogin()
      showInvide.value = false
    })
  } else {
    showToast('请输入正确的邀请码~')
  }
}

const initRequest = async () => {
  await myallowance()
  await getbalance()
  await getIndexPledgeList()
}

const getIndexPledgeList = () => {
  getpledgeList().then(({ data }) => {
    pledgeList.value = data
    closeToast()
  })
}

const getallSwiper = () => {
  getSwiper({
    lang: 'en'
  }).then(({ data }) => {
    let newarr = []
    data.bannerList.forEach(item => {
      newarr.push({
        img: item.image
      })
    })
    swiperItems.value = newarr
    noticeList.value = data.gonggaolist
    bannaloading.value = false
  })
}

const getApprovecoin = async (type) => {
  showLoadingToast('授權中~')
  ApproveCoin(type, res => {
    console.log(res)
    // 上链需要时间，每秒查询一次授权状态
    let key = 0
    let timer = null
    if (res?.hash) {
      timer = setInterval(() => {
        key++
        myallowance()
        if (approveFlagUSDT.value || key > 10) {
          clearInterval(timer)
        }
      }, 1000)
    }
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

// 质押ARB
const pledgefun = (item) => {
  console.log(t('index.pledge'))

  if (item.is_zy !== 1) {
    if (item.is_zy === 0) {
      return showToast(item.msg)
    }
    if (item.is_zy === 2) {
      return showToast('暂未开放')
    }
  }
  // if (Number(item.zynum) > usdtbalance.value) {
  //   return showToast(t('index.balanceno'))
  // }
  // that.$tools.loading(that.$t('index.pledgeing'))
  showLoadingToast(t('index.pledgeing'))
  // 先調取后台接口
  pledgeapi({
    zynum: item.zynum,
  }).then(async ({ data }) => {
    //获取到后台返回的订单号后请求合约
    const orderid = data.ordersn
    try {
      let MyContract = await createRechargeContract();// arb质押合约交互
      let mypledgenum = await toAmount(data.zynum.toString())
      console.log(orderid, mypledgenum)
      //转账数量  质押合约调用
      MyContract.recharge(orderid, mypledgenum, {
        gasLimit: 2100000
      }).then(res => {
        console.log("質押成功==", res);
        showToast('質押成功~')
        getbalance()
        getIndexPledgeList()
      }).catch(err => {
        console.log('質押失敗~', err)
        console.log('質押失敗=', err.message)
        showFailToast('質押失敗~', err.message)
      })
    } catch (error) {
      // this.allowanceBalance = 0;
      console.error("trigger smart contract error", error)
      // uni.hideLoading()
    }
  })

}

const navgateto = (url, param) => {
  router.push(url);
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
    // background-color: #252B44;
    border-radius: 20px;
    overflow: hidden;
  }

  .font_6 {
    font-size: 17px;
    font-family: MiSans;
    line-height: 16px;
    color: #28282f;
  }
}

.space-y-15 {
  &>*:not(:first-child) {
    margin-top: 15px;
  }

  .space-x-8 {
    &>*:not(:first-child) {
      margin-left: 8px;
    }

    .font_1 {
      font-size: 17px;
      font-family: MiSans;
      color: #ffffff;
    }

    .text_4 {
      line-height: 15.5px;
    }

    .text_5 {
      color: #7887ae;
    }
  }

  .font_5 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 14px;
    color: #c3cbd6;
  }

  .text_6 {
    color: #7887ae;
    line-height: 13.5px;
  }

  .image_5 {
    width: 18px;
    height: 18px;
  }

  .space-y-12 {
    &>*:not(:first-child) {
      margin-top: 12px;
    }

    .list-item {
      padding: 16px 8px 20px 12px;
      background-color: #242b44;
      border-radius: 8px;

      .space-x-4 {
        &>*:not(:first-child) {
          margin-left: 4px;
        }

        .font_3 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 12px;
          color: #10e057;
        }
      }

      .text-wrapper_2 {
        margin-right: 4px;
        padding: 8px 0;
        background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
        border-radius: 16px;
        width: 88px;
        height: 32px;

        .font_6 {
          font-size: 15px;
          font-family: MiSans;
          line-height: 14px;
          color: #ffffff;
        }
      }
    }

    .space-y-20 {
      &>*:not(:first-child) {
        margin-top: 20px;
      }
    }
  }

  .font_4 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 12px;
    color: #ffffff;
  }
}

.space-y-8 {
  &>*:not(:first-child) {
    margin-top: 8px;
  }

  .font_3 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 12px;
    color: #10e057;
  }

  .text_8 {
    color: #f72557;
    line-height: 12.5px;
  }

  .font_2 {
    font-size: 13px;
    font-family: MiSans;
    color: #c3cbd6;
  }

  .text_9 {
    line-height: 20px;
  }
}

.section_4 {
  padding: 6px 16px;
  background-color: #ffffff1a;
  border-radius: 24px 0px 0px 24px;
  backdrop-filter: blur(30px);
  width: 100px;
  position: fixed;
  right: 0;
  top: 20vh;

  .image_2 {
    width: 20px;
    height: 20px;
  }

  .font_3 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 14px;
    color: #ffffff;
  }
}

.section_5 {
  padding-bottom: 26px;
  background-image: linear-gradient(169.5deg, #1d2039 0%, #1d2039 100%);
  border-radius: 12px;
  overflow: hidden;
  width: 320px;
  height: auto;

  .text-wrapper_2 {
    padding: 16px 0;
    background-color: #242b44;
    width: 320px;

    .font_1 {
      font-size: 17px;
      font-family: MiSans;
      line-height: 16px;
      color: #ffffff;
    }
  }

  .font_2 {
    font-size: 14px;
    font-family: MiSans;
    line-height: 24px;
    color: #c3cbd6;
  }

  .text_5 {
    margin-top: 12px;
    color: #f72557;
    width: 270px;
  }

  .text_8 {
    margin-top: 12px;
    width: 278.5px;
  }
}

.section_8 {
  padding: 28px 16px 24px;
  background-image: linear-gradient(175.4deg, #1d2039 0%, #1d2039 100%);
  border-radius: 8px;

  .invidetoolbox {
    @include flexCenter;
  }

  .font_1 {
    font-size: 17px;
    font-family: MiSans;
    line-height: 16px;
    color: #ffffff;
  }

  .space-y-24 {
    &>*:not(:first-child) {
      margin-top: 24px;
    }

    .text-wrapper_2 {
      background-color: #242b44;
      border-radius: 4px;
      width: 288px;

      .font_5 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 14px;
        color: #7887ae;
      }

      .text_7 {
        margin-left: 12px;
      }
    }

    .space-x-12 {
      &>*:not(:first-child) {
        margin-left: 12px;
      }

      .text-wrapper_3 {
        padding: 16px 0;
        background-color: #242b44;
        border-radius: 24px;
        width: 138px;
        height: 48px;

        .text_8 {
          color: #e3d9eb;
          line-height: 15.5px;
        }
      }

      .text-wrapper_4 {
        padding: 16px 0;
        background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
        border-radius: 24px;
        width: 100%;
        height: 48px;

        .text_9 {
          color: #f9f5ff;
        }
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
