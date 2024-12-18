<template>
  <div class="search-panel">
    <div class="search-listing">
      <div class="search-input-wrapper">
        <input
            type="text"
            placeholder="搜索"
            class="search-input"
            @input="searchFiles"
            v-model="searchInput"
            ref="searchInput"
        />
      </div>
      <FadeTransition group v-if="Object.values(getFilteredFiles).length > 0">
        <component
            v-for="file in getFilteredFiles"
            :key="file.id"
            :is="file.type"
            :file="file"
            :isActive="!!getActiveFileList[file.id]"
        />
      </FadeTransition>

      <div
          class="help-text"
          v-if="Object.values(getFilteredFiles).length === 0 && searchInput !== ''"
      >
        <p>没有找到对应搜索结果 '{{ searchInput }}'</p>
      </div>

      <div group v-if="searchInput === ''" class="help-text">
        <p>输入关键词进行搜索...</p>
      </div>
    </div>
  </div>
</template>

<script>
import FileItem from "../directory/FileItem.vue";
import DirectoryItem from "../directory/DirectoryItem.vue";
import { FadeTransition } from "vue2-transitions";
import { fileTypes } from "../types/vFile.model.js";

export default {
  props: {
    files: Array,
    activeFiles: Object,
  },
  data: () => {
    return { searchInput: "" };
  },
  components: {
    [fileTypes.FILE]: FileItem,
    [fileTypes.DIRECTORY]: DirectoryItem,
    FadeTransition,
  },
  computed: {
    getActiveFileList() {
      return this.$store.getters['Editor/getActiveFileList'];
    },
    getFilteredFiles() {
      return this.$store.getters['Files/getFilteredFiles'];
    }
  },
  created() {
    this.fileTypes = fileTypes;
  },
  methods: {
    searchFiles(payload) {
      return this.$store.dispatch('Files/searchFiles', payload);
    }
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
};
</script>

<style lang="scss" scoped>
.search-panel {
  background: var(--color-secondary-light);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border-right: 1px solid var(--border-color);

  header {
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    z-index: 99;

    h4 {
      font-weight: bold;
      flex: 1;
    }
  }
  .search-input-wrapper {
    display: flex;
    background: var(--color-input-background);
    .search-input {
      padding: 10px 15px;
      border: none;
      color: var(--font-color);
      background: transparent;
      width: 100%;
      display: block;
      // border-radius: 5px;
      border-bottom: 2px solid transparent;

      &:focus {
        border: none;
        border-bottom: 2px solid var(--font-color);
        box-shadow: none;
        outline: none;
      }
    }
  }

  .help-text {
    padding: 15px;
    opacity: 0.5;
  }
}
</style>
