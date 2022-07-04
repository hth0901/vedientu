import React, { Fragment, useEffect, useState } from 'react'
import AOS from 'aos'
import EventItem from '../components/sukien/EventItem'
import BannerSlider from '../components/common/BannerSlider'
import { useDispatch, useSelector } from 'react-redux'
import { truyvanDanhSachSuKien } from '../store/sukien-action'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import { Navigate, useLocation } from 'react-router-dom'
import {Link} from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL



const EventPage = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const { danhSachSuKien } = useSelector((state) => state.sukien)

    useEffect(() => {
        AOS.init({
            duration: 1500,
        })
        dispatch(truyvanDanhSachSuKien())
    }, [])

    useEffect(() => {
        const curStrUser = localStorage.getItem('user')
        const curUser = JSON.parse(curStrUser)
        const curRoleId = (curUser && curUser.roleid) || -1
        fetch(
            `${BASE_URL}/api/menu/getclientautho/${encodeURIComponent(
                location.pathname
            )}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                if (data.length > 0 && !data.includes(curRoleId)) {
                    setIsAuthen(false)
                }
            })
            .catch((err) => {
                // setIsAuthenticated(false)
                setIsAuthen(false)
            })
    }, [isAuthen])

    // if (!isAuthen) {
    //     return (
    //         <Navigate
    //             to={{
    //                 pathname: '/home-page',
    //             }}
    //         />
    //     )
    // }

    return (
        <Fragment>
            <MainHeader />
            <BannerSlider />
            <div className="content-wrap">
                <section className="ftco-section ftco-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="box-container">
                                    <div className="heading-section heading-content">
                                        <h2 className="heading2">Chương trình sự kiện nổi bật</h2>
                                    </div>
                                    <div className="content-container">

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="destination-order event-container row">

                                                    {danhSachSuKien.map((el, idx) => {
                                                        return (
                                                            <EventItem
                                                                id={el.id}
                                                                title={el.title}
                                                                subtitle={el.address}
                                                                content={el.content}
                                                                image={el.imageUrl}
                                                                beginDate={el.beginDate}
                                                                endDate={el.endDate}
                                                                // image={el.imgposter.url}
                                                                key={el.id}
                                                            />
                                                        )
                                                    })}


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
									<Link to={`/su-kien`} >Khám phá</Link>
								</h4>
								<ul className="list-unstyled">
									<li><Link to={`/kham-pha`} >Khám phá di sản Huế</Link></li>
									<li className="active"><Link to={`/su-kien`} >Chương trình sự kiện nổi bật</Link></li>
									<li><Link to={`/home-page`} >Có thể bạn quan tâm</Link></li>
								</ul>
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

            <MainFooter />
        </Fragment>
    )
}

export default EventPage
