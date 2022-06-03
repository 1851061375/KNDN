/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { requestGET_URL } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { useHistory, useParams, Link } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons"
import { toAbsoluteUrl } from '../../../_metronic/helpers'

import './newsDetail.scss'
import { DatePicker, Space, Tabs, Select, Spin, Image, Button, Row, Col } from 'antd'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PageTitle } from '../../../_metronic/layout/core'
import moment from 'moment'
import { OtherNews } from './components/otherNews'

const NewsDetailPage = () => {

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
            var res = await requestGET_URL(`${CONFIG.FILE_URL}/_layouts/15/td.auction.service/wcfservice.svc/article/${id}`);
            var _data = res?.data ?? {}
            setData(_data)
            setLoading(false)
        }
        fetchData()
        return () => {

        }
    }, [id])

    return (
        <>
            {loading ? <div className='container d-flex- justify-content-center align-items-center'><Spin></Spin></div> :
                <div className='container content-div'>
                    <div className='row portal-content'>
                        <div className='col-xl-8' id='content-main'>
                            <div className='content-header'>
                                <h4 className="text-primary fs-2">{data?.Title ?? ''}</h4>
                                <div style={{ color: "#777777" }} >
                                    <p><CalendarOutlined /> Ngày đăng công khai : {data?.DatePublish ? moment(data?.DatePublish).format("dd/MM/yyyy") : ""} | Chuyên mục: <Link to={"/news/cm"}></Link></p>
                                </div>
                                <hr />
                                <div>
                                    {
                                        data?.Image && data?.Image.length ?
                                            <>
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} sm={6} md={6}>
                                                        <Image style={{ "float": "left" }} src={CONFIG.FILE_URL + data?.Image} />
                                                    </Col>

                                                    <Col xs={24} sm={18} md={18}>
                                                        <div style={{ "font-weight": "bold" }} dangerouslySetInnerHTML={{ __html: data?.Comment }}>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </> : <></>
                                    }
                                </div>
                            </div>
                            <div className='content-body' dangerouslySetInnerHTML={{ __html: data?.Content }}>
                            </div>
                            <div className='content-footer' dangerouslySetInnerHTML={{ __html: data?.Footer }}>
                            </div>
                            <hr />
                            <div class="container content-div">
                                <Button type="primary" onClick={() => { history.goBack(); }}>Quay lại</Button>
                            </div>
                            <OtherNews />
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


const NewsDetailWrapper = () => {
    const intl = useIntl()
    let history = useHistory();
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
                    title: 'Tin tức',
                    path: 'news',
                    isActive: true,
                    isSeparator: false
                }
            ]}
            > Xem chi tiết
            </PageTitle>
            <NewsDetailPage />
        </>
    )
}


export { NewsDetailWrapper }

