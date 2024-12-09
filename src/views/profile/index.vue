<script setup lang="ts">
import router from "@/router";

const tabs = [
  { name:"公开资料", router:"" },
  { name:"会员", router:"" },
]
</script>

<template>
  <div class="tabs">
    <div class=""></div>
    <div
        v-for="(item,index) in tabs"
        :key="index"
        class="tab"
        @click="router.push(item.router)"
    >
      <div>{{item.name}}</div>
    </div>
  </div>
  <div class="profile">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>