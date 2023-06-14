<template>
  <div class="flex-col flex-auto group">
    <div class="flex-col group_2 space-y-16">
      <div class="flex-col items-start section_3">
        <span class="font_2 text_3">{{$t('second.invidetips1')}}</span>
        <span class="font_2 text_4">{{$t('second.invidetips2')}}</span>
        <span class="font_2 text_5">{{$t('second.invidetips3')}}</span>
        <span class="font_2 text_6">{{$t('second.invidetips4')}}</span>
      </div>
      <div class="flex-col section_4 space-y-24">
        <div class="flex-col justify-start items-center self-center image-wrapper">
          <div id="invideimg" class="imgbox"></div>
        </div>
        <div class="flex-row items-center section_5 space-x-10">
          <span class="font_2">{{$t('second.invideurl')}}</span>
          <span class="font_2 text_7" style="width: 75%;"><van-text-ellipsis :content="invideurl" /></span>
        </div>
      </div>
    </div>
    <div class="flex-col justify-start items-center button" @click="tools.copy(invideurl)"><span
        class="font_1 text_8">{{$t('second.invidecopy')}}</span></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getInvideUrl } from '../../api/app.js'
import { TextEllipsis } from 'vant';
import tools from '../../../../c2c/utils/tools';
import QRCode from 'qrcodejs2-fix';

const invideurl = ref('')

onMounted(() => {
  getmyinvide()
})

const getCode = () => {
  // document.getElementById("invideimg").innerHTML = ""; //清空标签内原有数据，防止多次点击生成多个二维码
  new QRCode(document.getElementById("invideimg"), {
    text: invideurl.value
  });
};

const getmyinvide = () => {
  getInvideUrl().then(res => {
    invideurl.value = res.obj
    getCode()

  })
}
</script>

<style lang='scss' scoped>
.group {
  .group_2 {
    padding: 10px 0 24px;

    .section_3 {
      padding: 28px 12px;
      background-image: linear-gradient(157deg, #f9f9f9 0%, #f8f8f8 100%);
      border-radius: 20px;

      .text_3 {
        color: #28282f;
        line-height: 16px;
      }

      .text_4 {
        margin-left: 8px;
        margin-top: 20px;
      }

      .text_5 {
        margin-left: 8px;
        margin-top: 14px;
      }

      .text_6 {
        margin-left: 8px;
        margin-top: 14px;
      }
    }

    .section_4 {
      padding: 40px 12px;
      background-image: linear-gradient(137.7deg, #f9f9f9 0%, #f8f8f8 100%);
      border-radius: 20px;

      .image-wrapper {
        padding: 20px;
        border-radius: 20px;
        background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/645348c1b98f5d001166de68/16843053774734896279.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 200px;

        .imgbox {
          .image_5 {
            width: 160px;
            height: 160px;
          }
        }

      }

      .section_5 {
        padding: 16px 12px;
        background-color: #f0f0f0;
        border-radius: 137px;

        .text_7 {
          line-height: 12px;
        }
      }

      .space-x-10 {
        &>*:not(:first-child) {
          margin-left: 10px;
        }
      }
    }

    .space-y-24 {
      &>*:not(:first-child) {
        margin-top: 24px;
      }
    }

    .font_2 {
      font-size: 15px;
      font-family: MiSans;
      line-height: 14px;
      color: #484856;
    }
  }

  .space-y-16 {
    &>*:not(:first-child) {
      margin-top: 16px;
    }
  }

  .button {
    padding: 16px 0;
    background-image: linear-gradient(98.8deg, #6b46fe 0%, #fe46eb 100%);
    border-radius: 24px;

    .font_1 {
      font-size: 17px;
      font-family: MiSans;
      line-height: 16px;
    }

    .text_8 {
      color: #ffffff;
    }
  }
}
</style>
