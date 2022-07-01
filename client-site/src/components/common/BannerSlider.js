import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSliderItem from "./BannerSliderItem";

const DUMMY_DATA = [
  {
    title: "Hoàng Cung",
    image: "images/DaiNoi.jpg",
  },
  {
    title: "Lăng vua Minh Mạng",
    image: "images/MinhMang.jpg",
  },
];

const BannerSlider = (props) => {
  return (

    <div className="hero-wrap hero-content-1" style={{ backgroundImage: `url('https://www.hueworldheritage.org.vn/Portals/0/HueTourisEvent/Nam2022/T3/c7426cc2-172c-4325-b8c5-016dae0f5ca2.jpg')` }}>
    </div>
    // <div className="hero-wrap layout-page">
    //   <div className="home-slider">
    //     <Slider
    //       {...{
    //         dots: false,
    //         prevArrow: false,
    //         nextArrow: false,
    //         infinite: true,
    //         speed: 500,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 10000,
    //       }}
    //     >
    //       {DUMMY_DATA.map((el, idx) => {
    //         return (
    //           <BannerSliderItem
    //             key={idx}
    //             title={el.title}
    //             image={el.image}
    //           />
    //         )
    //       })}
    //     </Slider>
    //   </div>
    // </div>
  )
}

export default BannerSlider
