/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { PageTitle } from '../../../_metronic/layout/core'
import * as actions from '../../../setup/redux/global/Actions'
import { Item } from './components/Item'

import './DatabaseSystemWrapper.scss'
import { DatePicker, Space, Tabs, Select, Pagination, Input } from 'antd'
import moment from 'moment'
import { IsNullOrUndefined } from '../../../helpers/ultis';

const DatabaseSystemPage = () => {
  document.title = "Hệ thống cơ sở dữ liệu";
  const { lv } = useParams();
  const dispatch = useDispatch();
  const { TabPane } = Tabs
  const { Option } = Select
  const [viewDataList, setViewDataList] = useState(true);

  const { RangePicker } = DatePicker
  const accessToken = useSelector((state) => state.auth.accessToken)
  const user = useSelector((state) => state.auth.user)
  const linhVucs = CONFIG.LINHVUCS;
  const searchFormData = useSelector((state) => state.global.searchFormData);

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [order, setOrder] = useState("")
  const [linhVuc, setLinhVuc] = useState("")
  const [tinh, setTinh] = useState("")
  const [searchStr, setSearchStr] = useState("")
  const [type, setType] = useState(1)
  const [headName, setHeadName] = useState("Hệ thống cơ sở dữ liệu")
  const pageSize = 10;
  
  useEffect(() => {
    if (lv) {
      setLinhVuc(lv);
    }
    let name = ""
    if (type == 1) {
      name = "csdl doanh nghiệp";
    }
    else if (type == 2) {
      name = "csdl sản phẩm";
    }
    const fetchData = async () => {
      let res;
      if (searchFormData != null && !(IsNullOrUndefined(searchFormData.searchStr) && IsNullOrUndefined(searchFormData.linhVuc) && IsNullOrUndefined(searchFormData.tinh))) {
        res = await api(searchFormData.type, searchFormData.searchStr, order, searchFormData.linhVuc, searchFormData.tinh);
        dispatch(actions.setSearchFormData({}));
      }
      else {
        res = await api(type, searchStr, order, lv || linhVuc, tinh);
      }
      let _data = res?.data ?? []
      setData(_data)
      setTotal(res?.count ?? 0)
      setRefresh(false)
    }
    setHeadName(name + "" + (lv && lv.length ? " lĩnh vực " + linhVucs[lv] : ""));
    if (refresh) {
      fetchData()
    }
    return () => {

    }
  }, [page, refresh, lv])

  const api = (type = 1, searchStr = "", order = "", linhVuc = "", tinh = "") => {
    if (type == 1) {
      return requestGET(`${CONFIG.GETWAY_PATH}/auction/list?skip=${page * pageSize}&take=${pageSize}&q=${searchStr}&orderBy=${order}&include=&search=${searchStr}&linhvuc=${linhVuc}&tinh=${tinh}`);
    }
    else if (type == 2) {
      return requestGET(`${CONFIG.GETWAY_PATH}/auction1/list?skip=${page * pageSize}&take=${pageSize}&q=${searchStr}&orderBy=${order}&include=&search=${searchStr}&linhvuc=${linhVuc}&tinh=${tinh}`);
    }
  }

  return (
    <>
      <div className='container content-div'>
        <div className='row portal-content'>
          <div className='col-xl-9'>
            <div className="card card-search-tabs mb-6 shadow-sm">
              <Tabs defaultActiveKey={searchFormData?.type || 1} type="card" onTabClick={(key) => { setType(key) }}>
                <TabPane tab="Tìm kiếm doanh nghiệp" key="1">
                </TabPane>
                <TabPane tab="Tìm kiếm sản phẩm" key="2">
                </TabPane>
              </Tabs>
              <div className="card-body p-3 p-xl-6 pt-xl-2">
                <div className='row'>
                  <div className='col'>
                    {
                      lv && lv.length ?
                        <>
                          <Select defaultValue={lv} disabled={true} placeholder="Lĩnh vực" onChange={(val) => setLinhVuc(val)} allowClear style={{ width: '100%' }}>
                            {
                              linhVucs != null ?
                                Object.keys(linhVucs).map(key => (
                                  <Option value={key}>{linhVucs[key]}</Option>
                                )) : <></>
                            }
                          </Select>
                        </> : <>
                          <Select defaultValue={searchFormData?.linhVuc} placeholder="Lĩnh vực" onChange={(val) => setLinhVuc(val)} allowClear style={{ width: '100%' }}>
                            {
                              linhVucs != null ?
                                Object.keys(linhVucs).map(key => (
                                  <Option value={key}>{linhVucs[key]}</Option>
                                )) : <></>
                            }
                          </Select></>
                    }
                  </div>
                  <div className='col'>
                    <Select defaultValue={searchFormData?.tinh} placeholder="Tỉnh thành" onChange={(val) => setTinh(val)} allowClear style={{ width: '100%' }}>
                      <Option value="1">Hà Nội</Option>
                      <Option value="12">TP. Hồ Chí Minh</Option>
                    </Select>
                  </div>
                  <div className='col'>
                    <Input defaultValue={searchFormData?.searchStr || ""} type="text" onChange={(val) => setSearchStr(val.target.value)} className="form-control" placeholder="Từ khoá tìm kiếm" />
                  </div>
                  <div className='col'>
                    <button onClick={() => setRefresh(true)} className='btn btn-danger btn-slide-search'><span className='fa fa-search'></span> Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='card card-xl-stretch bg-transparent mb-6 shadow-none'>
              <div className="card-header px-0 border-bottom border-primary">
                <div className='card-title fw-bolder text-primary text-uppercase'>{headName}</div>
                <div className='card-toolbar'>
                  <div className='d-flex flex-wrap my-1'>
                    <ul className='nav nav-pills me-6 mb-2 mb-sm-0'>
                      <li className='nav-item m-0'>
                        <a className={`btn btn-sm btn-icon btn-${viewDataList === false ? 'danger' : 'white border border-gray-400 btn-active-light-primary'}`} onClick={() => setViewDataList(!viewDataList)} title='Hiển thị dạng lưới'><span className='fas fa-border-all fa-fw'></span></a>
                      </li>
                      <li className='nav-item ms-1'>
                        <a className={`btn btn-sm btn-icon btn-${viewDataList === true ? 'danger' : 'white border border-gray-400 btn-active-light-primary'}`} onClick={() => setViewDataList(!viewDataList)} title='Hiển thị dạng danh sách'><span className='fas fa-list fa-fw'></span></a>
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex">
                    <Select name="select2_input" onChange={(val) => setOrder(val)} placeholder="Sắp xếp theo" allowClear="true" size={'middle'}>
                      <Option value="Time">Thời gian diễn ra</Option>
                      <Option value="Status">Trạng thái</Option>
                      <Option value="Price">Giá khởi điểm</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            {
              total === 0 ?
                <>
                  <i>Không tìm thấy dữ liệu!</i>
                </> :
                (
                  viewDataList === true ?
                    <>
                      {data.map((i) => (
                        <Item detail={i} key={i.ID} type={type} />
                      ))}
                    </>
                    :
                    <>
                      <div className="row">
                        {data.map((i) => (
                          <div className="col-12 col-md-6 col-xl-4">
                            <Item className={'flex-column'} detail={i} key={i.ID} type={type} />
                          </div>
                        ))}
                      </div>
                    </>
                )
            }

            <div className='pagination-page'>
              <Pagination current={page + 1} total={total} pageSize={pageSize} onChange={(num) => { setPage(num - 1); setRefresh(true); }} />
            </div>
          </div>
          <div className='col-xl-3'></div>
        </div>
      </div>
    </>
  )
}

const DatabaseSystemWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: 'Trang chủ',
            path: '/',
            isActive: true,
            isSeparator: false
          }
        ]}
      >  Hệ thống cơ sở dữ liệu
      </PageTitle>
      <DatabaseSystemPage />
    </>
  )
}

export { DatabaseSystemWrapper }