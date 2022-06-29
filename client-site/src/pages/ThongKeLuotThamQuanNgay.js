import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import AOS from 'aos'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import LuotThamQuanChart from '../components/thongke/LuotThamQuanChart'
import { Navigate, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    fetchDiaDiem,
    thongKeLuotKhach,
    thongKeLuotKhachTheoNam,
} from '../store/thongke-action'

import DateBox from 'devextreme-react/date-box'
import SelectBox from 'devextreme-react/select-box'
import TagBox from 'devextreme-react/tag-box'
import { Button } from 'devextreme-react/button'
import FooterSection from 'components/trangchu/FooterSection'

const BASE_URL = process.env.REACT_APP_URL

const MINUTE_MS = 300000

const loaiHinhThongKe = [
    {
        id: 1,
        name: 'Theo ngày',
    },
    {
        id: 2,
        name: 'Theo năm',
    },
]

const loaiKhach = [
    {
        id: 0,
        name: 'Khách nội địa',
    },
    {
        id: 1,
        name: 'Khách quốc tế',
    },
]

const loaiChart = [
    {
        id: 'column',
        name: 'Biểu đồ cột',
    },
    {
        id: 'line',
        name: 'Biểu đồ đường',
    },
]

const ThongKeLuotThamQuanNgay = (props) => {
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
    const [loaiThongKe, setLoaiThongKe] = useState(1)
    const [isLoaiKhachFirstLoad, setIsLoaiKhachFirstLoad] = useState(true)
    const [isDiaDiemFirstLoad, setIsDiaDiemFirstLoad] = useState(true)
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    const [loaiBieuDo, setLoaiBieuDo] = useState('column')
    const [yearFrom, setYearFrom] = useState(null)
    const [yearTo, setYearTo] = useState(null)

    const [currentFrom, setCurrentFrom] = useState(null)
    const [currentTo, setCurrentTo] = useState(null)
    const [currentDiaDiem, setCurrentDiaDiem] = useState(null)

    const [chartOpt, setChartOpt] = useState(null)

    const diaDiemRef = useRef(null)
    const loaiKhachRef = useRef(null)

    const loaiThongKeSelectChangeHandler = (e) => {
        setLoaiThongKe(e.value)
    }

    const dateFromChangeHandler = (e) => {
        setDateFrom(e.value)
    }

    const dateToChangeHandler = (e) => {
        setDateTo(e.value)
    }

    const loaiBieuDoSelectChangeHandler = (e) => {
        setLoaiBieuDo(e.value)
    }

    const yearFromChangeHandler = (e) => {
        setYearFrom(e.value)
    }

    const yearToChangeHandler = (e) => {
        setYearTo(e.value)
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

    function callback(cD, cF, cT) {
        setCurrentDiaDiem(cD)
        setCurrentFrom(cF)
        setCurrentTo(cT)
    }

    const onClick = () => {
        const diaDiemTag = diaDiemRef.current.instance.option('value')
        if (diaDiemTag.length == 0) {
            alert('Chọn ít nhất 1 địa điểm!')
        } else if (dateFrom > dateTo) {
            alert('Chọn lại ngày')
        } else if (yearFrom > yearTo) {
            alert('Chọn lại năm')
        } else if (
            (loaiThongKe == 2 && yearFrom == null) ||
            (loaiThongKe == 2 && yearTo == null)
        ) {
            alert('Chọn lại năm')
        } else if (diaDiemTag.length > 0) {
            let opt = new Object()
            opt.loai = loaiThongKe
            setChartOpt(opt)
            if (loaiThongKe == 1) {
                let df = formatDate(dateFrom)
                let dt = formatDate(dateTo)
                let t = 2

                callback(diaDiemTag, df, dt)

                dispatch(thongKeLuotKhach(df, dt, t, diaDiemTag))
            } else if (loaiThongKe == 2) {
                let from = yearFrom.getFullYear()
                let to = yearTo.getFullYear()

                callback(null, from, to)

                dispatch(thongKeLuotKhachTheoNam(from, to))
            }
        }
    }

    //Init FetchData
    useEffect(() => {
        dispatch(fetchDiaDiem())
        dispatch(thongKeLuotKhach(null, null, null, null))
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (loaiThongKe == 1) {
                if (currentDiaDiem == null) {
                    dispatch(thongKeLuotKhach(null, null, null))
                } else if (currentDiaDiem != null) {
                    dispatch(
                        thongKeLuotKhach(
                            currentFrom,
                            currentTo,
                            2,
                            currentDiaDiem
                        )
                    )
                }
            } else if (loaiThongKe == 2) {
                dispatch(thongKeLuotKhachTheoNam(currentFrom, currentTo))
            }
        }, MINUTE_MS)

        return () => clearInterval(interval)
    }, [currentFrom, currentTo, currentDiaDiem])

    //SelectAllAtInitFetch
    useEffect(() => {
        if (isDiaDiemFirstLoad && res.dataDiaDiem.length > 0) {
            let dv = res.dataDiaDiem.map((e) => e.id)
            diaDiemRef.current.instance.option('value', dv)
            setIsDiaDiemFirstLoad(false)
        }
    }, [res])

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
                            items={loaiHinhThongKe}
                            displayExpr="name"
                            valueExpr="id"
                            label="Kiểu thống kê"
                            labelMode="floating"
                            value={loaiThongKe}
                            onValueChanged={loaiThongKeSelectChangeHandler}
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiThongKe == 1 ? 'block' : 'none',
                        }}
                    >
                        <TagBox
                            ref={diaDiemRef}
                            items={res.dataDiaDiem}
                            displayExpr="title"
                            valueExpr="id"
                            label="Địa điểm"
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
                            display: loaiThongKe == 1 ? 'block' : 'none',
                        }}
                    >
                        <DateBox
                            type="date"
                            label="Từ ngày"
                            labelMode="floating"
                            value={dateFrom}
                            onValueChanged={dateFromChangeHandler}
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiThongKe == 1 ? 'block' : 'none',
                        }}
                    >
                        <DateBox
                            type="date"
                            label="Đến ngày"
                            labelMode="floating"
                            value={dateTo}
                            onValueChanged={dateToChangeHandler}
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiThongKe == 2 ? 'block' : 'none',
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
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiThongKe == 2 ? 'block' : 'none',
                        }}
                    >
                        <DateBox
                            type="date"
                            label="Từ năm"
                            labelMode="floating"
                            value={yearFrom}
                            onValueChanged={yearFromChangeHandler}
                            calendarOptions={{
                                zoomLevel: 'decade',
                                minZoomLevel: 'century',
                                maxZoomLevel: 'decade',
                            }}
                            displayFormat={"'Năm': yyyy"}
                        />
                    </div>
                    <div
                        className="col-12 col-md-3 editor-wrapper"
                        style={{
                            display: loaiThongKe == 2 ? 'block' : 'none',
                        }}
                    >
                        <DateBox
                            type="date"
                            label="Đến năm"
                            labelMode="floating"
                            value={yearTo}
                            onValueChanged={yearToChangeHandler}
                            calendarOptions={{
                                zoomLevel: 'decade',
                                minZoomLevel: 'century',
                                maxZoomLevel: 'decade',
                            }}
                            displayFormat={"'Năm': yyyy"}
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
                        <LuotThamQuanChart opt={chartOpt} type={loaiBieuDo} />
                    </div>
                </div>
            </div>
            <FooterSection />
        </Fragment>
    )
}

export default ThongKeLuotThamQuanNgay
