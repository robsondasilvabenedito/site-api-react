import { createSlice } from "@reduxjs/toolkit"

interface InitialStateType {
    code: number,
}

const initialState: InitialStateType = {
    code: 0
}

const statusCodeSlice = createSlice({
    name: 'statusCode',
    initialState,
    reducers: {
        setStatusCode: (state, action) => {
            state.code = action.payload
        }
    }
})

export const {setStatusCode} = statusCodeSlice.actions

export default statusCodeSlice.reducer