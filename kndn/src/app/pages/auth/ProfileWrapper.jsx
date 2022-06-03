/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import moment from 'moment'
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {requestPOST} from '../../../helpers/baseAPI'
import {CONFIG} from '../../../helpers/config'
import {checkIsActive, KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Navbar, Container, Nav, Modal} from 'react-bootstrap-v5'
import {useDispatch, useSelector} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import * as auth from '../../modules/auth/redux/AuthRedux'
import {register} from '../../modules/auth/redux/AuthCRUD'
import {toast} from 'react-toastify'
import {Link, useHistory, Redirect, Switch, Route, useLocation} from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { NotifyUser } from './components/NotifyUser'
import { NavbarUser } from './components/NavbarUser'
import { ProfileUser } from './components/ProfileUser'
import { AuctionUser } from './components/AuctionUser'
import { AssetAuctionUser } from './components/AssetAuctionUser'
import { DocumentUser } from './components/DocumentUser'

const ProfilePage = () => {
  const history = useHistory()
  const location = useLocation()
  const {pathname} = location
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    
  },)
  return (
    <>
      <Switch>
        <Route path='/profile/thong-bao-ca-nhan'>
          <NotifyUser />
        </Route>
        <Route path='/profile/thong-tin-tai-khoan'>
          <ProfileUser />
        </Route>
        <Route path='/profile/cuoc-dau-gia-cua-toi'>
          <AuctionUser />
        </Route>
        <Route path='/profile/tai-san-dau-gia-ca-nhan'>
          <AssetAuctionUser />
        </Route>
        <Route path='/profile/tai-lieu-cua-toi'>
          <DocumentUser />
        </Route>

        <Redirect from='/profile' exact={true} to='/profile/thong-tin-tai-khoan' />
        <Redirect to='/profile' />
      </Switch>
    </>
  )
}

const ProfileWrapper = () => {
  const accessToken = useSelector((state) => state.auth.accessToken)
  return !accessToken ? (
    <>
      <Switch>
        <Redirect from='/profile' exact={true} to='/home' />
      </Switch>
    </>
  ) : (
    <>
      <PageTitle breadcrumbs={[
        {
          title: 'Trang chủ',
          path: '/',
          isActive: true,
          isSeparator: false
        }
      ]}
      >
          Thông tin cá nhân
      </PageTitle>
      <ProfilePage />
    </>
  )
}

export {ProfileWrapper}
