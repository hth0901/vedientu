import { createSlice } from '@reduxjs/toolkit'

const thongkeSlice = createSlice({
    name: 'thongke',
    initialState: {
        isLoaded: true,
        dataDoanhThu: null,
        dataDoanhThuDiem: null,
        dataLuotThamQuan: null,
        dataVeHuy: null,
        dataDiaDiem: [],
        dataLoaiVe: [],
        dataDoiTuong: [],
        error: null,
    },
    reducers: {
        thongKeRequest(state, action) {
            state.isLoaded = false
        },
        thongKeDiaDiemData(state, action) {
            state.isLoaded = true
            state.dataDiaDiem = action.payload
        },
        thongKeLoaiVeData(state, action) {
            state.isLoaded = true
            state.dataLoaiVe = action.payload
        },
        thongKeDoiTuongData(state, action) {
            state.isLoaded = true
            state.dataDoiTuong = action.payload
        },
        thongKeDoiTuongLoaiveData(state, action) {
            state.isLoaded = true
            state.dataDoiTuong = action.payload[0]
            state.dataLoaiVe = action.payload[1]
        },
        thongKeDataDoanhThuSuccess(state, action) {
            state.isLoaded = true
            state.dataDoanhThu = action.payload
        },
        thongKeDataDoanhThuDiaDiemSuccess(state, action) {
            state.isLoaded = true
            state.dataDoanhThuDiem = action.payload
        },
        thongKeDataLuotThamQuanSuccess(state, action) {
            state.isLoaded = true
            state.dataLuotThamQuan = action.payload
        },
        thongKeDataVeHuySuccess(state, action) {
            state.isLoaded = true
            state.dataVeHuy = action.payload
        },
        thongKeDataFailed(state, action) {
            state.isLoaded = true
            state.error = action.payload
        },
    },
})

export const thongkeActions = thongkeSlice.actions

export default thongkeSlice
