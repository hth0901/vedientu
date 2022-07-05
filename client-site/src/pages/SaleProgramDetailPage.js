import { Fragment } from "react";
import MainFooter from "../components/common/MainFooter";
import ReactHtmlParser from 'react-html-parser';
import { useState, useEffect } from "react";
import React from "react";
import DestinationIntro from "../components/khampha/DestinationIntro";
import MainHeader from '../components/MainHeader';
import AOS from 'aos';
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { getList1 } from "components/khampha/getlist";
import { ta } from "date-fns/locale";
import { $CombinedState } from "redux";
const BASE_URL = process.env.REACT_APP_URL
const SaleProgramDetailPage = (props) => {
    const location = useLocation()
    const [isAuthen, setIsAuthen] = useState(true)


    // useEffect(() => {
    //     const curStrUser = localStorage.getItem('user')
    //     const curUser = JSON.parse(curStrUser)
    //     const curRoleId = (curUser && curUser.roleid) || -1
    //     console.log(location.pathname)
    //     console.log(curUser)
    //     console.log(curRoleId)
    //     fetch(
    //         `${BASE_URL}/api/menu/getclientautho/${encodeURIComponent(
    //             location.pathname
    //         )}`
    //     )
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error('Proccess Error')
    //             }
    //             return res.json()
    //         })
    //         .then((data) => {
    //             if (data.length > 0 && !data.includes(curRoleId)) {
    //                 setIsAuthen(false)
    //             }
    //         })
    //         .catch((err) => {
    //             // setIsAuthenticated(false)
    //             setIsAuthen(false)
    //         })
    // }, [isAuthen])
    const params=useParams();
    console.log(params.id)
    const [list, setList] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    var [imgus,setimgus]=useState();
    useEffect(() => {
      let mounted = true;
     getList1().then(items=>{
        var tam=[...items.newsList]
       
        for(var i in tam){
           

            
            if(tam[i].id===params.id)
            {   setimgus(tam[i].imgNews.url)   
                setList({...tam[i]})
              
                break

                
            }
    
        }
        
       })}
     ,[])
    



   



    return (

        <Fragment>
            {/* <HomeSlider /> 
            <div className="order-item col-md-4 col-sm-6" >
                                          <div className="order-container">									
 0p;u                                             
    =-/                                           <a href="#" className="bg-img" style={{backgroundImage:"url("+item.imgNews.url + ")"}}>
                                                  <p className="content-overlay"></p>
                                                  <p class="content-info">
                                                      <span className="title-destination">{item.title}</span>
                                                  </p>
                                              </a>
                                          </div>
                                      </div>
            
            */}
            {/* <TestSlider />
             <MainFooter />
            */}
            <MainHeader />
            <div>


                <div className="hero-wrap hero-content-1" style={{ backgroundImage: 'url("images/order/banner-content-1.png")' }}>

                </div>
                <div className="content-wrap">
                    <section className="ftco-section ftco-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="box-container">
                                        <div className="heading-section heading-content ">
                                            <h2 className="heading2" >Chương Trính Khuyến Mãi</h2>

                                        </div>
                                        <div className="content-container">
                                            <div className="row justify-content-start">


                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="destination-order row">
                                                <div className="blog-img">                                       
                                                <img src={imgus}
                                                       alt=""/>
                                                </div>
                                          {ReactHtmlParser(list.content)}
                                                    </div>
                                                </div>
                                            </div>
                                            <nav className="nav-pagination" aria-label="Page navigation">
                                                <ul className="pagination">
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true" className="material-icons-outlined">chevron_left</span>
                                                            <span className="sr-only">Previous</span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true" className="material-icons-outlined">chevron_right</span>
                                                            <span className="sr-only">Next</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                                <DestinationIntro></DestinationIntro>

                            </div>
                        </div>
                    </section>



                </div>





                <MainFooter />


            </div>
        </Fragment>


    )


}
export default SaleProgramDetailPage 