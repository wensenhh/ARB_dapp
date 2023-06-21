<template>
    <div class="flex-col group space-y-16">
        <span class="font_1 text_2">{{nowNoticeDetail.title}}</span>
        <span class="self-start text_3">{{nowNoticeDetail.createtime}}</span>
        <span class="font_1 text_4" v-html="nowNoticeDetail.content">
        </span>
    </div>
</template>

<script setup>
import { showToast } from 'vant';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { noticeDetail } from '../../api/app'

//获取路由参数
const route = useRoute()
const nowNoticeDetail = ref({})

onMounted(() => {
    if(route.query.id){
        //获取公告详情
        getNoticeDetail(route.query.id)
    }else{
        showToast('参数有误~')
    }
})

const getNoticeDetail = async (id) => {
    const { data } = await noticeDetail({ id })
    console.log(data)
    nowNoticeDetail.value = data
}
</script>

<style lang='scss' scoped>
.group {
    padding: 0 16px;

    .font_1 {
        font-size: 15px;
        font-family: MiSans;
        line-height: 22px;
    }

    .text_2 {
        color: #ffffff;
    }

    .text_3 {
        color: #7887ae;
        font-size: 13px;
        font-family: MiSans;
        line-height: 10px;
    }

    .text_4 {
        color: #c3cbd6;
    }
}

.space-y-16 {
    &>*:not(:first-child) {
        margin-top: 16px;
    }
}</style>
