import cors from "@elysiajs/cors";
import { Elysia, t } from "elysia";


const chatSockets = new Map<string, { ws: ReturnType<Elysia['ws']>, name: string }>();
const chatMessages: { name: string, message: string, wsId: string }[] = [];
const commands = ['nick', 'join']

const sendToAll = (ws: ReturnType<Elysia['ws']>, messageResponse: {
  name: string;
  message: string;
  self?: boolean;
}, skipSelf = false) => {
  chatSockets.forEach(socket => {
    if (skipSelf && socket.ws.id === ws.id) return;
    socket.ws.send({ ...messageResponse, self: messageResponse.self || false })
  })
}

const findSocketByName = (name: string) => {
  return Array.from(chatSockets.values()).find(socket => socket.name === name);
}

const app = new Elysia()
  .use(cors({ "origin": true }))
  .ws('/chat', {
    body: t.Object({
      message: t.String(),
    }),
    response: t.Object({
      name: t.String(),
      message: t.String(),
      self: t.Optional(t.Boolean({ default: false })),
      error: t.Optional(t.Nullable(t.String({ default: null }))),
    }),
    open: async (ws) => {
      console.log('open' + ws.id)
      for (const message of chatMessages) {
        ws.send({ message: message.message, name: message.name, self: message.wsId === ws.id });
      }
    },
    close: (ws) => {
      const name = chatSockets.get(ws.id)?.name;
      const disconnectedMessage = { name: 'system', message: `${name} disconnected`, self: false }
      if (name) {
        chatSockets.forEach(chat => chat.ws.send(disconnectedMessage))
        chatMessages.push({ ...disconnectedMessage, wsId: ws.id });
      }
      chatSockets.delete(ws.id);
      console.log(chatSockets.keys())
    },
    message: (ws, data) => {
      console.log(data.message)
      const command = data.message.split(' ')?.[0]?.slice(1);
      const isCommand = data.message.startsWith('/') && commands.includes(command);

      if (isCommand) {
        switch (command) {
          case 'join':
            if (chatSockets.has(ws.id)) return;
          case 'nick':
            const newName = data.message.split(' ')?.[1];
            const existingName = chatSockets.get(ws.id)?.name;
            if (findSocketByName(newName)) {
              ws.send({ name: 'system', message: `Name ${newName} is already taken`, self: false, error: 'nametaken' });
              return;
            }
            if (newName && newName !== existingName) {
              chatSockets.set(ws.id, { ws, name: newName });
              const messageToSend = command === 'nick' ?
                { name: 'system', message: `${existingName} changed their name to ${newName}` } :
                { name: 'system', message: `${newName} joined the chat` }

              sendToAll(ws, messageToSend);
              chatMessages.push({ ...messageToSend, wsId: ws.id });
            }
            break;
        }

        return;
      }

      const messageToSend = { name: chatSockets.get(ws.id)?.name || 'user', message: data.message }
      sendToAll(ws, messageToSend, true);
      ws.send({ ...messageToSend, self: true })
      chatMessages.push({ ...messageToSend, wsId: ws.id });

      if (chatMessages.length > 20) {
        chatMessages.shift();
      }
    },
  })
  .get('/', () => {
    return 'Hello world.'
  })
  .listen({ hostname: "0.0.0.0", port: 3000 })

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
