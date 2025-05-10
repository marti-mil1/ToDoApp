import { ref } from "vue";
import { defineStore } from "pinia";
import { signInWithPw, signUp, signOut } from "@/api/supabase/userApi";

export const useUserStore = defineStore("user", () => {
  // STATE
  const user = ref(null);
  const isAuthenticated = ref(false);

  // GETTERS/COMPUTED

  // ACTIONS
  async function login(email, pw) {
    try {
      const credentials = await signInWithPw(email, pw);
      if (credentials?.user) {
        user.value = credentials.user;
        isAuthenticated.value = true;
        return true;
      } else {
        isAuthenticated.value = false;
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      isAuthenticated.value = false;
      return false;
    }
  }

  async function createNewAccount(email, pw) {
    try {
      const credentials = await signUp(email, pw);
      if (credentials?.user) {
        user.value = credentials.user;
        isAuthenticated.value = true;
        return true;
      } else {
        isAuthenticated.value = false;
        return false;
      }
    } catch (err) {
      console.error("Create New Account failed:", err);
      isAuthenticated.value = false;
      return false;
    }
  }

  async function logout() {
    try {
      const success = await signOut();
      if (success) {
        user.value = null;
        isAuthenticated.value = false;
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return {
    //State
    user,
    isAuthenticated,
    //Getters
    //Actions
    login,
    createNewAccount,
    logout,
  };
});
