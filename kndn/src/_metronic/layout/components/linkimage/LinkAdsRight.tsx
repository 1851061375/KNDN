import React from 'react'
import { toAbsoluteUrl } from '../../../helpers'

export function LinkAdsRight() {
    return (
        <div className="widget widget-Links mt-5">
            <div className="widget-content no-padding">
                <div className="widget-content-inner">
                    <div className="tandan-div-module-links-img TD-link-img">
                        <a href="http://haiduong.gov.vn/Trang/Default.aspx" title="" target="_blank">
                            <img alt="" src={toAbsoluteUrl("/media/logos/link-adsright.jpg")} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}