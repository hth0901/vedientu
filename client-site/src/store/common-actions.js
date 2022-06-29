import { commonActions } from './common-slice'

const API_URL = process.env.REACT_APP_URL

export const getArrCustomerType = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/api/doituong`)
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            return data
        }

        try {
            const data = await getData()
            dispatch(commonActions.setArrCustomerType({ data }))
        } catch (err) {}
    }
}

export const getArrReceipt = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/api/Receipt/getall`)
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            return data
        }

        try {
            const data = await getData()
            dispatch(commonActions.setArrReceipt({ data }))
        } catch (err) {}
    }
}
