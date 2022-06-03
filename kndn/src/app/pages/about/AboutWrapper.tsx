/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { requestPOST } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'

// import './faqdetail.scss'

const AboutPage = () => {
  return (
    <>
    <div className='row align-items-center'>
        <div className='col-lg-7'>
            <h4 className="text-primary pb-5 text-uppercase">Hệ thống cổng thông tin kết nối doanh nghiệp ngành công nghiệp</h4>
        </div>
        <div className="col-lg-5">
            <img src={toAbsoluteUrl('/media/articles/4305188.png')} className='img-fluid my-5' alt='' />
        </div>
    </div>
    </>
  )
}

const AboutWrapper = () => {
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
      >  Giới thiệu
      </PageTitle>
      <AboutPage />
    </>
  )
}

export { AboutWrapper }
