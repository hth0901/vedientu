import React, { useState } from 'react'
import TicketQrSectionItem from './TicketQrSectionItem'

const TicketQrSection = (props) => {
    const { ticketObj, printTicket, downloadTicket, downloadReceipt } = props
    const customerTypeDetails =
        (ticketObj && ticketObj.customerTypeDetails) || []
    const [currentTab, setCurrentTab] = useState(0)
    return (
        <div className="tab-print">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {customerTypeDetails.map((el, idx) => {
                    return (
                        <li key={idx} className="nav-item">
                            <button
                                className={`nav-link ${
                                    currentTab === idx ? 'active' : ''
                                }`}
                                data-toggle="tab"
                                // href="#one"
                                role="tab"
                                aria-controls="one"
                                aria-selected="true"
                                onClick={() => setCurrentTab(idx)}
                            >
                                {el.customerTypeName}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="tab-content" id="myTabContent">
                {customerTypeDetails.map((el, idx) => {
                    return (
                        <div
                            key={idx}
                            className={`tab-pane fade ${
                                currentTab === idx ? 'show active' : ''
                            }`}
                            role="tabpanel"
                            aria-labelledby="one-tab"
                        >
                            <TicketQrSectionItem
                                el={el}
                                ticketObj={ticketObj}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="btn-print">
                <button
                    onClick={downloadReceipt}
                    className="btn btn-primary mr-3"
                >
                    <img src="images/icon/print.png" alt="" /> Tải biên lai
                </button>
                <button onClick={printTicket} className="btn btn-primary mr-3">
                    <img src="images/icon/print.png" alt="" /> In vé
                </button>
                <button
                    onClick={downloadTicket}
                    className="btn btn-outline-primary"
                >
                    <img src="images/icon/download.png" alt="" /> Tải về
                </button>
            </div>
        </div>
    )
}

export default TicketQrSection
