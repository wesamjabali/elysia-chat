<template>
    <div class="chatbox">
        <div class="messages" ref="messagesRef">
            <AtomMessage v-for="(message, index) in messages" :key="index" :message="message.message" :name="message.name"
                :self="message.self" />
        </div>

        <input class="chat-input" placeholder="Message" v-model="messageInput" type="text" @keydown.enter="onMessageSend" />
    </div>
</template>

<script setup lang="ts">
import { useChat } from '~/composables/useChat';
const { messages, sendMessage, messageInput } = useChat()
const messagesRef = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
    if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
}

const onMessageSend = () => {
    sendMessage(messageInput.value)
    messageInput.value = ''
}

watch(() => messages.value.length, () => {
    setTimeout(() => scrollToBottom(), 10)
}, { immediate: true })


</script>

<style lang="scss">
.chatbox {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.messages {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem 3rem 1rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #000 #fff;
}

.chat-input {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
    border: solid;
    border-width: 1px;
}
</style>
