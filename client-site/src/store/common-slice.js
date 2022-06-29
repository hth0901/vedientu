import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        arrCustomerType: [],
        exportReceipt: false,
        arrReceipt: [],
    },
    reducers: {
        setArrCustomerType(state, action) {
            state.arrCustomerType = [...action.payload.data]
        },

        setExportReceipt(state, action) {
            state.exportReceipt = action.payload
        },

        setArrReceipt(state, action) {
            const arrResult = []
            action.payload.data.forEach((el) => {
                arrResult.push({ ...el })
            })

            state.arrReceipt = arrResult
        },
    },
})

export const commonActions = commonSlice.actions

export default commonSlice
