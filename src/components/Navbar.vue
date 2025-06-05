<script setup>
import ToggleDarKLightMode from './ToggleDarKLightMode.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import LogoutIconDarkMode from '@/assets/icons/logout_dark-mode.svg';
import LogoutIconLightMode from '@/assets/icons/logout_light-mode.svg'

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
        <div class="all-elements-container">
            <div class="toggle-theme-container">
            <ToggleDarKLightMode></ToggleDarKLightMode>
            <p class="navbar-text"> {{ isDark ? 'Dark Mode' : 'Light Mode' }}</p>
        </div>

        <h1>Hello {{ user.email }} !</h1>

        <div class="logout-container">
            <p class="navbar-text">Logout</p>

            <img @click="_handleLogout"
                :src="isDark ? LogoutIconDarkMode : LogoutIconLightMode"
                class="logout-icon">
        </div>
        </div>
        
    </nav>

</template>



<style scoped lang="scss">
@media screen and (max-width: 767px) {
    .navbar-text {
        display: none;
    }
}

.navbar {
    width: 100%;
    min-width: 320px;
    height: 3rem;
    padding: 0 2rem;
    background-color: var(--background-col);
    border-bottom: solid 1px var(--stroke-col);
    display: flex;
    justify-content: center;
    align-items: center;

    .all-elements-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        min-width: 320px;
        max-width: 1024px;
        height: 100%;
    }

    .toggle-theme-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        width: auto;
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
        width: auto;

        .logout-icon {
            cursor: pointer
        }
        
    }
}

@media screen and (min-width: 1024px) {
    .navbar {
        padding: 0;
    }
}
</style>