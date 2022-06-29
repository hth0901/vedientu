import { thongkeActions } from './thongke-slice'

const API_URL = process.env.REACT_APP_URL

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

const getLoaiVe = async () => {
    const response = await fetch(`${API_URL}/api/LoaiVe`, {
        method: 'GET',
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    const data = await response.json()

    return data
}

const getDiaDiem = async () => {
    const response = await fetch(`${API_URL}/api/DiaDiem`, {
        method: 'GET',
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    const data = await response.json()

    return data
}

const getDoiTuong = async () => {
    const response = await fetch(`${API_URL}/api/DoiTuong`, {
        method: 'GET',
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    const data = await response.json()

    return data
}

const getThongKe = async (df, dt, t, c) => {
    const response = await fetch(
        `${API_URL}/api/ThongKe/doanhthu/${df}/${dt}/${encodeURIComponent(
            t
        )}/${encodeURIComponent(c)}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const data = await response.json()

    return data
}

const getThongKeMotDiem = async (df, dt, t) => {
    const response = await fetch(
        `${API_URL}/api/ThongKe/doanhthudiem/${df}/${dt}/${t}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const data = await response.json()

    return data
}

const getThongKeLuotKhach = async (df, dt, t, p) => {
    const response = await fetch(
        `${API_URL}/api/ThongKe/luotkhach/${df}/${dt}/${t}/${encodeURIComponent(
            p
        )}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const data = await response.json()

    return data
}

const getThongKeLuotKhachTheoNam = async (f, t) => {
    const response = await fetch(
        `${API_URL}/api/ThongKe/luotkhachnam/${f}/${t}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const data = await response.json()

    return data
}

const getThongKeDoanhThuDiaDiem = async (df, dt, p) => {
    const response = await fetch(
        `${API_URL}/api/ThongKe/doanhthudiadiem/${df}/${dt}/${p}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const data = await response.json()

    return data
}

const getThongKeVeHuy = async (df, dt, t, c) => {
    const response = await fetch(
        `${API_URL}/api/ThongKe/vehuy/${df}/${dt}/${encodeURIComponent(
            t
        )}/${encodeURIComponent(c)}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const data = await response.json()

    return data
}

export const fetchLoaiVe = () => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        try {
            const obj = await getLoaiVe()
            dispatch(thongkeActions.thongKeLoaiVeData(obj))
        } catch (error) {
            dispatch(thongkeActions.thongKeDataFailed(error.message))
            console.log(error.message)
        }
    }
}

export const fetchDiaDiem = () => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        try {
            const obj = await getDiaDiem()
            dispatch(thongkeActions.thongKeDiaDiemData(obj))
        } catch (error) {
            dispatch(thongkeActions.thongKeDataFailed(error.message))
            console.log(error.message)
        }
    }
}

export const fetchDoiTuong = () => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        try {
            const obj = await getDoiTuong()
            dispatch(thongkeActions.thongKeDoiTuongData(obj))
        } catch (error) {
            dispatch(thongkeActions.thongKeDataFailed(error.message))
            console.log(error.message)
        }
    }
}

export const fetchDoiTuongLoaiVe = () => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        try {
            const obj = await getDoiTuong()
            const res = await getLoaiVe()
            dispatch(thongkeActions.thongKeDoiTuongLoaiveData([obj, res]))
        } catch (error) {
            dispatch(thongkeActions.thongKeDataFailed(error.message))
            console.log(error.message)
        }
    }
}

export const thongKeDoanhThu = (dateFrom, dateTo, ticket, customer) => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        if (
            dateFrom == null &&
            dateTo == null &&
            ticket == null &&
            customer == null
        ) {
            dateFrom = formatDate(new Date())
            try {
                const loaiVe = await getLoaiVe()
                let dv = loaiVe.map((e) => e.id)
                ticket = dv.join(',')
                const obj = await getThongKe(dateFrom, dateFrom, ticket, '0')
                dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
            } catch (error) {
                dispatch(thongkeActions.thongKeDataFailed(error.message))
                console.log(error.message)
            }
        } else {
            if (customer && customer.length > 0) {
                try {
                    const obj = await getThongKe(
                        dateFrom,
                        dateTo,
                        ticket.join(','),
                        customer.join(',')
                    )
                    dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
                } catch (error) {
                    dispatch(thongkeActions.thongKeDataFailed(error.message))
                    console.log(error.message)
                }
            } else {
                try {
                    const obj = await getThongKe(
                        dateFrom,
                        dateTo,
                        ticket.join(','),
                        0
                    )
                    dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
                } catch (error) {
                    dispatch(thongkeActions.thongKeDataFailed(error.message))
                    console.log(error.message)
                }
            }
        }
    }
}

