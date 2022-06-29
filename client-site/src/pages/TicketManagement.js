import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { useParams } from 'react-router-dom'

import classes from './TicketManagement.module.css'
import MainHeader from 'components/MainHeader'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

const columns = [
    {
        name: 'Mã vé',
        selector: (row) => row.orderId,
    },
    {
        name: 'Ngày mua',
        selector: (row) => row.orderTime,
    },
    {
        name: 'Họ và tên',
        selector: (row) => row.fullName,
    },
    {
        name: 'Loại vé',
        width: '150px',
        selector: (row) => row.places,
    },
    {
        name: 'Nhân viên xuất vé',
        width: '100px',
        selector: (row) => row.createdBy,
    },
]

const TicketManagement = (props) => {
    const inputSearchRef = useRef()
    const navigate = useNavigate()
    const [tableData, setTableData] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const getDataTable = (page) => {
        const keyword = inputSearchRef.current.value
        console.log(keyword)
        fetch(`${API_URL}/api/Ticket/danhsachve/${page}?keyword=${keyword}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setTableData(data.listData)
                setTotalRows(data.totalRows)
            })
    }
    const deleteHanlder = (tkId) => {
        console.log(tkId)
        fetch(`${API_URL}/api/Ticket/xoave/${tkId}`, { method: 'DELETE' })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                console.log(data)
                if (!data) {
                    throw new Error('Proccess Error!!')
                }
                getDataTable(1)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const searchHandler = (evt) => {
        evt.preventDefault()
        setCurrentPage(1)
        getDataTable(1)
    }
    const handlePageChange = (page) => {
        getDataTable(page)
    }

    useEffect(() => {
        getDataTable(1)
    }, [])

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

    if (!isAuthen) {
        return (
            <Navigate
                to={{
                    pathname: '/home-page',
                }}
            />
        )
    }

    return (
        <Fragment>
            <MainHeader />
            <div
                className="hero-wrap hero-content"
                style={{
                    backgroundImage: `url('images/order/banner-content.png')`,
                    marginBottom: '50px',
                }}
            ></div>
            <div className="container">
                <div className="row justify-content-center">
                    <h3>Danh sách vé tham quan</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mã vé"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                ref={inputSearchRef}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    type="button"
                                    onClick={searchHandler}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <DataTable
                            columns={[
                                ...columns,
                                {
                                    cell: (row, index, column, id) => {
                                        return (
                                            <Fragment>
                                                <i
                                                    className="material-icons"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        console.log(row)
                                                        navigate(
                                                            `${row.orderId}`
                                                        )
                                                    }}
                                                >
                                                    visibility
                                                </i>
                                                &nbsp;&nbsp;
                                                <i
                                                    className="material-icons"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        deleteHanlder(
                                                            row.ticketId
                                                        )
                                                    }
                                                >
                                                    block
                                                </i>
                                            </Fragment>
                                        )
                                    },
                                },
                            ]}
                            paginationPerPage={20}
                            data={tableData}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            paginationDefaultPage={currentPage}
                            onChangePage={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default TicketManagement
