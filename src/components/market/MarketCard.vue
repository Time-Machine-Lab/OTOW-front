<script lang="ts" setup>
import { type ProjectData } from '@/type/market/Market.ts';
// 使用 defineProps 来定义组件的 props
const props = defineProps<{
  marketData: ProjectData;
}>();
const clickProjectEmits = defineEmits(['clickProject']);
const clickProject = function (){
  clickProjectEmits('clickProject', props.marketData);
}
</script>

<template>
  <div class="market-card">
    <div class="top-picture" :style="{ backgroundImage: `url(${props.marketData.cover})` }" @click="clickProject"></div>
    <div class="title">
      <div class="project_type">
        {{props.marketData.codeLanguage}}
      </div>
      <div class="project_name">
        {{ props.marketData.name }}
      </div>

    </div>
    <div class="info">
      <span style="font-weight: lighter; margin-right: 10px">by</span>
      <span style="font-size: 24px">{{ props.marketData.nickname }}</span>

      <span style="padding-bottom: 10px; font-size:12px; margin-left: auto ">
        from
      </span>

      <span style=" font-size: 24px; margin-left: 10px"> {{ props.marketData.price }} RMB </span>
    </div>
    <div class="bottom-btn" @click="clickProject">
      <span>View Product</span>
      <svg class="icon" aria-hidden="true" style="font-size: 25px;">
        <use xlink:href="#icon-direction-right"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped>

.market-card {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  overflow: hidden;
}
.top-picture {
  width: 100%;
  height: 55%;
  cursor: pointer;
  background-size: cover; /* 保持图片原始大小 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 防止图片重复 */
}
.top-picture:hover{
  opacity: 0.7;
}
.title{
  width: 100%;
  height: 19%;
  padding: 15px 10px 5px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.title .project_type{
  font-size: 14px;
  font-weight: lighter;
}

.title .project_name{
  font-size: 28px;
}

.info {
  display: flex;
  align-items: center;
  width: 100%;
  height: 14%;
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding:  0 20px;
}
.bottom-btn{
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center; /* 垂直居中（可选） */
  width: 100%;
  height: 12%;
  cursor: pointer
}
</style>
