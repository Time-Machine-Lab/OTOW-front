<script setup lang="ts">
import marketCard from '@/components/market/MarketCard.vue'
import {reactive} from "vue";
const searchParam = reactive({
  searchWord: null
})

// 创建 15 条模拟数据
const marketCards = reactive<MarketData[]>([
  { title: 'Product 1', description: 'Description for product 1', price: 10, cover: '' },
  { title: 'Product 2', description: 'Description for product 2', price: 20, cover: '' },
  { title: 'Product 3', description: 'Description for product 3', price: 30, cover: '' },
  { title: 'Product 4', description: 'Description for product 4', price: 40, cover: '' },
  { title: 'Product 5', description: 'Description for product 5', price: 50, cover: '' },
  { title: 'Product 6', description: 'Description for product 6', price: 60, cover: '' },
  { title: 'Product 7', description: 'Description for product 7', price: 70, cover: '' },
  { title: 'Product 8', description: 'Description for product 8', price: 80, cover: '' },
  { title: 'Product 9', description: 'Description for product 9', price: 90, cover: '' },
  { title: 'Product 10', description: 'Description for product 10', price: 100, cover: '' },
  { title: 'Product 11', description: 'Description for product 11', price: 110, cover: '' },
  { title: 'Product 12', description: 'Description for product 12', price: 120, cover: '' },
  { title: 'Product 13', description: 'Description for product 13', price: 130, cover: '' },
  { title: 'Product 14', description: 'Description for product 14', price: 140, cover: '' },
  { title: 'Product 15', description: 'Description for product 15', price: 150, cover: '' }
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
  width: 100vw;
  height: 100vh;
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
  height: 35px;
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
  max-width: calc(4 * 400px + 3 * 20px + 10vw); /* 控制最大宽度以限制列数 */
  gap: 20px; /* 元素之间的间隔 */
  padding: 0 5vw; /* 左右 padding 为 5vw */
}

</style>