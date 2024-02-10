<template>
    <div class="message">
        <div class="name-label" :class="self && 'name-label--sent'">{{ props.name }}</div>
        <div :class="self ? 'message--sent' : 'message--received'">
            {{ message }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    message: {
        type: String,
        required: true
    },
    self: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss">
.message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0.5rem;
    width: 100%;
    word-wrap: break-word;

    &--sent {
        background-color: #c6c6c6;
        color: #000;
        border-radius: 1rem 1rem 0 1rem;
        padding: 0.5rem;
        align-self: flex-end;
    }

    &--received {
        background-color: #373737;
        color: #fff;
        border-radius: 1rem 1rem 1rem 0;
        padding: 0.5rem;
        align-self: flex-start;
    }
}

.name-label {
    margin: 0 1rem 0.1rem 1rem;
    font-size: small;

    &--sent {
        align-self: flex-end;
    }
}
</style>