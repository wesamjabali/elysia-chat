<template>
    <div>
        <MoleculeLogin class="center-input" v-if="!user" />
        <MoleculeChatbox v-else />
    </div>
</template>

<script setup lang="ts">
import { useUser } from '~/composables/useUser';

const { user } = useUser()
</script>

<style lang="scss">
.center-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
