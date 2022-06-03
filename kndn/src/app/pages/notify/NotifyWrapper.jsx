/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import clsx from 'clsx'
import { PageTitle } from '../../../_metronic/layout/core'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { DatePicker, Space, Tabs, Select, Pagination } from 'antd'

const NewPage = () => {

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      var res = await requestGET(`${CONFIG.GETWAY_PATH}/listarticles?skip=${page * 10}&top=10&search=&categoryid=15&orderby=`);
      var _data = res?.data ?? []
      setData(_data)
      setTotal(res?.total ?? [])
    }
    fetchData()
    return () => {

    }
  }, [])

  return (
    <>
      <div className='col-12'>
        {data.map((i) => (
          <div key={i.ID} className={`card card-auction d-flex align-items-center flex-row mb-6 shadow-sm`} >
            <div className='card-img-wrapper'>
              <Link to='/'>
                <img src={i.Image ? CONFIG.FILE_URL + i.Image : toAbsoluteUrl("/media/images/new-thumb.png")} />
              </Link>
            </div>
            <div className="card-body">
              <Link to='/' className="card-title fw-bolder">{i?.Title ?? ''}</Link>
              <p className='card-time mb-0 text-truncate text-muted'>Ngày đăng : <span className='text-danger'>{moment(i?.DatePublish ?? '').format('HH:mm DD/MM/YYYY')}</span></p>
            </div>
          </div >
        ))}
      </div>
      <div className='pagination-page'>
        <Pagination defaultCurrent={page + 1} total={total} onChange={(num) => setPage(num - 1)} />
      </div>
    </>

  )
}

const NotifyWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: 'Trang chủ',
            path: '/',
            isActive: true,
            isSeparator: false
          }
        ]}
      >  Thông báo đấu giá
      </PageTitle>

      <NewPage />
    </>
  )
}

export { NotifyWrapper }
