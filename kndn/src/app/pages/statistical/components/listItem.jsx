/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Rate} from 'antd'
import './Item.scss'
import moment from 'moment'

const ListItem = ({item}) => {
  return (
    <div className='card card-faq-item'>
      <div className='card-category position-absolute top-0'>
        <span className='card-category-icon'>
          <i className='fa fa-city'></i>
        </span>
        <label className='card-category-name'>{item.LinhVucText}</label>
      </div>
      <div className='card-img-wrapper'>
        <a href=''>
          <img
            src={toAbsoluteUrl('/media/logos/card-thumb.png')}
            className='card-img-top'
            alt='Gắn mảnh thủy tinh sắc nhọn gây nguy hiểm'
          />
        </a>
      </div>
      <div className='card-body'>
        <div className={`card-status position-absolute bg-success`}>
          <span className={'fa fa-check'}></span>
        </div>
        <a className='card-title fw-bolder'>{item.TieuDe}</a>
        <p className='mb-0 text-truncate text-muted'>
          <span className='fa fa-clock text-success w-20px'></span>
          {item.ThoiGianGui ? moment(item.ThoiGianGui).format('hh:mm DD/MM/YYYY') : ''}
        </p>
        <p className='text-truncate text-muted'>
          <span className='fa fa-map-marker-alt text-success w-20px'></span>Số 30, Hào Nam, Đống Đa
        </p>
        <p className='card-text card-faq-desc mb-0'>{item.NoiDung}</p>
      </div>
      <div className='card-footer'>
        <div className='row'>
          <div className='col-auto card-rate'>
            <Rate allowHalf defaultValue={item.diemDanhGia} />
          </div>
          <div className='col card-comment align-self-center text-end'>
            <a href=''>
              <span className='fa fa-comment-dots'></span>{' '}
              <span className='num-comment fw-bold'>{item.soCmt}</span> bình luận
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ListItem}
