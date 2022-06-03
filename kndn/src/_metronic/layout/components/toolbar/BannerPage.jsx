
import React, { useState } from 'react'
import './bannerSliderHome.scss'
import { toAbsoluteUrl } from '../../../helpers'
import { DefaultTitleAuction } from '../header/page-title/DefaultTitleAuction'

const BannerPage = () => {

  return (
    
    <div className='contianer-fluid h-auto banner-slide-home banner-slide-page d-flex py-2 py-lg-4 min-h-60px'>
      <div className='container baner-forms p-0'>
        <div className='page-breadscrumb pt-3 fs-5 pt-lg-4 text-center'>
            <DefaultTitleAuction />
        </div>
      </div>
      <div style={{backgroundImage: `url(${toAbsoluteUrl('/media/sliders/online-auction-bg.jpg')})`}} className='slide-bg'></div>
    </div>
  )
}
export {BannerPage}
