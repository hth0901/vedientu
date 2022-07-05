import MainFooter from "components/common/MainFooter"
import MainHeader from "components/MainHeader"
import DestinationIntro from "components/khampha/DestinationIntro"
import { Fragment, useEffect, useState } from "react"
import React from "react"
import { getListNoiQuy } from "components/khampha/getlist"
import { useParams } from "react-router"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const PrincipleDetailPage=()=>{
    const params=useParams()
    var [data,setdata]=useState([]);
    
    useEffect(()=>{
        getListNoiQuy().then(
            items=>{
                var tam=[...items.newsList]
                for(var i in tam){  
                    if(tam[i].id===params.id)
                    {    
                        setdata({...tam[i]})
                        console.log(tam[i])
                        break;
        
                        
                    }
            
                }})
            }

        ,[])


    
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
                            
							<div className="heading-section heading-content">
                          
								<h2 class="heading2">{data.publishTime}</h2>
							
							</div>
							<div className="content-container">
								<h5><strong>
                                {data.title}
								</strong></h5>
								<p>
                                    {ReactHtmlParser(data.content)}
								</p>
								<p className="text-center">
									<img src="images/blog/blog3.png" style={{maxWidth:"400px"}} alt=""/>
								</p>
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
									<li><a href="#">Giá vé</a></li>
									<li className="active"><a href="#">Thông tin tham quan</a></li>
									<li><a href="#">Nội quy tham quan</a></li>
									<li><a href="#">Chương trình khuyến mãi</a></li>
									<li><a href="#">Chương trình tour mới</a></li>
								</ul>
							</div>
							<div className="adv-container">
								<a className="adv-item">
									<img src="images/adv/adv1.png" alt=""/>
								</a>
								<a className="adv-item">
									<img src="images/adv/adv2.png" alt=""/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>



	</div>


        
                       

                <MainFooter>
                    
                </MainFooter>    
        </Fragment>



    )



}
export default PrincipleDetailPage