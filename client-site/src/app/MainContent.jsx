import LoadingPanel from 'components/common/LoadingPanel'
import Layout from 'components/layout/Layout'
import BuyTicketMultiPlacePage from 'pages/BuyTicketMultiPlacePage'
import BuyTicketPage from 'pages/BuyTicketPage'
import BuyTicketSuccessPage from 'pages/BuyTicketSuccessPage'
import CartPage from 'pages/CartPage'
import DestinationDetailPage from 'pages/DestinationDetailPage'
import DestinationPage from 'pages/DestinationPage'
import DieuKhoanPage from 'pages/DieuKhoanPage'
import DieuKhoanPageNew from 'pages/DieuKhoanPageNew'
import EventDetailPage from 'pages/EventDetailPage'
import EventPage from 'pages/EventPage'
import HomePage from 'pages/HomePage'
import KdcTestPage from 'pages/KdcTestPage'
import KhamPha from 'pages/KhamPha'
import LienHePage from 'pages/LienHePage'
import LoginPage from 'pages/LoginPage'
import MyPage from 'pages/MyPage'
import PaymentPage from 'pages/PaymentPage'
import PaymentQuickOrderPage from 'pages/PaymentQuickOrderPage'
import ReturnPayPage from 'pages/ReturnPayPage'
import SelectTicketPage from 'pages/SelectTicketPage'
import ServiceDetailPage from 'pages/ServiceDetailPage'
import ServicesPage from 'pages/ServicesPage'
import TestQR from 'pages/TestQR'
import TestTablePage from 'pages/TestTablePage'
import ThongKeDoanhThuNgay from 'pages/ThongKeDoanhThuNgay'
import ThongKeThamQuanNgay from 'pages/ThongKeLuotThamQuanNgay'
import ThongKeDoanhThuDiaDiem from 'pages/ThongKeDoanhThuDiaDiem'
import ThongKeVeHuy from 'pages/ThongKeVeHuy'
import ThongKe from 'pages/ThongKePage'
import TicketDetailPage from 'pages/TicketDetailPage'
import TicketEdit from 'pages/TicketEdit'
import TicketErrorPage from 'pages/TicketErrorPage'
import TicketListPage from 'pages/TicketListPage'
import TicketManagement from 'pages/TicketManagement'
import TicketScanPage from 'pages/TicketScanPage'
import TicketSearchPage from 'pages/TicketSearchPage'
import TrangThongTinVe from 'pages/TrangThongTinVe'
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { getArrCustomerType, getArrReceipt } from 'store/common-actions'
import AuthGuard from './auth/AuthGuard'
import ClientAuthGuard from './auth/ClientAuthGuard'
import { MatxLayout, MatxLoading } from './components'
import { AuthContextProvider } from './contexts/auth-context'

import { AuthProvider } from './contexts/JWTAuthContext'
import useAuth from './hooks/useAuth'
import sessionRoutes from './views/sessions/SessionRoutes'

import { GlobalCss, MatxTheme } from 'app/components'
import DatVeStep2 from 'pages/DatVeStep2'
import DatVeStep3 from 'pages/DatVeStep3'
import DatVeStep4 from 'pages/DatVeStep4'
import DatVeStep1 from 'pages/DatVeStep1'
import MuaVePage from 'pages/MuaVePage'
import ThanhToanPage from 'pages/ThanhToanPage'
import ThongTinChiTietVePage from 'pages/ThongTinChiTietVePage'
import LoginPanel from 'components/common/LoginPanel'
import RegisterPanel from 'components/common/RegisterPanel'
import PendingPage from 'pages/PendingPage'
import TicketScanTest from 'pages/TicketScanTest'
import TestPage from 'pages/TestPage'

