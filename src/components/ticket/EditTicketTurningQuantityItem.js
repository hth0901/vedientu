import React from 'react'

const EditTicketTurningQuantityItem = (props) => {
    const { data, onTurning } = props
    console.log(data)
    return (
        <div className="col-md-3 row-quantity">
            <span>{data.customerTypeName}</span>
            <div className="quantity">
                <span
                    className="quantity-remove quantity-button"
                    onClick={() =>
                        onTurning(data.ticketTypeId, data.customerType, -1)
                    }
                    style={{
                        display: `${+data.isUsed === 1 ? 'none' : 'block'}`,
                    }}
                ></span>
                <input
                    type="number"
                    name="demoInput"
                    step="0"
                    min="0"
                    value={data.quantity}
                    disabled
                />
                <span
                    className="quantity-add quantity-button"
                    onClick={() =>
                        onTurning(data.ticketTypeId, data.customerType, 1)
                    }
                    style={{
                        display: `${+data.isUsed === 1 ? 'none' : 'block'}`,
                    }}
                ></span>
            </div>
        </div>
    )
}

export default EditTicketTurningQuantityItem
