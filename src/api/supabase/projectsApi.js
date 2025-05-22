// pido datos, los proceso y los devuelvo
// aqui indicamos los servicios modularizados/ las funciones sobre mis proyectos

import { supabase } from "@/api/supabase/index.js";

const TABLE_NAME = "projects";

export const getAllProjects = async () => {
  try {
    const userId = (await supabase.auth.getUser()).data.user.id;
    // --- hacemos petición de datos
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select()
      .eq("user_id", userId); // filtro  los registros donde el campo 'user_id' sea equivalente al valor userId

    //  --- comprobamos error
    // si se ejecuta el throw error, no se va a ejecutar nada de lo que viene después en el codigo
    if (error) {
      throw new Error(error.message);
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

    //OTRO EXEMPLO aplicado a starWarsApi.js
    // const projects = data.map(project => {
    //   if (project.starships) {
    //        project.starships = project.starships.map(starship => {
    //          // aqui hacemos otra peticion para pedir más datos si es necesario
    //      })
    //  }
    //})

    // --- devolvemos datos
    return data;

    //esto se va a ejecutar solo si no se lanza el error arriba en throw error
  } catch (err) {
    console.error(err);
    return []; //en este caso en caso de error devolvemos un array vacío
  }
};

export const createProject = async (title, description) => {
  try {
    const userId = (await supabase.auth.getUser()).data.user.id;
    //hacemos petición de datos
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        title,
        description,
        user_id: userId,
      })
      .select();

    //comprobamos error
    if (error) {
      throw new Error(error.message);
    }

    // procesamos datos si hubiera que procesarlos
    // ...

    // devolvemos datos
    return data[0];

    //esto se va a ejecutar solo si no se lanza el error aquí arriba
  } catch (err) {
    console.error(err);
    return []; //en este caso en caso de error devolvemos un array vacío
  }
};

export const editProject = async (projectId, newTitle, newDescription) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({
        title: newTitle,
        description: newDescription,
      })
      .eq("id", projectId); //  filtro por el ID del proyecto;

    //comprobamos error
    if (error) {
      throw new Error(error.message);
    }

    // procesamos datos si hubiera que procesarlos
    // ...

    // devolvemos datos
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", projectId)
      .select();

    //comprobamos error
    if (error) {
      throw new Error(error.message);
    }

    // procesamos datos si hubiera que procesarlos
    // ...

    // devolvemos datos
    return true;

    //esto se va a ejecutar solo si no se lanza el error aquí arriba
  } catch (err) {
    console.error(err);
    return false;
  }
};
