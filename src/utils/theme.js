import { writable } from "svelte/store"

function createThemeStore() {
    const lightMode = ['lightMode', 'mytheme', 'retro']
    const darkMode = ['darkMode', 'synthwave', 'night']
    const { subscribe, set } = writable(lightMode)

    return {
        subscribe,
        setDark: () => set(darkMode),
        setLight: () => set(lightMode),
    }
}

export const themes = createThemeStore()

export function toggleTheme() {
    const getThemeLocalStorage = localStorage.getItem("theme")
    if (getThemeLocalStorage == 'lightMode') {
        themes.setDark()
        localStorage.setItem("theme", 'darkMode')
    } else {
        themes.setLight()
        localStorage.setItem("theme", 'lightMode')
    }
}

export async function checkTheme() {
    const getThemeLocalStorage = localStorage.getItem("theme")

    switch (getThemeLocalStorage) {
        case 'lightMode':
            themes.setLight()
            break;
        case 'darkMode':
            themes.setDark()
            break;
        default:
            localStorage.setItem("theme", 'lightMode')
            themes.setLight()
    }
}