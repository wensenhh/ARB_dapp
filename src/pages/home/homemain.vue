<template>
    <headerCom></headerCom>
    <div class="container" id="container">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import headerCom from '../../components/headerCom.vue';

</script>

<style lang='scss'>
body{
    background: linear-gradient(172.77deg, #1d2039 0%, #1d2039 126.51%);
}
.container {
    width: 100vw;
    min-height: 100vh;
    padding: 4px 16px;
    background: linear-gradient(172.77deg, #1d2039 0%, #1d2039 126.51%);
}
:root:root {
  --van-popup-background: linear-gradient(172.77deg, #1d2039 0%, #1d2039 126.51%);
  --van-action-sheet-item-background: #252b44;
  --van-cell-background: inherit;
  --van-field-input-text-color: #ffffff;
  --van-action-sheet-item-text-color: #ffffff;
  --van-action-sheet-cancel-padding-color: #252b44;
  --van-active-color: #252b44;
  --van-dialog-background: #252B44;
  --van-button-default-background: #252B44;
  --van-button-default-color: #7988AE;
  --van-text-color: #ffffff
}
</style>
