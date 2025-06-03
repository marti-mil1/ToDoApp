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
    <!-- MOBILE NAVBAR -->
    <nav class="navbar-mobile">

        <ToggleDarKLightMode></ToggleDarKLightMode>

        <h1>Hello {{ user.email }} !</h1>

        <img @click="_handleLogout"
            :src="isDark ? '/src/assets/icons/logout_dark-mode.svg' : '/src/assets/icons/logout-light-mode.svg'"
            class="logout-icon">
    </nav>

    <!-- TABLET NAVBAR -->
    <nav class="navbar-tablet">

        <div class="toggle-theme-container">
            <ToggleDarKLightMode></ToggleDarKLightMode>
            <p class="navbar-text"> {{ isDark ? 'Dark Mode' : 'Light Mode' }}</p>
        </div>

        <h1>Hello {{ user.email }} !</h1>

        <div class="logout-container">
            <p class="navbar-text">Logout</p>

            <img @click="_handleLogout"
                :src="isDark ? '/src/assets/icons/logout_dark-mode.svg' : '/src/assets/icons/logout_light-mode.svg'"
                class="logout-icon">
        </div>

    </nav>


    <!-- DESKTOP NAVBAR -->
   <nav class="navbar-desktop">

        <div class="toggle-theme-container">
            <ToggleDarKLightMode></ToggleDarKLightMode>
            <p class="navbar-text"> {{ isDark ? 'Dark Mode' : 'Light Mode' }}</p>
        </div>

        <h1>Hello {{ user.email }} !</h1>

        <div class="logout-container">
            <p class="navbar-text">Logout</p>

            <img @click="_handleLogout"
                :src="isDark ? '/src/assets/icons/logout_dark-mode.svg' : '/src/assets/icons/logout_light-mode.svg'"
                class="logout-icon">
        </div>

    </nav>



</template>


<style scoped lang="scss">
// ---- MOBILE NAVBAR
@media screen and (max-width: 767px) {

    .navbar-mobile {
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
            line-height: var(--line-height);
            text-align: center;
            width: auto;
        }
    }

    .navbar-tablet {
        display: none;
    }

    .navbar-desktop {
        display: none;
    }
}

// ---- TABLET NAVBAR
@media screen and (min-width: 767px) and (max-width: 1339px) {

    .navbar-mobile {
        display: none;
    }

    .navbar-tablet {
        width: 100%;
        height: 3rem;
        padding: 0 2rem;
        background-color: var(--background-col);
        border-bottom: solid 1px var(--stroke-col);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .toggle-theme-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            width: 9rem;
        }

        .navbar-text {
            font-size: var(--font-size-navbar);
            font-weight: var(--font-weight-navbar);
            color: var(--navbar-text-col);
        }

        h1 {
            color: var(--navbar-text-col);
            font-size: var(--font-size-usermail);
            line-height: var(--line-height);
            text-align: center;
            width: auto;
        }

        .logout-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
            width: 9rem;
        }
    }

    .navbar-desktop {
        display: none;
    }
}

// ---- DEKTOP NAVBAR
@media screen and (min-width: 1440px) {

    .navbar-mobile {
        display: none;
    }

    .navbar-tablet {
        display: none;
    }

    .navbar-desktop {
        width: 76.62rem;
        height: 3rem;
        margin: 0 auto;
        background-color: var(--background-col);
        background-color: pink;
        border-bottom: solid 1px var(--stroke-col);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .toggle-theme-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            width: 9rem;
        }

        .navbar-text {
            font-size: var(--font-size-navbar);
            font-weight: var(--font-weight-navbar);
            color: var(--navbar-text-col);
        }

        h1 {
            color: var(--navbar-text-col);
            font-size: var(--font-size-usermail);
            line-height: var(--line-height);
            text-align: center;
            width: auto;
        }

        .logout-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
            width: 9rem;
        }
    }    
}
</style>