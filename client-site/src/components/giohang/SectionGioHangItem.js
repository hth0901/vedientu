import React, { useEffect, useRef } from 'react'
import { placeCartActions } from 'store/placeCart-slice'
import { useDispatch } from 'react-redux'
import QuantityTurningItem from './QuantityTurningItem'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const SectionGioHangItem = (props) => {
    const dispatch = useDispatch()
    const cartItem = { ...props.placeItem }
    const { totalPrice, details } = cartItem
    console.log(cartItem)
    const checkboxRef = useRef()

    useEffect(() => {
        if (totalPrice === 0) {
            dispatch(placeCartActions.reset())
        }
    }, [totalPrice])

    const changeAdultQuantityHandler = (evt) => {
        const val = +evt.target.value
        if (val < 0) return
        dispatch(
            placeCartActions.updateAdultQuantity({
                placeId: cartItem.id,
                count: val,
            })
        )
    }

    const decreaseAdultQuantityHandler = (evt) => {
        dispatch(
            placeCartActions.decreaseAdultQuantity({ placeId: cartItem.id })
        )
    }
    const increaseAdultQuantityHandler = (evt) => {
        dispatch(
            placeCartActions.increaseAdultQuantity({ placeId: cartItem.id })
        )
    }

    const changeChildrenQuantityHandler = (evt) => {
        const val = +evt.target.value
        if (val < 0) return
        dispatch(
            placeCartActions.updateChildrenQuantity({
                placeId: cartItem.id,
                count: val,
            })
        )
    }

    const decreaseChildrenQuantityHandler = (evt) => {
        dispatch(
            placeCartActions.decreaseChildrenQuantity({ placeId: cartItem.id })
        )
    }
    const increaseChildrenQuantityHandler = (evt) => {
        dispatch(
            placeCartActions.increaseChildrenQuantity({ placeId: cartItem.id })
        )
    }

    const checkBoxClickHandler = (evt, arg) => {
        const isChecked = checkboxRef.current.checked
        props.checkCart(cartItem.id, isChecked)
    }

    const turningQuantityHandler = (placeId, custommerTypeId, count) => {
        // console.log(placeId, custommerTypeId, count);
        dispatch(
            placeCartActions.turningQuantity({
                placeId,
                custommerTypeId,
                count,
            })
        )
    }

    const changeQuantityHandler = (placeId, custommerTypeId, count) => {
        // console.log(placeId, custommerTypeId, count);
    }

    const deleteHandler = () => {
        dispatch(
            placeCartActions.removeOneItemFromCart({
                placeId: cartItem.placeId,
            })
        )
    }

    return (
        <div className="addcart-list__item">
            <div className="custom-control css-checkbox">
                <input
                    onChange={checkBoxClickHandler}
                    className="custom-control-input"
                    type="checkbox"
                    id={`checkItem_${cartItem.placeId}`}
                    ref={checkboxRef}
                />
                <label
                    className="custom-control-label"
                    htmlFor={`checkItem_${cartItem.placeId}`}
                ></label>
            </div>
            <div className="media">
                <div
                    className="bg_img"
                    style={{
                        backgroundImage: `url('images/destination/DaiNoi.jpg')`,
                    }}
                ></div>
                <div className="media-body">
                    <h6 className="mt-0">{cartItem.placeName}</h6>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Số lượng:</label>
                        </div>
                        {details.map((el, idx) => {
                            return (
                                <QuantityTurningItem
                                    key={idx}
                                    el={el}
                                    placeId={cartItem.placeId}
                                />
                            )
                        })}
                    </div>
                    <div className="row mt-3 row-total">
                        <div className="col-md-3 col-6">
                            <label>Tổng cộng</label>
                        </div>
                        <div className="col-md-3 col-6 text-md-left text-right">
                            <span>{numberWithCommas(totalPrice)} VNĐ</span>
                        </div>
                        <div
                            className="col-md-6 d-flex justify-content-end"
                            onClick={deleteHandler}
                        >
                            <img
                                src="images/icon/delete.png"
                                width="20"
                                alt=""
                            />{' '}
                            <span>Xóa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionGioHangItem
