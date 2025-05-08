import { supabase } from "@/api/supabase";

export const loginWithPw = async () => {
  try {
    // --- hacemos petición de datos
    const { data, error } = await supabase.auth.signInWithPassword({
      email /* : "example@email.com"*/,
      password /*: "example-password"*/,
    });

    //  --- comprobamos error
    if (error) {
      throw new Error(error.message);
    }

    //  --- procesamos datos? no

    
    //  --- devolvemos datos 
    console.alert('LOGGED IN!')
    return data;

  } catch (err) {
    console.error(err);
  }
};
