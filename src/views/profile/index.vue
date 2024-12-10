<script setup lang="ts">
import router from "@/router";
import {ref} from "vue";

const tabs = [
  { name:"个人资料", local:"" },
  { name:"会员", local:"" },
]
const currentIndex = ref(0)
// 通过tab切换内容展示
const selectTab = (index: any) =>{
  currentIndex.value = index;
  router.push(tabs[index].local)
}
</script>

<template>
  <div class="tabs">
    <h3>个人资料和目录</h3>
    <div class="tabBar">
      <div
          v-for="(item,index) in tabs"
          :key="index"
          class="tabItem"
          :class="{ active: currentIndex === index }"
          @click="selectTab(index)"
      >
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
  <div class="profile">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.tabs{
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 80px;
  align-items: center;
}
.tabBar{
  display: flex;
  flex-direction: row;
  height:100%;
  border-bottom: dashed 1px #797979;
  .tabItem{
    display: flex;
    align-items: center;
    margin-right:20px;
    cursor: pointer;
  }
  .tabItem.active{
    border-bottom: solid 2px #3a3a3a;
    font-weight: bold;
  }
}
</style>