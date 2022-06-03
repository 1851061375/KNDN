import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { AsideDefault } from './components/aside/AsideDefault'
import { Footer } from './components/Footer'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { Toolbar } from './components/toolbar/Toolbar'
import { ScrollTop } from './components/ScrollTop'
import { Content } from './components/Content'
import { PageDataProvider, useLayout } from './core'
import { useLocation } from 'react-router-dom'
import { ChartsWidgetHome } from '../partials/widgets/charts/ChartsWidgetHome'
import { LinkAdsRight } from './components/linkimage/LinkAdsRight'
import {
  SearchNavbar,
} from '../partials'
import { MenuComponent, SearchComponent } from '../assets/ts/components'
import clsx from 'clsx'
import { Navbar, Container, Nav, Modal, NavDropdown } from 'react-bootstrap-v5'
import { Affix, Dropdown, Menu } from 'antd'
import { DownOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'

import './style.scss'

import { checkIsActive, toAbsoluteUrl, KTSVG } from '../helpers'
import { LinkImageWrapper } from './components/linkimage/LinkImageWrapper'
import { BannerSliderHome } from './components/toolbar/BannerSliderHome'
import { BannerPage } from './components/toolbar/BannerPage'
import * as auth from '../../app/modules/auth/redux/AuthRedux'
import { Login } from './Login'
import { Registration } from './Registration'
import { ForgotPassword } from './ForgotPassword'
import { ChangePassword } from './ChangePassword'
import moment from 'moment'
import { useHistory } from "react-router-dom";

import { logout } from '../../app/modules/auth/redux/AuthCRUD'

const MasterLayout = ({ children }) => {
  const { classes } = useLayout()
  const dispatch = useDispatch()

  const accessToken = useSelector(({ auth }) => auth.accessToken)
  const user = useSelector(({ auth }) => auth.user)
  const location = useLocation();
  var history = useHistory();
  const { pathname } = location;
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [modalForgot, setModalForgot] = useState(false)
  const [modalChangePass, setModalChangePass] = useState(false)
  const [emailChangePass, setEmailChangePass] = useState('')

  const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  const handleLogOut = () => {
    logout(accessToken)
      .then(() => {
        dispatch(auth.actions.logout())
        localStorage.clear()
        sessionStorage.clear()
        setTimeout(() => {
          document.location.reload()
        }, 500)
      })
  }
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  const [date, setDate] = useState(moment().format("dddd"));
  const [dates, setDates] = useState(moment().format("DD/MM/yyyy"));
  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(moment().format("HH:mm:ss"))
    }, 1000)

    return () => clearInterval(secTimer);
  });
  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <div id="kt_header" className="header h-auto flex-column" data-kt-sticky="false" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
            <div className='head-top'>
              <div className='container'>
                <div className='row align-items-stretch justify-content-between'>
                  <div className='col-auto head-top-contact'>
                    <p className='m-0 py-1 text-truncate w-100'>Liên hệ:  Email: </p>
                  </div>
                  <div className='col-auto head-top-acount'>
                    {accessToken ?
                      <>
                        <Link to='/profile'>{user?.fullName ?? ''}</Link> |
                        <Link to="#" onClick={handleLogOut}>Đăng xuất</Link>
                      </>
                      :
                      <>
                        <Link to='' onClick={() => { setModalLogin(true) }}>Đăng nhập</Link> | <Link to='/signup'>Đăng ký</Link>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
            {/*begin::Container*/}
            <div className='header-content-contianer'>
              <div className="container-xxl d-flex flex-grow-1 flex-stack">
                {/*begin::Header Logo*/}
                <div className="d-flex align-items-center me-5">
                  <div className="logo-qh">
                    <Link to="/" className='d-flex align-items-center'>
                      <div className='logo w-125px'>
                        <img alt="Logo" src={toAbsoluteUrl('/media/logos/logo.svg')} className="img-fluid" />
                      </div>
                      <div className='logo-title'>
                        {/* <img alt="Logo" src={toAbsoluteUrl('/media/logos/logo-landing-dark.svg')} className="img-fluid" /> */}
                        <article>
                          <h1>CỔNG THÔNG TIN</h1>
                          <p>DOANH NGHIỆP NGÀNH CÔNG NGHIỆP</p>
                        </article>
                      </div>
                    </Link>
                  </div>
                </div>
                {/*end::Header Logo*/}
                {/*begin::Topbar*/}
                <div className="d-flex align-items-center">
                  {/*begin::Topbar*/}
                  <div className="d-flex align-items-center flex-shrink-0">

                    <div className='flex-grow-1 header-date-time'>
                      <span className='fs-2x fw-bolder text-danger ms-auto header-times'>{time}</span>
                      <span className='fs-6 text-gray-800 d-flex d-sm-block header-dates'><span>{Capitalize(date)}</span> <span>{dates}</span></span>
                    </div>

                  </div>
                  {/*end::Topbar*/}
                </div>
                {/*end::Topbar*/}
              </div>
            </div>
            {/*end::Container*/}
            {/*begin::Separator*/}
            <div className="separator w-100" />
            {/*end::Separator*/}
            {/*begin::Container*/}
            <Affix offsetTop={0}>
              <div className="header-menu-container w-100" id="kt_header_nav" style={{ backgroundImage: `url(${toAbsoluteUrl('/media/patterns/bg-navbar.svg')})` }}>
                <div className="d-flex container-xxl flex-row align-items-center justify-content-between">
                  <div className="me-auto navbar-nav">
                    <Menu mode="horizontal" selectedKeys={pathname} defaultSelectedKeys={['/home']}>
                      <Menu.Item key={"/home"}>
                        <Link to='/home'>Trang chủ</Link>
                      </Menu.Item>
                      <Menu.Item key={"/about"}>
                        <Link to='/about'>Giới thiệu</Link>
                      </Menu.Item>
                      <Menu.SubMenu key={"/database-system"} title={<Link to='/database-system'>Cơ sở dữ liệu <CaretDownOutlined /></Link>}>
                        <Menu.Item key={"/database-system/ckct"} onClick={() => { history.push("/database-system/ckct") }}>
                          Cơ khí chế tạo
                        </Menu.Item>
                        <Menu.Item key={"/database-system/dm"} onClick={() => { history.push("/database-system/dm") }}>
                          Dệt may
                        </Menu.Item>
                        <Menu.Item key={"/database-system/dg"}>
                          <Link to='/database-system/dg'>Da giày</Link>
                        </Menu.Item>
                        <Menu.Item key={"/database-system/ot"}>
                          <Link to='/database-system/ot'>Ô tô</Link>
                        </Menu.Item>
                        <Menu.Item key={"/database-system/dt"}>
                          <Link to='/database-system/dt'>Điện tử</Link>
                        </Menu.Item>
                      </Menu.SubMenu>
                      <Menu.Item key={"/news"}>
                        <Link to='/news'>Tin tức</Link>
                      </Menu.Item>
                      <Menu.Item key={"/maps"}>
                        <Link to='#'>Khai thác trên bản đồ</Link>
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>
              </div>
            </Affix>
            {/*end::Container*/}
          </div>
          {/*end::Header*/}
          {checkIsActive(pathname, '/home') ? <BannerSliderHome /> : <BannerPage />}
          <div className='wrapper-content py-6'>
            {checkIsActive(pathname, '/home')
              || checkIsActive(pathname, '/database-system')
              || checkIsActive(pathname, '/profile')
              || checkIsActive(pathname, '/news') ?
              <Content>{children}</Content>
              :

              <div className='container content-div'>

                <div className='row portal-content'>
                  <div className='col-md-9' id='content-main'>
                    {/* <Toolbar /> */}
                    {/* <ToolbarHeadSearch /> */}
                    <Content>{children}</Content>
                  </div>
                  <div className='col-md-3' id='content-right'>
                    <LinkImageWrapper />
                    <ChartsWidgetHome className='my-5' />
                  </div>
                </div>
              </div>
            }
          </div>
          <Footer />
        </div>
      </div>
      {/* Modal Login */}
      <Modal
        show={modalLogin}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setModalLogin(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <Login
            setModalLogin={setModalLogin}
            setModalRegister={setModalRegister}
            setModalForgot={setModalForgot}
          />
        </Modal.Body>
      </Modal>
      {/* Modal Forgot */}
      <Modal
        show={modalForgot}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setModalForgot(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <ForgotPassword
            setModalForgot={setModalForgot}
            setModalChangePass={setModalChangePass}
            setEmailChangePass={setEmailChangePass}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={modalChangePass}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setModalChangePass(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <ChangePassword
            setModalChangePass={setModalChangePass}
            setModalLogin={setModalLogin}
            emailChangePass={emailChangePass}
          />
        </Modal.Body>
      </Modal>
      <ScrollTop />
    </PageDataProvider >
  )
}

export { MasterLayout }
