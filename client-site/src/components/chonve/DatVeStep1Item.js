import React, { useRef } from 'react'
import { placeCartActions } from 'store/placeCart-slice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const DatVeStep1Item = (props) => {
    const checkboxRef = useRef()
    const { title, price, image, placeDetail } = props
    const history = useNavigate()
    const dispatch = useDispatch()

    const selectPlaceHandler = (evt) => {
        if (!evt.target.classList.contains('img')) return
        dispatch(
            placeCartActions.replaceCartItem({
                selectedPlace: placeDetail,
                adultCount: 1,
                childrenCount: 0,
            })
        )
        history('/mua-ve')
    }

    const selectToCartHandler = (evt) => {
        dispatch(placeCartActions.addItemToCart({ selectedPlace: placeDetail }))
    }

    const checkboxChangeHandler = (evt, val) => {
        const isChecked = checkboxRef.current.checked
        if (isChecked) {
            dispatch(
                placeCartActions.addItemToCart({ selectedPlace: placeDetail })
            )
        } else {
            dispatch(
                placeCartActions.removeOneItemFromCart({
                    placeId: placeDetail.id,
                })
            )
        }
    }
    return (
        <div className="order-item col-md-3 col-sm-6">
            <div className="order-container">
                <input
                    ref={checkboxRef}
                    type="checkbox"
                    id={`destination_${placeDetail.id}`}
                    onChange={checkboxChangeHandler}
                />
                <label htmlFor={`destination_${placeDetail.id}`}></label>
                <div
                    className="bg-img"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <p className="content-overlay"></p>
                    <p className="content-info">
                        <span className="title-destination">{title}</span>
                        <span>
                            Từ <strong>{numberWithCommas(price)}</strong>{' '}
                            VNĐ/Người
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DatVeStep1Item
