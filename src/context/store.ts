import { configureStore } from "@reduxjs/toolkit"
import statusCode from "./redux/statusCode"
import usersStore from "./redux/usersStore"

export const store = configureStore({
    reducer: {
        statusCode: statusCode,
        userStore: usersStore
    }
})