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
import { requestGET } from '../../../../helpers/baseAPI'
import { CONFIG } from '../../../../helpers/config'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'

const Item = ({ className = '', type = 1, detail }) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const user = useSelector(state => state.auth.user);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const history = useHistory();

    return (
        <div className={`card card-auction d-flex align-items-center flex-row mb-6 shadow-sm ${className}`} >
            <div className='card-img-wrapper'>
                <Link to={`/${type == 2 ? "product" : "business"}/${detail.ID}`}>
                    <img src={detail.Image ? CONFIG.FILE_URL + detail.Image : toAbsoluteUrl("/media/products/auction1.jpg")} />
                </Link>
            </div>
            <div className="card-body">
                <Link to={`/${type == 2 ? "product" : "business"}/${detail.ID}`} className="card-title fw-bolder">{detail?.Title ?? ''}</Link>
                <p className='card-time mb-0 text-truncate text-muted'>Ngày mở : <span className='text-danger'>{moment(detail?.StartTime ?? '').format('HH:mm DD/MM/YYYY')}</span></p>
                {/* <p className='card-time mb-0 text-truncate text-muted'><span className='fa fa-clock text-success w-20px'></span>{item.ThoiGianGui ? moment(item.ThoiGianGui).format('hh:mm DD/MM/YYYY') : 'Chưa xác định'}</p> */}
            </div>
        </div >
    )
}

export { Item }
