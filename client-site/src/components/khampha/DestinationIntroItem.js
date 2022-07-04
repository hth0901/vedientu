import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DestinationIntro from "./DestinationIntro";
import { getList } from "./getlist";
import { Fragment } from "react";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import $ from 'jquery'; 
import { useDispatch, useSelector } from 'react-redux'

// import publicIp from "public-ip";

const DestinationIntroItem = () => {
	

	function resize() {
			

		var imgWidth = $('.order-container .bg-img').width();
		var heightimg = $(".order-container .bg-img");
		var heights = imgWidth / 0.8157;
		for (var i = 0; i < heightimg.length; i++) {
			heightimg[i].style.height = heights + "px";
		}

		



	}
	
	
	$(document).ready(function () {
		window.addEventListener("resize", resize);
		window.onresize = function () {
			resize();
		};
		resize();
	});
	function showVal(newVal) {
		document.getElementsByTagName("body")[0].setAttribute('style', 'color:blue;filter: brightness(' + newVal + '%);');
	}
/* const { title, description, image, id } = props;

  let shortDesc = "";
  if (description.length > 100) {
    const tempStr = description.substr(0, 100);
    const lidx = tempStr.lastIndexOf(" ");
    shortDesc = tempStr.substr(0, lidx);
    shortDesc = `${shortDesc} ...`;
  } else {
    shortDesc = description;
  }

  const aRef = useRef();

  const [imgHeight, setImgHeight] = useState(250);

  '/*
  var imgWidth = $('.destination .img').width();
      var heightimg = $(".destination .img");
      var heights = imgWidth / 0.749;
      for (var i = 0; i < heightimg.length; i++) {
        heightimg[i].style.height = heights + "px";
      }
  /

  const resizeHandler = (evt) => {
    if (aRef.current && aRef.current.clientWidth) {
      const curWidth = aRef.current.clientWidth;
      setImgHeight(curWidth / 0.749);
    }
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="slider_item" style={{ margin: "0 32px" }}>
      <div className="destination">
        <Link
          to={`/diem-den/${id}`}
          ref={aRef}
          className="img d-flex justify-content-star align-items-end"
          style={{ backgroundImage: `url(${image})`, height: `${imgHeight}px` }}
        >
          <div className="overley"></div>
          <div className="text p-3">
            <h6>{title}</h6>
            <span className="listing body-1">{shortDesc}</span>
          </div>
        </Link>
      </div>
    </div>
  );*/

	  const [list, setList] = useState([]);
	  const [filteredResults, setFilteredResults] = useState([]);
	  const [searchInput, setSearchInput] = useState('');
	  useEffect(() => {
		let mounted = true;
		getList()
		  .then(items => {
			
			  setList(items)
			
	  })
	
	  }, [])

	
	
	/* function clicksearch(){
		var value1=document.getElementById("search_input").value;
	window.alert(value1) 
	
	}*/
	function clicksearch(){
	 var arr=[]
		var value1=document.getElementById("search_input").value;
		if(value1 != null || value1 !=""){
			list.map(item=>{
				if(item.title.includes(value1))
				arr.push(item);
			})
			if(arr.length>0)
			{
				setList(arr);
			}
			else{

				getList()
				.then(items => {
				  
					setList(items)
				  
			})
			}

		}
	}
	

 return (
 <Fragment>

  <div class="hero-wrap hero-content-1" style={{backgroundImage: 'url("images/order/banner-content-1.png")'}}>

</div>
 	<div class="content-wrap">
		<section className="ftco-section ftco-content">
			<div className="container">				
				<div className="row">
					<div className="col-md-9">						
						<div className="box-container">
							<div className="heading-section heading-content ">
								<h2 className="heading2">Khám phá di sản</h2>
						
							</div>
							<div className="content-container">
								<div className="row justify-content-start">
									<div className="col-12 search-section search-bg">
									
										<div className="input-group">
										
											<input  id="search_input" type="text" classname="form-control" placeholder="Tìm điểm đến..." aria-label="Tìm điểm đến..." aria-describedby="searchdestination"/>
                    
										  <div className="input-group-append">
											<a className="input-group-text" id="searchdestination"  onClick={clicksearch}><img   src="images/icon/search.png" alt=""/></a>

										  </div>
                  
										</div>
									  </div>
                    
								</div>
								<div className="row">
									<div className="col-md-12">
										<div className="destination-order row">
										

										{list.map(item =>
										item.active?
											(<div className="order-item col-md-4 col-sm-6" >
											<div className="order-container">									
												
												<a href="#" className="bg-img" style={{backgroundImage:"url("+item.imageUrl + ")"}}>
													<p className="content-overlay"></p>
													<p className="content-info">
														<span className="title-destination">{item.title}</span>
													</p>
												</a>
											</div>
										</div>):""
											
											
										)}	
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
										<li className="page-item active"><a class="page-link" href="#">1</a></li>
										<li className="page-item"><a class="page-link" href="#">2</a></li>
										<li className="page-item"><a class="page-link" href="#">3</a></li>
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
											

 </Fragment>
 );

};



export default DestinationIntroItem;
