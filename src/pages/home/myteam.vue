<template>
  <van-pull-refresh v-model="refreshing" @refresh="getMyTeamList">
    <div class="flex-col section">
      <div class="flex-row items-center group_2 space-x-10">
        <img class="shrink-0 image_2"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123257433068007.png" />
        <div class="flex-col shrink-0 group_3 view space-y-2">
          <span class="font_3">{{ headteam.account ? filters.hideaddress(headteam?.account) : "数据读取中~" }}</span>
          <div class="flex-row space-x-4">
            <div class="flex-col justify-start items-center text-wrapper_2" v-if="headteam.is_chaojie === 1"><span
                class="font_4">高级节点</span></div>
            <div class="flex-col justify-start items-center text-wrapper_2" v-if="headteam.is_jie === 1"><span
                class="font_4">初级节点</span></div>
            <div class="flex-col justify-start items-center text-wrapper_2" v-if="headteam.is_youxiao === 1"><span
                class="font_4">有效用户</span></div>
            <div class="flex-col justify-start items-center text-wrapper_3"><span class="font_5">V{{ headteam.level
            }}</span></div>
          </div>
        </div>
      </div>
      <div class="flex-row equal-division">
        <div class="flex-col items-center equal-division-item group_4 space-y-12">
          <span class="font_6">{{ headteam.zhituinum }}</span>
          <span class="font_2">直推人数</span>
        </div>
        <div class="horiz-divider"></div>
        <div class="flex-col items-center equal-division-item space-y-12">
          <span class="font_6">{{ headteam.team_totalnum }}</span>
          <span class="font_2">团队人数</span>
        </div>
        <div class="horiz-divider"></div>
        <div class="flex-col items-center equal-division-item space-y-12">
          <span class="font_6">{{ headteam.team_youxiaonum }}</span>
          <span class="font_2">团队有效人数</span>
        </div>
      </div>
      <div class="flex-row justify-between items-center group_5">
        <div class="flex-row items-center space-x-8" style="width: 92%;white-space: nowrap;text-overflow: ellipsis;">
          <span class="font_3 text_3">邀请链接</span>
          <span class="font_3 text_4" style="width: 80%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ headteam.share_link }}</span>
        </div>
        <img class="image_3" @click="tools.copy(headteam.share_link)"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123256290298419.png" />
      </div>
    </div>
    <div class="flex-col group_7 space-y-13">
      <span class="self-start font_1 text_5">直推列表</span>

      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
        <div class="flex-col section_2 space-y-14" v-for="(item, i) in teamList" :key="item.id">
          <div class="flex-row">
            <img class="shrink-0 image_2"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/64892fd054fe000011691425/16867123256569743788.png" />
            <div class="flex-col shrink-0 group_3 space-y-2">
              <span class="font_3">{{ item?.nickname }}</span>
              <div class="flex-row space-x-4">
                <div class="flex-col justify-start items-center text-wrapper_4" v-if="headteam.is_chaojie === 1"><span
                    class="font_4">高级节点</span></div>
                <div class="flex-col justify-start items-center text-wrapper_4" v-if="headteam.is_jie === 1"><span
                    class="font_4">初级节点</span></div>
                <div class="flex-col justify-start items-center text-wrapper_4" v-if="headteam.is_youxiao === 1"><span
                    class="font_4">有效用户</span></div>
                <div class="flex-col justify-start items-center text-wrapper_5"><span class="font_5">V{{ item.level
                }}</span></div>
              </div>
            </div>
          </div>
          <div class="flex-row justify-center items-baseline group_6 space-x-6">
            <span class="font_7">注册时间</span>
            <span class="font_8 text_6">{{ item.createtime }}</span>
          </div>
        </div>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyTeam, getMyPush } from '../../api/app.js'
import filters from '../../../utils/filters';
import tools from '../../../utils/tools'

const headteam = ref({})
const teamList = ref([])
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
const orderpage = ref(1)
onMounted(async () => {
  await getMyTeamList()
  await onRefresh()
})

const getMyTeamList = () => {
  getMyTeam().then(res => {
    headteam.value = res.data
    setTimeout(() => {
      refreshing.value = false;
    }, 1000);
  })
}

const getMyPushList = () => {
  if (refreshing.value) {
    teamList.value = [];
    orderpage.value = 1
    refreshing.value = false;
  }

  getMyPush({
    page: orderpage.value
  }).then(({ data }) => {
    teamList.value = [...teamList.value, ...data.data]
    loading.value = false;
    if (teamList.value.length >= data.total) {
      finished.value = true;
    } else {
      orderpage.value += 1
    }
  })
}

