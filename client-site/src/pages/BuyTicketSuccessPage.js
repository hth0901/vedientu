import React, { Fragment, useRef, useEffect, useState } from 'react'
import AOS from 'aos'

import { useDispatch, useSelector } from 'react-redux'
import QRCodeStyling from 'qr-code-styling'
import { useNavigate } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import { uiActions } from '../store/ui-slice'
import { orderActions } from '../store/order-slice'
import { ticketActions } from '../store/ticket-slice'
import { placeCartActions } from '../store/placeCart-slice'

const API_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const BuyTicketSuccessPage = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const qrRef = useRef()
    const printRef = useRef()
    const lstQrRef = useRef()
    const ticketObj = useSelector((state) => state.order.orderInfo)
    const { customerTypeDetails } = ticketObj
    const ticketId = useSelector((state) => state.order.ticketId)
    const isLoggedIn = useSelector((state) => state.authen.isLoggedIn)
    const [mailTicket, setMailTicket] = useState('')
    const [selectedCustomerType, setSelectedCustomerType] = useState(
        customerTypeDetails[0].customerType
    )
    // const [ticketObj, setTicketDetaik] = useState({
    //   ticketPlaceDetails: [],
    //   email: '',
    //   ticketId: '',
    //   id: '',
    //   totalPrice: 0,
    //   fullName: '',
    //   phoneNumber: '',
    //   uniqId: ''
    // });
    // const qrCode = new QRCodeStyling({
    //   width: 250,
    //   height: 250,
    //   image: "images/hue_logo.png",
    //   dotsOptions: {
    //     color: "#000",
    //     type: "rounded",
    //   },
    //   imageOptions: {
    //     crossOrigin: "anonymous",
    //     margin: 5,
    //     //   imageSize: 5
    //   },
    // });
    const changeEmailHandler = (evt) => {
        setMailTicket(evt.target.value)
    }

    // useEffect(() => {
    //   if (ticketId) {
    //     console.log(ticketId);
    //     fetch(`${configData.apiBaseUrl}/pay/ticketdetailbyid/${ticketId}`, ).then(res => {
    //       return res.json();
    //     }).then(data => {
    //       console.log(data);
    //       setTicketDetaik(data);
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   }
    // }, [ticketId])

    useEffect(() => {
        if (ticketObj) {
            // console.log(ticketObj);
            const qrCode = new QRCodeStyling({
                width: 250,
                height: 250,
                image: 'images/hue_logo.png',
                dotsOptions: {
                    color: '#000',
                    type: 'rounded',
                },
                imageOptions: {
                    crossOrigin: 'anonymous',
                    margin: 5,
                    //   imageSize: 5
                },
            })
            setMailTicket(ticketObj.email)
            qrRef.current.innerHTML = ''
            qrCode.update({
                data: `<${ticketObj.ticketId}>|<${ticketObj.id}>|<${selectedCustomerType}>|<${ticketObj.totalPrice}>`,
            })
            qrCode.append(qrRef.current)
        } else {
            history('/home-page')
        }
    }, [ticketObj, selectedCustomerType])

    useEffect(() => {
        if (ticketObj) {
            lstQrRef.current.innerHTML = ''
            customerTypeDetails.forEach((el) => {
                const mDiv = document.createElement('div')
                const mText = document.createElement('INPUT')
                mText.setAttribute('type', 'text')
                mText.value = `${el.quantity} ${el.customerTypeName}`
                mDiv.appendChild(mText)
                const qrCode = new QRCodeStyling({
                    width: 250,
                    height: 250,
                    image: 'images/hue_logo.png',
                    dotsOptions: {
                        color: '#000',
                        type: 'rounded',
                    },
                    imageOptions: {
                        crossOrigin: 'anonymous',
                        margin: 5,
                    },
                })
                qrCode.update({
                    data: `<${ticketObj.ticketId}>|<${ticketObj.id}>|<${el.customerType}>|<${ticketObj.totalPrice}>`,
                })
                // qrCode.append(lstQrRef.current);
                qrCode.append(mDiv)
                lstQrRef.current.appendChild(mDiv)
            })
        }
    }, [ticketObj])

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

        const lstQrDiv = Array.from(lstQrRef.current.querySelectorAll('div'))
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
        // console.log(lstQrDiv);
        // return;

        // const _request = {
        //   orderId: ticketObj.id,
        //   placesName,
        //   adultQuantity,
        //   childrenQuantity,
        //   totalQuantity: adultQuantity + childrenQuantity,
        //   email: ticketObj.email,
        //   fullName: ticketObj.fullName,
        //   phoneNumber: ticketObj.phoneNumber,
        //   totalPrice: ticketObj.totalPrice,
        //   uniqId: ticketObj.uniqId,
        //   qrString: myCanvas.toDataURL(),
        // };
        // for (let name in _request) {
        //   formdata.append(name, _request[name]);
        // }

        // formdata.append("_request", JSON.stringify(_request));

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
                // console.log(url);
            })
            .catch((error) => console.log('error', error))
            .finally(() => {
                dispatch(uiActions.setShowLoading(false))
            })
    }

    const printTicketHandler = (evt) => {
        dispatch(uiActions.setShowLoading(true))
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
        var formdata = new FormData()

        const lstQrDiv = Array.from(lstQrRef.current.querySelectorAll('div'))

        // lstQrDiv.forEach((qrDivEl) => {
        //     const elCanvas = qrDivEl.querySelector('canvas')
        //     const objValue = qrDivEl.querySelector('input').value
        //     const _qrRequest = {
        //         orderId: ticketObj.id,
        //         placesName,
        //         totalQuantity: objValue,
        //         email: ticketObj.email,
        //         fullName: ticketObj.fullName,
        //         phoneNumber: ticketObj.phoneNumber,
        //         totalPrice: ticketObj.totalPrice,
        //         uniqId: ticketObj.uniqId,
        //         qrString: elCanvas.toDataURL(),
        //     }

        //     formdata.append('_request', JSON.stringify(_qrRequest))
        // })
        customerTypeDetails.forEach((el) => {
            // const objValue = qrDivEl.querySelector('input').value
            const _qrRequest = {
                orderId: ticketObj.id,
                placesName,
                totalQuantity: el.quantity,
                customerTypeName: el.customerTypeName,
                email: ticketObj.email,
                fullName: ticketObj.fullName,
                phoneNumber: ticketObj.phoneNumber,
                totalPrice: ticketObj.totalPrice,
                uniqId: ticketObj.uniqId,
                qrString: `<${ticketObj.ticketId}>|<${ticketObj.id}>|<${el.customerType}>|<${ticketObj.totalPrice}>`,
            }
            formdata.append('_request', JSON.stringify(_qrRequest))
        })
        // const _request = {
        //   orderId: ticketObj.id,
        //   placesName,
        //   adultQuantity,
        //   childrenQuantity,
        //   totalQuantity: adultQuantity + childrenQuantity,
        //   email: ticketObj.email,
        //   fullName: ticketObj.fullName,
        //   phoneNumber: ticketObj.phoneNumber,
        //   totalPrice: ticketObj.totalPrice,
        //   uniqId: ticketObj.uniqId,
        //   qrString: myCanvas.toDataURL(),
        // };
        // var formdata = new FormData();
        // for (let name in _request) {
        //   formdata.append(name, _request[name]);
        // }

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }

        // console.log(formdata);
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

    const changeCustomerTypeHandler = (evt) => {
        const val = evt.target.value
        setSelectedCustomerType(val)
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

        // console.log(formdata);
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
                // const url = URL.createObjectURL(new Blob([bytes.buffer], {type: 'text/plain'}));
                // const url = URL.createObjectURL(result);
                // window.open(url, "_blank", "");
                // console.log(url);
            })
            .catch((error) => {
                console.log('error', error)
                alert(error.message)
            })
    }

    return (
        <Fragment>
            <MainHeader />
            <div className="hero-wrap layout-page">
                <div className="home-slider">
                    <div href="#" className="item">
                        {/* <div className="overlay"></div> */}
                        <div
                            className="img__bg"
                            style={{
                                backgroundImage: 'url(images/DaiNoi.jpg)',
                            }}
                        ></div>
                        <div className="slider-content">
                            <div className="container">
                                <div className="slider-text">
                                    <h1>C??m ??n</h1>
                                    <ul className="slider-step">
                                        <li className="body-1">
                                            <span>01</span> Ch???n v??
                                        </li>
                                        <li className="ody-1">
                                            <span>02</span> Mua v??
                                        </li>
                                        <li className="body-1">
                                            <span>03</span> Thanh to??n
                                        </li>
                                        <li className="active body-1">
                                            <span>04</span> C??m ??n
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ftco-section ftco-order">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="heading-section">
                                <h6 className="mb-25">
                                    Th??ng tin ?????t v?? tham quan
                                </h6>
                            </div>
                            <dl className="row">
                                <dd className="col-md-2 col-6">ID v??:</dd>
                                <dt className="col-md-10 col-6">
                                    {(ticketObj && ticketObj.id) || ''}
                                </dt>

                                <dd className="col-md-2 col-6">H??? v?? t??n:</dd>
                                <dt className="col-md-10 col-6">
                                    {(ticketObj && ticketObj.fullName) || ''}
                                </dt>

                                <dd className="col-md-2 col-6">
                                    S??? ??i???n tho???i:
                                </dd>
                                <dt className="col-md-4 col-6">
                                    {(ticketObj && ticketObj.phoneNumber) || ''}
                                </dt>

                                <dd className="col-md-2 col-6">CMND/CCCD:</dd>
                                <dt className="col-md-4 col-6">
                                    {(ticketObj && ticketObj.uniqId) || ''}
                                </dt>

                                <dd className="col-md-2 col-6">Email:</dd>
                                <dt className="col-md-10 col-6">
                                    {(ticketObj && ticketObj.email) || ''}
                                </dt>

                                <dd className="col-md-2 col-6">
                                    ?????a ??i???m tham quan:
                                </dd>
                                {/* <dt className="col-md-4 col-6">?????i N???i Hu???</dt>
                <dd className="col-md-2 col-6">S??? l?????ng:</dd>
                <dt className="col-md-4 col-6">20 (15 ng?????i l???n, 5 tr??? em)</dt>
                <dd className="col-md-2 col-6"></dd>
                <dt className="col-md-4 col-6">L??ng T??? ?????c</dt>
                <dd className="col-md-2 col-6">S??? l?????ng:</dd>
                <dt className="col-md-4 col-6">20 (15 ng?????i l???n, 5 tr??? em)</dt>
                <dd className="col-md-2 col-6"></dd>
                <dt className="col-md-4 col-6">L??ng Minh M???ng</dt>
                <dd className="col-md-2 col-6">S??? l?????ng:</dd>
                <dt className="col-md-4 col-6">20 (15 ng?????i l???n, 5 tr??? em)</dt> */}

                                {ticketObj.ticketPlaceDetails
                                    .filter((el) => {
                                        const detailType = el.details.find(
                                            (el) =>
                                                el.customerType ===
                                                +selectedCustomerType
                                        )
                                        return detailType
                                    })
                                    .map((el, idx) => {
                                        // let totalQuantity = 0,
                                        //   adultQuantity = 0,
                                        //   childrenQuantity = 0;
                                        // el.details.forEach((pl) => {
                                        //   totalQuantity = totalQuantity + pl.quantity;
                                        //   if (pl.customerType === 1) {
                                        //     adultQuantity = pl.quantity;
                                        //   } else if (pl.customerType === 2) {
                                        //     childrenQuantity = pl.quantity;
                                        //   }
                                        // });

                                        const currentSelectedType =
                                            customerTypeDetails.find(
                                                (el) =>
                                                    el.customerType ===
                                                    +selectedCustomerType
                                            )
                                        const detailQuantity = el.details.find(
                                            (e) =>
                                                e.customerType ===
                                                +selectedCustomerType
                                        )
                                        // const detailType = el.details.find(el => el.customerType === +selectedCustomerType);
                                        // if (currentSelectedType && detailType) {

                                        // }
                                        return (
                                            <Fragment key={el.placeId}>
                                                {idx > 0 && (
                                                    <dd className="col-md-2 col-6"></dd>
                                                )}
                                                <dt className="col-md-4 col-6">
                                                    {el.name}
                                                </dt>
                                                <dd className="col-md-2 col-6">
                                                    S??? l?????ng:
                                                </dd>
                                                {/* <dt className="col-md-4 col-6">{`${totalQuantity} (${adultQuantity} ng?????i l???n, ${childrenQuantity} tr??? em)`}</dt> */}
                                                <dt className="col-md-4 col-6">{`${detailQuantity.quantity} ${currentSelectedType.customerTypeName}`}</dt>
                                            </Fragment>
                                        )
                                    })}

                                {/* <dd className="col-md-2 col-6">Lo???i v??:</dd>
                                <dt className="col-md-4 col-6">V?? ??o??n</dt>

                                <dd className="col-md-2 col-6">S??? l?????ng:</dd>
                                <dt className="col-md-4 col-6">20 (15 ng?????i l???n, 5 tr??? em)</dt> */}

                                {/* <dd className="col-md-2 col-6">D???ch v???:</dd>
                                <dt className="col-md-10 col-6">H?????ng d???n thuy???t minh, ch???p ???nh</dt> */}

                                <dd className="col-md-2 col-6">
                                    Ph????ng th???c thanh to??n:
                                </dd>
                                <dt className="col-md-10 col-6">
                                    {isLoggedIn
                                        ? 'Thanh to??n t???i qu???y'
                                        : 'Chuy???n kho???n ng??n h??ng'}
                                </dt>

                                <dd className="col-md-2 col-6">T???ng c???ng:</dd>
                                <dt className="col-md-10 col-6">
                                    {(ticketObj &&
                                        ticketObj.totalPrice &&
                                        numberWithCommas(
                                            ticketObj.totalPrice
                                        )) ||
                                        '0'}
                                    VND
                                </dt>

                                <dd className="col-12">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="emailcheckbox"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="emailcheckbox"
                                        >
                                            G???i v?? v??? email
                                        </label>
                                    </div>
                                </dd>
                                <dd className="col-md-5">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            value={mailTicket}
                                            className="form-control"
                                            placeholder="Nh???p v??o email c???a b???n"
                                            aria-label="Nh???p v??o email c???a b???n"
                                            aria-describedby="searchdestination"
                                            onChange={changeEmailHandler}
                                        />
                                        <div
                                            className="input-group-append"
                                            style={{ cursor: 'pointer' }}
                                            onClick={sendMailHandler}
                                        >
                                            <span
                                                className="input-group-text"
                                                id="searchdestination"
                                            >
                                                <i className="material-icons-outlined">
                                                    send
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                </dd>
                                <dd className="col-12">
                                    <a href="#" className="text-primary">
                                        ????ng nh???p
                                    </a>{' '}
                                    ????? l??u gi??? th??ng tin v??! N???u ch??a c?? t??i
                                    kho???n?{' '}
                                    <a href="#" className="text-primary">
                                        ????ng k??
                                    </a>
                                </dd>
                            </dl>
                        </div>

                        <div className="col-md-4 d-flex">
                            <div className="qr-info">
                                {/* <img src="images/qr.png" className="img-fluid" alt="" /> */}
                                <div ref={qrRef}></div>
                                <div ref={printRef}></div>
                                <div
                                    ref={lstQrRef}
                                    style={{ display: 'none' }}
                                ></div>
                                <span>
                                    <button
                                        className="btn btn-outline-primary mr-2"
                                        onClick={printTicketHandler}
                                    >
                                        <i className="material-icons-outlined">
                                            print
                                        </i>{' '}
                                        In v??
                                    </button>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={downloadHandler}
                                    >
                                        <i className="material-icons-outlined">
                                            save_alt
                                        </i>{' '}
                                        T???i v???
                                    </button>
                                </span>
                                <br />
                                <span
                                    style={{
                                        display: `${
                                            customerTypeDetails.length > 1
                                                ? 'block'
                                                : 'none'
                                        }`,
                                    }}
                                >
                                    {/* <select
                                        className="form-control"
                                        onChange={changeCustomerTypeHandler}
                                    >
                                        {customerTypeDetails.map((el, idx) => {
                                            return (
                                                <option
                                                    key={el.customerType}
                                                    value={el.customerType}
                                                >
                                                    {el.customerTypeName}
                                                </option>
                                            )
                                        })}
                                    </select> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default BuyTicketSuccessPage
