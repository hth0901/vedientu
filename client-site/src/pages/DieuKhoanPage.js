import React, { Fragment, useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import BannerSlider from '../components/common/BannerSlider'
// import DieuKhoanChung from '../components/dieukhoan/DieuKhoanChung'
// import DieuKhoanGiaoDich from '../components/dieukhoan/DieuKhoanGiaoDich'
// import HinhThucGiaoDich from '../components/dieukhoan/HinhThucThanhToan'

import classes from './DieuKhoanPage.module.css'

import DieuKhoanChung from './DieuKhoanChung'
import HinhThucGiaoDich from './HinhThucThanhToan'
import DieuKhoanGiaoDich from './DieuKhoanGiaoDich'
import { Bullet } from 'devextreme-react'

const DieuKhoanPage = (props) => {
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

                                    <div className="content-container">
                                    
                                        <Routes>
                                            <Route
                                                path="/dieu-khoan-chung"
                                                element={<DieuKhoanChung />}
                                            />
                                            <Route path="/giao-dich" element={<DieuKhoanGiaoDich />} />
                                            <Route
                                                path="/hinh-thuc-thanh-toan"
                                                element={<HinhThucGiaoDich />}
                                            />
                                        </Routes>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="sidebarleft">
                                    <div className="menu-m1 menu-style-1">
                                        <ul className="list-unstyled">
                                            <li ><NavLink
                                                className={(navData) => {
                                                    return navData.isActive
                                                        ? `nav-link ${classes.active}`
                                                        : `nav-link`
                                                }}
                                                to="/dieu-khoan/dieu-khoan-chung"
                                            >
                                                Điều khoản chung
                                            </NavLink></li>
                                            <li><NavLink
                                                className={(navData) => {
                                                    return navData.isActive
                                                        ? `nav-link ${classes.active}`
                                                        : `nav-link`
                                                }}
                                                to="/dieu-khoan/giao-dich"
                                            >
                                                Giao Dịch
                                            </NavLink></li>
                                            <li><NavLink
                                                className={(navData) => {
                                                    return navData.isActive
                                                        ? `nav-link ${classes.active}`
                                                        : `nav-link`
                                                }}
                                                to="/dieu-khoan/hinh-thuc-thanh-toan"
                                            >
                                                Thanh toán
                                            </NavLink></li>
                                        </ul>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </div >

            
            < MainFooter />
        </Fragment >
    )
}

export default DieuKhoanPage
