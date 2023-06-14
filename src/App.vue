<script setup>
</script>

<template>
  <Suspense>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition name="fade">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </keep-alive>
    </router-view>
  </Suspense>
</template>

<style scoped>

</style>
