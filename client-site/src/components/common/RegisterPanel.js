import React, { Fragment, useContext, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { uiActions } from 'store/ui-slice'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { doLogin } from 'store/auth-actions'

import AuthContext from 'app/contexts/JWTAuthContext'

const RegisterPanelItem = (props) => {
    const dispatch = useDispatch()
    const { register } = useContext(AuthContext)
    const formRef = useRef()
    const submitHandler = async (evt) => {
        evt.preventDefault()
        const formData = {}
        ;[...formRef.current.elements].forEach((el) => {
            if (el.name) {
                formData[el.name] = el.value
            }
        })
        dispatch(uiActions.setShowLoading(true))

        try {
            await register(formData)
        } catch (e) {
            dispatch(uiActions.setShowLoading(false))
        }
    }

    return (
        <div
            className="fade show"
            id="register-modal"
            tabIndex="-1"
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
                        onClick={() =>
                            dispatch(uiActions.setShowRegister(false))
                        }
                    >
                        <img src="images/icon/close-modal.png" alt="" />
                    </button>
                    <div className="modal-body">
                        <div className="login-container">
                            <div className="row">
                                <div className="col-lg-5">
                                    <form
                                        ref={formRef}
                                        className="form-login form-box"
                                        onSubmit={submitHandler}
                                    >
                                        <h2 className="heading2 text-primary text-center text-uppercase">
                                            ????ng k?? t??i kho???n
                                        </h2>
                                        <div className="form-group">
                                            <label htmlFor="fullname">
                                                H??? v?? t??n
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullname"
                                                name="fullName"
                                                aria-describedby="fullnameHelp"
                                                placeholder="Nh???p h??? t??n"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emaillogin">
                                                T??n ????ng nh???p
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="emaillogin"
                                                name="userName"
                                                aria-describedby="emailHelp"
                                                placeholder="T??n ????ng nh???p"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordlogin">
                                                M???t kh???u
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="passwordlogin"
                                                name="password"
                                                placeholder="Nh???p m???t kh???u"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordlogin1">
                                                Nh???p l???i m???t kh???u
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="passwordlogin1"
                                                name="passwordconfirm"
                                                placeholder="Nh???p l???i m???t kh???u"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                        >
                                            ????ng k??
                                        </button>
                                        <p className="label-register">
                                            ???? c?? t??i kho???n?{' '}
                                            <span className="text-decoration text-primary">
                                                ????ng nh???p
                                            </span>
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

const RegisterPanel = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <RegisterPanelItem />,
                document.getElementById('register-panel')
            )}
        </Fragment>
    )
}

export default RegisterPanel
