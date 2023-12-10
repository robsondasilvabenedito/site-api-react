import { StatusError } from "../error/statusError"
import { User } from "../model/user"

const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`

//
const API_CREATE_USER = `${import.meta.env.VITE_API_CREATE_USER}`
const API_DELETE_USER = `${import.meta.env.VITE_API_DELETE_USER}`
const API_GET_USER = `${import.meta.env.VITE_API_GET_USER}`
const API_GET_USERS = `${import.meta.env.VITE_API_GET_USERS}`
const API_UPDATE_USER = `${import.meta.env.VITE_API_UPDATE_USER}`

//
const api = {
    async createUser(user: User) {
        const result = await fetch(`${API_URL}/${API_CREATE_USER}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        //
        if (!result.ok) {
            throw new StatusError("", result.status)
        }
    },
    async updateUser(user: User) {
        const result = await fetch(`${API_URL}/${API_UPDATE_USER}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        //
        if (!result.ok) {
            throw new StatusError("", result.status)
        }
    },
    async getUser(id: number): Promise<User> {
        const result = await fetch(`${API_URL}/${API_GET_USER}/${id}`, {
            method: "GET",
        })

        //
        if (!result.ok) {
            throw new StatusError("", result.status)
        }

        //
        return (await result.json())[0]
    },
    async getUsers(): Promise<User[]> {
        const result = await fetch(`${API_URL}/${API_GET_USERS}`, {
            method: "GET",
        })

        //
        if (!result.ok) {
            throw new StatusError("", result.status)
        }

        //
        return await result.json()
    },
    async deleteUser(id: number) {
        const result = await fetch(`${API_URL}/${API_DELETE_USER}/${id}`, {
            method: "DELETE",
        })

        //
        if (!result.ok) {
            console.log(result.body)

            throw new StatusError("", result.status)
        }
    }
}

//
export default api