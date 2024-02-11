import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../../server/src/index";
const eden = edenTreaty<App>('https://chatapi.wesamjabali.com:443');
// const eden = edenTreaty<App>('http://localhost:443')
export function useEden() {
    return { eden }
}