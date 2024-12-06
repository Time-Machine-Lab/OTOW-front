<script lang="ts" setup>
import { type MarketData } from '@/type/market/Market.ts';

// 使用 defineProps 来定义组件的 props
const props = defineProps<{
  marketData: MarketData;
}>();
</script>

<template>
  <div class="market-card">
    <div class="top-picture" :style="{ backgroundImage: `url(${props.marketData.cover})` }"></div>
    <div class="title">
      <div class="project_type">
        {{props.marketData.codeLanguage}}
      </div>
      <div class="project_name">
        {{ props.marketData.name }}
      </div>

    </div>
    <div class="info">
      {{ props.marketData.introduce }}
    </div>
    <div class="bottom-btn">
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
  background-size: cover; /* 保持图片原始大小 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 防止图片重复 */
}
.title{
  width: 100%;
  height: 15%;
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
  width: 100%;
  height: 15%;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.bottom-btn{
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center; /* 垂直居中（可选） */
  width: 100%;
  height: 15%;
  cursor: pointer
}
</style>
