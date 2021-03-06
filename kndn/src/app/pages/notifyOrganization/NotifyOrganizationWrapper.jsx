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
            <li className="breadcrumb-item"><a href="/home">Trang ch???</a></li>
            <li className="breadcrumb-item active" aria-current="page">Th??ng b??o l???a ch???n T??? ch???c ??GTS</li>
          </ol>
        </nav>
        <h2 className='mb-8'>DANH S??CH TH??NG B??O L???A CH???N T??? CH???C ??GTS</h2>
        <div className='row mb-7'>
          <Tabs defaultActiveKey="1" onChange={callback} >
            <TabPane tab="T??m ki???m c?? b???n" key="1">
              <div className='row'>
                <div className='col-10 mb-2'>
                  <Input id="search-basic" style={{ borderRadius: "4px", width: "100%" }} onChange={(e) => { setSearchText(e.target.value) }}></Input>
                </div>
                <div className='col-2' >
                  <Button onClick={() => { SearchBasic() }} style={{ borderRadius: "4px", width: auto }} title='T??m ki???m' type='primary'>T??m ki???m</Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="T??m ki???m n??ng cao" key="2">
              <div className='row'>
                <div className='col-5'>
                  <div className='row mb-2'>
                    <div className='col-4'>Ng?????i c?? t??i s???n</div>
                    <div className='col-8'>
                      <Input placeholder='T??n ng?????i c?? t??i s???n' id='NguoiCoTaiSan' onChange={(e) => { setNguoiCoTaiSan(e.target.value) }}></Input>
                    </div>
                  </div>
                  <div className='row mb-2'><div className='col-4'>T???nh th??nh</div>
                    <div className='col-8'>
                      <Input id='TinhThanh'></Input></div></div>
                  <div className='row'><div className='col-4'>Qu???n/huy???n</div>
                    <div className='col-8'>
                      <Input id='QuanHuyen'></Input></div></div>
                </div>
                <div className='col-2'></div>
                <div className='col-5'>
                  <div className='row mb-2'>
                    <div className='col-4'>T??n t??i s???n</div>
                    <div className='col-8'>
                      <Input placeholder='T??n t??i s???n' id='TenTaiSan' onChange={(e) => { setTenTaiSan(e.target.value) }}></Input>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-4'>T??? ng??y</div>
                    <div className='col-8'>
                      <DatePicker style={{ width: "100%" }} placeholder="Ch???n ng??y" onChange={(date, dateString) => { setTuNgay(dateString) }} />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>?????n ng??y</div>
                    <div className='col-8'><DatePicker style={{ width: "100%" }} placeholder="Ch???n ng??y" onChange={(date, dateString) => { setDenNgay(dateString) }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-5'></div>
                <div className='col-2' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Button onClick={() => { SearchAdvanced() }} style={{ borderRadius: "4px", width: auto }} title='T??m ki???m' type='primary'>T??m ki???m</Button>
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
                <p className='card-time mb-0 text-truncate text-muted col-8'> <i>(Th???i gian n???p h??? s?? : {i?.TimeReceive ?? ''})</i></p>
                <p className='card-time mb-0 text-truncate text-muted col-4'>Ng??y c??ng khai : <span className='text-danger'>{moment(i?.PublicDate ?? '').format('HH:mm DD/MM/YYYY')}</span></p>                </div>
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
            title: 'Trang ch???',
            path: '/',
            isActive: true,
            isSeparator: false
          }
        ]}
      >  Th??ng b??o ?????u gi??
      </PageTitle>
      <NewPage />
    </>
  )
}

export { NotifyOrganizationWrapper }
