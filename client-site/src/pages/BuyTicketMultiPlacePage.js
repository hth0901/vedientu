import React, { Fragment, useState, useEffect, useRef } from 'react'
import AOS from 'aos'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { placeCartActions } from '../store/placeCart-slice'
import { orderActions } from '../store/order-slice'

import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'

const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const BuyTicketMultiPlacePage = (props) => {
    const dispatch = useDispatch()
    const customerInfoFormRef = useRef()
    const history = useNavigate()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
    useEffect(() => {
        AOS.init({
            duration: 1500,
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
    const { items, totalPrice } = useSelector((state) => state.placeCart)
    const [selectedPlace] = items

    const submitFormHandler = (evt) => {
        evt.preventDefault()
        const formData = {}
        ;[...customerInfoFormRef.current.elements].forEach((el) => {
            if (el.name) {
                formData[el.name] = el.value
            }
        })

        dispatch(orderActions.setCustomerInfo(formData))

        history('/thanh-toan-gio-hang')
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
            <div className="hero-wrap layout-page">
                <div className="home-slider">
                    <div href="#" className="item">
                        <div
                            className="img__bg"
                            style={{
                                backgroundImage: 'url(images/DaiNoi.jpg)',
                            }}
                        ></div>
                        <div className="slider-content">
                            <div className="container">
                                <div className="slider-text">
                                    <h1>Mua v??</h1>
                                    <ul className="slider-step">
                                        <li className="body-1">
                                            <span>01</span> Ch???n v??
                                        </li>
                                        <li className="active body-1">
                                            <span>02</span> Mua v??
                                        </li>
                                        <li className="body-1">
                                            <span>03</span> Thanh to??n
                                        </li>
                                        <li className="body-1">
                                            <span>04</span> C??m ??n
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ftco-section ftco-order">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8" data-aos="fade-up">
                            <div className="heading-section">
                                <h6 className="mb-25 mt-30">
                                    Th??ng tin c?? nh??n
                                </h6>
                            </div>
                            <form
                                action=""
                                className="order-info"
                                onSubmit={submitFormHandler}
                                ref={customerInfoFormRef}
                            >
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        H??? v?? t??n *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        placeholder="H??? v?? t??n"
                                        name="fullName"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        S??? ??i???n tho???i *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phonenumber"
                                        placeholder="S??? ??i???n tho???i"
                                        name="phoneNumber"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        name="email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        S??? CMND/CCCD
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="numbercard"
                                        placeholder="S??? CMND"
                                        name="uniqId"
                                    />
                                </div>
                                <div className="form-group text-right">
                                    {/* <button className="btn btn-outline-primary mr-2">
                    Quay l???i
                  </button> */}
                                    <Link
                                        to={'/home-page'}
                                        className="btn btn-outline-primary mr-2"
                                    >
                                        Quay l???i
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Ti???p t???c
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4" data-aos="fade-up">
                            {items.map((el, idx) => {
                                let placePrice = 0
                                placePrice =
                                    placePrice +
                                    (el.childrenQuantity || 0) *
                                        el.childrenPrice
                                placePrice =
                                    placePrice +
                                    (el.adultQuantity || 0) * el.adultPrice
                                return (
                                    <div
                                        key={idx}
                                        className="total-ticket"
                                        style={{ marginTop: '10px' }}
                                    >
                                        <div
                                            className="img"
                                            style={{
                                                backgroundImage: `url(${BASE_URL}/upload/${el.imageUrl})`,
                                            }}
                                        >
                                            <div className="overley"></div>
                                            <h6>
                                                {(el && el.placeName) || ''}
                                            </h6>
                                        </div>
                                        <div className="content__total">
                                            <div className="subtitle-1">
                                                Th??ng tin ?????t v??
                                            </div>
                                            <div className="quantily__total row">
                                                {el.details
                                                    .filter(
                                                        (subel) =>
                                                            subel.quantity > 0
                                                    )
                                                    .map((subel) => {
                                                        return (
                                                            <div className="col">
                                                                <div className="quantily__item">
                                                                    <span className="quantily__number">
                                                                        {
                                                                            subel.quantity
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            subel.custommerTypeName
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                {/* <div className="col">
                          <div className="quantily__item">
                            <span className="quantily__number">
                              {(el && el.adultQuantity) || 0}
                            </span>
                            <span>Ng?????i l???n</span>
                          </div>
                        </div>
                        <div className="col">
                          <div className="quantily__item">
                            <span className="quantily__number">
                              {(el && el.childrenQuantity) || 0}
                            </span>
                            <span>Tr??? em</span>
                          </div>
                        </div> */}
                                            </div>
                                        </div>
                                        <div className="price__total">
                                            <span>T???ng c???ng</span>
                                            <span className="price__nummber">
                                                {numberWithCommas(
                                                    el.totalPrice
                                                )}{' '}
                                                VN??
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <MainFooter />
        </Fragment>
    )
}

export default BuyTicketMultiPlacePage
