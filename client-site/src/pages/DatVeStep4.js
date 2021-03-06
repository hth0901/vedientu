import React, { Fragment, useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import QRCodeStyling from 'qr-code-styling'
import { useNavigate } from 'react-router-dom'
import MainHeader from 'components/MainHeader'
import { uiActions } from 'store/ui-slice'
import { orderActions } from 'store/order-slice'
import { ticketActions } from 'store/ticket-slice'
import { placeCartActions } from 'store/placeCart-slice'
import TicketQrSection from 'components/trangchu/TicketQrSection'
import Error from '@material-ui/icons/Error'

const API_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const totalQuantityToString = (arr) => {
    console.log(arr)
    const arrResult = arr
        .filter((el) => el.quantity)
        .map((el) => {
            return `${el.quantity} ${el.customerTypeName}`
        })
    return arrResult.join(', ')
}

const DatVeStep4 = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const qrRef = useRef()
    const printRef = useRef()
    const lstQrRef = useRef()
    const ticketObj = useSelector((state) => state.order.orderInfo)
    const [showDetail, setShowDetail] = useState(true)

    useEffect(() => {
        if (!ticketObj) {
            history('/home-page')
        }
    }, [])
    const customerTypeDetails =
        (ticketObj && ticketObj.customerTypeDetails) || []
    const ticketId = useSelector((state) => state.order.ticketId)
    const isLoggedIn = useSelector((state) => state.authen.isLoggedIn)
    const [mailTicket, setMailTicket] = useState('')

    const changeEmailHandler = (evt) => {
        setMailTicket(evt.target.value)
    }

    const changeShowDetail = () => {
        setShowDetail(!showDetail)
    }

    const downloadReceiptHandler = (evt) => {
        evt.preventDefault()
        dispatch(uiActions.setShowLoading(true))
        fetch(`${API_URL}/api/Receipt/download/${ticketObj.id}`)
            .then((response) => response.blob())
            .then((result) => {
                // const url = URL.createObjectURL(new Blob([bytes.buffer], {type: 'text/plain'}));
                const url = URL.createObjectURL(result)
                window.open(url, '_blank', '')
            })
            .catch((error) => console.log('error', error))
            .finally(() => {
                dispatch(uiActions.setShowLoading(false))
            })
    }

    const downloadHandler = (evt) => {
        dispatch(uiActions.setShowLoading(true))
        // const myCanvas = qrRef.current.querySelector("canvas");
        const placeNameArr = []
        let adultQuantity = 0,
            childrenQuantity = 0
        ticketObj.ticketPlaceDetails.forEach((el) => {
            placeNameArr.push(el.name)
            el.details.forEach((dt) => {
                if (dt.customerType === 1)
                    adultQuantity = adultQuantity + dt.quantity
                if (dt.customerType === 2)
                    childrenQuantity = childrenQuantity + dt.quantity
            })
        })
        const placesName = placeNameArr.join(',')
        var formdata = new FormData()

        const lstQrDiv = Array.from(
            lstQrRef.current.querySelectorAll('div.img-qr')
        )
        lstQrDiv.forEach((qrDivEl) => {
            const elCanvas = qrDivEl.querySelector('canvas')
            const objValue = qrDivEl.querySelector('input').value
            const _qrRequest = {
                orderId: ticketObj.id,
                placesName,
                totalQuantity: objValue,
                email: ticketObj.email,
                fullName: ticketObj.fullName,
                phoneNumber: ticketObj.phoneNumber,
                totalPrice: ticketObj.totalPrice,
                uniqId: ticketObj.uniqId,
                qrString: elCanvas.toDataURL(),
            }

            formdata.append('_request', JSON.stringify(_qrRequest))
        })

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }

        // console.log(formdata);
        fetch(`${API_URL}/api/Ticket/download`, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                // const url = URL.createObjectURL(new Blob([bytes.buffer], {type: 'text/plain'}));
                const url = URL.createObjectURL(result)
                window.open(url, '_blank', '')
            })
            .catch((error) => console.log('error', error))
            .finally(() => {
                dispatch(uiActions.setShowLoading(false))
            })
    }

    const printTicketHandler = (evt) => {
        console.log('print')
        dispatch(uiActions.setShowLoading(true))
        const placeNameArr = []
        let adultQuantity = 0,
            childrenQuantity = 0
        ticketObj.ticketPlaceDetails.forEach((el) => {
            placeNameArr.push(el.name)
            el.details.forEach((dt) => {
                if (dt.customerType === 1)
                    adultQuantity = adultQuantity + dt.quantity
                if (dt.customerType === 2)
                    childrenQuantity = childrenQuantity + dt.quantity
            })
        })
        const placesName = placeNameArr.join(',')
        var formdata = new FormData()

        const lstQrDiv = Array.from(lstQrRef.current.querySelectorAll('div'))
        customerTypeDetails.forEach((el) => {
            // const objValue = qrDivEl.querySelector('input').value
            const _qrRequest = {
                orderId: ticketObj.id,
                placesName,
                totalQuantity: el.quantity,
                customerTypeName: el.customerTypeName,
                customerTypeId: el.customerType,
                email: ticketObj.email,
                fullName: ticketObj.fullName,
                phoneNumber: ticketObj.phoneNumber,
                totalPrice: ticketObj.totalPrice,
                uniqId: ticketObj.uniqId,
                qrString: `<${ticketObj.ticketId}>|<${ticketObj.id}>|<${el.customerType}>|<${ticketObj.totalPrice}>`,
            }
            formdata.append('_request', JSON.stringify(_qrRequest))
        })

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }
        fetch(`${API_URL}/api/Ticket/print`, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                printRef.current.innerHTML = ''
                const url = URL.createObjectURL(result)
                const iframe = document.createElement('iframe')
                printRef.current.appendChild(iframe)
                iframe.style.display = 'none'
                iframe.src = url
                iframe.onload = function () {
                    setTimeout(function () {
                        iframe.focus()
                        iframe.contentWindow.print()
                    }, 1)
                }
            })
            .catch((error) => console.log('error', error))
            .finally(() => {
                dispatch(uiActions.setShowLoading(false))
            })
    }

    const sendEmailHandlerVer2 = (evt) => {
        dispatch(uiActions.setShowLoading(true))
        // const myCanvas = qrRef.current.querySelector("canvas");
        const placeNameArr = []
        let adultQuantity = 0,
            childrenQuantity = 0
        ticketObj.ticketPlaceDetails.forEach((el) => {
            placeNameArr.push(el.name)
            el.details.forEach((dt) => {
                if (dt.customerType === 1)
                    adultQuantity = adultQuantity + dt.quantity
                if (dt.customerType === 2)
                    childrenQuantity = childrenQuantity + dt.quantity
            })
        })
        const placesName = placeNameArr.join(',')
        var formdata = new FormData()

        const lstQrDiv = Array.from(
            lstQrRef.current.querySelectorAll('div.img-qr')
        )
        lstQrDiv.forEach((qrDivEl) => {
            const elCanvas = qrDivEl.querySelector('canvas')
            const objValue = qrDivEl.querySelector('input').value
            const _qrRequest = {
                orderId: ticketObj.id,
                placesName,
                totalQuantity: objValue,
                email: ticketObj.email,
                fullName: ticketObj.fullName,
                phoneNumber: ticketObj.phoneNumber,
                totalPrice: ticketObj.totalPrice,
                uniqId: ticketObj.uniqId,
                qrString: elCanvas.toDataURL(),
            }

            formdata.append('ticketcontent', JSON.stringify(_qrRequest))
        })

        formdata.append('email', mailTicket)

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }

        fetch(`${API_URL}/api/mail/sendtickettoemail`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'G???i email kh??ng th??nh c??ng, vui l??ng li??n h??? b??? ph???n ph??t tri???n'
                    )
                }

                return response.text()
            })
            .then((result) => {
                // const url = URL.createObjectURL(new Blob([bytes.buffer], {type: 'text/plain'}));
                // const url = URL.createObjectURL(result)
                // window.open(url, '_blank', '')
                // console.log(url);
                alert('G???i email th??nh c??ng! H??y ki???m tra h???p mail')
            })
            .catch((error) => {
                console.log('error', error)
                alert(error.message)
            })
            .finally(() => {
                dispatch(uiActions.setShowLoading(false))
            })
    }

    const sendMailHandler = (evt) => {
        const myCanvas = qrRef.current.querySelector('canvas')
        const placeNameArr = []
        let adultQuantity = 0,
            childrenQuantity = 0
        ticketObj.ticketPlaceDetails.forEach((el) => {
            placeNameArr.push(el.name)
            el.details.forEach((dt) => {
                if (dt.customerType === 1)
                    adultQuantity = adultQuantity + dt.quantity
                if (dt.customerType === 2)
                    childrenQuantity = childrenQuantity + dt.quantity
            })
        })
        const placesName = placeNameArr.join(',')
        const _request = {
            orderId: ticketObj.id,
            placesName,
            adultQuantity,
            childrenQuantity,
            totalQuantity: adultQuantity + childrenQuantity,
            email: ticketObj.email,
            fullName: ticketObj.fullName,
            phoneNumber: ticketObj.phoneNumber,
            totalPrice: ticketObj.totalPrice,
            uniqId: ticketObj.uniqId,
            qrString: myCanvas.toDataURL(),
        }
        var formdata = new FormData()
        for (let name in _request) {
            formdata.append(name, _request[name])
        }
        formdata.append('toEmail', mailTicket)
        formdata.append('mailSubject', 'V?? tham quan')
        formdata.append('mailBody', '????y l?? v?? tham quan c???a b???n')

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }
        fetch(`${API_URL}/api/mail/sendtickettoemail`, requestOptions)
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    alert('G???i email th??nh c??ng!')
                    return
                } else {
                    throw new Error('Proccess Error')
                }
                return response.json()
            })
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log('error', error)
                alert(error.message)
            })
    }
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
                            <div className="col-12 ftco-animate fadeInUp ftco-animated">
                                <div className="block-7 step-order">
                                    <div className="step-content">
                                        <ul className="slider-step">
                                            <li className="active body-1">
                                                <span>01</span>
                                                <p>Ch???n ??i???m di t??ch</p>
                                            </li>
                                            <li className="active body-1">
                                                <span>02</span>
                                                <p>?????t v??</p>
                                            </li>
                                            <li className="active body-1">
                                                <span>03</span>
                                                <p>Thanh to??n</p>
                                            </li>
                                            <li className="active current body-1">
                                                <span>04</span>
                                                <p>Ho??n t???t</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ftco-section ftco-addcart">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-12 notification-section text-center">
                                <h4 className="heading-success text-success">
                                    <img
                                        src="images/icon/check-rouder.png"
                                        alt=""
                                    />{' '}
                                    ?????t v?? th??nh c??ng
                                </h4>
                                <p>
                                    Y??u c???u <b>?????T V??</b> c???a b???n ???? ???????c th???c
                                    hi???n th??nh c??ng <b>(???? THANH TO??N)</b>. B???n
                                    c?? th??? ki???m tra th??ng tin chi ti???t b??n d?????i.{' '}
                                    <br />
                                    C??m ??n b???n ???? tin t?????ng v?? s??? d???ng d???ch v???
                                    c???a ch??ng t??i. N???u c?? b???t k?? th???c m???c n??o
                                    hay c???n s??? gi??p ?????, vui l??ng li??n h??? ?????n:{' '}
                                    <br />
                                    Trung t??m h??? tr???{' '}
                                    <b className="text-primary">19001570</b> c???a
                                    ch??ng t??i ????? nh???n ???????c h?????ng d???n. <br />
                                    ????? tra c???u h??a ????n ?????t v?? xin vui l??ng truy
                                    c???p ?????a ch??? web:{' '}
                                    <b>http://eticket.hueworldheritage.org</b>
                                </p>
                            </div>
                        </div>
                        <div className="box-container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="addcart-infomation">
                                        <h4 className="heading4">
                                            Th??ng tin li??n h???
                                        </h4>
                                        <dl className="row">
                                            <dt className="col-sm-2">
                                                H??? t??n:
                                            </dt>
                                            <dd className="col-sm-10">
                                                {(ticketObj &&
                                                    ticketObj.fullName) ||
                                                    ''}
                                            </dd>

                                            <dt className="col-sm-2">Email:</dt>
                                            <dd className="col-sm-10">
                                                {(ticketObj &&
                                                    ticketObj.email) ||
                                                    ''}
                                            </dd>

                                            <dt className="col-sm-2">
                                                S??? ??i???n tho???i:
                                            </dt>
                                            <dd className="col-sm-10">
                                                {(ticketObj &&
                                                    ticketObj.phoneNumber) ||
                                                    ''}
                                            </dd>
                                        </dl>
                                        <h4 className="heading4">
                                            Th??ng tin ????n v??
                                        </h4>
                                        <dl className="row">
                                            <dt className="col-sm-2">M?? v??:</dt>
                                            <dd className="col-sm-10 text-primary">
                                                #
                                                {(ticketObj && ticketObj.id) ||
                                                    ''}
                                            </dd>

                                            <dt className="col-sm-2">
                                                Th???i gian ?????t:
                                            </dt>
                                            <dd className="col-sm-10">
                                                25/04/2022 - 15:30:11
                                            </dd>

                                            <dt className="col-sm-2">
                                                Thanh to??n:
                                            </dt>
                                            <dd className="col-sm-10">
                                                T???i qu???y
                                            </dd>

                                            <dt className="col-sm-2">
                                                Khuy???n m??i:
                                            </dt>
                                            <dd className="col-sm-10 text-warning">
                                                0 VN??
                                            </dd>

                                            <dt className="col-sm-2">
                                                S??? ti???n thanh to??n:
                                            </dt>
                                            <dd className="col-sm-10 text-primary">
                                                {(ticketObj &&
                                                    ticketObj.totalPrice &&
                                                    numberWithCommas(
                                                        ticketObj.totalPrice
                                                    )) ||
                                                    '0'}
                                                VND
                                            </dd>
                                        </dl>

                                        <div className="collapse-detail">
                                            <p className="btn-action">
                                                <button
                                                    className=""
                                                    data-toggle="collapse"
                                                    role="button"
                                                    aria-expanded="false"
                                                    aria-controls="collapsedetail"
                                                    onClick={changeShowDetail}
                                                >
                                                    {!showDetail && (
                                                        <span className="viewdetail">
                                                            Xem chi ti???t
                                                        </span>
                                                    )}

                                                    {showDetail && (
                                                        <span className="hidedetail">
                                                            ???n chi ti???t
                                                        </span>
                                                    )}
                                                </button>
                                            </p>
                                            <div
                                                className={`collapse ${
                                                    showDetail ? 'show' : ''
                                                }`}
                                                id="collapsedetail"
                                            >
                                                <div className="card card-body">
                                                    {(
                                                        (ticketObj &&
                                                            ticketObj.ticketPlaceDetails) ||
                                                        []
                                                    ).map((el, idx) => {
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="dl-item"
                                                            >
                                                                <dl className="row">
                                                                    <dt className="col-sm-2">
                                                                        ?????a
                                                                        ??i???m:
                                                                    </dt>
                                                                    <dd className="col-sm-10">
                                                                        {
                                                                            el.name
                                                                        }
                                                                    </dd>

                                                                    <dt className="col-sm-2">
                                                                        S???
                                                                        l?????ng:
                                                                    </dt>
                                                                    <dd className="col-sm-10">
                                                                        {totalQuantityToString(
                                                                            el.details
                                                                        )}
                                                                    </dd>

                                                                    <dt className="col-sm-2">
                                                                        T???ng
                                                                        c???ng:
                                                                    </dt>
                                                                    <dd className="col-sm-10 text-primary">
                                                                        {numberWithCommas(
                                                                            el.totalPrice
                                                                        )}
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="custom-control css-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customCheck1"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="customCheck1"
                                            >
                                                G???i v?? v??? email
                                            </label>
                                        </div>
                                        <div className="input-group input-group-email">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nh???p email..."
                                                aria-label="Nh???p email..."
                                                aria-describedby="form-addon"
                                                value={mailTicket}
                                                onChange={changeEmailHandler}
                                            />
                                            <div
                                                className="input-group-append"
                                                onClick={sendEmailHandlerVer2}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <span
                                                    className="input-group-text"
                                                    id="form-addon"
                                                >
                                                    <img
                                                        src="images/icon/send.png"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <p className="note">
                                            <a
                                                href="dangnhap.html"
                                                className="text-primary"
                                            >
                                                ????ng nh???p
                                            </a>{' '}
                                            ????? l??u gi??? th??ng tin v??! N???u ch??a c??
                                            t??i kho???n?{' '}
                                            <a
                                                href="dangky.html"
                                                className="text-primary"
                                            >
                                                ????ng k??
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-5" ref={lstQrRef}>
                                    <div ref={printRef}></div>
                                    <TicketQrSection
                                        ticketObj={ticketObj}
                                        printTicket={printTicketHandler}
                                        downloadTicket={downloadHandler}
                                        downloadReceipt={downloadReceiptHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default DatVeStep4
