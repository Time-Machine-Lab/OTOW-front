<script setup lang="ts">
import marketCard from '@/components/market/MarketCard.vue'
import type {MarketData} from "@/type/market/Market.ts";
import {reactive} from "vue";
const searchParam = reactive({
  searchWord: null
})

// 创建 15 条模拟数据
const marketCards = reactive<MarketData[]>([
  {id:'0', name: 'Product 1', introduce: 'introduce for product 1', price: 10, cover: 'https://www.clearstreet.io/imgs/home/header/webp/ct_header_end76.webp', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},

]);
</script>

<template>
  <div class="market-view">
      <div class="top-search-bar">
        <input v-model="searchParam.searchWord">
      </div>
      <div class="center-text">
         <p style="font-size: 80px; font-weight: bolder">Market</p>
        <p style="margin: 10px; font-size: 25px">Curated products selected for digital design professionals like you.</p>
      </div>

      <div class="card-list">
        <div v-for="(marketCard, index) in marketCards">
          <marketCard :market-data="marketCard"></marketCard>
        </div>
      </div>


  </div>
</template>

<style scoped>
.market-view{
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f0eae1 ;
  overflow: hidden;
}

.top-search-bar{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中（可选） */
  width: 100%;
  height: 80px;
}


.top-search-bar input{
  width: 50vw;
  height: 45px;
  margin:0 auto;
  border-radius: 15px;
  font-size: 20px;
  padding: 5px;
  background-color: rgba(0,0,0,0.1);
}

.center-text{
  text-align: center;
  width: 400px;
  margin: 0 auto;
  margin-top: 5vh;
}

.card-list {
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  max-width: calc(4 * 350px + 3 * 20px + 10vw); /* 控制最大宽度以限制列数 */
  gap: 20px; /* 元素之间的间隔 */
  padding: 0 5vw; /* 左右 padding 为 5vw */
  grid-auto-rows: 650px;
}

</style>