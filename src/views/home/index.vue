<template>
  <div></div>
<!--  <div class="menu-container">-->
<!--    <h3>添加菜单</h3>-->
<!--    <div v-for="(menu, index) in menus" :key="index" class="menu-item">-->
<!--      <input-->
<!--          type="text"-->
<!--          v-model="menu.name"-->
<!--          placeholder="请输入菜单子项名称"-->
<!--          :disabled="!isEditingMenu(index)"-->
<!--      />-->
<!--      <div class="sub-options">-->
<!--        <label>-->
<!--          <input type="radio" v-model="menu.type" value="table" /> 表格-->
<!--        </label>-->
<!--        <label>-->
<!--          <input type="radio" v-model="menu.type" value="other" /> 其他-->
<!--        </label>-->
<!--        <div v-if="menu.type === 'table'" class="table-headers">-->
<!--          <div v-for="(header, headerIndex) in menu.headers" :key="headerIndex" class="table-header-item">-->
<!--            <input type="text" v-model="header.name" placeholder="请输入表头标题" />-->
<!--            <button @click="removeTableHeader(index, headerIndex)">-</button>-->
<!--          </div>-->
<!--          <button @click="addTableHeader(index)">+</button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <button @click="removeMenu(index)">-</button>-->
<!--    </div>-->
<!--    <button @click="addMenu">+</button>-->
<!--  </div>-->
</template>
<script lang="ts" setup>
// export default {
//   data() {
//     return {
//       menus: [
//         // 初始菜单数据
//       ],
//     };
//   },
//   methods: {
//     isEditingMenu(index) {
//       // 判断是否允许编辑的逻辑
//       return true; // 示例，实际逻辑需根据需求实现
//     },
//     addMenu() {
//       // 添加菜单的逻辑
//       this.menus.push({ name: '', type: '', headers: [] });
//     },
//     removeMenu(index) {
//       // 删除菜单的逻辑
//       this.menus.splice(index, 1);
//     },
//     addTableHeader(index) {
//       // 添加表头的逻辑
//       this.menus[index].headers.push({ name: '' });
//     },
//     removeTableHeader(menuIndex, headerIndex) {
//       // 删除表头的逻辑
//       this.menus[menuIndex].headers.splice(headerIndex, 1);
//     },
//   },
// };
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-container {
  margin-top: 20px;
}

.menu-item {
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sub-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.table-headers {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.table-header-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>