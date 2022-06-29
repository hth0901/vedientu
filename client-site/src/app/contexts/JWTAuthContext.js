import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import Cookies from 'js-cookie'
import { uiActions } from 'store/ui-slice'
import { useDispatch } from 'react-redux'

const API_URL = process.env.REACT_APP_URL

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    errorMessage: '',
    token: '',
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        const { token, user } = accessToken
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        // localStorage.setItem('accessToken', accessToken)
        // axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                errorMessage: '',
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                errorMessage: '',
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                errorMessage: '',
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                errorMessage: '',
                isAuthenticated: true,
                user,
            }
        }
        case 'ERROR': {
            return {
                ...state,
                errorMessage:
                    'Đăng nhập không thành công, hãy kiểm tra lại tài khoản',
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatchData] = useReducer(reducer, initialState)
    const dispatch = useDispatch()

    const login = async (uname, pword) => {
        const getData = async () => {
            const res = await fetch(`${API_URL}/api/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: uname,
                    Password: pword,
                }),
            })
            if (!res.ok) {
                throw new Error('Đăng nhập không thành công')
            }
            const data = await res.json()
            return data
        }
        try {
            dispatch(uiActions.setShowLoading(true))
            const loginData = await getData()
            dispatch(uiActions.setShowLogin(false))
            dispatch(uiActions.setShowLoading(false))
            const userInfo = {
                displayName: loginData.displayName,
                username: loginData.username,
                roleid: loginData.roleId,
            }
            const accessToken = { token: loginData.token, user: userInfo }

            setSession(accessToken)

            dispatchData({
                type: 'LOGIN',
                payload: {
                    user: { ...userInfo },
                },
            })
        } catch (err) {
            dispatch(uiActions.setShowLoading(false))
            dispatchData({
                type: 'ERROR',
            })
        }
    }

    const register = async (registerData) => {
        const getData = async () => {
            const res = await fetch(`${API_URL}/api/account/regisgeruser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...registerData }),
            })
            if (!res.ok) {
                throw new Error('Đăng nhập không thành công')
            }
            const data = await res.json()
            return data
        }

        try {
            dispatch(uiActions.setShowLoading(true))
            const loginData = await getData()
            dispatch(uiActions.setShowRegister(false))
            dispatch(uiActions.setShowLoading(false))
            const userInfo = {
                displayName: loginData.displayName,
                username: loginData.username,
                roleid: loginData.roleId,
            }
            const accessToken = { token: loginData.token, user: userInfo }

            setSession(accessToken)

            dispatchData({
                type: 'REGISTER',
                payload: {
                    user: { ...userInfo },
                },
            })
        } catch (err) {
            dispatch(uiActions.setShowLoading(false))
            dispatchData({
                type: 'ERROR',
            })
        }
    }
    // const register = async (email, username, password) => {
    //     const response = await axios.post('/api/auth/register', {
    //         email,
    //         username,
    //         password,
    //     })

    //     const { accessToken, user } = response.data

    //     setSession(accessToken)

    //     dispatchData({
    //         type: 'REGISTER',
    //         payload: {
    //             user,
    //         },
    //     })
    // }

    const logout = () => {
        setSession(null)
        Cookies.remove('user')
        dispatchData({ type: 'LOGOUT' })
    }

    useEffect(() => {
        try {
            const accessToken = window.localStorage.getItem('token')

            if (accessToken && isValidToken(accessToken)) {
                const currentUser = window.localStorage.getItem('user')
                const userInfo = JSON.parse(currentUser)

                dispatchData({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: true,
                        user: { ...userInfo },
                    },
                })
            } else {
                dispatchData({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        } catch (err) {
            console.error(err)
            dispatchData({
                type: 'INIT',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            })
        }
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
