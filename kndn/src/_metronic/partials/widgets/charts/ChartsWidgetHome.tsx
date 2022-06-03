/* eslint-disable jsx-a11y/anchor-is-valid */
import Highcharts, {Series} from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, {useEffect, useState} from 'react'
import {requestPOST, requestGET} from '../../../../../src/helpers/baseAPI'
import {CONFIG} from '../../../../helpers/config'
import {useHistory} from 'react-router-dom'
import { toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
  hightChat: string
}

const ChartsWidgetHome: React.FC<Props> = ({className, hightChat}) => {
  const history = useHistory()
  // const [option, setOption] = useState({
  //   DaXuLy: 0,
  //   DangXuLy: 0,
  //   QuaHan: 0,
  // })
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     var body = {
  //       token:
  //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE0NTk0NjIsImV4cCI6MTY0MjM0ODY2Miwic3ViIjoiZGVtbzEiLCJoYXNocHdkIjoiVzJPZ2xzb3VDL0I5QVAyM0NIaEtoQT09IiwiY29udGV4dCI6eyJ1c2VyIjp7InVzZXJOYW1lIjoiZGVtbzEiLCJkaXNwbGF5TmFtZSI6ImRlbW8xIiwib3JnYW5pemF0aW9uSWQiOiIifX19.KUrKbbHwriqRe5m9j0k6o05exeZnxoZzgqJD1pYKK74',
  //     }
  //     let res = await requestPOST(CONFIG.PAHT_PATH + '/ThongKeXuLy', body)
  //     let data = res?.data ?? []
  //     setOption(data)
  //   }
  //   fetchData()
  // }, [])
  
  let dt = new Array()
  dt = [
    {
      name: 'Chào bán',
      y: 155,
      color: '#bfd7f0',
    },
    {
      name: 'Chào mua',
      y: 60,
      color: '#e96626',
    }
  ]

  var options = {
    chart: {
      type: 'pie',
      renderTo: 'container',
      backgroundColor: 'transparent',
      height: (10 / 16 * 100) + '%',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
          distance: -20,
        },
        showInLegend: true,
        borderWidth: 0
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      useHTML: true,
      y: 0,
      x: 0,
      padding: 0,
      itemMarginBottom: 10,
      itemWidth: 92,
      maxHeight: 80,
      itemStyle: {"fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial", "color": "#fff"}
    },
    series: [
      {
        name: 'Số lượng',
        states: {
          inactive: {
            opacity: 1,
          },
          select: {
            opacity: 0.5,
          },
        },
        data: dt,
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return (
    <div className={`card card-chart-home hoverable card-xl-stretch ${className}`}>
      {/* begin::Header */}
      <div className='card-header px-3'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-white fs-lg-5 fs-6 m-0'>
            Mua bán tháng 4/2022
          </span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body card-body-chart p-0' style={{backgroundImage: `url(${toAbsoluteUrl('/media/patterns/overview-bg.png')})`}}>
        {/* begin::Chart */}
        <HighchartsReact containerProps={{ style: { height: "100%" } }} highcharts={Highcharts} options={options} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidgetHome}
