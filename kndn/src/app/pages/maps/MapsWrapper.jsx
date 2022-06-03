/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { requestPOST } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import GoogleMapReact from 'google-map-react';
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { OverlayTrigger, Popover } from 'react-bootstrap-v5'

const MapsPage = () => {

  const [lat, setLat] = useState(11.701620);
  const [lng, setLng] = useState(108.968977);
  const [zoom, setZoom] = useState(10.5);

  const [dataAll, setDataAll] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      var body = {
        "idLinhVuc": "",
        "idChuDe": "",
        "tieuBieu": "",
        "soLuong": 100,
        "phanTrang": 0,
        "sapXep": "ID"
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/DanhSachPhanAnh', body)
      let data = res?.data?.phananh ?? []
      if (data && data.length > 0) {
        var _data = []
        data.map(i => {
          if (i.Latitude && i.Longitude) {
            i.Latitude = parseFloat(i.Latitude)
            i.Longitude = parseFloat(i.Longitude)
            _data.push(i)
            setLat(i.Latitude)
            setLng(i.Longitude)
          }
        })
        setDataAll(_data)
        setLoading(false)
      }
    }

    try {
      fetchData()
    } catch (error) { }
    return () => { setDataAll([]) }
  }, [])

  const AnyReactComponent = ({ item }) => (
    console.log(item),
    <OverlayTrigger
      trigger="click"
      key={item.ID}
      placement="auto-start"
      rootClose
      overlay={
        <Popover style={{ maxWidth: '60%' }} id={`${item.ID}-popover`}>

          <Popover.Title as="h3">{item.TieuDe}</Popover.Title>
          <Popover.Content>
            - Nội dung: {item.NoiDung}<br />
            - Địa chỉ: {item.DiaChi}<br />
          </Popover.Content>
        </Popover>
      }
    >
      <img title={item.Ten} style={{color:"red"}} src={toAbsoluteUrl('/media/logos/map-location.png')} width="30" height="30" alt="" />
    </OverlayTrigger>
  );

  return (
    <div className='h-600px'>
      {loading || dataAll.length == 0 ? <></> :
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg' }}
          defaultCenter={{
            lat: lat,
            lng: lng
          }}
          center={[lat, lng]}
          zoom={zoom}
        >
          {dataAll.map(i => (
            <AnyReactComponent
              key={i.ID}
              lat={i.Latitude}
              lng={i.Longitude}
              item={i}
            />
          ))}
        </GoogleMapReact>
      }
    </div>
  )
}

const MapsWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <MapsPage />
    </>
  )
}

export { MapsWrapper }
