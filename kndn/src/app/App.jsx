import React, { Suspense, useState, useEffect, useRef } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { Routes } from './routing/Routes'
import AuthInit from './modules/auth/redux/AuthInit'
import { ToastContainer } from 'react-toastify'
import { hubConnection } from 'aspnet-signalr-reactjs';
import { useDispatch, useSelector } from 'react-redux'
import {CONFIG} from '../helpers/config'

import * as actions from '../setup/redux/global/Actions' 

import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

const App = ({ basename }) => {

  const connection = useSelector((state) => state.global.connection)

  const dispatch = useDispatch()

  useEffect(() => {
    const newConnection = hubConnection(`/signalr`, { useDefaultPath: false });
    dispatch(actions.setConnection(newConnection))
  }, []);

  useEffect(() => {
    if (connection) {
      
    }
  }, [connection]);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <HashRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Routes />
              <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </HashRouter>
    </Suspense>
  )
}

export { App }
