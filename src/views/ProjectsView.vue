<script setup>
import { seeCurrentUser } from '@/api/supabase/userApi';
import { useProjectsStore } from '@/stores/projects';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('')
const description = ref('')

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)

const userStore = useUserStore()
const { email } = storeToRefs(userStore)
const {
    fetchCurrentUser,
    logout
} = userStore


const router = useRouter()

const _handleSubmit = async () => {
    try {
        await projectsStore.addProjects(title.value, description.value)

        //limpiamos el formulario
        title.value = ''
        description.value = ''
    } catch (err) {
        console.err(err)
    }
}

const _handleLogout = async () => {
    await logout()
    router.push('/')
}

onMounted(() => {
    projectsStore.fetchProjects()
})


</script>

<template>
    <main>
        <button @click="_handleLogout">Logout</button>

        <h1> Projects View</h1>

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
                <h2>{{ project.title }}</h2>
                <h2>{{ project.name }}</h2>
            </li>
        </ul>
    </main>
</template>


<style scoped>
form {
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
}

button,
label {
    width: 100%;
}

/* CHECK INPUT WIDTH: +8px POR DEFECTO! */
input {
    width: 242px;
}

h2 {
    text-align: center;
}

button:hover {
    background-color: lightyellow;
    padding: 12px 0;
    border: none;
    border-radius: 2px;
}
</style>
