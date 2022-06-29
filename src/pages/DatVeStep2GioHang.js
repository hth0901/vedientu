import React, { Fragment, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import MainHeader from 'components/MainHeader'
import SectionGioHang from 'components/giohang/SectionGioHang'

import { useSelector } from 'react-redux'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const BASE_URL = process.env.REACT_APP_URL

const DatVeStep2GioHang = (props) => {
    const location = useLocation()
    const history = useNavigate()
    const [isAuthen, setIsAuthen] = useState(true)
    const { totalPrice } = useSelector((state) => state.placeCart)

    useEffect(() => {
        const curStrUser = localStorage.getItem('user')
        const curUser = JSON.parse(curStrUser)
        const curRoleId = (curUser && curUser.roleid) || -1
        fetch(
            `${BASE_URL}/api/menu/getclientautho/${encodeURIComponent(
                location.pathname
            )}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                if (data.length > 0 && !data.includes(curRoleId)) {
                    setIsAuthen(false)
                }
            })
            .catch((err) => {
                // setIsAuthenticated(false)
                setIsAuthen(false)
            })
    }, [isAuthen])

    useEffect(() => {
        if (!totalPrice) {
            history('/chon-ve')
        }
    }, [totalPrice])

    if (!isAuthen) {
        return (
            <Navigate
                to={{
                    pathname: '/home-page',
                }}
            />
        )
    }

    return (
        <Fragment>
            <MainHeader />
            <div
                className="hero-wrap hero-content"
                style={{
                    backgroundImage: `url('images/order/banner-content.png')`,
                }}
            ></div>
            <div className="content-wrap content-order">
                <div className="ftco-section ftco-step form-top">
                    <div className="container">
                        <div className="row no-gutters slider-text">
                            <div
                                className={`col-12 ftco-animate fadeInUp ftco-animated`}
                            >
                                <div className="block-7 step-order">
                                    <div className="step-content">
                                        <ul className="slider-step">
                                            <li className="active body-1">
                                                <span>01</span>
                                                <p>Chọn điểm di tích</p>
                                            </li>
                                            <li className="active current body-1">
                                                <span>02</span>
                                                <p>Đặt vé</p>
                                            </li>
                                            <li className="body-1">
                                                <span>03</span>
                                                <p>Thanh toán</p>
                                            </li>
                                            <li className="body-1">
                                                <span>04</span>
                                                <p>Hoàn tất</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SectionGioHang />
            </div>
        </Fragment>
    )
}

export default DatVeStep2GioHang
