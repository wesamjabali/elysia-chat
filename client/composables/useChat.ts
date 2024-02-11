import type { EdenTreaty } from "@elysiajs/eden/treaty"
const { eden } = useEden()

export const useChat = () => {
    const { user } = useUser()
    const messages = ref<Array<{ name: string, message: string, self?: boolean }>>([])
    const messageInput = ref('')
    const isInitiated = ref(false)

    const handleMessage = ({ data }: EdenTreaty.OnMessage<any>) => {
        messages.value.push(data)
    }


    const sendMessage = (message: string) => {
        if (!message) {
            return
        }

        ws.send({ message: message })
    }


    const ws = eden.chat.subscribe().on('message', handleMessage)
    ws.on('open', () => {
        ws.send({ message: `/join ${user.value?.name}` })
    }).on('message', (event) => {
        console.log(event.data)
    })
    isInitiated.value = true

    return { messages, messageInput, sendMessage }
}


