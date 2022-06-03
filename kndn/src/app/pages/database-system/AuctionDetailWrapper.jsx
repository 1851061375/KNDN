/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { AuctionAssets } from './components/AuctionAssets '
import { useHistory, useParams } from "react-router-dom";
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { OverlayTrigger, Popover } from 'react-bootstrap-v5'

import './auctionDetail.scss'
import { DatePicker, Space, Tabs, Select, Spin, Image } from 'antd'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PageTitle } from '../../../_metronic/layout/core'
import moment from 'moment'


const AuctionDetailPage = () => {

    const { id } = useParams()

    const { TabPane } = Tabs
    const { Option } = Select
    let history = useHistory();
    const [fromdate, setFromDate] = useState('');
    const [enddate, setEndDate] = useState('');

    const { RangePicker } = DatePicker
    const accessToken = useSelector((state) => state.auth.accessToken)
    const user = useSelector((state) => state.auth.user)

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            var res = await requestGET(`${CONFIG.GETWAY_PATH}/auction/${id}`);
            var _data = res?.data ?? {}
            setData(_data)
            setLoading(false)
        }
        fetchData()
        return () => {

        }
    }, [])

    return (
        <>
            {loading ? <div className='container d-flex- justify-content-center align-items-center'><Spin></Spin></div> :
                <div className='container content-div'>
                    <div className='row portal-content'>
                        <div className='col-xl-8' id='content-main'>
                            <h4 className="text-primary fs-2 page-title">{data?.Title ?? ''}</h4>
                            <div className='auction-contents'>

                                <div className='card card-custom card-stretch gutter-b mb-3 card-auction-detail'>
                                    <div className='card-header border-0 pt-5'>
                                        <div className='card-title align-items-start flex-column'>Thông tin cuộc đấu giá</div>
                                    </div>
                                    <div className="card-body table-responsive dataTables_wrapper">
                                        <table className='table table-bordered dataTable no-footer dtr-inline table-auction-detail'>
                                            <tbody>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Mã cuộc đấu giá</td>
                                                    <td>{data?.Code ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Đấu giá viên</td>
                                                    <td>{data?.Auctioner?.User?.Name ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Hình thức đấu giá</td>
                                                    <td>{data?.AuctionForm?.Title ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Phương thức đấu giá</td>
                                                    <td>{data?.AuctionMethod?.Title ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Số lượng tài sản</td>
                                                    <td>{data?.AssetNumber ?? ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <AuctionAssets assets={data?.Sessions ?? ''}/>

                                <a className='btn btn-primary min-w-100px py-2' onClick={() => history.goBack()} >Quay lại</a>

                            </div>
                        </div>
                        <div className='col-xl-4 mt-5 mt-md-0' id='content-right'>
                            <div className='bg-primary p-3 rounded auction-detail-counter '>
                                <p className="text-center fw-bolder text-white">Thời gian đếm ngược bắt đầu trả giá</p>
                                <div className='d-flex align-items-center auction-date-register date-start'>
                                    <div className='col date-label'>
                                        <p className="text-white">Thời gian mở đăng ký</p>
                                        <b>{moment(data?.StartTime ?? '').format('DD/MM/YYYY')}</b>
                                    </div>
                                    <div className='col-auto time-label'>
                                        <span className='fa fa-clock'></span>
                                        <b className='row fw-bolder'>{moment(data?.StartTime ?? '').format('HH:mm')}</b>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center auction-date-register'>
                                    <div className='col date-label'>
                                        <p className="text-white">Thời gian kết thúc đăng ký</p>
                                        <b>{moment(data?.EndTime ?? '').format('DD/MM/YYYY')}</b>
                                    </div>
                                    <div className='col-auto time-label'>
                                        <span className='fa fa-clock'></span>
                                        <b className='row fw-bolder'>{moment(data?.EndTime ?? '').format('HH:mm')}</b>
                                    </div>
                                </div>
                                <Image
                                    className="d-block w-100 h-auto mt-6"
                                    preview
                                    src={CONFIG.FILE_URL + data.Image}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


const AuctionDetailWrapper = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[
                {
                    title: 'Trang chủ',
                    path: '/',
                    isActive: true,
                    isSeparator: false
                },
                {
                    title: 'Cuộc đấu giá',
                    path: 'danh-sach-dau-gia',
                    isActive: true,
                    isSeparator: false
                }
            ]}
            >
                Chi tiết cuộc đấu giá
            </PageTitle>
            <AuctionDetailPage />
        </>
    )
}


export { AuctionDetailWrapper }

