import MainHeader from 'components/MainHeader'
import Slider from 'react-slick'
import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'

const PendingPage = (props) => {
    return (
        <Fragment>
            <nav
                className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
                id="ftco-navbar"
            >
                <div className="container">
                    <Link className="navbar-brand" to={'/home-page'}>
                        <img src="images/logo.svg" alt="img-fluid" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#ftco-nav"
                        aria-controls="ftco-nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="oi oi-menu"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    to="/home-page"
                                    className={(navData) => {
                                        return navData.isActive
                                            ? 'nav-link active'
                                            : 'nav-link'
                                    }}
                                >
                                    Trang chủ
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <a href="dichvu.html" className="nav-link">
                                    <span>Dịch vụ</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="khampha.html" className="nav-link">
                                    Khám phá
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="thong-ke" className="nav-link">
                                    Thống kê
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="lienhe.html" className="nav-link">
                                    <span>Liên hệ</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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
                                    backgroundImage: `url('images/slide/dainoi.jpg')`,
                                }}
                            ></div>
                            <div className="slider-content">
                                <h1>Đại Nội Huế</h1>
                                <p>
                                    Người ta đến Huế không chỉ thưởng thức những
                                    cảnh đẹp lãng mạn, thơ mộng mà nơi đây còn
                                    lưu giữ vết tích Đại Nội Huế, chốn cung đình
                                    xưa cũ của triều đại nhà Nguyễn ở Việt Nam.
                                </p>
                            </div>
                        </div>
                        <div className="item main-slide-item">
                            <div className="overlay"></div>
                            <div
                                className="img_bg"
                                style={{
                                    backgroundImage: `url('images/slide/biaquochoc.jpg')`,
                                }}
                            ></div>
                            <div className="slider-content">
                                <h1>Bia Quốc Học</h1>
                                <p>
                                    Bia Quốc Học tọa lạc giữa một ngoại cảnh
                                    thiên nhiên thơ mộng, nhất là phía sau có
                                    dòng sông Hương trong xanh êm ả, giữa một
                                    không gian kiến trúc độc đáo.
                                </p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </Fragment>
    )
}

export default PendingPage
