
import React, { Fragment } from "react";
import { Link } from "react-router-dom";


const MainFooter = (props) => {
  return (

  	<footer className='ftco-footer ftco-bg-dark ftco-section'>
		<div className='container'>
			<div className='footer-top'>
				<div className='row'>
					<div className='col-md'>
						<div className='ftco-footer-widget mb-4'>
							<a href="index.html" className='ftco-heading-2'><img src="images/logofooter.png" alt=""/></a>
							<h6>Liên kết với chúng tôi</h6>
							<ul className='ftco-footer-social list-unstyled'>
								<li className='ftco-animate fadeInUp ftco-animated' ><a href="#"><img width="20" src="images/icon/fb.png"
											alt=""/></a></li>
										
								<li className=" fadeInUp ftco-animated"><a href="#"><img width="20" src="images/icon/twitter.png"
											alt=""/></a></li>
								<li className=" fadeInUp ftco-animated"><a href="#"><img width="20" src="images/icon/instagram.png"
											alt=""/></a></li>
								<li className=" fadeInUp ftco-animated"><a href="#"><img width="20" src="images/icon/youtube.png"
											alt=""/></a></li>
							</ul>
						
						</div>
					</div>
					<div className='col-md'>
						<div className='ftco-footer-widget mb-4'>
							<h2 className='ftco-heading-2'>Liên kết</h2>
							<ul className='list-unstyled'>
								<li><a href="#" className='d-block'>Khám phá Huế</a></li>
								<li><a href="#" className='d-block'>Visit Huế</a></li>
								<li><a href="#" className='d-block'>Cổng TTBTDT Cố đô Huế</a></li>
							</ul>
						</div>
					</div>
					<div className='col-md'>
						<div className='ftco-footer-widget mb-4'>
							<h2 className='ftco-heading-2'>Điều khoản sử dụng</h2>
							<ul className='list-unstyled'>
								<li><a href="#" className='d-block'>Điều khoản chung</a></li>
								<li><a href="#" className='d-block'>Điều khoản giao dịch</a></li>
								<li><a href="#" className='d-block'>Chính sách bảo mật</a></li>
								<li><a href="#" className='d-block'>How it works</a></li>
								<li><a href="#" className='d-block'>Contact Us</a></li>
							</ul>
						</div>
					</div>
					<div className="col-md">
						<div className="ftco-footer-widget mb-4">
							<h2 className="ftco-heading-2">Thông tin</h2>
							<ul className="list-unstyled">
								<li><a href="#" className='d-block'>Chương trình khuyến mãi</a></li>
								<li><a href="#" className='d-block'>Bản đồ các điểm đến</a></li>
								<li><a href="#" className='d-block'>Giá vé tham quan</a></li>
								<li><a href="#" className='d-block'>Thời gian/Nội quy tham quan</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className='footer-bottom'>
				<div className='row'>
					<div className='col-md-9'>
						<p>
							Bản quyền Website thuộc về Trung tâm Bảo tồn Di tích Cố đô Huế<br />
							Địa chỉ: Tam Toà, 23 Tống Duy Tân - thành phố Huế, Việt Nam<br />
							Email: huedisan@gmail.com
						</p>
					</div>
					<div className='col-md-3 text-right'>
						<img src="images/logobct.png" alt="" className='img-active'/>
						<div className='copyright-pane'>
						<div className='tooltip_constrast'>
					    <img
                                        alt=""
                                        src="images/icon/hotrokhuyettat.svg"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                        }}
									
                                    />
                                    <input
                                        className='tooltiptext'
                                        id="myRange"
                                        min="0"
                                        max="200"
                                        // onchange="showVal(this.value)"
                                        type="range"
                                    />
							</div>
						</div>
							<div className='copyright'>
								Thiết kế và xây dựng: <a target="_blank" href="www.huecit.vn">HueCIT</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		
 
	</footer>

  );
};

export default MainFooter;
