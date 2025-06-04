<script setup>
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const { toggleTheme, isDark } = themeStore;

</script>


<template>
    <div class="toggle" @click="toggleTheme">
        <div :class="['toggle-btn', isDark ? 'dark' : 'light']"></div>
    </div>
</template>


<style scoped lang="scss">
.toggle {
    width: 2.75rem;
    height: 1.5rem;
    padding: 0.1875rem;
    border-radius: 1.25rem;
    background-color: var(--toggle-background-col);
    position: relative;
    cursor: pointer;
}

.toggle-btn {
    position: absolute;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 100%;
    background-color: var(--toggle-btn-col);
    transform: translateX(var(--toggle-translateX));
    transition: transform 0.5s ease, background-color 0.3s ease;
}
</style>