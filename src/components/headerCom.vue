<template>
  <div class="flex-row justify-between items-center section_2">
    <div class="flex-row space-x-8">
      <img class="shrink-0 image" src="../../public/logo.png" />
      <div class="group">
        <span class="text">
          ARB
        </span>
        <!-- <span class="font_2 text_2">Finance Litecoin</span> -->
      </div>
    </div>
    <div class="flex-row">
      <div class="flex-col justify-start items-center text-wrapper"><span class="font_1">{{ filters.hideaddress(address)
        || "连接钱包中~" }}</span></div>
      <img class="image_2" @click="langshow = true"
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123248456665112.png" />
      <img class="image_2" @click="tabbarshow = true"
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867140129807158065.png" />
    </div>
  </div>
  <div style="height: 64px;"></div>
  <van-popup v-model:show="tabbarshow" position="left" closeable
    :style="{ padding: '70px 0', width: '45%', height: '100vh' }">
    <div class="flex-col section_4 space-y-35 popitem">
      <div :class="['self-start', 'font_3', 'text_5', nowtab === i ? 'active' : '']" v-for="(item, i) in tabList" :key="i"
        @click="changetab(i)"><span>{{ item.name }}</span></div>
      <div class="flex-row group_4 space-x-24" style="margin-top: 10px;">
        <img class="image_5"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123272310747441.png" />
        <img class="image_5"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123272592056311.png" />
      </div>
    </div>
  </van-popup>
  <van-action-sheet v-model:show="langshow" :actions="langList" cancel-text="取消" close-on-click-action
    @select="onSelect" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router";
import { useAddrStore } from '../store/user'
import filters from '../../utils/filters';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const store = useAddrStore();
let { address, parentName } = storeToRefs(store)
const tabbarshow = ref(false)
const langshow = ref(false)
const tabList = ref([{
  name: '首页',
  url: `/home/index`
}, {
  name: '质押记录',
  url: '/pledge/detail'
}, {
  name: 'ARB钱包',
  url: '/home/wallet?type=1'
}, {
  name: 'ART钱包',
  url: '/home/wallet?type=2'
}, {
  name: '兑换',
  url: '/pledge/exchange'
}, {
  name: '我的团队',
  url: '/home/myteam'
}, {
  name: '分红统计',
  url: '/home/sharetotal'
}, {
  name: '社区公告',
  url: '/home/noticeList'
},{
  name: '官网',
}])
const nowtab = ref(0)
const langList = [
  { name: 'English', key: 'en' },
  { name: '繁體中文', key: 'zh' },
];

onMounted(() => {
  console.log(locale.value)
})

const onSelect = (e) => {
  locale.value = e.key
  localStorage.setItem('lang', e.key)
}

const changetab = (i) => {
  nowtab.value = i
  navgateto(tabList.value[i].url)
  tabbarshow.value = false

}
const router = useRouter();
const navgateto = (url) => {
  if(url == '/home/index'){
    url = `/home/index?inviteCode=${parentName.value}`
  }
  router.push(url);
}
</script>

<style lang='scss' scoped>
:deep(.van-action-sheet__gap){
  background: #252b44 !important;
}
.section_2 {
  padding: 12px 16px;
  background: linear-gradient(172.77deg, #1d2039 0%, #1d2039 126.51%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .space-x-8 {
    &>*:not(:first-child) {
      margin-left: 8px;
    }

    .image {
      width: 40px;
      height: 40px;
    }

    .group {
      // line-height: 18px;
      @include flexCenter;
      height: 40.5px;

      .text {
        color: #FFFFFF;
        font-size: 17px;
        font-family: MiSans;
        font-weight: 800;
        line-height: 18px;
      }

      .font_2 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 10px;
        color: #90909c;
      }

      .text_2 {
        color: #3e5c98;
        line-height: 20px;
      }
    }
  }

  .text-wrapper {
    padding: 8px 0;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    width: 114px;
    height: 28px;

    .font_1 {
      font-size: 13px;
      font-family: MiSans;
      line-height: 10px;
      color: #C4CBD7;
    }
  }

  .image_2 {
    margin: 2px 0 2px 12px;
    width: 24px;
    height: 24px;
  }
}

.popitem {

  >div {
    @include flexLeftColumn;
    width: 100%;
    height: 46px;
    padding-left: 26px;
  }

  .active {
    background-color: #252B44;

    span {
      background-image: linear-gradient(91.5deg, #6b46fe 0%, #fe46eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.section_4 {
  overflow: hidden;

  .space-y-18 {


    .space-y-12 {


      .image_2 {
        width: 24px;
        height: 24px;
      }

      .image_3 {
        margin-right: 24px;
      }

      .text-wrapper {
        padding: 16px 0;
        background-color: #f5f5f5;
        width: 280px;

        .text_3 {
          margin-left: 24px;
          color: transparent;
          background-image: linear-gradient(91.5deg, #6b46fe 0%, #fe46eb 100%);
          -webkit-background-clip: text;
        }
      }
    }

    .text_4 {
      margin-left: 26px;
    }
  }

  .font_3 {
    font-size: 15px;
    font-family: MiSans;
    color: #C4CBD7;
  }

  .text_8 {
    margin-left: 24px;
  }

  .font_2 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 14px;
    color: #484856;
  }

  .text_9 {
    margin-left: 24px;
  }

  .text_11 {
    margin-left: 24px;
  }

  .text_12 {
    margin-left: 24px;
  }

  .text_14 {
    margin-left: 24px;
  }
}

.group_4 {
  padding: 0 16px;
  flex-direction: initial !important;
  justify-content: left !important;

  .image_5 {
    width: 24px;
    height: 24px;
  }
}

.space-x-24 {
  &>*:not(:first-child) {
    margin-left: 24px;
  }
}
</style>
