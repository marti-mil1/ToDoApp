// pido datos, los proceso y los devuelvo
// aqui indicamos los servicios modularizados/ las funciones sobre mis proyectos

import { supabase } from '@/api/supabase/index';

const TABLE_NAME = 'projects'


export const getAllProjects = async () => {
    try {
        //hacemos petición de datos
        const { data, error } = await supabase
            .from(TABLE_NAME)
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

export const createProject = async (userName, mail) => {
    try {
        //hacemos petición de datos
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert({ userName, mail })
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