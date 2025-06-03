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
  <!-- MOBILE AUTH VIEW -->
  <div class="auth-view-mobile">
    <div class="auth-container">
      <img class="logo-icon" src="/src/assets/icons/logo-with-stroke.svg" alt="logo-icon">
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

  <!--  TABLET & DESKTOP AUTH VIEW -->
  <div class="auth-view-tablet auth-view-desktop">
    <div class="auth-container">
      <img class="logo-icon" src="/src/assets/icons/logo-with-stroke.svg" alt="logo-icon">
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
// MOBILE AUTH VIEW
@media screen and (max-width: 767px) {
  .auth-view-mobile {
    min-width: 320px;
    width: 100%;
    min-height: 600px;
    height: 100%;
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

  .auth-view-tablet {
    display: none;
  }

  .auth-view-desktop {
    display: none;
  }
}

// TABLET AUTH VIEW
@media screen and (min-width: 768px) and (max-width: 1339px) {
  .auth-view-mobile {
    display: none;
  }

  .auth-view-tablet {
    width: 100%;
    height: 100%;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-container {
      width: 100%;
      height: 30rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      form {
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

  .auth-view-desktop {
    display: none;
  }
}

// DESKTOP AUTH VIEW
@media screen and (min-width: 1440px) {
  .auth-view-mobile {
    display: none;
  }

  .auth-view-tablet {
    display: none;
  }

  .auth-view-desktop {
    width: 100%;
    height: 100%;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-container {
      width: 100%;
      height: 30rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      form {
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
}
</style>
