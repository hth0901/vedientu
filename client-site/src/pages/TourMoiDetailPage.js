import MainFooter from 'components/common/MainFooter'
import MainHeader from 'components/MainHeader'
import React, { useEffect, Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TourDetail from 'components/tour/TourDetail'

import { Navigate, useLocation } from 'react-router-dom'
import { el } from 'date-fns/locale'

const BASE_URL = process.env.REACT_APP_URL

const TourMoiDetailPage = (props) => {
    const params = useParams()
    const { tourId } = params

    const [detailData, setDetailData] = useState(null)
    const [dataFull, setDataFull] = useState(null)
    const [errMessage, setErrMessage] = useState('')
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

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

    useEffect(() => {
        if (tourId) {
            fetch(`https://www.hueworldheritage.org.vn/desktopModules/APITinBai/API/v1/News/getListNewsbyCateID?categoryId=F19D0328-979A-46FB-B080-AE6800B5B500`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Không tìm thấy dữ liệu của sự kiện')
                    }
                    return res.json()
                })
                .then((data) => {
                    // console.log(data)
                    const data1 = data['newsList']
                    setDataFull(data1)
                    data1.map((el, idx) => {
                        if(el.id==tourId){
                            const data2 = data1[idx]
                            setDetailData(data2)
                        }
                    })
                    
                })
                .catch((err) => {
                    // console.log(err)
                    setErrMessage(err.message)
                })
        }
    }, [tourId])

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
            {detailData && <TourDetail detailData={detailData} datafull={dataFull} />}
            <MainFooter />
        </Fragment>
    )
}

export default TourMoiDetailPage