import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import AOS from 'aos'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import DoanhThuChart from '../components/thongke/DoanhThuChart'
import { Navigate, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    fetchDoiTuongLoaiVe,
    thongKeDoanhThu,
    thongKeDoanhThuMotDiem,
} from '../store/thongke-action'

import SelectBox from 'devextreme-react/select-box'
import DateBox from 'devextreme-react/date-box'
import TagBox from 'devextreme-react/tag-box'
import { Button } from 'devextreme-react/button'
import FooterSection from 'components/trangchu/FooterSection'

import './ThongKe.css'

const BASE_URL = process.env.REACT_APP_URL

const MINUTE_MS = 300000

const loaiChart = [
    {
        id: 1,
        name: 'Biểu đồ cột',
    },
    {
        id: 2,
        name: 'Biểu đồ tròn',
    },
]

const loaiKhach = [
    {
        id: 0,
        name: 'Không theo loại vé',
    },
    {
        id: 1,
        name: 'Theo loại vé',
    },
]

const ThongKeDoanhThuNgay = (props) => {
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [loaiBieuDo, setLoaiBieuDo] = useState(1)
    const [loaiKhachBieuDo, setLoaiKhachBieuDo] = useState(0)
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())

    const [currentDateFrom, setCurrentDateFrom] = useState(null)
    const [currentDateTo, setCurrentDateTo] = useState(null)
    const [currentDiaDiem, setCurrentDiaDiem] = useState(null)
    const [currentLoaiKhach, setCurrentLoaiKhach] = useState(null)

    const [currentPhanLoaiKhach, setCurrentPhanLoaiKhach] = useState(0)

    const [chartOpt, setChartOpt] = useState(null)

    const diaDiemRef = useRef(null)
    const loaiKhachRef = useRef(null)

    const loaiKhachSelectChangeHandler = (e) => {
        setLoaiKhachBieuDo(e.value)
    }

    const loaiBieuDoSelectChangeHandler = (e) => {
        if (currentPhanLoaiKhach == 0) {
            setLoaiBieuDo(e.value)
        }
    }

    const dateFromChangeHandler = (e) => {
        setDateFrom(e.value)
    }

    const dateToChangeHandler = (e) => {
        setDateTo(e.value)
    }

    const dispatch = useDispatch()

    const res = useSelector((state) => state.thongke)

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    function callback(cD, cF, cT, cC) {
        setCurrentDiaDiem(cD)
        setCurrentDateFrom(cF)
        setCurrentDateTo(cT)
        setCurrentLoaiKhach(cC)
    }

    const onClick = () => {
        const diaDiemTag = diaDiemRef.current.instance.option('value')
        const loaiKhachTag = loaiKhachRef.current.instance.option('value')
        if (diaDiemTag.length == 0) {
            alert('Chọn ít nhất 1 địa điểm/tuyến địa điểm!')
        } else if (dateFrom > dateTo) {
            alert('Chọn lại ngày')
        } else if (loaiKhachBieuDo == 1 && loaiKhachTag.length == 0) {
            alert('Chọn ít nhất 1 loại vé!')
        } else if (loaiKhachBieuDo == 0 && diaDiemTag.length > 0) {
            setCurrentPhanLoaiKhach(0)
            let opt = new Object()
            opt.diaDiem = diaDiemTag
            setChartOpt(opt)
            let df = formatDate(dateFrom)
            let dt = formatDate(dateTo)

            callback(diaDiemTag, df, dt, null)
            loaiKhachRef.current.instance.option('value', [])

            if (diaDiemTag.length > 1) {
                dispatch(thongKeDoanhThu(df, dt, diaDiemTag, 0))
            } else if (diaDiemTag.length == 1) {
                dispatch(thongKeDoanhThuMotDiem(df, dt, diaDiemTag[0]))
            }
        } else if (
            loaiKhachBieuDo == 1 &&
            diaDiemTag.length > 0 &&
            loaiKhachTag.length > 0
        ) {
            setCurrentPhanLoaiKhach(1)
            let opt = new Object()
            opt.diaDiem = diaDiemTag
            opt.loaiKhach = loaiKhachTag
            setChartOpt(opt)
            let df = formatDate(dateFrom)
            let dt = formatDate(dateTo)

            callback(diaDiemTag, df, dt, loaiKhachTag)
            setLoaiBieuDo(1)

            dispatch(thongKeDoanhThu(df, dt, diaDiemTag, loaiKhachTag))
        }
    }

    //Init FetchData
    useEffect(() => {
        dispatch(fetchDoiTuongLoaiVe())
        dispatch(thongKeDoanhThu(null, null, null, null))
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentDiaDiem == null) {
                dispatch(thongKeDoanhThu(null, null, null, null))
            } else if (currentDiaDiem.length == 1) {
                dispatch(
                    thongKeDoanhThuMotDiem(
                        currentDateFrom,
                        currentDateTo,
                        currentDiaDiem[0]
                    )
                )
            } else if (currentPhanLoaiKhach == 0 && currentDiaDiem.length > 1) {
                dispatch(
                    thongKeDoanhThu(
                        currentDateFrom,
                        currentDateTo,
                        currentDiaDiem,
                        0
                    )
                )
            } else if (
                currentPhanLoaiKhach == 1 &&
                currentDiaDiem.length > 1 &&
                currentLoaiKhach.length >= 1
            ) {
                dispatch(
                    thongKeDoanhThu(
                        currentDateFrom,
                        currentDateTo,
                        currentDiaDiem,
                        currentLoaiKhach
                    )
                )
            }
        }, MINUTE_MS)

        return () => clearInterval(interval)
    }, [
        currentDateFrom,
        currentDateTo,
        currentDiaDiem,
        currentLoaiKhach,
        currentPhanLoaiKhach,
    ])

    //SelectAllAtInitFetch
    useEffect(() => {
        if (isFirstLoad && res.dataLoaiVe.length > 0) {
            let dv = res.dataLoaiVe.map((e) => e.id)
            diaDiemRef.current.instance.option('value', dv)
            setIsFirstLoad(false)
        }
    }, [res])

    //CheckAuth
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
                    <div className="col-12 col-md-3 editor-wrapper">
                        <SelectBox
                            items={loaiKhach}
                            displayExpr="name"
                            valueExpr="id"
                            label="Loại vé"
                            labelMode="floating"
                            value={loaiKhachBieuDo}
                            onValueChanged={loaiKhachSelectChangeHandler}
                            height={42}
                        />
                    </div>
                    <div className="col-12 col-md-3 editor-wrapper">
                        <TagBox
                            ref={diaDiemRef}
                            items={res.dataLoaiVe}
                            displayExpr="name"
                            valueExpr="id"
                            label="Điểm/Tuyến địa điểm"
                            labelMode="floating"
                            maxDisplayedTags={1}
                            showSelectionControls={true}
                            deferRendering={false}
                            applyValueMode="useButtons"
                        />
                    </div>
                    <div className="col-12 col-md-3 editor-wrapper">
                        <DateBox
                            type="date"
                            label="Từ ngày"
                            labelMode="floating"
                            value={dateFrom}
                            onValueChanged={dateFromChangeHandler}
                            height={42}
                        />
                    </div>
                    <div className="col-12 col-md-3 editor-wrapper">
                        <DateBox
                            type="date"
                            label="Đến ngày"
                            labelMode="floating"
                            value={dateTo}
                            onValueChanged={dateToChangeHandler}
                            height={42}
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiKhachBieuDo == 0 ? 'block' : 'none',
                            marginTop: '10px',
                        }}
                    >
                        <SelectBox
                            items={loaiChart}
                            displayExpr="name"
                            valueExpr="id"
                            label="Loại biểu đồ"
                            labelMode="floating"
                            value={loaiBieuDo}
                            onValueChanged={loaiBieuDoSelectChangeHandler}
                            height={42}
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiKhachBieuDo != 0 ? 'block' : 'none',
                            marginTop: '10px',
                        }}
                    >
                        <TagBox
                            ref={loaiKhachRef}
                            items={res.dataDoiTuong}
                            displayExpr="name"
                            valueExpr="id"
                            label="Loại đối tượng"
                            labelMode="floating"
                            maxDisplayedTags={1}
                            showSelectionControls={true}
                            deferRendering={false}
                            applyValueMode="useButtons"
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            marginTop: '10px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            width={80}
                            height={36}
                            text="LỌC"
                            type="default"
                            stylingMode="contained"
                            onClick={onClick}
                            elementAttr={{ class: 'btn-filter' }}
                        />
                    </div>
                    <div className="col-12 mt-3">
                        <DoanhThuChart
                            opt={chartOpt}
                            type={loaiBieuDo}
                            customer={
                                (currentPhanLoaiKhach != 0 &&
                                    currentLoaiKhach &&
                                    currentLoaiKhach.length > 0 &&
                                    currentLoaiKhach) ||
                                0
                            }
                        />
                    </div>
                </div>
            </div>
            <FooterSection />
        </Fragment>
    )
}

export default ThongKeDoanhThuNgay