const MainContent = (props) => {
    const isLoading = useSelector((state) => state.ui.showLoading)
    const { showLoginPanel, showRegisterPanel } = useSelector(
        (state) => state.ui
    )
    // const isLoggedIn = useSelector((state) => state.authen.isLoggedIn)
    // const { isAuthenticated } = useAuth()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArrCustomerType())
        dispatch(getArrReceipt())
    }, [])
    return (
        <AuthProvider>
            <Layout>
                {isLoading && <LoadingPanel />}
                {showLoginPanel && <LoginPanel />}
                {showRegisterPanel && <RegisterPanel />}
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to={'/home-page'} />}
                    />
                    {/* <Route path="/home-page" element={<HomePage />} /> */}

                    <Route path="/home-page" element={<HomePage />} />

                    <Route path="/kham-pha" element={<KhamPha />} />
                    <Route path="/diem-den/*" element={<DestinationPage />} />
                    <Route
                        path="/diem-den/:placeId"
                        element={<DestinationDetailPage />}
                    />
                    <Route path="/su-kien" element={<EventPage />} />
                    <Route
                        path="/su-kien/:eventId"
                        element={<EventDetailPage />}
                    />
                    <Route path="/dich-vu" element={<ServicesPage />} />
                    <Route
                        path="/dich-vu/:id"
                        element={<ServiceDetailPage />}
                    />
                    {/* <Route path="/chon-ve" element={<SelectTicketPage />} /> */}
                    <Route path="/chon-ve" element={<DatVeStep1 />} />
                    {/* <Route path="/mua-ve" element={<BuyTicketPage />} /> */}
                    <Route
                        path="/mua-nhieu-ve"
                        element={<BuyTicketMultiPlacePage />}
                    />
                    <Route path="/test" element={<MyPage />} />
                    <Route path="/return-success" element={<ReturnPayPage />} />
                    <Route
                        path="/thanh-toan-gio-hang"
                        element={<PaymentPage />}
                    />
                    {/* <Route path="mua-ve" element={<BuyTicketPage />} /> */}
                    <Route path="mua-ve" element={<MuaVePage />} />
                    <Route
                        path="/thanh-toan"
                        // element={<PaymentQuickOrderPage />}
                        // element={<DatVeStep3 />}
                        element={<ThanhToanPage />}
                    />
                    <Route
                        path="/return-ticket"
                        // element={<BuyTicketSuccessPage />}
                        element={<DatVeStep4 />}
                    />
                    <Route
                        path="/danh-sach-ve/*"
                        element={<TicketManagement />}
                    />
                    <Route
                        path="/danh-sach-ve/:orderId/*"
                        element={<ThongTinChiTietVePage />}
                    />
                    <Route path="/gio-hang" element={<CartPage />} />
                    <Route path="/test-qr" element={<TestQR />} />
                    <Route
                        path="/ticket-detail/:orderId/:cusType"
                        element={<TicketDetailPage />}
                    />
                    <Route
                        path="/thong-tin-ve/:orderId/"
                        element={<TrangThongTinVe />}
                    />
                    <Route
                        path="/tra-cuu-thong-tin-ve"
                        element={<TicketSearchPage />}
                    />
                    {/* <Route path="/dieu-khoan/*" element={<DieuKhoanPage />} /> */}
                    <Route
                        path="/dieu-khoan/*"
                        element={<DieuKhoanPageNew />}
                    />
                    <Route path="/lien-he" element={<LienHePage />} />
                    <Route path="/test-page" element={<TestPage />} />
                    <Route path="/ticket-scan" element={<TicketScanPage />} />
                    <Route path="/ticket-list" element={<TicketListPage />} />
                    {/* <Route
                        path="/dangnhap"
                        element={
                            isLoggedIn ? (
                                <Navigate replace to={'home-page'} />
                            ) : (
                                <LoginPage />
                            )
                        }
                    /> */}
                    {/* {!isLoggedIn && <LoginPage />}
          {isLoggedIn && <Redirect to={"/home-page"} />} */}
                    {/* </Route> */}
                    <Route path="/thong-ke" element={<ThongKe />} />
                    <Route
                        path="/thong-ke-luot-tham-quan"
                        element={<ThongKeThamQuanNgay />}
                    />
                    <Route
                        path="/thong-ke-doanh-thu"
                        element={<ThongKeDoanhThuNgay />}
                    />
                    <Route
                        path="/thong-ke-doanh-thu-dia-diem"
                        element={<ThongKeDoanhThuDiaDiem />}
                    />
                    <Route
                        path="/thong-ke-ve-huy"
                        element={<ThongKeVeHuy />}
                    />
                    <Route
                        path="/ticket-invalid"
                        element={<TicketErrorPage />}
                    />
                    <Route path="/pending" element={<PendingPage />} />
                    {sessionRoutes.map((item, i) => {
                        return (
                            <Route
                                key={i}
                                path={item.path}
                                element={item.component}
                            />
                        )
                    })}
                    {/* <Route
                        path="/mua-ve"
                        element={
                            <AuthGuard>
                                <BuyTicketPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/thanh-toan"
                        element={
                            <AuthGuard>
                                <PaymentQuickOrderPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/return-ticket"
                        element={
                            <AuthGuard>
                                <BuyTicketSuccessPage />
                            </AuthGuard>
                        }
                    /> */}
                    <Route
                        path="/admin-tool/*"
                        element={
                            <MatxTheme>
                                <GlobalCss />
                                <AuthGuard>
                                    <MatxLayout />
                                </AuthGuard>
                            </MatxTheme>
                        }
                    />
                </Routes>
            </Layout>
        </AuthProvider>
    )
}

export default MainContent
