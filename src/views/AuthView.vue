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
      theme: "colored",
      type: "info",
      position: "top-center",
      transition: "slide",
      dangerouslyHTMLString: true,
    });
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
      <img class="logo-icon" src="/src/assets/icons/logo-with-stroke.svg" alt="logo-icon">
      <form @submit.prevent>
        <div class="inputs-container">
          <input v-model="email" placeholder="email@email.com" type="text" id="email" class="input-field" required />
          <input v-model="password" placeholder="password" type="password" id="password" class="input-field" required />
        </div>

        <div class="btns-container">
          <button @click="_handleLogin" class="primary-btn">Login</button>
          <button @click="_handleSignUp" class="secondary-btn">Create Account</button>
        </div>
      </form>
    </div>
  </div>

</template>


<style scoped lang="scss">
.auth-view {
  min-width: 320px;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .auth-container {
    width: 17.5rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    form {
      width: 100%;
      height: 13rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .inputs-container,
      .btns-container {
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
