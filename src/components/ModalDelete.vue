<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    project: Object
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
    emit('confirm', props.project.id)
}

const cancel = () => {
    emit('cancel')
}

</script>

<template>
    <div class="modal">
        <p>Are you sure you want to REMOVE this task?</p>

        <div class="modal-buttons">
            <button @click="confirm">Yes</button>
            <button @click="cancel">Cancel</button>
        </div>

    </div>
</template>

<style scoped lang="scss">
.modal {
    width: 200px;
    height: auto;
    padding: 10px;
    text-align: center;
    margin: 0 auto;

    .modal-buttons {
        display: flex;
        justify-content: center;
        gap: 3px;

        button {
            width: 50px;
        }
    }
}
</style>