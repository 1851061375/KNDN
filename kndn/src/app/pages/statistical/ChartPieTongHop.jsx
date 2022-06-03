/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const ChartTopDonVi = (props) => {
  const {series, name} = props

  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
      text: name || '',
      style: {
        fontWeight: 'bold',
        fontSize: 14,
      },
    },

    tooltip: {
      pointFormat: '{point.y} cán bộ (<b>{point.percentage:.1f}%</b>)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    series: {
      name: 'Người',
      colorByPoint: true,
      data: series,
      type: 'pie',
      animation: false,
      point: {
        events: {
          click: function (event) {
            console.log(this)
          },
        },
      },
    },
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  )
}

export default ChartTopDonVi
