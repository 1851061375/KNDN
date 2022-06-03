
import React from 'react'
import './card.scss'

const CardVideo = ({}) => {
    return (
        <div className="card card-hightlight mt-5">
            <div className="card-header px-3">
                <div className="card-title m-0">
                    <a href='/huong-dan' className='card-label fw-bold fs-4'>Hướng dẫn</a>
                </div>
            </div>
            <div className="card-body p-3">
            <iframe width="290" height="220" className='img-fluid' src="https://www.youtube.com/embed/2PbPHmK-0aE" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" ></iframe>
            </div>
        </div>
    )
}

export { CardVideo }

