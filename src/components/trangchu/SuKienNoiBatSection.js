import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import SuKienNoiBatSectionItem from './SuKienNoiBatSectionItem'
import { useDispatch, useSelector } from 'react-redux'
import { truyvanDanhSachSuKien } from 'store/sukien-action'

const BASE_URL = process.env.REACT_APP_URL

const SuKienNoiBatSection = (props) => {
    const dispatch = useDispatch()
    const [isOnEnter, setIsOnEnter] = useState(false)
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }
    // const items = useSelector((state) => {
    //     return state.sukien.danhSachSuKien
    // })
    // useEffect(() => {
    //     dispatch(truyvanDanhSachSuKien())
    // }, [])
    return (
        <section
            className="ftco-section ftco-counter img"
            id="section-counter"
            style={{ backgroundImage: `url(images/bg-envent.png)` }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <Waypoint onEnter={onEnter}>
                        <div
                            className={`col-12 heading-section heading-section-white ftco-animate ${
                                isOnEnter ? 'fadeInUp ftco-animated' : ''
                            }`}
                        >
                            <h4 className="">
                                Sự kiện <span>Nổi bật</span>
                            </h4>
                            <span className="subheading">
                                Các sự kiện nổi bật hấp dẫn diễn ra trong năm
                                2022 tại cố đô Huế
                            </span>
                        </div>
                    </Waypoint>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="row">
                            <SuKienNoiBatSectionItem />
                            <SuKienNoiBatSectionItem />

                            {/* <Waypoint onEnter={onEnter}>
                                <div
                                    className={`col-md-6  ftco-animate ${
                                        isOnEnter
                                            ? 'fadeInUp ftco-animated'
                                            : ''
                                    }`}
                                >
                                    <a href="#" className="block-event">
                                        <div className="block-col-1">
                                            <div
                                                className="bg-img"
                                                style={{
                                                    backgroundImage: `url(images/event/MT&DS-1.jpg)`,
                                                }}
                                            ></div>
                                            <div
                                                className="time-wrap"
                                                id="timer1"
                                            >
                                                <div
                                                    className="item-timer"
                                                    id="days1"
                                                ></div>
                                                <div
                                                    className="item-timer"
                                                    id="hours1"
                                                ></div>
                                                <div
                                                    className="item-timer"
                                                    id="minutes1"
                                                ></div>
                                                <div
                                                    className="item-timer"
                                                    id="seconds1"
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="block-col-2">
                                            <div className="label-meta upcoming">
                                                Sắp diễn ra
                                            </div>
                                            <div className="description-event">
                                                <h5>Lễ hội đèn lồng cố đô</h5>
                                                <p className="time-event">
                                                    <img
                                                        src="images/icon/calendar.png"
                                                        width="16"
                                                        alt=""
                                                    />{' '}
                                                    Từ <span>03/09/2022</span>{' '}
                                                    Đến <span>18/09/2022</span>
                                                </p>
                                                <p className="place-event">
                                                    <img
                                                        src="images/icon/location.png"
                                                        width="16"
                                                        alt=""
                                                    />{' '}
                                                    Thành phố Huế
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </Waypoint> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SuKienNoiBatSection
