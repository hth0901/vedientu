import React, { Fragment, useRef, useEffect, useState } from 'react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Link, useNavigate } from 'react-router-dom'
import classes from '../diemden/DestinationDetailItem.module.css'

import parse from 'html-react-parser'
import { margin } from '@mui/system'
import { Width } from 'devextreme-react/chart'

const BASE_URL = process.env.REACT_APP_URL

const TourDetail = (props) => {
    const { detailData, datafull } = props
    return (
        <Fragment>
            <div className="content-wrap">
                <section className="ftco-section ftco-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="box-container">
                                    <div className="content-container">
                                        <div className="blog-container">
                                            <div className="blog-detail">
                                                <div className="blog-meta">
                                                    <div className="blog-date text-primary">
                                                        <span>Cập nhật ngày: </span><span className="getdate">{detailData.publishTime}</span>
                                                    </div>
                                                    <div className="blog-meta_action">
                                                        <div className="zoom-text">
                                                            <span>Xem cỡ chữ: </span>
                                                            <span className="btn-action">
                                                                <a className="btn-link zoom"><img height="17" src="images/icon/zoom.png" alt=""></img></a>
                                                                <a className="btn-link zoom-out"><img height="17" src="images/icon/zoomOut.png" alt=""></img></a>
                                                                <a className="btn-link zoom-init"><img height="17" src="images/icon/zoomRefresh.png" alt=""></img></a>
                                                            </span>
                                                        </div>
                                                        <div className="print-blog">
                                                            <span>In trang: </span><a href="#" className="btn-link print"><img height="17" src="images/icon/print1.png" alt=""></img></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4 className="heading2 blog-title">{detailData.title}</h4>
                                                <div className="blog-description">
                                                    {detailData.summary}
                                                </div>

                                                
                                                <img src={detailData.imgNews.url} alt=""></img>
                                                
                                                <div className="blog-gallery">
                                                    <div id="gallery"></div>
                                                </div>
                                                <div className="blog-content">
                                                    <p>Đến với chương trình {detailData.title} du khách có nhiều cơ hội trải nghiệm thú vị cùng Di sản Huế:</p>
                                                    <ul>
                                                        
                                                        <div dangerouslySetInnerHTML={{__html: `${detailData.content}`}} />
                                                            
                                                        
                                                        
                                                    </ul>
                                                    <h6><strong>{detailData.title} hân hạnh đón chào Du khách!</strong></h6>
                                                </div>
                                            </div>
                                            <div className="blog-other">
                                                <h5 className="heading5 text-primary">Các bài khác</h5>
                                                <ul>
                                                    {datafull.map((el,idx)=> {
                                                        return(
                                                            <li key={el.id}><Link to={`/tour-moi/${el.id}`}>{el.title}<span>({el.publishTime})</span></Link></li>
                                                        )
                                                    
                                                    })}
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="sidebarleft">
                                    <div className="menu-m1">
                                        <h4 className="title-menu">
                                            <a href="#">Thông tin</a>
                                        </h4>
                                        <ul className="list-unstyled">
                                            <li><Link to={`#`}>Giá vé</Link></li>
                                            <li className="active"><Link to={`#`}>Thông tin tham quan</Link></li>
                                            <li><Link to={`#`}>Nội quy tham quan</Link></li>
                                            <li><Link to={`#`}>Chương trình khuyến mãi</Link></li>
                                            <li><Link to={`/tour-moi`}>Chương trình tour mới</Link></li>
                                        </ul>
                                    </div>
                                    <div className="adv-container">
                                        <a className="adv-item">
                                            <img src="images/adv/adv1.png" alt=""></img>
                                        </a>
                                        <a className="adv-item">
                                            <img src="images/adv/adv2.png" alt=""></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </div>
        </Fragment>
    )
}
export default TourDetail
