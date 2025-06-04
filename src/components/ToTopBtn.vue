<script setup>
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
    <img :src="isDark ? '/src/assets/icons/arrow_upward-dark-mode.svg' : '/src/assets/icons/arrow_upward-light-mode.svg'"
        class="back-to-top-btn" @click="backToTop">
</template>

<style scoped lang="scss">
.back-to-top-btn {
    z-index: 99;
    background-color: var(--background-col);
    border: solid 1px var(--stroke-col);
    border-radius: 100%;
    position: fixed;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.5rem;
    bottom: 1rem;

    &:hover {
        border: solid 2px var(--stroke-col)
    }
}
</style>