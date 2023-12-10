import { StatusError } from "../error/statusError"
import { User } from "../model/user"

const API_URL="http://127.0.0.1:3000"

//
const api = {
    async createUser(user: User) {
        const result = await fetch(`${API_URL}/user`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user)
        })

        //
        if (!result.ok) {
            throw new StatusError("", result.status)
        }
    },
    async updateUser(user: User) {
        const result = await fetch(`${API_URL}/user`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user)
        })

        //
        if (!result.ok) {
            throw new StatusError("", result.status)
        }
    },
    async getUser(id: number): Promise<User> {
        const result = await fetch(`${API_URL}/user/${id}`,{
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
        const result = await fetch(`${API_URL}/user`,{
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
        const result = await fetch(`${API_URL}/user/${id}`,{
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