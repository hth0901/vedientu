import React, { useState, useRef, useEffect } from 'react'

const CacLoaiHinhDichVuSectionItem = (props) => {
    const { data } = props
    const [imgHeight, setImgHeight] = useState(0)
    const refContentImage = useRef()

    const resizeHandler = () => {
        const dkm = refContentImage.current
        setImgHeight(dkm.clientWidth)
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
            <div href="#" className="service">
                <div className="service-container">
                    <div
                        ref={refContentImage}
                        className="service-image bg-img"
                        style={{
                            backgroundImage: `url('${data.image}')`,
                            height: `${imgHeight}px`,
                        }}
                    ></div>
                    <div
                        className="service-details"
                        style={{ height: `${imgHeight}px` }}
                    >
                        <img
                            src={`${data.icon}`}
                            height="60"
                            width="60"
                            alt=""
                        />
                        <h5>{data.title}</h5>
                        <p>{data.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CacLoaiHinhDichVuSectionItem
