<script setup lang="ts">
import marketCard from '@/components/market/MarketCard.vue'
import type {projectData, searchProjectListParam} from "@/type/market/Market.ts";
import {reactive, ref, computed, watch} from "vue";
import project from "./project.vue";
// import {tr} from "vuetify/locale";
import {searchProject} from '@/api/market/api.ts'
const searchParam = reactive<searchProjectListParam>({
  name: '', // 确保这里有一个默认值
  language: '',
  max: 1000,
  min: 0,
  page: 0,
  limit: 8,
});

const searchEvent = async function () {
  console.log('Search parameters:', searchParam); // 检查 searchParam 的值
  const res = await searchProject(searchParam);
  marketCards.splice(0, marketCards.length, ...res);
};


// 搜索框宽度调整
const searchInputStyle = reactive({
  width: "40vw",
  height:'48px',
  borderRadius: '10px'
})

const smallSearchInput = function (){
  searchInputStyle.width = '20vw'
}

const resetSearchInput = function (){
  searchInputStyle.width = '40vw'
}

// 监听拓展面版，绑定拓展面板的参数,输入值为列表数量
const activePrice = ref<number | null>(null)
watch(activePrice, (newVal) => {
    if(newVal != null && newVal >= 0) {
      smallSearchInput()
      priceComponentStyle.width = '400px'
    }else{
      resetSearchInput()
      priceComponentStyle.width = '150px'
    }
  })

// 动态调整拓展面板宽度
let priceComponentStyle = reactive({
  flex: '0 0 auto',
  height: '100%',
  width: '150px'
})

// 金额范围绑定
const range = computed({
  get: () => [searchParam.min, searchParam.max],
  set: ([min, max]) => { searchParam.min = min; searchParam.max = max }
})

// 语言
const activeLanguage = ref<number | null>(null)
const languageSelectTypes = ["Java", "Go", "Python"]
const togglePanel = () => { activeLanguage.value = activeLanguage.value === null ? 0 : null }
const selectLanguage = (language: string) => { console.log(`选择了语言: ${language}`)
  activeLanguage.value = null
}

// 处理项目卡片点击事件
const projectPopDialog = ref(false)
const handleCardEvent = function (project: projectData){
  projectPopDialog.value = true;
  clickedProjectData = project;
}

// 列表点击后传递至项目详情页
let clickedProjectData: projectData = reactive<projectData>({
  id: '',
  name: '',
  introduce: '',
  price: 0,
  cover: '',
  codeLanguage: '',
  viewNums: 0,
  downloadNums: 0,
  nickname: ''
});

// 处理项目弹出关闭事件
const handleCardClose = function (){
  projectPopDialog.value = false;
}



// 创建 15 条模拟数据
const marketCards = reactive<projectData[]>([
  {id:'0', name: 'Product 1', introduce: 'introduce for product 1', price: 10, cover: '/img/projectCover.jpg', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},
  {id:'1', name: 'Product 2', introduce: 'introduce for product 1', price: 10, cover: '/img/projectCover.jpg', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},
  {id:'2', name: 'Product 3', introduce: 'introduce for product 1', price: 10, cover: '/img/projectCover.jpg', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},
  {id:'3', name: 'Product 3', introduce: 'introduce for product 1', price: 10, cover: '/img/projectCover.jpg', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},
  {id:'4', name: 'Product 3', introduce: 'introduce for product 1', price: 10, cover: '/img/projectCover.jpg', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},
  {id:'5', name: 'Product 3', introduce: 'introduce for product 1', price: 10, cover: '/img/projectCover.jpg', codeLanguage: "java1",viewNums: 10, downloadNums: 0, nickname:"dct"},
]);
</script>

<template>
  <div class="market-view">
      <div class="top-search-bar">
        <div class="search">
          <v-expansion-panels :style="priceComponentStyle" class="search-item" v-model="activePrice">
            <v-expansion-panel >
              <template v-slot:title>
                <v-btn variant="text">价格区间</v-btn>
              </template>
              <template v-slot:text>
                <div style="width: 350px; background-color: transparent;">
                  <v-range-slider
                      v-model="range"
                      :max="2000"
                      :min="0"
                      :step="5"
                      style="width: 350px"
                      hide-details
                      @click.stop
                  >
                    <template v-slot:prepend>
                      <v-text-field
                          v-model="range[0]"
                          density="compact"
                          style="width: 80px"
                          type="number"
                          variant="outlined"
                          hide-details
                          single-line
                          @click.stop
                      ></v-text-field>
                    </template>
                    <template v-slot:append>
                      <v-text-field
                          v-model="range[1]"
                          density="compact"
                          style="width: 100px"
                          type="number"
                          variant="outlined"
                          hide-details
                          single-line
                          @click.stop
                      ></v-text-field>
                    </template>
                  </v-range-slider>
                </div>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels v-model="activeLanguage" style="width: 150px" class="search-item">
            <v-expansion-panel>
              <template v-slot:title>
                <div @click="togglePanel">
                  <span style="text-wrap: nowrap">语言</span>
                </div>
              </template>
              <template v-slot:text>
                <v-list dense>
                  <v-list-item v-for="(item, index) in languageSelectTypes" :key="index" @click="selectLanguage(item)" >
                    {{ item }}
                  </v-list-item>
                </v-list>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
          <input :style="searchInputStyle" placeholder="Search" v-model="searchParam.name">
          <div style="display: inline-flex;align-items: center" @click="searchEvent">
            <svg class="icon search-btn" aria-hidden="true" >
              <use xlink:href="#icon-search"></use>
            </svg>
          </div>

        </div>
      </div>
      <div class="center-text">
         <p style="font-size: 80px; font-weight: bolder">Market</p>
        <p style="margin: 10px; font-size: 25px">Curated products selected for digital design professionals like you.</p>
      </div>

      <div class="card-list">
        <div v-for="(marketCard, index) in marketCards">
          <marketCard :market-data="marketCard" @clickProject="handleCardEvent"></marketCard>
        </div>
      </div>

    <v-pagination :length="4"></v-pagination>
  </div>
  <project v-if="projectPopDialog" @closePop="handleCardClose" :projectData="clickedProjectData"></project>
</template>

<style scoped>
.market-view{
  overflow: hidden;
}

.top-search-bar{
  position: relative;
  display: flex;
  align-items: center; /* 垂直居中（可选） */
  width: 80%;
  margin: 0 10%;
  height: 60px;
  border-radius: 20px;
}

.search-item{
  margin-right: 20px;
}

.top-search-bar .search{
  margin-right: 20vw;
  display: flex;
  height: 45px;
}

.v-expansion-panel{
  border-radius: 10px;
  border: none;
  background-color: transparent;
}
.search >>> .v-expansion-panel-title{
  padding: 6px 24px;
}
.search >>> .v-list{
  background-color: transparent;
}

.top-search-bar input{
  padding: 1px 10px;
  height: 100%;
  font-size: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.2);
}

.center-text{
  text-align: center;
  width: 400px;
  margin: 3vh auto;
}

.card-list {
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  max-width: calc(4 * 400px + 3 * 50px + 6vw); /* 控制最大宽度以限制列数 */
  gap: 50px; /* 元素之间的间隔 */
  padding: 0 3vw; /* 左右 padding 为 5vw */
  grid-auto-rows: 650px;
}
.search-btn{
  width: 48px;
  height: 48px;
  margin-left: 20px;
  border-radius: 15px;
  padding: 10px;
  font-size: 35px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.search-btn:hover{
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4);
  transform: scale(1.1);

}

</style>