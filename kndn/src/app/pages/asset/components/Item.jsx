/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Rate } from 'antd'
import './Item.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { requestPOST } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'

const Item = ({ className = '' }) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const user = useSelector(state => state.auth.user);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const history = useHistory();

    return (
        <div className={`card card-auction d-flex align-items-center flex-row mb-6 shadow-sm ${className}`} >
            <div className='card-img-wrapper'>
                <Link to='/cuoc-dau-gia'>
                    <img src={(toAbsoluteUrl("/media/products/auction1.jpg"))} />
                </Link>
            </div>
            <div className="card-body">
                <Link to='/cuoc-dau-gia' className="card-title fw-bolder">Phương tiện vận tải đường thủy nội địa là tàu HN 0903, HN 0931, HN 0978 của Công ty Cổ phần Năng lượng và Môi trường VICEM</Link>
                <p className='card-time mb-0 text-truncate text-muted'>Ngày mở : <span className='text-danger'>07/01/2022 09:00:00</span></p>
                {/* <p className='card-time mb-0 text-truncate text-muted'><span className='fa fa-clock text-success w-20px'></span>{item.ThoiGianGui ? moment(item.ThoiGianGui).format('hh:mm DD/MM/YYYY') : 'Chưa xác định'}</p> */}
            </div>
        </div >
    )
}

export { Item }
