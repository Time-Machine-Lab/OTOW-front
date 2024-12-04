<script lang="ts" setup>
import { MarketData } from '@/type/market/Market.ts';

// 使用 defineProps 来定义组件的 props
const props = defineProps<{
  marketData: MarketData;
}>();
</script>

<template>
  <div class="market-card">
    <div class="top-picture" :style="{ backgroundImage: `url(${props.marketData.cover})` }"></div>
    <div class="title">
      {{ props.marketData.title }}
    </div>
    <div class="info">
      {{ props.marketData.info }}
    </div>
    <div class="bottom-btn">
      <span>View Product   -></span>

    </div>
  </div>
</template>

<style scoped>
.market-card {
  width: 100%;
  height: 100%;
}
.top-picture {
  width: 100%;
  height: 45%;
  background-size: auto; /* 保持图片原始大小 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 防止图片重复 */
}

.title {
  width: 100%;
  height: 20%;
  padding: 10px;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.info {
  width: 100%;
  height: 20%;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.bottom-btn{
  display: flex;
  align-items: center; /* 垂直居中（可选） */
  width: 100%;
  height: 15%;

}
</style>
