/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC, useState, useEffect } from 'react'
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { CONFIG } from '../../../../helpers/config'

const AuctionCounterTime = (props) => {

    const [time, setTime] = useState([0, 0, 0])

    useEffect(() => {
        if (props.EndTime) {
            var _time1 = moment(props?.EndTime ?? '').diff(moment(), 'days')
            var _time2 = moment(props?.EndTime ?? '').subtract(_time1, 'days').diff(moment(), 'hours')
            var _time3 = moment(props?.EndTime ?? '').subtract(_time1, 'days').subtract(_time2, 'hours').diff(moment(), 'minutes')
            setTime([_time1, _time2, _time3])
        }
        return () => {

        }
    }, [])


    return (
        <>
            <div className='auction-counter-time'>
                <div className='row'>
                    <div className='col text-center counter-time-item'>
                        <span className='fw-bolder fs-2'>{time[0]}</span>
                        <p className='m-0'>ngày</p>
                    </div>
                    <div className='col text-center counter-time-item'>
                        <span className='fw-bolder fs-2'>{time[1]}</span>
                        <p className='m-0'>giờ</p>
                    </div>
                    <div className='col text-center counter-time-item'>
                        <span className='fw-bolder fs-2'>{time[2]}</span>
                        <p className='m-0'>phút</p>
                    </div>
                    {/* <div className='col text-center counter-time-item'>
                    <span className='fw-bolder fs-2'>18</span>
                    <p className='m-0'>giây</p>
                </div> */}
                </div>
            </div>
        </>
    )
}

export { AuctionCounterTime }
