import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showLoading: false,
        isQuickOrder: true,
        showLoginPanel: false,
        showRegisterPanel: false,
    },
    reducers: {
        setShowLoading(state, action) {
            state.showLoading = action.payload
        },
        setOrderType(state, action) {
            state.isQuickOrder = action.payload
        },
        setShowLogin(state, action) {
            state.showLoginPanel = action.payload
        },
        setShowRegister(state, action) {
            state.showRegisterPanel = action.payload
        },
    },
})

export const uiActions = uiSlice.actions

export default uiSlice
