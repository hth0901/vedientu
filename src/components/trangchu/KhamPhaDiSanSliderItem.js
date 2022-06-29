import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const KhamPhaDiSanSliderItem = (props) => {
    const { title, description, image, id } = props
    const [imgHeight, setImgHeight] = useState(0)
    const refContentImage = useRef()

    let shortDesc = ''
    if (description.length > 100) {
        const tempStr = description.substr(0, 100)
        const lidx = tempStr.lastIndexOf(' ')
        shortDesc = tempStr.substr(0, lidx)
        shortDesc = `${shortDesc} ...`
    } else {
        shortDesc = description
    }

    const resizeHandler = () => {
        const dkm = refContentImage.current
        setImgHeight(dkm.clientWidth / 0.825)
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
            <div className="content">
                <div className="content-border"></div>
                <div className="content-container">
                    <div className="content-overlay"></div>
                    <div
                        ref={refContentImage}
                        className="content-image"
                        style={{
                            backgroundImage: `url(${image})`,
                            height: `${imgHeight}px`,
                        }}
                    >
                        <h5>{title}</h5>
                    </div>
                    <div className="content-details fadeIn-top">
                        <h3>{title}</h3>
                        <p>{shortDesc}</p>
                        <Link
                            to={`/diem-den/${id}`}
                            className="btn btn-outline-light"
                        >
                            Xem chi tiết
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KhamPhaDiSanSliderItem
