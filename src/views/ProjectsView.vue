<script setup>
import { useProjectsStore } from '@/stores/projects';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('')
const description = ref('')
//
const editingId = ref(null);
//
const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)

const userStore = useUserStore()
const { logout } = userStore


const router = useRouter()

const _handleSubmit = async () => {
    try {
        if (editingId.value) {
            await projectsStore.updateProjects(editingId.value, title.value, description.value)
            editingId.value = null
        } else {
            await projectsStore.addProjects(title.value, description.value)
        }

        //una vez recibidos los datos limpiamos el formulario
        title.value = ''
        description.value = ''
    } catch (err) {
        console.error(err)
    }
}

const _handleUpdate = (project) => {
    title.value = project.title,
        description.value = project.description,
        editingId.value = project.id
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

            <button type="submit">
                {{ editingId ? 'Update Project' : 'Add project' }}
            </button>

        </form>

        <h2>Pending Tasks</h2>

        <ul>
            <li v-for="project in projects" :key="project.id">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <button @click="_handleUpdate(project)">Edit</button>
                <button @click="_handleRemove(project.id)">Remove</button>
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

li {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

li.button {
    background-color: pink;
}
</style>
