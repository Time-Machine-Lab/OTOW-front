<script setup lang="ts">

</script>

<template>
  <div class="login-container">
    <div class="left-img">
      <img src="https://ideaape.com/static/images/2_1.avif">
    </div>
    <div class="login-box">
        <div class="slogan">
          ONE TOUCH ONT WORLD !
        </div>
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
.login-container .login-box .slogan{
  width: 100%;
  height: 60px;
  margin-top: 100px;
  font-size: 25px;
  text-align: center;
}

</style>