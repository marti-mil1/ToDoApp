// pido datos, los proceso y los devuelvo
// aqui indicamos los servicios modularizados/ las funciones sobre mis proyectos

import { supabase } from '@/api/supabase';

const TABLE_NAME = 'projects'


export const getAllProjects = async () => {
    try {
        // --- hacemos petición de datos
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select()

        //  --- comprobamos error
        // si se ejecuta el throw error, no se va a ejecutar nada de lo que viene después en el codigo
        if (error) {
            throw new Error(error.message)
        }

        // --- procesamos datos si hubiera que procesarlos
        // ...
        //EJEMPLO
        // return data.map(project => ({
        //      id: project.id,
        //      createdAt: project.created_at,
        //      mail: project.mail,
        //      title: project.title,
        //      description: project.description
        // }))

        //OTRO EXEMPLO
        // const projects = data.map(project => {
        //   if (project.starships) {
        //        project.starships = project.starships.map(starship => {
        //          // aqui hacemos otra peticion para pedir más datos si es necesario
        //      })
        //  }
        //})

        // --- devolvemos datos
        return data

    //esto se va a ejecutar solo si no se lanza el error arriba en throw error
    } catch(err) {
        console.error(err);
        return []; //en este caso en caso de error devolvemos un array vacío
    }
}

export const createProject = async (title, description) => {
    try {
        //hacemos petición de datos
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert({ title, description })
            .select()

        //comprobamos error
        if (error) {
            throw new Error(error.message)
        }

        // procesamos datos si hubiera que procesarlos
        // ...

        // devolvemos datos
        return data

    //esto se va a ejecutar solo si no se lanza el error aquí arriba 
    } catch(err) {
        console.error(err);
        return []; //en este caso en caso de error devolvemos un array vacío
    }
}