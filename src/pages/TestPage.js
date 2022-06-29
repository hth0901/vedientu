// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'

import classes from './testpage.module.css'

const dummy_data = [1, 2, 3, 4, 5, 6]

const TestPage = (props) => {
    // const [nav1, setNav1] = useState(null);
    // const [nav2, setNav2] = useState(null);

    // let slider1 = [];
    // let slider2 = [];

    // useEffect(() => {
    //   setNav1(slider1);
    //   setNav2(slider2);
    // }, []);

    const clickHandler = (evt) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'text/xml; charset=utf-8')

        var raw =
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\r\n    <soapenv:Header/>\r\n    <soapenv:Body>\r\n        <tem:ImportAndPublishInv>\r\n            <tem:xmlInvData>\r\n                <![CDATA[\r\n                <Invoices>\r\n                    <Inv>\r\n                        <key>111aerfasd3</key>\r\n                        <Invoice>\r\n                            <CusCode>KHT001</CusCode>\r\n                            <ArisingDate>06/06/2022</ArisingDate>\r\n                            <CusAddress>Địa chỉ</CusAddress>\r\n                            <CusName/>\r\n                            <Buyer>Nguyễn văn E</Buyer>\r\n                            <Total>300000</Total>\r\n                            <Amount>600000</Amount>\r\n                            <AmountInWords>Saus trăm ngàn đồng</AmountInWords>\r\n                            <VATAmount>0</VATAmount>\r\n                            <VATRate>0</VATRate>\r\n                            <PaymentMethod>Chuyển khoản</PaymentMethod>\r\n                            <Extra></Extra>\r\n                            <Products>\r\n                                <Product>\r\n                                    <Code></Code>\r\n                                    <ProdName>Vé tham quan Đại Nội Huế - Người lớn</ProdName>\r\n                                    <ProdUnit>1</ProdUnit>\r\n                                    <ProdQuantity>2</ProdQuantity>\r\n                                    <ProdPrice>300000</ProdPrice>\r\n                                    <Amount>600000</Amount>\r\n                                </Product> \r\n                            </Products>\r\n                        </Invoice>\r\n                    </Inv>\r\n                </Invoices>\r\n                ]]>\r\n            \r\n</tem:xmlInvData>\r\n<tem:Account>ditichhueadmin</tem:Account>\r\n<tem:ACpass>Einv@oi@vn#pt20</tem:ACpass>\r\n<tem:username>tichhop</tem:username>\r\n<tem:password>123456aA@</tem:password>\r\n<tem:convert>0</tem:convert>\r\n</tem:ImportAndPublishInv>\r\n</soapenv:Body>\r\n</soapenv:Envelope>'

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(
            'https://ditichhueadmindemo.vnpt-invoice.com.vn/publishservice.asmx',
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error))
    }

    return (
        <div>
            <button onClick={clickHandler}>Test</button>
            <iframe
                width="450"
                height="250"
                frameborder="0"
                style={{ border: 0 }}
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCCEPaUKgLlTuJ8kBfBy0NidQW2-TOO_A4&q=lăng+minh+mạng+huế+việt+nam"
                allowfullscreen
            ></iframe>
            {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.3312368048814!2d107.57994301735492!3d16.458757062581565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a149ddda59d3%3A0x95c5750b90b08a8a!2zNiBMw6ogTOG7o2ksIFbEqW5oIE5pbmgsIFRow6BuaCBwaOG7kSBIdeG6vywgVGjhu6thIFRoacOqbiBIdeG6vywgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1656316297846!5m2!1sen!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
        </div>
        // <div>
        //   <h2>Slider Syncing (AsNavFor)</h2>
        //   <h4>First Slider</h4>
        //   <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)}>
        //     {dummy_data.map((el) => {
        //       return (
        //         <div key={el}>
        //           <div style={{ backgroundColor: "lightblue", height: "300px" }}>
        //             <h3 style={{ color: "red" }}>{el}</h3>
        //           </div>
        //         </div>
        //       );
        //     })}
        //   </Slider>
        //   <h4>Second Slider</h4>
        //   <div style={{ width: "500px", backgroundColor: "red" }}>
        //     <Slider
        //       asNavFor={nav1}
        //       ref={(slider) => (slider2 = slider)}
        //       slidesToShow={3}
        //       swipeToSlide={true}
        //       focusOnSelect={true}
        //       centerMode={true}
        //       className={classes["slick-slide-margin"]}
        //     >
        //       {dummy_data.map((el) => {
        //         return (
        //           <div key={el}>
        //             <div
        //               style={{
        //                 backgroundColor: "lightblue",
        //                 height: "300px",
        //                 margin: "0 10px",
        //               }}
        //             >
        //               <h3 style={{ color: "red" }}>{el}</h3>
        //             </div>
        //           </div>
        //         );
        //       })}
        //     </Slider>
        //   </div>
        // </div>
    )
}

export default TestPage
