<template>
  <div class="mask-top" @click="closePopEvent" :style="maskStyle"/>
  <div class="project-pop" :class="{ 'hide': !isVisible }">
    <div class="box" style="overflow: hidden">
      <p style="font-weight: lighter">
        {{props.projectData.codeLanguage}} project
      </p>
      <p style="width:90%;font-size: 40px; font-weight: bolder;margin-bottom: 10px">{{props.projectData.name}}</p>
      <p> <span>by</span> <span style="font-size: 20px;font-weight: bolder">{{props.projectData.nickname}}</span></p>
      <div class="price-box">
        <div class="price-label">
          <p>from</p>
          <p style="font-size: 25px; font-weight: bolder; padding-left: 8px">{{props.projectData.price}} RMB</p>
        </div>
        <div class="download-btn" @click="downloadProjectEvent">Get Project!</div>
      </div>
      <div class="picture-box">

      </div>
      <div class="bottom-info">
        <div><span style="font-size: 12px">Views:</span> <span style="font-weight: bold">{{props.projectData.viewNums}}</span></div>
        <div><span style="font-size: 12px">Downloads:</span> <span style="font-weight: bold">{{props.projectData.downloadNums}}</span></div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="box">
      <div class="project-info" ref="projectInfoRef">
        <MdPreview
            v-model="props.projectData.description"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps, defineEmits, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import type { ProjectData } from '@/type/market/Market.ts'
import { downloadProject, searchOne } from "@/api/market/api.ts";
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const props = defineProps<{
  projectData: ProjectData;
}>();

const isVisible = ref(true); // 控制弹窗显示状态
const maskStyle = reactive({
  display: 'block'
}); // 控制 mask 的显示状态

const closePopEmits = defineEmits(['closePop']);
const projectInfoRef = ref<HTMLElement | null>(null);

const closePopEvent = () => {
  isVisible.value = false; // 设置为不可见，触发隐藏动画
  maskStyle.display = 'none'; // 立即隐藏 mask
  setTimeout(() => {
    closePopEmits('closePop');
  }, 1000); // 动画完成后触发关闭事件
};

const downloadProjectEvent = () => {
  downloadProject(props.projectData.id);
};
const popScrollStyle = reactive({

})


onMounted(async () => {
  const res = await searchOne(props.projectData.id);
  props.projectData.introduce = res.introduce;
  props.projectData.description = res.description;
});


</script>



<style scoped>
.project-pop {
  display: flex;
  width: 100vw;
  padding: 5vh 6vw;
  background-color: #FFFBDD;
  position: fixed;
  bottom: 0;
  top:10vh;
  height: auto;
  z-index: 2024;
  transform: translateY(0);
  transition: transform 1s cubic-bezier(0.42, 0, 1, 1);
  animation: pop 0.5s forwards;

}

.project-pop.hide {
  animation: hide 0.3s forwards;
}

.box {
  position: relative;
  overflow-y: scroll;
  margin: 0 3vw;
  width: 50%;

  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(144, 147, 153, 0.3);
    cursor: pointer;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-resizer {
    display: none;
  }

}

.divider {
  position: relative;
  width: 1px;
  background-color: black;
  height: 80%;
  align-self: center;
}

.mask-top {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: show 0.5s forwards;
  animation-delay: 0.3s;
}

.price-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vh;
  width: 100%;
  height: 100px;
  border-top: 1px solid rgba(138, 138, 138, 0.5);
  border-bottom: 1px solid rgba(138, 138, 138, 0.5);
}

.picture-box{
  height: 500px;
  width: 100%;
}

.download-btn{
  width: 160px;
  height: 60px;
  background-color: #32c7da;
  border-radius: 10px;
  text-align: center;
  text-wrap: nowrap;
  line-height: 60px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}

.bottom-info{
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  margin-top: auto;
  padding: 10px 0;
  width: 100%;
  height: 30px;
  border-top: 1px solid rgba(138, 138, 138, 0.5);
}
.project-info{
  margin-bottom: 50px;
}

.md-editor{
  background-color: transparent;
}

/* 媒体查询 */
@media (max-width: 1200px) {
  .project-pop {
    padding: 5vh 6vw;
  }
}

@media (max-width: 800px) {
  .project-pop {
    padding: 5vh 1vw;
  }
}

@media (max-width: 600px) {
  .project-pop {
    padding: 5vh 0.5vw;
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes hide {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}


</style>
