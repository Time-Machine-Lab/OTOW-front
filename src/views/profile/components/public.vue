<script setup lang="ts">
const userInfo = {

}
const publicList = [
  { name: "用户名（*）", content:"" },
  { name: "显示名称（*）", content:"" }
]
</script>

<template>
  <div class="public">
    <aside>
      <div>您的个人资料</div>
      <div>在此处添加有关您的信息。</div>
    </aside>
    <div class="publicList">
      <div
          v-for="(item,index) in publicList"
          :key="index"
          class="publicItem"
      >
        <div>{{item.name}}</div>
        <input v-model="item.content"/>
      </div>
    </div>
    <aside>
      <button>保存更改</button>
      <label>如果您进行了任何编辑，请记得在离开此页面之前保存。</label>
    </aside>
  </div>
</template>

<style scoped>
.public{
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr;
}
aside{
  width: 300px;
}
</style>