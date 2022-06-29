import React, { useRef, useEffect } from 'react'
import QRCodeStyling from 'qr-code-styling'

const TicketQrSectionItem = (props) => {
    const { el, ticketObj } = props
    const divQrRef = useRef()
    useEffect(() => {
        // if (ticketObj) {
        const mDiv = document.createElement('div')
        mDiv.style.cssText = `display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        `
        const qrCode = new QRCodeStyling({
            width: 250,
            height: 250,
            // image: 'images/hue_logo.png',
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
        qrCode.append(mDiv)
        divQrRef.current.appendChild(mDiv)
        // }
    }, [])
    return (
        <div className="content-print">
            <div className="img-qr" ref={divQrRef}>
                {/* <img src="images/order/qr-nl.png" alt="" /> */}
                <input
                    type="text"
                    value={`${el.quantity} ${el.customerTypeName}`}
                    disabled
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    )
}

export default TicketQrSectionItem
