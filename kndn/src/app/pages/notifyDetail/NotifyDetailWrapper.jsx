/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useEffect, useState, useRef } from 'react'
import { useIntl } from 'react-intl'
import { requestGET, requestPOST } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { useHistory, useParams } from "react-router-dom";
import { Button, OverlayTrigger, Popover } from 'react-bootstrap-v5'
import './NotifyDetail.scss'
import { Space, Tabs, Select, Spin, Image, InputNumber, Modal, Table } from 'antd'
import "react-multi-carousel/lib/styles.css";
import { PageTitle } from '../../../_metronic/layout/core'
import { LoadingOutlined } from '@ant-design/icons';



const antIconBlue = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const NotifyDetailPage = () => {
    const { id } = useParams()
    const { TabPane } = Tabs
    const { Option } = Select
    var history = useHistory();
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const [visibleModal, setVisibleModal] = useState(true);

    const columns = [
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
            title: 'Tên tài sản',
            dataIndex: 'Title',
            key: '1',
            align: 'center',
        },
        {
            title: 'Mã',
            dataIndex: 'Code',
            key: '2',
            align: 'center',
        },
        {
            title: 'File đính kèm',
            dataIndex: 'FileDinhKem',
            key: '3',
            align: 'center'
        }
    ]


      

    useEffect(() => {
        const fetchData = async () => {
            var res = await requestGET(`${CONFIG.GETWAY_PATH}/thongbao/${id}`);
            var _data = res?.data ?? []
            setItem(_data);
            setLoading(false);
            setVisibleModal(false);
        }

        fetchData()
        return () => {

        }

    }, [id])
    return (
        <>
            {loading ? <Spin spinning={loading}></Spin> :
                <div className='container content-div'>
                    <nav style={{ breadcrumbDivider: ">", marginBottom: "12px" }} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                            <li className="breadcrumb-item "><a href="/thong-bao-lua-chon-tcdg">Thông báo lựa chọn tổ chức ĐGTS</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Chi tiết</li>
                        </ol>
                    </nav>
                    <h2 style={{textTransform:"uppercase"}}>THÔNG BÁO LỰA CHỌN TỔ CHỨC ĐẤU GIÁ TÀI SẢN : {item?.Title ?? ""}</h2>
                    <div style={{ width: "100%" }}>
                        <div style={{ padding: "20px 0px 10px 10px", backgroundColor: "rgb(230 230 230)", borderRadius: "4px" }} >
                            <p>Ghi chú : {item?.Note ?? ""}</p>
                            <p>Ngày đăng công khai : {item?.PublicDate ?? ""}</p>
                        </div>
                    </div>
                    <div id="InformationOwner" >
                        <h6 style={{
                            color: "#999999",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            padding: "30px 0 20px",
                            fontWeight: "normal"
                        }}>
                            Thông tin của người có tài sản
                        </h6>
                        <p>Tên người có tài sản: <b>{item?.Asset?.OwnerUserName ?? ""}</b></p>
                        <p>Địa chỉ</p><b>{item?.DiaChiNguoiCoTaiSan ?? ""}</b>
                    </div>

                    <div id="InformationAsset">
                        <h6 style={{
                            color: "#999999",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            padding: "30px 0 20px",
                            fontWeight: "normal"
                        }}>
                            Thông tin tài sản bán đấu giá
                        </h6>
                        <Table dataSource={[item?.Asset]??[]} columns={columns}/>
                    </div>

                    <div id="InformationAsset">
                        <h6 style={{
                            color: "#999999",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            padding: "30px 0 20px",
                            fontWeight: "normal"
                        }}>
                            Thông tin tiếp nhận hồ sơ đăng ký tổ chức đấu giá
                        </h6>
                        <p>Thời gian tiếp nhận: <b>{item?.TimeReceive ?? ""}</b></p>
                        <p>Địa chỉ tiếp nhận hồ sơ: <b>{item?.Address ?? ""}</b></p>
                        <p>Thông tin liên hệ: <b>{item?.Contact ?? ""}</b></p>
                    </div>

                    <div id="InformationPoint">
                        <h6 style={{
                            color: "#999999",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            padding: "30px 0 20px",
                            fontWeight: "normal"
                        }}>
                            Thông tin về tiêu chí lựa chọn tổ chức đấu giá
                        </h6>
                        <p>File đính kèm</p><a target={"_blank"} href={'https://daugia.hanhchinhcong.net/' + item?.FileDinhKem }><b>{item?.FileDinhKem ?? ""}</b></a>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button onClick={() => {history.push("/tb-lua-chon-tcdg")}}>Quay lại</Button>
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
                    <span className='px-4 text-center'>Loading</span>
                </div>
            </Modal>
        </>
    )
}


const NotifyDetailWrapper = () => {
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
                    title: 'Danh sách thông báo lựa chọn TCĐG',
                    path: 'tb-lua-chon-tcdg',
                    isActive: true,
                    isSeparator: false
                }
            ]}
            >
                Chi tiết thông báo lựa chọn đấu giá tài sản
            </PageTitle>
            <NotifyDetailPage />
        </>
    )
}


export { NotifyDetailWrapper }

