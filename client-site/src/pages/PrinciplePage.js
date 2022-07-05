import MainFooter from "components/common/MainFooter"
import MainHeader from "components/MainHeader"
import DestinationIntro from "components/khampha/DestinationIntro"
import { Fragment, useEffect, useState } from "react"
import React from "react"
import { getListNoiQuy } from "components/khampha/getlist"
import { Link, useParams } from "react-router-dom"
const PrinciplePage=()=>{
    var [list,setlist]=useState([])
    useEffect(()=>{
        getListNoiQuy().then(
            items=>{setlist(items.newsList)}
        )


    
    },[] )

    return (



        <Fragment>
                <MainHeader>

                </MainHeader>
                <div className="content-wrap">
		<section className="ftco-section ftco-content">
			<div className="container">				
				<div className="row">
					<div className="col-md-9">						
						<div className="box-container">
							<div className="heading-section heading-content ">
								<h2 className="heading2">Nội Quy Tham Quan</h2>
                                <div style={{marginTop:"50px"}}>



                                </div>
                                {
                                        list.map((item)=>
                                      
                                     {     
                                        return  (
                                            <Link to={`/noi-quy/${item.id}`} key={item.id} >
                                                <div className="listcategory__content" style={{marginBottom:"20px"}}>
                                                <div id="dnn_ctr574_ViewTinBai_DsChuyenMucTinBai_rptTTSKInCategory_lnkTitle_0" className="news_link_bold" title={item.title} href="https://www.hueworldheritage.org.vn/tabid/61/language/vi-VN/Default.aspx/tid/Thong-bao-so-TB-BTDT-ngay-16-thang-4-nam-2020-Ve-viec-huong-ung-loi-keu-goi-ung-ho-phong-chong-dich-Covid-19.html/pid/1891/cid/121">{item.geo.name}</div>
                                                <span><span id="dnn_ctr574_ViewTinBai_DsChuyenMucTinBai_rptTTSKInCategory_iconMedia_0"></span></span>
                                                <div className="news_date">
                                                    <span id="dnn_ctr574_ViewTinBai_DsChuyenMucTinBai_rptTTSKInCategory_lblNewsDateCM_0">{item.publishTime}</span>
                                                </div>
                                                <div className="news_summary">
                                                    <span style={{color:"black"}} id="dnn_ctr574_ViewTinBai_DsChuyenMucTinBai_rptTTSKInCategory_lblSummary_0">{item.summary}</span>
                                                </div>
                                            </div>
                                            
                                            
                                            </Link>
                                            


                                            
                                            )
                                     })


                                }
                              
                               
                                

						
							</div>
							
						</div>
					</div>
				
               <DestinationIntro></DestinationIntro>

				</div>
			</div>
		</section>



	</div>

        
                       

                <MainFooter>
                    
                </MainFooter>    
        </Fragment>



    )



        

}
export default PrinciplePage