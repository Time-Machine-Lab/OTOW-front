<script lang="ts" setup>
import {ref} from "vue";
import MarketView from '@/views/market/index.vue'
import WorkbenchView from '@/views/workbench/workbench.vue'
import Text from "@/components/normal/Text.vue";
import router from "@/router";
import Snackbar from "@/components/normal/Snackbar.vue";

// 导航栏
const currentIndex = ref(0)
const tabs = [
  { name: 'market', local: '/market' },
  { name: 'home', local: '/market' },
]
// 通过tab切换内容展示
const selectTab = (index: any) =>{
  currentIndex.value = index;
  router.push(tabs[index].local)
}

// 登陆状态
import { useAuthStore } from "@/stores/authStore.ts";
const authStore = useAuthStore();
const notice = ref('')
</script>

<template>
  <div class="home">
    <Snackbar></Snackbar>
    <!--通知滚动条-->
    <div class="notice" v-if="notice">{{notice}}</div>
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
        <button v-if="!authStore.isLoggedIn" @click="router.push('/login')">login</button>
        <button v-else @click="router.push('/personal')">头像</button>
        <button class="workBtn" @click="router.push('/workbench')">我的工作台</button>
      </nav>
    </header>
    <div class="tabs-content">
      <RouterView></RouterView>
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
  .search{
    background-color: rgba(0, 0, 0, 0.07);
    padding: 10px 30px;
    border-radius: 10px;
    margin-left:20px;
  }
  .workBtn{
    margin-left:20px;
    border: 1px solid #3a3a3a;
  }
}

.tabs-content{
  width:90%;
  margin:auto;
}
</style>