import { Title } from "devextreme-react/vector-map";
import React from "react";

const BannerSliderItem = (props) => {
  const { title, image } = props;

  return (
    <div className="slider_item">
      {/* <div className="overlay"></div> */}
      <div
        className="img__bg"
        style={{ backgroundImage: `url('https://www.hueworldheritage.org.vn/Portals/0/HueTourisEvent/Nam2022/T3/c7426cc2-172c-4325-b8c5-016dae0f5ca2.jpg')` }}
      ></div>
      <div className="slider-content"> 
        <div className="container">
          <div className="slider-text">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSliderItem;