export const thongKeDoanhThuMotDiem = (dateFrom, dateTo, type) => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        try {
            const obj = await getThongKeMotDiem(dateFrom, dateTo, type)
            dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
        } catch (error) {
            dispatch(thongkeActions.thongKeDataFailed(error.message))
            console.log(error.message)
        }
    }
}

export const thongKeLuotKhach = (dateFrom, dateTo, type, place) => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        if (
            dateFrom == null &&
            dateTo == null &&
            type == null &&
            place == null
        ) {
            dateFrom = formatDate(new Date())
            dateTo = formatDate(new Date())
            type = 2
            try {
                const diaDiem = await getDiaDiem()
                let dv = diaDiem.map((e) => e.id)
                place = dv.join(',')
                const obj = await getThongKeLuotKhach(
                    dateFrom,
                    dateTo,
                    type,
                    place
                )
                dispatch(thongkeActions.thongKeDataLuotThamQuanSuccess(obj))
            } catch (error) {
                dispatch(thongkeActions.thongKeDataFailed(error.message))
                console.log(error.message)
            }
        } else {
            try {
                const obj = await getThongKeLuotKhach(
                    dateFrom,
                    dateTo,
                    type,
                    place.join(',')
                )
                dispatch(thongkeActions.thongKeDataLuotThamQuanSuccess(obj))
            } catch (error) {
                dispatch(thongkeActions.thongKeDataFailed(error.message))
                console.log(error.message)
            }
        }
    }
}

export const thongKeLuotKhachTheoNam = (from, to) => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        try {
            const obj = await getThongKeLuotKhachTheoNam(from, to)
            dispatch(thongkeActions.thongKeDataLuotThamQuanSuccess(obj))
        } catch (error) {
            dispatch(thongkeActions.thongKeDataFailed(error.message))
            console.log(error.message)
        }
    }
}

export const thongKeDoanhThuTheoDiaDiem = (dateFrom, dateTo, place) => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        if (dateFrom == null && dateTo == null && place == null) {
            dateFrom = formatDate(new Date())
            dateTo = formatDate(new Date())
            try {
                const diaDiem = await getDiaDiem()
                let dv = diaDiem.map((e) => e.id)
                place = dv.join(',')
                const obj = await getThongKeDoanhThuDiaDiem(
                    dateFrom,
                    dateTo,
                    place
                )
                dispatch(thongkeActions.thongKeDataDoanhThuDiaDiemSuccess(obj))
            } catch (error) {
                dispatch(thongkeActions.thongKeDataFailed(error.message))
                console.log(error.message)
            }
        } else {
            try {
                const obj = await getThongKeDoanhThuDiaDiem(
                    dateFrom,
                    dateTo,
                    place.join(',')
                )
                dispatch(thongkeActions.thongKeDataDoanhThuDiaDiemSuccess(obj))
            } catch (error) {
                dispatch(thongkeActions.thongKeDataFailed(error.message))
                console.log(error.message)
            }
        }
    }
}

export const thongKeVeHuy = (dateFrom, dateTo, ticket, customer) => {
    return async (dispatch) => {
        dispatch(thongkeActions.thongKeRequest())
        if (
            dateFrom == null &&
            dateTo == null &&
            ticket == null &&
            customer == null
        ) {
            dateFrom = formatDate(new Date())
            try {
                const loaiVe = await getLoaiVe()
                let dv = loaiVe.map((e) => e.id)
                ticket = dv.join(',')
                const obj = await getThongKeVeHuy(
                    dateFrom,
                    dateFrom,
                    ticket,
                    '0'
                )
                dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
            } catch (error) {
                dispatch(thongkeActions.thongKeDataFailed(error.message))
                console.log(error.message)
            }
        } else {
            if (customer && customer.length > 0) {
                try {
                    const obj = await getThongKeVeHuy(
                        dateFrom,
                        dateTo,
                        ticket.join(','),
                        customer.join(',')
                    )
                    dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
                } catch (error) {
                    dispatch(thongkeActions.thongKeDataFailed(error.message))
                    console.log(error.message)
                }
            } else {
                try {
                    const obj = await getThongKeVeHuy(
                        dateFrom,
                        dateTo,
                        ticket.join(','),
                        0
                    )
                    dispatch(thongkeActions.thongKeDataDoanhThuSuccess(obj))
                } catch (error) {
                    dispatch(thongkeActions.thongKeDataFailed(error.message))
                    console.log(error.message)
                }
            }
        }
    }
}
