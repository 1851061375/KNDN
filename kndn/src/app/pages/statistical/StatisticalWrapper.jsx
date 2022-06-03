/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { CONFIG } from '../../../helpers/config'
import { requestPOST, requestGET } from '../../../helpers/baseAPI'
import clsx from 'clsx'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useDispatch, useSelector } from 'react-redux'
import { CardMain } from '../../components/card'
import { Select, Spin } from 'antd';
import ChartPieTongHop from './ChartPieTongHop.jsx'
import './Chart.scss'


const StatisticalPage = () => {
  const [options, setOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      var body = {
      }
      let res = await requestPOST(`${CONFIG.PAHT_PATH}/ThongKeXuLy`, body)
      var _res = res?.data ?? null;
      var _data = [];
      if (res) {
        _data.push({ name: 'Đã xử lý', y: _res.DaXuLy, color: '#66BB6A' });
        _data.push({ name: 'Đang xử lý', y: _res.DangXuLy, color: '#19AADE' });
        _data.push({ name: 'Quá hạn', y: _res.QuaHan, color: '#EE9A3A' });
      }

      var option = {
        chart: {
          type: 'pie',
          renderTo: 'container',
        },
        title: {
          text: 'Biểu đồ thống kê xử lý',
        },
        plotOptions: {
          pie: {
            //innerSize: '50%',
            dataLabels: {
              enabled: true,
              format: '{point.percentage:.1f} %',
              distance: -50,
            },
            showInLegend: true,
          },
        },

        series: [
          {
            name: 'Phản ánh',
            states: {
              inactive: {
                opacity: 1,
              },
              select: {
                opacity: 0.5,
              },
            },

            data: _data,
          },
        ],
        credits: {
          enabled: false,
        },
      };
      setOptions(option);
      setIsLoading(false)
    }

    try {
      fetchData()
    } catch (error) { }
    return () => {
    }
  }, [])

  return <div className='col-xl-12'>
    {isLoading ? (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spin size='large' />
      </div>
    ) : (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    )}
  </div>
}

const StatisticalCatergory = () => {
  const [options, setOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const color = ["#ffe033", "#54acff", "#ff8b1f", "#d42013", "#3cd615", "#2f15d9"]
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      var body = {
        "code": "linh-vuc"
      }
      let res = await requestPOST(`${CONFIG.PAHT_PATH}/ThongKeXuLy`, body)
      var _res = res?.data?.linhVuc ?? null;
      var _data = [];
      if (_res) {
        for (var i = 0; i < _res.length; i++)
          _data.push({ name: _res[i].TenLinhVuc, y: _res[i].SoLuongPhanAnh, color: color[i], drilldown: _res[i].TenLinhVuc });
      }
      console.log(_data)
      var option = {
        chart: {
          type: 'column',
          renderTo: 'container',
        },
        title: {
          text: 'Biểu đồ thống kê PAKN theo lĩnh vực',
        },
        tooltip: {
          // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Số lượng phản ảnh kiến nghị'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.0f}'
            }
          }
        },
        series: [
          {
            data: _data,
          },
        ],
        credits: {
          enabled: false,
        },
      };
      setOptions(option);
      setIsLoading(false)
    }

    try {
      fetchData()
    } catch (error) { }
    return () => {
    }
  }, [])
  return <div className='col-xl-12'>
    {isLoading ? (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spin size='large' />
      </div>
    ) : (
      <div style={{ paddingTop: "40px" }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    )}
  </div>
}

const StatisticalUnit = () => {
  const [options, setOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const color = [, "#d42013", "#3cd615", "#2f15d9", "#ffe033", "#54acff", "#ff8b1f"]
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      var body = {
        "code": "don-vi"
      }
      let res = await requestPOST(`${CONFIG.PAHT_PATH}/ThongKeXuLy`, body)
      var _res = res?.data?.donVi ?? null;
      var _data = [];
      if (_res) {
        for (var i = 0; i < _res.length; i++)
          _data.push({ name: _res[i].TenDonVi, y: _res[i].SoLuongPhanAnh, color: color[i] });
      }
      console.log(_data)
      var option = {
        chart: {
          type: 'pie',
          renderTo: 'container',
        },
        title: {
          text: 'Biểu đồ thống kê PAKN theo đơn vị',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [
          {
            data: _data,
          },
        ],
        credits: {
          enabled: false,
        },
      };
      setOptions(option);
      setIsLoading(false)
    }

    try {
      fetchData()
    } catch (error) { }
    return () => {
    }
  }, [])
  return <div className='col-xl-12'>
    {isLoading ? (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spin size='large' />
      </div>
    ) : (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    )}
  </div>
}



const StatisticalWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <div className='' style={{ fontSize: "20px", width: "100%" }}>
        <div className='row'>
          <div className='col-6'>
            <StatisticalPage />
          </div>
          <div className='col-6'>
            <StatisticalUnit />
          </div>
        </div>

        <StatisticalCatergory />

      </div>
    </>
  )
}

export { StatisticalWrapper }
