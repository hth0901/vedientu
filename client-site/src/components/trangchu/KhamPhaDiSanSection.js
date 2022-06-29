import React, { useState, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import Slider from 'react-slick'
import KhamPhaDiSanSliderItem from './KhamPhaDiSanSliderItem'
import { useDispatch, useSelector } from 'react-redux'
import { truyVanDanhSachDiaDiem } from 'store/diadiem-actions'
import { makeStyles } from '@material-ui/core/styles'

const BASE_URL = process.env.REACT_APP_URL

const KhamPhaDiSanSection = (props) => {
    const dispatch = useDispatch()
    const [isOnEnter, setIsOnEnter] = useState(false)
    const onEnter = (evt) => {
        setIsOnEnter(true)
    }

    const dsDiaDiem = useSelector((state) => {
        return state.diadiem.danhsach
    })

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiem())
    }, [])

    return (
        <section className="ftco-section ftco-destination">
            <div className="container">
                <div className="row justify-content-start">
                    <Waypoint onEnter={onEnter}>
                        <div
                            className={`col-12 heading-section ftco-animate ${
                                isOnEnter ? 'fadeInUp ftco-animated' : ''
                            }`}
                        >
                            <h4 className="">
                                Khám phá <span>di sản</span>
                            </h4>
                            <span className="subheading">
                                Huế là vùng đất được mệnh danh là xứ sở của di
                                sản, được UNESCO vinh danh.
                            </span>
                        </div>
                    </Waypoint>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Waypoint onEnter={onEnter}>
                            <div
                                className={`destination-slider owl-carousel`}
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
                                            // {
                                            //     breakpoint: 1024,
                                            //     settings: {
                                            //         slidesToShow: 3,
                                            //         slidesToScroll: 3,
                                            //         infinite: true,
                                            //         dots: false,
                                            //     },
                                            // },
                                            {
                                                breakpoint: 600,
                                                settings: {
                                                    slidesToShow: 2,
                                                    slidesToScroll: 2,
                                                    initialSlide: 2,
                                                    infinite: true,
                                                    dots: false,
                                                },
                                            },
                                            {
                                                breakpoint: 480,
                                                settings: {
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1,
                                                    infinite: true,
                                                    dots: false,
                                                },
                                            },
                                        ],
                                    }}
                                >
                                    {dsDiaDiem &&
                                        dsDiaDiem.map((el, idx) => {
                                            return (
                                                <KhamPhaDiSanSliderItem
                                                    key={el.id}
                                                    title={el.title}
                                                    content={el.content}
                                                    description={el.description}
                                                    image={`${BASE_URL}/upload/${el.imageUrl}`}
                                                    id={el.id}
                                                />
                                            )
                                        })}
                                </Slider>
                            </div>
                        </Waypoint>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KhamPhaDiSanSection
