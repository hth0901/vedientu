import React, { Fragment, useEffect, useState } from 'react'
import AOS from 'aos'
import BannerSlider from '../components/common/BannerSlider'
import TourItem from '../components/tour/TourItem'
import { useDispatch, useSelector } from 'react-redux'
import { truyvanDanhSachTour } from '../store/tour-action'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import { Navigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'


const BASE_URL = process.env.REACT_APP_URL

const TourMoiPage = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    // const { danhSachTour } = useSelector((state) => state.tour)
    // console.log(danhSachTour)
    // useEffect(() => {
    //     AOS.init({
    //         duration: 100,
    //     })
    //     dispatch(truyvanDanhSachTour())
    // }, [])
    const [dataFull, setDataFull] = useState(null)

    useEffect(() => {
        if(dataFull==null){
            fetch(`https://www.hueworldheritage.org.vn/desktopModules/APITinBai/API/v1/News/getListNewsbyCateID?categoryId=F19D0328-979A-46FB-B080-AE6800B5B500`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Không tìm thấy dữ liệu của sự kiện')
                    }
                    return res.json()
                })
                .then((data) => {
                    const data1 = data['newsList']
                
                    setDataFull(data1)
                })
            }
            },[dataFull])
        



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
                                        <h2 className="heading2">CHƯƠNG TRÌNH TOUR MỚI </h2>
                                    </div>
                                    <div className="content-container">

                                        <div className="list-blog row">

                                            {dataFull && dataFull.map((el, idx) => {
                                                return (
                                                    <TourItem
                                                        id={el.id}
                                                        title={el.title}
                                                        subtitle={el.summary}
                                                        content={el.content}
                                                        image={el.imgNews.url}
                                                        date={el.publicTime}
                                                        // image={el.imgposter.url}
                                                        key={el.id}
                                                    />
                                                )
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="sidebarleft">
                                    <div className="menu-m1">
                                        <h4 className="title-menu">
                                            <Link to={`/su-kien`} >THÔNG TIN</Link>
                                        </h4>
                                        <ul className="list-unstyled">
                                            <li><Link to={`#`} >Giá vé</Link></li>
                                            <li className="active"><Link to={`/tour-moi`} >Thông tin tham quan</Link></li>
                                            <li><Link to={`/#`} >Nội quy tham quan</Link></li>
                                            <li><Link to={`/#`} >Chương trình khuyến mãi</Link></li>
                                            <li><Link to={`/tour-moi`} >Chương trình tour mới</Link></li>
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
export default TourMoiPage