/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useLayout } from '../core'
import { toAbsoluteUrl } from '../../helpers'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
  const { classes } = useLayout()

  return (
    <div className='footer pt-4' id='kt_footer'>
      <div className="container pb-6">
        <div className="row">
          <div className="col-xl-3">
            <h4 className="footer-title">Về chúng tôi</h4>
            <div className='ft-group-link my-6'>
              <p className='mb-2'><Link className='text-white' to={'/about'}>Giới thiệu</Link></p>
              <p className='mb-2'><Link className='text-white' to={'/news'}>Tin tức</Link></p>
              <p className='mb-2'><Link className='text-white' to={''}>Hướng dẫn sử dụng</Link></p>
              <p className='mb-2'><Link className='text-white' to={''}>Câu hỏi thường gặp</Link></p>
              <p className='mb-2'><Link className='text-white' to={''}>Hỏi đáp</Link></p>
            </div>
            <div className="ft-statics mt-3">
              <p className='mb-2 text-white'>Khách online: <b>647</b></p>
              <p className='mb-2 text-white'>Lượt truy cập: <b>47,234,962</b></p>
            </div>
          </div>
          <div className="col-xl-3">
            <h4 className="footer-title">Phần mềm kết nối doanh nghiệp trên nền tảng di động</h4>
            <div className="ft-link-app my-6">
              <div className="d-flex">
                <i>Hệ thống chưa hỗ trợ</i>
                {/* <a href=""><img src={toAbsoluteUrl('/media/logos/GGPlay.png')} alt="Google play" /></a>
                <a href="" className='ms-2'><img src={toAbsoluteUrl('/media/logos/IOS.png')} alt="App Store" /></a> */}
              </div>
            </div>
            <div className="ft-link-pr pt-3">
              <p className="mb-4 text-white">Zalo Official Account của Hệ thống</p>
              <i>Hệ thống chưa hỗ trợ</i>
              {/* <img src={toAbsoluteUrl('/media/logos/qr-code.jpg')} className='img-fluid' /> */}
            </div>
          </div>
          <div className="col-xl-6">
            <div className='footer-contact d-inline-block mb-3'>
              <h3 className='fs-4 text-white text-uppercase mb-3'>© Cổng thông tin kết nối doanh nghiệp ngành công nghiệp</h3>
              <p className='text-white mb-2'>Địa chỉ: ... - Đống Đa - Hà Nội</p>
              <p className='text-white mb-2'>Điện thoại:  - Fax: </p>
              <p className='text-white mb-2'>Hotline:  -  - </p>
              <p className='text-white mb-0'>Email: </p>
            </div>
            <div className="footer-main-subscribe mt-6">
              <h4 className='text-white'>ĐĂNG KÝ NHẬN ƯU ĐÃI</h4>
              <div className="input-group mt-3">
                <input type="email" className="form-control" placeholder="Nhập email của bạn" />
                <button className="btn btn-primary" type="button">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='coppyright'>
        <p className="m-0 text-center">Copyright @2021. Bản quyền thuộc Cổng thông tin kết nối doanh nghiệp ngành công nghiệp</p>
      </div>
    </div>
  )
}

export { Footer }
