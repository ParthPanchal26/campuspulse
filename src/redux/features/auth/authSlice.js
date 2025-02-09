import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') || null,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        logout: (state) => {
            state.token = null
            localStorage.removeItem('token')
        }
    },
})


export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer