<script setup>
// import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const { email, password, user } = storeToRefs(userStore)

const {
  register,
  login,
  fetchCurrentUser,
  logout
} = userStore

const checkProjects = () => {
  router.push('/projects')
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

    <button @click="register" v-show="!user">Create Account</button>
    <button @click="login" v-show="!user">Login</button>

    <h2 v-show="user"> Welcome {{ email }} !</h2>

   

    <button @click="checkProjects" v-show="user">Check your pending projects</button>
    <button @click="logout" v-show="user">Logout</button>
  </form>

</template>

<style scoped>
form {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px
}

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
</style>
