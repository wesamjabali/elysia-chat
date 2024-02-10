const user = ref<{ name: string } | null>(null)

const useUser = () => {
    onMounted(() => {
        const existingUser = JSON.parse(localStorage.getItem('user') || 'null')
        if (existingUser) {
            user.value = existingUser
        }
    })

    const setUser = (newUser: typeof user['value']) => {
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser))
        } else {
            localStorage.removeItem('user')
        }

        user.value = newUser
    }

    onBeforeUnmount(() => {
        localStorage.removeItem('user')
    })

    return { user, setUser }
}

export { useUser }
