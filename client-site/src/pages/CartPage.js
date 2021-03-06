import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PlaceCartItem from '../components/giohang/PlaceCartItem'
import { placeCartActions } from '../store/placeCart-slice'

import { orderActions } from '../store/order-slice'
import { Navigate, useLocation } from 'react-router-dom'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const BASE_URL = process.env.REACT_APP_URL

const CartPage = (props) => {
    const dispatch = useDispatch()
    const { items, totalPrice } = useSelector((state) => state.placeCart)
    const itemCount = items.length
    const [cartItemCheck, setCartItemCheck] = useState([])
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const checkCartHandler = (itemId, isChecked) => {
        if (isChecked) {
            setCartItemCheck((prev) => [...prev, itemId])
        } else {
            const idx = cartItemCheck.indexOf(itemId)
            if (idx !== -1) {
                setCartItemCheck((prev) => {
                    const res = prev.splice(idx, 1)
                    return res
                })
            }
        }
    }

    const deleteCartItemHandler = (evt) => {
        dispatch(placeCartActions.removeItemFromCart(cartItemCheck))
    }

    useEffect(() => {
        setCartItemCheck([])
    }, [itemCount])

    useEffect(() => {
        dispatch(orderActions.resetOrder())
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
            <nav
                className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light no-fix"
                id="ftco-navbar"
            >
                <div className="overlay-blur"></div>
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        <img src="images/logo.svg" alt="img-fluid" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#ftco-nav"
                        aria-controls="ftco-nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home-page">
                                    trang ch???
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/kham-pha">
                                    kh??m ph??
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/thong-ke">
                                    Th???ng k??
                                </Link>
                            </li>
                            <li className="nav-item cta cta-outline">
                                <Link className="nav-link" to="/lien-he">
                                    li??n h???
                                </Link>
                            </li>
                            <li className="nav-item cta">
                                <Link className="nav-link" to="/chon-ve">
                                    ?????t v??
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="action-nav">
                        <ul>
                            <li>
                                <Link
                                    to="/chon-ve"
                                    className="material-icons-outlined"
                                >
                                    search
                                </Link>{' '}
                            </li>
                            <li>
                                <Link
                                    to="/gio-hang"
                                    className="material-icons-outlined"
                                >
                                    shopping_cart
                                </Link>{' '}
                            </li>
                            <li>
                                <Link
                                    to="/chon-ve"
                                    className="material-icons-outlined"
                                >
                                    perm_identity
                                </Link>{' '}
                            </li>
                            <li>
                                <Link
                                    to="/chon-ve"
                                    className="material-icons-outlined"
                                >
                                    language
                                </Link>{' '}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="ftco-section ftco-addcart">
                <div className="container">
                    <div className="row justify-content-start">
                        <div className="col-md-7 heading-section">
                            <h5 className="mb-60">Gi??? h??ng</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="addcart-container">
                                <div className="addcart-header">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="addcartCheck"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="addcartCheck"
                                        ></label>
                                    </div>
                                    <div className="edit-control">
                                        <div style={{ cursor: 'pointer' }}>
                                            <span className="material-icons-outlined">
                                                mode_edit
                                            </span>{' '}
                                            S???a
                                        </div>
                                    </div>
                                    <div
                                        className="delete-control"
                                        style={{ cursor: 'pointer' }}
                                        onClick={deleteCartItemHandler}
                                    >
                                        <div>
                                            <span className="material-icons-outlined">
                                                delete
                                            </span>{' '}
                                            X??a
                                        </div>
                                    </div>
                                </div>
                                <div className="addcart-list">
                                    {items.map((el) => {
                                        return (
                                            <PlaceCartItem
                                                key={el.id}
                                                placeItem={el}
                                                checkCart={checkCartHandler}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="total-ticket">
                                <div className="price__total">
                                    <span>T???ng c???ng</span>
                                    <span className="price__nummber">
                                        {numberWithCommas(totalPrice)} VN??
                                    </span>
                                    {/* <button className="btn btn-primary w-100"> Thanh to??n</button> */}
                                    <Link
                                        to="/mua-nhieu-ve"
                                        className="btn btn-primary"
                                    >
                                        Thanh to??n
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default CartPage
