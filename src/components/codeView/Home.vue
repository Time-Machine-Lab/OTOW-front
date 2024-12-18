<template>
  <main>
    <div
        id="main-layout"
        :class="[{ hidePanel: !getActivePanelId }]"
        @dragover.prevent
    >
      <SideNavigationBar />
      <div v-show="getActivePanelId" class="explorer-panel">
        <FileExplorer v-if="getActivePanelId === 'explorer'" />
        <SearchPanel :key="'search'" v-if="getActivePanelId === 'search'" />
      </div>
      <Editor />
    </div>
    <SlideYUpTransition>
      <router-view></router-view>
    </SlideYUpTransition>
  </main>
</template>

<script>
import Editor from "@/components/codeView/editor/Editor";
import SideNavigationBar from "@/components/codeView/sider/SideNavigationBar";
import SearchPanel from "@/components/codeView/search/SearchPanel";
import { SlideYUpTransition } from "vue2-transitions";
import {getActivePanelId} from "@/components/codeView/store/ui/uiStore.js"

export default {
  components: {
    FileExplorer: () => import("@/components/codeView/explorer/FileExplorer"),
    Editor,
    SideNavigationBar,
    SearchPanel,
    SlideYUpTransition,
  },
  data() {
    return {};
  },
  computed: {
    getActivePanelId() {
      return getActivePanelId();
      // return this.$store.getters['UI/getActivePanelId'];
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
#main-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50px auto 1fr;
  background: var(--color-secondary-light);
  position: relative;

  &.hidePanel {
    grid-template-columns: 50px 1fr;
  }

  .explorer-panel {
    width: 270px;
    height: 100%;
    overflow: hidden;
  }
}
</style>
