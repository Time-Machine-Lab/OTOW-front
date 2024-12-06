<script lang="ts" setup>
import {ref} from "vue";
import MarketView from '@/views/market/index.vue'
import Text from "@/components/normal/Text.vue";
import router from "@/router";
import Snackbar from "@/components/normal/Snackbar.vue";

const currentIndex = ref(0)
const tabs = [
  { name: 'market', component: MarketView },
  { name: 'home', component: MarketView },
]
const selectTab = (index: any) =>{
  currentIndex.value = index;
}
</script>

<template>
  <div class="home">
    <Snackbar></Snackbar>
    <!--通知滚动条-->
    <div class="notice"></div>
    <header class="tabs-bar">
      <nav class="side flex">logo</nav>
      <nav class="flex">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-button"
          :class="{ active: currentIndex === index }"
          @click="selectTab(index)"
        >
          <Text>{{ tab.name }}</Text>
        </div>
      </nav>
      <nav class="side flex">
        <button  @click="router.push('/login')">login</button>
      </nav>
    </header>
    <div class="tabs-content">
      <component
          v-for="(tab, index) in tabs"
          :key="index"
          :is="tab.component"
          :v-if="currentIndex === index"
      />
    </div>
  </div>
</template>


<style scoped>
.home {
  width: 100%;
}
.notice{
  background-color: #f4efd3;
  height:50px;
}

.tabs-bar {
  display: flex;
  background-color: #FFFBDD;
  height:70px;
}
.side{
  flex:1;
}
.tab-button {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
}

.tab-button.active {
  background-color: #f4efd3;
  border-bottom: 2px solid #f4efd3;
}
</style>