/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useState } from 'react'
import moment from 'moment';
import { Link, useHistory, useLocation } from "react-router-dom";
import { CONFIG } from '../../../../helpers/config'
import { checkIsActive, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useDispatch, useSelector } from 'react-redux'

const NavbarUser = () => {

  const accessToken = useSelector((state) => state.auth.accessToken)
  const user = useSelector((state) => state.auth.user)

  const history = useHistory();
  const location = useLocation()
  const { pathname } = location

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="symbol symbol-60 symbol-xxl-100 me-5 align-self-start align-self-xxl-center">
          <div className="symbol-label w-xxl-80px h-xxl-80px" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/user.svg')})` }}></div>
          <i className="symbol-badge bg-success"></i>
        </div>
        <div>
          <a href="#" className="fw-bolder fs-4 text-truncate text-primary text-hover-danger" title='Phạm Minh Hiếu'>{user?.fullName ?? ''}</a>
          <div className="text-gray-600">Cá nhân</div>
          <div className="mt-2">
            <span className="btn-sm btn-success rounded-pill text-white fw-bold py-1 ps-2 px-3 my-1">
              <span className='fas fa-check-circle fa-fw'></span> Đã xác thực
            </span>
          </div>
        </div>
      </div>
      <div className="py-9">
        <div className="d-flex align-items-start justify-content-between mb-2">
          <span className="fw-bold me-2 text-nowrap">Email:</span>
          <a href="#" className="text-gray-700 text-hover-primary">{user?.email ?? ''}</a>
        </div>
        <div className="d-flex align-items-start justify-content-between mb-2">
          <span className="fw-bold me-2 text-nowrap">SĐT:</span>
          <span className="text-gray-700">{user?.phoneNumber ?? ''}</span>
        </div>
        <div className="d-flex align-items-start justify-content-between">
          <span className="fw-bold me-2 text-nowrap">Địa chỉ:</span>
          <span className="text-gray-700 text-end">{user?.address ?? ''}</span>
        </div>
      </div>
      <div className='row mx-0'>
        <Link to='/profile/thong-bao-ca-nhan' className={`col-12 p-3 fw-bold fs-5 mb-2 rounded bg-primary bg-hover-danger text-white 
                        ${clsx('', { 'bg-danger bg-opacity-75': checkIsActive(pathname, '/profile/thong-bao-ca-nhan'), })}`
        }
        >
          <span className='fal fa-bell-on fa-fw me-3'></span> Thông báo
        </Link>
        <Link to='/profile' className={`col-12 p-3 fw-bold fs-5 mb-2 rounded bg-primary bg-hover-danger text-white 
                                ${clsx('', { 'bg-danger bg-opacity-75': checkIsActive(pathname, '/profile/thong-tin-tai-khoan'), })}`
        }
        >
          <span className='fal fa-user-circle fa-fw me-3'></span> Thông tin cá nhân
        </Link>
        <Link
          to='/profile/cuoc-dau-gia-cua-toi'
          className={`col-12 p-3 fw-bold fs-5 mb-2 rounded bg-primary bg-hover-danger text-white 
                                ${clsx('', { 'bg-danger bg-opacity-75': checkIsActive(pathname, '/profile/cuoc-dau-gia-cua-toi'), })}`
          }
        >
          <span className='fal fa-hand-holding-usd fa-fw me-3'></span> Cuộc đấu giá của tôi
        </Link>
        <Link to='/profile/tai-san-dau-gia-ca-nhan' className={`col-12 p-3 fw-bold fs-5 mb-2 rounded bg-primary bg-hover-danger text-white 
                                ${clsx('', { 'bg-danger bg-opacity-75': checkIsActive(pathname, '/profile/tai-san-dau-gia-ca-nhan'), })}`
        }
        >
          <span className='fal fa-sack-dollar fa-fw me-3'></span> Tài sản đấu giá
        </Link>
        <Link to='/profile/tai-lieu-cua-toi' className={`col-12 p-3 fw-bold fs-5 mb-2 rounded bg-primary bg-hover-danger text-white 
                                ${clsx('', { 'bg-danger bg-opacity-75': checkIsActive(pathname, '/profile/tai-lieu-cua-toi'), })}`
        }
        >
          <span className='fal fa-file-alt fa-fw me-3'></span> Tài liệu của tôi
        </Link>
      </div>
    </>
  )
}

export { NavbarUser }
