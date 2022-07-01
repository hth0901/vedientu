import React, { Fragment, useRef, useEffect, useState } from 'react'

import Slider from 'react-slick'


import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Link, useNavigate } from 'react-router-dom'
import classes from '../diemden/DestinationDetailItem.module.css'

import parse from 'html-react-parser'
import { margin } from '@mui/system'

const BASE_URL = process.env.REACT_APP_URL

const EventDetail = (props) => {
    const { detailData,datafull } = props
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)

    let slider1 = []
    let slider2 = []


    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [])
    return (
        <Fragment>
            <div className="hero-wrap hero-content-1" style={{ backgroundImage: `url("${detailData.imgposter.url}")` }}>

            </div>
            <div className="content-wrap">
                <section className="ftco-section ftco-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="box-container">
                                    <div className="content-container">
                                        <div className="blog-container">
                                            <div className="blog-detail">
                                                <div className="title-header-blog">
                                                    <h4 className="heading2 blog-title">{detailData.title}</h4>
                                                </div>

                                                <div className="blog-gallery">
                                                    <img src={detailData.imgposter.url}></img>
                                                    <div id="gallery"></div>
                                                </div>
                                                <div className="info-meta-event">
                                                    <p className="time-event">
                                                        <img src="images/icon/calendar.png" width="16" alt=""></img>Từ <span>{detailData.beginDate}</span> Đến <span>{detailData.endDate}</span>
                                                    </p>
                                                    <p className="place-event"><img src="images/icon/location.png" width="16" alt=""></img>{detailData.location.name}</p>
                                                    <p className="place-event"><img src="images/icon/fb.png" width="16" alt=""></img>www.facebook.com/sukien</p>
                                                </div>
                                                <div className="blog-content">
                                                    {detailData.content}
                                                    <p></p>
                                                    <h6><strong>{detailData.title} hân hạnh đón chào Du khách!</strong></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="sidebarleft">
                                    <div className="menu-m1">
                                        <h4 className="title-menu">
                                            <Link to={`/su-kien`}>Khám phá</Link>
                                        </h4>
                                        <ul className="list-unstyled">
                                            <li><Link to={`/kham-pha`}>Khám phá di sản Huế</Link></li>
                                            <li className="active"><Link to={`/su-kien`}>Chương trình sự kiện nổi bật</Link></li>
                                            <li><Link to={`/home-page`} >Có thể bạn quan tâm</Link></li>
                                        </ul>
                                    </div>
                                    
                                    <div className="slider-destination">
                                         <h4 className="title-menu-h">
                                            <a href="#">Các sự kiện khác</a>
                                        </h4>
                                        <Slider
                                            dots={false}
                                            adaptiveHeight={false}
                                            arrows={false}
                                            asNavFor={nav2}
                                            ref={(slider) => (slider1 = slider)}
                                            fade={true}
                                            autoplay={true}
                                            autoplaySpeed={200}
                                        >
                                            {detailData &&
                                                datafull &&
                                                datafull.map((el) => {
                                                    return (
                                                            
                                                            <div key={el.id} className="item" >
                                                                <div className="order-item" style={{marginTop:-30}}>
                                                                    <div className="order-container"></div>
                                                                    <Link to={`/su-kien/${el.id}`} className="bg-img" style={{ backgroundImage: `url('${el.imgposter.url}')` }}>
                                                                        <p className="content-overlay"></p>
                                                                        <p className="content-info">
                                                                            <span className="title-destination">{el.title}</span>
                                                                            <span className="calendar-destination"><img src="images/icon/calendar-yellow.png" alt=""></img> {el.beginDate} - {el.endDate}</span>
                                                                        </p>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                           
                                                        
                                                    )
                                                })}
                                        </Slider>
                                        <Slider
                                            dots={true}
                                            adaptiveHeight={false}
                                            arrows={false}
                                            asNavFor={nav1}
                                            ref={(slider) => (slider2 = slider)}
                                            slidesToShow={3}
                                            swipeToSlide={true}
                                            focusOnSelect={true}
                                            centerMode={true}
                                            className={
                                                classes['slick-slide-margin']
                                            }
                                        >
                                            {detailData &&
                                                detailData.listimage &&
                                                detailData.listimage.map((el) => {
                                                    return (
                                                           null
                                                    )
                                                })}
                                        </Slider>

                                    </div>
                                    <div className="adv-container">
                                        <a className="adv-item">
                                            <img src="images/adv/adv1.png" alt=""></img>
                                        </a>
                                        <a className="adv-item">
                                            <img src="images/adv/adv2.png" alt=""></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </div>


        </Fragment>
    )
}

export default EventDetail
