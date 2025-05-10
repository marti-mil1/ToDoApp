import { supabase } from '@/api/supabase/index'

//SIGN IN
export const signInWithPw = async (email, password) => {
  try {
    // --- hacemos petición de datos
    console.log('Attempting to sign in:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //  --- comprobamos error
    if (error) {
      throw new Error(`Login failed: ${error.message}`);
    }

    //  --- procesamos datos? no

    //  --- devolvemos datos
    console.log('Sign in with password OK:', data);
    return data;
  } catch (err) {
    console.error("Error during login:", err.message);
    return null;
  }
};

//SIGN UP
export const signUp = async (email, password) => {
  try {
    // --- hacemos petición de datos
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    //  --- comprobamos error
    if (error) {
      throw new Error(`Sign Up failed: ${error.message}`);
    }
    //  --- procesamos datos? no

    //  --- devolvemos datos
    console.log("sign up OK");
    return data;
  } catch (err) {
    console.error("Error during sign up:", err.message);
    return null;
  }
};

//SIGN OUT
export const signOut = async () => {
  try {
    // --- hacemos petición de datos
    const { error } = await supabase.auth.signOut();

    //  --- comprobamos error
    if (error) {
      throw new Error(`Sign Out failed: ${error.message}`);
    }
    //  --- procesamos datos? no

    //  --- devolvemos datos
    console.log("sign out OK");
    return true;
  } catch (err) {
    console.error("Error during sign out:", err);
    return false
  }
};
