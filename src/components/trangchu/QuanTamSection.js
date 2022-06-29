import React, { useState } from 'react'
import Slider from 'react-slick'
import QuanTamSectionItem from './QuanTamSectionItem'
import { Waypoint } from 'react-waypoint'

const QuanTamSection = (props) => {
    const [isOnEnter, setIsOnEnter] = useState(false)
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }
    return (
        <section className="ftco-section ftco-blog">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="blog-container">
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="main-title">
                                        <h2 className="title-rotate">
                                            Có thể bạn <span>quan tâm!</span>
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <Waypoint onEnter={onEnter}>
                                        <div
                                            className={`owl-carousel ftco-animate ${
                                                isOnEnter
                                                    ? 'fadeInUp ftco-animated'
                                                    : ''
                                            }`}
                                            style={{ display: 'block' }}
                                        >
                                            <Slider
                                                {...{
                                                    dots: false,
                                                    arrows: false,
                                                    autoplay: true,
                                                    autoplaySpeed: 4000,
                                                    pauseOnHover: false,
                                                    infinite: true,
                                                    speed: 800,
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1,
                                                }}
                                            >
                                                <QuanTamSectionItem />
                                                <QuanTamSectionItem />
                                            </Slider>
                                        </div>
                                    </Waypoint>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default QuanTamSection
