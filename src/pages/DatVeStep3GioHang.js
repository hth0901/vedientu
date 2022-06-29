import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import publicIp from "public-ip";
import dateFormat from 'dateformat'
import querystring from 'qs'
import crypto from 'crypto'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'

import MainHeader from 'components/MainHeader'
import FooterSection from 'components/trangchu/FooterSection'
import { createOrderTemp } from 'store/order-actions'
import { getTicketDetail, getTicketId } from 'store/order-actions'
import { placeCartActions } from 'store/placeCart-slice'

const API_URL = process.env.REACT_APP_URL
const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const totalQuantityToString = (arr) => {
    const arrResult = arr
        .filter((el) => el.quantity)
        .map((el) => {
            return `${el.quantity} ${el.custommerTypeName}`
        })
    return arrResult.join(', ')
}

const DatVeStep3GioHang = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const [isAuthen, setIsAuthen] = useState(true)
    const customerInfo = useSelector((state) => state.order.customerInfo)
    const { items, totalPrice } = useSelector((state) => state.placeCart)
    const [selectedPlace] = items
    const mOrderId = useSelector((state) => state.order.orderId)
    // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const loginInfo = useSelector((state) => state.authen.userInfo)
    const ticketObj = useSelector((state) => state.order.orderInfo)

    useEffect(() => {
        if (ticketObj) {
            history('/return-ticket')
        }
    }, [ticketObj])

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
        if (!mOrderId) return

        fetch(`${API_URL}/api/pay/buyticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: '00000000-0000-0000-0000-000000000000',
                totalPrice: +totalPrice,
                orderTempId: mOrderId,
                payStatus: 1,
            }),
        })
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                if (data.rspCode === '00') {
                    dispatch(getTicketDetail(mOrderId))
                    dispatch(placeCartActions.reset())
                    // dispatch(getTicketId(mOrderId));
                } else {
                    throw new Error(data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [mOrderId])

    const backHandler = (evt) => {}

    const thanhToanHandler = async (evt) => {
        const date = new Date()
        const createdDate = dateFormat(date, 'yyyymmddHHMMss')
        const ticketDetails = []
        const orderDetails = []
        items.forEach((item) => {
            item.details.forEach((el) => {
                if (el.quantity > 0) {
                    el.listPlaceID.split(',').forEach((subEl) => {
                        const tkDetail = {
                            placeId: +subEl,
                            customerType: el.custommerTypeId,
                            quantity: el.quantity,
                            unitPrice: el.price,
                            ticketTypeId: el.ticketTypeId,
                        }
                        ticketDetails.push(tkDetail)
                    })

                    orderDetails.push({
                        ticketTypeId: el.ticketTypeId,
                        customerType: el.custommerTypeId,
                        quantity: el.quantity,
                        unitPrice: el.price,
                    })
                }
            })
        })
        const orderData = {
            order: { ...customerInfo, totalPrice, ID: createdDate },
            ticketDetails,
            orderDetails,
        }
        dispatch(createOrderTemp(orderData))
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
                                            <li className="active body-1">
                                                <span>02</span>
                                                <p>Đặt vé</p>
                                            </li>
                                            <li className="active current body-1">
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
                <section className="ftco-section ftco-addcart">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-12 heading-section text-left mb-0 ftco-animate fadeInUp ftco-animated">
                                <h2 className="heading2">Xác nhận thông tin</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="addcart-infomation">
                                    <dl className="row">
                                        <dt className="col-sm-2">Họ tên:</dt>
                                        <dd className="col-sm-10">
                                            {(customerInfo &&
                                                customerInfo.fullName) ||
                                                ''}
                                        </dd>

                                        <dt className="col-sm-2">Email:</dt>
                                        <dd className="col-sm-10">
                                            {(customerInfo &&
                                                customerInfo.email) ||
                                                ''}
                                        </dd>

                                        <dt className="col-sm-2">
                                            Số điện thoại:
                                        </dt>
                                        <dd className="col-sm-10">
                                            {(customerInfo &&
                                                customerInfo.phoneNumber) ||
                                                ''}
                                        </dd>
                                    </dl>
                                </div>
                                <div className="addcart-container">
                                    <div className="addcart-list">
                                        <div className="addcart-list__item addcart-list__column">
                                            {items.map((el, idx) => {
                                                console.log(el)
                                                let placePrice = 0
                                                placePrice =
                                                    placePrice +
                                                    (el.childrenQuantity || 0) *
                                                        el.childrenPrice
                                                placePrice =
                                                    placePrice +
                                                    (el.adultQuantity || 0) *
                                                        el.adultPrice
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="media"
                                                    >
                                                        <div
                                                            className="bg_img"
                                                            style={{
                                                                backgroundImage: `url('images/destination/DaiNoi.jpg')`,
                                                            }}
                                                        ></div>
                                                        <div className="media-body">
                                                            <dl className="row">
                                                                <dt className="col-sm-2">
                                                                    Địa điểm:
                                                                </dt>
                                                                <dd className="col-sm-10">
                                                                    {(el &&
                                                                        el.placeName) ||
                                                                        ''}
                                                                </dd>

                                                                <dt className="col-sm-2">
                                                                    Số lượng:
                                                                </dt>
                                                                <dd className="col-sm-10">
                                                                    {totalQuantityToString(
                                                                        el.details
                                                                    )}
                                                                </dd>

                                                                <dt className="col-sm-2">
                                                                    Tổng cộng:
                                                                </dt>
                                                                <dd className="col-sm-10 text-primary">
                                                                    {numberWithCommas(
                                                                        el.totalPrice
                                                                    )}{' '}
                                                                    VNĐ
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="total-ticket">
                                    <div className="price__item price__action">
                                        <span>Tạm tính:</span>
                                        <span className="price__nummber">
                                            {numberWithCommas(totalPrice)} VNĐ
                                        </span>
                                    </div>
                                    <div className="price__item price__promotion">
                                        <span>Khuyến mãi:</span>
                                        <span className="price__nummber">
                                            0 VNĐ
                                        </span>
                                    </div>
                                    <div className="price__item price__total">
                                        <span>Tổng cộng:</span>
                                        <span className="price__nummber">
                                            {numberWithCommas(totalPrice)} VNĐ
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={thanhToanHandler}
                                >
                                    Mua vé
                                </button>
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                >
                                    <img src="images/icon/alert.png" alt="" />
                                    <span>
                                        Khi bạn nhấn nút <b>Thanh toán</b> là
                                        đồng ý Các điều khoản sử dụng của chúng
                                        tôi.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default DatVeStep3GioHang
