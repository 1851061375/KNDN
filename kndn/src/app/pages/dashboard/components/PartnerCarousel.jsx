import React, { FC, useState, useEffect } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Rate } from 'antd'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './PartnerCarousel.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { requestPOST, requestGET } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'

// Đối tác

const PartnerCarousel = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            var res = await requestGET(`${CONFIG.GETWAY_PATH}/session/list?skip=0&take=100&statuscodes=UPCOMING`);
            var _data = res?.data ?? []
            setData(_data)
        }
        fetchData()
        return () => {

        }
    }, [])


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <>
            {/* BEGIN: Section Product auction */}
            <div className='section-products-auction'>
                <div className='container'>
                    <div className="section-title-holder">
                        <h1 className="section-title">Đối tác</h1>
                        {/* <div className='section-border' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/patterns/section-border.png')})` }}></div> */}
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
                                                <img src={i.Image ? CONFIG.FILE_URL + i.Image : toAbsoluteUrl('/media/products/product1.jpg')} className='img-fluid w-100' alt="" />
                                            </div>
                                            <div className='product-times'>
                                            </div>
                                        </div>
                                        <div className="product-carousel-body p-3">
                                            <Link to={`/tai-san-dau-gia/${i.ID}`} className='product-carousel-title'>{i?.Asset?.Title}</Link>
                                            <p className='product-carousel-price'>Giá khởi điểm: <b className='text-danger fw-bolder'>{i?.PriceStarting?.toLocaleString() ?? 0}</b> vnđ</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}
export { PartnerCarousel }
