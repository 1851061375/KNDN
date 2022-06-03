/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import clsx from 'clsx'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Rate, Tabs } from 'antd';
import './MyFaqWrapper.scss';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl'
import { useHistory } from "react-router-dom";



function callback(key) {
  console.log(key);
}


const { TabPane } = Tabs;



const MyFaqPage = () => {
  const history = useHistory();
  const [activeKey, setActivKey] = useState("da-gui");
  const accessToken = useSelector((state) => state.auth.accessToken)
  const user = useSelector((state) => state.auth.user)
  const [dataPhanAnh, setDataPhanAnh] = useState([]);

  const datas = [
    {
      id: "1",
      name: "Phản ánh đã gửi",
      code: "da-gui",
      image: ""
    },
    {
      id: "2",
      name: "Phản ánh đang xử lý",
      code: "dang-xu-ly",
      image: ""
    },
    {
      id: "4",
      name: "Phản ánh đã có kết quả",
      code: "da-xu-ly",
      image: ""
    },
    {
      id: "3",
      name: "Phản ánh không hợp lệ",
      code: "khong-hop-le",
      image: ""
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      var body = {
        "token": accessToken,
        "code": activeKey,
        "soLuong": 20,
        "phanTrang": 0,
        "sapXep": ""
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/DanhSachPhanAnhCongDan', body)
      if (res?.data) {
        setDataPhanAnh(res.data)
        console.log(dataPhanAnh)
      }
    }
    try {
      fetchData();
    } catch (error) { console.log(error) }
    return () => {}
  }, [activeKey])

  return (
    <>
      <div className='card'>
        <div className="card-header px-3">
          <div className="card-title text-primary"><span className='fad fa-file-alt me-3 text-primary'></span>Phản ánh cá nhân</div>
        </div>
        <div className="card-body p-5">
          <div className='container-gruid' style={{ backgroundColor: "" }}>
            
            <Tabs defaultActiveKey={activeKey} onChange={setActivKey} type="card">
              {datas.map((data) => (
                <TabPane tab={data?.name} key={data?.code}>
                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id={data.code}>
                      {console.log(dataPhanAnh),
                      (dataPhanAnh?.length==0 || !dataPhanAnh)?(<div>
                          <h4 style={{textAlign : "center", color : "#0549aa"}}>Lấy dữ liệu không thành công</h4>
                      </div>):dataPhanAnh.map((PhanAnh) => (
                        <div className='PhanAnh card shadow-sm rounded border border-gray-300 mb-4'>
                          <div className="d-flex align-items-start">
                            <div className="symbol mr-5 p-3">
                              <div className="symbol-label min-w-125px min-h-95px" style={{backgroundImage: `url(${PhanAnh.AnhDaiDien ? PhanAnh.AnhDaiDien : toAbsoluteUrl('/media/logos/default_avatar.jpg')})`}}></div>
                            </div>
                            <div className="d-flex flex-column p-3 col">
                              <p href="#" className="card-title fw-bolder fs-5" style={{color: '#0549aa'}}>{PhanAnh.TieuDe}</p>
                              <div className='text-gray-500 font-size-sm'><span className="fa fa-clock text-success" title='Thời gian'></span> {PhanAnh.ThoiGianGui ? PhanAnh.ThoiGianGui : "Chưa xác định"} - <span className='fa fa-map-marker-alt text-success' title='Địa điểm'></span> {PhanAnh.DiaChi ? PhanAnh.DiaChi : "Chưa xác định"}</div>
                              <div className='separator mt-2 mb-1'></div>
                              <div className='faq-personal-footer d-flex col justify-content-between'>
                                <div className='d-flex align-items-center'>Đánh giá: 
                                  <Rate defaultValue={0} allowHalf disabled value={PhanAnh?.DiemDanhGia > 0 ? PhanAnh.DiemDanhGia : 0} />
                                </div>
                                <div className='col-auto'>
                                  <a className='btn btn-light-primary fw-normal btn-sm p-2' onClick={() => history.push(`/tuong-tac/${PhanAnh.ID}`)} title='Tương tác với cán bộ'> <span className='fad fa-comments-alt fa-fw'></span> Tương tác</a>
                                  <a className='btn btn-light-primary fw-normal btn-sm p-2 ms-1' onClick={() => history.push(`/thong-tin-phan-anh/${PhanAnh.ID}`)} title='Xem chi tiết'> <span className='fad fa-file-search fa-fw'></span> Chi tiết</a> 
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </TabPane>
              )
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

const MyFaqWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <MyFaqPage />
    </>
  )
}
export { MyFaqWrapper }
