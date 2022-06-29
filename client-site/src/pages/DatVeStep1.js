import MainHeader from 'components/MainHeader'
import FooterSection from 'components/trangchu/FooterSection'
import HotLineSection from 'components/trangchu/HotLineSection'
import React, { Fragment, useEffect, useState } from 'react'
import { truyVanDanhSachDiaDiemGiaVe } from 'store/diadiem-actions'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { uiActions } from 'store/ui-slice'
import DatVeStep1Item from 'components/chonve/DatVeStep1Item'
import { placeCartActions } from 'store/placeCart-slice'

const BASE_URL = process.env.REACT_APP_URL

const DatVeStep1 = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useNavigate()

    const [isAuthen, setIsAuthen] = useState(true)
    const { danhsachDiaDiemGiaVe: danhsachDiaDiem } = useSelector(
        (state) => state.diadiem
    )

    const { totalPrice } = useSelector((state) => state.placeCart)

    const clickOrderHandler = (evt) => {
        evt.preventDefault()
        if (!totalPrice) {
            alert('Vui lòng chọn vé tham quan')
            return
        }
        dispatch(uiActions.setOrderType(false))
        history('/mua-ve')
    }

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiemGiaVe())
        dispatch(placeCartActions.reset())
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
    if (!isAuthen) {
        return (
            <Navigate
                to={{
                    pathname: '/home-page',
                }}
            />
        )
    }
    return (
        <Fragment>
            <MainHeader />
            <div
                className="hero-wrap hero-content"
                style={{
                    backgroundImage: `url('images/order/banner-content.png')`,
                }}
            ></div>
            <div className="content-wrap content-order">
                <div className="ftco-section ftco-step form-top">
                    <div className="container">
                        <div className="row no-gutters slider-text">
                            <div className="col-12 ftco-animate fadeInUp ftco-animated">
                                <div className="block-7 step-order">
                                    <div className="step-content">
                                        <ul className="slider-step">
                                            <li className="active current body-1">
                                                <span>01</span>
                                                <p>Chọn điểm di tích</p>
                                            </li>
                                            <li className="body-1">
                                                <span>02</span>
                                                <p>Đặt vé</p>
                                            </li>
                                            <li className="body-1">
                                                <span>03</span>
                                                <p>Thanh toán</p>
                                            </li>
                                            <li className="body-1">
                                                <span>04</span>
                                                <p>Hoàn tất</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="ftco-section ftco-destination-order">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-12 search-section ftco-animate fadeInUp ftco-animated">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm điểm đến..."
                                        aria-label="Tìm điểm đến..."
                                        aria-describedby="searchdestination"
                                    />
                                    <div className="input-group-append">
                                        <a
                                            href="#"
                                            className="input-group-text"
                                            id="searchdestination"
                                        >
                                            <img
                                                src="images/icon/search.png"
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="destination-order row">
                                    {danhsachDiaDiem.map((el, idx) => {
                                        return (
                                            <DatVeStep1Item
                                                key={el.id}
                                                title={el.title}
                                                price={el.adultPrice}
                                                image={`${BASE_URL}/upload/${el.imageUrl}`}
                                                placeDetail={el}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="action-order">
                        <div className="container">
                            <div className="action-container">
                                <div className="action-left">
                                    <label>Giá vé:</label>
                                    <span>
                                        Từ <span>350.000</span> VNĐ/Người
                                    </span>
                                </div>
                                <div className="action-right">
                                    <button
                                        className="btn btn-primary"
                                        onClick={clickOrderHandler}
                                    >
                                        Đặt ngay
                                    </button>
                                    {/* <a
                                        href=""
                                        className="btn btn-outline-primary"
                                    >
                                        Thêm vào giỏ hàng
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <HotLineSection />
            <FooterSection />
        </Fragment>
    )
}

export default DatVeStep1
