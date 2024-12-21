<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore.ts";
const authStore = useAuthStore();
const { userInfo } = authStore
const publicList = [
  { name: "用户名（*）", content:userInfo?.nickname },
  { name: "绑定邮箱（*）", content: userInfo?.email },
  { name: "绑定号码", content: userInfo?.phoneNum },
]
const privateList = [
  { name: "uid（*）", content: userInfo?.id },
]
</script>

<template>
  <div class="public">
    <aside>
      <h3>您的个人资料</h3>
      <div style="font-weight: lighter">在此处添加有关您的信息。</div>
    </aside>
    <div class="publicList">
      <div
          v-for="(item,index) in privateList"
          :key="index"
          class="publicItem"
      >
        <label>{{item.name}}</label>
        <input v-model="item.content" :disabled="true"/>
      </div>
      <div
          v-for="(item,index) in publicList"
          :key="index"
          class="publicItem"
      >
        <label>{{item.name}}</label>
        <input v-model="item.content"/>
      </div>
    </div>
    <aside>
      <button>保存更改</button>
      <div class="tip">如果您进行了任何编辑，请记得在离开此页面之前保存。</div>
    </aside>
  </div>
</template>

<style scoped>
.public{
  display: grid;
  grid-template-columns: 300px 1fr 250px;
  margin-top:50px;
}
.publicItem{
  box-sizing: border-box;
  margin-bottom:20px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
}
label{
  font-size: 0.7rem;
  font-weight: lighter;
  color: #757575;
  margin-bottom: 5px;
}
input{
  height:50px;
  border-radius: 2px 2px 0 0;
  border-bottom: solid 1px #e0e0e0;
  background-color: rgba(255, 255, 255, 0.71);
  padding-left:20px;
}
button{
  height:70px;
  width:100%;
  background-color: rgba(7, 7, 7, 0.91);
  color:white;
  font-size: 1.2rem;
}
.tip{
  font-weight: lighter;
  color: #2c2c2c;
  margin-top:20px;
}
@media (max-width: 1024px) {
  .public{

  }
}
@media (max-width: 700px) {
  .projectList{
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>