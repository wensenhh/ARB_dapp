<template>
    <div class="flex-col">
        <van-pull-refresh v-model="refreshing" @refresh="getShareinfo">
            <div class="flex-col list-item space-y-12" :key="i" v-for="(item, i) in sharelist">
                <div class="flex-row justify-between items-center section">
                    <span class="font_1">{{ item.level }}分红池</span>
                    <div class="flex-col justify-start items-center text-wrapper_2" @click="navgateto(`/pledge/withdraw?level=${item.level}`)"><span class="font_3">提现</span></div>
                </div>
                <div class="flex-row justify-between equal-division">
                    <div class="flex-col items-center equal-division-item space-y-12">
                        <span class="font_4">{{ item.arbnum }}</span>
                        <span class="font_2">ARB总数量</span>
                    </div>
                    <div class="flex-col items-center equal-division-item space-y-12">
                        <span class="font_4">{{ item.usernum }}</span>
                        <span class="font_2">等级总数量</span>
                    </div>
                    <div class="flex-col items-center equal-division-item space-y-12">
                        <span class="font_4">{{ item.mybalance }}</span>
                        <span class="font_2">我的余额</span>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { shareinfo } from '../../api/app.js'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const sharelist = ref([])
const refreshing = ref(false)

onMounted(async () => {
    await getShareinfo()
})

const getShareinfo = async () => {
    const res = await shareinfo()
    console.log(res)
    sharelist.value = res.data
    setTimeout(() => {
        refreshing.value = false
    }, 1000);
}

const navgateto = (url, param) => {
    router.push(url);
}
</script>

<style lang='scss' scoped>
.list-item {
    background-color: #242b44;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 16px;

    .section {
        padding: 12px;
        background-color: #ffffff1a;

        .font_1 {
            font-size: 17px;
            font-family: MiSans;
            line-height: 16px;
            color: #f29812;
        }

        .text-wrapper_2 {
            padding: 10px 0;
            background-image: linear-gradient(90deg, #4f13f9 0%, #df23f0 100%);
            border-radius: 16px;
            width: 80px;
            height: 32px;

            .font_3 {
                font-size: 15px;
                font-family: MiSans;
                line-height: 13.5px;
                color: #ffffff;
            }
        }
    }

    .equal-division {
        padding-bottom: 4px;

        .equal-division-item {
            padding: 6px;
            width: 89px;

            .font_4 {
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
    }
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }
}

.space-y-12 {
    &>*:not(:first-child) {
        margin-top: 12px;
    }
}</style>
