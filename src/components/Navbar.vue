<script setup>
import ToggleDarKLightMode from './ToggleDarKLightMode.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()
const { user, logout } = userStore

const router = useRouter()

const _handleLogout = async () => {
    await logout()
    router.push('/')
}

</script>

<template>

    <nav class="navbar">

        <ToggleDarKLightMode></ToggleDarKLightMode>

        <h1>Hello {{ user.email }} !</h1>
        <!-- <h1> hello test </h1> -->

        <!-- <button @click="_handleLogout"><img src="../assets/icons/logout_24dp_000_FILL0_wght400_GRAD0_opsz24.svg"></button> -->
         <img @click="_handleLogout" src="../assets/icons/logout_dark-mode.svg" class="logout-icon">
    </nav>

</template>


<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 3rem;
    background-color: var(--background-color-dark-mode);
    // background-color: pink;
    border-bottom: solid 1px var(--stroke-color-dark-mode);
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: var(--navbar-text-color-dark-mode);
        font-size: var(--font-size-usermail);
        font-family: var(--font-family);
        line-height: var(--line-height);
    }

    .logout-icon {
        color: pink;
    }
}
</style>