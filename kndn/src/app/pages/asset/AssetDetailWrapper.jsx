/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useEffect, useState, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { requestGET, requestPOST } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { capitalizeFirstLetter } from '../../../helpers/ultis'
import GoogleMapReact from 'google-map-react';
import { useHistory, useParams } from "react-router-dom";
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { OverlayTrigger, Popover } from 'react-bootstrap-v5'

import './assetDetail.scss'
import { DatePicker, Space, Tabs, Select, Spin, Image, InputNumber, Modal } from 'antd'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PageTitle } from '../../../_metronic/layout/core'
import { AssetCounterTime } from './components/AssetCounterTime'
import moment from 'moment'
import { toast } from 'react-toastify'
import { TableList } from './components/TableList'
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getText } from 'number-to-text-vietnamese';

const antIcon = <LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />;

const antIconBlue = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const AssetDetailPage = () => {

    const { id } = useParams()

    const { TabPane } = Tabs
    const { Option } = Select
    let history = useHistory();
    const [fromdate, setFromDate] = useState('');
    const [enddate, setEndDate] = useState('');

    const { RangePicker } = DatePicker
    const accessToken = useSelector((state) => state.auth.accessToken)
    const user = useSelector((state) => state.auth.user)
    const connection = useSelector((state) => state.global.connection)
    const hubProxy = useSelector((state) => state.global.hubProxy)

    const [timeServer, setTimeServer] = useState('')
    const [timeRound, setTimeRound] = useState(-1)
    const [intervalId, setIntervalId] = useState(null)
    const [roundCurrent, setRoundCurrent] = useState(null)
    const [hideRound, setHideRound] = useState(false)

    const [data, setData] = useState({})
    const [price, setPrice] = useState(0)
    const [minPrice, setMinPrice] = useState(0)
    const [victoryPrice, setVictoryPrice] = useState(0)
    const [listImg, setListImg] = useState([])
    const [visibleImg, setVisibleImg] = useState(false);
    const [loading, setLoading] = useState(true)

    const [loadingDK, setLoadingDK] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [refreshTable, setRefreshTable] = useState(true)

    const [statusDK, setStatusDK] = useState('')

    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(1)
    const [loadingTable, setLoadingTable] = useState(true)
    const [dataTable, setDataTable] = useState([])

    const [loadingTG, setLoadingTG] = useState(false)

    const [loadingRG, setLoadingRG] = useState(false)

    const [visibleModal, setVisibleModal] = useState(true);

    const _columns = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            },
            width: 50,
        },
        {
            title: 'Gi?? tr???',
            dataIndex: 'Price',
            key: 'Price',
            align: 'center',
            render: (text, record, index) => {
                if (record?.Price < 0) return '********'
                return record?.Price?.toLocaleString() ?? ''
            }
        },
        {
            title: 'Th???i gian',
            dataIndex: 'Created',
            key: 'Created',
            align: 'center',
            render: (text, record, index) => {
                return moment(record?.Created ?? '').format('HH:mm DD/MM/YYYY')
            }
        },
        {
            title: 'Thao t??c',
            width: 100,
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        {index == 0 && accessToken && (record.UserID == user?.userid ?? 0) && data.Status === 'HAPPENING' && data?.Auction?.AuctionFormID == 1 ?
                            <a
                                className='btn btn-icon btn-bg-danger btn-sm me-1 mb-1'
                                data-toggle='m-tooltip'
                                title='R??t gi??'
                                onClick={() => loadingRG ? null : rutGia(record.SessionID)}
                            >
                                {loadingRG ? <Spin indicator={antIcon} ></Spin> : <i className='fa fa-trash text-white'></i>}

                            </a>
                            : <></>}
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            var res = await requestGET(`${CONFIG.GETWAY_PATH}/getcurrenttime`);
            var _timeServer = res?.data ?? {}
            setTimeServer(_timeServer)
            var res = await requestGET(`${CONFIG.GETWAY_PATH}/session/${id}`);
            var _data = res?.data ?? {}
            var _lst = _data?.Asset?.AlbumPhoto?.split('\n') ?? []
            _lst.pop()
            if (_data?.PriceVictory ?? 0 > 0) {
                setPrice(_data.PriceVictory)
                setMinPrice(_data.PriceVictory)
                setVictoryPrice(_data.PriceVictory)
            }
            else {
                setMinPrice(_data.PriceStarting)
                setPrice(_data.PriceStarting)
            }
            setData(_data)
            setListImg(_lst)
            if (accessToken) {
                var body = {
                    "sessionId": id,
                    "token": accessToken
                }
                var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/sessionuser/check`, body);
                var data2 = data1?.data ?? {}
                setStatusDK(data2)
                if (_data?.Auction?.AuctionFormID == 2 && _data.Status === 'HAPPENING' && data2 === 'APPROVED') {
                    var _roundCurrent = _data?.RoundCurrent ?? 1
                    setRoundCurrent(_roundCurrent)
                    var _TimeNow = moment(_timeServer ? _timeServer : '').format('X')
                    var _TimeEndRoundCurrent = moment(_data?.TimeStartCurrent ?? '').add(_data?.MinutePerRound ?? 0, 'minutes').format('X')
                    var duration = _TimeEndRoundCurrent - _TimeNow

                    if (duration > 0) {
                        setTimeRound(duration)
                    }
                    else setTimeRound(0)
                }
            }
            setLoading(false)
            setRefresh(false)
        }
        if (refresh) fetchData()
        return () => {

        }
    }, [refresh])

    const setCountTimeRound = async () => {
        if (timeRound > 0) {
            setTimeRound(counter => counter - 1);
        }
    }

    useEffect(() => {
        if (timeRound > 0) {
            setTimeout(() => {
                setCountTimeRound()
            }, 1000);
        }

        return () => {

        }
    }, [timeRound])


    useEffect(() => {
        if (id) setRefresh(true)
        return () => {

        }
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            setLoadingTable(true)
            var res = await requestGET(`${CONFIG.GETWAY_PATH}/sessionaction/list?skip=0&take=1000&q=&orderBy=&include=&sessionId=${id}&from=&to=&search=`);
            var _data = res?.data ?? []
            _data = _data.sort((a, b) => b.Price - a.Price)
            setDataTable(_data)
            setCount(res?.data ?? 0)
            setLoadingTable(false)
            setRefreshTable(false)
        }
        if (refreshTable) fetchData()
        return () => {

        }
    }, [refreshTable])

    useEffect(() => {
        if (accessToken && roundCurrent && dataTable && data?.Auction?.AuctionFormID == 2 && data?.Status === 'HAPPENING' && statusDK === 'APPROVED') {
            var _obj = dataTable.findIndex(i => i.RoundNumber === `${roundCurrent}` && i.UserID == user?.userid)
            if (_obj > -1) setHideRound(true)
            else setHideRound(false)
        }
        return () => {

        }
    }, [roundCurrent, dataTable])


    useEffect(() => {
        var hubProxy = null
        const fetchData = async () => {
            hubProxy = connection.createHubProxy('auctionRoom');
            hubProxy.on('reloadSessionAction', function (username, price, action, sessionID) {
                if (sessionID == id && user?.userid) {
                    toast.info(`Ng?????i d??ng ${username} v???a thao t??c ${action} s???n ph???m`)
                    if (price > 0 && data?.Auction?.AuctionFormID == 1) {
                        setMinPrice(price)
                        setVictoryPrice(price)
                    }
                    setRefreshTable(true)
                }
            });
            hubProxy.on('pauseSessionAction', function (sessionID) {
                if (sessionID == id && user?.userid) {
                    toast.warning(`Phi??n ?????u gi?? b??? t???m d???ng`)
                    setRefresh(true)
                }
            });
            hubProxy.on('startSessionAction', function (sessionID) {
                if (sessionID == id && user?.userid) {
                    toast.info(`Phi??n ?????u gi?? b???t ?????u`)
                    setRefresh(true)
                }
            });
            hubProxy.on('openSessionRound', function (sessionID, roundNumber, price) {
                if (sessionID == id && user?.userid) {
                    toast.info(`V??ng tr??? gi?? th??? ${roundNumber} b???t ?????u`)
                    Modal.confirm({
                        title: 'X??c nh???n tham gia v??ng ti???p theo',
                        icon: <CheckCircleOutlined />,
                        content: `V??ng tr??? gi?? th??? ${roundNumber} b???t ?????u, gi?? cao nh???t c???a v??ng th??? ${roundNumber - 1} l?? ${price?.toLocaleString() ?? ''}. Vui l??ng x??c nh???n b???n c?? ti???p t???c tham gia v??ng ti???p theo hay kh??ng?`,
                        okText: 'X??c nh???n',
                        cancelText: 'T??? ch???i',
                        onOk: () => {
                            setRefresh(true)
                            setRefreshTable(true)
                        },
                        onCancel: () => tuChoiRound(sessionID)
                    })
                }
            });
            hubProxy.on('endSessionAction', function (username, price, sessionID) {
                if (sessionID == id && user?.userid) {
                    toast.success(`Phi??n ?????u gi?? ???? k???t th??c. Ng?????i chi???n th???ng l?? ng?????i d??ng c?? t??i kho???n ${username} v???i gi?? tr??? l?? ${price?.toLocaleString() ?? ''}`)
                    if (user?.userName === username) {
                        Modal.confirm({
                            title: 'X??c nh???n tr??ng ?????u gi??',
                            icon: <CheckCircleOutlined />,
                            content: 'B???n l?? ng?????i chi???n th???ng trong phi??n ?????u gi?? n??y. Vui l??ng x??c nh???n ho???c t??? ch???i tr??ng ?????u gi??',
                            okText: 'X??c nh???n',
                            cancelText: 'T??? ch???i',
                            onOk: () => xacNhanTrung(sessionID),
                            onCancel: () => tuChoiTrung(sessionID, true)
                        })
                    }
                    else {
                        setRefresh(true)
                    }
                }
            });
            hubProxy.on('waitingConfirmSecond', function (username, sessionID) {
                if (sessionID == id && user?.userName === username && user?.userid) {
                    Modal.confirm({
                        title: 'X??c nh???n tr??ng ?????u gi??',
                        icon: <CheckCircleOutlined />,
                        content: 'B???n l?? ng?????i chi???n th???ng trong phi??n ?????u gi?? n??y. Vui l??ng x??c nh???n ho???c t??? ch???i tr??ng ?????u gi??',
                        okText: 'X??c nh???n',
                        cancelText: 'T??? ch???i',
                        onOk: () => xacNhanTrung(sessionID),
                        onCancel: () => tuChoiTrung(sessionID, false)
                    })
                }
            });
            connection.start({ withCredentials: false, transport: 'longPolling' })
                .done(result => {
                    console.log('Connected!', result.id)
                    setTimeout(() => {
                        toast.info('K???t n???i t???i phi??n ?????u gi?? th??nh c??ng')
                        setVisibleModal(false)
                    }, 1000);
                })
                .fail(e => {
                    console.log('Connection failed: ', e)
                    setTimeout(() => {
                        toast.error('K???t n???i t???i phi??n ?????u gi?? kh??ng th??nh c??ng')
                        setVisibleModal(false)
                    }, 1000);
                });
        }
        if (connection) fetchData()
        return () => {
            console.log("remove hub")
            if (hubProxy) {
                hubProxy.off('reloadSessionAction')
                hubProxy.off('pauseSessionAction')
                hubProxy.off('startSessionAction')
                hubProxy.off('endSessionAction')
                hubProxy.off('waitingConfirmSecond')
                hubProxy.off('openSessionRound')
            }
        }
    }, [connection])

    const xacNhanTrung = async (id) => {
        var body = {
            "token": accessToken,
            "sessionId": id,
            "status": "FINISHED"
        }
        var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/confirmVictory`, body);
        var _data = data1?.error?.code ?? 500;
        if (_data == 200) {
            toast.success('Thao t??c th??nh c??ng!')
            setRefresh(true);
        }
        else {
            toast.warning('X???y ra l???i trong qu?? tr??nh thao t??c!')
        }
    }

    const tuChoiTrung = async (id, isFirst) => {
        var body = {
            "token": accessToken,
            "sessionId": id,
            "status": isFirst ? "" : "WAITING_CONFIRM_SECOND"
        }
        var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/confirmVictory`, body);
        var _data = data1?.error?.code ?? 500;
        if (_data == 200) {
            toast.success('Thao t??c th??nh c??ng!')
            setRefresh(true);
        }
        else {
            toast.warning('X???y ra l???i trong qu?? tr??nh thao t??c!')
        }
    }

    const tuChoiRound = async (id) => {
        var body = {
            "sessionId": id,
            "token": accessToken
        }
        var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/sessionuser/deposition`, body);
        var _data = data1?.error?.code ?? 500;
        if (_data == 200) {
            toast.success('Thao t??c th??nh c??ng!')
            setRefresh(true)
            setRefreshTable(true)
        }
        else {
            toast.warning('X???y ra l???i trong qu?? tr??nh thao t??c!')
        }
    }

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 }
    };

    const dangKy = async () => {
        var check = window.confirm(`B???n c?? ch???c ch???n mu???n ????ng k?? ?????u gi?? t??i s???n n??y kh??ng?`)
        if (check) {
            setLoadingDK(true)
            var body = {
                "sessionId": data?.ID ?? 0,
                "title": "????ng k?? tham gia ?????u gi??",
                "token": accessToken
            }
            var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/sessionuser/add`, body);
            var _data = data1.error ? data1.error : {};
            if (_data && _data.code == 200) {
                toast.success('Thao t??c th??nh c??ng!')
                setLoadingDK(false);
                setRefresh(true);
            } else {
                setLoadingDK(false);
                toast.warning('X???y ra l???i trong qu?? tr??nh thao t??c!')
            }
        }
    }

    const traGia = async () => {
        var check = window.confirm(`B???n c?? ch???c ch???n mu???n tr??? gi?? t??i s???n n??y v???i gi?? l?? ${price?.toLocaleString() ?? ''}(${capitalizeFirstLetter(getText(price))}?????ng) kh??ng?`)
        if (check) {
            setLoadingTG(true)
            var body = {
                "SessionID": data?.ID ?? 0,
                "token": accessToken,
                "Price": price,
                "UnitPriceID": `${data?.UnitPriceID ?? 0}`,
                "IsDeleted": false,
                "ActionType": "Tr??? gi??"
            }
            if (data?.Auction?.AuctionFormID == 2) body.roundNumber = data?.RoundCurrent ?? 1
            var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/sessionaction/add`, body);
            var _data = data1.error ? data1.error : {};
            if (_data && _data.code == 200) {
                toast.success('Thao t??c th??nh c??ng!')
                setLoadingTG(false);
            } else {
                setLoadingTG(false);
                toast.warning('X???y ra l???i trong qu?? tr??nh thao t??c!')
            }
        }
    }

    const rutGia = async (ID) => {
        var check = window.confirm('B???n c?? ch???c ch???n mu???n r??t gi?? ?????i v???i t??i s???n n??y kh??ng?')
        if (check) {
            setLoadingRG(true)
            var body = {
                "SessionID": ID,
                "token": accessToken
            }
            var data1 = await requestPOST(`${CONFIG.GETWAY_PATH}/backprice`, body);
            var _data = data1.error ? data1.error : {};
            if (_data && _data.code == 200) {
                toast.success('Thao t??c th??nh c??ng!')
                setLoadingRG(false);
            } else {
                setLoadingRG(false);
                toast.warning('X???y ra l???i trong qu?? tr??nh thao t??c!')
            }
        }
    }

    return (
        <>
            {loading ? <Spin></Spin> :
                <div className='container content-div'>
                    <div className='row portal-content'>
                        <div className='col-xl-8' id='content-main'>
                            <h4 className="text-primary fs-2 page-title">{data?.Asset?.Title ?? ''}</h4>
                            <p className='page-subtitle'>Ng??y t???o: <span className='fw-bold'>{moment(data?.Created ?? '').format('HH:mm DD/MM/YYYY')}</span></p>
                            <div className='auction-contents'>

                                <div className='card card-custom card-stretch gutter-b mb-3 card-auction-detail'>
                                    <div className='card-header border-0 pt-5'>
                                        <div className='card-title align-items-start flex-column'>TH??NG TIN CH??? T??I S???N</div>
                                    </div>
                                    <div className="card-body table-responsive dataTables_wrapper">
                                        <table className='table table-bordered dataTable no-footer dtr-inline table-auction-detail'>
                                            <tbody>
                                                <tr>
                                                    <td className='bg-light fw-bold'>T??n ch??? t??i s???n</td>
                                                    <td>{data?.Asset?.OwnerUser?.Name ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>?????a ch???</td>
                                                    <td>{data?.Asset?.OwnerUser?.Address ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>S??? ??i???n tho???i</td>
                                                    <td>{data?.Asset?.OwnerUser?.Mobile ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Email</td>
                                                    <td>{data?.Asset?.OwnerUser?.Email ?? ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='card card-custom card-stretch gutter-b mb-3 card-auction-detail'>
                                    <div className='card-header border-0 pt-5'>
                                        <div className='card-title align-items-start flex-column'>TH??NG TIN T??I S???N ?????U GI??</div>
                                    </div>
                                    <div className="card-body table-responsive dataTables_wrapper">
                                        <table className='table table-bordered dataTable no-footer dtr-inline table-auction-detail'>
                                            <tbody>
                                                <tr>
                                                    <td className='bg-light fw-bold'>M?? t??i s???n</td>
                                                    <td>{data?.Code ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Ph?? ????ng k?? tham gia ?????u gi??</td>
                                                    <td>{data?.PriceDocument?.toLocaleString() ?? ''} {data?.UnitPrice?.Title ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>B?????c gi??</td>
                                                    <td>{data?.PriceStep?.toLocaleString() ?? ''} {data?.UnitPrice?.Title ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Ti???n ?????t tr?????c</td>
                                                    <td>{data?.PriceDeposit?.toLocaleString() ?? ''} {data?.UnitPrice?.Title ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Ph????ng th???c ?????u gi??</td>
                                                    <td>{data?.Auction?.AuctionMethod?.Title ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>N??i xem t??i s???n</td>
                                                    <td>{data?.Asset?.Address ?? ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className='bg-light fw-bold'>Th???i gian xem t??i s???n</td>
                                                    <td>{data?.Asset?.ViewingTime ?? ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="d-flex flex-column flex-lg-row align-items-center py-5">
                                            <b className='fs-4 '>Gi?? kh???i ??i???m: <span className='fs-2 text-danger'>{data?.PriceStarting?.toLocaleString() ?? ''} </span>{data?.UnitPrice?.Title ?? ''}</b>
                                            {accessToken && user.userid && data.ID && statusDK === 'DRAFT' && data.Status === 'UPCOMING' ?
                                                <button className='btn btn-danger min-w-200px py-2 ms-lg-5' onClick={() => loadingDK ? null : dangKy()} >
                                                    {loadingDK ? <Spin indicator={antIcon} ></Spin> : <>????ng k?? ?????u gi??</>}
                                                </button>
                                                : <></>
                                            }
                                            {accessToken && user.userid && data.ID && statusDK === 'UPCOMING' && data.Status === 'UPCOMING' ?
                                                <button className='btn btn-secondary min-w-200px py-2 ms-lg-5' >
                                                    ????ng k?? ??ang ch??? duy???t
                                                </button>
                                                : <></>
                                            }
                                        </div>

                                        {accessToken && user.userid ?
                                            <>
                                                {data.Status === 'HAPPENING' && statusDK === 'APPROVED' ?
                                                    <>
                                                        <b className='fs-4 '>?????t gi??:</b>
                                                        <div className="d-flex align-items-center">
                                                            <a
                                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mx-1'
                                                                title='Gi???m'
                                                                style={{ minWidth: 35 }}
                                                                onClick={() => {
                                                                    if (price > data?.PriceStarting ?? 0) {
                                                                        setPrice(price - data?.PriceStep ?? 0)
                                                                    }
                                                                }}
                                                            >
                                                                <i className='fa fa-minus'></i>
                                                            </a>
                                                            <InputNumber
                                                                className='w-300px rounded'
                                                                controls={false}
                                                                min={minPrice}
                                                                value={price}
                                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                                size='large'
                                                                readOnly
                                                            />
                                                            <a
                                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mx-1'
                                                                title='T??ng'
                                                                style={{ minWidth: 35 }}
                                                                onClick={() => setPrice(price + data?.PriceStep ?? 0)}
                                                            >
                                                                <i className='fa fa-plus'></i>
                                                            </a>
                                                            {timeRound == 0 || hideRound ? <></> :
                                                                <button className='btn btn-danger min-w-200px py-2 ms-lg-5' onClick={() => loadingTG ? null : traGia()}>
                                                                    {loadingTG ? <Spin indicator={antIcon} ></Spin> : <><i className='fa fa-gavel'></i> Tr??? gi??</>}
                                                                </button>
                                                            }
                                                        </div>
                                                        <div className='text-muted mt-1 fs-6'>
                                                            {capitalizeFirstLetter(getText(price))} ?????ng
                                                        </div>
                                                        {data?.Auction?.AuctionFormID == 1 && data?.Auction?.AuctionMethodID == 1 ?
                                                            <b className='fs-4 '>Gi?? cao nh???t hi???n t???i: <span className='fs-2 text-danger'>{victoryPrice?.toLocaleString() ?? ''} </span>{data?.UnitPrice?.Title ?? ''}</b>
                                                            : <></>
                                                        }
                                                        {data?.Auction?.AuctionFormID == 2 && data?.Auction?.AuctionMethodID == 1 ?
                                                            <div className='d-flex justify-content-between'>
                                                                <b className='fs-4 '>V??ng tr??? gi?? hi???n t???i: <span className='fs-2 text-danger'>{data?.RoundCurrent ?? 1} </span></b>
                                                                <b className='fs-4 '>Th???i gian tr??? gi?? c??n l???i c???a v??ng: <span className='fs-2 text-danger'>{timeRound > 0 ? timeRound : '???? k???t th??c'} </span></b>
                                                            </div>
                                                            : <></>
                                                        }
                                                    </>
                                                    : <></>}
                                            </> : <></>}

                                    </div>
                                </div>

                                <div className='card card-custom card-stretch gutter-b mb-3 card-auction-detail'>
                                    <div className='card-header border-0 pt-5'>
                                        <div className='card-title align-items-start flex-column'>L???CH S??? TR??? GI??</div>
                                    </div>
                                    <div className="card-body table-responsive dataTables_wrapper">
                                        <TableList
                                            dataTable={dataTable}
                                            columns={_columns}
                                            isPagination={true}
                                            size={size}
                                            count={count}
                                            offset={offset}
                                            setOffset={setOffset}
                                            setSize={setSize}
                                            loading={loadingTable}
                                        />
                                    </div>
                                </div>

                                <a className='btn btn-primary min-w-100px py-2' onClick={() => history.goBack()} >Quay l???i</a>

                            </div>
                        </div>
                        <div className='col-xl-4 mt-5 mt-md-0' id='content-right'>
                            <div className='bg-primary p-3 rounded auction-detail-counter'>
                                {data.Status === 'HAPPENING' || data.Status === 'UPCOMING' ?
                                    <>
                                        <p className="text-center fw-bolder text-white">Th???i gian ?????m ng?????c {data.Status === 'HAPPENING' ? 'k???t th??c' : 'b???t ?????u'} tr??? gi??</p>
                                        <AssetCounterTime EndTime={data.Status === 'HAPPENING' ? data.EndTime : data.StartTime} TimeServer={timeServer} />
                                    </>
                                    : <></>
                                }
                                <div className='d-flex align-items-center auction-date-register date-start mt-6'>
                                    <div className='col date-label'>
                                        <p className="text-white">Th???i gian m??? ????ng k??</p>
                                        <b>{moment(data?.RegisterDateFrom ?? '').format('DD/MM/YYYY')}</b>
                                    </div>
                                    <div className='col-auto time-label'>
                                        <span className='fa fa-clock'></span>
                                        <b className='row fw-bolder'>{moment(data?.RegisterDateFrom ?? '').format('HH:mm')}</b>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center auction-date-register'>
                                    <div className='col date-label'>
                                        <p className="text-white">Th???i gian k???t th??c ????ng k??</p>
                                        <b>{moment(data?.RegisterDateTo ?? '').format('DD/MM/YYYY')}</b>
                                    </div>
                                    <div className='col-auto time-label'>
                                        <span className='fa fa-clock'></span>
                                        <b className='row fw-bolder'>{moment(data?.RegisterDateTo ?? '').format('HH:mm')}</b>
                                    </div>
                                </div>

                                <div id="main-slide" className="carousel slide mt-8" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <Carousel
                                            responsive={responsive}
                                            additionalTransfrom={0}
                                            arrows
                                            autoPlaySpeed={3000}
                                            centerMode={false}
                                            className=""
                                            dotListClass=""
                                            draggable
                                            focusOnSelect={false}
                                            infinite
                                            itemClass=""
                                            keyBoardControl
                                            minimumTouchDrag={80}
                                            renderButtonGroupOutside={false}
                                            renderDotsOutside={false}
                                            showDots
                                            sliderClass=""
                                            slidesToSlide={1}
                                            swipeable
                                        >
                                            {listImg.map((j, index) => (
                                                <div className="carousel-item active" key={index}>
                                                    <Image
                                                        className="d-block w-100 h-auto"
                                                        preview={{ visibleImg: false }}
                                                        src={CONFIG.FILE_URL + j}
                                                        onClick={() => setVisibleImg(true)}
                                                    />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Modal
                title={null}
                visible={visibleModal}
                footer={null}
                closable={false}
                centered
            >
                <div className='d-flex align-items-center justify-content-center p-6'>
                    <Spin indicator={antIconBlue} ></Spin>
                    <span className='px-4 text-center'>??ang k???t n???i t???i phi??n ?????u gi??</span>
                </div>
            </Modal>
        </>
    )
}


const AssetDetailWrapper = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[
                {
                    title: 'Trang ch???',
                    path: '/',
                    isActive: true,
                    isSeparator: false
                }
            ]}
            >
                Chi ti???t t??i s???n ?????u gi??
            </PageTitle>
            <AssetDetailPage />
        </>
    )
}


export { AssetDetailWrapper }

