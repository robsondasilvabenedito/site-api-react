import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../common/model/user";
import api from "../../common/config/api";
import { StatusError } from "../../common/error/statusError";

interface InitialStateType {
    user: any,
    users: User[]
    error: number
}

const initialState: InitialStateType = {
    user: {},
    users: [],
    error: 0
}

const usersStore = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.user = {}
        },
        setUserField: (state, actions) => {
            let fieldValue: { field: string, value: string | number } = actions.payload

            //
            state.user = { ...state.user, [fieldValue.field]: fieldValue.value }
        }
    },
    extraReducers(builder) {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            //
            let payload: number | User[] = action.payload

            //
            if (typeof payload === "number") {
                state.error = payload

                return
            }

            //
            state.error = 0
            state.users = payload
        }),
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            //
            let payload: number | User[] = action.payload

            //
            if (typeof payload === "number") {
                state.error = payload

                return
            }

            //
            state.error = 0
            state.users = payload
        }),
        builder.addCase(getUser.fulfilled, (state, action) => {
            //
            let payload: number | User = action.payload

            //
            if (typeof payload === "number") {
                state.error = payload

                return
            }

            //
            state.error = 0
            state.user = payload
        })
    }
})

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        //
        let users: User[]

        //
        try {
            users = await api.getUsers()
        } catch (err) {
            let statusError = err instanceof StatusError ? err : new StatusError("", 500)

            return statusError.code
        }

        //
        return users
    })

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id: number) => {
        //
        let users: User[]

        //
        try {
            await api.deleteUser(id)
            users = await api.getUsers()
        } catch (err) {
            let statusError = err instanceof StatusError ? err : new StatusError("", 500)

            return statusError.code
        }

        //
        return users
    })

export const getUser = createAsyncThunk(
    "users/getUser",
    async (id: number) => {
        //
        let user: User

        //
        try {
            user = await api.getUser(id)
        } catch (err) {
            let statusError = err instanceof StatusError ? err : new StatusError("", 500)

            return statusError.code
        }

        //
        return user
    }
)

export const { resetUser, setUserField } = usersStore.actions

export default usersStore.reducer