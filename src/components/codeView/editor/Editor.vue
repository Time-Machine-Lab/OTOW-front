<template>
  <div :class="['editor-area', getEditorMode]">
    <div
        v-if="getOpenFiles[EDITORS.primary].length > 0"
        id="primary-editor"
        class="codemirror-instances"
        @click="switchActiveEditor(EDITORS.primary)"
    >
      <TopBar
          :editor="EDITORS.primary"
          :activeFile="getActiveFiles[EDITORS.primary]"
          :openFiles="getOpenFiles[EDITORS.primary]"
          :isActive="getActiveEditor === EDITORS.primary"
      />
      <div class="scroll-wrapper">
        <component
            v-if="getActiveFiles[EDITORS.primary]"
            :file="getActiveFiles[EDITORS.primary]"
            :is="getEditorForFile(getActiveFiles[EDITORS.primary])"
            :isActive="getActiveEditor === EDITORS.primary"
        />
      </div>
    </div>
    <div
        v-if="
        getOpenFiles[EDITORS.secondary].length > 0 &&
          getEditorMode === 'multiple'
      "
        id="secodary-editor"
        class="codemirror-instances"
        @click="switchActiveEditor(EDITORS.secondary)"
    >
      <TopBar
          :editor="EDITORS.secondary"
          :activeFile="getActiveFiles[EDITORS.secondary]"
          :openFiles="getOpenFiles[EDITORS.secondary]"
          :isActive="getActiveEditor === EDITORS.secondary"
      />
      <div class="scroll-wrapper">
        <component
            v-if="getActiveFiles[EDITORS.secondary]"
            :file="getActiveFiles[EDITORS.secondary]"
            :is="getEditorForFile(getActiveFiles[EDITORS.secondary])"
            :isActive="getActiveEditor === EDITORS.primary"
        />
      </div>
    </div>
    <div
        class="welcome-texts"
        v-if="
        !(
          getOpenFiles[EDITORS.primary].length > 0 ||
          getOpenFiles[EDITORS.secondary].length > 0
        )
      "
    >
      <h2 class="title">Welcome to OTOW-code-view-platform</h2>
    </div>
    <div
        v-if="getDraggingFileId"
        class="draggable-area"
        @dragenter.prevent="enableDragAndDropMode"
        @dragover.prevent
    >
      <div
          :class="['area', { highlight: targetDropEditor === EDITORS.primary }]"
          @dragenter.prevent="setTargetDropEditor(EDITORS.primary)"
          @drop.stop="openDroppedFile"
          @dragover.prevent
      ></div>
      <div
          v-if="getOpenFiles[EDITORS.primary].length > 0"
          :class="['area', { highlight: targetDropEditor === EDITORS.secondary }]"
          @dragenter.prevent="setTargetDropEditor(EDITORS.secondary)"
          @drop.stop="openDroppedFile"
          @dragover.prevent
      ></div>
    </div>
  </div>
</template>

<script>
import LoadingScreen from "@/components/codeView/loading/LoadingScreen";
import TopBar from "./TopBar";
import { EDITORS } from "../store/editor/init.ts";
import {
  FileIcon,
  FilePlusIcon,
  FileTextIcon,
  FolderPlusIcon,
  GithubIcon,
  GitPullRequestIcon,
} from "vue-feather-icons";
import { fileTypes } from "../types/File.js";
import FileDocumentIcon from "../icons/FileDocumentIcon.vue";

