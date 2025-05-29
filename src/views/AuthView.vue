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

  <form @submit.prevent>
    <div class="input-container">
      <input v-model="email" placeholder="email@example.com" type="text" id="email" class="input-field" required />
      <input v-model="password" placeholder="password" type="password" id="password" class="input-field" required />
    </div>


    <br>
    <div class="btn-container">
      <button @click="_handleLogin" class="primary-btn">Login</button>
      <button @click="_handleSignUp" class="secondary-btn">Create Account</button>
    </div>

  </form>

</template>


<style scoped lang="scss">

form {
  margin: auto;
  margin-bottom: 0;
  width: 17.5rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .input-container,
  .btn-container {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .input-field,
  .primary-btn,
  .secondary-btn {
    width: 100%;
    height: 2.75rem;
  }
}
</style>
