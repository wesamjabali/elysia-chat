<template>
    <div>
        <MoleculeLogin v-if="!user" />
        <MoleculeChatbox v-else />
    </div>
</template>

<script setup lang="ts">
import { useUser } from '~/composables/useUser';

const { user } = useUser()
</script>