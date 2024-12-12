<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
// 初始化图片数组
const images = ref<string[]>([])
for (let i = 1; i <= 76; i++) {
  images.value.push(new URL(`/src/assets/img/intro/ct_header_end${i}.webp`, import.meta.url).href)
}

const currentImageIndex = ref(0)
let isAnimating = false
const isVideoPlaying = ref(true)

const handleScroll = (event: WheelEvent) => {
  if (isAnimating || isVideoPlaying.value) return
  isAnimating = true

  const scrollDirection = event.deltaY > 0 ? 1 : -1
  let steps = 5 // 每次滚动切换六张图片

  const switchImages = () => {
    const newIndex = currentImageIndex.value + scrollDirection
    if (newIndex >= images.value.length || newIndex < 0) {
      isAnimating = false
      return
    }else{
      event.preventDefault()
    }
    currentImageIndex.value = newIndex
    setTimeout(() => {
      if (--steps > 0) {
        switchImages()
      } else {
        isAnimating = false
      }
    }, 1) // 每次切换间隔10毫秒
  }

  switchImages()
}

const preloadImages = () => {
  images.value.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

const fadeOutVideo = reactive({
  opacity: 1
})

const handleVideoEnded = () => {
  isVideoPlaying.value = false
  fadeOutVideo.opacity = 0
}

onMounted(() => {
  preloadImages()
  window.addEventListener('wheel', handleScroll, { passive: false })
  const videoElement = document.querySelector('.intro-video') as HTMLVideoElement
  if (videoElement) {
    setTimeout(() => {
      videoElement.addEventListener('ended', handleVideoEnded)
      videoElement.play()
    }, 100)
  }
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
  const videoElement = document.querySelector('.intro-video')
  if (videoElement) {
    videoElement.removeEventListener('ended', handleVideoEnded)
  }
})
const titleSlidUpClass = ref("")
const titleSlidUp = (isIntersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    const element = entry.target as HTMLElement
    if (isIntersecting) {
      element.classList.add("slid-up")
      element.classList.remove("unvisibility")
    }
    else {
      element.classList.add("unvisibility")
      element.classList.remove("slid-up")
    }
  })
}

interface feature{
  name: string
  desc: string
  img: string
}

const features = reactive<feature[]>([
  {name: "牛逼", desc: "除了牛逼还是牛逼", img: "/src/assets/img/intro/feature1.jpg"},
  {name: "牛逼啊", desc: "除了牛逼啊还是牛逼啊", img: "/src/assets/img/intro/feature2.jpg"},
  {name: "真的牛逼啊", desc: "除了真的的牛逼啊还是真的牛逼啊", img: "/src/assets/img/intro/feature3.jpg"}
])

</script>

<template>
  <div class="image-container"  >
    <video src="/src/assets/img/intro/intro.mp4" class="intro-video" :style="fadeOutVideo" muted></video>
    <img v-for="(image, index) in images" :src="image" :key="index" class="image-slide" :style=" index === currentImageIndex && !isVideoPlaying ? {visibility: 'visible',opacity : 1} : ''"  alt="Slideshow Image" />
  </div>

  <div class="blue-section">
    <div class="project-slogan unvisibility" v-intersect="titleSlidUp" >
      <p style="font-size: 50px; margin-bottom: 20px" :class="titleSlidUpClass">ONE TOUCHE ONE WORLD</p>
      <p style="width: 40%; margin: 0 auto; font-weight: lighter; animation-duration: 2s; " :class="titleSlidUpClass"> $1.0 billion in capital raised by some of the most prominent investors, Clear Street services hundreds of institutional clients and supports ~$60 billion in customer balances.</p>
    </div>

    <div class="diver"></div>

    <div class="features-container" v-intersect="titleSlidUp" >
      <div class="features-box" :class="titleSlidUpClass" v-for="(feature, index) in features ">
        <p style="font-size: 25px">{{feature.name}}</p>
        <div class="feature-img" :style="{ backgroundImage: `url(${feature.img})` }"> </div>
        <p>{{feature.desc}}</p>
      </div>
    </div>
  </div>


</template>

<style scoped>
p, span {
  color: #f4efd3;
}
.image-container {
  background-color: #2e21de;
  width: 100vw;
  height: 95vh;
  position: relative;
  overflow: hidden;
}

.unvisibility{
  visibility: hidden;
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
  transition: opacity 0s , visibility 0s 0s;
}

.image-slide.active {
  visibility: visible;
  opacity: 1;
}

.intro-video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10; /* 确保视频在最前面 */
  object-fit: cover;
}

.intro-video.hidden {
  display: none; /* 隐藏视频 */
}

.blue-section{
  background-color: #2e21de;
}

.project-slogan {
  height: 20vh;
  width: 100%;
  text-align: center;

  transition: opacity 0.5s ease-in-out;
}
.project-slogan p {
  animation-iteration-count: 1; /* 动画只播放一次 */
}

.diver{
  width: 100%;
  height: 5vh;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  background-color: #2e21de;
}

.features-container{
  background-color: #2e21de;
  width: 100%;
  height: 70vh;
  padding: 10vh 10vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.features-container .features-box{
  width: 30%;
  height: 100%;
}

.features-container .feature-img{
  margin: 10px 0;
  background-size: cover;
  background-position: 50% 50%;
  height: 80%;
  width: 100%;
  border-radius: 20px;
}


@keyframes slideUp {
  0% { opacity: 0; transform: translateY(5vh); }
  100% { opacity: 1; transform: translateY(0); }
}

.slid-up{
  animation-duration: 1s;
  animation-name: slideUp;
  opacity: 1;
}


</style>
