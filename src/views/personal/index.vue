<script setup lang="ts">
import svg1 from "@/views/personal/icon/svg1.vue";
import svg2 from "@/views/personal/icon/svg2.vue";
import svg3 from "@/views/personal/icon/svg3.vue";
import router from "@/router";
import svg4 from "@/views/personal/icon/svg4.vue";

const setList = [
  { name: '个人资料和目录',router: '/profile', desc: '编辑您的个人资料和目录信息', icon: svg1 },
  { name: '我的工作台',router: '/workbench', desc: '查看您收藏的模板', icon: svg4 },
  { name: '收藏',router: '/error', desc: '查看您收藏的模板', icon: svg2 },
  { name: '设置',router: '/error', desc: '查看您收藏的模板', icon: svg3 },
]
</script>

<template>
  <div class="personal">
    <div class="welcome">
      <div class="desc">欢迎</div>
      <h1>我的账户</h1>
      <h4>用户仪表盘</h4>
      <div class="desc">查看和编辑与您的个人资料、提交、招聘广告、课程、订阅、订单、账单相关的信息，并访问独家内容。</div>
    </div>
    <div
        v-for="(item,index) in setList"
        :key="index"
        class="setItem"
        @click="router.push(item.router)"
    >
      <component :is="item.icon" class="icon"/>
      <div class="name">{{item.name}}</div>
      <div class="desc">{{item.desc}}</div>
    </div>
  </div>

</template>

<style scoped>
.personal{
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr;
}
.welcome{
  grid-row: 1 / 4;
  margin:20px;
  .desc{
    font-weight: lighter;
    margin-bottom: 10px;
  }
  h4{
    margin-top:50px;
    margin-bottom: 5px;
  }
}
.setItem{
  height:200px;
  margin:20px;
  background-color: rgba(255, 255, 255, 0.71);
  border-radius: 10px;
  box-sizing: border-box;
  padding:30px 30px;
  cursor: pointer;
  .icon{
    width:35px;
    height:35px
  }
  .name{
    margin-top:25px;
    font-weight: bold;
  }
  .desc{
    font-weight: lighter;
    margin-top:5px;
  }
}
@media (max-width: 1500px) {
  .personal{
    display: grid;
    grid-template-columns: 300px 1fr 1fr;
  }
}
@media (max-width: 1100px) {
  .personal{
    display: grid;
    grid-template-columns: 300px 1fr;
  }
}
@media (max-width: 900px) {
  .personal{
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>