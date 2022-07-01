import { Image } from 'devextreme-react/chart'
import React from 'react'
import { Link } from 'react-router-dom'

const EventItem = (props) => {
    const { id, title, subtitle, content, image,beginDate,endDate} = props
    const [day1,time] = beginDate.split(' ')
    const [day,month,year] = day1.split('-')
    const date1 =new Date(year,month-1,day)
    
    const [day2,time2] = endDate.split(' ')
    const [day3,month1,year1] = day2.split('-')
    const date2 =new Date(year1,month1-1,day3)
    const today = new Date();



    if(date1<today && today<date2){
        return (


            // <div className="col-md-4 box-scroll" data-aos="fade-up">
            <div className="order-item col-md-4 col-sm-6">
            <div className="order-container">
            <Link to={`/su-kien/${id}`} className="bg-img" style={{ backgroundImage: `url("${image}")` }}>
                <p className="content-overlay"></p>
                
                <p className="label-status label-meta happenning">Đang diễn ra</p>
                <p className="content-info">
                    <span className="title-destination">{title}</span>
                    <span className="calendar-destination"><img src="images/icon/calendar-yellow.png" alt=""></img> {beginDate} - {endDate}</span>
                </p>
    
            </Link>
            </div>
            </div>
            // </div>
    
        )
    }
     if(today<date1)
    {
        return (


            // <div className="col-md-4 box-scroll" data-aos="fade-up">
            <div className="order-item col-md-4 col-sm-6">
            <div className="order-container">
            <Link to={`/su-kien/${id}`} className="bg-img" style={{ backgroundImage: `url("${image}")` }}>
                <p className="content-overlay"></p>
                
                <p className="label-status label-meta upcoming">Sắp diễn ra</p>
                <p className="content-info">
                    <span className="title-destination">{title}</span>
                    <span className="calendar-destination"><img src="images/icon/calendar-yellow.png" alt=""></img> {beginDate} - {endDate}</span>
                </p>
    
            </Link>
            </div>
            </div>
            // </div>
    
        )
    }
    else if(today>date2){
        return (


            // <div className="col-md-4 box-scroll" data-aos="fade-up">
            <div className="order-item col-md-4 col-sm-6">
            <div className="order-container">
            <Link to={`/su-kien/${id}`} className="bg-img" style={{ backgroundImage: `url("${image}")` }}>
                <p className="content-overlay"></p>
                
                <p className="label-status label-meta tookplace">Đã diễn ra</p>
                <p className="content-info">
                    <span className="title-destination">{title}</span>
                    <span className="calendar-destination"><img src="images/icon/calendar-yellow.png" alt=""></img> {beginDate} - {endDate}</span>
                </p>
    
            </Link>
            </div>
            </div>
            // </div>
    
        )
    }
    return null;
    
}

export default EventItem
