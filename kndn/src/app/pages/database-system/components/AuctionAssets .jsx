import React, { FC, useState, useEffect } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Rate } from 'antd'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './AuctionCarousel.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { requestPOST, requestGET } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { AuctionCounterTime } from '../../auction/components/AuctionCounterTime'

const AuctionAssets = (props) => {

    const [data, setData] = useState(props?.assets ?? [])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
    return (
        <>
            <div className='section-products-auction'>
                <div className="section-title-holder">
                    <h1 className="section-title">Tài sản trong cuộc đấu giá</h1>
                    <div className='section-border' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/patterns/section-border.png')})` }}></div>
                    <div className="section-subtitle"></div>
                </div>
                <div className="product-carousel">

                    <Carousel
                        responsive={responsive}
                        autoPlay
                        autoPlaySpeed={6000}
                        slidesToSlide={1}
                        swipeable
                        infinite
                        className="pb-xl-5"
                    >
                        {data.map((i) => (
                            <div className='card shadow-sm h-sm-100' key={i.ID}>
                                <div className="card-body p-0">
                                    <div className='rounded min-h-295px product-carousel-head'>
                                        <div className='product-thumbs'>
                                            <img src={i.Image ? CONFIG.FILE_URL + i.Image : toAbsoluteUrl('/media/products/auction1.jpg')} className='img-fluid w-100' alt="" />
                                        </div>
                                    </div>
                                    <div className="product-carousel-body p-3 text-center">
                                        <Link to={`/tai-san-dau-gia/${i.ID}`} className='product-carousel-title'>{i.Title}</Link>
                                        <p className='card-time mb-0 text-truncate'>Chủ tài sản : {i?.OwnerUser?.Name ?? ''}</p>
                                        <b className='text-danger text-bold'>{CONFIG.STATUS_CODE[i.Status]}</b>
                                        <p className='card-time mb-0 text-truncate'>Giá khởi điểm : <span className='text-danger'>{i?.PriceStarting?.toLocaleString() ?? ''}</span> VNĐ</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    )
}
export { AuctionAssets }
