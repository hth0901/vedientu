import React from 'react'
import Slider from 'react-slick'
import QuickOrderV2 from './QuickOrderV2'

const MainSlider = (props) => {
    return (
        <div className="hero-wrap">
            <div
                className="home-slider owl-carousel owl-theme"
                style={{ display: 'block' }}
            >
                <Slider
                    {...{
                        dots: false,
                        arrows: false,
                        fade: true,
                        autoplay: true,
                        autoplaySpeed: 4000,
                        pauseOnHover: false,
                        infinite: true,
                        speed: 800,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }}
                >
                    <div className="item main-slide-item">
                        <div className="overlay"></div>
                        <div
                            className="img_bg"
                            style={{
                                backgroundImage: `url('images/slide/dainoi_small.jpg')`,
                            }}
                        ></div>
                        <div className="slider-content">
                            <h1>Đại Nội Huế</h1>
                            <p>
                                Người ta đến Huế không chỉ thưởng thức những
                                cảnh đẹp lãng mạn, thơ mộng mà nơi đây còn lưu
                                giữ vết tích Đại Nội Huế, chốn cung đình xưa cũ
                                của triều đại nhà Nguyễn ở Việt Nam.
                            </p>
                        </div>
                    </div>
                    <div className="item main-slide-item">
                        <div className="overlay"></div>
                        <div
                            className="img_bg"
                            style={{
                                backgroundImage: `url('images/slide/biaquochoc_small.jpg')`,
                            }}
                        ></div>
                        <div className="slider-content">
                            <h1>Bia Quốc Học</h1>
                            <p>
                                Bia Quốc Học tọa lạc giữa một ngoại cảnh thiên
                                nhiên thơ mộng, nhất là phía sau có dòng sông
                                Hương trong xanh êm ả, giữa một không gian kiến
                                trúc độc đáo.
                            </p>
                        </div>
                    </div>
                </Slider>
            </div>
            <QuickOrderV2 />
        </div>
    )
}

export default MainSlider
