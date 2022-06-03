/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { Header } from './Header'

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout()
  const { header, aside } = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      data-kt-sticky='true'
      data-kt-sticky-name='header'
      data-kt-sticky-offset="{default: '200px', lg: '300px'}"
      {...attributes.headerMenu}
    >
      <div className={clsx(classes.headerContainer.join(' '), 'd-flex align-items-center')}>
        
      </div>
    </div>
  )
}
