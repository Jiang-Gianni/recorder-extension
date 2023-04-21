import './app.css'
import App from './App.svelte'
import { writable } from "svelte/store";

const status = writable<number>(1);

const app = new App({
  target: document.getElementById('app'),
})

export default app
export { status }