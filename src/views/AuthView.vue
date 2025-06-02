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
  <div class="auth-view">
    <div class="auth-container">
      <img class="logo-icon" src="/src/assets/icons/logo-icon.svg">
      <form @submit.prevent>
        <div class="input-container">
          <input v-model="email" placeholder="email@email.com" type="text" id="email" class="input-field" required />
          <input v-model="password" placeholder="password" type="password" id="password" class="input-field" required />
        </div>

        <div class="btn-container">
          <button @click="_handleLogin" class="primary-btn">Login</button>
          <button @click="_handleSignUp" class="secondary-btn">Create Account</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped lang="scss">
@media screen and (max-width: 767px) {
  .auth-view {
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 600px;
    padding: 0 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-container {
    width: 100%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    form {
      // margin: auto;
      // margin-bottom: 0;
      width: 17.5rem;
      height: 13rem;
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
    }
  }
}
</style>
