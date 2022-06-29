import React from 'react'

import { placeCartActions } from 'store/placeCart-slice'
import { useDispatch } from 'react-redux'

const QuantityTurningItem = (props) => {
    const { el, placeId } = props
    const dispatch = useDispatch()
    return (
        <div className="col-md-3 row-quantity">
            <span>{el.custommerTypeName}</span>
            <div className="quantity">
                <span
                    className="quantity-remove quantity-button"
                    onClick={() =>
                        dispatch(
                            placeCartActions.turningQuantity({
                                placeId,
                                custommerTypeId: el.custommerTypeId,
                                count: -1,
                            })
                        )
                    }
                ></span>
                <input
                    type="number"
                    name="demoInput"
                    step="0"
                    min="0"
                    value={el.quantity}
                    // onChange={() => {}}
                    disabled
                />
                <span
                    className="quantity-add quantity-button"
                    onClick={() =>
                        dispatch(
                            placeCartActions.turningQuantity({
                                placeId,
                                custommerTypeId: el.custommerTypeId,
                                count: 1,
                            })
                        )
                    }
                ></span>
            </div>
        </div>
    )
}

export default QuantityTurningItem
