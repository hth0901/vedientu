import React, { useState, useEffect, useRef } from 'react'

import { Waypoint } from 'react-waypoint'

const SuKienNoiBatSectionItem = (props) => {
    const [isOnEnter, setIsOnEnter] = useState(false)
    const [imgHeight, setImgHeight] = useState(0)
    const refContentImage = useRef()
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }

    const resizeHandler = () => {
        const dkm = refContentImage.current
        setImgHeight(dkm.clientWidth / 1.398)
    }

    useEffect(() => {
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
    return (
        <Waypoint onEnter={onEnter}>
            <div
                className={`col-md-6  ftco-animate ${
                    isOnEnter ? 'fadeInUp ftco-animated' : ''
                }`}
            >
                <a href="#" className="block-event">
                    <div className="block-col-1">
                        <div
                            ref={refContentImage}
                            className="bg-img"
                            style={{
                                backgroundImage: `url(images/event/Festval-Hue.jpg)`,
                                height: `${imgHeight}px`,
                            }}
                        ></div>
                        <div className="time-wrap" id="timer">
                            <div className="item-timer" id="days"></div>
                            <div className="item-timer" id="hours"></div>
                            <div className="item-timer" id="minutes"></div>
                            <div className="item-timer" id="seconds"></div>
                        </div>
                    </div>
                    <div className="block-col-2">
                        <div className="label-meta happenning">
                            Đang diễn ra
                        </div>
                        <div className="description-event">
                            <h5>
                                Festival Huế 2022 - Di sản văn hóa với hội nhập
                                và phát triển
                            </h5>
                            <p className="time-event">
                                <img
                                    src="images/icon/calendar.png"
                                    width="16"
                                    alt=""
                                />{' '}
                                Từ <span>25/06/2022</span> Đến{' '}
                                <span>30/06/2022</span>
                            </p>
                            <p className="place-event">
                                <img
                                    src="images/icon/location.png"
                                    width="16"
                                    alt=""
                                />{' '}
                                Tỉnh Thừa Thiên Huế
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </Waypoint>
    )
}

export default SuKienNoiBatSectionItem
