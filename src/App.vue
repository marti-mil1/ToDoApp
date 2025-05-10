<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <div id="app">
    <RouterView />
    <RouterLink to="/projects">Projects</RouterLink>
  </div>

</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
