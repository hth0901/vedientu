import React, { useState, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import Slider from 'react-slick'
import CacLoaiHinhDichVuSectionItem from './CacLoaiHinhDichVuSectionItem'

const DUMMY_DATA = [
    {
        title: 'Trải nghiệm thực tế ảo vr',
        content:
            'Những hình ảnh của kinh thành thời Nguyễn được hiện ra đầy đủ, rõ nét sinh động cùng với những hoạt động, nghi thức hàng ngày trong hoàng cung hàng trăm năm trước.',
        image: 'images/service/service1.png',
        icon: 'images/icon/vr.png',
    },
    {
        title: 'Audio Guide',
        content:
            'Dịch vụ thuyết minh tự động (Audio guide) là ứng dụng công nghệ điện tử hỗ trợ tự động hóa việc thuyết minh cho khách tham quan, nhất là khách lẻ quốc tế và khách sử dụng ngôn ngữ hiếm.',
        image: 'images/service/service2.png',
        icon: 'images/icon/audio.png',
    },
    {
        title: 'Xe điện',
        content:
            'Để tạo điều kiện cho du khách có cơ hội tham quan khu vực xung quanh Đại Nội và tất cả các điểm du lịch bên trong Đại Nội mà không mất nhiều thời gian.',
        image: 'images/service/service3.png',
        icon: 'images/icon/careco.png',
    },
    {
        title: 'Chụp ảnh cổ trang',
        content:
            'Bên trong Hoàng cung Huế có tổ chức chụp ảnh lưu niệm cho du khách tham quan dưới trang phục thái thượng hoàng, vua, hoàng hậu, công chúa, hoàng tử và cung phi.',
        image: 'images/service/service4.png',
        icon: 'images/icon/photo.png',
    },
    {
        title: 'Không gian trình diễn nghề truyền thống Huế',
        content:
            'Tôn tạo, phục dựng và giới thiệu các ngành nghề thủ công truyền thống từng có dưới thời nhà Nguyễn, các nghề truyền thống Huế, trong không gian phủ Nội Vụ - Đại Nội Huế',
        image: 'images/service/service1.png',
        icon: 'images/icon/vr.png',
    },
]

const CacLoaiHinhDichVuSection = (props) => {
    const [isOnEnter, setIsOnEnter] = useState(false)
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }
    return (
        <section className="ftco-section ftco-service">
            <div className="container">
                <div className="row justify-content-start">
                    <Waypoint onEnter={onEnter}>
                        <div
                            className={`col-12 heading-section ftco-animate ${
                                isOnEnter ? 'fadeInUp ftco-animated' : ''
                            }`}
                        >
                            <h4 className="">
                                Các loại hình <span>dịch vụ</span>
                            </h4>
                            <span className="subheading">
                                Hỗ trợ cho du khách trải nghiệm các dịch vụ và
                                tiện ích khi tham quan các điểm di tích ở Huế.
                            </span>
                        </div>
                    </Waypoint>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div
                            className={`owl-carousel ftco-animate ${
                                isOnEnter ? 'fadeInUp ftco-animated' : ''
                            }`}
                            style={{ display: 'block' }}
                        >
                            <Slider
                                {...{
                                    dots: false,
                                    arrows: false,
                                    infinite: true,
                                    speed: 800,
                                    slidesToShow: 4,
                                    slidesToScroll: 4,
                                    responsive: [
                                        {
                                            breakpoint: 600,
                                            settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 2,
                                            },
                                        },
                                        {
                                            breakpoint: 480,
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1,
                                            },
                                        },
                                    ],
                                }}
                            >
                                {DUMMY_DATA.map((el, idx) => {
                                    return (
                                        <CacLoaiHinhDichVuSectionItem
                                            key={idx}
                                            data={el}
                                        />
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CacLoaiHinhDichVuSection
