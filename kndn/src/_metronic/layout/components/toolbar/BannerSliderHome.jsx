
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Select, DatePicker, Input } from 'antd'
import './bannerSliderHome.scss'
import { toAbsoluteUrl } from '../../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../setup/redux/global/Actions'
import { CONFIG } from '../../../../helpers/config'

const BannerSliderHome = () => {
  const { TabPane } = Tabs
  const { Option } = Select
  const { RangePicker } = DatePicker
  const dispatch = useDispatch();
  const history = useHistory();

  const [linhVuc, setLinhVuc] = useState("")
  const [tinh, setTinh] = useState("")
  const [searchStr, setSearchStr] = useState("")
  const [type, setType] = useState(1)
  const linhVucs = CONFIG.LINHVUCS;

  useEffect(() => {

  }, [dispatch])

  const search = () => {
    dispatch(actions.setSearchFormData({
      type: type,
      linhVuc: linhVuc,
      tinh: tinh,
      searchStr: searchStr
    }));
    history.push("/database-system")
  };

  return (

    <div className='contianer-fluid h-auto banner-slide-home d-flex py-3 py-lg-6'>
      <div className='container baner-forms'>
        <div className='Tabs-form align-self-center position-relative' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/patterns/bg-box.svg')})` }}>
          <Tabs defaultActiveKey="1" type="card" onTabClick={(key) => { setType(key) }}>
            <TabPane tab="Tìm kiếm doanh nghiệp" key="1">
              <div className="card-body p-3 p-xl-6 pt-xl-2">
                <div className='row'>
                  <div className='col'>
                    <Select placeholder="Lĩnh vực" onChange={(val) => setLinhVuc(val)} allowClear style={{ width: '100%' }}>
                      {
                        linhVucs != null ?
                          Object.keys(linhVucs).map(key => (
                            <Option value={key}>{linhVucs[key]}</Option>
                          )) : <></>
                      }
                    </Select>
                  </div>
                  <div className='col'>
                    <Select placeholder="Tỉnh thành" onChange={(val) => setTinh(val)} allowClear style={{ width: '100%' }}>
                      <Option value="1">Hà Nội</Option>
                      <Option value="12">TP. Hồ Chí Minh</Option>
                    </Select>
                  </div>
                  <div className='col'>
                    <Input type="text" onChange={(val) => setSearchStr(val.target.value)} className="form-control" placeholder="Từ khoá tìm kiếm" />
                  </div>
                  <div className='col'>
                    <button onClick={() => search()} className='btn btn-danger btn-slide-search'><span className='fa fa-search'></span> Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Tìm kiếm sản phẩm" key="2">
              <div className="card-body p-3 p-xl-6 pt-xl-2">
                <div className='row'>
                  <div className='col'>
                    <Select placeholder="Lĩnh vực" onChange={(val) => setLinhVuc(val)} allowClear style={{ width: '100%' }}>
                      {
                        linhVucs != null ?
                          Object.keys(linhVucs).map(key => (
                            <Option value={key}>{linhVucs[key]}</Option>
                          )) : <></>
                      }
                    </Select>
                  </div>
                  <div className='col'>
                    <Select placeholder="Tỉnh thành" onChange={(val) => setTinh(val)} allowClear style={{ width: '100%' }}>
                      <Option value="1">Hà Nội</Option>
                      <Option value="12">TP. Hồ Chí Minh</Option>
                    </Select>
                  </div>
                  <div className='col'>
                    <input type="text" onChange={(val) => setSearchStr(val)} className="form-control" placeholder="Từ khoá tìm kiếm" />
                  </div>
                  <div className='col'>
                    <button onClick={() => search()} className='btn btn-danger btn-slide-search'><span className='fa fa-search'></span> Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div style={{ backgroundImage: `url(${toAbsoluteUrl('/media/sliders/banner-item-2.jpg')})` }} className='slide-bg'></div>
    </div>
  )
}
export { BannerSliderHome }
