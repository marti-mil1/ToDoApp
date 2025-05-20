import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import {
  getAllProjects,
  createProject,
  editProject,
} from "@/api/supabase/projectsApi";

export const useProjectsStore = defineStore("projects", () => {
  // STATE
  const projects = reactive([]);

  // GETTERS/COMPUTED

  // ACTIONS
  async function addProjects(title, description) {
    try {
      const data = await createProject(title, description);

      console.log(data);
      projects.push(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProjects() {
    try {
      const data = await getAllProjects();

      const provisionalProjects = data.filter(
      (incomingProject) => !projects.find((p) => p.id === incomingProject.id)
    );

      projects.push(...provisionalProjects);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProjects (projectId, newTitle, newDescription) {
    try {
      const updateProjectData = await editProject(
        projectId,
        newTitle,
        newDescription
      );

      if (updateProjectData) {
        const index = projects.findIndex((project) => project.id === projectId);
        if (index !== -1) {
          projects[index] = updateProjectData;
        }
      }
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
  };
});
