<script setup lang="ts">
import type {ProjectData, SearchProjectListParam} from "@/type/market/Market.ts";
import {reactive, ref, computed, watch, onMounted} from "vue";
import project from "./project.vue";
// import {tr} from "vuetify/locale";
import {searchProject} from '@/api/market/api.ts'
import MarketCard from "@/components/market/MarketCard.vue";
let searchParam = reactive<SearchProjectListParam>({
  name: '', // 确保这里有一个默认值
  codeLanguage: '',
  max: 1000,
  min: 0,
  page: 0,
  limit: 4,
});
const total = ref<number>(0);
const searchEvent = async function () {
  const res = await searchProject(searchParam);
  total.value = res.total
  marketCards.splice(0, marketCards.length, ...res.respList);
};

const handlePageChange = (newPage:any) => {
  console.log('当前页码:', newPage);
  // 在这里处理页面变化的逻辑，例如加载新页面的数据
};


const prevPage = (page :number)=>{
  searchParam.page = page
  searchEvent()
}

const nextPage = (page :number)=>{
  searchParam.page = page
  searchEvent()
}
// 虚拟滚动
async function load ({ done }: any) {
  searchParam.page += 1
  const res = await searchProject(searchParam)

  marketCards.push(...res.respList)

  done('ok')
}
onMounted(()=>{
  searchEvent();
})

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
const languageSelectTypes = ["Java", "Go", "Python","Php", "C++"]
const togglePanel = () => { activeLanguage.value = activeLanguage.value === null ? 0 : null }
const selectLanguage = (language: string) => {
  searchParam.codeLanguage = language
  activeLanguage.value = null
}

// 处理项目卡片点击事件
const projectPopDialog = ref(false)
const handleCardEvent = function (project: ProjectData){
  projectPopDialog.value = true;
  clickedProjectData = project;
}

// 列表点击后传递至项目详情页
let clickedProjectData: ProjectData = reactive<ProjectData>({
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
let marketCards = reactive<ProjectData[]>([]);
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
                  <span style="text-wrap: nowrap">语言: {{searchParam.codeLanguage}}</span>
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
<!--      <div class="center-text">-->
<!--         <p style="font-size: 80px; font-weight: bolder">Market</p>-->
<!--        <p style="margin: 10px; font-size: 25px">Curated products selected for digital design professionals like you.</p>-->
<!--      </div>-->

      <div class="card-list">
        <v-infinite-scroll :items="marketCards" :onLoad="load">
          <div class="grid-container">
            <template v-for="(item, index) in marketCards" :key="item">
              <MarketCard :market-data="item" @clickProject="handleCardEvent"></MarketCard>
            </template>
          </div>
        </v-infinite-scroll>
      </div>

<!--    <v-pagination  style="margin-top: 20px" v-model="searchParam.page" :length="Math.ceil(total / 2)" @update="handlePageChange" @prev="prevPage" @next="nextPage"></v-pagination>-->
  </div>
  <project v-if="projectPopDialog" @closePop="handleCardClose" :projectData="clickedProjectData"></project>
</template>

<style scoped>
.market-view{
  overflow: hidden;
  padding-bottom: 50px;
  padding-top: 20px;
}

.top-search-bar{
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
  position: sticky;
  top:200px;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 两列布局 */
  gap: 20px; /* 你可以根据需要调整网格项之间的间距 */
  padding: 10px 5vw;
}
@media (max-width: 1200px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 两列布局 */
    gap: 20px; /* 你可以根据需要调整网格项之间的间距 */
  }
}
@media (max-width: 700px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr; /* 两列布局 */
    gap: 20px; /* 你可以根据需要调整网格项之间的间距 */
  }
  .grid-container::-webkit-scrollbar {
    display: none;
  }
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