const CodeEditor = () => ({
  component: import("CodeEditor.vue"),
  loading: LoadingScreen,
  error: LoadingScreen,
});
export default {
  components: {
    CodeEditor,
    TopBar,
    FilePlusIcon,
    FolderPlusIcon,
    GithubIcon,
    GitPullRequestIcon,
    FileDocumentIcon,
    FileIcon,
    FileTextIcon
  },
  data() {
    return {
      dragAndDropMode: false,
      targetDropEditor: null,
    };
  },
  computed: {
    EDITORS() {
      return EDITORS
    },
    getActiveEditor() {
      return this.$store.getters['Editor/getActiveEditor'];
    },
    getOpenFiles() {
      return this.$store.getters['Editor/getOpenFiles'];
    },
    getActiveFiles() {
      return this.$store.getters['Editor/getActiveFiles'];
    },
    getDraggingFileId() {
      return this.$store.getters['Editor/getDraggingFileId'];
    },
    getFile() {
      return this.$store.getters['Files/getFile'];
    },
    getEditorMode() {
      console.log(this.getOpenFiles)
      if (
          this.getOpenFiles[EDITORS.secondary] &&
          this.getOpenFiles[EDITORS.secondary].length > 0
      ) {
        return "multiple";
      } else {
        return "single";
      }
    },
  },
  methods: {
    updateFileContents(payload) {
      this.$store.dispatch("Files/updateFileContents", payload);
    },
    createFile(payload) {
      this.$store.dispatch("Files/createFile", payload);
    },
    createDirectory(payload) {
      this.$store.dispatch("Files/createDirectory", payload);
    },
    deleteFile(payload) {
      this.$store.dispatch("Files/deleteFile", payload);
    },
    openRenameMode(payload) {
      this.$store.dispatch("Files/openRenameMode", payload);
    },

    setActiveEditor(payload) {
      this.$store.dispatch("Editor/setActiveEditor", payload);
    },
    openFile(payload) {
      this.$store.dispatch("Editor/openFile", payload);
    },
    setDraggingId(payload) {
      this.$store.dispatch("Editor/setDraggingId", payload);
    },
    setDraggingFileId(payload) {
      this.$store.dispatch("Editor/setDraggingFileId", payload);
    },
    closeFile(payload) {
      this.$store.dispatch("Editor/closeFile", payload);
    },
    setShowCreateFileModal(payload) {
      this.$store.dispatch("UI/setShowCreateFileModal", payload);
    },
    switchActiveEditor(editor) {
      if (this.getActiveEditor !== editor) {
        this.setActiveEditor({ editor });
      }
    },
    getEditorForFile(file) {
      let extension = null;
      if (file && file.name) {
        const { name } = file;
        const fileParts = name.split(".");
        extension =
            fileParts.length > 1 ? fileParts.slice(-1).slice(-1)[0] : null;
      }
      return "CodeEditor";
    },
    enableDragAndDropMode() {
      this.dragAndDropMode = true;
    },
    disableDragAndDropMode() {
      this.dragAndDropMode = false;
      this.targetDropEditor = null;
    },
    setTargetDropEditor(editor) {
      console.log({ editor });
      this.targetDropEditor = editor;
    },
    openDroppedFile(event) {
      event.preventDefault();
      const editorTopBeDropped = this.targetDropEditor;
      const fileId = this.getDraggingFileId;
      this.setDraggingId({ id: null });
      this.setDraggingFileId({ id: null });
      const file = this.getFile(fileId);
      if (file && file.type !== fileTypes.DIRECTORY) {
        console.log({ id: fileId, editorTopBeDropped });
        var primaryFiles = this.getOpenFiles[EDITORS.primary]
        var secondFiles = this.getOpenFiles[EDITORS.secondary];
        console.log(editorTopBeDropped)
        if(this.checkFileExits(primaryFiles,fileId)){
          console.log("1")
          if(editorTopBeDropped===EDITORS.primary){
            this.openFile({ id: fileId, editor: editorTopBeDropped });
          }else{
            this.closeFile({ editor: EDITORS.primary, id: fileId })
            this.openFile({ id: fileId, editor: EDITORS.secondary});
          }
        }else if(this.checkFileExits(secondFiles,fileId)){
          console.log(2)
          if(editorTopBeDropped===EDITORS.secondary){
            this.openFile({ id: fileId, editor: editorTopBeDropped });
          }else{
            this.closeFile({ editor: this.getActiveEditor, id: fileId })
            this.openFile({ id: fileId, editor: EDITORS.primary});
          }
        }
      }
    },
    checkFileExits(files, fileId){
      return files.some(file => file.id === fileId);
    }
  },
  created() {
    this.EDITORS = EDITORS;
  },
};
</script>

<style lang="scss" scoped>
.editor-area {
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &.single {
    grid-template-columns: 1fr;
  }

  &.multiple {
    grid-template-columns: 1fr 1fr;
    column-gap: 3px;
  }

  .scroll-wrapper {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .codemirror-instances {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .welcome-texts {
    padding: 20px;

    .title {
      font-size: 1.2rem;
      padding: 10px 15px;
      font-weight: 600;
    }

    .description {
      opacity: 0.7;
      padding: 0px 15px;
    }

    .menu-title {
      font-size: 1rem;
      margin-top: 50px;
      padding: 0 15px;
      font-weight: 600;
    }

    .menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      list-style-type: none;
      margin-top: 10px;

      li {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        color: var(--font-color);
        text-decoration: underline;
        text-decoration-style: dashed;
        text-decoration-color: var(--color-primary);
        text-underline-offset: 5px;
        align-self: flex-start;
        border-radius: 5px;
        transition: 0.3s all ease-in-out;

        span {
          margin-left: 5px;
          color: var(--font-color-light);
          text-decoration: none;
        }

        a {
          display: flex;
          align-items: center;
          color: var(--font-color);
        }

        .icon {
          margin-right: 10px;
        }

        &:hover {
          cursor: pointer;
          background: var(--color-secondary);
        }

        &:active {
          opacity: 0.7;
        }
      }
    }
  }

  .draggable-area {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .area {
      display: flex;
      flex: 1;
      background: transparent;

      &.highlight {
        background: var(--drag-over-background);
      }
    }
  }
}
</style>
