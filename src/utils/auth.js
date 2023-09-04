import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { writable } from 'svelte/store'

const noAuth = {
    "userID": "",
    "token": ""
}

export const isLoggedStore = writable(false)

export function logOut() {
    localStorage.setItem("auth", JSON.stringify(noAuth))
    isLoggedStore.set(false)

    return true
}

export function getUserID() {
    const auth = localStorage.getItem("auth")
    if(auth) {
        return JSON.parse(auth)["userID"]
    }
    return null
}

export function getTokenFromLocalStorage() {
    const auth = localStorage.getItem("auth")
    if(auth) {
        return JSON.parse(auth)["token"]
    }
    return null
}

export async function checkLoggedIn() {
    try {
        const response = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getTokenFromLocalStorage()
            }
        })

        const res = await response.json()
        if(response.status == 200) {
            localStorage.setItem("auth", JSON.stringify({
                "userID": res.record.id,
                "token": res.token
            }))

            isLoggedStore.set(true)
            return true
        } else {
            return false
        }
    } catch {
        return false
    }
}

export async function authenticateUser(username, password) {
    const response = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            identity: username, password
        })
    })

    const res = await response.json()
    if (response.status == 200) {
        localStorage.setItem("auth", JSON.stringify({
            "userID": res.record.id,
            "token": res.token
        }))
        isLoggedStore.set(true)

        return {
            success: true,
            res: res
        }
    }

    return {
        success: false,
        res: res
    }
}