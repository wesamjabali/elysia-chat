import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../../server/src/index";
const eden = edenTreaty<App>('https://chatapi.wesamjabali.com:3000');
export function useEden() {
    return { eden }
}