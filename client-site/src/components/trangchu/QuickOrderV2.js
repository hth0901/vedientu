import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { placeCartActions } from 'store/placeCart-slice'
import { orderActions } from 'store/order-slice'
import { uiActions } from 'store/ui-slice'
import { truyVanDanhSachDiaDiemGiaVe } from 'store/diadiem-actions'

import { Waypoint } from 'react-waypoint'

import Select from 'react-select'

const QuickOrderV2 = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const adultNumberRef = useRef()
    const childrenNumberRef = useRef()

    const [selectedOption, setSelectedOption] = useState(null)
    const items = useSelector((state) => state.placeCart.items)

    const currentSelected = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { details } = currentSelected
    const detailAdult = details.find((el) => el.custommerTypeId === 1)
    const detailChildren = details.find((el) => el.custommerTypeId === 2)

    const {
        danhsachDiaDiemGiaVe: danhsachDiaDiem,
        danhsachTuyenDiaDiemGiaVe: danhsachTuyen,
    } = useSelector((state) => state.diadiem)

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiemGiaVe())
    }, [])

    useEffect(() => {
        if (danhsachDiaDiem[0]) {
            dispatch(
                placeCartActions.initQuickOrder({
                    selectedPlace: danhsachDiaDiem[0],
                })
            )

            dispatch(orderActions.resetOrder())
            setSelectedOption({
                value: danhsachDiaDiem[0].id,
                label: danhsachDiaDiem[0].title,
            })
        }
    }, [danhsachDiaDiem])

    const [isOnEnter, setIsOnEnter] = useState(false)
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }

    const adultAddHandler = (evt) => {
        if (!currentSelected) return
        dispatch(
            // placeCartActions.increaseAdultQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: 1,
                custommerTypeId: 1,
            })
        )
    }

    const adultMinusHanlder = (evt) => {
        if (!currentSelected) return
        // if (currentSelected.adultQuantity === 0) return;
        const detail = details.find((el) => el.custommerTypeId === 1)
        if (!detail) return
        if (detail.quantity === 0) return
        dispatch(
            // placeCartActions.decreaseAdultQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: -1,
                custommerTypeId: 1,
            })
        )
    }

    const childrenAddHandler = (evt) => {
        if (!currentSelected) return
        dispatch(
            // placeCartActions.increaseChildrenQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: 1,
                custommerTypeId: 2,
            })
        )
    }

    const childrenMinusHanlder = (evt) => {
        if (!currentSelected) return
        // if (currentSelected.childrenQuantity === 0) return;
        const detail = details.find((el) => el.custommerTypeId === 2)
        if (!detail) return
        if (detail.quantity === 0) return
        dispatch(
            // placeCartActions.decreaseChildrenQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: -1,
                custommerTypeId: 2,
            })
        )
    }

    const selectDiaDiemhandler = (val) => {
        const selectedPlace = danhsachDiaDiem.find((el) => el.id === val)
        const adultNumber = +adultNumberRef.current.value
        const childrenNumber = +childrenNumberRef.current.value
        dispatch(
            placeCartActions.replaceCartItem({
                selectedPlace,
                adultCount: adultNumber,
                childrenCount: childrenNumber,
            })
        )
    }

    const selectedPlaceHandler = (evt) => {
        // const selectedValue = evt.target.value
        setSelectedOption(evt)
        selectDiaDiemhandler(evt.value)
    }

    const submitHandler = (evt) => {
        evt.preventDefault()
        dispatch(uiActions.setOrderType(true))
        history('/mua-ve')
    }

    const changeAdultQuantityHandler = (evt) => {
        // console.log(evt.target.value)
        dispatch(
            placeCartActions.quickOrderChangeQuantity({
                count: +evt.target.value,
                custommerTypeId: 1,
            })
        )
    }

    const changeChildQuantityHandler = (evt) => {
        dispatch(
            placeCartActions.quickOrderChangeQuantity({
                count: +evt.target.value,
                custommerTypeId: 2,
            })
        )
    }

    return (
        <div className="ftco-section form-section">
            <div className="container">
                <div className="slider-text" data-scrollax-parent="true">
                    <Waypoint onEnter={onEnter}>
                        <div
                            className={`slider-text-container ftco-animate ${
                                isOnEnter ? 'fadeInUp ftco-animated' : ''
                            }`}
                            data-scrollax=" properties: { translateY: '70%' }"
                        >
                            <h3>Chào mừng đến với Huế!</h3>
                            <p>
                                Đặt vé tham quan trực tuyến thuận tiện, nhanh
                                chóng.
                            </p>
                            <div className="block-17 form-search">
                                <form className="" onSubmit={submitHandler}>
                                    <div className="form-row fields">
                                        <div className="col-6 col-lg-12">
                                            <label>Điểm tham quan</label>
                                            <div className="select-wrap one-third">
                                                <div className="icon">
                                                    <span className="ion-ios-arrow-down"></span>
                                                </div>
                                                <Select
                                                    placeholder="Hãy chọn điểm tham quan"
                                                    // defaultValue={
                                                    //     selectedOption
                                                    // }
                                                    value={selectedOption}
                                                    onChange={
                                                        selectedPlaceHandler
                                                    }
                                                    options={danhsachDiaDiem.map(
                                                        (el, idx) => {
                                                            return {
                                                                value: el.id,
                                                                label: el.title,
                                                            }
                                                        }
                                                    )}
                                                    styles={{
                                                        control: (styles) => ({
                                                            ...styles,
                                                            backgroundColor:
                                                                'black',
                                                            color: '#fff',
                                                            fontWeight: 'bold',
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
                                        <div className="col-lg-6 col-6">
                                            <label>Người lớn</label>
                                            <div className="select-wrap one-third">
                                                <div className="quantity">
                                                    <span
                                                        className="quantity-remove quantity-button"
                                                        onClick={
                                                            adultMinusHanlder
                                                        }
                                                    ></span>
                                                    <input
                                                        width={'50px'}
                                                        style={{
                                                            backgroundColor:
                                                                'transparent',
                                                            color: '#fafafa',
                                                        }}
                                                        ref={adultNumberRef}
                                                        type="number"
                                                        step="0"
                                                        min="0"
                                                        value={
                                                            (detailAdult &&
                                                                detailAdult.quantity) ||
                                                            0
                                                        }
                                                        onChange={
                                                            changeAdultQuantityHandler
                                                        }
                                                    />
                                                    <span
                                                        className="quantity-add quantity-button"
                                                        onClick={
                                                            adultAddHandler
                                                        }
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-6">
                                            <label>
                                                Trẻ em (Từ 7 - 12 tuổi)
                                            </label>
                                            <div className="select-wrap one-third">
                                                <div className="quantity">
                                                    <span
                                                        className="quantity-remove quantity-button"
                                                        onClick={
                                                            childrenMinusHanlder
                                                        }
                                                    ></span>
                                                    <input
                                                        width={'50px'}
                                                        style={{
                                                            backgroundColor:
                                                                'transparent',
                                                            color: '#fafafa',
                                                        }}
                                                        ref={childrenNumberRef}
                                                        type="number"
                                                        step="0"
                                                        min="0"
                                                        value={
                                                            (detailChildren &&
                                                                detailChildren.quantity) ||
                                                            0
                                                        }
                                                        onChange={
                                                            changeChildQuantityHandler
                                                        }
                                                    />
                                                    <span
                                                        className="quantity-add quantity-button"
                                                        onClick={
                                                            childrenAddHandler
                                                        }
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="submit"
                                        className="search-submit btn btn-primary"
                                        value="Đặt vé"
                                    />
                                </form>
                            </div>
                        </div>
                    </Waypoint>
                </div>
            </div>
        </div>
    )
}

export default QuickOrderV2
