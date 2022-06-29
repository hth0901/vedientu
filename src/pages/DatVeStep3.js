import React, { Fragment, useEffect, useRef, useState } from 'react'
import MainHeader from 'components/MainHeader'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { placeCartActions } from 'store/placeCart-slice'
import { orderActions } from 'store/order-slice'
import FooterSection from 'components/trangchu/FooterSection'
import { Waypoint } from 'react-waypoint'
import dateFormat from 'dateformat'
import { createOrderTemp } from 'store/order-actions'
import { getTicketDetail, getTicketId } from 'store/order-actions'
import ChonPhuongThucThanhToanSection from 'components/chonve/ChonPhuongThucThanhToanSection'
import { uiActions } from 'store/ui-slice'

const API_URL = process.env.REACT_APP_URL
const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const pad = (num, size) => {
    num = num.toString()
    while (num.length < size) num = '0' + num
    return num
}

const totalQuantityToString = (arr) => {
    const arrResult = arr
        .filter((el) => el.quantity)
        .map((el) => {
            return `${el.quantity} ${el.custommerTypeName}`
        })
    return arrResult.join(', ')
}

const DatVeStep3 = (props) => {
    const tk = localStorage.getItem('token')
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const [isAuthen, setIsAuthen] = useState(true)
    const [isOnEnter, setIsOnEnter] = useState(false)
    const customerInfo = useSelector((state) => state.order.customerInfo)
    const selectedPlace = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { exportReceipt } = useSelector((state) => state.common)
    const { details, totalPrice, placeId } = selectedPlace
    const mOrderId = useSelector((state) => state.order.orderId)
    // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const loginInfo = useSelector((state) => state.authen.userInfo)
    const ticketObj = useSelector((state) => state.order.orderInfo)

    const onEnter = (evt) => {
        setIsOnEnter(true)
    }

    useEffect(() => {
        if (!placeId) {
            history('/home-page')
        }
    }, [placeId])

    useEffect(() => {
        if (ticketObj) {
            console.log(ticketObj)
            history('/return-ticket')
        }
    }, [ticketObj])

    useEffect(() => {
        if (!placeId) {
            history('/home-page')
        }
    }, [placeId])

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
        dispatch(uiActions.setShowLoading(true))
        fetch(`${API_URL}/api/pay/buyticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tk}`,
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
                    // dispatch(getTicketDetail(mOrderId))
                    return fetch(`${API_URL}/api/Receipt/createreceipt`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${tk}`,
                        },
                        body: JSON.stringify({
                            ...customerInfo,
                            ID: mOrderId,
                            totalPrice,
                        }),
                    })
                } else {
                    throw new Error(data.message)
                }
            })
            .then((res) => {
                // console.log(res)
                return res.text()
            })
            .then((data) => {
                console.log(data)
                if (data !== '1') {
                    alert('Không thể tạo biên lai điện tử!!')
                }
                dispatch(getTicketDetail(mOrderId))
            })
            .catch((err) => {
                console.log(err)
                dispatch(uiActions.setShowLoading(false))
            })
            .finally(() => {})
    }, [mOrderId])

    const thanhToanHandler = (evt) => {
        const date = new Date()
        const mlsc = date.getMilliseconds()
        const createdDate = `${dateFormat(date, 'yyyymmddHHMMss')}${pad(
            mlsc,
            3
        )}`
        const ticketDetails = []
        const orderDetails = []
        details.forEach((el) => {
            if (el.quantity > 0) {
                el.listPlaceID.split(',').forEach((subEl) => {
                    const tkDetail = {
                        placeId: +subEl,
                        customerType: el.custommerTypeId,
                        quantity: el.quantity,
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
        const orderData = {
            order: { ...customerInfo, totalPrice, ID: createdDate },
            ticketDetails,
            orderDetails,
        }

        // console.log(orderData)
        // return
        dispatch(createOrderTemp(orderData))
    }

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
                            <Waypoint onEnter={onEnter}>
                                <div
                                    className={`col-12 ftco-animate ${
                                        isOnEnter
                                            ? 'fadeInUp ftco-animated'
                                            : ''
                                    }`}
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
                            </Waypoint>
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
                                        <dt className="col-sm-4">
                                            Tên khách/Đoàn tham quan:
                                        </dt>
                                        <dd className="col-sm-8">
                                            {(customerInfo &&
                                                customerInfo.fullName) ||
                                                ''}
                                        </dd>

                                        <dt className="col-sm-4">Email:</dt>
                                        <dd className="col-sm-8">
                                            {(customerInfo &&
                                                customerInfo.email) ||
                                                ''}
                                        </dd>

                                        <dt className="col-sm-4">
                                            Số điện thoại:
                                        </dt>
                                        <dd className="col-sm-8">
                                            {(customerInfo &&
                                                customerInfo.phoneNumber) ||
                                                ''}
                                        </dd>

                                        {exportReceipt && (
                                            <Fragment>
                                                <dt className="col-sm-4">
                                                    Mã số thuế:
                                                </dt>
                                                <dd className="col-sm-8">
                                                    {(customerInfo &&
                                                        customerInfo.taxCode) ||
                                                        ''}
                                                </dd>
                                                <dt className="col-sm-4">
                                                    Địa chỉ:
                                                </dt>
                                                <dd className="col-sm-8">
                                                    {(customerInfo &&
                                                        customerInfo.address) ||
                                                        ''}
                                                </dd>
                                            </Fragment>
                                        )}
                                    </dl>
                                </div>
                                <div className="addcart-container">
                                    <div className="addcart-list">
                                        <div className="addcart-list__item addcart-list__column">
                                            <div className="media">
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
                                                            {(selectedPlace &&
                                                                selectedPlace.placeName) ||
                                                                ''}
                                                        </dd>

                                                        <dt className="col-sm-2">
                                                            Số lượng:
                                                        </dt>
                                                        <dd className="col-sm-10">
                                                            {totalQuantityToString(
                                                                details
                                                            )}
                                                        </dd>

                                                        <dt className="col-sm-2">
                                                            Tổng cộng:
                                                        </dt>
                                                        <dd className="col-sm-10 text-primary">
                                                            {numberWithCommas(
                                                                selectedPlace.totalPrice
                                                            )}{' '}
                                                            VNĐ
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ChonPhuongThucThanhToanSection />
                            </div>
                            <div className="col-md-3">
                                <div className="total-ticket">
                                    <div className="price__item price__action">
                                        <span>Tạm tính:</span>
                                        <span className="price__nummber">
                                            {numberWithCommas(
                                                selectedPlace.totalPrice
                                            )}{' '}
                                            VNĐ
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
                                            {numberWithCommas(
                                                selectedPlace.totalPrice
                                            )}{' '}
                                            VNĐ
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
            <FooterSection />
        </Fragment>
    )
}

export default DatVeStep3
