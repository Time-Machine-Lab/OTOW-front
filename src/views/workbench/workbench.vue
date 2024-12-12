<script setup lang="ts">
import Text from "@/components/normal/Text.vue";
import {onMounted, ref} from "vue";
import {searchProject} from "@/api/market/api.ts";
import type {WorkProject} from "@/api/workbench/type.ts";
import router from "@/router";

let WorkList = ref<WorkProject[]>([])
const getWorkList = async () => {
  WorkList.value = await searchProject()
  console.log(WorkList.value)
}
onMounted(() => {
  getWorkList()
})
</script>

<template>
  <div class="workbench">
    <Text><h3>我的工作台</h3></Text>
    <div class="projectList">
      <div class="projectCard">
        <button @click="">
          <Text>+ Creat new project</Text>
        </button>
      </div>
      <div
        v-for="(item,index) in WorkList"
        :key="index"
        class="projectCard active"
        @click="router.push({path: 'workbench',query: {id: item.id}})"
      >
        <img v-if="item.cover" :src="item.cover" alt="项目封面"/>
        <div class="desc">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workbench{
  background-color: rgba(255, 255, 255, 0.37);
  width:90%;
  margin: auto;
  padding-top: 10px;
}
.projectList{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.projectCard{
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 250px;
  border: solid 1px #e0e0e0;
  border-radius: 10px;
  margin:20px;
  img{
    width:100%;
    height:70%;
  }
  .desc{
    padding: 10px 30px;
    background-color: white;
    width:100%;
    display: flex;
    align-items: center;
    flex:1;
    font-weight: bold;
  }
}
.active{
  cursor: pointer;
}
.active:hover{
  transform: scale(1.02);
}
button{
  background-color: #000000;
  color: white;
}
@media (max-width: 1024px) {
  .projectList{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .projectList{
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>