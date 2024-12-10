<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 初始化图片数组
const images = ref<string[]>([])
for (let i = 10; i <= 76; i++) {
  images.value.push(new URL(`/src/assets/img/intro/ct_header_end${i}.webp`, import.meta.url).href)
}

const currentImageIndex = ref(0)
let isAnimating = false

const handleScroll = (event: WheelEvent) => {
  if (isAnimating) return
  isAnimating = true

  const scrollDirection = event.deltaY > 0 ? 1 : -1
  let steps = 4 // 每次滚动切换四张图片

  const switchImages = () => {
    const newIndex = currentImageIndex.value + scrollDirection
    if (newIndex >= images.value.length || newIndex < 0) {
      isAnimating = false
      return
    }

    currentImageIndex.value = newIndex

    setTimeout(() => {
      if (--steps > 0) {
        switchImages()
      } else {
        isAnimating = false
      }
    }, 10) // 每次切换间隔10毫秒
  }

  switchImages()
}

const preloadImages = () => {
  images.value.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

onMounted(() => {
  preloadImages()
  window.addEventListener('wheel', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
})
</script>

<template>
  <div class="image-container">
    <img v-for="(image, index) in images" :src="image" :key="index" class="image-slide" :class="{ active: index === currentImageIndex }" alt="Slideshow Image" />
  </div>
</template>

<style scoped>
.image-container {
  background-color: #2e21de;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.image-slide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0s ease-in-out, visibility 0s 1s;
}

.image-slide.active {
  visibility: visible;
  opacity: 1;
  transition: opacity 0s ease-in-out, visibility 0s;
}
</style>
