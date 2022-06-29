import EditTicketTurningQuantityItem from 'components/ticket/EditTicketTurningQuantityItem'
import React, { useState } from 'react'
const API_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const totalQuantityToString = (arr) => {
    const arrResult = arr
        .filter((el) => el.quantity)
        .map((el) => {
            return `${el.quantity} ${el.custommerTypeName}`
        })
    return arrResult.join(', ')
}

const calTotalPrice = (arr) => {
    let priceResult = 0
    arr.forEach((el) => {
        priceResult += el.quantity * el.unitPrice
    })

    return priceResult
}

const ThongTinChiTietVeItem = (props) => {
    const tk = localStorage.getItem('token')
    const { data, onRefresh, onTurning } = props
    // console.log(data)
    // const [childData, setChildData] = useState(
    //     data.items.map((el) => {
    //         return { ...el }
    //     })
    // )

    const dkmData = {
        ticketDetails: [
            {
                id: 249,
                orderId: '20220603002227',
                ticketTypeId: 1,
                quantity: 1,
                customerType: 1,
                unitPrice: 250000,
                isUsed: '0',
            },
        ],
    }

    const updateData = []
    data.items.forEach((el) => {
        updateData.push({
            id: el.id,
            orderId: el.orderId,
            ticketTypeId: el.ticketTypeId,
            quantity: el.quantity,
            customerType: el.customerType,
            unitPrice: el.unitPrice,
            isUsed: el.isUsed,
        })
    })

    const saveHandler = (evt) => {
        evt.preventDefault()
        // console.log(data.items)
        // return
        fetch(`${API_URL}/api/ticket/updateticketdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tk}`,
            },
            body: JSON.stringify({ ticketDetails: updateData }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        'Cập nhật không thành công, liên hệ bộ phận dev'
                    )
                }
                return res.json()
            })
            .then((data) => {
                alert('Cập nhật thành công')
                onRefresh()
            })
            .catch((er) => {
                alert(er.message)
                return
            })
    }

    return (
        <div className="addcart-list__item">
            <div className="media">
                <div className="media-body">
                    <h6 className="mt-0">{data.placeName}</h6>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Số lượng:</label>
                        </div>
                        {data.items.map((el, idx) => {
                            return (
                                <EditTicketTurningQuantityItem
                                    key={idx}
                                    data={el}
                                    onTurning={onTurning}
                                />
                            )
                        })}
                    </div>
                    <div className="row mt-3 row-total">
                        <div className="col-md-3 col-6">
                            <label>Tổng cộng</label>
                        </div>
                        <div className="col-md-3 col-6 text-md-left text-right">
                            <span>
                                {numberWithCommas(data.currentTotalPrice)}
                                VNĐ
                            </span>
                        </div>
                        <div
                            className="col-md-6 d-flex justify-content-end"
                            style={{
                                gap: '10px',
                            }}
                        >
                            {/* <button
                                style={{
                                    display: `${
                                        data.isUsed ? 'none' : 'block'
                                    }`,
                                }}
                            >
                                Sửa
                            </button> */}
                            <button
                                className="btn btn-primary"
                                style={{
                                    display: `${
                                        data.isUsed ? 'none' : 'block'
                                    }`,
                                }}
                                onClick={saveHandler}
                                disabled={
                                    calTotalPrice(data.items) ===
                                    data.currentTotalPrice
                                        ? true
                                        : false
                                }
                            >
                                Lưu
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{
                                    display: `${
                                        data.isUsed ? 'none' : 'block'
                                    }`,
                                }}
                                onClick={onRefresh}
                                disabled={
                                    calTotalPrice(data.items) ===
                                    data.currentTotalPrice
                                        ? true
                                        : false
                                }
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                    {(!data.isUsed && (
                        <div className="row mt-3 row-total">
                            <div className="col-md-3 col-6">
                                <label>Giá vé mới</label>
                            </div>
                            <div className="col-md-3 col-6 text-md-left text-right">
                                <span>
                                    {numberWithCommas(
                                        calTotalPrice(data.items)
                                    )}{' '}
                                    VNĐ
                                </span>
                            </div>
                        </div>
                    )) ||
                        null}
                    {(data.isUsed && (
                        <div className="row mt-3 row-total">
                            <p>
                                {`Vé đã được sử dụng vào lúc ${data.usedDate}`}
                            </p>
                        </div>
                    )) ||
                        null}
                </div>
            </div>
        </div>
    )
}

export default ThongTinChiTietVeItem
