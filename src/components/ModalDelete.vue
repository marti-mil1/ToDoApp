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
        <p>Sure to DELETE this task?</p>

        <div class="modal-buttons">
            <button @click="confirm">Delete</button>
            <button @click="cancel">Cancel</button>
        </div>

    </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1024px) {
    .modal {
        width: 100%;
        height: 11rem;
        padding: 0.5rem;
        text-align: center;
        margin: -2rem auto;
        background-color: var(--background-col);
        border: solid 1px var(--stroke-col);
        border-radius: var(--border-radius);

        p {
            font-family: var(--font-family);
            font-size: var(--font-size-delete-modal);
            font-weight: var(--font-weight-delete-modal);
            color: var(--delete-modal-text-color);
            margin: 1.25rem auto 0;
            text-align: center;
            line-height: var(--line-height);
        }

        .modal-buttons {
            display: flex;
            justify-content: center;
            gap: 0.5rem;

            button {
                width: 4.125rem;
                height: 2.25rem;
                margin-top: 0.5rem;
                background-color: var(--delete-modal-btn-col);
                color: var(--delete-modal-text-col);
                border-radius: var(--border-radius);
                border: none;
                line-height: var(--line-height);

                &:hover {
                    background-color: var(--background-col);
                    color: var(--delete-modal-text-color);
                    border: solid 1px var(--delete-modal-text-color);
                    transition: all 0.3s ease;
                }
            }
        }
    }
}


@media screen and (min-width: 1024px) {
    .modal {
        width: 100%;
        height: 8rem;
        padding: 0.5rem;
        text-align: center;
        margin: -2rem auto 0;
        background-color: var(--background-col);
        border: solid 1px var(--stroke-col);
        border-radius: var(--border-radius);

        p {
            font-family: var(--font-family);
            font-size: var(--font-size-delete-modal);
            font-weight: var(--font-weight-delete-modal);
            color: var(--delete-modal-text-color);
            margin: 1.25rem auto 0;
            text-align: center;
            line-height: var(--line-height);
        }

        .modal-buttons {
            display: flex;
            justify-content: center;
            gap: 0.5rem;

            button {
                width: 4.125rem;
                height: 2.25rem;
                margin-top: 0.5rem;
                background-color: var(--delete-modal-btn-col);
                color: var(--delete-modal-text-col);
                border-radius: var(--border-radius);
                border: none;
                line-height: var(--line-height);

                &:hover {
                    background-color: var(--background-col);
                    color: var(--delete-modal-text-color);
                    border: solid 1px var(--delete-modal-text-color);
                    transition: all 0.3s ease;
                }
            }
        }
    }
}
</style>