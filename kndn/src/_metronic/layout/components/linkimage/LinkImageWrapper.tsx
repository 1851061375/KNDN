/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link } from 'react-router-dom'
import {toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'

export function LinkImageWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config

  return (
    <div className='card card-linkimg bg-transparent'>
      <Link to={'/'} className='w-100 mb-3 link-img'>
        <img src={toAbsoluteUrl('/media/images/link1.png')} alt="Liên hệ" className="img-fluid w-100" />
      </Link>
      <Link to={'/'} className='w-100 mb-3 link-img'>
        <img src={toAbsoluteUrl('/media/images/link2.png')} alt="Hướng dẫn công khai" className="img-fluid w-100" />
      </Link>
      <Link to={'/'} className='w-100 mb-0 link-img'>
        <img src={toAbsoluteUrl('/media/images/link3.png')} alt="Phản ánh" className="img-fluid w-100" />
      </Link>
    </div>
  )
}
