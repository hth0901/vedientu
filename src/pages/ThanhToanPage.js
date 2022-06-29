import React from 'react'

import { useSelector } from 'react-redux'
import DatVeStep3 from './DatVeStep3'
import DatVeStep3GioHang from './DatVeStep3GioHang'

const ThanhToanPage = (props) => {
    const isQuickOrder = useSelector((state) => state.ui.isQuickOrder)
    let contentResult = <DatVeStep3 />
    if (!isQuickOrder) {
        contentResult = <DatVeStep3GioHang />
    }

    return contentResult
}

export default ThanhToanPage
