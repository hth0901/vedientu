import React, { Fragment, useEffect, useRef, useState } from 'react'
import MainHeader from 'components/MainHeader'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { placeCartActions } from 'store/placeCart-slice'
import { orderActions } from 'store/order-slice'
import { commonActions } from 'store/common-slice'
import FooterSection from 'components/trangchu/FooterSection'

import { Waypoint } from 'react-waypoint'
import Select from 'react-select'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const DatVeStep2 = (props) => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const customerInfoFormRef = useRef()
    const btnSubmitRef = useRef()
    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const phoneInputRef = useRef()
    const taxInputRef = useRef()
    const cusCodeInputRef = useRef()
    const addressInputRef = useRef()
    const [nameValue, setNameValue] = useState('Khách tham quan')
    const [isOnEnter, setIsOnEnter] = useState(false)
    const [disableInput, setDisableInput] = useState(false)
    const changeNameValueHandler = (evt) => {
        setNameValue(evt.target.value)
    }
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }
    const selectedPlace = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { exportReceipt, arrReceipt } = useSelector((state) => state.common)
    const { totalPrice, details, placeId } = selectedPlace
    const updateQuantity = (val, type) => {
        dispatch(
            placeCartActions.quickOrderChangeQuantity({
                count: val,
                custommerTypeId: type,
            })
        )
    }

    const turningQuantity = (val, typeId) => {
        dispatch(
            placeCartActions.quickOrderTuningQuantity({
                count: val,
                custommerTypeId: typeId,
            })
        )
    }

    useEffect(() => {
        cusCodeInputRef.current.value = 'KH0000000001'
    }, [])

    useEffect(() => {
        if (!placeId) {
            history('/home-page')
        }
    }, [placeId])

    const submitFormHandler = (evt) => {
        evt.preventDefault()
        const checkCount = (el) => {
            return el.quantity > 0
        }

        const checkResult = selectedPlace.details.some(checkCount)

        if (!checkResult) {
            alert('Hãy nhập số lượng vé cần mua')
            return
        }

        const formData = {}
        ;[...customerInfoFormRef.current.elements].forEach((el) => {
            if (el.name) {
                formData[el.name] = el.value
            }
        })

        if (exportReceipt && !formData.diachi) {
            alert('Hãy nhập địa chỉ')
            return
        }

        if (exportReceipt && !formData.phoneNumber) {
            alert('Hãy nhập số điện thoại')
            return
        }
        dispatch(orderActions.setCustomerInfo(formData))
        history('/thanh-toan')
    }

    const clickHandler = () => {
        // customerInfoFormRef.current.submit()
        btnSubmitRef.current.click()
    }

    const checkBoxChangeHandler = (evt) => {
        setNameValue('Khách tham quan')
        setDisableInput(false)
        emailInputRef.current.value = ''
        phoneInputRef.current.value = ''
        taxInputRef.current.value = ''
        addressInputRef.current.value = ''
        if (evt.target.checked) {
            cusCodeInputRef.current.value = ''
        } else {
            cusCodeInputRef.current.value = 'KH0000000001'
        }
        dispatch(commonActions.setExportReceipt(evt.target.checked))
    }

    const selectedPlaceHandler = (evt) => {
        setDisableInput(evt.value > 0)
        const selectedReceipt = arrReceipt.find((el) => el.id === evt.value)
        if (evt.value) {
            // nameInputRef.current.value = selectedReceipt.fullname
            setNameValue(selectedReceipt.fullname)
            emailInputRef.current.value = selectedReceipt.email
            phoneInputRef.current.value = selectedReceipt.phoneNumber
            taxInputRef.current.value = selectedReceipt.taxNumber
            addressInputRef.current.value = selectedReceipt.address
            cusCodeInputRef.current.value = selectedReceipt.cusCode
        } else {
            // nameInputRef.current.value = ''
            setNameValue('Khách tham quan')
            emailInputRef.current.value = ''
            phoneInputRef.current.value = ''
            taxInputRef.current.value = ''
            addressInputRef.current.value = ''
            cusCodeInputRef.current.value = ''
        }
    }

    useEffect(() => {
        if (!placeId) {
            history('/home-page')
        }
    }, [placeId])

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
                            </Waypoint>
                        </div>
                    </div>
                </div>

                <section className="ftco-section ftco-addcart">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-12 heading-section text-left mb-0 ftco-animate">
                                <h2 className="heading2">Thông tin đặt vé</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="addcart-container">
                                    <div className="addcart-list">
                                        <div className="addcart-list__item">
                                            <div className="media">
                                                <div
                                                    className="bg_img"
                                                    style={{
                                                        backgroundImage: `url('images/destination/DaiNoi.jpg')`,
                                                    }}
                                                ></div>
                                                <div className="media-body">
                                                    <h6 className="mt-0">
                                                        {(selectedPlace &&
                                                            selectedPlace.placeName) ||
                                                            ''}
                                                    </h6>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>
                                                                Số lượng:
                                                            </label>
                                                        </div>
                                                        {details
                                                            .filter(
                                                                (el) =>
                                                                    el.price > 0
                                                            )
                                                            .map((el, idx) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="col-md-3 row-quantity"
                                                                    >
                                                                        <span>
                                                                            {
                                                                                el.custommerTypeName
                                                                            }
                                                                        </span>
                                                                        <div className="quantity">
                                                                            <span
                                                                                className="quantity-remove quantity-button"
                                                                                onClick={() => {
                                                                                    turningQuantity(
                                                                                        -1,
                                                                                        el.custommerTypeId
                                                                                    )
                                                                                }}
                                                                            ></span>
                                                                            <input
                                                                                type="number"
                                                                                step="1"
                                                                                min="0"
                                                                                value={
                                                                                    el.quantity
                                                                                }
                                                                                onChange={(
                                                                                    evt
                                                                                ) => {
                                                                                    const val =
                                                                                        evt
                                                                                            .target
                                                                                            .value
                                                                                    if (
                                                                                        val <
                                                                                        0
                                                                                    )
                                                                                        return
                                                                                    updateQuantity(
                                                                                        val,
                                                                                        el.custommerTypeId
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <span
                                                                                className="quantity-add quantity-button"
                                                                                onClick={() =>
                                                                                    turningQuantity(
                                                                                        1,
                                                                                        el.custommerTypeId
                                                                                    )
                                                                                }
                                                                            ></span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="addcart-infomation">
                                    <h4 className="heading4">
                                        Thông tin liên hệ
                                    </h4>
                                    <form
                                        onSubmit={submitFormHandler}
                                        ref={customerInfoFormRef}
                                    >
                                        <div className="form-row">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                    onChange={
                                                        checkBoxChangeHandler
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    Bạn muốn xuất biên lai điện
                                                    tử?
                                                </label>
                                            </div>
                                        </div>
                                        {exportReceipt && (
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="fullname">
                                                        Chọn dữ liệu có sẵn
                                                    </label>
                                                    <Select
                                                        placeholder="Hãy chọn tên khách/đoàn tham quan"
                                                        onChange={
                                                            selectedPlaceHandler
                                                        }
                                                        options={arrReceipt.map(
                                                            (el, idx) => {
                                                                return {
                                                                    value: el.id,
                                                                    label: el.fullname,
                                                                }
                                                            }
                                                        )}
                                                        styles={{
                                                            control: (
                                                                styles
                                                            ) => ({
                                                                ...styles,
                                                                fontWeight:
                                                                    'bold',
                                                            }),
                                                            option: (
                                                                styles,
                                                                {
                                                                    data,
                                                                    isDisabled,
                                                                    isFocused,
                                                                    isSelected,
                                                                }
                                                            ) => {
                                                                return {
                                                                    ...styles,
                                                                    color: '#333',
                                                                    fontWeight:
                                                                        'bold',
                                                                }
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="form-row">
                                            <div className="form-group col-md-4 d-none">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cusCode"
                                                    name="cusCode"
                                                    placeholder="Họ và tên"
                                                    ref={cusCodeInputRef}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="fullname">
                                                    Tên khách/đoàn tham quan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fullname"
                                                    name="fullName"
                                                    placeholder="Họ và tên"
                                                    value={nameValue}
                                                    onChange={
                                                        changeNameValueHandler
                                                    }
                                                    required
                                                    disabled={
                                                        disableInput &&
                                                        exportReceipt
                                                    }
                                                    ref={nameInputRef}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Email"
                                                    name="email"
                                                    disabled={
                                                        disableInput &&
                                                        exportReceipt
                                                    }
                                                    ref={emailInputRef}
                                                />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>Mã vùng</label>
                                                <select
                                                    className="custom-select"
                                                    defaultValue={'0'}
                                                >
                                                    <option value="0">
                                                        (+84)
                                                    </option>
                                                    <option value="1">
                                                        (+1)
                                                    </option>
                                                    <option value="2">
                                                        (+33)
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="phone">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    placeholder="Số điện thoại"
                                                    disabled={
                                                        disableInput &&
                                                        exportReceipt
                                                    }
                                                    ref={phoneInputRef}
                                                />
                                            </div>
                                            <div
                                                className={`form-group col-md-6 ${
                                                    exportReceipt
                                                        ? ''
                                                        : 'd-none'
                                                }`}
                                            >
                                                <label htmlFor="msthue">
                                                    Mã số thuế
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="msthue"
                                                    placeholder="Mã số thuế"
                                                    name="msthue"
                                                    disabled={
                                                        disableInput &&
                                                        exportReceipt
                                                    }
                                                    ref={taxInputRef}
                                                />
                                            </div>
                                            <div
                                                className={`form-group col-md-12 ${
                                                    exportReceipt
                                                        ? ''
                                                        : 'd-none'
                                                }`}
                                            >
                                                <label htmlFor="diachi">
                                                    Địa chỉ
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="diachi"
                                                    placeholder="Địa chỉ"
                                                    name="diachi"
                                                    disabled={
                                                        disableInput &&
                                                        exportReceipt
                                                    }
                                                    ref={addressInputRef}
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
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={clickHandler}
                                >
                                    Mua vé
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterSection />
        </Fragment>
    )
}

export default DatVeStep2
