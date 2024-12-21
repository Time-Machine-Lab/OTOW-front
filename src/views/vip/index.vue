<script setup lang="ts">
import router from "@/router";

const vipList =[
  {name: "Basic", price: "38", desc: ["提供 1 个项目模板","每月免费生成 2 个项目"]},
  {name: "Professional", price: "68", desc: ["提供 1 个项目模板","每月免费生成 5 个项目"]},
  {name: "Enterprise", price: "128", desc: ["提供 2 个项目模板","每月免费生成 10 个项目","项目市场产品 10% 折扣"]}
]
</script>

<template>
  <div class="vip">
    <div>
      <label>Professional Plans</label>
      <h1>Choose the <br/> best plan for you.</h1>
    </div>
    <div class="vipList">
      <div
          v-for="(item,index) in vipList"
          :key="index"
          class="vipItem"
      >
        <h2>{{item.name}}<br/> Plan Member</h2>
        <div>
          <span style="font-weight: bold;font-size:4rem">￥{{item.price}}</span>
          <span>/ month</span>
        </div>
        <button @click="router.push({ name: 'pay', params: { itemName: item.price } })">Select {{item.name}}</button>
        <ul>
          <li v-for="(desc, descIndex) in item.desc" :key="descIndex">
            {{ desc }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <footer>
    <label>客服请联系WX: geniussse</label>
  </footer>
</template>

<style scoped>
.vip{
  width:90%;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 50px;
}
h1{
  margin-top:20px;
  font-size: 2.5rem;
  line-height: 3rem;
}
.vipList{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top:60px;
}
.vipItem{
  border-radius: 10px;
  background-color: black;
  padding: 40px;
  color: white;
}
button{
  border: solid 1px white;
  width:80%;
  height:4rem;
}
ul{
  padding-left:15px;
  margin-top: 60px;
}
footer{
  height:100px;
  padding: 10px 5vw;
}
</style>