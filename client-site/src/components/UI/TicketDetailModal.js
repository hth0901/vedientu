import React, { Fragment, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Card from './Card'
import Button from './Button'
import classes from './TicketDetailModal.module.css'
import { useSelector } from 'react-redux'
import { toInteger } from 'lodash'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = (props) => {
    const { ticketObj, placeId, onAllowOne, onAllowAll, qrText } = props
    const { arrCustomerType } = useSelector((state) => state.common)

    // const arrTicketDetails = [
    //     ...((ticketObj && ticketObj.ticketPlaceDetails) || []),
    // ]
    // const objTicketDetail = {
    //     name: ticketObj && ticketObj.fullName,
    //     placeName: '',
    //     items: [],
    //     totalQuantity: 0,
    //     customerTypeName: '',
    // }

    // arrTicketDetails.forEach((el) => {
    //     console.log(el)
    //     console.log(placeId)
    //     let mQrText = qrText || ''
    //     mQrText = mQrText.replaceAll('<', '')
    //     mQrText = mQrText.replaceAll('>', '')
    //     let curCustomerType = mQrText.split('|')[2] || ''
    //     const lstPlaces = (el.places || '').split(',')

    //     const isPlace = lstPlaces.some((el) => +el === +placeId)

    //     if (el.customerType === +curCustomerType && isPlace) {
    //         objTicketDetail.placeName = el.placeName
    //         objTicketDetail.items.push(`${el.quantity} ${el.customerTypeName}`)
    //         objTicketDetail.customerTypeName = el.customerTypeName
    //         objTicketDetail.totalQuantity += el.quantity
    //     }
    // })

    let dkm = qrText
    dkm = dkm.replaceAll('<', '')
    dkm = dkm.replaceAll('>', '')
    const customerType = dkm.split('|')[2]
    const idTicket = dkm.split('|')[1]
    const curCustomerType = arrCustomerType.find(
        (el) => el.id === toInteger(customerType)
    )

    return (
        <div
            className={classes['modal-bg']}
            style={{
                backgroundColor: `${
                    (curCustomerType &&
                        curCustomerType.colorCode &&
                        curCustomerType.colorCode) ||
                    '#fd813c'
                }`,
            }}
        >
            <div className={classes['modal-content']}>
                <img className={classes['logo']} src="/images/popup_logo.png" />
                <div className={classes['div-content']}>
                    <img
                        className={classes['img-bg']}
                        src="/images/bg_content.png"
                    />
                    <h4 className={classes['title']}>tham quan</h4>
                    <h4 className={classes['title-2']}>
                        {ticketObj.placeName || 'HOÀNG CUNG HUẾ'}
                    </h4>
                    <div className={classes['div-hr']}></div>
                    <div className={classes['info-content']}>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Vé:</p>
                            <p className={classes['p-value']}>
                                {ticketObj.customerTypeName}
                            </p>
                        </div>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Số lượng:</p>
                            <p className={classes['p-value']}>
                                {ticketObj.quantity}
                            </p>
                        </div>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Còn lại:</p>
                            <p className={classes['p-value']}>
                                {ticketObj.quantityRemain}
                            </p>
                        </div>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Khách:</p>
                            <p className={classes['p-value']}>
                                {ticketObj.fullName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer
                className={classes.actions}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                }}
            >
                <Button onClick={onAllowOne}>Vào</Button>
                {ticketObj.quantityRemain > 1 && (
                    <Fragment>
                        &nbsp;&nbsp;&nbsp;
                        <Button onClick={onAllowAll}>Vào tất cả</Button>
                    </Fragment>
                )}
            </footer>
        </div>
    )
}

const TickdetDetailModal = (props) => {
    // useEffect(() => {
    //     const mTimeOut = setTimeout(() => {
    //         props.onConfirm()
    //     }, 5000)
    //     return () => {
    //         clearTimeout(mTimeOut)
    //     }
    // }, [])
    const { ticketObj, placeId, qrText } = props
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    qrText={props.qrText}
                    ticketObj={ticketObj}
                    onConfirm={props.onConfirm}
                    onAllowOne={props.onAllowOne}
                    onAllowAll={props.onAllowAll}
                    placeId={placeId}
                />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    )
}

export default TickdetDetailModal
