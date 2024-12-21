<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import Text from "@/components/normal/Text.vue";

let price = ref('0')
const ready = ['38','68','128']
let picture = ref(`/img/pay/0.png`)
const showPrice = () => {
  if(!useRoute().params.itemName) return;
  price.value = useRoute().params.itemName as string
  if(ready.includes(price.value)) {
    picture.value = `/img/pay/${price.value}.png`;
  }
}
onMounted(()=>{
  showPrice();
})
</script>

<template>
  <div class="pay">
    <div class="left flex">
      <h1>请支付{{price}}元</h1>
      <img :src="picture" alt="微信收款码">

    </div>
    <div class="right flex">
      <button><h3>我已支付完成</h3></button>
      <h4>支付完成后请等待人工审核</h4>
      <h4>（客服将在一个工作日内完成审核）</h4>
    </div>
  </div>

</template>

<style scoped>
.pay{
  display: flex;
  height:100vh;
  width:100vw;
  align-items: center;
  justify-content: center;
}
.flex{
  display: flex;
  height:100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left{
  margin-right: 50px;
}
.right{
  margin-left: 50px;
}
img {
  margin-top: 20px;
  height:60%;
}
button{
  background-color: black;
  padding:20px 50px;
  color: white;
  margin-bottom: 20px;
}
</style>