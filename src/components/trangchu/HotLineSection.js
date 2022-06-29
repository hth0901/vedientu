import React, { useState, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'

const HotLineSection = (props) => {
    const [isOnEnter, setIsOnEnter] = useState(false)
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }
    return (
        <section className="ftco-section-parallax">
            <div className="parallax-img d-flex align-items-center">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <Waypoint onEnter={onEnter}>
                            <div
                                className={`col-md-9 heading-section heading-section-white ftco-animate ${
                                    isOnEnter ? 'fadeInUp ftco-animated' : ''
                                }`}
                            >
                                <h2>Tư vấn chuyên nghiệp, tận tình</h2>
                                <p>
                                    Với đội ngũ nhân viên nhiều kinh nghiệm, am
                                    hiểu các điểm đến chúng tôi luôn sẵn sàng hỗ
                                    trợ và tư vấn mọi thông tin liên quan đến
                                    nhu cầu du lịch, tham quan của Quý khách!
                                </p>
                            </div>
                        </Waypoint>

                        <div className="col-md-3 img-section">
                            <img src="images/icon/hotline.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HotLineSection
