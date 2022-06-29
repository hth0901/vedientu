import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataGrid, {
    ButtonItem,
    Column,
    Editing,
    Popup,
    Paging,
    RequiredRule,
    EmailRule,
    Lookup,
    PatternRule,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { Button } from '@material-ui/core'
import TreeView from 'devextreme-react/tree-view'


import { useSelector, useDispatch } from 'react-redux'

import CheckBox from 'devextreme-react/check-box'
import SelectBox from 'devextreme-react/select-box'
import NumberBox from 'devextreme-react/number-box'
import Form, { Item, Label } from 'devextreme-react/form'

const BASE_URL = process.env.REACT_APP_URL

const QuanLyThongKe = (props) => {

    return (
        <div className='m-sm-30'>
            <div className="row">
                <h3>QuanLyThongKe</h3>
            </div>
        </div>
    )
}

export default QuanLyThongKe
