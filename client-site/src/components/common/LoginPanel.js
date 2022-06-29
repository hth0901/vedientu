import React, { Fragment, useContext, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { uiActions } from 'store/ui-slice'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { doLogin } from 'store/auth-actions'
import AuthContext from 'app/contexts/JWTAuthContext'

const LoginPanelItem = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    const usernameRef = useRef()
    const passwordRef = useRef()

    const errorMessage = useSelector((state) => state.auth.errorMessage)

    const submitHandler = async (evt) => {
        evt.preventDefault()
        dispatch(uiActions.setShowLoading(true))
        const uname = usernameRef.current.value
        const pword = passwordRef.current.value

        if (uname.length === 0 || pword === 0) {
            alert('Tên đăng nhập hoặc mật khẩu không hợp lệ')
            dispatch(uiActions.setShowLoading(false))
            return
        }
        try {
            // dispatch(doLogin(uname, pword))
            await login(uname, pword)
        } catch (e) {
            dispatch(uiActions.setShowLoading(false))
        }
    }

    useEffect(() => {
        if (errorMessage) {
            alert('Tên đăng nhập hoặc mật khẩu không hợp lệ')
            dispatch(uiActions.setShowLoading(false))
        }
    }, [errorMessage])
    return (
        <div
            className="fade show"
            id="login-modal"
            // tabindex="-1"
            role="dialog"
            aria-hidden="true"
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
                backgroundColor: '#ffffff4d',
            }}
        >
            <div
                className="container modal-dialog modal-dialog-centered"
                role="document"
            >
                <div className="modal-content">
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => dispatch(uiActions.setShowLogin(false))}
                    >
                        <img src="images/icon/close-modal.png" alt="" />
                    </button>
                    <div className="modal-body">
                        <div className="login-container">
                            <div className="row">
                                <div className="col-lg-5">
                                    <form
                                        className="form-login form-box"
                                        onSubmit={submitHandler}
                                    >
                                        <h2 className="heading2 text-primary text-center text-uppercase">
                                            Đăng nhập tài khoản
                                        </h2>
                                        <div className="form-group">
                                            <label htmlFor="emaillogin">
                                                Tên tài khoản
                                            </label>
                                            <input
                                                ref={usernameRef}
                                                type="text"
                                                className="form-control"
                                                id="emaillogin"
                                                aria-describedby="emailHelp"
                                                placeholder="Nhập tài khoản"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordlogin">
                                                Mật khẩu
                                            </label>
                                            <input
                                                ref={passwordRef}
                                                type="password"
                                                className="form-control"
                                                id="passwordlogin"
                                                placeholder="Nhập mật khẩu"
                                                required
                                            />
                                        </div>
                                        {/* <div className="form-group d-flex justify-content-between">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="forgotcheck"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="forgotcheck"
                                                >
                                                    Ghi nhớ tài khoản
                                                </label>
                                            </div>
                                            <a
                                                href="#"
                                                className="forgot-pw text-decoration text-primary"
                                            >
                                                Quên mật khẩu?
                                            </a>
                                        </div> */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                        >
                                            Đăng nhập
                                        </button>
                                        <p className="label-register">
                                            Bạn chưa có tài khoản?{' '}
                                            <a
                                                className="text-decoration text-primary"
                                                href="#register-modal"
                                            >
                                                Đăng ký
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoginPanel = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <LoginPanelItem />,
                document.getElementById('login-panel')
            )}
        </Fragment>
    )
}

export default LoginPanel
