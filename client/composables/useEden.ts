import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../../server/src/index";
const eden = edenTreaty<App>('https://chatapi.wesamjabali.com:8443');
export function useEden() {
    return { eden }
}