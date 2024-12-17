<script setup lang="ts">
import Snackbar from "./components/normal/Snackbar.vue";
</script>

<template>
  <div class="app-container">
    <RouterView></RouterView>
    <Snackbar></Snackbar>
  </div>
</template>

<style scoped>
.app-container{
  min-width: 100vw;
  min-height: 100vh;
}

</style>
