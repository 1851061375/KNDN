import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { NotifyWrapper } from '../pages/notify/NotifyWrapper'
import { SendFeedbackWrapper } from '../pages/sendFeedback/SendFeedbackWrapper'
import { FaqDetailWrapper } from '../pages/thong-tin-phan-anh/FaqDetailWrapper'
import { SignupWrapper } from '../pages/auth/SignupWrapper'
import { AboutWrapper } from '../pages/about/AboutWrapper'
import { DatabaseSystemWrapper } from '../pages/database-system/DatabaseSystemWrapper'
import { InteractWrapper } from '../pages/interact/InteractWrapper'
import { NewWrapper } from '../pages/news/NewWrapper'
import { NewsDetailWrapper } from '../pages/news/NewsDetailWrapper'
import { ProfileWrapper } from '../pages/auth/ProfileWrapper'
import { AssetDetailWrapper } from '../pages/asset/AssetDetailWrapper'
import { NotifyOrganizationWrapper } from '../pages/notifyOrganization/NotifyOrganizationWrapper'
import { NotifyDetailWrapper } from '../pages/notifyDetail/NotifyDetailWrapper'

// import {StatisticalWrapper} from '../pages/statistical/StatisticalWrapper';

export function PrivateRoutes() {
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/home' component={DashboardWrapper} />
        <Route path='/about' component={AboutWrapper} />
        <Route path='/feedback' component={SendFeedbackWrapper} />
        <Route path='/thong-tin-phan-anh/:id' component={FaqDetailWrapper} />
        <Route path='/tai-san-dau-gia/:id' component={AssetDetailWrapper} />
        <Route path='/database-system/:lv' component={DatabaseSystemWrapper} />
        <Route path='/database-system' component={DatabaseSystemWrapper} />
        <Route path='/thong-bao' component={NotifyWrapper} />
        <Route path='/newsdetail/:id' component={NewsDetailWrapper} />
        <Route path='/news' component={NewWrapper} />
        <Route path='/profile' component={ProfileWrapper} />
        <Route path='/tb-lua-chon-tcdg' component={NotifyOrganizationWrapper} />
        <Route path='/chi-tiet-thong-bao-lua-chon-tcdg/:id' component={NotifyDetailWrapper} />
        <Route path='/signup' component={SignupWrapper} />
        <Route path='/tuong-tac/:id' component={InteractWrapper} />
        <Redirect exact from='/' to='/home' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
