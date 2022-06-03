import React, { FC, useState } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Rate } from 'antd'
import './ProductByCategory.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { requestPOST } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'

const ProductByCategory = () => {

    return (
        <>
            <div className='section-product-by-category py-2 py-lg-2'>
                <div className='container'>
                    <div className="section-title-holder">
                        <h1 className="section-title">Hệ thống cơ sở dữ liệu</h1>
                        {/* <div className='section-border' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/patterns/section-border.png')})` }}></div> */}
                        <div className="section-subtitle"></div>
                    </div>
                    <div className="grid__container grid__container--popular super-cards d-grid">
                        <div className="grid__item grid__item--1">
                            <div className="col-xs-12 super-card" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/products/Mechanical-Engineering-min.jpg')})` }}>
                                <Link to='/database-system/ckct'>
                                    <div className="col-xs-12 card-bg">
                                        <div className="info">
                                            <p className="title">Cơ khí chế tạo</p>
                                            <p className="description hidden-xs">Doanh nghiệp (214)</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="grid__item grid__item--2">
                            <div className="col-xs-12 super-card card-auto-height" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/products/cate2.jpg')})` }}>
                                <Link to='/database-system/ot'>
                                    <div className="col-xs-12 card-bg">
                                        <div className="info">
                                            <p className="title">Ô tô</p>
                                            <p className="description hidden-xs">Doanh nghiệp (84)</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="grid__item grid__item--3">
                            <div className="col-xs-12 super-card" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/products/textile.jpg')})` }}>
                                <Link to='/database-system/dm'>
                                    <div className="col-xs-12 card-bg">
                                        <div className="info">
                                            <p className="title">Dệt may</p>
                                            <p className="description hidden-xs">Doanh nghiệp (12)</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="grid__item grid__item--4">
                            <div className="col-xs-12 super-card" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/products/leather-shoes.jpg')})` }}>
                                <Link to='/database-system/dg'>
                                    <div className="col-xs-12 card-bg">
                                        <div className="info">
                                            <p className="title">Da giày</p>
                                            <p className="description hidden-xs">Doanh nghiệp (33)</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="grid__item grid__item--5">
                            <div className="col-xs-12 super-card card-auto-height" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/products/electronic-min.jpg')})` }}>
                                <Link to='/database-system/dt'>
                                    <div className="col-xs-12 card-bg">
                                        <div className="info">
                                            <p className="title">Điện tử</p>
                                            <p className="description hidden-xs">Doanh nghiệp (214)</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="grid__item grid__item--6">
                            <div className="col-xs-12 super-card" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/products/cate6.jpg')})` }}>
                                <Link to='/database-system/k'>
                                    <div className="col-xs-12 card-bg">
                                        <div className="info">
                                            <p className="title">Khác</p>
                                            <p className="description hidden-xs">Doanh nghiệp (214)</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export { ProductByCategory }
