<script setup>
// import { useProjectsStore } from '@/stores/projects';
// import { storeToRefs } from 'pinia';

// const title = ref('')
// const description = ref('')

// const projectStore = useProjectsStore()
// const { projects } = storeToRefs(pro)

// const _handleSubmit = () => {

// }
</script>

<template>
  <main>
   <h1>Projects View</h1>

   <form @submit.prevent="_handleSubmit">
    <label>
        Title
        <input type="text" v-model="title">
    </label>
    <label>
        Description
        <input type="text" v-model="description">
    </label>

    <button type="submit">Add Project</button>
   </form>

   <ul>
    <li v-for="project in projects" :key="project.id">
        <h2>{{ project.name }}</h2>
    </li>
   </ul>
  </main>
</template>



<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px
    }
}
</style>
