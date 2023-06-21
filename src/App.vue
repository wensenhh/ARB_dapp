<script setup>
window.onload = function () {
  document.addEventListener('touchstart', function (e) {
    console.log("1", e.touches.length)
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (e) {
    console.log("2")
    e.preventDefault()
  })
}
</script>

<template>
  <Suspense>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition name="anima">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </keep-alive>
    </router-view>
  </Suspense>
</template>

<style scoped>
.anima-enter-active {
  animation: anima-in 1s;
}

.anima-leave-active {
  animation: anima-in 1s reverse;
}

@keyframes anima-in {
  0% {
    transform: scale(0);
  },
  50% {
    transform: scale(1.2);
  },
  100% {
    transform: scale(1);
  }
}
</style>
