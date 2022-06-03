/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

const HeaderUserMenu: FC = () => {
  const dispatch = useDispatch()
  const logout = () => {}

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          Phản ánh cá nhân
        </Link>
      </div>
      <div className='separator my-2'></div>
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Đăng xuất
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
