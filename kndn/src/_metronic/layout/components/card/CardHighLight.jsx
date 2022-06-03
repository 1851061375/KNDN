import { Divider, Rate } from 'antd';
import React, { FC } from 'react';
import { toAbsoluteUrl } from '../../../helpers';
import { useHistory } from "react-router-dom";
import './card.scss'
import moment from 'moment';

// interface FullName {
//   Name: string;
// }
const CardHighLight = ({ props }) => {

  const history = useHistory();
  const routeChange = () => {
    let path = `/abc`;
    history.push(path);
  }
  return (
    <div className='card card-hightlight'>
      <div className='card-header px-3'>
        <div className='card-title m-0'>
          <span className='card-label fw-bold fs-lg-5 fs-6 m-0'>Phản ánh tiêu biểu</span>
        </div>
      </div>
      <div className='card-body p-3'>
        <marquee className='h-300px' direction="up" scrolldelay="180">

        {props.map((item, index) => (
          <a href={`/thong-tin-phan-anh/${item.ID}`}
          >
            <div className='d-flex align-items-start flex-grow-1'>
              <div className='symbol symbol-35px me-3 symbol-circle'>
                <img src={toAbsoluteUrl('/media/avatars/150-13.jpg')} alt={item.HoVaTen ? item.HoVaTen : ''} />
              </div>
              <div>
                <a className='text-gray-800 text-hover-primary fs-6 fw-bolder'>
                  {item.HoVaTen}
                </a>
                <div className='row d-flex card-hightlight-local'>
                  <span className='fa fa-map-marker-alt text-success w-10px col-auto' style={{paddingTop:"3px", fontSize:"smaller"}}></span>
                  <span className='text-gray-600 col' style={{paddingLeft:"5px"}}>{item.DiaChi?item.DiaChi:"Chưa xác định"}</span>
                </div>
              </div>
              
            </div>
            <a className='card-title fw-bolder text-hover-primary pt-1 d-block mb-0' style={{color : "#0549aa"}}>
              {item.TieuDe}
            </a>
            {/* <p className='mb-0 text-truncate text-muted'>
              {item.NoiDung}
            </p> */}
            <div className='row pt-2'>
              <div className='col-auto mt-1 d-flex' >
                <span className='fa fa-clock text-primary w-10px col-auto' style={{paddingTop:"5px", fontSize:"10px"}}></span>
                <span className='text-gray-600 col' style={{paddingLeft:"5px"}}>{item.ThoiGianGui ? moment(item.ThoiGianGui).format('DD/MM/YYYY') : "Chưa xác định"}</span>
              </div>
              <div className='col card-comment align-self-center text-end ps-0'>
                <a title='bình luận'>
                  <span className='fa fa-comment-dots'></span>{' '}
                  <span className='num-comment fw-bold'>{item.Comment.length}</span>
                </a>
              </div>
            </div>
            <Divider style={{margin : "12px 0px"}}></Divider>
          </a>
        ))}
        {/* item */}
        </marquee>
      </div>
    </div>
  )
}

export { CardHighLight }
