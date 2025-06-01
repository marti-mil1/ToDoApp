<script setup>
import ModalDelete from '@/components/ModalDelete.vue';
import { useProjectsStore } from '@/stores/projects';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

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

// const _handleLogout = async () => {
//     await logout()
//     router.push('/')
// }

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

    <Navbar></Navbar>


    <div class="projects-view">

        <form @submit.prevent="_handleSubmit">
            <div class="input-container">

                <input v-model="title" placeholder="Title" type="text" id="title" class="input-field" required />
                <input v-model="description" placeholder="Description" type="text" id="description"
                    class="input-field" />

                <button type="submit" :class="editingId ? 'update-task-btn' : 'add-task-btn'">
                </button>

            </div>
        </form>

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

                <ModalDelete v-show="showModal && projectToDelete?.id === project.id" :project="projectToDelete"
                    @confirm="_handleRemove" @cancel="closeModal">
                </ModalDelete>
            </li>
        </ul>
    </div>



</template>


<style scoped lang="scss">
.projects-view {
    width: 100%;
    height: calc(100% - 3rem); // - navbar height
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    background-color: skyblue;

    form {
        margin-top: 1rem;
        width: 17.5rem;
        height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        background-color: red;

        .input-container {
            width: 100%;
            height: 6rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        .add-task-btn,
        .update-task-btn {
            position: absolute;
            top: calc(50% - 26px);
            right: 26px;
            width: 44px;
            height: 44px;
            border-radius: 100%;
        }



    }

    ul {
        margin-top: 1rem;
        width: 17.5rem;
        height: calc(100% - 6rem - 2rem);
        // overflow-y: scroll;

        background-color: yellow;

        li:first-child {
            margin-top: 0;
        }

        li:last-child {
            border-radius: 1.875rem;
            height: auto;
        }

        li:only-child {
            
        }

        .task-card {
            margin-top: -2rem;
            width: 100%;
            height: 10rem;
            padding: 12px 1rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            border: solid grey 1px;
            border-radius: 1.875rem 1.875rem 0 0;
        }

        .task-details {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 40px;
            background-color: green;

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
    }
}
</style>
