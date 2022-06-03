import {FC, useRef, useEffect, useState} from 'react'
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import * as auth from './AuthRedux'
import {RootState} from '../../../../setup'

const mapState = (state: RootState) => ({auth: state.auth})
const connector = connect(mapState, auth.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  useEffect(() => {
    setShowSplashScreen(false)
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
