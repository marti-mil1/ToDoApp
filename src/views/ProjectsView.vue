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
const { email, logout } = userStore


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
    title.value = project.title
    description.value = project.description
    editingId.value = project.id
}

const _handleLogout = async () => {
    await logout()
    router.push('/')
}

const _handleRemove = async (projectId) => {
    try {
        await projectsStore.removeProjects(projectId)

        if (editingId.value === projectId) {
            editingId.value = null,
                title.value = '',
                description.value = ''
        }

    } catch (err) {
        console.error(err)
    }
}


onMounted(() => {
    projectsStore.fetchProjects()
})


</script>

<template>
    <main>
        <button @click="_handleLogout">Logout</button>

        <h1>Hello {{ email }} !</h1>

        <form @submit.prevent="_handleSubmit">
            <label>
                Title
                <input type="text" v-model="title" required>
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
            <li v-for="project in projects" :key="project.id" class="task-card">
                <div class="task-details">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>

                </div>

                <div class="task-buttons">
                    <button @click="_handleUpdate(project)">Edit</button>
                    <button @click="_handleRemove(project.id)">Remove</button>
                </div>

            </li>
        </ul>
    </main>
</template>


<style scoped>

main {
    background-color: aqua;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
    background-color: pink;
}

h1 {
    font-size: 23px;
}

h2 {
    font-size: 20px;
}



button,
label {
    width: 100%;
}

/* CHECK INPUT WIDTH: +8px POR DEFECTO! */
input {
    width: 100%;
}

h2 {
    text-align: center;
}

button:hover {
    background-color: rgb(0, 136, 255);
    padding: 2px 0;
    border-radius: 2px;
}


.task-card {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: solid grey 1px;
    border-radius: 5px;
}

.task-details {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
