import { SimpleCard } from 'app/components'
import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Button, Icon, FormControlLabel, Checkbox } from '@material-ui/core'

import 'date-fns'
import FormGroup from '@material-ui/core/FormGroup'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@material-ui/core'
import axios from 'axios'
import notify from 'devextreme/ui/notify'
import { useNavigate, useParams } from 'react-router-dom'
import ChonDiaDiemSuKiens2 from './DiaDiemSuKiens'
import CurrencyInput from 'react-currency-input-field'
import Button2 from 'devextreme-react/button'

const BASE_URL = process.env.REACT_APP_URL

const SuaGiaVe = (props) => {
    const history = useNavigate()
    const { id } = useParams()

    //checkbox
    //simple
    const [state1, setState1] = React.useState({
        tour: true,
    })
    const [timeTicket,setTimeTicket]=useState()
    const [timeExpired,setTimeExpired]=useState()
    const [active, setActive] = useState(null)
    const [activeC, setActiveC] = useState(null)
    const [itemPick,setItemPick] = useState({name:""})
    const handleChange1 = (name) => (event) => {
        setState1({ ...state1, [name]: event.target.checked })
    }
    //group
    const [state2, setState2] = React.useState({})
    const handleChange2 = (name) => (event) => {
        setState2({ ...state2, [name]: event.target.checked })
    }
    //const { adult, child, old } = state2
    const { tour } = state1
    const [list, setList] = useState([])
    // get lisst place api
    const [listPlace, setListPlace] = useState([])
    const [listChoose, setListChoose] = useState([])
    const callBackFunction = (list) => {
        setListChoose(list)
    }
    const handleSubmit = () => {
        const data = {
            NumberOfDayCanUse:timeTicket,
            DateToExpired:timeExpired,
            Name: '',
            Content: 'Vé tham quan ',
            Is_VeTuyen: tour,
            ListPlaceID: '',
            Active: active,
        }
        const listPrice = []
        list.forEach((item) => {
            const check = { CustomerTypeID: null, Price: 0 }
            check.CustomerTypeID = item.id
            check.Price = price[item.id]
            if (typeof check.Price != 'undefined') {
                listPrice.push(check)
            }
        })
        listChoose.forEach((item) => {
            if (data.Name === '') data.Name = item.title
            else {
                data.Name = data.Name + '-' + item.title
                data.Content = data.Content + data.Name
            }
            if (data.ListPlaceID === '') data.ListPlaceID = item.id.toString()
            else data.ListPlaceID = `${data.ListPlaceID},${item.id}`
        })
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const lastData = {}
        if (listPrice.length === 0) {
            if (active != activeC || itemPick.numberOfDayCanUse!=timeTicket || itemPick.dateToExpired!=timeExpired) {
                lastData.Type = data
                senData(lastData)
                
            } else {
                notify('Bạn chưa thay đổi gì!', 'error', 500)
            }
        } else {
            if (data.ListPlaceID === '') {
                lastData.Price = listPrice
                senData(lastData)
            } else {
                lastData.Price = listPrice
                lastData.Type = data
                senData(lastData)
            }
        }

        function senData(e) {
            e.ID = id           
            var raw = JSON.stringify(e)
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            }

            fetch(`${BASE_URL}/api/LoaiVe`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    notify('Tạo loại vé thành công', 'success', 500)
                    history('/admin-tool/quanlygiave')
                })
                .catch((error) => console.log('error', error))
        }
    }
    const [price, setPrice] = useState({})
    const handleInput = (e, name) => {
        setPrice({ ...price, [name]: e })
    }

    const [available, setAvailable] = useState([])
    const [a2, seta2] = useState({})
    const [listPrice, setListPrice] = useState([])
    const changeTimeExpired = (e)=>{
        setTimeExpired(e.target.value)
    }
    useEffect(() => {
        async function getList() {
            try {
                const data4 = await axios.get(`${BASE_URL}/api/GiaVe`)
                //setListPrice(data4.data);

                // Lấy giá theo đối tượng
                const listCheck = data4.data.filter(
                    (item) => item.tiketTypeID.toString() === id.toString()
                )
                setListPrice(listCheck)

                const data3 = await axios.get(`${BASE_URL}/api/DoiTuong`)
                setList(data3.data)
                
                const check = {}
                data3.data.forEach((item) => {
                    check[item.name] = true
                })
                setState2(check)

                const data = await axios.get(`${BASE_URL}/api/LoaiVe/${id}`)
                setItemPick(data.data);
                setTimeTicket(data.data.numberOfDayCanUse);
                setTimeExpired(data.data.dateToExpired);
                //console.log("data time",data);
                const data2 = await axios.get(`${BASE_URL}/api/DiaDiem`)
                setListPlace(data2.data)
                setState1({ ...state1, tour: data.data.is_VeTuyen })
                setActive(data.data.active)
                setActiveC(data.data.active)

                const x = data.data.listPlaceID.trim().split(',')

                if (x.length < 2) {
                    const a = data2.data.findIndex(
                        (item) => item.id.toString() === x.toString()
                    )
                    seta2(a)
                } else {
                    data2.data.forEach((item) => {
                        x.forEach((item2) => {
                            if (item.id.toString() === item2.toString()) {
                                setAvailable(available.push(item))
                            }
                        })
                    })
                }
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const valueDefault = (id) => {
        const checkPrice = listPrice.find(
            (item) => item.customerTypeID.toString() === id.toString()
        )
        if (checkPrice != undefined) {
            return checkPrice.price
        }
    }
    const placeSingle = (e, value) => {
        const valueCheck = []
        valueCheck.push(value)
        setListChoose(valueCheck)
    }
    const ChangeActive = (event) => {
        setActive(event.target.checked)
    }
    const changeTimeTicket = (e)=>{
        setTimeTicket(e.target.value);
    }
    return (
        <div className="m-sm-30">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <div className="row">
                    <div className="col">
                        <SimpleCard title="Thông tin vé">
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={tour}
                                        onChange={handleChange1('tour')}
                                        value="tour"
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                        disabled={true}
                                    />
                                }
                                label="Vé tour"
                            /> */}
                            

                            <div className="form-group">
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor="text">Tuyến/Địa điểm tham quan</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            defaultValue={itemPick.name}
                                            value={itemPick.name}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor="text">Thời hạn vé</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="time"
                                            defaultValue={timeTicket}
                                            onChange={changeTimeTicket}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor="text">Thời hạn vé từ ngày xuất vé</label>
                                    </div>
                                    <div className='col'>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="time"
                                            defaultValue={timeExpired}
                                            onChange={changeTimeExpired}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={active || false}
                                        onChange={ChangeActive}
                                        name="CheckActive"
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                    />
                                }
                                label="Sử dụng"
                            />
                        </SimpleCard>
                    </div>
                    {/* <div className="col">
                        <SimpleCard title="Chọn địa điểm - Tour địa điểm">
                            {tour ? (
                                <ChonDiaDiemSuKiens2
                                    danhsach={listPlace}
                                    listAvailable={available}
                                    listChoose={callBackFunction}
                                />
                            ) : (
                                <Autocomplete
                                    className="mb-4 w-300"
                                    options={listPlace}
                                    disabled={true}
                                    getOptionLabel={(option) => option.title}
                                    onChange={placeSingle}
                                    value={listPlace[a2] || listPlace[0]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Địa điểm - sự kiện"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                        </SimpleCard>
                    </div> */}
                    {/* <div className="col">
                        <SimpleCard title="Đối tượng áp dụng">
                            <FormGroup row>
                                {list.map((item, index) => {
                                    const checked = state2[item.name]
                                    return (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked || false}
                                                    onChange={handleChange2(
                                                        item.name
                                                    )}
                                                    value={item.name}
                                                    disabled={true}
                                                />
                                            }
                                            label={item.name}
                                            key={index}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </SimpleCard>
                    </div> */}
                </div>
                <div className="py-3" />
                <div className="row">
                    <div className="col">
                        <SimpleCard title="Giá vé theo đối tượng">
                            <Table className="whitespace-pre">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="px-0">
                                            Đối tượng
                                        </TableCell>
                                        <TableCell className="px-0">
                                            Giá(VND)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            style={
                                                state2[item.name]
                                                    ? null
                                                    : { display: 'none' }
                                            }
                                        >
                                            <TableCell
                                                className="px-0 capitalize"
                                                align="left"
                                            >
                                                {item.name}
                                            </TableCell>
                                            <TableCell
                                                className="px-0 capitalize"
                                                align="left"
                                            >
                                                <CurrencyInput
                                                    className="form-control"
                                                    name={item.id}
                                                    defaultValue={valueDefault(
                                                        item.id
                                                    )}
                                                    onValueChange={(e, name) =>
                                                        handleInput(e, name)
                                                    }
                                                    decimalSeparator=","
                                                    groupSeparator="."
                                                    min={'0'}
                                                    step={1000}
                                                    decimalsLimit={2}
                                                ></CurrencyInput>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </SimpleCard>
                    </div>
                </div>
                <div className="py-3" />
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Lưu lại</span>
                </Button>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => history(-1)}
                >
                    Hủy
                </button>
            </ValidatorForm>
        </div>
    )
}

export default SuaGiaVe
