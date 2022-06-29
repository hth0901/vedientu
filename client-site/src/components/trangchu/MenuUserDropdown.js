import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { uiActions } from 'store/ui-slice'
import { useDispatch } from 'react-redux'
import AuthContext from 'app/contexts/JWTAuthContext'

const MenuUserDropdown = (props) => {
    const [isHover, setIsHover] = useState(false)
    const { isAuthenticated, logout } = useContext(AuthContext)
    const dispatch = useDispatch()
    const clickDangNhapHandler = (evt) => {
        evt.preventDefault()
        dispatch(uiActions.setShowLogin(true))
    }
    const clickDangKyHandler = (evt) => {
        evt.preventDefault()
        dispatch(uiActions.setShowRegister(true))
    }

    const clickLogoutHandler = (evt) => {
        evt.preventDefault()
        logout()
    }

    return (
        <li>
            <div
                className={`dropdown dropdown-user ${isHover ? 'show' : ''}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownuser"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isHover ? 'true' : 'false'}
                >
                    <img
                        className=""
                        src="images/icon/account_white.png"
                        alt=""
                    />
                    <span className="d-none">Nguyễn Hữu Thành Nam</span>
                </a>

                <div
                    className={`dropdown-menu ${isHover ? 'show' : ''}`}
                    aria-labelledby="dropdownuser"
                >
                    {!isAuthenticated && (
                        <button
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#login-modal"
                            onClick={clickDangNhapHandler}
                        >
                            Đăng nhập
                        </button>
                    )}

                    {!isAuthenticated && (
                        <button
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#register-modal"
                            onClick={clickDangKyHandler}
                        >
                            Đăng ký
                        </button>
                    )}

                    {/* <a className="dropdown-item d-none" href="#">
                        Đăng xuất
                    </a> */}
                    {isAuthenticated && (
                        <button
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#register-modal"
                            onClick={clickLogoutHandler}
                        >
                            Đăng xuất
                        </button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuUserDropdown
