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

// const colors = [
//     'var(--task-card-col-1)',
//     'var(--task-card-col-2)',
//     'var(--task-card-col-3)',
//     'var(--task-card-col-4)',
//     'var(--task-card-col-5)',
//     'var(--task-card-col-6)'
// ]

const colors = [
    'var(--task-card-col-1)',
    'var(--task-card-col-2)',
    'var(--task-card-col-3)',
    'var(--task-card-col-4)',
    'var(--task-card-col-5)',
    'var(--task-card-col-6)'
]


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
            <li v-for="(project, index) in projects" :key="project.id" class="task-card" :style="{
                backgroundColor: colors[index % colors.length],
                zIndex: index
            }">

                <div class="task-info-container">

                    <div class="task-details">
                        <h3 :class="{ completed: project.completed }">{{ project.title }}</h3>
                        <p :class="{ completed: project.completed }">{{ project.description }}</p>
                    </div>


                    <div class="task-buttons">
                        <!-- <input type="checkbox" :checked="project.completed"
                        @change="projectsStore.toggleCompleted(project.id)"> -->
                        <img src="/src/assets/icons/complete-task.svg" class="checked-btn" :checked="project.completed"
                            @click="projectsStore.toggleCompleted(project.id)">

                        <!-- <button @click="_handleUpdate(project)" v-show="!project.completed">Edit</button> -->
                        <img src="/src/assets/icons/edit-task.svg" class="edit-btn" @click="_handleUpdate(project)"
                            v-show="!project.completed && !(showModal && projectToDelete?.id === project.id)">

                        <!-- <button @click="_handleRemove(project.id)">Remove</button> -->
                        <!-- <img src="/src/assets/icons/delete-task.svg" class="delete-btn" @click="_handleRemove(project.id)"> -->

                        <img src="/src/assets/icons/delete-task.svg" class="delete-btn"
                            @click="showModalDelete(project)">
                        <!-- <button @click="showModalDelete(project)">Remove</button> -->
                    </div>

                </div>

                <ModalDelete v-show="showModal && projectToDelete?.id === project.id" :project="projectToDelete"
                    @confirm="_handleRemove" @cancel="closeModal"> </ModalDelete>

            </li>
        </ul>
    </div>



</template>


<style scoped lang="scss">
.projects-view {
    width: 100%;
    // height: calc(100% - 3rem);
    min-width: 320px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    form {
        margin-top: 1rem;
        width: 17.5rem;
        height: 6rem;
        position: relative;

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

        li:first-child {
            margin-top: 0;
        }

        li:last-child {
            border-radius: 1.875rem;
            height: auto;
        }

        li:only-child {}

        .task-card {
            margin-top: -2rem;
            width: 100%;
            height: auto;
            // padding: 1rem 1rem 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            border-radius: 1.875rem 1.875rem 0 0;
            position: relative;

            .task-info-container {
                margin: 1rem 1rem 2.5rem;
                width: calc(100% - 2rem);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;

                .task-details {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;

                    h3,
                    p {
                        font-family: var(--font-family);
                        color: var(--task-card-text);
                        line-height: var(--line-height);
                    }

                    h3 {
                        font-size: var(--font-size-task-card-title);
                        font-weight: var(--font-weight-task-card-title);
                    }

                    p {
                        font-size: var(--font-size-task-card-description);
                        font-weight: var(--font-weight-task-card-description);
                    }
                }

                .completed {
                    text-decoration: line-through;
                    text-decoration-color: var(--cream);
                    text-decoration-thickness: 1.2px;
                }

                .task-buttons {
                    width: 2rem;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 0.8rem;

                    .checked-btn,
                    .edit-btn,
                    .delete-btn {
                        width: 2rem;
                        height: 2rem;
                        border: solid 1px var(--black);
                        border-radius: 100%;
                        padding: 0.125rem;
                    }


                }
            }
        }
    }
}
</style>
