<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
// 初始化图片数组
const images = ref<string[]>([])
for (let i = 1; i <= 76; i++) {
  images.value.push(`/img/intro/ct_header_end${i}.webp`)
}

const currentImageIndex = ref(0)
let isAnimating = false
const isVideoPlaying = ref(true)


const handleScroll = (event: WheelEvent) => {
  switchPicture(event)
  videoTitleScroll(event)
}

const section1Display = ref(true)
const section1Intersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  section1Display.value = isIntersecting
}

// 首屏图片滚动切换
const switchPicture = function (event: WheelEvent) {
  if(!section1Display.value){
    return
  }
  if (isAnimating || isVideoPlaying.value) return
  isAnimating = true
  const scrollDirection = event.deltaY > 0 ? 1 : -1
  let steps = 5 // 每次滚动切换六张图片
  // 首屏页切换逻辑
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
  // 仅当向上滚动并且滚动到页面顶部时触发图片切换
  if (scrollDirection === -1 && window.scrollY > 0) {
    isAnimating = false
    return
  }
  switchImages()
}
const videoTitle = ref<any>(null);
const whiteMaskStyle = reactive({
  opacity: 0,
})


const videoTitleDisplay = ref(false)
// section2 背景视频绑定样式
const section2VideoStyle = reactive({
  position: '',
  top: 0
})
const visibilitySection2Video = ref(false)
const videoTitleIntersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  videoTitleDisplay.value = isIntersecting
  entries.forEach(entry => {
    const element = entry.target as HTMLElement
    if (isIntersecting) {
      element.classList.add("slid-up")
      element.classList.remove("unvisibility")
      videoTitleDisplay.value = true
      section2VideoStyle.position = 'fixed'
      visibilitySection2Video.value = true
      const videoElement = document.querySelector('.section2-video') as HTMLVideoElement
      videoElement.play()
    }
    else {
      element.classList.add("unvisibility")
      element.classList.remove("slid-up")
      videoTitleDisplay.value = false
      visibilitySection2Video.value = false
    }
  })
}
// 下滑紫色背景淡出样式
const blueMaskStyle = reactive({
  opacity: 1,
})

const section3Style = reactive({
  zIndex: 0,
})
// 获取屏幕像素高度用于vh单位判断
const twentyVhInPixels = window.innerHeight
// 背景从蓝色转为视频转白色效果
const videoTitleScroll = function (event: WheelEvent){
  const scrollDirection = event.deltaY > 0 ? 1 : -1
  // 如果视频标题没有在页面中展示则直接不做任何逻辑
  if(!videoTitleDisplay.value){
    return
  }
  // 当视频文字从下向上滑动到中间时，蓝色遮罩逐渐消失
  const rect = videoTitle.value.getBoundingClientRect();
  if(scrollDirection === 1 && rect.top < twentyVhInPixels * 0.3){
    whiteMaskStyle.opacity = Math.min(whiteMaskStyle.opacity + 0.1, 1)
    // 兜底，当视频标题完全消失时，白色遮罩完全出现
    if(rect.top < twentyVhInPixels){
      whiteMaskStyle.opacity = 1
    }
    if(whiteMaskStyle.opacity === 1){
      section3Style.zIndex = 1
    }
  }

  if(scrollDirection === -1 && rect.top > twentyVhInPixels * 0.1){
    whiteMaskStyle.opacity = Math.max(whiteMaskStyle.opacity - 0.1, 0)
  }

  if(scrollDirection === 1){
    blueMaskStyle.opacity = Math.max(blueMaskStyle.opacity - 0.2, 0)
  }
  if(scrollDirection === -1 && rect.top > twentyVhInPixels * 0.5){
    blueMaskStyle.opacity = Math.min(blueMaskStyle.opacity + 0.2, 1)
    if(blueMaskStyle.opacity === 1){
      section3Style.zIndex = 0
    }
  }
}

const section3VideoBox1Style = reactive({
  transform: 'scale(1)',
  opacity: 1
});

const section3VideoBox2Style = reactive({
  transform: 'scale(1)',
  opacity: 1
});


const section3BoxFadeout = function (event: WheelEvent){
  const videoElement1 = document.querySelector('.section3-video1') as HTMLVideoElement
  const videoElement2 = document.querySelector('.section3-video2') as HTMLVideoElement;
  const rect1 = videoElement1.getBoundingClientRect()
  const rect2 = videoElement2.getBoundingClientRect()
  if(rect1.top < twentyVhInPixels){

  }
}

const preloadImages = () => {
  images.value.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
// 首屏视频加载后消失绑定动画
const fadeOutVideo = reactive({
  opacity: 1
})
// 视频播放后执行钩子
const handleVideoEnded = () => {
  isVideoPlaying.value = false
  fadeOutVideo.opacity = 0
}

const section3AutoPlay = (isIntersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  const videoElement1 = document.querySelector('.section3-video1') as HTMLVideoElement
  videoElement1.play()
  const videoElement2 = document.querySelector('.section3-video2') as HTMLVideoElement
  videoElement2.play()





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
// 上滑文字绑定Class
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
  {name: "牛逼", desc: "除了牛逼还是牛逼", img: '/img/intro/feature1.jpg'},
  {name: "牛逼啊", desc: "除了牛逼啊还是牛逼啊", img: '/img/intro/feature2.jpg'},
  {name: "真的牛逼啊", desc: "除了真的的牛逼啊还是真的牛逼啊", img: '/img/intro/feature3.jpg'}
])

