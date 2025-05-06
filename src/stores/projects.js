import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAllProjects, createProject } from '@/api/supabase/projectsApi'

export const useProjectsStore = defineStore('projects', () => {
  // STATE
  const projects = reactive([])

  // GETTERS/COMPUTED

  // ACTIONS
  async function addProjects(title, description) {
    try {
        const data = await createProject(title, description);
        projects.push(data)


    } catch(err) {
        console.error(err)
    }
  }

  async function fetchProjects() {
    try {
        const data = await getAllProjects();
        projects.push( ... data) 

    } catch(err) {
        console.error(err)

    }
  }
 
  return {
    //State
    projects,
    //Getters
    //Actions
    addProjects,
    fetchProjects
}
})