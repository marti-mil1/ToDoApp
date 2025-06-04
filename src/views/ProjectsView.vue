<script setup>
import ModalDelete from '@/components/ModalDelete.vue';
import { useProjectsStore } from '@/stores/projects';
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import ToTopBtn from '@/components/ToTopBtn.vue';

const showModal = ref(false)
const projectToDelete = ref(null)
const title = ref('')
const description = ref('')
const editingId = ref(null)

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)

const userStore = useUserStore()
const { user, logout } = userStore

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

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

        <section class="form-section">
            <form @submit.prevent="_handleSubmit">
                <div class="input-container">

                    <input v-model="title" placeholder="Title" type="text" id="title" class="input-field" required />
                    <input v-model="description" placeholder="Description" type="text" id="description"
                        class="input-field" />

                    <button type="submit" :class="editingId ? 'update-task-btn' : 'add-task-btn'">
                    </button>

                </div>
            </form>
        </section>

        <section class="tasks-section">
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

                            <img src="/src/assets/icons/complete-task.svg" class="checked-btn"
                                :checked="project.completed" @click="projectsStore.toggleCompleted(project.id)">

                            <img src="/src/assets/icons/edit-task.svg" class="edit-btn" @click="_handleUpdate(project)"
                                v-show="!project.completed && !(showModal && projectToDelete?.id === project.id)">


                            <img src="/src/assets/icons/delete-task.svg" class="delete-btn"
                                @click="showModalDelete(project)">
                        </div>

                    </div>

                    <ModalDelete v-show="showModal && projectToDelete?.id === project.id" :project="projectToDelete"
                        @confirm="_handleRemove" @cancel="closeModal"> </ModalDelete>

                </li>
            </ul>

            <!-- <img :src="isDark ? '/src/assets/icons/arrow_upward-dark-mode.svg' : '/src/assets/icons/arrow_upward-light-mode.svg'"
                class="back-to-top-btn" @click="backToTop"> -->

            <ToTopBtn></ToTopBtn>


        </section>

    </div>

</template>


<style scoped lang="scss">
// ----- MOBILE VIEW
@media screen and (max-width: 768px) {
    .projects-view {
        min-width: 320px;
        width: 100%;
        height: calc(100% - 3rem); //navbar height
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 1rem;
    }

    .form-section {
        min-width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;

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
                cursor: pointer;
            }
        }

    }

    .tasks-section {
        width: 100%;
        height: calc(100% - 6rem - 2rem);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    ul {
        margin: 1rem auto;
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        li:first-child {
            margin-top: 0;
        }

        li:last-child {
            border-radius: var(--border-radius);
            height: auto;
            margin-bottom: 2rem;
        }

        .task-card {
            margin-top: -1.8rem;
            width: 280px;
            height: auto;
            // padding: 1rem 1rem 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
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
                        cursor: pointer;

                        &:hover {
                            border: solid 2px var(--black);
                        }
                    }
                }
            }
        }
    }
}

// --- TABLET VIEW
@media screen and (min-width: 768px) and (max-width: 1023px) {
    .projects-view {
        width: 100%;
        height: calc(100% - 3rem); //navbar height
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .form-section {
        width: 21.5rem;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;

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
                cursor: pointer;
            }
        }
    }

    .tasks-section {
        width: calc(100% - 21.5rem);
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border-left: solid 1px var(--stroke-col);
    }

    ul {
        margin: 1rem auto;
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        li:first-child {
            margin-top: 0;
        }

        li:last-child {
            border-radius: var(--border-radius);
            height: auto;
            margin-bottom: 2rem;
        }

        .task-card {
            margin-top: -1.8rem;
            width: 22.5rem;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex-grow: 2;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
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
                        cursor: pointer;

                        &:hover {
                            border: solid 2px var(--black)
                        }
                    }
                }
            }
        }
    }
}

// --- DESKTOP VIEW
@media screen and (min-width: 1024px) {
    .projects-view {
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        height: calc(100% - 3rem); //navbar height
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

    }

    .form-section {
        width: 21.5rem;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        form {
            margin-top: 1rem;
            width: 19.5rem;
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
                cursor: pointer;

            }
        }

    }

    .tasks-section {
        width: calc(100% - 21.5rem);
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border-left: solid 1px var(--stroke-col);
        cursor: pointer;
    }

    ul {
        margin: 1rem 0 1rem 2rem;
        width: 40.5rem;
        height: 100%;
        // display: grid;
        // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1.5rem;

        .task-card {
            width: 19.25rem;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex-grow: 2;
            border-radius: var(--border-radius);
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
                        cursor: pointer;

                        &:hover {
                            border: solid 2px var(--black);
                        }
                    }
                }
            }
        }
    }
}
</style>