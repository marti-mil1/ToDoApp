import { supabase } from "@/api/supabase/index.js";

//SIGN UP
export async function createAccount({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(`API Error creating account: ${err.message}`);
    throw err;
  }
}

//SIGN IN WITH PW
export async function loginUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error(`API Login failed: ${error.message}`);
  }
}

// SEE USER
export async function seeCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(`API get session failed: ${error.message}`);
  }
}

//SIGN OUT
export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    console.error("API Sign outfailed:", err);
  }
}
