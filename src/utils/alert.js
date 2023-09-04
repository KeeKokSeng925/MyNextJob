import { writable } from "svelte/store"

function createAlertStore() {
    const defaultValue = { message: null, type: null }
    const { subscribe, set } = writable(defaultValue)

    return {
        subscribe,
        set: (message, type) => set({ message, type }),
        clear: () =>  set(defaultValue)
    }
}

export const alerts = createAlertStore()