// src/stores/user.js
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createAccount,
  loginUser,
  seeCurrentUser,
  logoutUser,
} from "../api/supabase/userApi";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const useUserStore = defineStore(
  "user",
  () => {
    const email = ref("");
    const password = ref("");
    const user = ref(null);

    async function register() {
      try {
        const data = await createAccount({
          email: email.value,
          password: password.value,
        });

        user.value = data.user;
        console.log("Account created:", data);
        return true;
      } catch (error) {
        console.error(`Register failed: ${error.message}`);
        toast(`SignUp failed: ${error.message}`, {
          theme: "auto",
          type: "default",
          dangerouslyHTMLString: true,
        });
        return false;
      }
    }

    async function login() {
      try {
        const data = await loginUser({
          email: email.value,
          password: password.value,
        });

        user.value = data.user;
        console.log("Login successful:", data);
        return true;
      } catch (error) {
        console.error(`Login failed: ${error.message}`);
        toast(`Login failed: invalid mail or password!`, {
          theme: "auto",
          type: "default",
          dangerouslyHTMLString: true,
        });
        return false;
      }
    }

    async function fetchCurrentUser() {
      try {
        const data = await seeCurrentUser();

        if (data.session && data.session.user) {
          user.value = data.session.user;
          console.log(`Current user:`, user.value);
        } else {
          user.value = null;
        }
      } catch (error) {
        console.error(`Fetch user error: ${error.message}`);
      }
    }

    async function logout() {
      try {
        await logoutUser();
        console.log("Logged out");
        email.value = "";
        password.value = "";
        user.value = null;
      } catch (error) {
        console.error("Logout error:", error.message);
         toast(`Logout failed: ${error.message}`, {
          theme: "auto",
          type: "default",
          dangerouslyHTMLString: true,
        });
      }
    }

    return {
      email,
      password,
      user,
      register,
      login,
      fetchCurrentUser,
      logout,
    };
  },
  {
    persist: {
      paths: ["user", "email"],
    },
  }
);
