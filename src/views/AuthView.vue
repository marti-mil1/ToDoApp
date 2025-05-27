<script setup>
// import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter()

const userStore = useUserStore()

const { email, password } = storeToRefs(userStore)

const {
  register,
  login
} = userStore


const _handleLogin = async () => {
  try {
    const success = await login()

    if (success) {
      router.push('/projects')
    }

    //una vez recibidos los datos limpiamos el formulario
    email.value = ''
    password.value = ''
  } catch (err) {
    console.error(err)
    toast("Login failed: invalid email or password!", {
      "theme": "auto",
      "type": "default",
      "dangerouslyHTMLString": true
    })
  }
}

const _handleSignUp = async () => {
  try {
    const success = await register()

    if (success) {
      router.push('/projects')
    }

    //una vez recibidos los datos limpiamos el formulario
    email.value = ''
    password.value = ''
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>

  <h1>Home / Auth View</h1>
  <form @submit.prevent>
    <label for="email">Your email:</label>
    <input v-model="email" placeholder="email@example.com" type="text" id="email" required />
    <label for="password">Your password:</label>
    <input v-model="password" placeholder="password" type="password" id="password" required />

    <br>

    <button @click="_handleLogin">Login</button>
    <button @click="_handleSignUp">Create Account</button>
    

  </form>

</template>

<style scoped lang="scss">
form {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;

  input,
  button {
    width: 100%;
  }

  h2 {
    text-align: center;
  }

  button:hover {
    background-color: lightyellow;
    padding: 12px 0;
    border: none;
    border-radius: 2px;
  }
}
</style>
