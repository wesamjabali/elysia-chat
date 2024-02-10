<template>
    <div class="login">
        <input class="login-input" placeholder="Username" v-model="username" type="text" @keydown.enter="onLogin" />
    </div>
</template>

<script setup lang="ts">
import { useUser } from '~/composables/useUser';
const { setUser } = useUser()
const username = ref<string>('')

const onLogin = () => {
    setUser({ name: username.value })
}
</script>