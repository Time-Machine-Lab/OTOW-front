<script setup lang="ts">

</script>

<template>
  <div class="login-container">
    <div class="left-img">
      <img src="https://ideaape.com/static/images/2_1.avif">
    </div>
    <div class="login-box">
        <p class="slogan">
          ONE TOUCH ONE WORLD !
        </p>
    </div>
    <div class="right-img">
      <img src="https://ideaape.com/static/images/neck.avif">
    </div>
  </div>
</template>

<style scoped>
.login-container{
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f0eae1 ;
}
.left-img img{
  position: absolute;
  left: 5vw;
  top: 10vh;
  width: 17vw;
  height: 60vh;
}
.right-img img{
  position: absolute;
  right: 0;
  width: 17vw;
  height: 100vh;
}
.login-container .login-box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  border-radius: 20px;
  background-color: #094255;
}

.login-container .login-box .slogan {
  width: 100%;
  height: 60px;
  margin-top: 60px;
  font-size: 25px;
  text-align: center;
  font-family: "阿里妈妈灵动体 VF Thin", sans-serif;
  font-weight: bold;
  background: linear-gradient(90deg, #ff7e5f, #feb47b); /* 渐变背景 */
  -webkit-background-clip: text; /* 仅对文本剪裁背景 */
  -webkit-text-fill-color: transparent; /* 使文本本身透明，以便显示背景 */
  line-height: 60px; /* 垂直居中文本 */
}


</style>