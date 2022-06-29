import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import AOS from 'aos'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import { Navigate, NavLink, useLocation } from 'react-router-dom'

import DoanhThuChart from '../components/thongke/DoanhThuChart'
import DoanhThuDiaDiemChart from '../components/thongke/DoanhThuDiaDiemChart'
import LuotThamQuanChart from '../components/thongke/LuotThamQuanChart'
import VeHuyChart from '../components/thongke/VeHuyChart'

import { useSelector, useDispatch } from 'react-redux'
import {
    thongKeDoanhThu,
    thongKeDoanhThuTheoDiaDiem,
    thongKeLuotKhach,
    thongKeVeHuy,
} from '../store/thongke-action'

import { Button } from 'devextreme-react/button'
import classes from './ThongKe.module.css'
import FooterSection from 'components/trangchu/FooterSection'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

const ThongKe = (props) => {
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
    const [currentDate, setCurrentDate] = useState(new Date())

    const dispatch = useDispatch()
    //Init FetchData
    useEffect(() => {
        dispatch(thongKeDoanhThu(null, null, null, null))
        dispatch(thongKeDoanhThuTheoDiaDiem(null, null, null))
        dispatch(thongKeLuotKhach(null, null, null, null))
        dispatch(thongKeVeHuy(null, null, null, null))
    }, [])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [day, month, year].join('/')
    }

    // useEffect(() => {
    //     const curStrUser = localStorage.getItem('user')
    //     const curUser = JSON.parse(curStrUser)
    //     const curRoleId = (curUser && curUser.roleid) || -1
    //     fetch(
    //         `${BASE_URL}/api/menu/getclientautho/${encodeURIComponent(
    //             location.pathname
    //         )}`
    //     )
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error('Proccess Error')
    //             }
    //             return res.json()
    //         })
    //         .then((data) => {
    //             if (data.length > 0 && !data.includes(curRoleId)) {
    //                 setIsAuthen(false)
    //             }
    //         })
    //         .catch((err) => {
    //             setIsAuthen(false)
    //         })
    // }, [isAuthen])

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
            <div className="container">
                <div className="row" style={{ marginTop: '100px' }}>
                    <div className="col-12">
                        <NavLink
                            to="/thong-ke-doanh-thu"
                            className={classes['chart-title-nav']}
                        >
                            Thống kê doanh thu trong ngày{' '}
                            {formatDate(currentDate)}
                        </NavLink>
                        <DoanhThuChart
                            opt={null}
                            type={1}
                            customer={0}
                            hideTitle={true}
                        />
                    </div>
                    <div className="col-12">
                        <NavLink
                            to="/thong-ke-doanh-thu-dia-diem"
                            className={classes['chart-title-nav']}
                        >
                            Thống kê doanh thu các địa điểm trong ngày{' '}
                            {formatDate(currentDate)}
                        </NavLink>
                        <DoanhThuDiaDiemChart
                            opt={null}
                            type={1}
                            hideTitle={true}
                        />
                    </div>
                    <div className="col-12">
                        <NavLink
                            to="/thong-ke-luot-tham-quan"
                            className={classes['chart-title-nav']}
                        >
                            Thống kê lượt khách tham quan trong ngày{' '}
                            {formatDate(currentDate)}
                        </NavLink>
                        <LuotThamQuanChart
                            opt={null}
                            type={1}
                            hideTitle={true}
                        />
                    </div>
                    <div className="col-12">
                        <NavLink
                            to="/thong-ke-ve-huy"
                            className={classes['chart-title-nav']}
                        >
                            Thống kê số vé hủy trong ngày{' '}
                            {formatDate(currentDate)}
                        </NavLink>
                        <VeHuyChart
                            opt={null}
                            type={1}
                            customer={0}
                            hideTitle={true}
                        />
                    </div>
                </div>
            </div>
            <FooterSection />
        </Fragment>
    )
}

export default ThongKe