</script>

<template>
  <div class="image-container" v-intersect="section1Intersect">
    <video src="/img/intro/intro.mp4" class="intro-video" :style="fadeOutVideo" muted></video>
    <img v-for="(image, index) in images" :src="image" :key="index" class="image-slide" :style=" index === currentImageIndex && !isVideoPlaying ? {visibility: 'visible',opacity : 1} : ''"  alt="Slideshow Image" />
  </div>

  <div class="diver-title">
    <div class="project-slogan unvisibility" v-intersect="titleSlidUp" >
      <p style="font-size: 50px; margin-bottom: 20px" :class="titleSlidUpClass">ONE TOUCHE ONE WORLD</p>
      <p style="width: 40%; margin: 0 auto; font-weight: lighter; animation-duration: 2s; " :class="titleSlidUpClass"> $1.0 billion in capital raised by some of the most prominent investors, Clear Street services hundreds of institutional clients and supports ~$60 billion in customer balances.</p>
    </div>
    <div class="diver"></div>
  </div>

  <div class="section2" >
    <div class="blue-mask mask" :style="blueMaskStyle"/>
    <div class="white-mask mask" :style="whiteMaskStyle"/>
    <div class="features-container" v-intersect="titleSlidUp" >
      <div class="features-box" :class="titleSlidUpClass" v-for="(feature, index) in features ">
        <p style="font-size: 25px">{{feature.name}}</p>
        <div class="feature-img" :style="{ backgroundImage: `url(${feature.img})` }"> </div>
        <p>{{feature.desc}}</p>
      </div>
    </div>

    <div class="video-section">
      <video v-show="visibilitySection2Video" class="section2-video" :style="section2VideoStyle" style="position: fixed" src="/img/intro/section2.mp4" muted loop></video>
      <div class="video-title" ref="videoTitle"  v-intersect="videoTitleIntersect">
         <p>这是一个非常牛逼的项目</p>
      </div>

    </div>
  </div>

  <div class="section3" :style="whiteMaskStyle" >
    <h1 style="font-size: 70px; font-weight: bolder; letter-spacing: 10px;text-align: center; margin-bottom: 10vh; color: #5549ed" v-intersect="titleSlidUp">
      Designed for <br/> today’s complex, <br/>global market.
    </h1>

    <div class="section3-box" v-intersect="section3AutoPlay" >
      <video class="section3-video1" src="/img/intro/section3video1.mp4" muted loop></video>
      <div class="section3-box-title">
        <p>Built for <br/> Multi-Asset Clearing</p>
        <div class="section3-box-bottom">
          <span>One platform for all asset classes</span>
          <span>Data available in real-time</span>
          <span>Information held in a single system</span>
        </div>
      </div>
    </div>

    <div class="section3-box" v-intersect="section3AutoPlay" >
      <video class="section3-video2" src="/img/intro/section3video2.mp4" muted loop></video>
      <div class="section3-box-title">
        <p>Built for <br/> Multi-Asset Clearing</p>
        <div class="section3-box-bottom">
          <span>One platform for all asset classes</span>
          <span>Data available in real-time</span>
          <span>Information held in a single system</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section4">
      <div>

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
  z-index: 99;
  overflow: hidden;
}

.unvisibility{
  opacity: 0;
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

.diver-title{
  position: relative;
  background-color: #2e21de;
  z-index: 99;
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
}

.features-container{
  position: relative;
  z-index: 2;
  width: 100%;
  height: 75vh;
  padding: 10vh 10vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
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

 .section2 {
   position: relative;
   height: 170vh;
   z-index: 1; /* 设置较高的z-index */
 }

 .mask{
   position: fixed;
   top: 0;
   height: 100vh;
   z-index: 1;
 }

 .blue-mask{
   width: 100%;
   height: 100%;

   background-color: #2e21de; /* 确保背景色覆盖 */
 }
 
 .white-mask{
   width: 100%;
   height: 200vh;
   background-color: #292949;
 }


.section2 .video-section {
  position: absolute; /* 更改为relative，确保在背景上显示 */
  width: 100%;
  height: 100vh;
}

.section2-video{
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  transition-delay: 0s;
  animation-delay: 0s;
}

.section2 .video-section .video-title {
  position: absolute;
  width: 100%;
  z-index: 10;
  padding-top: 10vh;
  top: 50vh;
  font-size: 50px;
}

.section2 .video-section .video-title p {
  text-align: center;
  letter-spacing: 10px;
  color: white;
}

.section3{
  position: relative;
  z-index: 1;
  width: 100vw;
  padding: 0 10vw;
}

.section3-box{
  position: relative;
  margin: 0 auto;
  margin-bottom: 15vh;
  width: 55vw;
  height: 48vh;
  background-color: white;
  border-radius: 60px;
  overflow: hidden;
}

.section3-box video{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section3-box .section3-box-title{
  z-index: 2;
  position: absolute;
  left: 20px;
  bottom: 50px;
  width: 60%;

}
.section3-box .section3-box-title p{
  color: #2e21de;
  font-size: 40px;
  font-weight: bolder;
}

.section3-box .section3-box-bottom{
  display: flex;
  align-items: center;

}
.section3-box .section3-box-bottom span{
  padding:  0 5px;
  width: 180px;
  font-size: 14px;
  border-left: 1px solid rgba(0,0,0,0.4);
  color: #2e21de;
  font-weight: bolder;

}

.section4{
  height: 100vh;
  width: 100vw;
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
