<template>
  <div class="flex-col group space-y-20">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="flex-col section_2" v-for="(item, i) in headteamList" :key="i">
        <div class="flex-row group_2 space-x-20">
          <div class="flex-row flex-auto self-center space-x-8">
            <img class="shrink-0 image_3"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798184457721547.png" />
            <div class="flex-col flex-auto space-y-2">
              <span class="font_2">{{ filters.hideaddress(item.userName) }}</span>
              <div class="flex-row self-start group_3 space-x-16">
                <div class="flex-row items-baseline group_1 space-x-4">
                  <span class="font_3">零撸区等级</span>
                  <span class="font_4">L{{ item.level }}</span>
                </div>
                <div class="flex-row items-baseline group_9 space-x-4">
                  <span class="font_3">质押区等级</span>
                  <span class="font_5">L{{ item.zyLevel || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-col justify-start items-center shrink-0 self-start text-wrapper_2">
            <span class="font_3 text">初级节点</span>
          </div>
        </div>
        <div class="flex-row justify-between equal-division">
          <div class="flex-col items-center space-y-14">
            <span class="font_6">{{ item.sub }}</span>
            <span class="font_3">直推人数</span>
          </div>
          <div class="horiz-divider"></div>
          <div class="flex-col items-center space-y-14">
            <span class="font_6">{{ item.team }}</span>
            <span class="font_3">团队人数</span>
          </div>
          <div class="horiz-divider"></div>
          <div class="flex-col items-center space-y-14">
            <span class="font_6">{{ item.plot }}</span>
            <span class="font_3">小区人数</span>
          </div>
          <div class="horiz-divider"></div>
          <div class="flex-col items-center space-y-14">
            <span class="font_6">{{ item.quantity }}</span>
            <span class="font_3">小区业绩</span>
          </div>
        </div>
      </div>
      <div class="flex-col group_4 space-y-16">
        <span class="self-start text_5">直推列表</span>
        <div class="flex-col space-y-12">
          <div class="flex-col section_3 space-y-14" v-for="(item, i) in teamList" :key="item.userId">
            <div class="flex-row items-center group_5 space-x-8">
              <img class="shrink-0 image_3"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16831798185268127862.png" />
              <div class="flex-col flex-auto group_6 view space-y-2">
                <span class="font_2">{{ filters.hideaddress(item.userName) }}</span>
                <div class="flex-row self-start space-x-16">
                  <div class="flex-row items-baseline space-x-4">
                    <span class="font_3">零撸区等级</span>
                    <span class="font_4">L{{ item.level }}</span>
                  </div>
                  <div class="flex-row items-baseline space-x-4">
                    <span class="font_3">质押区等级</span>
                    <span class="font_5">L{{ item.zyLevel || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-row justify-between">
              <span class="font_3">业绩</span>
              <span class="font_7 text_9">注册时间</span>
            </div>
            <div class="flex-row justify-between">
              <span class="font_1 text_10">{{ item.yeji }}</span>
              <span class="font_8 text_11">{{ item.createTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyTeam, getMyPush } from '../../api/app.js'
import filters from '../../../utils/filters';

const headteamList = ref([])
const teamList = ref([])
const refreshing = ref(false);
onMounted(async () => {
  await onRefresh()
})

const getMyTeamList = () => {
  getMyTeam().then(res => {
    headteamList.value = [res.obj]
  })
}

const getMyPushList = () => {
  getMyPush().then(res => {
    teamList.value = res.obj.list
    refreshing.value = false
  })
}

const onRefresh = async () => {
  refreshing.value = true
  await getMyTeamList();
  await getMyPushList()
};
</script>

<style lang='scss' scoped>
.group {
  .section_2 {
    padding: 20px 16px 18px;
    background-image: linear-gradient(154.1deg, #f9f9f9 0%, #f8f8f8 100%);
    border-radius: 20px;

    .group_2 {
      padding-bottom: 16px;
      border-bottom: solid 1px #f0f0f0;

      .text-wrapper_2 {
        padding: 8px 0;
        background-color: #f0f0f0;
        border-radius: 14px;
        border-image-slice: 1;
        width: 76px;
        height: 28px;
        border: solid 1px #6b46fe;

        .text {
          color: transparent;
          line-height: 12.5px;
          background-image: linear-gradient(93.1deg, #6b46fe 0%, #fe46eb 100%);
          -webkit-background-clip: text;
        }
      }
    }

    .space-x-20 {
      &>*:not(:first-child) {
        margin-left: 20px;
      }
    }

    .equal-division {
      margin-left: 6px;
      margin-right: 2px;
      padding: 26px 0;

      .horiz-divider {
        margin: 6px 0 8px;
        background-color: #f0f0f0;
        width: 1px;
        height: 24px;
      }
    }
  }

  .group_4 {
    padding: 12px 0;

    .text_5 {
      color: #28282f;
      font-size: 17px;
      font-family: MiSans;
      line-height: 16px;
    }

    .space-y-12 {
      &>*:not(:first-child) {
        margin-top: 12px;
      }

      .section_3 {
        padding: 20px 16px 24px;
        background-image: linear-gradient(158.5deg, #f9f9f9 0%, #f8f8f8 100%);
        border-radius: 20px;

        .group_5 {
          padding-bottom: 13px;
          border-bottom: solid 1px #f0f0f0;

          .group_6 {
            margin-left: 8px;
            width: 164px;

            .text_6 {
              margin-left: 4px;
            }

            .text_17 {
              margin-left: 16px;
            }

            .text_18 {
              margin-left: 4px;
            }

            .text_13 {
              margin-left: 4px;
            }

            .text_15 {
              margin-left: 4px;
            }
          }

          .view {
            margin-left: 0;
          }

          .text_8 {
            margin-left: 2px;
            margin-top: 28px;
          }
        }

        .font_7 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 12px;
          color: #808080;
        }

        .text_9 {
          margin-right: 108px;
        }

        .font_1 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 10px;
          color: #484856;
        }

        .text_10 {
          line-height: 10.5px;
        }

        .font_8 {
          font-size: 13px;
          font-family: MiSans;
          line-height: 10px;
          color: #808080;
        }

        .text_11 {
          margin-right: 26px;
        }
      }
    }
  }

  .space-y-16 {
    &>*:not(:first-child) {
      margin-top: 16px;
    }
  }

  .space-y-14 {
    &>*:not(:first-child) {
      margin-top: 14px;
    }

    .font_6 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 12px;
      color: #484856;
    }
  }

  .space-x-8 {
    &>*:not(:first-child) {
      margin-left: 8px;
    }
  }

  .image_3 {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  .space-y-2 {
    &>*:not(:first-child) {
      margin-top: 2px;
    }

    .group_3 {
      width: 178px;

      .group_1 {
        flex: 1 1 81px;
      }

      .group_9 {
        flex: 1 1 81px;
      }
    }
  }

  .font_2 {
    font-size: 15px;
    font-family: MiSans;
    line-height: 24px;
    color: #28282f;
  }

  .space-x-16 {
    &>*:not(:first-child) {
      margin-left: 16px;
    }
  }

  .space-x-4 {
    &>*:not(:first-child) {
      margin-left: 4px;
    }
  }

  .font_3 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 12px;
    color: #90909c;
  }

  .font_4 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: #ff4b7b;
  }

  .font_5 {
    font-size: 13px;
    font-family: MiSans;
    line-height: 10px;
    color: #22e358;
  }
}

.space-y-20 {
  &>*:not(:first-child) {
    margin-top: 20px;
  }
}</style>
