<template>
    <div class="content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
                <div class="flex-col section_2 space-y-16" v-for="(item, index) in mynoticeList" :key="index"
                    @click="navgateto(`/home/noticeDetail?id=${item.id}`)">
                    <div class="noticeitem">
                        <van-text-ellipsis class="text_2" :content="item.title" />
                        <div class="font_1 text_3">{{ item.createtime }}</div>
                    </div>
                    <van-text-ellipsis class="font_1 text_4" :content="item.content" rows="3" expand-text="展开"
                        collapse-text="收起" />
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { noticeList, noticeDetail } from '../../api/app'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const mynoticeList = ref([])
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
const orderpage = ref(1)

onMounted(() => {
    onRefresh()
})

const getNoticeList = async () => {
    if (refreshing.value) {
        mynoticeList.value = [];
        orderpage.value = 1
        refreshing.value = false;
    }
    const { data } = await noticeList({ name: 'cn_gonggao', page: orderpage.value })
    mynoticeList.value = [...mynoticeList.value, ...data.data]
    loading.value = false;
    if (mynoticeList.value.length >= data.total) {
        finished.value = true;
    } else {
        orderpage.value += 1
    }
}

const onRefresh = async () => {
    // 清空列表数据
    finished.value = false;
    refreshing.value = true
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    getNoticeList();
};

const navgateto = (url) => {
    router.push(url);
}
</script>

<style lang='scss' scoped>
.section_2 {
    margin: 12px 0;
    padding: 18px 10px 24px 12px;
    background-color: #242b44;
    border-radius: 8px;

    .text_2 {
        margin-left: 4px;
        color: #ffffff;
        font-size: 15px;
        font-family: MiSans;
        flex: 1 auto;
    }

    .font_1 {
        font-size: 13px;
        font-family: MiSans;
    }

    .text_3 {
        color: #7887ae;
        line-height: 10px;
    }

    .pos_2 {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .text_4 {
        color: #c3cbd6;
        line-height: 20px;
    }

    .noticeitem {
        @include flexBetween;
    }
}

.space-y-16 {
    &>*:not(:first-child) {
        margin-top: 16px;
    }
}
</style>
