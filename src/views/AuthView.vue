<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const email = ref('')
const pw = ref('')

const userStore = useUserStore()
const { user, isAuthenticated } = storeToRefs(userStore)
const { login, createNewAccount, logout } = userStore

const _handleLogin = async () => {
  try {
    const allGood = await login(email.value, pw.value)
    if (!allGood) {
      alert('Login failed: Check your email or password')
    } else {
      alert('Login successful!')
    }
  } catch (err) {
    console.error("Unexpected error during login:", err)
  }
}

const _handleSignUp = async () => {
  try {
    const allGood = await createNewAccount(email.value, pw.value)
    if (!allGood) {
      alert('Sign-up failed: Email may already be registered or password too weak')
    } else {
      alert('Sign-up successful!')
    }
  } catch (err) {
    console.error("Unexpected error during sign-up:", err)
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="_handleLogin">
      <label>Email</label>
      <input type="email" placeholder="your.email@email.com" v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="pw" required />

      <button type="submit" class="submit-btn">SIGN IN</button>
    </form>

    <button @click="_handleSignUp" class="signup-btn">CREATE AN ACCOUNT</button>
  </main>
</template>

<style scoped>
main {
  padding: 20px 0 40px;
  width: 100%;
  height: 100%;
  background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  width: 280px;
  display: flex;
  flex-direction: column;
}

.submit-btn {
  margin-top: 10px;
  background-color: lightblue;
  border: none;
}

.submit-btn:hover {
  background-color: rgb(126, 195, 218);
}

.signup-btn {
  margin-top: 50px;
  width: 280px;
  background-color: lightyellow;
  border: none;
}

.signup-btn:hover {
  background-color: rgb(250, 250, 116);
}
</style>
