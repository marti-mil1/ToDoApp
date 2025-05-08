import { supabase } from "@/api/supabase";

export const signUp = async () => {
  try {
    // --- hacemos petición de datos
    const { data, error } = await supabase.auth.signUp({
      email /*: 'example@email.com'*/,
      password /*: 'example-password'*/,
    });

    //  --- comprobamos error
    if (error) {
      throw new Error(error.message);
    }

    //  --- procesamos datos? no

    //  --- devolvemos datos 
    console.alert("SIGNED UP");
    return data;
  } catch (err) {
    console.error(err);
  }
};
