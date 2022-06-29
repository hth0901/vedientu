import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authenActions } from '../store/authen-slice'
import MenuDropdown from './trangchu/MenuDropdown'
import MenuUserDropdown from './trangchu/MenuUserDropdown'

const dropdownDatve = [
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Đặt vé tham quan',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Hướng dẫn đặt vé',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Kiểm tra mã đặt vé',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Chính sách hoàn vé',
    },
]

const dropdownThongTin = [
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Giá vé',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Khuyến mãi',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Nội quy tham gia',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Thời gian tham quan',
    },
    {
        routePath: 'dat-ve-tham-quan',
        routeTitle: 'Chương trình tour mới',
    },
]

const MainHeader = (props) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.authen.isLoggedIn)
    const userInfo = useSelector((state) => state.authen.userInfo)

    const logoutHandler = (evt) => {
        dispatch(authenActions.logout())
    }

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
            id="ftco-navbar"
        >
            <div className="container">
                <Link className="navbar-brand" to={'/home-page'}>
                    <img src="images/logo.svg" alt="img-fluid" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ftco-nav"
                    aria-controls="ftco-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="oi oi-menu"></span>
                </button>

                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/home-page"
                                className={(navData) => {
                                    return navData.isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }}
                            >
                                Trang chủ
                            </NavLink>
                        </li>
                        <MenuDropdown
                            arrDropdownItem={dropdownDatve}
                            dropdownId="datve"
                            title={'Đặt vé'}
                            routePath={`chon-ve`}
                        />
                        <MenuDropdown
                            arrDropdownItem={dropdownThongTin}
                            dropdownId="thongtin"
                            title={'Thông tin'}
                            routePath={`thong-tin`}
                        />

                        <li className="nav-item">
                            <a href="dichvu.html" className="nav-link">
                                <span>Dịch vụ</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="khampha.html" className="nav-link">
                                Khám phá
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="thong-ke" className="nav-link">
                                Thống kê
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="lienhe.html" className="nav-link">
                                <span>Liên hệ</span>
                            </a>
                        </li>
                    </ul>
                    <div className="action-nav">
                        <ul>
                            <li>
                                <a className="cart" href="#">
                                    <img
                                        src="images/icon/cart_white.png"
                                        alt=""
                                    />
                                </a>
                                <a className="cart show" href="#">
                                    <img
                                        src="images/icon/cart_active.png"
                                        alt=""
                                    />
                                    <span className="badge-cart">5</span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown dropdown-language">
                                    <a
                                        className="dropdown-toggle language-show"
                                        href="#"
                                        role="button"
                                        id="dropdownlanguage"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <img
                                            className="vi-vn active"
                                            src="images/icon/vi-VN.png"
                                            alt=""
                                        />
                                        <img
                                            className="en-us"
                                            src="images/icon/en-US.png"
                                            alt=""
                                        />
                                    </a>

                                    <div
                                        className="dropdown-menu language-dropdown"
                                        aria-labelledby="dropdownlanguage"
                                    >
                                        {/* <div className="form-check">
                                            <input
                                                className="form-check-input input-vi"
                                                type="radio"
                                                name="language"
                                                id="language1"
                                                value="option1"
                                                checked
                                            />
                                            <label
                                                className="form-check-label"
                                                for="language1"
                                            >
                                                Vietnamese
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input input-en"
                                                type="radio"
                                                name="language"
                                                id="language2"
                                                value="option2"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="language2"
                                            >
                                                English
                                            </label>
                                        </div> */}
                                    </div>
                                </div>
                            </li>
                            <MenuUserDropdown />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default MainHeader
