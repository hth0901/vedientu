import React, { useState, useRef, useEffect } from 'react'

// var imgHeight3 = $('.blog-details').outerHeight(true);
// var heightimg3 = $(".blog-image");
// var heights3 = imgHeight3;
// if($( window ).width() > 991.98){
//     for(var i=0;i<heightimg3.length;i++){
//         heightimg3[i].style.height = heights3 + "px";
//     }
// }

const QuanTamSectionItem = (props) => {
    const [imgHeight, setImgHeight] = useState(0)
    const refContentImage = useRef()
    const resizeHandler = () => {
        // const { innerWidth: width, innerHeight: height } = window;
        const dkm = refContentImage.current.offsetHeight
        // setImgHeight(dkm.clientWidth)
        setImgHeight(dkm)
    }
    useEffect(() => {
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
    return (
        <div className="item">
            <div className="blog">
                <div className="blog-item">
                    <div
                        className="blog-image bg-img"
                        style={{
                            backgroundImage: `url('images/blog/blog1.png')`,
                            height: `${imgHeight}px`,
                        }}
                    ></div>
                    <div ref={refContentImage} className="blog-details">
                        <h5>
                            Tịnh cư Cát Tường Quân: Điểm đến thú vị của xứ Huế
                        </h5>
                        <p>
                            Nằm cạnh đồi thông Thiên An vi vu gió lộng, tịnh cư
                            Cát Tường Quân mang nét tinh tế, sang trọng của xứ
                            Huế kinh kỳ, lại hòa mình vào tổng thể thiên nhiên
                            với cây xanh, rêu, đá, hoa, trái, nước... như một
                            phần quan trọng làm nên sự hoàn chỉnh cho không gian
                            kiến trúc, vừa trở thành không gian trải nghiệm hấp
                            dẫn dành cho du khách.
                        </p>
                        <a href="#" className="btn btn-outline-primary">
                            Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuanTamSectionItem
