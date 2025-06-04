<script setup>
import { RouterLink } from "vue-router"

const lines = [
    'Sorry,',
    'you are',
    'not logged in.',
];
</script>

<template>
    <div class="anauthorized-view">
        <div class="line" v-for="(line, index) in lines" :key="index" :style="{ animationDelay: `${index * 0.5}s` }">
            {{ line }}
        </div>

        <div class="line last-line" :style="{ animationDelay: `${lines.length * 0.5}s` }">
            <RouterLink to="/">Please go to Login</RouterLink>
        </div>
    </div>
</template>


<style scoped lang="scss">
.anauthorized-view {
    width: 100%;
    height: 100vh;
    background-color: var(--chili);
    color: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: var(--font-family);
    font-size: var(--font-size-anauthorized-view);
    font-weight: var(--font-weight-anauthorized-view);
    line-height: 140%;
    padding: 2rem;

    .line {
        opacity: 0;
        transform: translateY(-1rem);
        animation: fadeInLine 0.5s ease-out forwards;
    }

    .last-line {
        margin-top: 2.5rem;

        a {
            color: var(--black);
            text-decoration: underline;
            transition: color 0.3s ease;
            font-size: 1.5rem;
            font-weight: normal;
            cursor: pointer;
        }

        a:hover {
            color: var(--cream);
        }
    }
}

@keyframes fadeInLine {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
