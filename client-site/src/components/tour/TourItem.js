import { Image } from 'devextreme-react/chart'
import React from 'react'
import { Link } from 'react-router-dom'

const TourItem = (props) => {
    const { id, title, subtitle, content, image,date } = props


    return (
        <div className="list-blog__item col-lg-4 col-md-6">
            <Link to={`/tour-moi/${id}`} className="bg-img" style={{backgroundImage:`url('${image}')`}}></Link>
            <div className="content-blog">
                <h6 className="title-blog"><Link to={'#'} >{title}</Link></h6>
                <p className="date-blog">{date}</p>
                <p className="description-blog">
                   {subtitle}
                </p>
            </div>
            
        </div>
    );
}

export default TourItem