<script setup>
import ToggleDarKLightMode from './ToggleDarKLightMode.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';

const userStore = useUserStore()
const { user, logout } = userStore

const router = useRouter()

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

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
         <img @click="_handleLogout" :src="isDark ? '/src/assets/icons/logout_dark-mode.svg' : '/src/assets/icons/logout-light-mode.svg'" class="logout-icon">
    </nav>

</template>


<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 3rem;
    background-color: var(--background-col);
    border-bottom: solid 1px var(--stroke-col);
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: var(--navbar-text-col);
        font-size: var(--font-size-usermail);
    }
}
</style>