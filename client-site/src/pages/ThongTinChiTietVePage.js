import MainHeader from 'components/MainHeader'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams, Navigate, useLocation } from 'react-router-dom'
import ThongTinChiTietVeItem from './ThongTinChiTietVeItem'

const API_URL = process.env.REACT_APP_URL
const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const ThongTinChiTietVePage = (props) => {
    const params = useParams()
    const orderId = params.orderId
    const [ticketObj, setTicketObj] = useState(null)
    const [orderInfo, setOrderInfo] = useState(null)
    const [arrDetails, setArrDetails] = useState([])
    const [newPrice, setNewPrice] = useState(0)
    const [curPrice, setCurPrice] = useState(0)
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const turningQuantityHandler = (ticketTypeId, customerType, count) => {
        const currentDetails = JSON.parse(JSON.stringify(arrDetails))
        currentDetails.forEach((el) => {
            if (el.placeId === ticketTypeId) {
                el.items.forEach((dtEl) => {
                    if (dtEl.customerType === customerType) {
                        dtEl.quantity = dtEl.quantity + count
                        if (dtEl.quantity < 0) {
                            dtEl.quantity = 0
                        }
                    }
                })
            }
        })
        let newTotalPrice = 0
        currentDetails.forEach((el) => {
            el.items.forEach((dtel) => {
                newTotalPrice += dtel.quantity * dtel.unitPrice
            })
        })
        setNewPrice(newTotalPrice)
        setArrDetails(JSON.parse(JSON.stringify(currentDetails)))
    }

    useEffect(() => {
        fetch(`${API_URL}/api/ticket/orderinfo/${orderId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setOrderInfo(data)
            })
            .catch((err) => {
                console.log(err)
            })

        fetch(`${API_URL}/api/pay/ticketdetail/${orderId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                const setOfPlace = new Set(
                    data.map((el) => {
                        return el.ticketTypeId
                    })
                )
                const arrData = []
                let newTotalPrice = 0
                setOfPlace.forEach((el) => {
                    const detailObj = {
                        placeId: el,
                        placeName: '',
                        items: [],
                        isUsed: 0,
                        currentTotalPrice: 0,
                    }

                    data.forEach((dt) => {
                        if (dt.ticketTypeId === detailObj.placeId) {
                            detailObj.placeName = dt.placeName
                            detailObj.items.push({ ...dt })
                            detailObj.isUsed = +dt.isUsed
                            detailObj.usedDate = dt.usedDate
                            detailObj.currentTotalPrice +=
                                dt.unitPrice * dt.quantity
                            newTotalPrice += dt.unitPrice * dt.quantity
                        }
                    })

                    arrData.push(detailObj)
                })
                // console.log(arrData)
                setNewPrice(newTotalPrice)
                setCurPrice(newTotalPrice)
                setArrDetails(arrData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
    const reGetData = () => {
        fetch(`${API_URL}/api/pay/ticketdetail/${orderId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                const setOfPlace = new Set(
                    data.map((el) => {
                        return el.ticketTypeId
                    })
                )
                const arrData = []
                let newTotalPrice = 0
                setOfPlace.forEach((el) => {
                    const detailObj = {
                        placeId: el,
                        placeName: '',
                        items: [],
                        isUsed: 0,
                        currentTotalPrice: 0,
                    }

                    data.forEach((dt) => {
                        if (dt.ticketTypeId === detailObj.placeId) {
                            detailObj.placeName = dt.placeName
                            detailObj.items.push({ ...dt })
                            detailObj.isUsed = +dt.isUsed
                            detailObj.usedDate = dt.usedDate
                            detailObj.currentTotalPrice +=
                                dt.unitPrice * dt.quantity
                            newTotalPrice += dt.unitPrice * dt.quantity
                        }
                    })

                    arrData.push(detailObj)
                })
                console.log(arrData)
                setNewPrice(newTotalPrice)
                setCurPrice(newTotalPrice)
                setArrDetails(arrData)
            })
            .catch((err) => {
                console.log(err)
            })
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
                <section className="ftco-section ftco-addcart">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div
                                className="col-12 heading-section text-left mb-0 ftco-animate fadeInUp ftco-animated"
                                style={{ marginTop: '40px' }}
                            >
                                <h2 className="heading2">
                                    Thông tin khách hàng
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="addcart-infomation">
                                    <dl className="row">
                                        <dt className="col-sm-2">Họ tên:</dt>
                                        <dd className="col-sm-10">
                                            {(orderInfo &&
                                                orderInfo.fullName) ||
                                                ''}
                                        </dd>

                                        <dt className="col-sm-2">Email:</dt>
                                        <dd className="col-sm-10">
                                            {' '}
                                            {(orderInfo && orderInfo.email) ||
                                                ''}
                                        </dd>

                                        <dt className="col-sm-2">
                                            Số điện thoại:
                                        </dt>
                                        <dd className="col-sm-10">
                                            {(orderInfo &&
                                                orderInfo.phoneNumber) ||
                                                ''}
                                        </dd>
                                    </dl>
                                </div>
                                <div
                                    className="col-12 heading-section text-left mb-0 ftco-animate fadeInUp ftco-animated"
                                    style={{ marginTop: '40px' }}
                                >
                                    <h2 className="heading2">Thông tin vé</h2>
                                </div>
                                <div className="addcart-container">
                                    <div className="addcart-list">
                                        <div className="addcart-list__item addcart-list__column">
                                            {arrDetails.map((el, idx) => {
                                                return (
                                                    <ThongTinChiTietVeItem
                                                        key={idx}
                                                        data={el}
                                                        onRefresh={reGetData}
                                                        onTurning={
                                                            turningQuantityHandler
                                                        }
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="total-ticket">
                                    {/* <div className="price__item price__action">
                                        <span>Tạm tính:</span>
                                        <span className="price__nummber">
                                            {numberWithCommas(totalPrice)} VNĐ
                                        </span>
                                    </div> */}
                                    <div className="price__item price__total">
                                        <span>Tổng cộng:</span>
                                        <span className="price__nummber">
                                            {`${numberWithCommas(
                                                curPrice
                                            )} VNĐ`}
                                        </span>
                                    </div>
                                    <div className="price__item price__total">
                                        <span>Giá mới:</span>
                                        <span className="price__nummber">
                                            {numberWithCommas(newPrice)}
                                            VNĐ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default ThongTinChiTietVePage