const onRefresh = async () => {
  // 清空列表数据
  finished.value = false;
  refreshing.value = true
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  getMyPushList();
};
</script>

<style lang='scss' scoped>
.section {
  padding: 0 12px;
  background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
  border-radius: 8px;

  .group_2 {
    padding: 24px 0 12px;

    .image_2 {
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }

    .group_3 {
      margin: 2px 116px 2px 10px;
      width: 160px;

      .space-x-4 {
        &>*:not(:first-child) {
          margin-left: 4px;
        }

        .text-wrapper_2 {
          padding: 4px 0;
          background-color: #ffffff33;
          border-radius: 14px;
          backdrop-filter: blur(15px);
          width: 60px;
          height: 20px;

          .font_4 {
            font-size: 11px;
            font-family: MiSans;
            line-height: 10.5px;
            color: #ffffff;
          }
        }

        .text-wrapper_3 {
          padding: 4px 0;
          background-color: #ffffff33;
          border-radius: 14px;
          backdrop-filter: blur(15px);
          width: 32px;
          height: 20px;

          .font_5 {
            font-size: 11px;
            font-family: MiSans;
            line-height: 8.5px;
            color: #ffffff;
          }
        }
      }
    }

    .view {
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    .space-y-2 {
      &>*:not(:first-child) {
        margin-top: 2px;
      }
    }
  }

  .space-x-10 {
    &>*:not(:first-child) {
      margin-left: 10px;
    }
  }

  .equal-division {
    padding: 12px 0;
    background-color: #ffffff33;
    border-radius: 8px;

    .equal-division-item {
      margin-left: 6px;
      flex: 1 1 103.5px;
      padding: 6px 0;

      .font_6 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 12px;
        color: #ffffff;
      }

      .font_2 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 12px;
        color: #c3cbd6;
      }
    }

    .group_4 {
      margin-left: 0;
    }

    .space-y-12 {
      &>*:not(:first-child) {
        margin-top: 12px;
      }
    }

    .horiz-divider {
      margin: 12px 0 12px 6px;
      background-color: #ffffff1a;
      width: 1px;
      height: 24px;
    }
  }

  .group_5 {
    padding: 9px 0 21px;

    .space-x-8 {
      &>*:not(:first-child) {
        margin-left: 8px;
      }

      .text_3 {
        line-height: 14px;
      }

      .text_4 {
        line-height: 15.5px;
      }
    }

    .image_3 {
      width: 20px;
      height: 20px;
    }
  }

  .font_3 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 22px;
    color: #ffffff;
  }
}

.group_7 {
  margin-top: 28px;

  .font_1 {
    font-size: 17px;
    font-family: MiSans;
    color: #ffffff;
  }

  .text_5 {
    line-height: 16px;
  }

  .section_2 {
    padding: 12px 12px 16px;
    background-color: #242b44;
    border-radius: 8px;

    .image_2 {
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }

    .group_3 {
      margin: 2px 116px 2px 10px;
      width: 160px;

      .font_3 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 22px;
        color: #ffffff;
      }

      .space-x-4 {
        &>*:not(:first-child) {
          margin-left: 4px;
        }

        .text-wrapper_4 {
          padding: 4px 0;
          background-color: #ffffff1a;
          border-radius: 14px;
          width: 60px;
          height: 20px;

          .font_4 {
            font-size: 11px;
            font-family: MiSans;
            line-height: 10.5px;
            color: #ffffff;
          }
        }

        .text-wrapper_5 {
          padding: 4px 0;
          background-color: #ffffff1a;
          border-radius: 14px;
          width: 32px;
          height: 20px;

          .font_5 {
            font-size: 11px;
            font-family: MiSans;
            line-height: 8.5px;
            color: #ffffff;
          }
        }
      }
    }

    .space-y-2 {
      &>*:not(:first-child) {
        margin-top: 2px;
      }
    }

    .group_6 {
      padding: 0 58px;

      .font_7 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 12px;
        color: #7887ae;
      }

      .font_8 {
        font-size: 13px;
        font-family: MiSans;
        line-height: 10.5px;
        color: #7887ae;
      }

      .text_6 {
        line-height: 10px;
      }
    }

    .space-x-6 {
      &>*:not(:first-child) {
        margin-left: 6px;
      }
    }
  }

  .space-y-14 {
    &>*:not(:first-child) {
      margin-top: 14px;
    }
  }
}

.space-y-13 {
  &>*:not(:first-child) {
    margin-top: 13px;
  }
}</style>
