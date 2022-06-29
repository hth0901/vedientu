import React, { useState } from 'react'

const ChonPhuongThucThanhToanSection = (props) => {
    const [selectedMethod, setSelectedMethod] = useState(1)
    return (
        <div className="addcart-option">
            <div className="heading-section text-left mb-0 ftco-animate fadeInUp ftco-animated">
                <h2 className="heading2">Chọn phương thức thanh toán</h2>
            </div>
            <div className="accordion" id="accordion_addOption">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button
                                className={`btn btn-link ${
                                    selectedMethod === 1 ? '' : 'collapsed'
                                }`}
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                onClick={() => setSelectedMethod(1)}
                            >
                                Thẻ ATM hoặc ibanking của các ngân hàng trong
                                nước
                            </button>
                        </h5>
                    </div>

                    <div
                        id="collapseOne"
                        className={`collapse ${
                            selectedMethod === 1 ? 'show' : ''
                        }`}
                        aria-labelledby="headingOne"
                        data-parent="#accordion_addOption"
                    >
                        <div className="card-body">
                            <div className="option_banks">
                                <div
                                    className="btn-group btn-group-toggle"
                                    data-toggle="buttons"
                                >
                                    <label className="btn btn-default active">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option1"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/eximbank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option2"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/hdbank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option4"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/vietcombank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option5"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/viettinbank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option6"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/vp-bank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option7"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/logo-seabank4.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option8"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/Logo-SHB-VN.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option9"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/Logo_TPBank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option10"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/mb-bank.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option11"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/LOGO-VIB-Blue.png"
                                            alt=""
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button
                                className={`btn btn-link ${
                                    selectedMethod === 2 ? '' : 'collapsed'
                                }`}
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                                onClick={() => setSelectedMethod(2)}
                            >
                                Ví điện tử
                            </button>
                        </h5>
                    </div>
                    <div
                        id="collapseTwo"
                        className={`collapse ${
                            selectedMethod === 2 ? 'show' : ''
                        }`}
                        aria-labelledby="headingTwo"
                        data-parent="#accordion_addOption"
                    >
                        <div className="card-body">
                            <div className="option_banks">
                                <div
                                    className="btn-group btn-group-toggle"
                                    data-toggle="buttons"
                                >
                                    <label className="btn btn-default active">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option12"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/momo.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option13"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/zalopay.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option14"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/vnpay.png"
                                            alt=""
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <button
                                className={`btn btn-link ${
                                    selectedMethod === 3 ? '' : 'collapsed'
                                }`}
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                                onClick={() => setSelectedMethod(3)}
                            >
                                Thẻ thanh toán quốc tế
                            </button>
                        </h5>
                    </div>
                    <div
                        id="collapseThree"
                        className={`collapse ${
                            selectedMethod === 3 ? 'show' : ''
                        }`}
                        aria-labelledby="headingThree"
                        data-parent="#accordion_addOption"
                    >
                        <div className="card-body">
                            <div className="option_banks">
                                <div
                                    className="btn-group btn-group-toggle"
                                    data-toggle="buttons"
                                >
                                    <label className="btn btn-default active">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option15"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/JCB.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option16"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/Visa.png"
                                            alt=""
                                        />
                                    </label>
                                    <label className="btn btn-default">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option17"
                                            autoComplete="off"
                                        />{' '}
                                        <img
                                            className="img-fluid"
                                            src="images/brand/mastercard.png"
                                            alt=""
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingFour">
                        <h5 className="mb-0">
                            <button
                                className={`btn btn-link ${
                                    selectedMethod === 4 ? '' : 'collapsed'
                                }`}
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseFour"
                                aria-expanded="false"
                                aria-controls="collapseFour"
                                onClick={() => setSelectedMethod(4)}
                            >
                                Thanh toán khi đến tham quan
                            </button>
                        </h5>
                    </div>
                    <div
                        id="collapseFour"
                        className={`collapse ${
                            selectedMethod === 4 ? 'show' : ''
                        }`}
                        aria-labelledby="headingFour"
                        data-parent="#accordion_addOption"
                    >
                        <div className="card-body">
                            Thanh toán tại quầy bán vé
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChonPhuongThucThanhToanSection
