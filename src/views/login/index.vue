<script setup lang="ts">
import {reactive} from "vue";
// import {login} from "@/api/login/api.ts";
import router from "@/router";

const loginParam = reactive({
  username: null,
  password: null,
})
const loginEvent = function (){
  router.push('/personal')
}
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
        <div class="login-form">
            <div class="form-item">
              <p>邮箱</p>
              <input v-model="loginParam.username">
            </div>
          <div class="form-item">
            <p>密码</p>
            <input v-model="loginParam.password">
          </div>
        </div>

        <div class="form-bottom">
          <button @click="loginEvent" class="login-btn">Login</button>
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
  width: 50vw;
  max-width: 800px;
  height: 40vh;
  max-height: 500px;
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
  background: linear-gradient(90deg, #ec4e2a, #54929a); /* 渐变背景 */
  -webkit-background-clip: text; /* 仅对文本剪裁背景 */
  -webkit-text-fill-color: transparent; /* 使文本本身透明，以便显示背景 */
  line-height: 60px; /* 垂直居中文本 */
}

.login-form{
  width: 60%;
  height: 40%;
  margin:  0 auto;
}
.form-bottom{
  width: 60%;
  height:  30%;
  margin:  0 auto;
}

.form-item{
  margin-bottom: 20px;
}
.form-item p{
  color: #f0eae1 ;
  font-size: 18px;
  letter-spacing: 5px;
  margin-bottom: 10px;
  font-family: "阿里妈妈灵动体 VF Thin", sans-serif;
}

.form-item input{
  height: 32px ;
  width: 65%;
  border: none;
  outline: none;
  border-radius:  20px;
  background-color: #f0eae1;
  color: #000000;
  margin-bottom: 0;
  padding: .5rem .75rem;
  font-size: 1rem;
  line-height: 1.6;
}
.login-btn{
  border-radius: 20px;
  height: 40px;
  width: 150px;
  font-size: 20px;
  box-shadow: 5px 5px 20px rgba(255, 255, 255, 0.3);
  background-color: #094255;
  color: #007bff;
  border: none;
  cursor: pointer;
  transition-duration: 0.5s;
}
.login-btn :hover {
  background-color: #5bb6d5;
}
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "阿里妈妈刀隶体 Regular";font-weight: 400;src: url("//at.alicdn.com/wf/webfont/wzrZ0WoNeVld/juwDVReszGT2.woff2") format("woff2"),
url("//at.alicdn.com/wf/webfont/wzrZ0WoNeVld/I6s1w4N7In7R.woff") format("woff");
  font-display: swap;
}
</style>