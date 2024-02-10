import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../../server/src/index";
const eden = edenTreaty<App>('http://66.42.126.7:3000');
export function useEden() {
    return { eden }
}