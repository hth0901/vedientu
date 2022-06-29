import React, { useEffect } from 'react'
import DatVeStep2 from './DatVeStep2'
import DatVeStep2GioHang from './DatVeStep2GioHang'
import { useSelector, useDispatch } from 'react-redux'
import { commonActions } from 'store/common-slice'

const MuaVePage = (props) => {
    const dispatch = useDispatch()
    const isQuickOrder = useSelector((state) => state.ui.isQuickOrder)

    useEffect(() => {
        dispatch(commonActions.setExportReceipt(false))
    }, [])
    let contentResult = <DatVeStep2 />
    if (!isQuickOrder) {
        contentResult = <DatVeStep2GioHang />
    }

    return contentResult
}

export default MuaVePage
