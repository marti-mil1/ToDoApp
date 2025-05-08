<script setup>

const _handleLogin = () => {

}


</script>

<template>
  <main>
    <form @submit.prevent="_handleLogin">
      <label>email</label>
      <input type="email" placeholder="your.email@email.com" required />
      <label>password</label>
      <input type="password" required>
      <button @click="login" type="sumbit" class="submit-btn">SIGN IN</button>
    </form>

    <button @click="signUp" type="sumbit" class="signup-btn">CREATE AN ACCOUNT</button>
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
  border: none
}

.submit-btn:hover {
  background-color: rgb(126, 195, 218)
}

.signup-btn {
  margin-top: 50px;
  width: 280px;
  background-color: lightyellow;
  border: none
}

.signup-btn:hover {
  background-color: rgb(250, 250, 116);
}
</style>
