/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { requestPOST } from '../../../helpers/baseAPI'
import { CONFIG } from '../../../helpers/config'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Dropdown1 } from '../../../_metronic/partials'
// import { Item } from './components/Item'
// import { SearchForm } from './components/SearchForm'

import {  Comment, Avatar  } from "antd"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import './faqdetail.scss'

const ThongKePage = () => {
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            height: '250px'
        },
        title: {
            text: "",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            percentageDecimals: 1,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                innerSize: 90,
                useHTML: true,
                depth: 0,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    distance: 10,
                    y: 0,
                },
            },
        },
        series: [
            {
                type: "pie",
                colors: ["#4198d7", "#8bc34a", "#e77c0d", "#e77c0d", "#e9b416", "#d9cc5d", "#009688", "#4caf50"],
                name: "Browser share",
                data: [
                    ["Đã xử lý", 45.0],
                    ["Đang xử lý", 26.8],
                    ["Quá hạn", 4.2]
                ],
            },
        ],
        credits: {
            enabled: false,
        }
    }
    const options3 = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [
                "Văn hóa - Du lịch",
                "Giao thông",
                "Môi trường",
                "Dịch vụ hành chính, công ích, sự nghiệp",
                "Đầu tư, kinh doanh, khởi nghiệp",
                "Đất đai",
                "Lĩnh vực khác",
                "Hạ tầng đô thị",
                "Bưu chính viễn thông",
                "Y tế"
            ],
            labels: {
                useHTML: true,//Set to true
                autoRotationLimit: 50
            }
        },
        yAxis: [{
            min: 0,
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            opposite: false
        }],
        legend: {
            shadow: false,
            enabled: false,
            itemWidth: 120
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: true,
                shadow: false,
                borderWidth: 0,
                pointPadding: 0.05
            }
        },
        credits: {
            enabled: false
        },
        colors: ["#4198d7", "#72c5e5", "#e77c0d", "#e9b416", "#8bc34a", "#d9cc5d", "#009688", "#4caf50", "#607d8b", "#2106b7"],
        series: [
            {
              name: "",
              colorByPoint: true,
              data: [
                {
                  name: "Văn hóa - Du lịch",
                  y: 12
                },
                {
                  name: "Giao thông",
                  y: 14
                },
                {
                  name: "Môi trường",
                  y: 7
                },
                {
                  name: "Dịch vụ hành chính, công ích, sự nghiệp",
                  y: 5
                },
                {
                  name: "Đầu tư, kinh doanh, khởi nghiệp",
                  y: 8
                },
                {
                  name: "Đất đai",
                  y: 6
                },
                {
                  name: "Lĩnh vực khác",
                  y: 7.62
                },{
                    name: "Hạ tầng đô thị",
                    y: 8
                },{
                    name: "Bưu chính viễn thông",
                    y: 11
                },
                {
                    name: "Y tế",
                    y: 6
                }
              ]
            }
          ],
    }
  return (
    <>
    <div className=''>
        <div className='row'>
            <div className='col-lg-6'>
                <div className={`card`}>
                    <div className='card-header ribbon ribbon-top ribbon-vertical px-3'>
                    <div className="card-title text-primary">
                    <span className="fad fa-chart-pie me-3 text-primary"></span> Biểu đồ thống kê tình hình xử lý
                    </div>
                    </div>
                    <div className='card-body pb-0 px-4'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options} 
                    />
                    </div>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className={`card`}>
                    <div className='card-header ribbon ribbon-top ribbon-vertical px-3'>
                    <div className="card-title text-primary">
                    <span className="fad fa-chart-pie-alt me-3 text-primary"></span> Biểu đồ thống kê số lượng PAKN nguồn nhận
                    </div>
                    </div>
                    <div className='card-body pb-0 px-4'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                    </div>
                </div>
            </div>
            <div className='col-12 pt-1'>
                <div className={`card mt-5`}>
                    <div className='card-header ribbon ribbon-top ribbon-vertical px-3'>
                    <div className="card-title text-primary">
                    <span className="fad fa-chart-bar me-3 text-primary"></span> Biểu đồ thống kê số lượng PAKN theo lĩnh vực
                    </div>
                    </div>
                    <div className='card-body pb-0 px-4'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options3} 
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

const ThongKeWrapper = () => {
  const intl = useIntl()

//   const {id} = useParams<{ id: string }>();
//   const [dataAll, setDataAll] = useState([])
  
//   useEffect(() => {
//     const fetchData = async () => {
//       var body = {
//         "id": id
//       }
//       let res = await requestPOST(CONFIG.PAHT_PATH + '/ChiTietPhanAnh', body)
//       let dataDetail = res.data
//       setDataAll(dataDetail)
//     }

//     try {
//       fetchData()
//     } catch (error) { }
//     return () => { setDataAll([]) }
//   }, [id])

  return (
    <>
      <ThongKePage />
    </>
  )
}

export { ThongKeWrapper }
