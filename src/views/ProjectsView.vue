<script setup>
import ModalDelete from '@/components/ModalDelete.vue';
import { useProjectsStore } from '@/stores/projects';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const showModal = ref(false)
const projectToDelete = ref(null)
const title = ref('')
const description = ref('')
const editingId = ref(null)

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)

const userStore = useUserStore()
const { user, logout } = userStore


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
        closeModal()

        if (editingId.value === projectId) {
            editingId.value = null,
                title.value = '',
                description.value = ''
        }
    } catch (err) {
        console.error(err)
    }
}

const showModalDelete = (project) => {
    projectToDelete.value = project
    showModal.value = true
}

const closeModal = () => {
    projectToDelete.value = null
    showModal.value = false
}

onMounted(() => {
    projectsStore.fetchProjects()
})
</script>

<template>
    <main>
        <button @click="_handleLogout">Logout</button>

        <h1>Hello {{ user.email }} !</h1>

        <form @submit.prevent="_handleSubmit">
        <h2>Add Cool Task:</h2>

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

        <h2>Pending Tasks:</h2>

        <ul>
            <li v-for="project in projects" :key="project.id" class="task-card">

                <div class="task-details">
                    <input type="checkbox" :checked="project.completed"
                        @change="projectsStore.toggleCompleted(project.id)">
                    <h3 :class="{ completed: project.completed }">{{ project.title }}</h3>
                    <p :class="{ completed: project.completed }">{{ project.description }}</p>
                </div>

                <div class="task-buttons">
                    <button @click="_handleUpdate(project)" v-show="!project.completed">Edit</button>
                    <!-- <button @click="_handleRemove(project.id)">Remove</button> -->
                    <button @click="showModalDelete(project)">Remove</button>
                </div>

                <ModalDelete
                v-show="showModal && projectToDelete?.id === project.id"
                :project="projectToDelete"
                @confirm="_handleRemove"
                @cancel="closeModal">
            </ModalDelete>
            </li>
        </ul>
    </main>
</template>


<style scoped lang="scss">
main {
    

    h1 {
        font-size: 23px; 
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 5px;
        margin: 40px auto;
    }

    h2 {
        font-size: 20px;
    }

    button,
    input,
    label {
        width: 100%;
    }

    button:hover {
        background-color: rgb(0, 136, 255);
        padding: 2px 0;
        border-radius: 2px;
    }

    .task-card {
        width: 100%;
        padding: 0;
        margin-bottom: 10px;
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
        justify-content: flex-start;
        align-items: center;
        gap: 40px;

        input {
            width: 20px;
        }
    }

    .task-buttons {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .completed {
        text-decoration: line-through;
        color: lightgray;
    }

    ul {
        margin-top: 10px;
    }
}
</style>
