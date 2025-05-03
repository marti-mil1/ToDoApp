import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAllProjects, createProject } from '@/api/supabase/projectsApi'

export const useProjectsStore = defineStore('projects', () => {
  // STATE
  const projects = reactive([])

  // GETTERS/COMPUTED

  // ACTIONS
  const addProjects = async (userName, mail) => {
    try {
        const data = await createProject(userName, mail);
        projects.push(data)


    } catch(err) {
        console.error(err)
    }
  }

  const fetchProjects = async () => {
    try {
        const data = await getAllProjects();
        projects.push( ...data)

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