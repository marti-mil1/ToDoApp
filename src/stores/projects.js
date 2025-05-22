import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getAllProjects,
  createProject,
  editProject,
  deleteProject,
} from "@/api/supabase/projectsApi";

export const useProjectsStore = defineStore("projects", () => {
  // STATE
  const projects = ref([]);

  // GETTERS/COMPUTED

  // ACTIONS
  async function addProjects(title, description) {
    try {
      const data = await createProject(title, description);

      if (data) {
        projects.value.push(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProjects() {
    try {
      const data = await getAllProjects();

      // const provisionalProjects = data.filter(
      //   (incomingProject) =>
      //     !projects.value.find((p) => p.id === incomingProject.id)
      // );

      // projects.value.push(...provisionalProjects);
      projects.value = data
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProjects(projectId, newTitle, newDescription) {
    try {
      const isUpdated = await editProject(projectId, newTitle, newDescription);

      if (isUpdated) {
        // const index = projects.value.findIndex(
        //   (project) => project.id === projectId
        // );
        
        // if (index !== -1) {
        //   // projects.value = projects.value.splice(index,1, isUpdated)
        //   projects.value[index] = projectUpdated
        // }
        const project = projects.value.find(pr => pr.id === projectId)
        project.title = newTitle
        project.description = newDescription
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function removeProjects(projectId) {
    try {
      const isDeleted = await deleteProject(projectId);

      if (isDeleted) {
        const index = projects.value.findIndex(
          (project) => project.id === projectId
        );
        if (index !== -1) {
          projects.value.splice(index, 1);
        }
      } console.log(`removed ${projectId}`) // compruebo si está cancelando
    } catch (err) {
      console.error(err);
    }
  }

  return {
    //State
    projects,
    //Actions
    addProjects,
    fetchProjects,
    updateProjects,
    removeProjects,
  };
});
