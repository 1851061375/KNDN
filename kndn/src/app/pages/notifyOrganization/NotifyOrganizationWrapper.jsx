/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import clsx from 'clsx'
import { PageTitle } from '../../../_metronic/layout/core'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom';
import { DatePicker, Space, Tabs, Select, Pagination, Button, Input, Row } from 'antd'
import { auto } from '@popperjs/core'

const NewPage = () => {

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const { TabPane } = Tabs;
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [NguoiCoTaiSan, setNguoiCoTaiSan] = useState('');
  const [TenTaiSan, setTenTaiSan] = useState('');
  const [TuNgay, setTuNgay] = useState('');
  const [DenNgay, setDenNgay] = useState('');

  function callback(key) {
    console.log(key);
  }

  const SearchBasic = async () => {
    try {
      var res = await requestGET(`${CONFIG.GETWAY_PATH}/thongbao/list?skip=${page * 10}&take=10&search=${searchText}&TuNgay=&DenNgay=&NguoiCoTaiSan=&TenTaiSan=`);
      var _data = res?.data ?? []
      setData(_data)
      setTotal(res?.total ?? [])
    }
    catch (e) {
      console.log(e);
    }
  }

  const SearchAdvanced = async () => {
    try {
      var res = await requestGET(`${CONFIG.GETWAY_PATH}/thongbao/list?skip=${page * 10}&take=10&search=&TuNgay=${TuNgay}&DenNgay=${DenNgay}&NguoiCoTaiSan=${NguoiCoTaiSan}&TenTaiSan=${TenTaiSan}`)
      var _data = res?.data ?? []
      setData(_data)
      setTotal(res?.total ?? [])
    }
    catch (e) {
      console.log(e);
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      var res = await requestGET(`${CONFIG.GETWAY_PATH}/thongbao/list?skip=${page * 10}&take=10&search=&TuNgay=${TuNgay}&DenNgay=${DenNgay}&NguoiCoTaiSan=${NguoiCoTaiSan}&TenTaiSan=${TenTaiSan}`);
      var _data = res?.data ?? []
      setData(_data)
      setTotal(res?.total ?? [])
    }
    fetchData()
    return () => {
    }
  }, [])

  return (
    <>
      <div className='col-12'>
        <nav style={{ breadcrumbDivider: ">", marginBottom: "12px" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/home">Trang chủ</a></li>
            <li className="breadcrumb-item active" aria-current="page">Thông báo lựa chọn Tổ chức ĐGTS</li>
          </ol>
        </nav>
        <h2 className='mb-8'>DANH SÁCH THÔNG BÁO LỰA CHỌN TỔ CHỨC ĐGTS</h2>
        <div className='row mb-7'>
          <Tabs defaultActiveKey="1" onChange={callback} >
            <TabPane tab="Tìm kiếm cơ bản" key="1">
              <div className='row'>
                <div className='col-10 mb-2'>
                  <Input id="search-basic" style={{ borderRadius: "4px", width: "100%" }} onChange={(e) => { setSearchText(e.target.value) }}></Input>
                </div>
                <div className='col-2' >
                  <Button onClick={() => { SearchBasic() }} style={{ borderRadius: "4px", width: auto }} title='Tìm kiếm' type='primary'>Tìm kiếm</Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Tìm kiếm nâng cao" key="2">
              <div className='row'>
                <div className='col-5'>
                  <div className='row mb-2'>
                    <div className='col-4'>Người có tài sản</div>
                    <div className='col-8'>
                      <Input placeholder='Tên người có tài sản' id='NguoiCoTaiSan' onChange={(e) => { setNguoiCoTaiSan(e.target.value) }}></Input>
                    </div>
                  </div>
                  <div className='row mb-2'><div className='col-4'>Tỉnh thành</div>
                    <div className='col-8'>
                      <Input id='TinhThanh'></Input></div></div>
                  <div className='row'><div className='col-4'>Quận/huyện</div>
                    <div className='col-8'>
                      <Input id='QuanHuyen'></Input></div></div>
                </div>
                <div className='col-2'></div>
                <div className='col-5'>
                  <div className='row mb-2'>
                    <div className='col-4'>Tên tài sản</div>
                    <div className='col-8'>
                      <Input placeholder='Tên tài sản' id='TenTaiSan' onChange={(e) => { setTenTaiSan(e.target.value) }}></Input>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-4'>Từ ngày</div>
                    <div className='col-8'>
                      <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" onChange={(date, dateString) => { setTuNgay(dateString) }} />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>Đến ngày</div>
                    <div className='col-8'><DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" onChange={(date, dateString) => { setDenNgay(dateString) }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-5'></div>
                <div className='col-2' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Button onClick={() => { SearchAdvanced() }} style={{ borderRadius: "4px", width: auto }} title='Tìm kiếm' type='primary'>Tìm kiếm</Button>
                </div>
                <div className='col-5'></div>
              </div>
            </TabPane>
          </Tabs>

        </div>
        {data.map((i) => (
          <div onClick={() => { history.push(`/chi-tiet-thong-bao-lua-chon-tcdg/${i.ID}`) }} key={i.ID} className={`card card-auction d-flex align-items-center flex-row mb-6 shadow-sm`} >
            <div className='col-12' style={{ padding: "15px" }}>
              <Link><h3 style={{ textAlign: "justify" }}><a>{i?.Title?? ''}</a></h3></Link>
              <div className='row'>
                <p className='card-time mb-0 text-truncate text-muted col-8'> <i>(Thời gian nộp hồ sơ : {i?.TimeReceive ?? ''})</i></p>
                <p className='card-time mb-0 text-truncate text-muted col-4'>Ngày công khai : <span className='text-danger'>{moment(i?.PublicDate ?? '').format('HH:mm DD/MM/YYYY')}</span></p>                </div>
            </div>
          </div >
        ))}
      </div>
      <div className='pagination-page'>
        <Pagination defaultCurrent={page + 1} total={total} onChange={(num) => setPage(num - 1)} />
      </div>
    </>

  )
}

const NotifyOrganizationWrapper = () => {
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
      >  Thông báo đấu giá
      </PageTitle>
      <NewPage />
    </>
  )
}

export { NotifyOrganizationWrapper }
