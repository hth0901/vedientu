import React, { Fragment, useEffect, useRef, useState } from 'react'
import SectionGioHangItem from './SectionGioHangItem'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { placeCartActions } from 'store/placeCart-slice'
import { orderActions } from 'store/order-slice'
import { Navigate, useLocation, useNavigate } from 'react-router'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const BASE_URL = process.env.REACT_APP_URL

const SectionGioHang = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const { items, totalPrice } = useSelector((state) => state.placeCart)
    const itemCount = items.length
    const [cartItemCheck, setCartItemCheck] = useState([])
    const location = useLocation()
    const customerInfoFormRef = useRef()
    const btnSubmitRef = useRef()

    const [nameValue, setNameValue] = useState('Khách tham quan')

    const changeNameValueHandler = (evt) => {
        setNameValue(evt.target.value)
    }

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

    const submitFormHandler = (evt) => {
        evt.preventDefault()
        const formData = {}
        ;[...customerInfoFormRef.current.elements].forEach((el) => {
            if (el.name) {
                formData[el.name] = el.value
            }
        })
        dispatch(orderActions.setCustomerInfo(formData))
        history('/thanh-toan')
    }
    return (
        <section className="ftco-section ftco-addcart">
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-12 heading-section text-left mb-0 ftco-animate">
                        <h2 className="heading2">Thông tin đặt vé</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="addcart-infomation">
                            <h4 className="heading4">Thông tin liên hệ</h4>
                            <form
                                onSubmit={submitFormHandler}
                                ref={customerInfoFormRef}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="fullname">
                                            Họ và tên *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullname"
                                            name="fullName"
                                            placeholder="Họ và tên"
                                            value={nameValue}
                                            onChange={changeNameValueHandler}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            name="email"
                                        />
                                    </div>
                                    <div className="form-group col-md-1">
                                        <label>Mã vùng</label>
                                        <select
                                            className="custom-select"
                                            defaultValue={'0'}
                                        >
                                            <option value="0">(+84)</option>
                                            <option value="1">(+1)</option>
                                            <option value="2">(+33)</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="phone">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="Số điện thoại"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    style={{ display: 'none' }}
                                    ref={btnSubmitRef}
                                >
                                    btnSubmit
                                </button>
                            </form>
                        </div>

                        <div className="addcart-container">
                            <div className="addcart-header">
                                <div className="custom-control css-checkbox">
                                    <input
                                        className="custom-control-input"
                                        type="checkbox"
                                        id="addcartCheckAll"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="addcartCheckAll"
                                    >
                                        Chọn tất cả
                                    </label>
                                </div>

                                <div className="delete-control">
                                    <button>
                                        <img
                                            src="images/icon/delete_white.png"
                                            width="20"
                                            alt=""
                                        />{' '}
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            <div className="addcart-list">
                                {items.map((el, idx) => {
                                    return (
                                        <SectionGioHangItem
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
                            <div className="price__item price__action">
                                <span>Tạm tính:</span>
                                <span className="price__nummber">
                                    {numberWithCommas(totalPrice)} VNĐ
                                </span>
                            </div>
                            <div className="price__item price__promotion">
                                <span>Khuyến mãi:</span>
                                <span className="price__nummber">0 VNĐ</span>
                            </div>
                            <div className="price__item price__total">
                                <span>Tổng cộng:</span>
                                <span className="price__nummber">
                                    {numberWithCommas(totalPrice)} VNĐ
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={() => btnSubmitRef.current.click()}
                        >
                            Mua vé
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionGioHang
