<script setup lang="ts">
import Text from "@/components/normal/Text.vue";
import {onMounted, ref} from "vue";
import {searchProject} from "@/api/market/api.ts";
import type {WorkProject} from "@/api/workbench/type.ts";

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
    <div>
      <Text>我的工作台</Text>
    </div>
    <div class="projectList">
      <div class="projectCard">
        <button @click="">
          <Text>+ Creat new project</Text>
        </button>
      </div>
      <div
        v-for="(item,index) in WorkList"
        :key="index"
        class="projectCard"
      >
        <Text>{{item.name}}</Text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workbench{
  background-color: rgba(255, 255, 255, 0.37);
}
.projectList{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.projectCard{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: solid 1px #e0e0e0;
  border-radius: 10px;
  margin:20px;
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
@media (max-width: 700px) {
  .projectList{
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>