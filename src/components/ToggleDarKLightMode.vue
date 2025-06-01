<script setup>
</script>

<template>
<div class="toggle dark-mode">
    <div class="toggle-btn dark-mode"></div>
</div>
</template>


<style scoped lang="scss">
.toggle {
    width: 2.75rem;
    height: 1.5rem;
    // width: 44px;
    // height: 24px;
    border-radius: 1.25rem;
    padding: 0.1875rem;

    &.dark-mode {
        background-color: var(--toggle-background-color-dark-mode);
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    &.light-mode {
        background-color: var(--toggle-background-color-light-mode);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    
    .toggle-btn {
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 100%;

        &.dark-mode {
            background-color: var(--toggle-btn-color-dark-mode);
        }

         &.light-mode {
            background-color: var(--toggle-btn-color-light-mode)
        }
    }
}

</style>