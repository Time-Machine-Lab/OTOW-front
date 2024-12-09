<template>
  <div class="mask-top" @click="closePopEvent" :style="maskStyle"/>
  <div class="project-pop" :class="{ 'hide': !isVisible }">
    <div style="width: 50%">
      <p>
        {{props.marketData.codeLanguage}}
      </p>

    </div>

    <div style="width: 50%">

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import type { projectData } from '@/type/market/Market.ts'

const props = defineProps<{
  marketData: projectData;
}>()
const closePopEmits = defineEmits(['closePop']);

const isVisible = ref(true) // 控制弹窗显示状态
const maskStyle = reactive({
  display: 'block'
}) // 控制 mask 的显示状态

const closePopEvent = function () {
  isVisible.value = false // 设置为不可见，触发隐藏动画
  maskStyle.display = 'none' // 立即隐藏 mask
  setTimeout(() => {
    closePopEmits('closePop');
  }, 1000) // 动画完成后触发关闭事件
}
</script>

<style scoped>
.project-pop {
  display: flex;
  width: 99vw;
  height: 90vh;
  padding: 5vh 3vw 0 3vw;
  background-color: #FFFBDD;
  border-radius: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2024;
  transform: translateY(0);
  transition: transform 1s cubic-bezier(0.42, 0, 1, 1);
  animation: pop 0.5s forwards;
}

.project-pop.hide {
  animation: hide 1s forwards;
}

.mask-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 12vh;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: show 0.5s forwards;
  animation-delay: 0.3s;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes hide {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
